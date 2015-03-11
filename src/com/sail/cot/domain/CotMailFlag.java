package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * 
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p> 邮件旗帜
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Dec 28, 2011 2:41:01 PM </p>
 * <p>Class Name: CotMailFlag.java </p>
 * @author zhao
 *
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "cot_mail_flag")
public class CotMailFlag extends IdEntity implements java.io.Serializable {

	@Column(name = "name", length = 100)
	private String name;

	@Column(name = "cls", length = 50)
	private String cls;

	@Column(name = "is_default")
	private Boolean isDefault;

	@ManyToOne
	@JoinColumn(name = "emp_ID", nullable = false)
	private CotEmps empId;

	@Column(name="identity_id")
	private Integer identityId;
	
	public Integer getIdentityId() {
		return identityId;
	}

	public void setIdentityId(Integer identityId) {
		this.identityId = identityId;
	}

	public CotMailFlag() {
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCls() {
		return this.cls;
	}

	public void setCls(String cls) {
		this.cls = cls;
	}

	public Boolean getIsDefault() {
		return isDefault;
	}

	public void setIsDefault(Boolean isDefault) {
		this.isDefault = isDefault;
	}

	public CotEmps getEmpId() {
		return empId;
	}

	public void setEmpId(CotEmps empId) {
		this.empId = empId;
	}

}