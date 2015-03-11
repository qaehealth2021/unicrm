/**
 * 
 */
package com.sail.cot.common.exception;


/**
 * <p>Title: 旗航ERP管理系统（QHERP）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2010</p>
 * <p>Company: </p>
 * <p>Create Time: Jan 22, 2011 12:01:37 PM </p>
 * <p>Class Name: ServiceException.java </p>
 * @author achui
 *
 */
public class ServiceException extends RuntimeException{
	private static final long serialVersionUID = 1L;

	public ServiceException(String msg){
		super(msg);
	}
	public ServiceException(String msg,Exception ex){
//		could not execute update query
//		Out of range value for column 'remain_box_count' at row 1
		super(msg+"/r/n"+ServiceException.getCauseMessage(ex.getCause()));
	}
	
	public static String getCauseMessage(Throwable t){
		if(t.getCause() != null){
			return ServiceException.getCauseMessage(t.getCause());
		}else{
			return t.getMessage();
		}
	}
	
	public static String getCause(Throwable t){
		if(t.getCause() != null){
			return ServiceException.getCauseMessage(t.getCause());
		}else{
			return t.getMessage();
		}
	}
}
