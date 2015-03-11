package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_module_field")
public class CotModuleField extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {

	@Column(name = "module", length = 30)
	private String module;

	@Column(name = "field", length = 30)
	private String field;

	@Column(name = "module_flag", length = 1)
	private String moduleFlag;

	@Column(name = "module_name", length = 30)
	private String moduleName;

	@Column(name = "field_name", length = 30)
	private String fieldName;

	public CotModuleField() {
	}

	public CotModuleField(String module, String field, String moduleFlag,
			String moduleName, String fieldName) {
		this.module = module;
		this.field = field;
		this.moduleFlag = moduleFlag;
		this.moduleName = moduleName;
		this.fieldName = fieldName;
	}


	public String getModule() {
		return this.module;
	}

	public void setModule(String module) {
		this.module = module;
	}

	public String getField() {
		return this.field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public String getModuleFlag() {
		return this.moduleFlag;
	}

	public void setModuleFlag(String moduleFlag) {
		this.moduleFlag = moduleFlag;
	}

	public String getModuleName() {
		return this.moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}

	public String getFieldName() {
		return this.fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

}