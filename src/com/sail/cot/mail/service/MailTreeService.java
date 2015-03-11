package com.sail.cot.mail.service;

import java.util.Map;

import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.domain.CotMailTree;

/**
 * 
 * <p>Title: 旗航 MailServer-2.0</p>
 * <p>Description:邮件树接口</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Jan 31, 2012 3:42:41 PM </p>
 * <p>Class Name: MailTreeService.java </p>
 * @author zhao
 *
 */
public interface MailTreeService extends MailFindNodeService,MailMoveNodeService{
	/**
	 * 
	 * @see 功能描述（必填）：
	 * <p>返回值：String</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Feb 13, 2012 5:45:02 PM</p>
	 * @param hql
	 * @param whereMap
	 * @return
	 * @throws ServiceException
	 */
	public String getMailTree(String hql,Map<String, Object> whereMap) throws ServiceException;
	/**
	 * 保存邮件树
	 * @see 功能描述（必填）：
	 * @see 相关说明文件：
	 * <p>返回值：Integer</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Feb 20, 2012 4:52:45 PM</p>
	 * @param mailTree
	 * @return
	 */
	public Integer saveMailTree(CotMailTree mailTree) throws ServiceException;
	/**
	 * 删除邮件箱
	 * @param nodeId
	 * @return boolean
	 */
	public boolean delTreeNode(Integer nodeId);
	/**
	 * 重命名邮件箱
	 * @param nodeId
	 * @param nodeName
	 */
	public void updateTreeNodeName(Integer nodeId,String nodeName) throws ServiceException;
}
