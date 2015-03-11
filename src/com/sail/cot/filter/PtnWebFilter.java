package com.sail.cot.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.commons.lang.StringUtils;
import org.quartz.SchedulerException;

import com.jason.core.Application;
import com.jason.core.exception.DAOException;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.common.util.Log4WebUtil;
import com.sail.cot.mail.sysservice.MailRecvSchedule;
import com.sail.cot.service.system.emp.CotLoginService;
import com.sail.cot.trigger.TriggerOnlineAction;

/**
 * @author:achui Description: Company:厦门纵横科技 2008-1-31
 */

public class PtnWebFilter implements Filter {

	public void destroy() {
	}
	
	protected Object getBean(String name) {
		return Application.getInstance().getContainer().getComponent(name);
	}
	
	private CotLoginService cotLoginService;

	public CotLoginService getCotLoginService() {
		if (cotLoginService == null) {
			cotLoginService = (CotLoginService) this
					.getBean("CotLoginService");
		}
		return cotLoginService;
	}

	public void doFilter(ServletRequest request, ServletResponse reponse,
			FilterChain chain) throws IOException, ServletException {
//		HttpServletRequest httpRequest = (HttpServletRequest) request;
//		System.out.println("url is " + httpRequest.getRequestURI());
//		System.out.println("url is " + httpRequest.getServletPath());
//		String context = httpRequest.getContextPath() + "/";
//		String queryString = httpRequest.getQueryString();
//		System.out.println("=========" + queryString);
//		String strURL = httpRequest.getRequestURI().replace(context, "");
//		String validUrl = httpRequest.getRequestURI();
//		CotEmps emps = (CotEmps)httpRequest.getSession().getAttribute(Constants.SESSION_EMP);
//		if (!(validUrl.endsWith("index.do")
//				|| validUrl.endsWith("cotmodule.do")
//				|| validUrl.endsWith("base.do")
//				|| validUrl.endsWith("previewrpt.do") 
//			)) {
//			if (emps == null) {
//				System.out.println("userid is null");
//				RequestDispatcher rd = request.getRequestDispatcher("/common/error.jsp");
//				request.setAttribute("errorID", "");
//				request.setAttribute("message", "您的会话已过期");
//				rd.forward(request, reponse);
//				return;
//			} 
//			String empId = emps.getEmpsId().toLowerCase();
//			System.out.println("____________URL______" + strURL);
//			// admin用户不做权限判断
//			if (!"admin".equals(empId)) {
//				Map popedomMap = (Map) httpRequest.getSession().getAttribute(Constants.SESSION_PROPEDOMMAP);
//				Map map = (Map) popedomMap.get(strURL);
//				System.out.println("map:" + map);
//				if (map == null || map.get("SEL") == null) {
//					
//					RequestDispatcher rd = request
//							.getRequestDispatcher("/common/home.jsp");
//					request.setAttribute("errorID", "");
//					request.setAttribute("message", "您没有权限访问或者您所购买的版本不支持该功能<br/>请联系客服人员");
//					rd.forward(request, reponse);
//					return;
//				}
//			}
//		}
//
//		Log4WebUtil.info(PtnWebFilter.class, "调用Log4j");

		chain.doFilter(request, reponse);
	}
	
	private void triggerOnLineEmpAction(ServletContext application)
    {
//    	String triggerEmpSec = ContextUtil.getProperty("remoteaddr.properties","empsec");
    	int empsec = 30;
    	TriggerOnlineAction onlineAction = new TriggerOnlineAction();
    	try {
    		System.out.println("启动在线扫描线程.......");
			onlineAction.startJob(empsec,application);
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }

	public void init(FilterConfig config) throws ServletException {

		Log4WebUtil.info(PtnWebFilter.class, "初始化完毕");
		
		try {
			this.getCotLoginService().deleteLoginInfo();
			//Log4WebUtil.info(PtnWebFilter.class, "清除登录记录成功");
		} catch (DAOException e) {
			e.printStackTrace();
			Log4WebUtil.info(PtnWebFilter.class, "清除登录记录失败");
		}
		//触发在线人数扫描线程
		this.triggerOnLineEmpAction(config.getServletContext());
		
		//初始化系统缓存
		//CacheUtil.initSystemCache();
		//根据配置决定是否启用自动接收服务
		String enable = ContextUtil.getProperty("mail.properties", "mail.autorecive.enable");
		if(StringUtils.isNotEmpty(enable) && Boolean.valueOf(enable)){
			MailRecvSchedule recvSchedule = new MailRecvSchedule();
			//启动邮件自动接收服务
			recvSchedule.startSchedule();
		}
	}
}
