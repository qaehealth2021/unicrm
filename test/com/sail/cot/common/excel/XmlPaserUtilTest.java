/**
 * 
 */
package com.sail.cot.common.excel;

import java.net.URL;

import org.junit.Test;

import com.sail.cot.common.excel.entity.ExcelImportEntity;

/**
 * <p>Title: 旗航不锈钢管理系统（QHERP）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Oct 18, 2011 5:08:38 PM </p>
 * <p>Class Name: XmlPaserUtilTest.java </p>
 * @author achui
 *
 */
public class XmlPaserUtilTest {

	/**
	 * Test method for {@link com.sail.cot.common.excel.XmlPaserUtil#paserXML(java.lang.String)}.
	 */
	@Test
	public void testPaserXML() {
		URL path = XmlPaserUtilTest.class.getResource("excel-import.xml");
		ExcelImportEntity entity = XmlPaserUtil.paserXML(path);
		System.out.println(entity.getTable());
	}

}
