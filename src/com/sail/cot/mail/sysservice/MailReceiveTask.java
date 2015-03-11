/**
 * 
 */
package com.sail.cot.mail.sysservice;

import java.util.ArrayList;
import java.util.List;

import org.springframework.core.task.TaskExecutor;

import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.domain.CotMailAccountCfg;
import com.sail.cot.mail.util.MailConstants;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Sep 13, 2012 11:31:57 AM </p>
 * <p>Class Name: MailReceiveTask.java </p>
 * @author achui
 *
 */
public class MailReceiveTask {
	private List<CotMailAccountCfg> list;//需要进行自动接收的邮箱账号
	private TaskExecutor executor;
	
	public TaskExecutor getExecutor() {
		if(executor == null){
			executor = (TaskExecutor)ContextUtil.getBean("theExecutor");
		}
		return executor;
	}
	public MailReceiveTask(List<CotMailAccountCfg> list){
		this.list = list;
	}
	public void executeTask(){
		int count = list.size();
		int j =0;
		List<CotMailAccountCfg> accountlist = new ArrayList<CotMailAccountCfg>();
		for(int i = count-1; i>=0; i--){
			//判断几个账号一个接收线程来执行
			if(j < MailConstants.MAIL_ACCOUNT_N_PER_THREAD){
				accountlist.add(list.remove(i));
			}
			j++;
			//如果 MAIL_ACCOUNT_N_PER_THREAD 和 J相等，需要重新计数
			if(j == MailConstants.MAIL_ACCOUNT_N_PER_THREAD){
				//加入线程队列
				List<CotMailAccountCfg> tmp = new ArrayList<CotMailAccountCfg>();
				tmp.addAll(accountlist);
				this.getExecutor().execute(new MailReceiveThread(tmp));
				accountlist.clear();
				j = 0;
			}
		}
		//剩余部分在分配一个线程
		if(accountlist.size() > 0){
			List<CotMailAccountCfg> tmp = new ArrayList<CotMailAccountCfg>();
			tmp.addAll(accountlist);
			this.getExecutor().execute(new MailReceiveThread(tmp));
			accountlist.clear();
		}
	}
}
