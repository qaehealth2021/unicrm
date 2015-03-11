package com.sail.cot.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_sys_log")
public class CotSysLog extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {


	@Column(name = "OP_MESSAGE", length = 50)
	private String opMessage;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "OP_TIME", length = 23)
	private Date opTime;

	@Column(name = "OP_TYPE")
	private Integer opType;

	@Column(name = "OP_MODULE", length = 20)
	private String opModule;

	@ManyToOne
	@JoinColumn(name = "emps_id")
	private CotEmps empsId;

	public CotSysLog() {
	}



	public String getOpMessage() {
		return this.opMessage;
	}

	public void setOpMessage(String opMessage) {
		this.opMessage = opMessage;
	}

	public Date getOpTime() {
		return this.opTime;
	}

	public void setOpTime(Date opTime) {
		this.opTime = opTime;
	}

	public Integer getOpType() {
		return this.opType;
	}

	public void setOpType(Integer opType) {
		this.opType = opType;
	}

	public String getOpModule() {
		return this.opModule;
	}

	public void setOpModule(String opModule) {
		this.opModule = opModule;
	}

	public CotEmps getEmpsId() {
		return empsId;
	}

	public void setEmpsId(CotEmps empsId) {
		this.empsId = empsId;
	}
}