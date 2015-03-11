package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_seq_cfg")
public class CotSeqCfg extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {

	@Column(name = "_key", nullable = false, length = 30)
	private String key;

	@Column(name = "source_obj", length = 30)
	private String sourceObj;
	
	@Column(name = "rely_attr", length = 30)
	private String relyAttr;

	@Column(name = "obj", length = 30)
	private String obj;

	@Column(name = "attribute", length = 30)
	private String attribute;

	@Column(name = "method", length = 30)
	private String method;

	@Column(name = "args", length = 100)
	private String args;

	@Column(name = "argstype", length = 150)
	private String argstype;

	@Column(name = "express", nullable = false, length = 100)
	private String express;

	@Column(name = "type", nullable = false, length = 20)
	private String type;

	@Column(name = "type_name", nullable = false, length = 30)
	private String typeName;

	@Column(name = "belong_type", length = 20)
	private String belongType;

	public CotSeqCfg() {
	}

	public CotSeqCfg(String key, String express, String type, String typeName) {
		this.key = key;
		this.express = express;
		this.type = type;
		this.typeName = typeName;
	}

	public CotSeqCfg(String key, String relyAttr, String obj, String attribute,
			String method, String args, String argstype, String express,
			String type, String typeName, String belongType) {
		this.key = key;
		this.relyAttr = relyAttr;
		this.obj = obj;
		this.attribute = attribute;
		this.method = method;
		this.args = args;
		this.argstype = argstype;
		this.express = express;
		this.type = type;
		this.typeName = typeName;
		this.belongType = belongType;
	}

	public String getKey() {
		return this.key;
	}

	public void setKey(String key) {
		this.key = key;
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

	public String getMethod() {
		return this.method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public String getArgs() {
		return this.args;
	}

	public void setArgs(String args) {
		this.args = args;
	}

	public String getArgstype() {
		return this.argstype;
	}

	public void setArgstype(String argstype) {
		this.argstype = argstype;
	}

	public String getExpress() {
		return this.express;
	}

	public void setExpress(String express) {
		this.express = express;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getTypeName() {
		return this.typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public String getBelongType() {
		return this.belongType;
	}

	public void setBelongType(String belongType) {
		this.belongType = belongType;
	}

	public String getSourceObj() {
		return sourceObj;
	}

	public void setSourceObj(String sourceObj) {
		this.sourceObj = sourceObj;
	}
}