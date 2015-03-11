package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p> 邮件模板
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Dec 28, 2011 2:43:00 PM </p>
 * <p>Class Name: CotMailTemplate.java </p>
 * @author zhao
 *
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "cot_mail_template")
public class CotMailTemplate extends IdEntity implements java.io.Serializable {

	@Column(name = "name", length = 50)
	private String name;

	@Column(name = "html_text", length = 16777215)
	private String htmlText;

	@Column(name = "type", length = 1)
	private String type;

	@Column(name = "tag", length = 1)
	private String tag;
	
	@Column(name = "is_default")
	private Boolean isDefault;

	@Column(name = "emp_ID")
	private Integer empId;
	
	@Column(name="is_share")
	private Integer isShare;
	
	@Transient
	private boolean isLeaf = true;	// EXTJS 叶子节点
	
	@Transient
	private String nodeType = "T";	// 节点类型	用于Ext.tree.TreePanel.nodeTypes

	public String getNodeType() {
		return nodeType;
	}

	public boolean isLeaf() {
		return isLeaf;
	}

	public void setLeaf(boolean isLeaf) {
		this.isLeaf = isLeaf;
	}

	public Integer getEmpId() {
		return empId;
	}

	public void setEmpId(Integer empId) {
		this.empId = empId;
	}

	@Column(name="identity_id")
	private Integer identityId;
	
	public Integer getIdentityId() {
		return identityId;
	}

	public void setIdentityId(Integer identityId) {
		this.identityId = identityId;
	}

	public CotMailTemplate() {
	}

	public String getText() { // Ext tree
		return this.name;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}
	public Boolean getIsDefault() {
		return isDefault;
	}

	public void setIsDefault(Boolean isDefault) {
		this.isDefault = isDefault;
	}
	public String getHtmlText() {
		return htmlText;
	}

	public void setHtmlText(String htmlText) {
		this.htmlText = htmlText;
	}

	public String getTag() {
		return this.tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getIsShare() {
		return isShare;
	}

	public void setIsShare(Integer isShare) {
		this.isShare = isShare;
	}

}