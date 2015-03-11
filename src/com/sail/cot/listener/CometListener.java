/**
 * 
 */
package com.sail.cot.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.comet4j.core.CometContext;
import org.comet4j.core.CometEngine;

import com.sail.cot.comet.LoginListener;
import com.sail.cot.comet.LogoutListener;
import com.sail.cot.constants.Constants;

/**
 * <p>Title: 旗航不锈钢管理系统（QHERP）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Aug 10, 2011 11:48:07 AM </p>
 * <p>Class Name: CometListener.java </p>
 * @author achui
 *
 */
public class CometListener implements ServletContextListener{

	/* (non-Javadoc)
	 * @see javax.servlet.ServletContextListener#contextDestroyed(javax.servlet.ServletContextEvent)
	 */
	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see javax.servlet.ServletContextListener#contextInitialized(javax.servlet.ServletContextEvent)
	 */
	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		CometContext cc = CometContext.getInstance();
		cc.registChannel(Constants.UNICRM_APP_CHANNEL);
		CometEngine engine = cc.getEngine();
		engine.addConnectListener(new LoginListener());
		engine.addDropListener(new LogoutListener());
		System.out.println("注册信道");
	}

}
