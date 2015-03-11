package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_mail_execute_cfg")
public class CotMailExecuteCfg extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {

	@Column(name = "name", length = 50)
	private String name;

	@Column(name = "cmp_type", length = 20)
	private String cmpType;

	@Column(name = "method", length = 50)
	private String method;

	@Column(name = "package", length = 50)
	private String package_;

	@Column(name = "class", length = 50)
	private String class_;

	@Column(name = "type", length = 10)
	private String type;

	public CotMailExecuteCfg() {
	}

	public CotMailExecuteCfg(String name, String cmpType, String method,
			String package_, String class_, String type) {
		this.name = name;
		this.cmpType = cmpType;
		this.method = method;
		this.package_ = package_;
		this.class_ = class_;
		this.type = type;
	}


	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCmpType() {
		return this.cmpType;
	}

	public void setCmpType(String cmpType) {
		this.cmpType = cmpType;
	}

	public String getMethod() {
		return this.method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public String getPackage_() {
		return this.package_;
	}

	public void setPackage_(String package_) {
		this.package_ = package_;
	}

	public String getClass_() {
		return this.class_;
	}

	public void setClass_(String class_) {
		this.class_ = class_;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

}