/**
 * 
 */
package com.sail.cot.seq;

import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;

import com.sail.cot.common.service.BaseSerivce;
import com.sail.cot.domain.CotFactory;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Dec 15, 2011 9:01:44 AM </p>
 * <p>Class Name: SequenceTest.java </p>
 * @author achui
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:config/spring/applicationContext.xml"})
@TransactionConfiguration(transactionManager="transactionManager")
@Transactional
public class SequenceTest {

	@Resource(name="BaseService")
	private BaseSerivce baseSerivce;
	/**
	 * Test method for {@link com.sail.cot.seq.Sequence#getFactoryNo(java.lang.Object, java.lang.String)}.
	 */
	@Test
	public void testGetFactoryNo() {
		Sequence seq = new Sequence();
		seq.setBaseService(baseSerivce);
		seq.initSequece(true);
		CotFactory fac = new CotFactory();
		fac.setPost("12345678");
		//CotCity city = new CotCity();
		//city.setId(3);
		//fac.setCityId(3);
		//String no = seq.getFactoryNo(fac);
		//System.out.println(no);
	}

}
