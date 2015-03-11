/**
 * 
 */
package com.sail.cot.testschedule;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.task.TaskExecutor;
import org.springframework.stereotype.Component;


/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Sep 13, 2012 6:10:02 PM </p>
 * <p>Class Name: TestSchedule.java </p>
 * @author achui
 *
 */
@Component("TestSchedule")
public class TestSchedule {

	@Autowired
	TaskExecutor theExecutor;
	//@Scheduled(fixedRate=1000*60)
	public void doAction(){
		System.out.println(new Date()+"在做事情,theExecutor:"+theExecutor);
		for(int i=0;i<1000; i++){
			this.theExecutor.execute(new HelloTask(new Date()+"|线程ID："+i+"正在执行"));
		}
	}
	
	public static void main(String[] args){
		TestSchedule schedule = new TestSchedule();
		while(true){}
		
	}
}
