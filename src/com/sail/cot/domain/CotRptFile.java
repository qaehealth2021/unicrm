package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_rpt_file")
public class CotRptFile extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {

	@ManyToOne
	@JoinColumn(name = "rpt_type_ID", nullable = false)
	private CotRptType rptTypeId;

	@Column(name = "rptfile_path", length = 200)
	private String rptfilePath;

	@Column(name = "rpt_name", nullable = false, length = 100)
	private String rptName;

	@Column(name = "default_flag", length = 1)
	private String defaultFlag;

	@Column(name = "remark", length = 500)
	private String remark;

	@Column(name = "identity_ID")
	private Integer identityId;

	public CotRptFile() {
	}

	public String getRptfilePath() {
		return this.rptfilePath;
	}

	public void setRptfilePath(String rptfilePath) {
		this.rptfilePath = rptfilePath;
	}

	public String getRptName() {
		return this.rptName;
	}

	public void setRptName(String rptName) {
		this.rptName = rptName;
	}

	public String getDefaultFlag() {
		return this.defaultFlag;
	}

	public void setDefaultFlag(String defaultFlag) {
		this.defaultFlag = defaultFlag;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Integer getIdentityId() {
		return this.identityId;
	}

	public void setIdentityId(Integer identityId) {
		this.identityId = identityId;
	}

	public CotRptType getRptTypeId() {
		return rptTypeId;
	}

	public void setRptTypeId(CotRptType rptTypeId) {
		this.rptTypeId = rptTypeId;
	}

}