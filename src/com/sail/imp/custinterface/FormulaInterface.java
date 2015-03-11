/**
 * 
 */
package com.sail.imp.custinterface;

import com.sail.imp.excel.ImpFormula;

/**
 * <p>Title: 旗航ERP管理系统（QHERP）</p>
 * <p>Description:公式获取接口</p>
 * <p>Copyright: Copyright (c) 2010</p>
 * <p>Company: </p>
 * <p>Create Time: Mar 1, 2011 4:17:48 PM </p>
 * <p>Class Name: FormulaInterface.java </p>
 * @author achui
 * @param <T>
 *
 */
public interface FormulaInterface {
	
	/*
	 * 公式计算返回值，
	 */
	public String getCalValue(ImpFormula formulaObj);
}
