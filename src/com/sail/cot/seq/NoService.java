/**
 * 
 */
package com.sail.cot.seq;



/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Feb 14, 2012 10:33:11 AM </p>
 * <p>Class Name: NoService.java </p>
 * @author achui
 *
 */
public interface NoService {
	
	/**
	 * 
	 * @see 功能描述（必填）：获得外销合同的单号
	 * <p>返回值：String</p>
	 * @see <p>Author:azan</p>
	 * @see <p>Create Time:2012-5-2 上午11:59:21</p>
	 * @param obj
	 * @return
	 */
	public String getOrderNo();
	
	/**
	 * 
	 * @see 功能描述（必填）：获取客户编号
	 * <p>返回值：String</p>
	 * @see <p>Author:azan</p>
	 * @see <p>Create Time:2012-5-2 上午11:59:21</p>
	 * @param obj
	 * @return
	 */
	public String getCustNo();
}
