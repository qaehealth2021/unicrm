/**
 * 
 */
package com.sail.cot.listener;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.directwebremoting.ScriptSession;

import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.service.system.emp.CotLoginService;

/**
 * <p>Title: 旗行办公自动化系统（OA）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2008</p>
 * <p>Company: </p>
 * <p>Create Time: Aug 25, 2009 10:52:18 AM </p>
 * <p>Class Name: LoginOutListener.java </p>
 * @author achui
 *
 */
public class LoginOutListener implements HttpSessionListener{

	private static Map<String,ScriptSession> sessionMap = new HashMap<String,ScriptSession>();
	/* (non-Javadoc)
	 * @see javax.servlet.http.HttpSessionListener#sessionCreated(javax.servlet.http.HttpSessionEvent)
	 */
	public void sessionCreated(HttpSessionEvent arg0) {
	}

	/* (non-Javadoc)
	 * @see javax.servlet.http.HttpSessionListener#sessionDestroyed(javax.servlet.http.HttpSessionEvent)
	 */
	public void sessionDestroyed(HttpSessionEvent arg0) {
		CotLoginService serv=(CotLoginService) ContextUtil.getBean("CotLoginService");
		serv.deleteLoginInfos(arg0.getSession().getId());
		this.getSessionMap().remove(arg0.getSession().getId());
	}

	public static Map<String, ScriptSession> getSessionMap() {
		return sessionMap;
	}

}
