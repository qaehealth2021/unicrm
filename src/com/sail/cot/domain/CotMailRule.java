package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_mail_rule")
public class CotMailRule extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {

	@Column(name = "rule_id")
	private Integer ruleId;

	@Column(name = "left_term", length = 50)
	private String leftTerm;

	@Column(name = "op", length = 20)
	private String op;

	@Column(name = "right_term")
	private String rightTerm;

	@Column(name = "rulecfg_id")
	private Integer rulecfgId;

	@Column(name = "cust_id")
	private Integer custId;

	@Column(name = "type", length = 10)
	private String type;

	@Column(name = "relate", length = 10)
	private String relate;

	@Column(name = "group_id")
	private Integer groupId;

	public CotMailRule() {
	}

	public String getLeftTerm() {
		return this.leftTerm;
	}

	public void setLeftTerm(String leftTerm) {
		this.leftTerm = leftTerm;
	}

	public String getOp() {
		return this.op;
	}

	public void setOp(String op) {
		this.op = op;
	}

	public String getRightTerm() {
		return this.rightTerm;
	}

	public void setRightTerm(String rightTerm) {
		this.rightTerm = rightTerm;
	}

	public Integer getRulecfgId() {
		return this.rulecfgId;
	}

	public void setRulecfgId(Integer rulecfgId) {
		this.rulecfgId = rulecfgId;
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

	public String getRelate() {
		return this.relate;
	}

	public void setRelate(String relate) {
		this.relate = relate;
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