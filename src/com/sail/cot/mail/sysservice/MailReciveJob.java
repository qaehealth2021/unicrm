/**
 * 
 */
package com.sail.cot.mail.sysservice;

import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.quartz.Job;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.sail.cot.common.service.BaseSerivce;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.common.util.Log4WebUtil;
import com.sail.cot.domain.CotMailAccountCfg;

/**
 * <p>Title: 旗行办公自动化系统（OA）</p>
 * <p>Description:私人邮箱任务</p>
 * <p>Copyright: Copyright (c) 2008</p>
 * <p>Company: </p>
 * <p>Create Time: Jul 6, 2010 11:22:49 AM </p>
 * <p>Class Name: MailReciveJob.java </p>
 * @author achui
 *
 */
public class MailReciveJob implements Job{
	private Logger logger = Log4WebUtil.getLogger(MailReciveJob.class);
	/* (non-Javadoc)
	 * @see org.quartz.Job#exe cute(org.quartz.JobExecutionContext)
	 */
	public void execute(JobExecutionContext ctx) throws JobExecutionException {
		
		// TODO 接收邮件操作
		JobDetail jobDetial = ctx.getJobDetail() ;
		//JobDataMap map = jobDetial.getJobDataMap();
		//CotMailAccountCfg mailCfg = (CotMailAccountCfg)map.get("emp");
		logger.info(new Date(System.currentTimeMillis())+":任务"+jobDetial.getName()+"正在接收邮件.....操作");
		recvAsign();
	}
	public void recvAsign() {
		//logger.debug("开始执行自动接收邮件线程");
		List<CotMailAccountCfg> list = this.getBaseSerivce().getList("CotMailAccountCfg");
		//自动接收接收邮件
		MailReceiveTask task = new MailReceiveTask(list);
		task.executeTask();
	}
	private BaseSerivce baseSerivce;
	public BaseSerivce getBaseSerivce() {
		if(baseSerivce == null){
			baseSerivce = (BaseSerivce)ContextUtil.getBean("BaseService");
		}
		return baseSerivce;
	}
	public void setBaseSerivce(BaseSerivce baseSerivce) {
		this.baseSerivce = baseSerivce;
	}

}
