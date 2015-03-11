package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_area")
public class CotArea extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {

	@Column(name = "AREA_NAME", nullable = false, length = 100)
	private String areaName;

	@Column(name = "AREA_CODE", length = 8)
	private String areaCode;

	@Column(name = "REMARK", length = 200)
	private String remark;

	public CotArea() {
	}

	public CotArea(String areaName) {
		this.areaName = areaName;
	}

	public CotArea(String areaName, String areaCode,
			String remark) {
		this.areaName = areaName;
		this.areaCode = areaCode;
		this.remark = remark;
	}


	public String getAreaName() {
		return this.areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	public String getAreaCode() {
		return this.areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}