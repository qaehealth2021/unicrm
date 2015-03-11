/**
 * 
 */
package com.sail.cot.testschedule;


/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Sep 13, 2012 6:11:13 PM </p>
 * <p>Class Name: HelloTask.java </p>
 * @author achui
 *
 */
public class HelloTask implements Runnable{

	private String msg = "";
	public HelloTask(String msg){
		this.msg = msg;
	}
	@Override
	public void run() {
		// TODO Auto-generated method stub
		System.out.println(this.msg);
	}

}
