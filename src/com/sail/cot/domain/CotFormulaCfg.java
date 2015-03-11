package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_formula_cfg")
public class CotFormulaCfg extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {

	@Column(name = "formula_type", nullable = false, length = 20)
	private String formulaType;

	@Column(name = "formula_factor", length = 20)
	private String formulaFactor;

	@Column(name = "factor_name", length = 50)
	private String factorName;

	@Column(name = "sorce_obj", length = 20)
	private String sorceObj;

	@Column(name = "rely_attr", length = 20)
	private String relyAttr;

	@Column(name = "obj", length = 20)
	private String obj;

	@Column(name = "attribute", length = 20)
	private String attribute;
	
	@Column(name = "key", length = 1)
	private String key;

	public CotFormulaCfg() {
	}

	public CotFormulaCfg(String formulaType) {
		this.formulaType = formulaType;
	}

	public CotFormulaCfg(String formulaType, String formulaFactor,
			String factorName, String sorceObj, String relyAttr, String obj,
			String attribute) {
		this.formulaType = formulaType;
		this.formulaFactor = formulaFactor;
		this.factorName = factorName;
		this.sorceObj = sorceObj;
		this.relyAttr = relyAttr;
		this.obj = obj;
		this.attribute = attribute;
	}

	public String getFormulaType() {
		return this.formulaType;
	}

	public void setFormulaType(String formulaType) {
		this.formulaType = formulaType;
	}

	public String getFormulaFactor() {
		return this.formulaFactor;
	}

	public void setFormulaFactor(String formulaFactor) {
		this.formulaFactor = formulaFactor;
	}

	public String getFactorName() {
		return this.factorName;
	}

	public void setFactorName(String factorName) {
		this.factorName = factorName;
	}

	public String getSorceObj() {
		return this.sorceObj;
	}

	public void setSorceObj(String sorceObj) {
		this.sorceObj = sorceObj;
	}

	public String getRelyAttr() {
		return this.relyAttr;
	}

	public void setRelyAttr(String relyAttr) {
		this.relyAttr = relyAttr;
	}

	public String getObj() {
		return this.obj;
	}

	public void setObj(String obj) {
		this.obj = obj;
	}

	public String getAttribute() {
		return this.attribute;
	}

	public void setAttribute(String attribute) {
		this.attribute = attribute;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

}