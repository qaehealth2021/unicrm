/**
 * 
 */
package com.sail.cot.servlet;

import java.io.File;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import com.sail.cot.constants.Constants;

/**
 * *********************************************
* @Copyright :(C),2008-2010
* @CompanyName :厦门市旗航软件有限公司(www.xmqh.net)
* @Version :1.0
* @Date :2012-11-19
* @author : azan
* @class :ShowLocalFileServlet.java
* @Description :显示本地tomcat某个文件夹底下的文件名
 */
public class ShowLocalFileServlet extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String fileName=request.getParameter("fileName");
		String localUrl=System.getProperty("catalina.base")+ "/" + Constants.DEFAULT_UPLOAD_FILE + fileName;
		File file=new File(localUrl);
		File[] icons = file.listFiles();
		String tmp="";
		for (int i = 0; i < icons.length; i++) {
			File icon = icons[i];
			tmp+=icon.getName()+",";
		}
		JSONObject json = new JSONObject();
		if(!tmp.equals("")){
			json.put("success", true);
			json.put("files", tmp.substring(0,tmp.length()-1));
		}else{
			json.put("success", false);
			json.put("files", "none");
		}
		response.setContentType("text/html");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(json.toString());
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
		this.doGet(request, response);
	}
	
}
