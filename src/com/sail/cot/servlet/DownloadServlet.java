/**
 * 
 */
package com.sail.cot.servlet;

import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang.RandomStringUtils;
import org.apache.commons.lang.StringUtils;

import com.sail.cot.common.commoninterface.DownloadBaseService;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.constants.Constants;

/**
 * <p>
 * Title: 旗航外贸管理软件V8.0
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Copyright: Copyright (c) 2011
 * </p>
 * <p>
 * Company: 厦门市旗航软件有限公司
 * </p>
 * <p>
 * Create Time: Feb 16, 2012 4:29:25 PM
 * </p>
 * <p>
 * Class Name: DownloadServlet.java
 * </p>
 * 
 * @author achui
 * 
 */
public class DownloadServlet extends HttpServlet implements Servlet {

	DownloadBaseService downloadBaseService = null;
//	CommonElementService commonElementService = null;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doDownload(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doDownload(req, resp);
	}

	public void initService(HttpServletRequest req) {
		String beanName = req.getParameter("beanName");
		if (beanName == null) {
			downloadBaseService = (DownloadBaseService) ContextUtil
					.getBean("BaseService");
		}
//		commonElementService = (CommonElementService) ContextUtil
//				.getBean("CommonElementService");
	}

	public void doDownload(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		initService(req);
		String type = req.getParameter("type");
		String filePath = null;
		String downJson = req.getParameter("downJson");
		InputStream is = null;
		try {
			if ("JASPER_REPORT".equalsIgnoreCase(type)) {
				String path = req.getParameter("filepath");
				filePath = downloadBaseService.downloadJasperReport(path,downJson);
				String fileName = this.replaceFileName(filePath, downJson);
				this.setDownloadResponseHeader(resp, fileName);
				//is = ContextUtil.getDownloadInputStream(path,filePath);
				//报表生成完后都是在本地存放文件的，不用经过远程
				File file = new File(filePath);
				is = new FileInputStream(file);
				this.downLoadByDataIps(resp, is,filePath, true);
			} else if ("ZIP_FILE".equalsIgnoreCase(type)) {
				// 根据domain某个字段的路径来下载文件,并压缩成zip下载
//				this.commonElementService.downloadZipFile(downJson, resp);
			} else if ("PAN_FILE".equalsIgnoreCase(type)) {
				// 下载产品资料盘点机
				// 新建盘点机文件.文件名取8位随机数字
				String fileName = RandomStringUtils.randomNumeric(8) + ".txt";
				filePath = ContextUtil.getTomcatHome()
						+ Constants.DEFAULT_UPLOAD_FILE + fileName;

				// 如果是MC1000,文件名是"Quote.db"
				JSONObject json = JSONObject.fromObject(downJson);
				Boolean isCreateDb = json.getBoolean("isCreateDb");
				if (isCreateDb)
					this.setDownloadResponseHeader(resp, "Quote.db");
				else {
					fileName = this.replaceFileName(filePath, downJson);
					this.setDownloadResponseHeader(resp, fileName);
				}
				File file = new File(filePath);
				if (!file.exists())
					file.createNewFile();
//				this.commonElementService.downloadPanFile(file, downJson, resp);
				this.downLoadByIps(resp, file, true);
			} else if ("COMMON_FILE".equalsIgnoreCase(type)) {
				String path = req.getParameter("filepath");
				filePath = downloadBaseService.downloadCommonFile(path, null,
						true);
				String fileName = this.replaceFileName(filePath, downJson);
				this.setDownloadResponseHeader(resp, fileName);
				is = ContextUtil.getDownloadInputStream(path, filePath);
				this.downLoadByDataIps(resp,is, filePath, false);
			}else if ("FAX_FILE".equalsIgnoreCase(type)) {
				String path = req.getParameter("filepath");
//				String path =new String(req.getParameter("filepath").getBytes("ISO8859-1"), "UTF-8");
				String fileName = this.replaceFileName(path, downJson);
				this.setDownloadResponseHeader(resp, fileName);
				//is = ContextUtil.getDownloadInputStream(path, path);
				File file = new File(path);
				is = new FileInputStream(file);
				this.downLoadByDataIps(resp,is, path, false);
			}
		} catch (Exception e1) {
			e1.printStackTrace();
			JSONObject json = new JSONObject();
			json.put("success", false);
			json.put("msg", "下载失败,请确认文件路径是否正确!");
			resp.getWriter().write(json.toString());
		}
	}

	/**
	 * 
	 * @see 功能描述（必填）：通过DataInputStream下载文件
	 * @see 处理流程（选填）：
	 * @see 调用例子（选填）：
	 * @see 相关说明文件：
	 *      <p>
	 *      返回值：void
	 *      </p>
	 * @see <p>
	 *      Author:azan
	 *      </p>
	 * @see <p>
	 *      Create Time:2012-3-5 上午9:29:25
	 *      </p>
	 * @param resp
	 * @param file
	 *            要下载的文件
	 * @param isDelFile
	 *            下载后是否删除文件
	 * @throws Exception
	 */
	private void downLoadByDataIps(HttpServletResponse resp, InputStream is,String filePath,
			Boolean isDelFile) throws Exception {
		DataOutputStream os = null;
		try {
			os = new DataOutputStream(resp.getOutputStream());
			byte[] readBytes = new byte[1024];
			int len = 0;
			while ((len = is.read(readBytes)) != -1) {
				os.write(readBytes,0,len);
			}
			os.close();
			is.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			throw e;
		} catch (IOException e) {
			e.printStackTrace();
			throw e;
		} finally {
			try {
				if (is != null)
					is.close();
				if (os != null)
					os.close();
				if (isDelFile)
					FileUtils.deleteQuietly(new File(filePath));

			} catch (Exception e) {
				e.printStackTrace();
				throw e;
			}
		}
	}

	/**
	 * 
	 * @see 功能描述（必填）：通过FileInputStream下载文件
	 *      <p>
	 *      返回值：void
	 *      </p>
	 * @see <p>
	 *      Author:azan
	 *      </p>
	 * @see <p>
	 *      Create Time:2012-3-5 上午9:38:52
	 *      </p>
	 * @param resp
	 * @param file
	 *            要下载的文件
	 * @param isDelFile
	 *            下载后是否删除文件
	 * @throws Exception
	 */
	private void downLoadByIps(HttpServletResponse resp, File file,
			Boolean isDelFile) throws Exception {
		InputStream is = new FileInputStream(file);
		byte[] b = new byte[100];
		int len;
		while ((len = is.read(b)) > 0) {
			resp.getOutputStream().write(b, 0, len);
		}
		is.close();
		if (isDelFile)
			file.delete();
	}

	/**
	 * 
	 * @see 功能描述（必填）：替换文件路径里面的文件名 ,保留后缀名
	 *      <p>
	 *      返回值：String
	 *      </p>
	 * @see <p>
	 *      Author:azan
	 *      </p>
	 * @see <p>
	 *      Create Time:2012-3-9 下午2:49:26
	 *      </p>
	 * @param filePath
	 *            文件路径
	 * @param downJson
	 *            json参数
	 * @return
	 */
	private String replaceFileName(String filePath, String downJson) {
		String fileName = FilenameUtils.getName(filePath);
		if (downJson != null) {
			JSONObject json = JSONObject.fromObject(downJson);
			String expFileName = json.getString("expFileName");// 需要生成的文件名
			if (StringUtils.isNotEmpty(expFileName)) {
				String extend = FilenameUtils.getExtension(fileName);// 扩展名
				fileName = expFileName + "." + extend;
			}
		}
		return fileName;
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
				+ java.net.URLEncoder.encode(fileName, "UTF-8"));
		// response.setHeader("Content-Disposition","filename="+java.net.URLEncoder.encode(fileName,"UTF-8"));
	}

}
