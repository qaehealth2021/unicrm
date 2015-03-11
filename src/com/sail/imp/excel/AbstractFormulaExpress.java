/**
 * 
 */
package com.sail.imp.excel;

import java.util.Map;

/**
 * <p>Title: 旗航ERP管理系统（QHERP）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2010</p>
 * <p>Company: </p>
 * <p>Create Time: Jan 31, 2011 8:49:17 AM </p>
 * <p>Class Name: FormulaExpress.java </p>
 * @author achui
 *
 */
public abstract class AbstractFormulaExpress {
	
	/**
	 * 描述：获取公式来源
	 * @param o 公式来源的所属对象源
	 * @return
	 * 返回值：String
	 */
	public abstract String getFormulaExpress();
	
	/**
	 * 描述：获取公式所需的计算参数
	 * @return
	 * 返回值：Map
	 */
	public abstract Map getParamMap();
	
	/**
	 * 描述：获取公式计算结果
	 * @return
	 * 返回值：String
	 */
	public String getCalValue(){
		String express = this.getFormulaExpress();
		Map paramMap = this.getParamMap();
		return null;
	}
	
}
