package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_mail_execute")
public class CotMailExecute extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {

	@Column(name = "rule_id")
	private Integer ruleId;

	@Column(name = "name", length = 50)
	private String name;

	@Column(name = "method", length = 50)
	private String method;

	@Column(name = "args_name", length = 250)
	private String argsName;

	@Column(name = "args", length = 100)
	private String args;

	@Column(name = "package", length = 50)
	private String package_;

	@Column(name = "class", length = 50)
	private String class_;

	@Column(name = "executecfg_id")
	private Integer executecfgId;

	@Column(name = "cust_id")
	private Integer custId;

	@Column(name = "type", length = 10)
	private String type;

	@Column(name = "mail_rule_id")
	private Integer mailRuleId;

	@Column(name = "group_id")
	private Integer groupId;

	public CotMailExecute() {
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMethod() {
		return this.method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public String getArgsName() {
		return this.argsName;
	}

	public void setArgsName(String argsName) {
		this.argsName = argsName;
	}

	public String getArgs() {
		return this.args;
	}

	public void setArgs(String args) {
		this.args = args;
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

	public Integer getExecutecfgId() {
		return this.executecfgId;
	}

	public void setExecutecfgId(Integer executecfgId) {
		this.executecfgId = executecfgId;
	}

	public Integer getCustId() {
		return this.custId;
	}

	public void setCustId(Integer custId) {
		this.custId = custId;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Integer getMailRuleId() {
		return this.mailRuleId;
	}

	public void setMailRuleId(Integer mailRuleId) {
		this.mailRuleId = mailRuleId;
	}

	public Integer getGroupId() {
		return this.groupId;
	}

	public void setGroupId(Integer groupId) {
		this.groupId = groupId;
	}

	public Integer getRuleId() {
		return ruleId;
	}

	public void setRuleId(Integer ruleId) {
		this.ruleId = ruleId;
	}

}