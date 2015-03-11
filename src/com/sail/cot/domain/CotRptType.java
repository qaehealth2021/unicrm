package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_rpt_type")
public class CotRptType extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {

	@Column(name = "rpt_name", nullable = false, length = 50)
	private String rptName;

	@Column(name = "rpt_remark", length = 100)
	private String rptRemark;

	@Column(name = "rpt_sql", length = 16277215)
	private String rptSql;

	public CotRptType() {
	}

	public CotRptType(String rptName) {
		this.rptName = rptName;
	}


	public String getRptName() {
		return this.rptName;
	}

	public void setRptName(String rptName) {
		this.rptName = rptName;
	}

	public String getRptRemark() {
		return this.rptRemark;
	}

	public void setRptRemark(String rptRemark) {
		this.rptRemark = rptRemark;
	}

	public String getRptSql() {
		return this.rptSql;
	}

	public void setRptSql(String rptSql) {
		this.rptSql = rptSql;
	}
}