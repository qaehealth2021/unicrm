/**
 * 
 */
package com.sail.cot.mail.sysservice;

import java.util.List;

import org.apache.log4j.Logger;

import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.common.util.Log4WebUtil;
import com.sail.cot.domain.CotMailAccountCfg;
import com.sail.cot.mail.service.MailReciveService;
import com.sail.cot.mail.util.MailConstants;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:邮件自动接收线程</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Sep 13, 2012 11:08:30 AM </p>
 * <p>Class Name: MailReceiveThread.java </p>
 * @author achui
 *
 */
public class MailReceiveThread implements Runnable{
	private Logger logger = Log4WebUtil.getLogger(MailReceiveThread.class);
	private List<CotMailAccountCfg> accountCfgList;//需要线程处理的邮箱账号。处于性能考虑
	
	public MailReceiveThread(){
		
	}
	public MailReceiveThread(List<CotMailAccountCfg> accountCfgList){
		this.accountCfgList = accountCfgList;
	}
	private MailReciveService mailReciveService;
	public MailReciveService getMailReciveService() {
		if(mailReciveService == null){
			mailReciveService = (MailReciveService)ContextUtil.getBean("MailReciveService");
		}
		return mailReciveService;
	}
	/* (non-Javadoc)
	 * @see java.lang.Runnable#run()
	 */
	@Override
	public void run() {
		//接收邮件
		logger.debug("邮件接收线程开始执行,处理账户数:"+this.accountCfgList.size());
		for(int i=0; i<this.accountCfgList.size(); i++){
			CotMailAccountCfg accountCfg = this.accountCfgList.get(i);
			logger.info("[自动收发线程]-邮箱账户:"+accountCfg.getMailAccount()+"正在接收邮件... ...");
			this.getMailReciveService().recivePOP3Message(accountCfg.getId());
			this.getMailReciveService().cancleReciveMail(accountCfg.getId());
			logger.info(MailConstants.MAIL_AUTO_RECEIVE_INTERVAL+"分钟后再次执行");
		}
	}

}
