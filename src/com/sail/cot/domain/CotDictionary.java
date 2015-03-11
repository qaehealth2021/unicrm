package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_dictionary")
public class CotDictionary extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {

	@Column(name = "type", length = 50)
	private String type;

	@Column(name = "type_en", length = 50)
	private String typeEn;

	@Column(name = "content", length = 500)
	private String content;

	@Column(name = "remark", length = 200)
	private String remark;

	@Column(name = "flag", nullable = false, length = 10)
	private String flag;

	@Column(name = "delete_flag", nullable = false, length = 1)
	private String deleteFlag;

	@Column(name = "order_seq")
	private Integer orderSeq;

	@Column(name="identity_id")
	private Integer identityId;
	
	public Integer getIdentityId() {
		return identityId;
	}

	public void setIdentityId(Integer identityId) {
		this.identityId = identityId;
	}

	public CotDictionary() {
	}

	public CotDictionary(String flag, String deleteFlag) {
		this.flag = flag;
		this.deleteFlag = deleteFlag;
	}

	public CotDictionary(String type, String typeEn, String content,
			String remark, String flag, String deleteFlag, Integer orderSeq) {
		this.type = type;
		this.typeEn = typeEn;
		this.content = content;
		this.remark = remark;
		this.flag = flag;
		this.deleteFlag = deleteFlag;
		this.orderSeq = orderSeq;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getTypeEn() {
		return this.typeEn;
	}

	public void setTypeEn(String typeEn) {
		this.typeEn = typeEn;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getFlag() {
		return this.flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public String getDeleteFlag() {
		return this.deleteFlag;
	}

	public void setDeleteFlag(String deleteFlag) {
		this.deleteFlag = deleteFlag;
	}

	public Integer getOrderSeq() {
		return this.orderSeq;
	}

	public void setOrderSeq(Integer orderSeq) {
		this.orderSeq = orderSeq;
	}

}