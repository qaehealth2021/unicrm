/**
 * 
 */
package com.sail.imp.excel;

import com.sail.imp.custinterface.FormulaInterface;

/**
 * <p>Title: 旗航ERP管理系统（QHERP）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2010</p>
 * <p>Company: </p>
 * <p>Create Time: Mar 1, 2011 4:08:02 PM </p>
 * <p>Class Name: ImpFormula.java </p>
 * @author achui
 * @param <T>
 *
 */
public class ImpFormula<T> extends ImpBaseField{
	private String calClass;
	private T obj;
	public String getFormulaValue(FormulaInterface foumula){
		String value = foumula.getCalValue(this);
		super.setValue(value);
		return value;
	}
	public T getObj() {
		return obj;
	}
	public void setObj(T obj) {
		this.obj = obj;
	}
	public String getCalClass() {
		return calClass;
	}
	public void setCalClass(String calClass) {
		this.calClass = calClass;
	}
}
