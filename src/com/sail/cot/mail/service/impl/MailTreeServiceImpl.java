package com.sail.cot.mail.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.jason.core.exception.DAOException;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.service.impl.BaseServiceImpl;
import com.sail.cot.common.util.ExceptionStackTracePaser;
import com.sail.cot.common.util.Log4WebUtil;
import com.sail.cot.domain.CotMailTree;
import com.sail.cot.mail.service.MailTreeService;
import com.sail.cot.mail.util.MailConstants;
import com.sail.cot.util.GridServerHandler;
/**
 * 
 * <p>Title: 旗航 MailServer-2.0</p>
 * <p>Description:邮件树</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Jan 31, 2012 3:42:28 PM </p>
 * <p>Class Name: MailTreeServiceImpl.java </p>
 * @author zhao
 *
 */
@Service("MailTreeService")
public class MailTreeServiceImpl extends BaseServiceImpl implements MailTreeService{
	private Logger logger = Log4WebUtil.getLogger(MailTreeServiceImpl.class);
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailFindNodeService#findNodeIdByType(java.lang.Integer, java.lang.String)
	 */
	@SuppressWarnings("unchecked")
	public Integer findNodeIdByType(Integer cfgId, String nodeType) throws ServiceException {
		if(cfgId == null || nodeType == null)
			return null;
		String hql = "select obj.id from CotMailTree as obj where obj.accountCfgId.id = :accountCfgId and nodeType = :nodeType and obj.nodeTag = :nodeTag";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("accountCfgId", cfgId);
		whereMap.put("nodeType", nodeType);
		whereMap.put("nodeTag", MailConstants.MAIL_NODE_TAG_NO_DEL);
		List<Integer> list = this.findRecordByHql(hql, whereMap);
		if(!list.isEmpty())
			return list.get(0);
		return null;
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailTreeService#getMailTree(java.lang.String, java.util.Map)
	 */
	@SuppressWarnings("unchecked")
	public String getMailTree(String hql,Map<String, Object> whereMap) throws ServiceException {
		List<CotMailTree> list = this.findRecordByHql(hql, whereMap);
		String[] excludes = {"accountCfg"};
		GridServerHandler gd = new GridServerHandler(excludes);
		gd.setData(list);
		return gd.getLoadDataText();
	}
	
	
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailMoveNodeService#moveMailToNode(java.lang.Integer, java.util.List)
	 */
	public void moveMailToNode(Integer nodeId, List<Integer> mailIds) throws ServiceException {
		String hql = "update CotMail set nodeId.id = :nodeId where id in (:mailIds)";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("nodeId", nodeId);
		whereMap.put("mailIds", mailIds);
		this.updateOrDelTable(hql, whereMap);
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailMoveNodeService#moveToNode(java.lang.Integer, java.lang.Integer)
	 */
	public void moveToNode(Integer nodeId, Integer parentId) {
		String updateHql = "update CotMailTree set parentId = ? where id = ?";
		try {
			this.getBaseDao().executeUpdate(updateHql, parentId , nodeId);
		} catch (DAOException e) {
			e.printStackTrace();
		}
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailTreeService#delTreeNode(java.lang.Integer)
	 */
	public boolean delTreeNode(Integer nodeId){
		try {
			int res = this.getBaseDao().deleteRecordById(nodeId, "CotMailTree");
			return res > 0;
		} catch (DAOException e) {
			return false;
		}
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailTreeService#updateTreeNodeName(java.lang.Integer, java.lang.String)
	 */
	public void updateTreeNodeName(Integer nodeId, String nodeName) throws ServiceException {
		String updateHql = "update CotMailTree set nodeName = ? where id = ?";
		try {
			this.getBaseDao().executeUpdate(updateHql, nodeName, nodeId);
		} catch (DAOException e) {
			throw new ServiceException(ExceptionStackTracePaser.paserStactTrace(e));
		}
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailTreeService#saveMailTree(com.sail.cot.domain.CotMailTree)
	 */
	public Integer saveMailTree(CotMailTree mailTree) throws ServiceException {
		try {
			this.saveOrUpdateObj(mailTree);
		} catch (ServiceException e) {
			throw new ServiceException(ExceptionStackTracePaser.paserStactTrace(e));
		}
		return mailTree.getId();
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailMoveNodeService#moveMailToDel(java.lang.Integer, java.util.List)
	 */
	public void moveMailToDel(Integer accountId, List<Integer> mailIds) throws ServiceException {
		logger.debug("执行移动邮件到员工下的废件箱方法");
		Integer nodeId = this.findNodeIdByType(accountId,MailConstants.MAIL_NODE_TYPE_DEL);
		this.moveMailToNode(nodeId, mailIds);
	}
	@Override
	public List<Integer> findChildrenIds(Integer nodeId) {
		List<Integer> list = new ArrayList<Integer>();
		list.add(nodeId);
		this.recursionFnChildId(list,nodeId);
		return list;
	}
	/**
	 * 递归获得子节点
	 * @param nodeId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	private void recursionFnChildId(List<Integer> childList,Integer nodeId){
		String hql = "select id from CotMailTree where parentId = :parentId";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("parentId", nodeId);
		List<Integer> temp = this.getBaseDao().findRecordsByHql(hql, whereMap);
		if(temp != null){
			childList.addAll(temp);
			Iterator<Integer> it = temp.iterator();
			while (it.hasNext()) {
				recursionFnChildId(childList,it.next());
			}
		}
	}
	
	
}
