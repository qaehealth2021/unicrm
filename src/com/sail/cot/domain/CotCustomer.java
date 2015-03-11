package com.sail.cot.domain;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_customer")
public class CotCustomer extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {

	@Column(name = "customer_short_name", nullable = false, length = 100)
	private String customerShortName;

	@Column(name = "customer_no", nullable = false, length = 20)
	private String customerNo;

	@Column(name = "customer_photo", length = 200)
	private String customerPhoto;

	@Column(name = "pri_contact", length = 100)
	private String priContact;

	@Column(name = "full_name_cn", length = 100)
	private String fullNameCn;

	@Column(name = "full_name_en", length = 150)
	private String fullNameEn;

	@Column(name = "contact_nbr", length = 100)
	private String contactNbr;

	@Column(name = "customer_address", length = 1000)
	private String customerAddress;

	@Column(name = "customer_email", length = 100)
	private String customerEmail;

	@Column(name = "customer_addr_en", length = 1000)
	private String customerAddrEn;

	@Column(name = "customer_post", length = 50)
	private String customerPost;

	@Column(name = "customer_fax", length = 100)
	private String customerFax;

	@Column(name = "commision_scale", precision = 5)
	private Double commisionScale;

	@Column(name = "COOPERATE_LV", length = 10)
	private String cooperateLv;

	@Column(name = "customer_remark", length = 500)
	private String customerRemark;

	@Column(name = "customer_zm", length = 500)
	private String customerZm;//指定货代理名称

	@Column(name = "customer_cm", length = 500)
	private String customerCm;//介绍客户名称

	@Column(name = "customer_nm", length = 500)
	private String customerNm;//组织名称

	@Column(name = "customer_zhm", length = 500)
	private String customerZhm;//展会名称

	@Column(name = "product_area", length = 500)
	private String productArea;

