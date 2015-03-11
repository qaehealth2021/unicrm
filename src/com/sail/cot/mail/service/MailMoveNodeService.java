package com.sail.cot.mail.service;

import java.util.List;

import com.sail.cot.common.exception.ServiceException;
/**
 * *********************************************
 * @Copyright :(C),2008-2010
 * @CompanyName :厦门市旗航软件有限公司(www.xmqh.net)
 * @Version :1.0
 * @Date :Nov 25, 2010
 * @author : zhao
 * @class :MailMoveNodeService.java
 * @Description :移动节点下的邮件
 */
public interface MailMoveNodeService {
	/**
	 * 移动邮件到节点,只能在本账号下移动
	 * @param cfgId 账号ID
	 * @param mailIds 邮件集合
	 */
	public void moveMailToNode(Integer nodeId,List<Integer> mailIds)throws ServiceException;
	/**
	 * 在本账号下相同类型的树节点下移动节点
	 * @param nodeId
	 * @param parentId
	 */
	public void moveToNode(Integer nodeId,Integer parentId);
	/**
	 * 
	 * @see 功能描述（必填）：移动邮件到废件箱
	 * @see 相关说明文件：
	 * <p>返回值：void</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Mar 1, 2012 2:10:50 PM</p>
	 * @param accountId
	 * @param mailIds
	 */
	public void moveMailToDel(Integer accountId,List<Integer> mailIds) throws ServiceException;
	
}
