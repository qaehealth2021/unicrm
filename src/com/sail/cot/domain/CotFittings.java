package com.sail.cot.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_fittings")
public class CotFittings extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {

	@Column(name = "fit_no", length = 50)
	private String fitNo;

	@Column(name = "fit_name", length = 100)
	private String fitName;

	@Column(name = "buy_unit", length = 10)
	private String buyUnit;

	@Column(name = "use_unit", length = 10)
	private String useUnit;

	@Column(name = "fit_trans", precision = 12, scale = 6)
	private Double fitTrans;

	@Column(name = "fit_price", precision = 12, scale = 6)
	private Double fitPrice;

	@Column(name = "fit_quality_stander", length = 100)
	private String fitQualityStander;

	@Column(name = "fit_desc", length = 500)
	private String fitDesc;

	@Column(name = "fit_remark", length = 500)
	private String fitRemark;
	@Temporal(TemporalType.DATE)
	@Column(name = "add_time", length = 10)
	private Date addTime;

	@Column(name = "pic_path", length = 200)
	private String picPath;

	@Column(name = "fit_min_count", precision = 5, scale = 0)
	private Long fitMinCount;

	@ManyToOne
	@JoinColumn(name = "factory_ID")
	private CotFactory factoryId;

	@Column(name = "identity_ID")
	private Integer identityId;

	@ManyToOne
	@JoinColumn(name = "dictionary_ID")
	private CotDictionary dictionaryId;
	
	@Transient
	private Double price;

	public CotFittings() {
	}

	public String getFitNo() {
		return this.fitNo;
	}

	public void setFitNo(String fitNo) {
		this.fitNo = fitNo;
	}

	public String getFitName() {
		return this.fitName;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public void setFitName(String fitName) {
		this.fitName = fitName;
	}

	public String getBuyUnit() {
		return this.buyUnit;
	}

	public void setBuyUnit(String buyUnit) {
		this.buyUnit = buyUnit;
	}

	public String getUseUnit() {
		return this.useUnit;
	}

	public void setUseUnit(String useUnit) {
		this.useUnit = useUnit;
	}

	public Double getFitTrans() {
		return this.fitTrans;
	}

	public void setFitTrans(Double fitTrans) {
		this.fitTrans = fitTrans;
	}

	public Double getFitPrice() {
		return this.fitPrice;
	}

	public void setFitPrice(Double fitPrice) {
		this.fitPrice = fitPrice;
	}

	public String getFitQualityStander() {
		return this.fitQualityStander;
	}

	public void setFitQualityStander(String fitQualityStander) {
		this.fitQualityStander = fitQualityStander;
	}

	public String getFitDesc() {
		return this.fitDesc;
	}

	public void setFitDesc(String fitDesc) {
		this.fitDesc = fitDesc;
	}

	public String getFitRemark() {
		return this.fitRemark;
	}

	public void setFitRemark(String fitRemark) {
		this.fitRemark = fitRemark;
	}

	public Date getAddTime() {
		return this.addTime;
	}

	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}

	public String getPicPath() {
		return this.picPath;
	}

	public void setPicPath(String picPath) {
		this.picPath = picPath;
	}

	public Long getFitMinCount() {
		return this.fitMinCount;
	}

	public void setFitMinCount(Long fitMinCount) {
		this.fitMinCount = fitMinCount;
	}


	public Integer getIdentityId() {
		return this.identityId;
	}

	public void setIdentityId(Integer identityId) {
		this.identityId = identityId;
	}

	public CotFactory getFactoryId() {
		return factoryId;
	}

	public void setFactoryId(CotFactory factoryId) {
		this.factoryId = factoryId;
	}

	public CotDictionary getDictionaryId() {
		return dictionaryId;
	}

	public void setDictionaryId(CotDictionary dictionaryId) {
		this.dictionaryId = dictionaryId;
	}


}