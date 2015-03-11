/**
 * 
 */
package com.sail.cot.trigger;

import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.quartz.JobExecutionException;

import com.sail.cot.common.service.BaseSerivce;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.common.util.Log4WebUtil;
import com.sail.cot.domain.CotMailAccountCfg;
import com.sail.cot.mail.sysservice.MailReceiveTask;

/**
 * <p>
 * Title: 旗航ERP管理系统（QHERP）
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Copyright: Copyright (c) 2010
 * </p>
 * <p>
 * Company:
 * </p>
 * <p>
 * Create Time: Nov 25, 2010 11:24:22 AM
 * </p>
 * <p>
 * Class Name: TriggerOnlineJob.java
 * </p>
 * 
 * @author achui
 * 
 */
public class MailReciveJob {
	private Logger logger = Log4WebUtil.getLogger(MailReciveJob.class);
	/* (non-Javadoc)
	 * @see org.quartz.Job#exe cute(org.quartz.JobExecutionContext)
	 */
	public void execute() throws JobExecutionException {
		
		// TODO 接收邮件操作
//		JobDetail jobDetial = ctx.getJobDetail() ;
		//JobDataMap map = jobDetial.getJobDataMap();
		//CotMailAccountCfg mailCfg = (CotMailAccountCfg)map.get("emp");
		logger.info(new Date(System.currentTimeMillis())+":任务正在接收邮件.....操作");
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
