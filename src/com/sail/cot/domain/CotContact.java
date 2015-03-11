package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
@SuppressWarnings("serial")
@Entity
@Table(name = "cot_contact")
public class CotContact extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {

	@ManyToOne
	@JoinColumn(name = "customer_ID")
	private CotCustomer customerId;//客户

	@Column(name = "CONTACT_PERSON", length = 100)
	private String contactPerson;//联系人
	
	@Column(name = "CONTACT_PERSON_FULL", length = 100)
	private String contactPersonFull;//联系人全称

	@Column(name = "contact_nbr", length = 100)
	private String contactNbr;//电话

	@Column(name = "contact_email", length = 100)
	private String contactEmail;//邮箱

	@Column(name = "contact_duty", length = 100)
	private String contactDuty;//职位

	@Column(name = "contact_fax", length = 100)
	private String contactFax;//传真   (86-0592-333564需要按照这种规则)

	@Column(name = "contact_flag", length = 1)
	private String contactFlag;

	@Column(name = "contact_mobile", length = 100)
	private String contactMobile;//手机

	@Column(name = "remark", length = 250)
	private String remark;

	@ManyToOne
	@JoinColumn(name = "emps_ID")
	private CotEmps empsId;//跟进人
	
	@Column(name="identity_id")
	private Integer identityId;
	
	@Column(name = "x_lite", length = 100)
	private String xLite;//xLite
	
	@Column(name = "msn", length = 100)
	private String msn;//msn
	
	@Column(name = "skype", length = 100)
	private String skype;//skype
	
	@Column(name = "up_man", length = 100)
	private String upMan;//上级

	public CotContact() {
	}
	
	public CotContact(Integer id) {
		super.setId(id);
	}

	public String getContactPerson() {
		return this.contactPerson;
	}

	public String getxLite() {
		return xLite;
	}

	public void setxLite(String xLite) {
		this.xLite = xLite;
	}

	public String getMsn() {
		return msn;
	}

	public void setMsn(String msn) {
		this.msn = msn;
	}

	public String getSkype() {
		return skype;
	}

	public void setSkype(String skype) {
		this.skype = skype;
	}

	public String getUpMan() {
		return upMan;
	}

	public void setUpMan(String upMan) {
		this.upMan = upMan;
	}

	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}

	public String getContactNbr() {
		return this.contactNbr;
	}

	public void setContactNbr(String contactNbr) {
		this.contactNbr = contactNbr;
	}

	public String getContactEmail() {
		return this.contactEmail;
	}

	public void setContactEmail(String contactEmail) {
		this.contactEmail = contactEmail;
	}

	public String getContactDuty() {
		return this.contactDuty;
	}

	public void setContactDuty(String contactDuty) {
		this.contactDuty = contactDuty;
	}

	public String getContactFax() {
		return this.contactFax;
	}

	public String getContactPersonFull() {
		return contactPersonFull;
	}

	public void setContactPersonFull(String contactPersonFull) {
		this.contactPersonFull = contactPersonFull;
	}

	public void setContactFax(String contactFax) {
		this.contactFax = contactFax;
	}

	public String getContactFlag() {
		return this.contactFlag;
	}

	public void setContactFlag(String contactFlag) {
		this.contactFlag = contactFlag;
	}


	public String getContactMobile() {
		return this.contactMobile;
	}
	
	public void setContactMobile(String contactMobile) {
		this.contactMobile = contactMobile;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public CotEmps getEmpsId() {
		return empsId;
	}

	public void setEmpsId(CotEmps empsId) {
		this.empsId = empsId;
	}

	public CotCustomer getCustomerId() {
		return customerId;
	}

	public void setCustomerId(CotCustomer customerId) {
		this.customerId = customerId;
	}

	public Integer getIdentityId() {
		return identityId;
	}

	public void setIdentityId(Integer identityId) {
		this.identityId = identityId;
	}
	
}