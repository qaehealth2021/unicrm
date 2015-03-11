/**
 * 
 */
package com.sail.cot.servlet;

import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.ehcache.Cache;
import net.sf.ehcache.Element;

import org.apache.log4j.Logger;

import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.common.util.Log4WebUtil;

/**
 * <p>Title: 旗航不锈钢管理系统（QHERP）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Mar 31, 2011 5:32:43 PM </p>
 * <p>Class Name: OnlineServlet.java </p>
 * @author achui
 *
 */
public class OnlineServlet extends HttpServlet {

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	private ServletContext application;
	Logger logger = Log4WebUtil.getLogger(OnlineServlet.class);
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		//每隔30秒触发一次servlet，对当前登录IP的登录时间戳进行更新
//		ConcurrentHashMap<String,Long> map = (ConcurrentHashMap<String,Long>)application.getAttribute("onLineMap");
		Cache empCache = ContextUtil.getCacheManager("EmpCache");
		String rdm=request.getParameter("rdm");
//		CotEmps emp = (CotEmps)request.getSession().getAttribute(Constants.SESSION_EMP);
//		if(emp!=null){
//			Element element = empCache.get(request.getSession().getId());
			Element element = empCache.get(rdm);
			System.out.println("=====当前随机数:"+rdm);
			System.out.println("页面调用时间"+new Date(System.currentTimeMillis()));
			System.out.println("每隔30秒 +1");
			if(element != null){
//				long time=System.currentTimeMillis();
//				System.out.println("当前时间："+time);
				Integer val = (Integer) element.getObjectValue();
//				String[] obj=val.split("_");
				Element elementNew =new Element(rdm,val+1);
				empCache.put(elementNew);
				System.out.println("======js +1="+ (val + 1));
			}
//		}
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

	}

	public void init(ServletConfig config) throws ServletException {
		
		super.init(config);
		application = config.getServletContext();
	}

}
