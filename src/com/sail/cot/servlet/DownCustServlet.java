package com.sail.cot.servlet;

import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.export.JRXlsAbstractExporterParameter;
import net.sf.jasperreports.engine.export.JRXlsExporter;

import com.jason.core.Application;
import com.sail.cot.common.report.CotExportRptService;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.constants.Constants;

public class DownCustServlet extends javax.servlet.http.HttpServlet implements
		javax.servlet.Servlet {

	private void downFile(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		JasperPrint jasperPrint = (JasperPrint) request.getSession()
				.getAttribute("JasperPrint");
		CotExportRptService rptService = (CotExportRptService) getService("CotRptService");

		StringBuffer sql = new StringBuffer();
		sql.append(" 1=1");
		String ids = request.getParameter("ids");// 选择的客户ID
		String flag = request.getParameter("flag");// 如果flag!=null 就是导联系人
		if (ids.length() != 0) {
			sql.append(" and obj.ID in (" + ids + ")");
		}
		String str="cust_report.jrxml";
		if(flag!=null){
			str="contact_report.jrxml";
		}
		String rptXMLpath = ContextUtil.getLocalTomcatHome()+ Constants.DEFAULT_UPLOAD_FILE+ "reportfile/"+str;
		if(ContextUtil.isLoadBalnace())
			rptXMLpath = ContextUtil.getFileFromRemoteToLocal("reportfile/"+str, rptXMLpath);
		System.out.println("query=" + sql.toString());
		System.out.println("rptXMLpath:" + rptXMLpath);
		HashMap paramMap = new HashMap();
		paramMap.put("STR_SQL", sql.toString());
		try {
			jasperPrint = rptService.getJasperPrint(rptXMLpath, paramMap);
		} catch (JRException e1) {
			e1.printStackTrace();
		}
		request.getSession().setAttribute("JasperPrint", jasperPrint);

		OutputStream ouputStream = response.getOutputStream();

		JRXlsExporter exporter = new JRXlsExporter();
		this.setFileDownloadResponseHeader(response, "customer.xls");
		response.setContentType("application/xls");
		exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
		exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, ouputStream);
		exporter.setParameter(
				JRXlsAbstractExporterParameter.IS_ONE_PAGE_PER_SHEET,
				Boolean.FALSE);
		exporter.setParameter(
				JRXlsAbstractExporterParameter.IS_WHITE_PAGE_BACKGROUND,
				Boolean.FALSE);
		try {
			exporter.exportReport();
		} catch (JRException e) {
			e.printStackTrace();
		}
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		downFile(request, response);
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		downFile(request, response);
	}

	private Object getService(String strSerivce) {
		return Application.getInstance().getContainer()
				.getComponent(strSerivce);
	}

	/**
	 * 设置文件下载的header
	 * 
	 * @param response
	 * @param fileName
	 * @throws UnsupportedEncodingException
	 */
	private void setFileDownloadResponseHeader(HttpServletResponse response,
			String fileName) throws UnsupportedEncodingException {
		// response.setHeader("Cache-Control", "no-cache");
		response.setContentType("application/octet-stream; CHARSET=utf8");
		response.setHeader("Content-Disposition", "attachment; filename="
				+ java.net.URLEncoder.encode(fileName, "UTF-8"));
		// response.setHeader("Content-Disposition","filename="+java.net.URLEncoder.encode(fileName,"UTF-8"));
	}
}
