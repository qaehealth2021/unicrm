package com.sail.cot.mail.util;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.RandomStringUtils;
import org.apache.commons.mail.EmailException;
import org.apache.log4j.Logger;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.TriggerUtils;
import org.quartz.impl.StdSchedulerFactory;

import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.common.util.Log4WebUtil;
import com.sail.cot.domain.CotContact;
import com.sail.cot.domain.CotMail;
import com.sail.cot.domain.CotMailAccountCfg;
import com.sail.cot.domain.CotMailAttach;
import com.sail.cot.mail.service.MailSendService;
import com.sail.cot.mail.service.MailTreeService;
import com.zhao.mail.entity.IMailAttach;
import com.zhao.mail.entity.IMailInfo;
import com.zhao.mail.entity.MailPerson;
import com.zhao.mail.smtp.SMTPSendMessage;
import com.zhao.mail.smtp.SMTPSendRunnable;
import com.zhao.mail.smtp.SMTPSendUtil;
import com.zhao.mail.util.MailServiceConstants;

public class MailSendUtil implements SMTPSendUtil{
	private Logger logger = Log4WebUtil.getLogger(MailSendUtil.class);
	private MailSendService sendService;
	private MailSendService getSendService(){
		if(sendService == null){
			sendService = (MailSendService) ContextUtil.getBean("MailSendService");
		}
		return sendService;
	}
	private MailTreeService treeService;
	private MailTreeService getTreeService(){
		if(treeService == null){
			treeService = (MailTreeService) ContextUtil.getBean("MailTreeService");
		}
		return treeService;
	}
	private MailExecutorPool mailPool;
	private MailExecutorPool getMailExecutorPool(){
		if(mailPool == null){
			mailPool = (MailExecutorPool) ContextUtil.getBean("MailExecutorPool");
		}
		return mailPool;
	}
	
	public MailSendUtil(){
		SMTPSendRunnable.initRunnable(this);
	}
	
