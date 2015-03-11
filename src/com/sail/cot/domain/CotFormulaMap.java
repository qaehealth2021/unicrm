package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_formula_map")
public class CotFormulaMap extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {

	@Column(name = "formula_type", length = 20)
	private String formulaType;

	@Column(name = "result_attr", length = 20)
	private String resultAttr;

	@Column(name = "result_attr_name", length = 20)
	private String resultAttrName;

	@Column(name = "result_precision")
	private Short resultPrecision;

	public CotFormulaMap() {
	}

	public CotFormulaMap(String formulaType, String resultAttr,
			String resultAttrName, Short resultPrecision) {
		this.formulaType = formulaType;
		this.resultAttr = resultAttr;
		this.resultAttrName = resultAttrName;
		this.resultPrecision = resultPrecision;
	}

	public String getFormulaType() {
		return this.formulaType;
	}

	public void setFormulaType(String formulaType) {
		this.formulaType = formulaType;
	}

	public String getResultAttr() {
		return this.resultAttr;
	}

	public void setResultAttr(String resultAttr) {
		this.resultAttr = resultAttr;
	}

	public String getResultAttrName() {
		return this.resultAttrName;
	}

	public void setResultAttrName(String resultAttrName) {
		this.resultAttrName = resultAttrName;
	}

	public Short getResultPrecision() {
		return this.resultPrecision;
	}

	public void setResultPrecision(Short resultPrecision) {
		this.resultPrecision = resultPrecision;
	}

}