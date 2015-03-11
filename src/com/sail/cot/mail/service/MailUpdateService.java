package com.sail.cot.mail.service;

import java.util.List;
import java.util.Map;

import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.domain.CotMail;
import com.sail.cot.domain.CotMailGarbageCfg;

/**
 * 
 * <p>Title: 旗航 MailServer-2.0</p>
 * <p>Description:邮件更新操作接口</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Mar 1, 2012 11:18:40 AM </p>
 * <p>Class Name: MailUpdateService.java </p>
 * @author zhao
 *
 */
public interface MailUpdateService {
	/**
	 * 
	 * @see 功能描述（必填）：删除邮件
	 * <p>返回值：void</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Mar 1, 2012 11:24:09 AM</p>
	 * @param ids
	 */
	public void deleteMails(List<Integer> ids);
	
	/**
	 * 设置收件箱邮件为已读或未读
	 * @param ids
	 * @param isNew true设置为未读,false设置为已读
	 */
	public void updateMailRead(List<Integer> ids, boolean isRead) throws ServiceException;
	
	/**
	 * 根据map中的ID,移动指派归档邮件
	 * @param idMap map中的KEY值与CotMail属性名一至
	 * @param cotMail
	 */
	public void moveAssignMail(Map<String,Integer> idMap, CotMail cotMail);
	
	/**
	 * @see 功能描述（必填）：
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Sep 12, 2012 2:59:45 PM</p>
	 * @param ids :邮件ID
	 * @param jsonParam：需要关联的订单参数
	 * 返回值：void
	 */
	public void relateOrder(List<Integer> ids,String jsonParam);
	
	/**
	 * 根据邮箱账户id获得黑名单信息
	 * @Method: findCotMailGarbageCfgByAccountId
	* @Description: 
	* @param accountId
	* @return : CotMailGarbageCfg
	 */
	public CotMailGarbageCfg findCotMailGarbageCfgByAccountId(Integer accountId);
	
}
