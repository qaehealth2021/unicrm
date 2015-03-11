/**
 * 
 */
package com.sail.cot.mail.sysservice;

import java.util.Calendar;

import org.apache.log4j.Logger;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.TriggerUtils;
import org.quartz.impl.StdSchedulerFactory;

import com.sail.cot.common.util.Log4WebUtil;
import com.sail.cot.mail.util.MailConstants;



/**
 * <p>Title: 旗行办公自动化系统（OA）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2008</p>
 * <p>Company: </p>
 * <p>Create Time: Jul 6, 2010 11:31:56 AM </p>
 * <p>Class Name: MailRecvSchedule.java </p>
 * @author achui
 *
 */
public class MailRecvSchedule {
	Logger logger = Log4WebUtil.getLogger(MailRecvSchedule.class);
	static String MAIL_RECV_GROUP = "MAIL_RECV_GROUP";
	static String MAIL_TRIGGER_GROUP = "MAIL_TRIGGER_GROUP";
	/**
	 * 描述： 启动邮件接收服务；
	 * @return
	 * 返回值：boolean
	 */
	public boolean startSchedule(){
		logger.info("启动邮箱自动接收服务... ...");
		try {
			Scheduler scheduler = this.createScheduler();
			scheduler.start();
			JobDetail jobDetail = new JobDetail("AUTO_MAIL_RECEIVE",MAIL_RECV_GROUP,MailReciveJob.class);
			//配置定时任务触发时间
			Trigger trigger = TriggerUtils.makeMinutelyTrigger(MailConstants.MAIL_AUTO_RECEIVE_INTERVAL);
			trigger.setName("autoreceivetrigger");
			trigger.setGroup(MAIL_TRIGGER_GROUP);
			Calendar calendar = Calendar.getInstance();
			calendar.add(Calendar.SECOND, 30);
			//延迟5秒启动
			trigger.setStartTime(calendar.getTime());
			scheduler.scheduleJob(jobDetail, trigger);
		} catch (SchedulerException e) {
			logger.error("创建计划任务失败，失败原因:"+e.getMessage(), e);
			e.printStackTrace();
			return false;
		}
		return true;
	}
	/**
	 * 描述： 启动或停止某个任务
	 * @param jobName 任务名称，用员工的ID识别
	 * @param flag 判断启动或者暂停的标识 P(ause):暂停，R(esume)：启动
	 * @return
	 * 返回值：boolean
	 */
	public boolean pauseOrresumeJobByName(String jobName,String flag){
		try {
			Scheduler scheduler = this.createScheduler();
			if("P".equals(flag))
				scheduler.pauseJob(jobName, MAIL_RECV_GROUP);
			else if("R".equals(flag))
				scheduler.resumeJob(jobName, MAIL_RECV_GROUP);
		} catch (SchedulerException e) {
			logger.error("暂停计划任务失败，失败原因:"+e.getMessage(), e);
			e.printStackTrace();
			return false;
		}
		return false;
	}
	
	/**
	 * 描述：获取定时任务配置对象
	 * @return
	 * @throws SchedulerException
	 * 返回值：Scheduler
	 */
	public Scheduler createScheduler() throws SchedulerException{
		Scheduler scheduler = StdSchedulerFactory.getDefaultScheduler();
		return scheduler;
	}
	
	/**
	 * 描述：暂停或继续或有任务
	 * @param flag 判断启动或者暂停的标识 P(ause):暂停，R(esume)：启动
	 * @return
	 * 返回值：
	 */
	public boolean pauseOrresumAllJobs(String flag) {
		try {
			Scheduler scheduler = this.createScheduler(); 
			String[] jobNames = scheduler.getJobNames(MAIL_RECV_GROUP);
			for(String jobName : jobNames){
				this.pauseOrresumeJobByName(jobName, flag);
			}
			
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			logger.error("暂停或继续列表任务失败，失败原因:"+e.getMessage(), e);
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	
	public void stopAll() {
		try {
			Scheduler scheduler = this.createScheduler();
			scheduler.shutdown();
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
			
	}
}
