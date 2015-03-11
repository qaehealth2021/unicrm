/**
 * 
 */
package com.sail.cot.entity;

import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.custinterface.TreeParent;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Sep 19, 2012 2:11:11 PM </p>
 * <p>Class Name: StatisticsTreeNode.java </p>
 * @author achui
 *
 */
public class StatisticsTreeNode extends BaseTreeNode implements TreeParent{

	/**
	 * 节点类型，EMPS，CUST，ORDER，根据不同的节点类型，获取不同的数据
	 */
	private int treeLv;
	
	/**
	 * int:对应节点的绑定id
	 */
	private int treeId;
	
	/**
	 * String 页面点击当前节点的所有父亲节点的treeId的集合，用于查询报表
	 * 是一个json字符串，格式为{emps:id,cust:id,orderno:orderno}
	 */
	private String treeLvId;
	
	/**
	 * 树的图标
	 */
	private String iconCls;
	@Override
	public boolean getLeafStatus(Object parent) throws ServiceException {
		// TODO Auto-generated method stub
		return false;
	}
	public int getTreeLv() {
		return treeLv;
	}
	public void setTreeLv(int treeLv) {
		this.treeLv = treeLv;
	}
	public int getTreeId() {
		return treeId;
	}
	public void setTreeId(int treeId) {
		this.treeId = treeId;
	}
	public String getTreeLvId() {
		return treeLvId;
	}
	public void setTreeLvId(String treeLvId) {
		this.treeLvId = treeLvId;
	}
	public String getIconCls() {
		return iconCls;
	}
	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}
	
}