	/**
	 * 发送处理CotMail邮件
	 * @param cotMail
	 * @throws EmailException 
	 * @throws UnsupportedEncodingException 
	 */
	public void sendCotMail(CotMail cotMail) throws Exception{
		logger.info("执行发送处理CotMail邮件");
		String tag = cotMail.getMailTag();
		//加入联系人列表
		 this.addToContact(cotMail);
		if(tag != null){
			if(tag.indexOf(MailServiceConstants.MAIL_TAG_PROMPTLY) != -1){ // 立即发送
				this.sendMail(cotMail);
				this.sendEnd(cotMail);
				return;
			}else if(tag.indexOf(MailServiceConstants.MAIL_TAG_QUARTZ) != -1){ // 定时发送
				this.sendQuartz(cotMail);
				return;
			}
		}
		// 等待发送，加入邮件发送缓存
		SMTPSendRunnable.addMail(cotMail);
	}
	/**
	 * 发送已处理好的邮件
	 * @param cotMail
	 * @throws EmailException 
	 * @throws UnsupportedEncodingException 
	 */
	public void sendMail(IMailInfo mailInfo) throws Exception{
		logger.info("执行发送已处理好的邮件");
		CotMail cotMail = (CotMail)mailInfo;
		this.setCidToAttach(cotMail); // 设置CID IMAGE
		//下载文件
		this.getFileFromRemoteToLocal(cotMail);
		Integer accountId = cotMail.getNodeId().getAccountCfgId().getId();
		CotMailAccountCfg accountCfg = (CotMailAccountCfg) this.getSendService().getObjById(accountId, CotMailAccountCfg.class);
		String account = accountCfg.getMailAccount();
		String tag = cotMail.getMailTag(); // 判断发送状态，是否群发
		if(tag != null && tag.indexOf(MailServiceConstants.MAIL_TAG_PARTING)!=-1){// 群发
			Integer toIndex = cotMail.getToIndex();
			if(toIndex == null || toIndex < 0)
				toIndex = 0;
			logger.info("群发 <"+account + "> to:"+cotMail.getToUrl()+" \""+cotMail.getSubject()+"\"");
			List<MailPerson> toList = cotMail.getTo();
			for (int i = toIndex; i < toList.size(); i++) {
				MailPerson to = toList.get(i);
				logger.info("群发 <"+account + "> 开始发送第:"+(i+1)+"个收件人 to:"+to.getEmailUrl()+" \""+cotMail.getSubject()+"\"");
				// TODO:替换模板签名
				this.replaceTemplateName(cotMail, to);
				cotMail.setToIndex(i);	// 设置当前要接收的收件人
				SMTPSendMessage.sendMail(accountCfg.getSmtpCfg(), cotMail);
				SMTPSendRunnable.threadSleep(account);// 防止发太快，被邮件服务器列入黑名单
			}
			
			cotMail.setToIndex(toList.size());	// 全都发送成功，则设置为收件人数
			cotMail.setTo(toList);
		}else{	// 不为群发送
			logger.info("发送 <"+account + "> to:"+cotMail.getToUrl()+" \""+cotMail.getSubject()+"\"");
			SMTPSendMessage.sendMail(accountCfg.getSmtpCfg(), cotMail);
		}
	}
	public void replaceTemplateName(CotMail cotMail,MailPerson mailPerson){
		String name;
		String custName = mailPerson.getName();
		if (custName.equals("")) {
			String url = mailPerson.getEmailUrl();
			int start = url.indexOf("@");
			name = url.substring(0, start);
		} else {
			name = mailPerson.getName();
		}
		String body = cotMail.getBodyHtml();
		if(body != null){
			String regStr = "(?s)(?i)<span.*tage=\"sendMailToName\"[^>]*>[^<]*</span>";
			String replaceStr = "<span tage=\"sendMailToName\" style=\"display:inline\">"+name+"</span>";
			body = body.replaceAll(regStr,replaceStr);
			cotMail.setBodyHtml(body);
		}
	}
	/*
	 * (non-Javadoc)
	 * @see com.zhao.mail.smtp.SMTPSendUtil#isExistsMail(com.zhao.mail.entity.IMailInfo)
	 */
	@SuppressWarnings({ "rawtypes", "null" })
	public boolean isExistsMail(IMailInfo mailInfo) {
		logger.info("执行查找已存在邮件方法");
		String hql = "select id from CotMail where id = :id";
		Map<String,Object> whereMap = new HashMap<String, Object>();
		whereMap.put("id", ((CotMail)mailInfo).getId());
		try {
			List list = this.getSendService().findRecordByHql(hql, whereMap);
			return list != null || !list.isEmpty();
		} catch (ServiceException e) {
			logger.error("查找已存在邮件方法失败",e);
			return true;
		}
	}
	/*
	 * (non-Javadoc)
	 * @see com.zhao.mail.smtp.SMTPSendUtil#sendEnd(com.zhao.mail.entity.IMailInfo)
	 */
	public void sendEnd(IMailInfo mailInfo) {
		logger.info("执行处理邮件发送结束");
		try {
			CotMail cotMail = (CotMail) mailInfo;
			this.setSendRight(cotMail);
			this.getSendService().saveOrUpdateObj(cotMail);
			this.updateOldMail(cotMail);
		} catch (ServiceException e) {
			logger.error("保存失败",e);
		}
	}
	/*
	 * (non-Javadoc)
	 * @see com.zhao.mail.smtp.SMTPSendUtil#sendError(com.zhao.mail.entity.IMailInfo)
	 */
	@SuppressWarnings("static-access")
	public void sendError(IMailInfo mailInfo) {
		logger.info("执行处理邮件发送错误");
		CotMail cotMail = (CotMail) mailInfo;
		// 标识邮件为错误邮件
		cotMail.setMailTag(cotMail.getMailTag() + MailServiceConstants.MAIL_TAG_ERROR);
		// 修改邮件类型为草稿类型
		cotMail.setMailType(MailConstants.MAIL_TYPE_DARTF);
		
		try {
			this.getSendService().saveOrUpdateObj(cotMail);
			String tag = cotMail.getMailTag(); // 判断发送状态，是否群发
			// 如果是群发失败，并且有几封已发送，则再另保存一份已发送的
			if(tag != null && tag.indexOf(MailServiceConstants.MAIL_TAG_PARTING)!=-1 && cotMail.getToIndex() >0){// 群发
				cotMail.setId(null); // 将ID设置为空，则hibernate会新建
				cotMail.setAddTime(ContextUtil.getCurrentDate());
				cotMail.setErrorMsg(null);
				List<MailPerson> to = cotMail.getTo().subList(0, cotMail.getToIndex()); // 获得已成功发送的收件人
				cotMail.setTo(to);
				cotMail.setToIndex(null);
				
				this.setSendRight(cotMail);
				
				this.getSendService().saveOrUpdateObj(cotMail);	// 保存已发送
				
				if(cotMail.getIsContainAttach()){
					List<IMailAttach> attachList = cotMail.getAttachs();
					CotMailAttach mailAttach;
					String basePath = MailServiceConstants.MAIL_FILE_BASEPATH;
					String sendUrl = this.getSendService().getUploadPath(MailServiceConstants.MAIL_ATTACH_SAVE_SEND_PATH, true);
					String fileName;
					for (IMailAttach iMailAttach : attachList) {
						mailAttach = (CotMailAttach)iMailAttach;
						mailAttach.setId(null);
						mailAttach.setCotMail(cotMail);
						fileName = this.getRandomAttachName(mailAttach.getName());
						ContextUtil.copyRealFile(basePath + mailAttach.getUrl(), basePath + sendUrl + fileName);
						mailAttach.setUrl(sendUrl + fileName);
					}
					this.getSendService().saveOrUpdateList(attachList);
				}
				
			}
		} catch (ServiceException e) {
			logger.error("执行处理邮件发送错误失败",e);
		}
	}
	public void setCidToAttach(CotMail cotMail) {
		String body = cotMail.getBodyHtml();
		
		Pattern pattern = Pattern.compile(MailConstants.MAIL_FILE_DOWN_URL_REGEX + "([^\"'\\s>)]+)",Pattern.DOTALL);
		Matcher matcher = pattern.matcher(body);
		CotMailAttach mailAttach = null;
		while (matcher.find()) {
			if(cotMail.getAttachs() == null)
				cotMail.setAttachs(new ArrayList<IMailAttach>());
			String group = matcher.group(matcher.groupCount());
			File file = new File(MailServiceConstants.MAIL_FILE_BASEPATH + group);
			if(file.exists()){
				mailAttach = new CotMailAttach();
				mailAttach.setUrl(group);	// 设置附件的绝对路径
				mailAttach.setCid(matcher.group());	// 设置要替换成ID的字符串
				mailAttach.setName(file.getName());	// 文件名
				cotMail.getAttachs().add(mailAttach);
			}
		}
	}
	private void sendQuartz(CotMail cotMail) throws SchedulerException{
		String subject = cotMail.getSubject();
		Integer mailId = cotMail.getId();
		Date sendTime = cotMail.getSendTime();
		logger.info("邮件<"+cotMail.getSubject()+">定时"+sendTime+"发送");
		
		Scheduler scheduler = StdSchedulerFactory.getDefaultScheduler();
		JobDetail jobDetail = new JobDetail("MAIL_ID_"+mailId,"SEND_MAIL_GROUP",MailSendJob.class);
		
		Trigger trigger = TriggerUtils.makeMinutelyTrigger(3);
		trigger.setName("sendTrigger"+mailId);
		trigger.setStartTime(sendTime);
		
		JobDataMap map = new JobDataMap();
		map.put("mailId", mailId);
		map.put("subject", subject);
		jobDetail.setJobDataMap(map);
		
		scheduler.scheduleJob(jobDetail, trigger);
		
		scheduler.start();
	}
	/**
	 * 发送成功，设置信息
	 * @param cotMail
	 */
	private void setSendRight(CotMail cotMail){
		logger.info("执行设置发送成功邮件信息");
		try {
			Integer nodeId = getTreeService().findNodeIdByType(cotMail.getNodeId().getAccountCfgId().getId(),MailConstants.MAIL_TYPE_SEND);
			// TODO：如果为公共邮箱
			
			cotMail.getNodeId().setId(nodeId);
			cotMail.setMailType(MailConstants.MAIL_TYPE_SEND);
			// 发送时间
			cotMail.setSendTime(ContextUtil.getCurrentDate());
			
		} catch (ServiceException e) {
			logger.error("设置发送成功邮件信息失败",e);
		}
	}
	/**
	 * 更新原邮件TAG
	 * @param cotMail
	 * @throws ServiceException 
	 */
	private void updateOldMail(CotMail cotMail) throws ServiceException{
		logger.info("执行更新原邮件");
		if(cotMail.getOldMailId() != null){
			CotMail oldMail = (CotMail) this.getSendService().getObjById(cotMail.getOldMailId(), CotMail.class);
			if(oldMail == null)// 原邮件已不存在
				return;
			// 获得原邮件类型
			String oldType = oldMail.getMailType();
			// 如果原邮件为收件类型
			if(MailConstants.MAIL_TYPE_RECIVE.equals(oldType)){	
				String mailTag = cotMail.getMailTag();
				if(mailTag.indexOf(MailServiceConstants.MAIL_TAG_FORWARD) != -1) // 转发
					this.setOldMailTag(oldMail, MailServiceConstants.MAIL_TAG_FORWARD);
				else if(mailTag.indexOf(MailServiceConstants.MAIL_TAG_REPLY) != -1)
					this.setOldMailTag(oldMail, MailServiceConstants.MAIL_TAG_REPLY); // 回复
				
			}
		}
	}
	/**
	 * 更新邮件标识
	 * @param oldMail
	 * @param mailTag
	 * @throws ServiceException
	 */
	private void setOldMailTag(CotMail oldMail,String mailTag) throws ServiceException{
		logger.info("执行更新邮件标识");
		String oldMalTag = oldMail.getMailTag();
		// 不存在回复标识，则更新
		if(oldMalTag==null)// 为空，直接插入
			oldMail.setMailTag(mailTag);
		else if(oldMalTag.indexOf(mailTag)==-1)// 不为空，加上回复标识 
			oldMail.setMailTag(oldMalTag + mailTag);
		else 
			return;
		this.getSendService().saveOrUpdateObj(oldMail);
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.zhao.mail.smtp.SMTPSendUtil#getService()
	 */
	public ExecutorService getService() {
		return this.getMailExecutorPool().getService();
	}
	
	public static String getRandomAttachName(String name){
		String postfixName = name.lastIndexOf(".") == -1 ? ""
				: name.substring(name.lastIndexOf("."));
		name = System.currentTimeMillis() + RandomStringUtils.randomAlphanumeric(10) + postfixName;
		return name;
	}
	
	/**
	 * @see 功能描述（必填）：在集群模式下发生邮件的时候，需要把附件从远程服务器下到本地，发送出去
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 20, 2012 11:36:33 AM</p>
	 * @param path
	 * 返回值：void
	 */
	private void getFileFromRemoteToLocal(CotMail mail){
		List<IMailAttach> attachList = mail.getAttachs();
		if(CollectionUtils.isNotEmpty(attachList) && ContextUtil.isLoadBalnace()){
			String basePath = MailServiceConstants.MAIL_FILE_BASEPATH;
			for(IMailAttach attach : attachList){
				String path = basePath + attach.getUrl();
				ContextUtil.getFileFromRemoteToLocal(attach.getUrl(), path);
			}
		}
	}
	/**
	 * @see 功能描述（必填）：将陌生接收人的邮箱地址添加到联系人中，（如果邮箱地址在联系人列表中不存在）
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 22, 2012 3:11:36 PM</p>
	 * @param mail
	 * 返回值：void
	 */
	private void addToContact(CotMail mail){
		List<MailPerson> toList = mail.getTo();
		List<CotContact> contactList = new ArrayList<CotContact>();
		if(CollectionUtils.isNotEmpty(toList)){
			for(MailPerson person : toList){
				List list = sendService.findRecordByHql("from CotContact obj where obj.contactEmail='"+person.getEmailUrl()+"'");
				if(CollectionUtils.isNotEmpty(list)) continue;//如果存在就不插入
				CotContact contact = new CotContact();
				contact.setContactEmail(person.getEmailUrl());
				contact.setContactPerson(person.getEmailUrl());
				contact.setContactFlag("C");
				contact.setEmpsId(mail.getBelongEmpId());
				contactList.add(contact);
			}
			//保存到联系人列表
			sendService.saveOrUpdateList(contactList);
		}
	}
}
