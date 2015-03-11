/**
 * 
 */
package com.sail.cot.common.util;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.RandomStringUtils;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:上传工具，通过构建上传包，从后台上传文件</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Nov 7, 2012 11:56:07 AM </p>
 * <p>Class Name: UploadUtil.java </p>
 * @author achui
 *
 */
public class UploadUtil {
	
	/**
	 * @see 功能描述（必填）：批量上传文件
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 7, 2012 11:58:41 AM</p>
	 * @param uplaodUrl ： 需要上传文件的地址
	 * @param postParams： 需要传递的参数
	 * @param uploadFile： 需要上传的文件，可以有多个，每个文件加入postParam
	 * @return
	 * 返回值：boolean 成功：true,false:失败
	 */
	public static boolean uploadFile(String uplaodUrl,Map postParams,List uploadFile){
		try {
			 String BOUNDARY = "---------"+RandomStringUtils.randomAlphanumeric(32); // 定义数据分隔线
			 byte[] end_data = ("--" + BOUNDARY + "--\r\n").getBytes();// 定义最后数据分隔线 
			 URL url = new URL(uplaodUrl);
			 HttpURLConnection conn = (HttpURLConnection)url.openConnection(); 
	         conn.setDoOutput(true);  
	         conn.setDoInput(true);  
	         conn.setUseCaches(false);  
	         conn.setRequestMethod("POST"); 
	         //构建请求的包头
	         conn.setRequestProperty("connection", "Keep-Alive");  
	         conn.setRequestProperty("user-agent", "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4");  
	         conn.setRequestProperty("Charsert", "UTF-8"); 
	         conn.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + BOUNDARY);
	         OutputStream out = new DataOutputStream(conn.getOutputStream()); 
	         for(Object obj : uploadFile){
	        	 File file = null;
	        	 if(obj instanceof String){
	        		 file = new File(obj.toString());
	        	 }else if(obj instanceof File){
	        		 file = (File)obj;
				 }
	        	 StringBuilder sb = new StringBuilder();    
                 sb.append("--").append(BOUNDARY).append("\r\n");
                 sb.append("Content-Disposition: form-data;name=\"file-path\";filename=\""+ file.getName() + "\"\r\n");    
                 sb.append("Content-Type:application/octet-stream\r\n\r\n");    
                 byte[] data = sb.toString().getBytes();  
                 out.write(data);  
                 DataInputStream in = new DataInputStream(new FileInputStream(file));  
                 int bytes = 0;  
                 byte[] bufferOut = new byte[1024];  
                 while ((bytes = in.read(bufferOut)) != -1) {  
                     out.write(bufferOut, 0, bytes);  
                 }  
                 out.write("\r\n".getBytes()); //多个文件时，二个文件之间加入这个
                 //2012-11-19 15:40--azan修改
                 in.close();
	         }
	         //添加上传参数
             Iterator<String> iterator = postParams.keySet().iterator();
             while(iterator.hasNext()){
            	 String param = iterator.next();
            	 StringBuilder sb = new StringBuilder();    
                 sb.append("--").append(BOUNDARY).append("\r\n");    
                 sb.append("Content-Disposition: form-data; name=\""+param+"\"\r\n\r\n"); 
                 sb.append(postParams.get(param));
                 out.write(sb.toString().getBytes()); 
                 out.write("\r\n".getBytes()); //多个文件时，二个文件之间加入这个  
             }
             out.write(end_data); 
             out.flush();    
             out.close();   
             // 定义BufferedReader输入流来读取URL的响应  
             BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));  
             String line = null;  
             while ((line = reader.readLine()) != null) {  
                 System.out.println(line);  
             }
	         
		} catch (Exception e) {
			e.printStackTrace();
		}
		return true;
	}
	
	public static void main(String[] args){
		Map<String, String> postParams = new HashMap<String, String>();
		postParams.put("uploadPath", "attach");
		postParams.put("beanName", "MailSendService");
		List<String> list  = new ArrayList<String>();
		list.add("E:/demo/emps.xls");
		list.add("E:/demo/CP030.jpg");
		UploadUtil.uploadFile("http://192.168.1.12:8080/unicrm/servlet/UploadServlet", postParams, list);
	}
}
