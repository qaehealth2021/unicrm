package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_factory")
public class CotFactory extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {

	@Column(name = "factory_no", nullable = true, length = 200)
	private String factoryNo;

	@Column(name = "factory_name", length = 250)
	private String factoryName;

	@Column(name = "short_name", length = 100)
	private String shortName;

	@Column(name = "contact_person", length = 20)
	private String contactPerson;

	@Column(name = "contact_nbr", length = 50)
	private String contactNbr;

	@Column(name = "factory_fax", length = 50)
	private String factoryFax;

	@Column(name = "factory_addr", length = 100)
	private String factoryAddr;

	@Column(name = "post", length = 50)
	private String post;

	@Column(name = "COOPERATE_LV", length = 10)
	private String cooperateLv;

	@Column(name = "COOPERATE_DESC", length = 250)
	private String cooperateDesc;

	@Column(name = "FACTORY_CORPORATION", length = 20)
	private String factoryCorporation;

	@Column(name = "FACTORY_BANK", length = 50)
	private String factoryBank;

	@Column(name = "FACTORY_SCALE", length = 10)
	private String factoryScale;

	@Column(name = "BANK_ACCOUNT", length = 30)
	private String bankAccount;

	@Column(name = "TAX_NO", length = 30)
	private String taxNo;

	@Column(name = "REMARK", length = 200)
	private String remark;

	@Column(name = "FACTORY_EMAIL", length = 100)
	private String factoryEmail;

	@Column(name = "factory_type")
	private Byte factoryType;

	@Column(name = "pack_type")
	private Byte packType;

	@Column(name = "fit_type")
	private Byte fitType;

	@Column(name = "xie_type")
	private Byte xieType;

	@Column(name = "area_ID")
	private Integer areaId;

	@Column(name = "city_ID")
	private Integer cityId;

	@Column(name = "factory_category")
	private Integer factoryCategory;

	@Column(name="identity_id")
	private Integer identityId;
	
	public Integer getIdentityId() {
		return identityId;
	}

	public void setIdentityId(Integer identityId) {
		this.identityId = identityId;
	}

	public CotFactory() {
	}

	public CotFactory(String factoryNo) {
		this.factoryNo = factoryNo;
	}

	public String getFactoryNo() {
		return this.factoryNo;
	}

	public void setFactoryNo(String factoryNo) {
		this.factoryNo = factoryNo;
	}

	public String getFactoryName() {
		return this.factoryName;
	}

	public void setFactoryName(String factoryName) {
		this.factoryName = factoryName;
	}

	public String getShortName() {
		return this.shortName;
	}

	public void setShortName(String shortName) {
		this.shortName = shortName;
	}

	public String getContactPerson() {
		return this.contactPerson;
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

	public String getFactoryFax() {
		return this.factoryFax;
	}

	public void setFactoryFax(String factoryFax) {
		this.factoryFax = factoryFax;
	}

	public String getFactoryAddr() {
		return this.factoryAddr;
	}

	public void setFactoryAddr(String factoryAddr) {
		this.factoryAddr = factoryAddr;
	}

	public String getPost() {
		return this.post;
	}

	public void setPost(String post) {
		this.post = post;
	}

	public String getCooperateLv() {
		return this.cooperateLv;
	}

	public void setCooperateLv(String cooperateLv) {
		this.cooperateLv = cooperateLv;
	}

	public String getCooperateDesc() {
		return this.cooperateDesc;
	}

	public void setCooperateDesc(String cooperateDesc) {
		this.cooperateDesc = cooperateDesc;
	}

	public String getFactoryCorporation() {
		return this.factoryCorporation;
	}

	public void setFactoryCorporation(String factoryCorporation) {
		this.factoryCorporation = factoryCorporation;
	}

	public String getFactoryBank() {
		return this.factoryBank;
	}

	public void setFactoryBank(String factoryBank) {
		this.factoryBank = factoryBank;
	}

	public String getFactoryScale() {
		return this.factoryScale;
	}

	public void setFactoryScale(String factoryScale) {
		this.factoryScale = factoryScale;
	}

	public String getBankAccount() {
		return this.bankAccount;
	}

	public void setBankAccount(String bankAccount) {
		this.bankAccount = bankAccount;
	}

	public String getTaxNo() {
		return this.taxNo;
	}

	public void setTaxNo(String taxNo) {
		this.taxNo = taxNo;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getFactoryEmail() {
		return this.factoryEmail;
	}

	public void setFactoryEmail(String factoryEmail) {
		this.factoryEmail = factoryEmail;
	}

	public Byte getFactoryType() {
		return this.factoryType;
	}

	public void setFactoryType(Byte factoryType) {
		this.factoryType = factoryType;
	}

	public Byte getPackType() {
		return this.packType;
	}

	public void setPackType(Byte packType) {
		this.packType = packType;
	}

	public Byte getFitType() {
		return this.fitType;
	}

	public void setFitType(Byte fitType) {
		this.fitType = fitType;
	}

	public Byte getXieType() {
		return this.xieType;
	}

	public void setXieType(Byte xieType) {
		this.xieType = xieType;
	}

	public Integer getAreaId() {
		return this.areaId;
	}

	public void setAreaId(Integer areaId) {
		this.areaId = areaId;
	}

	public Integer getCityId() {
		return this.cityId;
	}

	public void setCityId(Integer cityId) {
		this.cityId = cityId;
	}

	public Integer getFactoryCategory() {
		return this.factoryCategory;
	}

	public void setFactoryCategory(Integer factoryCategory) {
		this.factoryCategory = factoryCategory;
	}
}