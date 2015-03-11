/**
 * 
 */
package com.sail.cot.testschedule;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Sep 13, 2012 6:15:35 PM </p>
 * <p>Class Name: TestScheduleTest.java </p>
 * @author achui
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:config/spring/applicationContext.xml"})
public class TestScheduleTest {

	/**
	 * Test method for {@link com.sail.cot.testschedule.TestSchedule#doAction()}.
	 */
	@Test
	public void testDoAction() {
		while(true){
			try {
				Thread.sleep(10000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		//TestSchedule testSchedule = new TestSchedule();
		//testSchedule.doAction();
	}

}
