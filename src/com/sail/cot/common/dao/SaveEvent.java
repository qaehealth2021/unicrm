/**
 * 
 */
package com.sail.cot.common.dao;

import java.sql.Date;

import org.apache.commons.beanutils.PropertyUtils;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Jan 4, 2012 9:23:01 AM </p>
 * <p>Class Name: SaveEvent.java </p>
 * @author achui
 *
 */
public class SaveEvent {

	public static Object doInjectIdentity(Object entity){
		//TODO:暂时默认identityId = 1
		Integer identityId = 1;
//		HttpServletRequest request = WebContextFactory.get().getHttpServletRequest();
//		Cookie[] cookies = request.getCookies();
//		for(Cookie cookie :cookies){
//			if(Constants.COOKIE_IDENTITY.equalsIgnoreCase(cookie.getName())){
//				 identityId = Integer.valueOf(cookie.getValue());
//				 break;
//			}
//		}
		setProperties(entity, "identityId", identityId);
		return entity;
	}
	
	public static Object doInjectAddTime(Object entity){
		setProperties(entity, "addTime",new Date(System.currentTimeMillis()));
		return entity;
	}
	
	/**
	 * @see 功能描述（必填）：通过反射设置对象的某个属性
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Feb 6, 2012 10:03:57 AM</p>
	 * @param entity
	 * @param propery
	 * @return
	 * 返回值：Object
	 */
	public static Object setProperties(Object entity,String propery,Object value){
		boolean writeable = PropertyUtils.isWriteable(entity, propery);
		if(writeable){
			try {
				PropertyUtils.setProperty(entity, propery, value);
			}catch (Exception e) {
				e.printStackTrace();
			}
		}
		return entity;
	}
	public static void doInjectProperties(Object entity){
		doInjectAddTime(entity);
		doInjectIdentity(entity);
	}
}
