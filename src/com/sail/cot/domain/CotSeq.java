package com.sail.cot.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_seq")
public class CotSeq extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {

	@Column(name = "seq_cfg", length = 50)
	private String seqCfg;

	@Column(name = "current_seq")
	private Integer currentSeq;

	@Column(name = "zero_type")
	private Integer zeroType;
	@Temporal(TemporalType.DATE)
	@Column(name = "his_day", length = 10)
	private Date hisDay;

	@Column(name = "type", length = 30)
	private String type;

	@Column(name = "name", length = 100)
	private String name;

	@Column(name="identity_id")
	private Integer identityId;
	
	public Integer getIdentityId() {
		return identityId;
	}

	public void setIdentityId(Integer identityId) {
		this.identityId = identityId;
	}

	public CotSeq() {
	}

	public CotSeq(String seqCfg, Integer currentSeq, Integer zeroType,
			Date hisDay, String type, String name) {
		this.seqCfg = seqCfg;
		this.currentSeq = currentSeq;
		this.zeroType = zeroType;
		this.hisDay = hisDay;
		this.type = type;
		this.name = name;
	}


	public String getSeqCfg() {
		return this.seqCfg;
	}

	public void setSeqCfg(String seqCfg) {
		this.seqCfg = seqCfg;
	}

	public Integer getCurrentSeq() {
		return this.currentSeq;
	}

	public void setCurrentSeq(Integer currentSeq) {
		this.currentSeq = currentSeq;
	}

	public Integer getZeroType() {
		return this.zeroType;
	}

	public void setZeroType(Integer zeroType) {
		this.zeroType = zeroType;
	}

	public Date getHisDay() {
		return this.hisDay;
	}

	public void setHisDay(Date hisDay) {
		this.hisDay = hisDay;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

}