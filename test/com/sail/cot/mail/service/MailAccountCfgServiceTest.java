package com.sail.cot.mail.service;

import static org.junit.Assert.assertNotNull;

import javax.annotation.Resource;

import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;

import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.domain.CotMailAccountCfg;
/**
 * 
 * <p>Title: 旗航 MailServer-2.0</p>
 * <p>Description:账号Service测试</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Feb 3, 2012 10:35:50 AM </p>
 * <p>Class Name: MailAccountCfgServiceTest.java </p>
 * @author zhao
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:config/spring/applicationContext.xml"})
@TransactionConfiguration(transactionManager="transactionManager")
public class MailAccountCfgServiceTest {
	@Resource(name="MailAccountCfgService")
	private MailAccountCfgService accountCfgService;
	
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
	}

	@Test
	public void testGetReciveAccount() throws ServiceException {
		CotMailAccountCfg accountCfg = accountCfgService.getReciveAccount(1);
		assertNotNull(accountCfg);
		System.out.println("mail account:"+accountCfg.getMailAccount());
		System.out.println("pop3 account:"+accountCfg.getPop3Cfg().getPop3Account());
	}

}
