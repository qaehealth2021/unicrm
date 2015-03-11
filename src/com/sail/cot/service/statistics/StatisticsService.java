/**
 * 
 */
package com.sail.cot.service.statistics;

import java.util.List;
import java.util.Map;

import com.sail.cot.common.service.BaseSerivce;
import com.sail.cot.domain.CotEmps;
import com.sail.cot.entity.StatisticsTreeNode;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Sep 18, 2012 6:21:20 PM </p>
 * <p>Class Name: StatisticsService.java </p>
 * @author achui
 *
 */
public interface StatisticsService extends BaseSerivce{
	
	/**
	 * @see 功能描述（必填）：获取统计报表表的表结构定义，放入list中,list中的Map key固定为colName和colType，分别放列名和类型
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Sep 18, 2012 6:24:41 PM</p>
	 * @param tableName
	 * @return
	 * 返回值：List<Map<String,String>>
	 */
	public List<Map<String, String>> getReportColumnDef(String tableName);
	
	/**
	 * @see 功能描述（必填）：获取员工的树节点,如果custId不为0则获取改客户的跟踪业务员
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Sep 19, 2012 2:15:34 PM</p>
	 * @return
	 * 返回值：List<StatisticsTreeNode>
	 */
	public List<StatisticsTreeNode> getEmpTreeNode(Integer custId,CotEmps currEmp);
	
	/**
	 * @see 功能描述（必填）：获取业务员跟踪的客户
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Sep 19, 2012 2:57:26 PM</p>
	 * @param empId
	 * @param custId:是否从客户模块中传递过来，null为不是从客户模块中过来
	 * @return
	 * 返回值：List<StatisticsTreeNode>
	 */
	public List<StatisticsTreeNode> getCustTreeNode(String treeLvId,Integer custId); 
	
	/**
	 * @see 功能描述（必填）：获取客户下面的订单信息（邮件）
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Sep 21, 2012 10:17:00 AM</p>
	 * @param treeLvId
	 * @return
	 * 返回值：List<StatisticsTreeNode>
	 */
	public List<StatisticsTreeNode> getOrderTreeNodeMail(String treeLvId); 
	
	/**
	 * @see 功能描述（必填）：获取客户下面的订单信息（邮件）
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Sep 21, 2012 10:17:00 AM</p>
	 * @param treeLvId
	 * @return
	 * 返回值：List<StatisticsTreeNode>
	 */
	public List<StatisticsTreeNode> getOrderTreeNodeSms(String treeLvId);
	
	/**
	 * @see 功能描述（必填）：获取客户下面的订单信息（邮件）
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Sep 21, 2012 10:17:00 AM</p>
	 * @param treeLvId
	 * @return
	 * 返回值：List<StatisticsTreeNode>
	 */
	public List<StatisticsTreeNode> getOrderTreeNodeFax(String treeLvId,String flag);
	
	/**
	 * @see 功能描述（必填）：获取业务员下的洲信息
	 * @see 处理流程（选填）：通过业务员->跟踪业务中间表(customer_trackemp)->客户->洲信息
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Sep 21, 2012 10:19:03 AM</p>
	 * @param empId
	 * @return
	 * 返回值：List<StatisticsTreeNode>
	 */
	public List<StatisticsTreeNode> getAreaTreeNodeByEmpId(String treeLvId);
	
	/**
	 * @see 功能描述（必填）：获取国家节点，根据洲信息
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
	public List<StatisticsTreeNode> getCountryTreeNode(String treeLvId);
	
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
	public List<StatisticsTreeNode> getProvinceTreeNode(String treeId);
	
	public List<StatisticsTreeNode> getUnKnownCustTreeNode(String treeId);
	
	public Map findCustomerByEmpId(Integer empId);
}
