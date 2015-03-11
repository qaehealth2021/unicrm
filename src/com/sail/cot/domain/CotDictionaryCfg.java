package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_dictionary_cfg")
public class CotDictionaryCfg extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {

	@Column(name = "flag", length = 10)
	private String flag;

	@Column(name = "name", length = 20)
	private String name;

	@Column(name = "head_cfg", length = 100)
	private String headCfg;

	public CotDictionaryCfg() {
	}

	public CotDictionaryCfg(String flag, String name, String headCfg) {
		this.flag = flag;
		this.name = name;
		this.headCfg = headCfg;
	}

	public String getFlag() {
		return this.flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getHeadCfg() {
		return this.headCfg;
	}

	public void setHeadCfg(String headCfg) {
		this.headCfg = headCfg;
	}

}