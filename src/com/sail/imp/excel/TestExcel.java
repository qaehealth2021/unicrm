/**
 * 
 */
package com.sail.imp.excel;

import java.io.File;

import jxl.Workbook;

/**
 * <p>Title: 旗航ERP管理系统（QHERP）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2010</p>
 * <p>Company: </p>
 * <p>Create Time: Jan 31, 2011 11:37:35 AM </p>
 * <p>Class Name: TestExcel.java </p>
 * @author achui
 *
 */
public class TestExcel {

	public static void main(String[] args) throws Exception{
		Workbook wb = null;
		wb = Workbook.getWorkbook(new File("D:/demo/test.xls"));
	}
}
