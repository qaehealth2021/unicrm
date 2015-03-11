/**
 * 
 */
package com.sail.cot.common.util;

import org.apache.commons.lang.RandomStringUtils;
import org.junit.Test;

/**
 * <p>Title: 旗航不锈钢管理系统（QHERP）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Oct 18, 2011 3:38:42 PM </p>
 * <p>Class Name: StringUtilTest.java </p>
 * @author achui
 *
 */
public class StringUtilTest {
	
	/**
	 * Test method for {@link com.sail.cot.common.util.StringUtil#convert2JavaBeanName(java.lang.String)}.
	 */
	@Test
	//@Repeat(20)
	public void testConvert2JavaBeanName() {
//		String beanname = StringUtil.convert2JavaBeanName("mailRuleId",false);
//		System.out.println(beanname);
//		Assert.assertEquals("mailRuleId", beanname);
		
		for(int i=0; i< 6; i++)
			System.out.println(RandomStringUtils.random(6, "123456"));
	}

}
