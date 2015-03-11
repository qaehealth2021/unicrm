package com.sail.cot.mail.service.impl;

import java.io.File;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.commons.fileupload.FileItem;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.jason.core.exception.DAOException;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.service.impl.BaseServiceImpl;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.common.util.ExceptionStackTracePaser;
import com.sail.cot.common.util.Log4WebUtil;
import com.sail.cot.common.util.StringUtil;
import com.sail.cot.domain.CotEmps;
import com.sail.cot.domain.CotMail;
import com.sail.cot.domain.CotMailAttach;
import com.sail.cot.domain.CotMailBodyHtml;
import com.sail.cot.mail.service.MailReadService;
import com.sail.cot.mail.service.MailSendService;
import com.sail.cot.mail.service.MailTreeService;
import com.sail.cot.mail.util.MailConstants;
import com.sail.cot.mail.util.MailSendUtil;
import com.sail.cot.service.BaseData;
import com.zhao.mail.analytic.MessageAnalytic;
import com.zhao.mail.entity.IMailAttach;
import com.zhao.mail.util.CommonUtil;
import com.zhao.mail.util.MailServiceConstants;
/**
 * 
 * <p>Title: 旗航 MailServer-2.0</p>
 * <p>Description:发送邮件类</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Feb 28, 2012 5:19:55 PM </p>
 * <p>Class Name: MailSendServiceImpl.java </p>
 * @author zhao
 *
 */
