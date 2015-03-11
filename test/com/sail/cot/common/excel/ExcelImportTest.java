/**
 * 
 */
package com.sail.cot.common.excel;

import java.util.List;

import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import com.sail.cot.common.service.BaseSerivce;

/**
 * <p>Title: 旗航不锈钢管理系统（QHERP）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Oct 19, 2011 4:01:27 PM </p>
 * <p>Class Name: ExcelImportTest.java </p>
 * @author achui
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:config/spring/applicationContext.xml"})
@Transactional
public class ExcelImportTest {

	/**
	 * Test method for {@link com.sail.cot.common.excel.ExcelImport#saveFromExcel(java.lang.String, java.lang.String)}.
	 * @throws Exception 
	 */
	@Resource(name="BaseService")
	private BaseSerivce baseSerivce;
	@Test
	@Rollback(false)
	public void testSaveFromExcel() throws Exception {
		//System.out.println(baseSerivce);
		ExcelImport excelImport = new ExcelImport();
		excelImport.setBaseSerivce(baseSerivce);
		String excelPath = "E:/demo/contact.xls";
		//最后一个参数 1：覆盖，0：新增,9:覆盖新增
		List<String> msgList = excelImport.saveFromExcel(excelPath, "excel-contact-import.xml",9);
		for(String msg : msgList){
			System.out.println(msg);
		}

	}
}
