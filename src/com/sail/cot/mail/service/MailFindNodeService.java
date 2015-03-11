package com.sail.cot.mail.service;

import java.util.List;

import com.sail.cot.common.exception.ServiceException;

/**
 * 
 * <p>Title: 旗航 MailServer-2.0</p>
 * <p>Description: 查找树节点</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Jan 31, 2012 3:34:57 PM </p>
 * <p>Class Name: MailFindNodeService.java </p>
 * @author zhao
 *
 */
public interface MailFindNodeService {
	/**
	 * 
	 * @see 功能描述（必填）：查询账号下的邮件箱类型节点
	 * <p>返回值：Integer</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Jan 31, 2012 3:39:59 PM</p>
	 * @param cfgId 账号ID
	 * @param nodeType 邮件箱类型
	 * @return
	 */
	public Integer findNodeIdByType(Integer cfgId,String nodeType) throws ServiceException ;
	
	/**
	 * 查询所有子节点的编号集合（包含本节点ID）
	 * @param nodeId
	 * @return
	 */
	public List<Integer> findChildrenIds(Integer nodeId);
}
