/**
 * 
 */
package com.sail.cot.action.report;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.json.JSONObject;

import org.apache.commons.lang.RandomStringUtils;
import org.apache.commons.lang.StringUtils;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.report.CotExportRptService;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.constants.Constants;
import com.sail.cot.util.AnnotationUtil;


/**
 * *********************************************
 * @Copyright :(C),2008-2010
 * @CompanyName :厦门市旗航软件有限公司(www.xmqh.net)
 * @Version :1.0
 * @Date :2011-8-9
 * @author : azan
 * @class :ReportAppletAction.java
 * @Description :
 */
public class ReportAppletAction extends AbstractAction {

	private CotExportRptService rptService;

	public CotExportRptService getRptService() {
		if (rptService == null) {
			rptService = (CotExportRptService) ContextUtil
					.getBean("CotRptService");
		}
		return rptService;
	}

	/**
	 * @see 功能描述（必填）：生成报表
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Feb 14, 2012 11:43:31 AM</p>
	 * @return
	 * 返回值：String
	 */
	public String gen() {
		JasperPrint jasperPrint = null;
		String downJson = super.getRequest().getParameter("downJson");
		HashMap paramMap = new HashMap();
		JSONObject json = null;
		if(downJson == null){
			json = new JSONObject();
			json.put("barcode", "false");
			json.put("HEADER_PER_PAGE", "false");
			json.put("exlSheet", "false");
			json.put("file", "false");
			json.put("exportType", "EXCEL");
			json.put("queryPrefix", "");
			
		}else {
			json = JSONObject.fromObject(downJson);
		}
		String tableName = json.getString("tableName");
		Object id = json.get("id");
		Object ids = json.get("ids");
		String queryPrefix = json.getString("queryPrefix");
		Class clzz = null;
		try {
			clzz = Class.forName("com.sail.cot.domain."+tableName);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String sql = " 1=1 ";
		Set<Map.Entry<String, Object>> entrySet = json.entrySet();
		for(Map.Entry<String, Object> entry : entrySet){
			String attr = entry.getKey();
			if(StringUtils.isNotEmpty(queryPrefix))
				attr = attr.replace(queryPrefix+".", "");
			boolean start = false;
			boolean end = false;
			//是否需要带区间查询
			//start或end来头或结尾的，用区间查询
			if(StringUtils.startsWithIgnoreCase(attr, "Start")){
				start = true;
				attr = attr.substring(5);
			}else if(StringUtils.endsWithIgnoreCase(attr, "Start")){
				start = true;
				attr = attr.substring(0,attr.length()-5);
			}
			else if(StringUtils.startsWithIgnoreCase(attr, "End")){
				end = true;
				attr = attr.substring(3);
			}else if(StringUtils.endsWithIgnoreCase(attr, "End")){
				end = true;
				attr = attr.substring(0,attr.length()-5);
			}
			Object obj = entry.getValue();
			if(obj == null || "".equals(obj.toString())) continue;
			String dbCol = AnnotationUtil.getAnnotationValue(clzz, attr);
			if(dbCol == null) {
				paramMap.put(attr, obj);
				continue;
			}
			Class classType = AnnotationUtil.getAnnotationClass(clzz, attr);
			if(classType.equals(String.class)){
				sql += " and obj."+dbCol+" like '%"+obj+"%' ";
			}else if(classType.equals(Date.class)){
				if(start)
					sql +=" and obj."+dbCol+" >= "+"'"+obj+"'";
				if(end)
					sql +=" and obj."+dbCol+" <= "+"'"+obj+"'";
			}else if(start){
				sql +=" and obj."+dbCol+" >= "+obj;
			}else if(end){
				sql +=" and obj."+dbCol+" <= "+obj;
			}
			else {
				sql += " and obj."+dbCol+"="+obj+" ";
			}
		}
		if(id != null)
			sql += " and obj.id="+id;
		if(ids != null)
			sql += " and obj.RECID in ("+ids+")";
		System.out.println("STR_SQL:"+sql);
		paramMap.put("STR_SQL", sql);
		/**
		 * pramMap需要的参数：STR_SQL:String
		 * 					HEADER_PER_PAGE:boolean:是否每页显示表头
		 * 					exlSheet:boolean：是否一个sheet一页
		 * 					barcode：特殊字段过滤
		 */	
		// false:不分页显示,true:分页显示
		String headerFlag = super.getRequest().getParameter("headerFlag");
		if (headerFlag == null)
			headerFlag = "false";

		String printFlag = super.getRequest().getParameter("printFlag");
		if (printFlag == null)
			printFlag = "1";
		paramMap.put("IMG_PATH", ContextUtil.getTomcatHome()+ Constants.DEFAULT_UPLOAD_FILE);
		paramMap.put("HEADER_PER_PAGE", headerFlag);
		// 报表模块文件的位置
		String reportTemple = super.getRequest().getParameter("reportTemple");
		String rptXMLpath = ContextUtil.getTomcatHome()+ Constants.DEFAULT_UPLOAD_FILE + reportTemple;
		try {
			jasperPrint = this.getRptService().getJasperPrint(rptXMLpath,paramMap);
		} catch (JRException e) {
			e.printStackTrace();
		}
		String rndFlag = RandomStringUtils.randomAlphabetic(10);
		super.getSession().setAttribute("JasperPrint" + rndFlag,
				jasperPrint);
		super.getRequest().setAttribute("rndFlag", rndFlag);
		super.getRequest().setAttribute("printFlag", printFlag);

		return "applet";
	}


	/* (non-Javadoc)
	 * @see com.sail.cot.common.AbstractAction#query()
	 */
	@Override
	public String query() {
		// TODO Auto-generated method stub
		return null;
	}
	
}
