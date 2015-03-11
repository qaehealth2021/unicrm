package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_provice")
public class CotProvice extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {
	@ManyToOne
	@JoinColumn(name = "nation_ID")
	private CotNation nationId;

	@Column(name = "PROVINCE_NAME", nullable = false, length = 100)
	private String provinceName;

	@Column(name = "PROVINCE_REMARK", length = 100)
	private String provinceRemark;

	public CotProvice() {
	}

	public String getProvinceName() {
		return this.provinceName;
	}

	public void setProvinceName(String provinceName) {
		this.provinceName = provinceName;
	}

	public String getProvinceRemark() {
		return this.provinceRemark;
	}

	public void setProvinceRemark(String provinceRemark) {
		this.provinceRemark = provinceRemark;
	}

	public CotNation getNationId() {
		return nationId;
	}

	public void setNationId(CotNation nationId) {
		this.nationId = nationId;
	}

}