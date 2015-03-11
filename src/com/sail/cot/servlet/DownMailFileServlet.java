package com.sail.cot.servlet;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.apache.tools.zip.ZipEntry;
import org.apache.tools.zip.ZipOutputStream;

import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.common.util.Log4WebUtil;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotMail;
import com.sail.cot.mail.service.MailReadService;
import com.sail.cot.mail.util.ContentTypeUtil;
import com.zhao.mail.entity.IMailAttach;
import com.zhao.mail.util.CodeUtil;
import com.zhao.mail.util.MailServiceConstants;

@SuppressWarnings("serial")
public class DownMailFileServlet extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet  {
	private Logger logger = Log4WebUtil.getLogger(DownMailFileServlet.class);
	private MailReadService readService;
	private MailReadService getReadService(){
		if(readService == null){
			readService = (MailReadService) ContextUtil.getBean("MailReadService");
		}
		return readService;
	}
	private void downFile(HttpServletRequest request,HttpServletResponse response) throws IOException
	{
		logger.debug("下载文件");
		try {
			String path = request.getParameter("path");
			String name = request.getParameter("name");
			String mailId = request.getParameter("mailId");
			String mailIds = request.getParameter("mailIds");
			String attachs = request.getParameter("attachs");
			// open为打开，down为下载，eml为下载eml格式邮件，attach为下载邮件附件
			String t = request.getParameter("t");
			t = t == null ? "open" : t;
			if(attachs != null && !attachs.trim().equals("")){
				this.downFile(response, attachs);
			}else if(t.equals("eml") || t.equals("attach")){
				downFile(response,mailId,mailIds);
			}else{
				name = name==null?"":name;
				name = name.replace("%", "");
				name = URLDecoder.decode(name, "UTF-8"); //文件名，输出到用户的下载对话框
				
				String isFileSystem = request.getParameter("isFileSystem");
				downFile(response, path, name, t,isFileSystem);
			}
			
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
		}
	}
	public void downFile(HttpServletResponse response,String attachs){
		ZipOutputStream out = null;
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String fileName = "批量导出邮件 - "+sdf.format(new Date(System.currentTimeMillis()));
			
			fileName = CodeUtil.urlEncode(fileName+".zip", "UTF-8");
			fileName = fileName.replace("%26", "&");
			response.setContentType("application/octet-stream; CHARSET=utf8");
			response.setHeader("Content-Disposition", "attachment; filename="+fileName);	
			response.setHeader("Pragma","No-cache"); 
			response.setHeader("Cache-Control","no-cache"); 
			response.setDateHeader("Expires", 0); 
			
			out = new ZipOutputStream(response.getOutputStream());
			out.setEncoding("GBK");
			File file = null;
			InputStream fs = null;
			JSONObject jsonObject;
			
			attachs = new String(attachs.getBytes("iso-8859-1"),"UTF-8");
			JSONArray jsonArray = JSONArray.fromObject(attachs);
			for (int i = 0;i<jsonArray.size();i++) {
				jsonObject = jsonArray.getJSONObject(i);
				out.putNextEntry(new ZipEntry(jsonObject.getString("name")));
				//TODO:修改为集群方式，从文件服务器中下载
				String filePath = MailServiceConstants.MAIL_FILE_BASEPATH + jsonObject.getString("url");
				fs = ContextUtil.getDownloadInputStream(jsonObject.getString("url"),filePath);
				if(fs != null){
					int len = 0;
					byte[] buf = new byte[1024];
					while ((len = fs.read(buf)) != -1) {
						out.write(buf,0,len);
					}
					fs.close();
				}else{
					
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			if(out!=null){
				try {
					out.flush();
					out.close();
					out = null;
				} catch (Exception e) {}
			}
		}
	}
	public void downFile(HttpServletResponse response, String path,
			String fileName, String type,String isFileSystem) throws UnsupportedEncodingException {
		//打开指定文件的流信息
		java.io.InputStream fs = null;
		try {
			String root=MailServiceConstants.MAIL_FILE_BASEPATH;
			if(isFileSystem!=null){
				root=ContextUtil.getLocalTomcatHome()+Constants.DEFAULT_UPLOAD_FILE;
			}
			String filePath = root + path;
			fs = ContextUtil.getDownloadInputStream(path,filePath);
//			try {
//				if(ContextUtil.isLoadBalnace()){
//				}else {
//					fs = new FileInputStream(new File(filePath));
//				}
//			} catch (java.io.FileNotFoundException e) {
//				logger.error("文件不存在", e);
//				return;
//			}
			String postfixName = fileName.substring(fileName.lastIndexOf(".")+1);
			System.out.println(fileName);
			fileName = CodeUtil.urlEncode(fileName, "UTF-8");
			fileName = fileName.replace("%26", "&");
			System.out.println(fileName);
			System.out.println(path);
			response.setHeader("Content-Disposition", (type.equals("down")?"attachment":"inline")+"; filename="
					+ fileName);	
			if (type.equals("down")||!ContentTypeUtil.setContentType(postfixName, response)) {
				response.setContentType("application/octet-stream; CHARSET=utf8");
			}
			//设置响应头和保存文件名 
			//写出流信息
			if(fs != null){
				int b = 0;
				PrintWriter out = response.getWriter();
				while ((b = fs.read()) != -1) {
					out.write(b);
				}
				fs.close();
				out.close();
				logger.debug("文件下载完毕");
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("文件下载失败");
		}
	}
	private void downFile(HttpServletResponse response,String mailId,String mailIds) throws IOException
	{
		logger.debug("下载文件");
		ZipOutputStream out = null;
		try {
			if(mailId!=null&&!mailId.trim().equals("")||mailIds!=null&&!mailIds.trim().equals("")){
				CotMail cotMail = null;
				String fileName = null;
				List<CotMail> mails = null;
				if(mailId!=null&&!mailId.trim().equals("")){
					cotMail = this.getReadService().getMailAllInfo(Integer.parseInt(mailId),true);
					fileName = cotMail.getSubject();
					if(cotMail.getAttachs().size()==0)
						return;
					if(fileName==null||fileName.trim().equals(""))
						fileName = "no subject";
				}else{
					
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					String[] mailIDS = mailIds.split(",");
					fileName = "批量导出邮件 - "+sdf.format(new Date(System.currentTimeMillis()));
					List<Integer> idList = new ArrayList<Integer>();
					for (String mId : mailIDS) {
						idList.add(Integer.parseInt(mId));
					}
					mails = this.getReadService().getMailList(idList);
				}
				fileName = CodeUtil.urlEncode(fileName+".zip", "UTF-8");
				fileName = fileName.replace("%26", "&");
				response.setContentType("application/octet-stream; CHARSET=utf8");
				response.setHeader("Content-Disposition", "attachment; filename="+fileName);	
				response.setHeader("Pragma","No-cache"); 
				response.setHeader("Cache-Control","no-cache"); 
				response.setDateHeader("Expires", 0); 
				
				if(cotMail!=null){	// 导出邮件所有附件
					out = new ZipOutputStream(response.getOutputStream());
					for (IMailAttach attach : cotMail.getAttachs()) {
						out.putNextEntry(new ZipEntry(attach.getName()));
						String filePath = MailServiceConstants.MAIL_FILE_BASEPATH + attach.getUrl();
						InputStream  fs = ContextUtil.getDownloadInputStream(attach.getUrl(),filePath);
						if(fs != null){
						    byte[] buf = new byte[1024];
						    while (fs.read(buf) != -1) {
								out.write(buf);
							}
						    fs.close();
						    out.close();
						}
					}
				}else if(mails!=null){	// 导出所选所有邮件
					this.getReadService().saveMailToEml(mails);	// 生成不存在EML的COTMAIL
					String subject = null;
					if(mails.size()==1){	// 如果只有一个，则不打包下载
						cotMail = mails.get(0);
						DownMailFileServlet fileServlet = new DownMailFileServlet();
						subject = cotMail.getSubject();
						if(subject==null||subject.trim().equals(""))
							subject = "no subject";
						fileServlet.downFile(response, cotMail.getEmlPath(), subject+".eml", "down",null);
					}else{
						out = new ZipOutputStream(response.getOutputStream());
						out.setEncoding("GBK");
						File file = null;
						InputStream fs = null;
						for (int i = 0;i<mails.size();i++) {
							cotMail = mails.get(i);
							subject = cotMail.getSubject();
							if(subject==null||subject.trim().equals(""))
								subject = "no subject.eml";
							else
								subject = subject+".eml";
							out.putNextEntry(new ZipEntry(subject));
							String filePath = MailServiceConstants.MAIL_FILE_BASEPATH + cotMail.getEmlPath();
							fs = ContextUtil.getDownloadInputStream(cotMail.getEmlPath(),filePath);
							if(fs != null){
								byte[] buf = new byte[1024];
							    while (fs.read(buf) != -1) {
									out.write(buf);
								}
							    fs.close();
							    out.close();
							}
						}
					}
				}
			}
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
		}finally{
			if(out!=null){
				try {
					out.flush();
					out.close();
					out = null;
				} catch (Exception e) {}
			}
		}
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		downFile(request,response);
	}
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		downFile(request,response);
	}
}
