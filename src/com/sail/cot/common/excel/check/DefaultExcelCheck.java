/**
 * 
 */
package com.sail.cot.common.excel.check;

import java.util.Map;

import com.sail.cot.common.excel.entity.Importfield;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Nov 18, 2011 2:56:27 PM </p>
 * <p>Class Name: DefaultExcelCheck.java </p>
 * @author achui
 *
 */
public class DefaultExcelCheck implements IExcelCheck{

	public boolean checkDataLength(Importfield field,Map<String, String> msg) {
		return true;
	}

	public boolean checkType(Importfield fieldField, Map<String, String> msg) {
		return true;
	}

	public boolean checkRelateTable(Importfield field,Map<String, String> msgMap) {
		return true;
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.common.excel.check.IExcelCheck#checkNull(com.sail.cot.common.excel.entity.Importfield, java.util.Map)
	 */
	@Override
	public boolean checkNull(Importfield field, Map<String, String> msgMap) {
		// TODO Auto-generated method stub
		return true;
	}


}
