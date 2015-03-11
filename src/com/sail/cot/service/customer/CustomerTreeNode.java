/**
 * 
 */
package com.sail.cot.service.customer;

import com.sail.cot.entity.BaseTreeNode;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Sep 20, 2012 3:07:31 PM </p>
 * <p>Class Name: CustomerTreeNode.java </p>
 * @author achui
 *
 */
public class CustomerTreeNode extends BaseTreeNode {
	
	/**
	 * 根据不同的节点类型取不同的数据
	 */
	private int treeLv;
	
	/**
	 * int:对应节点的绑定id
	 */
	private int treeId;
	
	/**
	 * String 页面点击当前节点的所有父亲节点的treeId的集合，用于层级检索
	 * 是一个json字符串，格式为{emps:id,cust:id,orderno:orderno}
	 */
	private String treeLvId;

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
}
