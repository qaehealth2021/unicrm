package com.sail.cot.servlet;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tools.zip.ZipOutputStream;

import com.jason.core.Application;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.domain.CotFileSystem;
import com.sail.cot.service.fileSystem.CotFileSystemService;
import com.zhao.mail.util.CodeUtil;

@SuppressWarnings("serial")
public class DownFileSystemAllFileServlet extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet  {
	private CotFileSystemService fileSystemService;
	public CotFileSystemService getFileSystemService(){
		if(fileSystemService == null){
			fileSystemService = (CotFileSystemService)Application.getInstance().getContainer().getComponent("CotFileSystemService");
		}
		return fileSystemService;
	}
	@SuppressWarnings("deprecation")
	private void downFile(HttpServletRequest request,HttpServletResponse response) throws IOException
	{
		ZipOutputStream out = null;
		try {
			
			String fileIds = request.getParameter("fileIds");
			if(fileIds !=null && !fileIds.trim().equals("")){
				String fileName = null;
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String[] fileIDS = fileIds.split(",");
				fileName = "批量导出文档 - "+sdf.format(new Date(System.currentTimeMillis()));
				List<Integer> idList = new ArrayList<Integer>();
				for (String fId : fileIDS) {
					idList.add(Integer.parseInt(fId));
				}
				List<CotFileSystem> files = this.getFileSystemService().getCotFileSystemList(idList);
				
				fileName = CodeUtil.urlEncode(fileName+".zip", "UTF-8");
				response.setContentType("application/octet-stream; CHARSET=utf8");
				response.setHeader("Content-Disposition", "attachment; filename="+fileName);	
				response.setHeader("Pragma","No-cache"); 
				response.setHeader("Cache-Control","no-cache"); 
				response.setDateHeader("Expires", 0); 
				
				out = new ZipOutputStream(response.getOutputStream());
				out.setEncoding("gbk");
				//File file = null;
				InputStream fs = null;
				CotFileSystem fileSystem = null;
				String subject = null;
				for (int i = 0;i<files.size();i++) {
					fileSystem = files.get(i);
					//String filePath = ContextUtil.getTomcatHome()+Constants.DEFAULT_UPLOAD_FILE + fileSystem.getFilePath();
					//URI fileUri = new URI(filePath);
					//file = new File(fileUri);
					fs = ContextUtil.getDownloadInputStream(fileSystem.getFilePath(),null);
					if(fs != null){
						subject = fileSystem.getFileName();
						if(subject==null||subject.trim().equals(""))
							subject = "no file name";
						out.putNextEntry(new org.apache.tools.zip.ZipEntry(subject));
					    //fs = new FileInputStream(is); 
						byte[] buf = new byte[1024];
					    int len = 0;
					    while ((len = fs.read(buf)) != -1) {
					    	out.write(buf,0,len);
					    }
					    fs.close();
					}
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
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		downFile(request,response);
	}
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		downFile(request,response);
	}
}
