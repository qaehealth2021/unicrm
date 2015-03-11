/**
 * 
 */
package com.sail.cot.service.system.module;

import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;

import com.sail.cot.common.exception.ServiceException;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Nov 4, 2011 4:03:39 PM </p>
 * <p>Class Name: CotModuleServiceTest.java </p>
 * @author achui
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:config/spring/applicationContext.xml"})
@TransactionConfiguration(transactionManager="transactionManager")
@Transactional
public class CotModuleServiceTest {

	@Resource
	CotModuleService moduleService;
	/**
	 * Test method for {@link com.sail.cot.service.system.module.CotModuleService#getAllModuleTreeJsnoData()}.
	 * @throws ServiceException 
	 */
	@Test
	public void testGetAllModuleTreeJsnoData() throws ServiceException {
		//String jsonString = moduleService.getAllModuleTreeJsnoData();
		//System.out.println(jsonString);
	}

}
