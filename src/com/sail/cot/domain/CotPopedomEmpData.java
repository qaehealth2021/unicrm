package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_popedom_emp_data")
public class CotPopedomEmpData extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {

	@Column(name = "emps_ID", nullable = false)
	private Integer empsId;

	@Column(name = "module_ID", nullable = false)
	private Integer moduleId;
	
	@Column(name="data_json",length=200)
	private String  dataJson;
	
	@Column(name="identity_id")
	private Integer identityId;
	
	public Integer getIdentityId() {
		return identityId;
	}

	public void setIdentityId(Integer identityId) {
		this.identityId = identityId;
	}

	public CotPopedomEmpData() {
	}

	public Integer getEmpsId() {
		return empsId;
	}

	public void setEmpsId(Integer empsId) {
		this.empsId = empsId;
	}


	public Integer getModuleId() {
		return moduleId;
	}

	public void setModuleId(Integer moduleId) {
		this.moduleId = moduleId;
	}

	public String getDataJson() {
		return dataJson;
	}

	public void setDataJson(String dataJson) {
		this.dataJson = dataJson;
	}

	/**
	 * @param empsId
	 * @param moduleId
	 * @param dataJson
	 */
	public CotPopedomEmpData(Integer empsId, Integer moduleId, String dataJson) {
		this.empsId = empsId;
		this.moduleId = moduleId;
		this.dataJson = dataJson;
	}

}