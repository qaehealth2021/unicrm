/**
 * 
 */
package com.sail.cot.common.report;

import java.util.HashMap;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperPrint;

import com.sail.cot.common.exception.ServiceException;

/**
 * <p>Title: 旗航外贸管理系统V8</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Mar 19, 2011 5:42:22 PM </p>
 * <p>Class Name: CotExportRptService.java </p>
 * @author achui
 *
 */
public interface CotExportRptService {
	
	public int exportRptToXLS(String rptXMLPath,String exportPath,HashMap<String, String> paramMap) throws ServiceException;
	
	public int exportRptToPDF(String rptXMLPath,String exportPath,HashMap<String, String> paramMap) throws ServiceException ;
	
	public int exportRptToHTML(String rptXMLPath,String exportPath,HashMap<String, String> paramMap) throws ServiceException;
	
	public JasperPrint getJasperPrint(String rptXMLPath,HashMap<String, Object> paramMap) throws JRException;
}
