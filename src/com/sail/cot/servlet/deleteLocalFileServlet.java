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
* @class :deleteLocalFileServlet.java
* @Description :删除本地文件
 */
public class deleteLocalFileServlet extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response){
		String fileName=request.getParameter("fileName");
		String localUrl=System.getProperty("catalina.base")+ File.separator + Constants.DEFAULT_UPLOAD_FILE + fileName;
		String names=request.getParameter("names");
		String[] str=names.split(",");
		try {
			for (int i = 0; i < str.length; i++) {
				File oldFile=new File(localUrl+File.separator+str[i]);
				if (oldFile.exists()) {
					oldFile.delete();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		JSONObject json = new JSONObject();
		json.put("success", true);
		response.setContentType("text/html");
		response.setCharacterEncoding("UTF-8");
		try {
			response.getWriter().write(json.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
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
	public void doPost(HttpServletRequest request, HttpServletResponse response) {
		this.doGet(request, response);
	}
	
}
