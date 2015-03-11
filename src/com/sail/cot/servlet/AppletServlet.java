/**
 * 
 */
package com.sail.cot.servlet;

import java.io.IOException;
import java.io.ObjectOutputStream;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JasperPrint;

import com.sail.cot.common.report.CotExportRptService;
import com.sail.cot.common.util.ContextUtil;

/**
 * <p>Title: 旗行办公自动化系统（OA）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2008</p>
 * <p>Company: </p>
 * <p>Create Time: Mar 11, 2009 3:41:38 PM </p>
 * <p>Class Name: AppletServlet.java </p>
 * @author achui
 *
 */
public class AppletServlet extends HttpServlet {

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
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doPost(request, response);
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
		String rndFlag = request.getParameter("rndFlag");
		JasperPrint jasperPrint = (JasperPrint)request.getSession().getAttribute("JasperPrint"+rndFlag);
		try {
			response.setContentType("application/octet-stream");   
            ServletOutputStream out = response.getOutputStream();   
            ObjectOutputStream os = new ObjectOutputStream(out);   
            os.writeObject(jasperPrint);   
            os.flush();   
            os.close();  
            request.getSession().removeAttribute("JasperPrint"+rndFlag);

		} catch (Exception e) {
			 
			e.printStackTrace();
		}
	}
	private CotExportRptService rptService;
	public CotExportRptService getRptService() {
		if(rptService == null)
		{
			rptService = (CotExportRptService)ContextUtil.getBean("CotRptService");
		}
		return rptService;
	}
	public void setRptService(CotExportRptService rptService) {
		this.rptService = rptService;
	}
}
