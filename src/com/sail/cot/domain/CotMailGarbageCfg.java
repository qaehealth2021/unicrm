package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_mail_garbage_cfg")
public class CotMailGarbageCfg extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {


	@Column(name = "account_id")
	private Integer accountId;

	@Column(name = "filter")
	private String filter;

	public CotMailGarbageCfg() {
	}

	public CotMailGarbageCfg(Integer accountId, String filter) {
		this.accountId = accountId;
		this.filter = filter;
	}


	public Integer getAccountId() {
		return this.accountId;
	}

	public void setAccountId(Integer accountId) {
		this.accountId = accountId;
	}

	public String getFilter() {
		return this.filter;
	}

	public void setFilter(String filter) {
		this.filter = filter;
	}

}