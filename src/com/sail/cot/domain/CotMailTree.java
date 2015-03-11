package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * 
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p> 邮件树
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Dec 28, 2011 2:43:12 PM </p>
 * <p>Class Name: CotMailTree.java </p>
 * @author zhao
 *
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "cot_mail_tree")
public class CotMailTree extends IdEntity implements java.io.Serializable {

	@Column(name = "node_name", length = 100)
	private String nodeName;

	@Column(name = "node_type", length = 1)
	private String nodeType;

	@Column(name = "node_tag", length = 10)
	private String nodeTag;
	
	@Column(name = "parent_id")
	private Integer parentId;
	
	@Column(name = "search_where")
	private String searchWhere;
	
	@ManyToOne
	@JoinColumn(name = "account_cfg_ID")
	private CotMailAccountCfg accountCfgId;
	
	public CotMailTree() {
	}
	public CotMailTree(Integer id) {
		this.setId(id);
	}

	public String getNodeName() {
		return this.nodeName;
	}

	public void setNodeName(String nodeName) {
		this.nodeName = nodeName;
	}

	public String getNodeType() {
		return this.nodeType;
	}

	public void setNodeType(String nodeType) {
		this.nodeType = nodeType;
	}

	public String getNodeTag() {
		return this.nodeTag;
	}

	public void setNodeTag(String nodeTag) {
		this.nodeTag = nodeTag;
	}

	public CotMailAccountCfg getAccountCfgId() {
		return accountCfgId;
	}

	public void setAccountCfgId(CotMailAccountCfg accountCfgId) {
		this.accountCfgId = accountCfgId;
	}
	public Integer getParentId() {
		return parentId;
	}
	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}
	/**
	 * DWR属性中包含nodeType会报错
	 */
	public void setNodeTypeByDwr(String nodeType){
		this.nodeType = nodeType;
	}
	public String getNodeTypeByDwr(){
		return this.nodeType;
	}
	public String getSearchWhere() {
		return searchWhere;
	}
	public void setSearchWhere(String searchWhere) {
		this.searchWhere = searchWhere;
	}

}