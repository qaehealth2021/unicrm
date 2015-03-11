package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_popedom_emp_fun")
public class CotPopedomEmpFun extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {
	@Column(name="module_id", nullable=false)
	private Integer moduleId;
	
	@Column(name = "module_fun_ID", nullable = false)
	private Integer moduleFunId;

	@Column(name = "emps_ID", nullable = false)
	private Integer empsId;

	@Column(name="identity_id")
	private Integer identityId;
	
	public Integer getIdentityId() {
		return identityId;
	}

	public void setIdentityId(Integer identityId) {
		this.identityId = identityId;
	}

	public CotPopedomEmpFun() {
	}
	
	public CotPopedomEmpFun(Integer moduleFunId,Integer empsId,Integer moduleId) {
		this.empsId = empsId;
		this.moduleFunId = moduleFunId;
		this.moduleId = moduleId;
	}

	public Integer getModuleFunId() {
		return moduleFunId;
	}

	public void setModuleFunId(Integer moduleFunId) {
		this.moduleFunId = moduleFunId;
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
}