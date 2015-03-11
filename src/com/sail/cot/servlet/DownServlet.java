package com.sail.cot.servlet;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang.StringUtils;

import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.constants.Constants;

public class DownServlet extends HttpServlet implements Servlet{

	private void downEleTemplate(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		String header =request.getParameter("header");//下载后的名称
		String systemPath =null;
		//如果是下载客户excel导入模版或者联系人excel导入模版
		if("customer".equals(header)){
			header=header+ ".xls";
			systemPath =ContextUtil.getLocalTomcatHome()
					+ Constants.DEFAULT_UPLOAD_FILE+"/customer.xls";
		}
		else if("contact".equals(header)){
			header=header+ ".xls";
			systemPath =ContextUtil.getLocalTomcatHome()
					+ Constants.DEFAULT_UPLOAD_FILE+"/contact.xls";
		}else{
			String filePath =request.getParameter("filePath");//文件路径
			systemPath =ContextUtil.getLocalTomcatHome()
					+ Constants.DEFAULT_UPLOAD_FILE+"/"+filePath;
			//判断名称里面是否含有后缀名.没有就取文件路径里面的后缀名
			String extend = FilenameUtils.getExtension(header);// 扩展名
			if(extend.equals("")){
				extend=FilenameUtils.getExtension(filePath);// 扩展名
				header=header+ "."+extend;
			}
		}
		
		// 设置下载头
		setDownloadResponseHeader(response, header);
		try {
			File file = new File(systemPath);
			DataInputStream is = new DataInputStream(new FileInputStream(file));
			DataOutputStream os = new DataOutputStream(response
					.getOutputStream());
			byte[] readBytes = new byte[128];
			while (is.read(readBytes) != -1) {
				os.write(readBytes);
			}
			os.close();
			is.close();

		} catch (Exception e) {
			e.printStackTrace();
			response.getWriter().write(
			"<script>window.parent.alert('下载文件失败：找不到下载文件');</script>");
		}
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		downEleTemplate(request, response);
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		downEleTemplate(request, response);
	}
	
	//解决空格变+号问题
	public static String encodingFileName(String fileName) {
        String returnFileName = "";   
        try {
        	//执行下面编码转换后会把" "转成"+"号,会把"+"转成"%2B"
            returnFileName = URLEncoder.encode(fileName, "UTF-8");
            //执行下面把"+"替换成"%20",传到浏览器解析后就成空格了
            returnFileName = StringUtils.replace(returnFileName, "+", "%20"); 
            //执行下面把"%2B"替换成"+"
            returnFileName = StringUtils.replace(returnFileName, "%2B", "+");   
            if (returnFileName.length() > 150) {   
                returnFileName = new String(fileName.getBytes("GB2312"), "ISO8859-1");   
                returnFileName = StringUtils.replace(returnFileName, " ", "%20");   
            }   
        } catch (UnsupportedEncodingException e) {   
            e.printStackTrace();   
        }   
        return returnFileName;   
    }  

	/**
	 * 设置文件下载的header
	 * 
	 * @param response
	 * @param fileName
	 * @throws UnsupportedEncodingException
	 */
	private void setDownloadResponseHeader(HttpServletResponse response,
			String fileName) throws UnsupportedEncodingException {
		// response.setHeader("Cache-Control", "no-cache");
		response.setContentType("application/octet-stream; CHARSET=utf8");
		response.setHeader("Content-Disposition", "attachment; filename="
				+ encodingFileName(fileName));
		// response.setHeader("Content-Disposition","filename="+java.net.URLEncoder.encode(fileName,"UTF-8"));
	}
	
	
}
