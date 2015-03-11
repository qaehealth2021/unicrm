package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_popedom_record")
public class CotPopedomRecord extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {

	@Column(name = "emps_ID", nullable = false)
	private Integer empsId;

	@Column(name = "module", nullable = false, length = 30)
	private String module;

	@Column(name = "primary_id", nullable = false, length = 32)
	private String primaryId;

	@Column(name = "title", nullable = false, length = 50)
	private String title;
	
	public CotPopedomRecord() {
	}

	public Integer getEmpsId() {
		return empsId;
	}


	public void setEmpsId(Integer empsId) {
		this.empsId = empsId;
	}


	public String getModule() {
		return this.module;
	}

	public void setModule(String module) {
		this.module = module;
	}

	public String getPrimaryId() {
		return this.primaryId;
	}

	public void setPrimaryId(String primaryId) {
		this.primaryId = primaryId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

}