/**
 * 
 */
package com.sail.cot.common.dao;

import javax.annotation.Resource;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;

import com.sail.cot.common.service.BaseSerivce;

/**
 * <p>Title: 旗航不锈钢管理系统（QHERP）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Oct 11, 2011 2:54:44 PM </p>
 * <p>Class Name: CotBaseDaoTest.java </p>
 * @author achui
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:config/spring/applicationContext.xml"})
@TransactionConfiguration(transactionManager="transactionManager")
@Transactional
public class CotBaseDaoTest {

	@Resource(name="BaseService")
	private BaseSerivce baseSerivce;
	/**
	 * 描述：
	 * @throws java.lang.Exception
	 * 返回值：void
	 */
	@Before
	public void setUp() throws Exception {
	}

	/**
	 * 描述：
	 * @throws java.lang.Exception
	 * 返回值：void
	 */
	@After
	public void tearDown() throws Exception {
	}

	/**
	 * Test method for {@link com.sail.cot.common.dao.CotBaseDao#getRecords(java.lang.String)}.
	 */
	@Test
	@Rollback(false)
	public void testGetRecords() {
//		try {
//			CotContact contact = new CotContact();
//			//CotFactory factory = new CotFactory();
//			//CotCustomer customer = new CotCustomer();
//			contact.setContactMobile("11111111111");
//			//contact.setFacotoryId(factory);
//			//contact.setCustomerId(customer);
//			baseSerivce.saveOrUpdateObj(contact);
//			
//		} catch (ServiceException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		PropertyUtilsBean bean = new PropertyUtilsBean();
//		System.out.println(bean.getResolver().getIndex("identity"));
		//String hql = " from CotEmps"
		
	}
}