	@Column(name = "customer_mb", length = 200)
	private String customerMb;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "add_time", length = 19)
	private Date addTime;

	@Column(name = "add_person", length = 50)
	private String addPerson;

	@Column(name = "product_mb", length = 200)
	private String productMb;

	@Column(name = "culture_background", length = 100)
	private String cultureBackground;

	@Column(name = "ship_info", length = 500)
	private String shipInfo;

	@Column(name = "cust_web", length = 100)
	private String custWeb;

	@Column(name = "cust_from", length = 100)
	private String custFrom;

	@Column(name = "cust_lv_id")
	private Integer custLvId;//客户来源

	@Column(name = "cust_type_id")
	private Integer custTypeId;

	@Column(name = "PAY_TYPE", length = 50)
	private String payType;

	@Column(name = "emps_ID")
	private Integer empsId;
	
	@ManyToOne
	@JoinColumn(name="AREA_ID")
	private CotArea areaId;

	@ManyToOne
	@JoinColumn(name="nation_ID")
	private CotNation nationId;

	@ManyToOne
	@JoinColumn(name="provice_ID")
	private CotProvice proviceId;

	@Column(name = "COMMISION_TYPE", length = 50)
	private String commisionType;

	@Column(name = "target_port_ID")
	private Integer targetPortId;

	@Column(name = "clause_ID")
	private Integer clauseId;

	@Column(name="identity_id")
	private Integer identityId;
	
	@Column(name = "zhan_time", length = 100)
	private String zhanTime;//展会时间
	
	public CotCustomer() {
	}

	public CotCustomer(Integer id) {
		this.setId(id);
	}
	
	public CotCustomer(String customerShortName, String customerNo) {
		this.customerShortName = customerShortName;
		this.customerNo = customerNo;
	}

	public CotCustomer(String customerShortName, String customerNo,
			String customerPhoto, String priContact, String fullNameCn,
			String fullNameEn, String contactNbr, String customerAddress,
			String customerEmail, String customerAddrEn, String customerPost,
			String customerFax, Double commisionScale, String cooperateLv,
			String customerRemark, String customerZm, String customerCm,
			String customerNm, String customerZhm, String productArea,
			String customerMb, Date addTime, String addPerson,
			String productMb, String cultureBackground, String shipInfo,
			String custWeb, String custFrom, Integer custLvId,
			Integer custTypeId, String payType, Integer empsId,
			Integer nationId, Integer proviceId, String commisionType,
			Integer targetPortId, Integer clauseId, Set<CotContact> cotContacts) {
		this.customerShortName = customerShortName;
		this.customerNo = customerNo;
		this.customerPhoto = customerPhoto;
		this.priContact = priContact;
		this.fullNameCn = fullNameCn;
		this.fullNameEn = fullNameEn;
		this.contactNbr = contactNbr;
		this.customerAddress = customerAddress;
		this.customerEmail = customerEmail;
		this.customerAddrEn = customerAddrEn;
		this.customerPost = customerPost;
		this.customerFax = customerFax;
		this.commisionScale = commisionScale;
		this.cooperateLv = cooperateLv;
		this.customerRemark = customerRemark;
		this.customerZm = customerZm;
		this.customerCm = customerCm;
		this.customerNm = customerNm;
		this.customerZhm = customerZhm;
		this.productArea = productArea;
		this.customerMb = customerMb;
		this.addTime = addTime;
		this.addPerson = addPerson;
		this.productMb = productMb;
		this.cultureBackground = cultureBackground;
		this.shipInfo = shipInfo;
		this.custWeb = custWeb;
		this.custFrom = custFrom;
		this.custLvId = custLvId;
		this.custTypeId = custTypeId;
		this.payType = payType;
		this.empsId = empsId;
		this.commisionType = commisionType;
		this.targetPortId = targetPortId;
		this.clauseId = clauseId;
	}

	public Integer getIdentityId() {
		return identityId;
	}

	public void setIdentityId(Integer identityId) {
		this.identityId = identityId;
	}

	public String getCustomerShortName() {
		return this.customerShortName;
	}

	public void setCustomerShortName(String customerShortName) {
		this.customerShortName = customerShortName;
	}

	public String getCustomerNo() {
		return this.customerNo;
	}

	public void setCustomerNo(String customerNo) {
		this.customerNo = customerNo;
	}

	public String getCustomerPhoto() {
		return this.customerPhoto;
	}

	public void setCustomerPhoto(String customerPhoto) {
		this.customerPhoto = customerPhoto;
	}

	public String getPriContact() {
		return this.priContact;
	}

	public String getZhanTime() {
		return zhanTime;
	}

	public void setZhanTime(String zhanTime) {
		this.zhanTime = zhanTime;
	}

	public void setPriContact(String priContact) {
		this.priContact = priContact;
	}

	public String getFullNameCn() {
		return this.fullNameCn;
	}

	public void setFullNameCn(String fullNameCn) {
		this.fullNameCn = fullNameCn;
	}

	public String getFullNameEn() {
		return this.fullNameEn;
	}

	public void setFullNameEn(String fullNameEn) {
		this.fullNameEn = fullNameEn;
	}

	public Double getCommisionScale() {
		return commisionScale;
	}

	public void setCommisionScale(Double commisionScale) {
		this.commisionScale = commisionScale;
	}

	public String getContactNbr() {
		return this.contactNbr;
	}

	public void setContactNbr(String contactNbr) {
		this.contactNbr = contactNbr;
	}

	public String getCustomerAddress() {
		return this.customerAddress;
	}

	public void setCustomerAddress(String customerAddress) {
		this.customerAddress = customerAddress;
	}

	public String getCustomerEmail() {
		return this.customerEmail;
	}

	public void setCustomerEmail(String customerEmail) {
		this.customerEmail = customerEmail;
	}

	public String getCustomerAddrEn() {
		return this.customerAddrEn;
	}

	public void setCustomerAddrEn(String customerAddrEn) {
		this.customerAddrEn = customerAddrEn;
	}

	public String getCustomerPost() {
		return this.customerPost;
	}

	public void setCustomerPost(String customerPost) {
		this.customerPost = customerPost;
	}

	public String getCustomerFax() {
		return this.customerFax;
	}

	public void setCustomerFax(String customerFax) {
		this.customerFax = customerFax;
	}

	public String getCooperateLv() {
		return this.cooperateLv;
	}

	public void setCooperateLv(String cooperateLv) {
		this.cooperateLv = cooperateLv;
	}

	public String getCustomerRemark() {
		return this.customerRemark;
	}

	public void setCustomerRemark(String customerRemark) {
		this.customerRemark = customerRemark;
	}

	public String getCustomerZm() {
		return this.customerZm;
	}

	public void setCustomerZm(String customerZm) {
		this.customerZm = customerZm;
	}

	public String getCustomerCm() {
		return this.customerCm;
	}

	public void setCustomerCm(String customerCm) {
		this.customerCm = customerCm;
	}

	public String getCustomerNm() {
		return this.customerNm;
	}

	public void setCustomerNm(String customerNm) {
		this.customerNm = customerNm;
	}

	public String getCustomerZhm() {
		return this.customerZhm;
	}

	public void setCustomerZhm(String customerZhm) {
		this.customerZhm = customerZhm;
	}

	public String getProductArea() {
		return this.productArea;
	}

	public void setProductArea(String productArea) {
		this.productArea = productArea;
	}

	public String getCustomerMb() {
		return this.customerMb;
	}

	public void setCustomerMb(String customerMb) {
		this.customerMb = customerMb;
	}

	public Date getAddTime() {
		return this.addTime;
	}

	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}

	public String getAddPerson() {
		return this.addPerson;
	}

	public void setAddPerson(String addPerson) {
		this.addPerson = addPerson;
	}

	public String getProductMb() {
		return this.productMb;
	}

	public void setProductMb(String productMb) {
		this.productMb = productMb;
	}

	public String getCultureBackground() {
		return this.cultureBackground;
	}

	public void setCultureBackground(String cultureBackground) {
		this.cultureBackground = cultureBackground;
	}

	public String getShipInfo() {
		return this.shipInfo;
	}

	public void setShipInfo(String shipInfo) {
		this.shipInfo = shipInfo;
	}

	public String getCustWeb() {
		return this.custWeb;
	}

	public void setCustWeb(String custWeb) {
		this.custWeb = custWeb;
	}

	public String getCustFrom() {
		return custFrom;
	}

	public void setCustFrom(String custFrom) {
		this.custFrom = custFrom;
	}

	public Integer getCustLvId() {
		return this.custLvId;
	}

	public CotArea getAreaId() {
		return areaId;
	}

	public void setAreaId(CotArea areaId) {
		this.areaId = areaId;
	}

	public CotNation getNationId() {
		return nationId;
	}

	public void setNationId(CotNation nationId) {
		this.nationId = nationId;
	}

	public CotProvice getProviceId() {
		return proviceId;
	}

	public void setProviceId(CotProvice proviceId) {
		this.proviceId = proviceId;
	}

	public void setCustLvId(Integer custLvId) {
		this.custLvId = custLvId;
	}

	public Integer getCustTypeId() {
		return this.custTypeId;
	}

	public void setCustTypeId(Integer custTypeId) {
		this.custTypeId = custTypeId;
	}

	public Integer getEmpsId() {
		return this.empsId;
	}

	public void setEmpsId(Integer empsId) {
		this.empsId = empsId;
	}

	public String getPayType() {
		return payType;
	}

	public void setPayType(String payType) {
		this.payType = payType;
	}

	public String getCommisionType() {
		return commisionType;
	}

	public void setCommisionType(String commisionType) {
		this.commisionType = commisionType;
	}

	public Integer getTargetPortId() {
		return this.targetPortId;
	}

	public void setTargetPortId(Integer targetPortId) {
		this.targetPortId = targetPortId;
	}

	public Integer getClauseId() {
		return this.clauseId;
	}

	public void setClauseId(Integer clauseId) {
		this.clauseId = clauseId;
	}
}