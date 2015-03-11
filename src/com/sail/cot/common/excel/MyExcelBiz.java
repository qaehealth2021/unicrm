/**
 * 
 */
package com.sail.cot.common.excel;

import java.util.Map;

import com.sail.cot.common.excel.entity.Importfield;

/**
 * <p>Title: 旗航不锈钢管理系统（QHERP）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Oct 20, 2011 3:32:10 PM </p>
 * <p>Class Name: MyExcelBiz.java </p>
 * @author achui
 *
 */
public class MyExcelBiz implements ExcelRelyOnBiz {

	/* (non-Javadoc)
	 * @see com.sail.cot.common.excel.ExcelRelyOnBiz#doRelyBiz(com.sail.cot.common.excel.entity.Importfield, java.util.Map)
	 */
	public Object doRelyBiz(Importfield field, Map<String, Importfield> fieldCfg) {
		String[] relyOn = field.getRelyOn().split(",");
		String obj = "";
		for(String rely : relyOn){
			Importfield importfield = fieldCfg.get(rely);
			obj += importfield.getFieldValue()+"|";
		}
		return obj;
	}

}
