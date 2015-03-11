package com.sail.cot.mail.util;

import org.apache.log4j.Logger;
import org.quartz.Job;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.impl.StdSchedulerFactory;

import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.common.util.Log4WebUtil;
import com.sail.cot.domain.CotMail;
import com.sail.cot.mail.service.MailReadService;
import com.zhao.mail.smtp.SMTPSendRunnable;

public class MailSendJob implements Job{
	private Logger logger = Log4WebUtil.getLogger(MailSendJob.class);
	public void execute(JobExecutionContext context) throws JobExecutionException {
		
		
		
		JobDetail jobDetail = context.getJobDetail();       
		JobDataMap dataMap = jobDetail.getJobDataMap(); 
		
		Integer mailId = (Integer) dataMap.get("mailId");
		String subject = (String) dataMap.get("subject");
		
		try {
			CotMail cotMail = this.getReadService().getMailAllInfo(mailId,true);
			
			// 不为空，并且发送类型不为已发送
			if(cotMail != null && !MailConstants.MAIL_TYPE_SEND.equals(cotMail.getMailType())){
				logger.info("定时邮件<"+subject+">准备发送");
				// 等待发送，加入邮件发送缓存
				SMTPSendRunnable.addMail(cotMail);
			}else{
				logger.info("定时任务执行时，邮件<"+subject+">已不存在");
			}
			Scheduler scheduler = StdSchedulerFactory.getDefaultScheduler();
			scheduler.deleteJob("MAIL_ID_"+mailId, "SEND_MAIL_GROUP");
		} catch (SchedulerException e) {
			logger.error("删除定时邮件任务失败，失败原因:"+e.getMessage(), e);
		} catch (Exception e){
			logger.error("执行定时邮件任务失败，失败原因:"+e.getMessage(), e);
		}
	}
	private MailReadService readService;
	private MailReadService getReadService(){
		if(readService == null){
			readService = (MailReadService) ContextUtil.getBean("MailReadService");
		}
		return readService;
	}
}
