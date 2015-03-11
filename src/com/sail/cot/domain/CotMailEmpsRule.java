package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_mail_emps_rule")
public class CotMailEmpsRule extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {

	@Column(name = "emp_id")
	private Integer empId;

	@Column(name = "emp_name", length = 100)
	private String empName;

	@Column(name = "relate", length = 10)
	private String relate;

	@Column(name = "rule_name", length = 100)
	private String ruleName;

	@Column(name = "xml_path", length = 200)
	private String xmlPath;

	@Column(name = "rule_default")
	private Integer ruleDefault;

	@Column(name = "rule_desc", length = 500)
	private String ruleDesc;

	@Column(name = "type", length = 10)
	private String type;

	@Column(name = "mail_cfg_id")
	private Integer mailCfgId;

	public CotMailEmpsRule() {
	}

	public CotMailEmpsRule(Integer empId, String empName, String relate,
			String ruleName, String xmlPath, Integer ruleDefault,
			String ruleDesc, String type, Integer mailCfgId) {
		this.empId = empId;
		this.empName = empName;
		this.relate = relate;
		this.ruleName = ruleName;
		this.xmlPath = xmlPath;
		this.ruleDefault = ruleDefault;
		this.ruleDesc = ruleDesc;
		this.type = type;
		this.mailCfgId = mailCfgId;
	}


	public Integer getEmpId() {
		return this.empId;
	}

	public void setEmpId(Integer empId) {
		this.empId = empId;
	}

	public String getEmpName() {
		return this.empName;
	}

	public void setEmpName(String empName) {
		this.empName = empName;
	}

	public String getRelate() {
		return this.relate;
	}

	public void setRelate(String relate) {
		this.relate = relate;
	}

	public String getRuleName() {
		return this.ruleName;
	}

	public void setRuleName(String ruleName) {
		this.ruleName = ruleName;
	}

	public String getXmlPath() {
		return this.xmlPath;
	}

	public void setXmlPath(String xmlPath) {
		this.xmlPath = xmlPath;
	}

	public Integer getRuleDefault() {
		return this.ruleDefault;
	}

	public void setRuleDefault(Integer ruleDefault) {
		this.ruleDefault = ruleDefault;
	}

	public String getRuleDesc() {
		return this.ruleDesc;
	}

	public void setRuleDesc(String ruleDesc) {
		this.ruleDesc = ruleDesc;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Integer getMailCfgId() {
		return this.mailCfgId;
	}

	public void setMailCfgId(Integer mailCfgId) {
		this.mailCfgId = mailCfgId;
	}
}