package com.sail.cot.mail.service;

import javax.annotation.Resource;

import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;

import com.sail.cot.common.exception.ServiceException;
/**
 * 
 * <p>Title: 旗航 MailServer-2.0</p>
 * <p>Description:邮件接收Service测试</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Feb 3, 2012 10:07:45 AM </p>
 * <p>Class Name: MailReciveServiceTest.java </p>
 * @author zhao
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:config/spring/applicationContext.xml"})
@TransactionConfiguration(transactionManager="transactionManager")
public class MailReciveServiceTest {
	@Resource(name="MailReciveService")
	private MailReciveService reciveService;

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
	}

	@Test
	public void testRecivePOP3Message() throws ServiceException {
		reciveService.initMailList2Cache();
		reciveService.recivePOP3Message(2);
	}

}
