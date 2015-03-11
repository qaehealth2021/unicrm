/**
 * 
 */
package com.sail.cot.common.util;

import java.io.PrintStream;

import org.apache.commons.io.output.ByteArrayOutputStream;

/**
 * <p>Title: 旗航不锈钢管理系统（QHERP）</p>
 * <p>Description:异常信息堆栈解析接口</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Mar 8, 2011 3:25:56 PM </p>
 * <p>Class Name: ExceptionStackTracePaser.java </p>
 * @author achui
 *
 */
public class ExceptionStackTracePaser {

	/**
	 * 描述：解析异常信息的堆栈信息，并将其转换为字符串
	 * @param ex
	 * @return
	 * 返回值：String
	 */
	public static final String paserStactTrace(Exception ex){
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		PrintStream stream = new PrintStream(outputStream);
		ex.printStackTrace(stream);
		return ex.getMessage()+"\r\n"+outputStream.toString();
	}
}