@Service("MailSendService")
public class MailSendServiceImpl extends BaseServiceImpl implements MailSendService{
	private Logger logger = Log4WebUtil.getLogger(MailSendServiceImpl.class);
	private MailSendUtil sendUtil = new MailSendUtil();
	@Resource(name="MailTreeService")
	private MailTreeService treeService;
	@Resource(name="MailReadService")
	private MailReadService readService;
	@Resource(name="BaseData")
	private BaseData baseData;
	
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailSendService#addSendout(com.sail.cot.domain.CotMail, java.lang.String)
	 */
	public Integer addSendout(CotMail cotMail) throws ServiceException{
		logger.debug("执行发送邮件并添加到数据库方法");
		// 保存草稿
		this.saveDraft(cotMail);
		// 发送邮件
		try {
			sendUtil.sendCotMail(cotMail);
			return cotMail.getId();
		} catch (Exception e) {
			logger.error("发送邮件失败",e);
			cotMail.setErrorMsg(e.getMessage());
			sendUtil.sendError(cotMail);
			throw new ServiceException(e.getMessage());
		}
	}
	@Override
	public String upload(FileItem fileItem,String uploadPath,String tbName,
			String id,String field,String fkIdVal,String fkField,boolean doDbOp,String paramJson,boolean isRName,HttpSession session) throws ServiceException{
		String fileName = StringUtil.takeOutFileName(fileItem.getName());
		CotMailAttach attach = new CotMailAttach();
		attach.setName(fileName);

		fileName = MailSendUtil.getRandomAttachName(fileName);
		
		
		String path = MailServiceConstants.MAIL_ATTACH_TEMP_SEND_PATH + uploadPath;
		
		if(paramJson != null){
			JSONObject jsonObject = JSONObject.fromObject(paramJson);
			if(jsonObject.containsKey("isCidImage"))
				path = MailServiceConstants.MAIL_ATTACH_SAVE_SEND_PATH + uploadPath;
		}
		
		File pf = new File(MailServiceConstants.MAIL_FILE_BASEPATH + path);
		if (!pf.exists())
			pf.mkdirs();
		File file = new File(MailServiceConstants.MAIL_FILE_BASEPATH + path + fileName);
		// 上传文件
		try {
			fileItem.write(file);
		} catch (Exception e) {
			String msg = ExceptionStackTracePaser.paserStactTrace(e);
			throw new ServiceException("文件上传异常：" + msg);
		}
		attach.setUrl(path + fileName);
		attach.setSize((int)file.length());
		
		// 上传获取文件名
		JSONObject json = new JSONObject();
		json.put("filePath", attach.getUrl());
		json.put("fileName", MailConstants.MAIL_FILE_DOWN_URL + attach.getUrl());
		json.put("success", true);
		return json.toString();
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailSendService#saveDraft(com.sail.cot.domain.CotMail, java.lang.String)
	 */
	public Integer saveDraft(CotMail cotMail) throws ServiceException {
		
		logger.debug("保存草稿");
		// 如果草稿不为空
		if(cotMail.getId() != null){
			CotMail currentMail = readService.getMailAllInfo(cotMail.getId(), true);
			// 如果草稿保存，则在原草稿上修改
			if(currentMail != null && currentMail.getMailType().equals(MailConstants.MAIL_TYPE_DARTF)){ 
				this.updateDartMail(cotMail, currentMail);
			}else{ // 原草稿已删除或已不为草稿，另存一份
				cotMail.setId(null);
				this.addSendMail(cotMail);
			}
		}else{
			this.addSendMail(cotMail);
		}
		try {
			MessageAnalytic.get().saveMailToEml(cotMail);
			this.saveOrUpdateObj(cotMail);
		} catch (Exception e) {
			logger.error("保存邮件为EML出错",e);
		}
		return cotMail.getId();
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailSendService#delSessionAttach(java.lang.String, java.lang.String)
	 */
	public void delAttachByUrl(String url) {
		ContextUtil.deleteRealFile(MailServiceConstants.MAIL_FILE_BASEPATH + url);
	}
	
	public MailSendUtil getSendUtil(){
		return this.sendUtil;
	}
	//[start]private
	
	private void saveSendAttachs(CotMail cotMail) throws ServiceException{
		List<IMailAttach> attachs = cotMail.getAttachs();
		if(attachs != null && !attachs.isEmpty()){
			String baseUrl = this.getUploadPath(MailServiceConstants.MAIL_ATTACH_SAVE_SEND_PATH, true);
			CotMailAttach mailAttach = null;
			String fileName = null;
			for (int i = 0; i < attachs.size(); i++) {
				mailAttach = (CotMailAttach) attachs.get(i);
				mailAttach.setCotMail(cotMail);
				fileName = MailSendUtil.getRandomAttachName(mailAttach.getName());
				ContextUtil.copyRealFile(MailServiceConstants.MAIL_FILE_BASEPATH + mailAttach.getUrl(),MailServiceConstants.MAIL_FILE_BASEPATH + baseUrl + fileName); // 从临时目录转移到保存目录
				mailAttach.setUrl(baseUrl + fileName);
			}
			// 保存附件
			this.saveOrUpdateList(attachs);			
		}
	}
	
	/**
	 * 
	 * @see 功能描述（必填）：保存发信类型邮件
	 * <p>返回值：void</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Feb 28, 2012 5:58:15 PM</p>
	 * @param cotMail
	 * @param random
	 * @param sendType
	 * @throws ServiceException
	 */
	private Integer addSendMail(CotMail cotMail) throws ServiceException{
		logger.debug("保存发信类型邮件");
		// 调用员工信息
		CotEmps cotEmps = this.baseData.getCurrentEmps();
		// 添加到数据库时间
		cotMail.setAddTime(ContextUtil.getCurrentDate());
	    // 设置保存邮件的员工
	    cotMail.setSendEmpId(cotEmps);
	    // TODO：公共邮箱
	    if(cotMail.getNodeId() != null && cotMail.getNodeId().getId() == null){
	    	Integer nodeId = treeService.findNodeIdByType(cotMail.getNodeId().getAccountCfgId().getId(), MailConstants.MAIL_NODE_TYPE_DRATF);
	    	cotMail.getNodeId().setId(nodeId);
	    }
	    this.saveOrUpdateObj(cotMail);
	    CotMailBodyHtml bodyHtml = cotMail.getCotMailBodyHtml();
    	this.saveOrUpdateObj(bodyHtml);
    	
    	String bodyText = CommonUtil.HtmlToText(bodyHtml.getBody());
    	cotMail.setBodyText(bodyText);
    	this.saveOrUpdateObj(cotMail.getCotMailBodyText());
	    	
	    this.saveSendAttachs(cotMail);
	    return cotMail.getId();
	}
	private Integer updateDartMail(CotMail cotMail, CotMail currentMail)
			throws ServiceException {
		// 修该时间
		cotMail.setAddTime(ContextUtil.getCurrentDate());
//				currentMail.setAttachs(list)
		// 调用员工信息
		CotEmps cotEmps = this.baseData.getCurrentEmps();
		cotMail.setExecEmpId(cotEmps);
		// 删除原附件
		if(currentMail.getIsContainAttach())
			for (IMailAttach mailAttach : currentMail.getAttachs()) {
				try {
					this.getBaseDao().deleteRecordById(((CotMailAttach)mailAttach).getId(),"CotMailAttach");
				} catch (DAOException e) {
					throw new ServiceException(e.getMessage());
				}
				ContextUtil.deleteRealFile(MailServiceConstants.MAIL_FILE_BASEPATH + mailAttach.getUrl());
			}
		// 原节点
		cotMail.setNodeId(currentMail.getNodeId());
		// 相关邮件
		cotMail.setOldMailId(currentMail.getOldMailId());
		
		this.saveOrUpdateObj(cotMail);
		
		currentMail.setBodyHtml(cotMail.getBodyHtml());
		this.saveOrUpdateObj(currentMail.getCotMailBodyHtml());
		
		String bodyText = CommonUtil.HtmlToText(cotMail.getBodyHtml());
		currentMail.setBodyText(bodyText);
		this.saveOrUpdateObj(currentMail.getCotMailBodyText());
		
		this.saveSendAttachs(cotMail);
		
		return cotMail.getId();
	}
	//[end]
}
