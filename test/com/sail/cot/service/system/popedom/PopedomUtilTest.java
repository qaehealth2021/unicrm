/**
 * 
 */
package com.sail.cot.service.system.popedom;

import javax.annotation.Resource;

import org.apache.commons.collections.MultiHashMap;
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
 * <p>Create Time: Nov 10, 2011 12:01:02 PM </p>
 * <p>Class Name: PopedomUtilTest.java </p>
 * @author achui
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:config/spring/applicationContext.xml"})
@TransactionConfiguration(transactionManager="transactionManager")
@Transactional
public class PopedomUtilTest {

	@Resource
	CotPopedomService service;
	/**
	 * Test method for {@link com.sail.cot.service.system.popedom.PopedomUtil#getPopedomWhereMap(java.lang.String, java.lang.Integer)}.
	 * @throws ServiceException 
	 */
	@Test
	public void testGetPopedomWhereMap() throws ServiceException {
		//Map map1 = service.getDataMapByEmpId(1);
//		PopedomUtil util = new PopedomUtil();
//		util.setPopedomService(service);
//		Map map = util.getPopedomWhereMap("dd", 1);
		MultiHashMap map = service.getFunMapByEmpId(1);
		System.out.println(map.containsValue("dd", "DEL"));
	}
	

}
