/**
 * 
 */
package com.sail.cot.servlet;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;

import com.sail.cot.common.service.BaseSerivce;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.constants.Constants;

/**
 * <p>Title: 旗航不锈钢管理系统（QHERP）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Mar 15, 2011 9:44:45 AM </p>
 * <p>Class Name: ShowPicServlet.java </p>
 * @author achui
 *
 */
public class ShowPicServlet extends HttpServlet {

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
		showPic(request, response);
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
		showPic(request, response);
	}
	
	private void showPic(HttpServletRequest request, HttpServletResponse response){
		BaseSerivce baseSerivce = (BaseSerivce)ContextUtil.getBean("BaseService");
		String id = request.getParameter("id");
		String tbName = request.getParameter("tbName");
		String field = request.getParameter("field");
		String path = request.getParameter("picPath");
		String imgpath = "";
			if(tbName!=null && tbName.equals("IconNode")){
				path=Constants.ICON+File.separator+id;
				imgpath=ContextUtil.getTomcatSubPath(Constants.ICON)+id;
			}else{
				//Object obj = baseSerivce.getObjByIntegerId(Integer.parseInt(id), tbName);
				//if(obj == null) return ;
				//path = BeanUtils.getProperty(obj, field);
				imgpath = ContextUtil.getTomcatHome()+Constants.DEFAULT_UPLOAD_FILE+path;
			}
		
		try {
			byte[] buffer = null;
			if(StringUtils.isEmpty(path))
				buffer = getDefaultPic();
			else{
				File file = new File(imgpath);
				if(!file.exists()){
					buffer = getDefaultPic();
				}else{
					FileInputStream fileInputStream = new FileInputStream(new File(imgpath));
					buffer = new byte[fileInputStream.available()];
					fileInputStream.read(buffer);
					//要记得关闭流，不然图片会被该进程所占用，无法删除
					fileInputStream.close();
				}
				
			}
			response.setContentType("image/jpeg"); 
			response.setHeader("Pragma","No-cache"); 
			response.setHeader("Cache-Control","no-cache"); 
			response.setDateHeader("Expires", 0); 
			OutputStream out = response.getOutputStream();
			out.write(buffer);
			out.flush();
			out.close();
			buffer = null;
			out = null;
		} catch (IOException e) {
			
			e.printStackTrace();
		}
	}
	private byte[] getDefaultPic(){
		String systemPath = System.getProperty("webapp.root");
		String path = systemPath + File.separator + "common/images/zwtp.png";
		FileInputStream fileInputStream;
		try {
			fileInputStream = new FileInputStream(new File(path));
			byte[] buffer = new byte[fileInputStream.available()];
			fileInputStream.read(buffer);
			return buffer;
		} 
		catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
}
