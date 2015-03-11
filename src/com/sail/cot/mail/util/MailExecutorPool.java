/**
 * 
 */
package com.sail.cot.mail.util;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;


@Service("MailExecutorPool")
public class MailExecutorPool implements InitializingBean {
    private ExecutorService service;   
    public ExecutorService getService() {   
        return service;   
    }   
    /**  
     * 在 bean 被初始化成功之后初始化线程池大小  
     */ 
	public void afterPropertiesSet() throws Exception {
		System.out.println("初始化MailExecutorPool");
		service = Executors.newFixedThreadPool(MailConstants.MAIL_EXECUTOR_POOL_SIZE);   		
	}

}
