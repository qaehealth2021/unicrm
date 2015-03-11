package com.sail.cot.mail.service.impl;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.service.impl.BaseServiceImpl;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.common.util.Log4WebUtil;
import com.sail.cot.domain.CotContact;
import com.sail.cot.domain.CotMail;
import com.sail.cot.domain.CotMailBodyHtml;
import com.sail.cot.domain.CotMailBodyText;
import com.sail.cot.mail.service.MailReadService;
import com.sail.cot.mail.util.MailSendUtil;
import com.zhao.mail.analytic.MessageAnalytic;
import com.zhao.mail.entity.IMailAttach;
import com.zhao.mail.util.MailServiceConstants;
/**
 * 
 * <p>Title: 旗航 MailServer-2.0</p>
 * <p>Description:邮件 读取信息类</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Feb 18, 2012 10:29:46 AM </p>
 * <p>Class Name: MailReadServiceImpl.java </p>
 * @author zhao
 *
 */
@Service("MailReadService")
public class MailReadServiceImpl extends BaseServiceImpl implements MailReadService{
	private Logger logger = Log4WebUtil.getLogger(MailReadServiceImpl.class);
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailReadService#getMail(java.lang.Integer)
	 */
	public CotMail getMail(Integer id) {
		CotMail cotMail = (CotMail) this.getObjById(id, CotMail.class);
		return cotMail;
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailReadService#getMailList(java.util.List)
	 */
	@SuppressWarnings("unchecked")
	public List<CotMail> getMailList(List<Integer> ids) throws ServiceException {
		String hql = "from CotMail where id in(:ids)";
		Map<String,Object> whereMap = new HashMap<String, Object>();
		whereMap.put("ids", ids);
		return this.findRecordByHql(hql, whereMap);
	}
	@SuppressWarnings("unchecked")
	public List<IMailAttach> getMailAttach(Integer mailId) throws ServiceException{
		String hql = "from CotMailAttach obj where obj.cotMail.id = :mailId order by obj.id asc";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("mailId", mailId);
		List<IMailAttach> list = this.findRecordByHql(hql, whereMap);
		return list;
	}
	
	@SuppressWarnings("unchecked")
	public CotMailBodyHtml getBodyHtml(Integer mailId) throws ServiceException{
		String hql = "from CotMailBodyHtml obj where obj.mail.id = :mailId";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("mailId", mailId);
		List<CotMailBodyHtml> list = this.findRecordByHql(hql, whereMap);
		if(list != null && list.size() == 1)
			return list.get(0);
		return null;
	}
	@SuppressWarnings("unchecked")
	public CotMailBodyText getBodyText(Integer mailId) throws ServiceException{
		String hql = "from CotMailBodyText obj where obj.mail.id = :mailId";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("mailId", mailId);
		List<CotMailBodyText> list = this.findRecordByHql(hql, whereMap);
		if(list != null && list.size() == 1)
			return list.get(0);
		return null;
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailReadService#getMailAllInfo(java.lang.Integer)
	 */
	public CotMail getMailAllInfo(Integer mailId,boolean showAttach) throws ServiceException{
		// 获得基本信息
		CotMail cotMail = this.getMail(mailId);
		if(cotMail == null)
			return null;
		cotMail.setCotMailBodyHtml(this.getBodyHtml(mailId));
		cotMail.setCotMailBodyText(this.getBodyText(mailId));
		// 显示获得附件
		if(showAttach && cotMail.getIsContainAttach()){
			List<IMailAttach> attachs = this.getMailAttach(mailId);
			cotMail.setAttachs(attachs);
		}
		
		return cotMail;
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailReadService#getSendMailInfo(java.lang.Integer, java.lang.String, boolean)
	 */
	public CotMail getSendMailInfo(Integer mailId,boolean showAttach) throws ServiceException{
		CotMail cotMail = this.getMailAllInfo(mailId,showAttach);
		if(cotMail == null)
			return null;
		// 包含附件并显示附件
		if(showAttach && cotMail.getIsContainAttach()){
			String basePath = MailServiceConstants.MAIL_FILE_BASEPATH;
			String urlPath = this.getUploadPath(MailServiceConstants.MAIL_ATTACH_TEMP_SEND_PATH, true);
			String fileName;
			for(IMailAttach attach : cotMail.getAttachs()){
				fileName = MailSendUtil.getRandomAttachName(attach.getName());
				ContextUtil.copyRealFile(basePath + attach.getUrl(), basePath + urlPath + fileName);
				attach.setUrl(urlPath + fileName);
			}
		}
		return cotMail;
	}
	
	public void saveMailToEml(List<CotMail> mailList) throws Exception{
		logger.debug("执行将mailList中未转换成EML的CotMail进行保存方法");
		if (mailList == null || mailList.size() == 0)
			return;
		File file = null;
		String path = MailServiceConstants.MAIL_FILE_BASEPATH;
		// 判断是否存在EML，已存则不生成EML
		for (CotMail cotMail : mailList) {
			file = new File(path + cotMail.getEmlPath());
			if(file.isFile())// 已存在
				continue;
			
			cotMail.setCotMailBodyHtml(this.getBodyHtml(cotMail.getId()));
			cotMail.setCotMailBodyText(this.getBodyText(cotMail.getId()));
			// 显示获得附件
			if(cotMail.getIsContainAttach()){
				List<IMailAttach> attachs = this.getMailAttach(cotMail.getId());
				cotMail.setAttachs(attachs);
			}
		   
			// TODO:cid
//		    MailLocalUtil.setCidToAttach(cotMail);
		    
		    MessageAnalytic.get().saveMailToEml(cotMail);
		    this.saveOrUpdateObj(cotMail);
		    
			file = null;
		}
	}
	@SuppressWarnings("unchecked")
	@Override
	public CotContact findExistByEMail(String emailUrl) {
		String hql = "from CotContact where contactEmail = :contactEmail";
		Map<String,Object> whereMap = new HashMap<String, Object>();
		whereMap.put("contactEmail", emailUrl);
		List<CotContact> list = this.getBaseDao().findRecordsByHql(hql, whereMap);
		if(list != null && list.size() > 0){
			return list.get(0);
		}
		return null;
	}
}
