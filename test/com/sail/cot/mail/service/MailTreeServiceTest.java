package com.sail.cot.mail.service;


import javax.annotation.Resource;

import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;

import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.mail.util.MailConstants;
/**
 * 
 * <p>Title: 旗航 MailServer-2.0</p>
 * <p>Description:邮件树测试</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Feb 3, 2012 10:41:43 AM </p>
 * <p>Class Name: MailTreeServiceTest.java </p>
 * @author zhao
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:config/spring/applicationContext.xml"})
@TransactionConfiguration(transactionManager="transactionManager")
public class MailTreeServiceTest {
	@Resource(name="MailTreeService")
	private MailTreeService treeService;

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
	}

	public void testFindNodeIdByType() throws ServiceException{
		treeService.findNodeIdByType(1, MailConstants.MAIL_NODE_TYPE_INBOX);
	}
}
