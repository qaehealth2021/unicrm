package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_mail_rule_cfg")
public class CotMailRuleCfg extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {

	@Column(name = "name", length = 50)
	private String name;

	@Column(name = "property", length = 50)
	private String property;

	@Column(name = "type", length = 10)
	private String type;

	public CotMailRuleCfg() {
	}

	public CotMailRuleCfg(String name, String property, String type) {
		this.name = name;
		this.property = property;
		this.type = type;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getProperty() {
		return this.property;
	}

	public void setProperty(String property) {
		this.property = property;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

}