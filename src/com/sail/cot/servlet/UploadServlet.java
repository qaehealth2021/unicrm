/**
 * 
 */
package com.sail.cot.servlet;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
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
import com.sail.cot.common.util.UploadUtil;
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
//		if(uploadService == null){
			if(map.get("beanName") == null){
				uploadService = (UploadBaseService)ContextUtil.getBean("BaseService");
			}else
				uploadService = (UploadBaseService)ContextUtil.getBean(map.get("beanName"));
//		}
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
		String callBack = null;
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
			upload.setHeaderEncoding("UTF-8");
			List items = (List)upload.parseRequest(request);
			//初始化服务参数
			Map<String,String> map = this.initService(items);
			if(map == null){
				json.put("success", false);
				json.put("msg", "初始化参数失败!");
				msg = json.toString();
			}else{
				//产生的文件的基本路径
				String uploadPath = map.get("uploadPath");
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
				
				// 是否加上时间，默认为true
				String bGenDate = map.get("bGenDate");
				// 是否随机名字
				String isRName = map.get("isRName");
				
				// 要存入其它属性值的JSON格式
				String paramJson = map.get("paramJson");
				// 上传路径
				uploadPath = uploadService.getUploadPath(uploadPath,
							bGenDate == null ? true:Boolean.parseBoolean(bGenDate));
				
				//用于判断是否需要进行远程上传，在集群的模式下使用，为后台判断，前台不要设置改参数
				String uploadToRemote = map.get("uploadToRemote") == null?"true":"false";
				
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
						String fileName = (String)jsonObj.get("fileName");// 文件http访问路径
						if(fileName == null){
							String path = (String)jsonObj.get("filePath");// 文件相对路径
							if(ContextUtil.isLoadBalnace()){
								String ipaddr = ContextUtil.getProperty("common.properties", "TOMCAT_UPLOAD_SERVER");
								fileName = ipaddr+"/"+Constants.DEFAULT_UPLOAD_PROJ+"/"+path;
								if(uploadToRemote.equals("true"))
									uploadToFileServer((String)jsonObj.get("fullPath"),uploadPath);
							}else{
								String ipaddr = request.getLocalAddr();
								if(ipaddr.equals("0:0:0:0:0:0:0:1") || ipaddr.equals("0.0.0.0"))
									ipaddr = "localhost";
								fileName = "http://"+ipaddr+":"+request.getLocalPort()+"/"+Constants.DEFAULT_UPLOAD_PROJ+"/"+path;
							}
							System.out.println("azan:============"+fileName);
							jsonObj.put("fileName", fileName); // 文件http访问路径
							jsonObj.put("fullPath", (String)jsonObj.get("fullPath"));
						}
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
		}
		response.setContentType("text/html");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(msg);
//		if(callBack == null){
//			response.getWriter().write(msg);
//		}else {
//			
//			JSONObject jsonMsg = JSONObject.fromObject(msg);
//			
//			//callBack = "parent."+callBack+"('"+jsonMsg.getString("fileName")+"')";
//			//callBack = "console.log(parent)";
//			String html = "<html><head><title></title><script type=\"text/javascript\">"+callBack+"</script></head><body></body></html>";
//			
//			response.getWriter().write(html);
//		}
	}
	private void uploadToFileServer(String fullPath,String uploadPath){
		String url = ContextUtil.getProperty("common.properties", "TOMCAT_UPLOAD_ADDR");
		Map<String, String> postParams = new HashMap<String, String>();
		postParams.put("uploadPath", uploadPath);
		postParams.put("beanName", "BaseService");
		postParams.put("bGenDate", "false");
		postParams.put("uploadToRemote", "false");
		
		List<String> uploadFile = new ArrayList<String>();
		uploadFile.add(fullPath);
		UploadUtil.uploadFile(url, postParams, uploadFile);
	}
}
