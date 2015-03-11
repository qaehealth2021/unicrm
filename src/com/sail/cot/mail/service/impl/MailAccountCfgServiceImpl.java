package com.sail.cot.mail.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.Transport;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Service;

import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.service.impl.BaseServiceImpl;
import com.sail.cot.domain.CotMailAccountCfg;
import com.sail.cot.mail.service.MailAccountCfgService;
import com.sail.cot.mail.util.MailConstants;
import com.sun.mail.pop3.POP3Store;
import com.zhao.mail.analytic.ErrorAnalytic;
import com.zhao.mail.entity.ExceInfo;
import com.zhao.mail.pop3.POP3Service;
import com.zhao.mail.smtp.SMTPService;

/**
 * 
 * <p>Title: 旗航 MailServer-2.0</p>
 * <p>Description:</p> 邮件账号
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Jan 31, 2012 2:14:17 PM </p>
 * <p>Class Name: MailAccountCfgServiceImpl.java </p>
 * @author zhao
 *
 */
@Service("MailAccountCfgService")
public class MailAccountCfgServiceImpl extends BaseServiceImpl implements MailAccountCfgService{
	
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailAccountCfgService#getReciveAccount(java.lang.Integer)
	 */
	@SuppressWarnings("unchecked")
	public CotMailAccountCfg getReciveAccount(Integer cfgId) throws ServiceException{
		CotMailAccountCfg accountCfg =  (CotMailAccountCfg) this.getObjById(cfgId, CotMailAccountCfg.class);
		if(accountCfg != null){
			String hql = "from CotMailAccountCfg obj where obj.mailBoxType = :mailBoxType and obj.mailAccount = :mailAccount";
			Map<String, Object> whereMap = new HashMap<String, Object>();
			whereMap.put("mailBoxType", MailConstants.MAIL_ACCOUNT_TYPE_G);
			whereMap.put("mailAccount", accountCfg.getMailAccount());
			List<CotMailAccountCfg> list = this.findRecordByHql(hql, whereMap);
			if(!list.isEmpty())
				accountCfg = list.get(0);
		}
		return accountCfg;
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailAccountCfgService#getReciveAccountId(java.lang.Integer)
	 */
	public Integer getReciveAccountId(Integer cfgId) throws ServiceException {
		CotMailAccountCfg accountCfg = this.getReciveAccount(cfgId);
		return accountCfg.getId();
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailAccountCfgService#saveAccountCfg(com.sail.cot.domain.CotMailAccountCfg)
	 */
	public void saveAccountCfg(CotMailAccountCfg accountCfg)
			throws ServiceException {
		
		accountCfg.getPop3Cfg().setAccountCfg(accountCfg);
		accountCfg.getSmtpCfg().setAccountCfg(accountCfg);
		boolean isNew = false;
		if(accountCfg.getId() == null){
			isNew = true;
		}
		this.saveOrUpdateObj(accountCfg);
//		if(isNew){
//			//初始化未读信息。cot_msg_unread
//			CotMsgUnread unread = new CotMsgUnread();
//			unread.setAccountCfgId(accountCfg.getId());
//			unread.setEmpsId(accountCfg.getEmpId().getId());
//			unread.setType("MAIL");
//			unread.setUnreadCount(0);
//			this.saveOrUpdateObj(unread);
//		}
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailAccountCfgService#connTest(com.sail.cot.domain.CotMailAccountCfg)
	 */
	public String connTest(CotMailAccountCfg accountCfg){
		Transport transport = null;
		POP3Store store = null;
		accountCfg.getPop3Cfg().setAccountCfg(accountCfg);
		accountCfg.getSmtpCfg().setAccountCfg(accountCfg);
		ExceInfo pop3Info = null;
		try {
			store = POP3Service.connectStore(accountCfg.getPop3Cfg());
		} catch (MessagingException e) {
			pop3Info = ErrorAnalytic.getExInfo(e);
		}finally{
			try {
				POP3Service.closeStore(store);
			} catch (MessagingException e) {
				pop3Info = ErrorAnalytic.getExInfo(e);
			}
		}
		ExceInfo smtpInfo = null;
		try {
			transport = SMTPService.connectTransport(accountCfg.getSmtpCfg());
		} catch (MessagingException e) {
			smtpInfo = ErrorAnalytic.getExInfo(e);
		}finally{
			try {
				SMTPService.closeTransport(transport);
			} catch (MessagingException e) {
				smtpInfo = ErrorAnalytic.getExInfo(e);
			}
		}
		if(pop3Info == null && smtpInfo == null){
			return null;
		}else{
			String msg = "POP3：";
			msg += pop3Info == null ? "连接成功" : pop3Info.getAnalyMsg();
			msg += "<br />";
			msg += "SMTP：";
			msg += smtpInfo == null ? "连接成功" : smtpInfo.getAnalyMsg();
			return msg;
		}
	}
	/* (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailAccountCfgService#getEmpCfgList(java.lang.String)
	 */
	@Override
	public List<CotMailAccountCfg> getEmpCfgList(String flag){
		String hql ="from CotMailAccountCfg obj where obj.mailBoxType = :mailBoxType";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("mailBoxType",flag);
		List<CotMailAccountCfg> list = this.findRecordByHql(hql, whereMap);
		if(list.size()>0){
			return list;
		}
		return null;
	}
	/* (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailAccountCfgService#getAccountCfgByEmpId(java.lang.String)
	 */
	@Override
	public CotMailAccountCfg getAccountCfgByEmpId(Integer empId) {
		// TODO Auto-generated method stub
		String hql = " from CotMailAccountCfg where 1=1 and empId.id = "+empId;
		List<CotMailAccountCfg> list = this.findRecordByHql(hql);
		if(CollectionUtils.isNotEmpty(list)){
			return list.get(0);
		}
		return null;
	}
}
