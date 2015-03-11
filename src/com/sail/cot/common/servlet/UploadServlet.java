/**
 * 
 */
package com.sail.cot.common.servlet;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.lang.StringUtils;

import com.sail.cot.common.commoninterface.UploadBaseService;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.common.util.ExceptionStackTracePaser;
import com.sail.cot.constants.Constants;

/**
 * <p>Title: 旗航ERP管理系统（QHERP）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2010</p>
 * <p>Company: </p>
 * <p>Create Time: Sep 16, 2010 5:49:38 PM </p>
 * <p>Class Name: UploadServlet.java </p>
 * @author achui
 *
 */
public class UploadServlet extends HttpServlet {

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
	private UploadBaseService uploadService;
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			processFileUpload( request,  response);
		} catch (FileUploadException e) {
			
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
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			processFileUpload( request,  response);
		} catch (FileUploadException e) {
			
			e.printStackTrace();
		}
	}
	
	/**
	 * 描述：初始化上传路径，和上传服务
	 * @param beanName 对应的服务名
	 * 返回值：void
	 */
	public Map<String,String> initService(List<FileItem> list){
		Map<String,String> map = new HashMap<String, String>();
		for(FileItem item :list){
			try {
				map.put(item.getFieldName(), item.getString("utf-8"));
			} catch (UnsupportedEncodingException e) {
				//e.printStackTrace();
			}
		}
		if(map.isEmpty()) return null;
		if(uploadService == null){
			if(map.get("beanName") == null) return null; 
			uploadService = (UploadBaseService)ContextUtil.getBean(map.get("beanName"));
		}
		return map;
	}
	/**
	 * 描述：上传服务
	 * @return
	 * 返回值：String
	 * @throws FileUploadException 
	 */
	public void processFileUpload(HttpServletRequest request, HttpServletResponse response) throws IOException, FileUploadException{
		JSONObject json = new JSONObject();
		String msg = "";
		if (request.getContentLength() > Constants.MAX_ONCE_UPLOAD_SIZE) {
			json.put("success", false);
			json.put("msg", "上传文件时发生错误:文件大小超过上限"+Constants.MAX_ONCE_UPLOAD_SIZE+" bytes");
			msg = json.toString();
		}
		else{
			//初始化上传路径和服务
			
			DiskFileItemFactory factory = new DiskFileItemFactory();
			//设置内存阀值，超过后写入临时文件
			factory.setSizeThreshold(Constants.UPLOAD_SIZE_THRESHOLD);
			ServletFileUpload upload = new ServletFileUpload(factory);
			List items = (List)upload.parseRequest(request);
			System.out.println(request.getParameter("category"));
			//初始化服务参数
			Map<String,String> map = this.initService(items);
			if(map == null){
				json.put("success", false);
				json.put("msg", "初始化参数失败!");
				msg = json.toString();
				return ;
			}
			//产生的文件类别
			String category = map.get("category");
			//更新的表名
			String tbName = map.get("tbName");
			//主键
			String id = map.get("id");
			//更新字段
			String field = map.get("field");
			//关联外键属性
			String fkField = map.get("fkField");
			//关联外键的值
			String fkIdVal = map.get("fkIdVal");
			
			//文件大小属性
			String fieldSize = map.get("fieldSize");
			
			// 
			String isRName = map.get("isRName");
			
			// 要存入其它属性值的JSON格式
			String paramJson = map.get("paramJson");
			
			String uploadPath = uploadService.getUploadPath(category,true);
			//是否新增
			boolean doDbOp = map.get("doDbOp") == null?false:Boolean.parseBoolean(map.get("doDbOp"));
			
			factory.setRepository(new File(request.getRealPath(uploadPath)));
			
			System.out.println("----------"+uploadPath);
			
			upload.setFileItemFactory(factory);
			//设置单个文件的最大上传size:20M
			upload.setFileSizeMax(Constants.MAX_EACH_FILE_UPLOAD_SIZE);
			upload.setSizeMax(Constants.MAX_ONCE_UPLOAD_SIZE);
			upload.setHeaderEncoding("UTF-8");
			try {
				Iterator iterator = items.iterator();
				while(iterator.hasNext()){
					FileItem fileItem = (FileItem) iterator.next();
					if(fileItem.getName() == null) continue;
					if(fieldSize != null){ // 文件大小字段
						if(StringUtils.isEmpty(paramJson)){
							paramJson = "{}";
						}
						JSONObject obj = JSONObject.fromObject(paramJson);
						obj.put(fieldSize, fileItem.getSize());
						paramJson = obj.toString();
					}
					System.out.println(uploadPath);
					Object object = uploadService.upload(fileItem,uploadPath,tbName,id,field,fkIdVal,fkField,doDbOp,paramJson,isRName != null && isRName.equals("true"),request.getSession());
					if(object == null) continue;
					JSONObject jsonObj = JSONObject.fromObject(object);
					String path = (String)jsonObj.get("fileName");
					jsonObj.put("filePath", jsonObj.get("fileName"));
					String ipaddr = request.getLocalAddr();
					if(ipaddr.equals("0:0:0:0:0:0:0:1") || ipaddr.equals("0.0.0.0"))
						ipaddr = "localhost";
					path = "http://"+ipaddr+":"+request.getLocalPort()+"/"+Constants.DEFAULT_UPLOAD_PROJ+"/"+path;
					System.out.println(path);
					jsonObj.put("fileName", path);
					jsonObj.put("success", true);
					msg = jsonObj.toString();
				}
			} catch (Exception e) {
				e.printStackTrace();
				msg = ExceptionStackTracePaser.paserStactTrace(e);
				json.put("success", false);
				json.put("msg", msg);
				msg = json.toString();
			}
		}
		response.getWriter().write(msg);
	}

}
