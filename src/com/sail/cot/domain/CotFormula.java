package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_formula")
public class CotFormula extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {


	@Column(name = "formula_type", nullable = false, length = 20)
	private String formulaType;

	@Column(name = "formula_name", nullable = false, length = 30)
	private String formulaName;

	@Column(name = "express_in", length = 16277215)
	private String expressIn;

	@Column(name = "express_out", length = 300)
	private String expressOut;

	@Column(name = "identity_id")
	private Integer identityId;

	@Column(name = "result_attr", length = 20)
	private String resultAttr;

	@Column(name = "result_obj", length = 20)
	private String resultObj;

	@Column(name = "result_precision")
	private Short resultPrecision;

	@Column(name = "formula_flag", length = 1)
	private String formulaFlag;

	@Column(name = "delete_flag", length = 1)
	private String deleteFlag;

	public CotFormula() {
	}

	public CotFormula(String formulaType, String formulaName) {
		this.formulaType = formulaType;
		this.formulaName = formulaName;
	}

	public CotFormula(String formulaType, String formulaName, String expressIn,
			String expressOut, Integer identityId, String resultAttr,
			String resultObj, Short resultPrecision, String formulaFlag,
			String deleteFlag) {
		this.formulaType = formulaType;
		this.formulaName = formulaName;
		this.expressIn = expressIn;
		this.expressOut = expressOut;
		this.identityId = identityId;
		this.resultAttr = resultAttr;
		this.resultObj = resultObj;
		this.resultPrecision = resultPrecision;
		this.formulaFlag = formulaFlag;
		this.deleteFlag = deleteFlag;
	}

	public String getFormulaType() {
		return this.formulaType;
	}

	public void setFormulaType(String formulaType) {
		this.formulaType = formulaType;
	}

	public String getFormulaName() {
		return this.formulaName;
	}

	public void setFormulaName(String formulaName) {
		this.formulaName = formulaName;
	}

	public String getExpressIn() {
		return this.expressIn;
	}

	public void setExpressIn(String expressIn) {
		this.expressIn = expressIn;
	}

	public String getExpressOut() {
		return this.expressOut;
	}

	public void setExpressOut(String expressOut) {
		this.expressOut = expressOut;
	}

	public Integer getIdentityId() {
		return this.identityId;
	}

	public void setIdentityId(Integer identityId) {
		this.identityId = identityId;
	}

	public String getResultAttr() {
		return this.resultAttr;
	}

	public void setResultAttr(String resultAttr) {
		this.resultAttr = resultAttr;
	}

	public String getResultObj() {
		return this.resultObj;
	}

	public void setResultObj(String resultObj) {
		this.resultObj = resultObj;
	}

	public Short getResultPrecision() {
		return this.resultPrecision;
	}

	public void setResultPrecision(Short resultPrecision) {
		this.resultPrecision = resultPrecision;
	}

	public String getFormulaFlag() {
		return this.formulaFlag;
	}

	public void setFormulaFlag(String formulaFlag) {
		this.formulaFlag = formulaFlag;
	}

	public String getDeleteFlag() {
		return this.deleteFlag;
	}

	public void setDeleteFlag(String deleteFlag) {
		this.deleteFlag = deleteFlag;
	}

}