/**
 * 
 */
package com.sail.cot.service.contact;

import java.util.List;

import com.sail.cot.common.service.BaseSerivce;
import com.sail.cot.domain.CotContact;
import com.sail.cot.domain.CotContactGroup;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Sep 25, 2012 4:14:27 PM </p>
 * <p>Class Name: CotContactService.java </p>
 * @author achui
 *
 */
public interface CotContactService extends BaseSerivce{
	/**
	 * @see 功能描述（必填）：将客户联系人，添加的群发组中
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Sep 25, 2012 10:21:59 AM</p>
	 * @param empsId
	 * @param contactIds
	 * 返回值：void
	 */
	public void addToContactGroupDetail(Integer groupId,List<Integer> contactIds);
	
	/**
	 * @see 功能描述（必填）：添加联系人组中
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Sep 25, 2012 4:31:40 PM</p>
	 * @param contactGroup
	 * @return
	 * 返回值：Integer
	 */
	public Integer addToContactGroup(CotContactGroup contactGroup);
	
	
	/**
	 * @see 功能描述（必填）： 根据分组ID获取对应的分组联系人
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Sep 26, 2012 10:22:00 AM</p>
	 * @param groupIds
	 * @return
	 * 返回值：List<CotContact>
	 */
	List<CotContact> getContactsByGroupIds(List<Integer> groupIds);
	
	/**
	 * 查询这个客户下是否有相同 "联系人称呼"的联系人
	 * @Method: checkIsExist
	* @Description: 
	* @param customerId
	* @param conPerson
	* @param contactId
	* @return : boolean
	 */
	public boolean checkIsExist(Integer customerId,String conPerson,Integer contactId);

}
