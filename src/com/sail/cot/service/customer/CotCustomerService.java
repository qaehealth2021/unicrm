/**
 * 
 */
package com.sail.cot.service.customer;

import java.util.List;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Sep 20, 2012 3:06:02 PM </p>
 * <p>Class Name: CotCustomerService.java </p>
 * @author achui
 *
 */
public interface CotCustomerService {
	
	/**
	 * @see 功能描述（必填）：获取洲信息，如亚洲，美洲等等
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Sep 20, 2012 3:12:15 PM</p>
	 * @return
	 * 返回值：List<CustomerTreeNode>
	 */
	public List<CustomerTreeNode> getAreaTreeNode();
	
	/**
	 * @see 功能描述（必填）：获取国家节点，根据洲信息,值过滤出有客户的洲
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Sep 20, 2012 3:14:00 PM</p>
	 * @param treeLvId：json字符串格式为{
	 * 									area：areaId -- 洲ID
	 * 									country：countryId --国家ID
	 * 									province：provinceId --省ID
	 * 								}
	 * @return
	 * 返回值：List<CustomerTreeNode>
	 */
	public List<CustomerTreeNode> getCountryTreeNode(String treeLvId);
	
	/**
	 * @see 功能描述（必填）：根据洲，国家获取省信息
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Sep 20, 2012 3:17:01 PM</p>
	 *@param treeLvId：json字符串格式为{
	 * 									area：areaId -- 洲ID
	 * 									country：countryId --国家ID
	 * 									province：provinceId --省ID
	 * 								}
	 * @return
	 * 返回值：List<CustomerTreeNode>
	 */
	public List<CustomerTreeNode> getProvinceTreeNode(String treeId);
	
	/**
	 * @see 功能描述（必填）：将客户共享给指定业务员，使业务员能够看到这些客户
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Dec 27, 2012 9:33:39 AM</p>
	 * @param custIds
	 * @param empIds
	 * @param currentEmpId
	 * 返回值：void
	 */
	public void shareToEmps(List<Integer> custIds,List<Integer> empIds,Integer currentEmpId);
	
}
