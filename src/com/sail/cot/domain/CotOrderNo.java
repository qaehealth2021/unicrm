package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_order_no")
public class CotOrderNo extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {

	@Column(name = "order_no", nullable = false, length = 30)
	private String orderNo;

	@Column(name = "cust_id")
	private Integer custId;

	@Column(name = "pol", length = 30)
	private String pol;

	@Column(name = "pod", length = 30)
	private String pod;

	@Column(name = "remark", length = 300)
	private String remark;

	@Column(name = "air_remark", length = 300)
	private String airRemark;

	@Column(name = "track_status")
	private Integer trackStatus;

	public CotOrderNo() {
	}

	public CotOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	
	public String getOrderNo() {
		return this.orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public Integer getCustId() {
		return this.custId;
	}

	public void setCustId(Integer custId) {
		this.custId = custId;
	}

	public String getPol() {
		return this.pol;
	}

	public void setPol(String pol) {
		this.pol = pol;
	}

	public String getPod() {
		return this.pod;
	}

	public void setPod(String pod) {
		this.pod = pod;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getAirRemark() {
		return this.airRemark;
	}

	public void setAirRemark(String airRemark) {
		this.airRemark = airRemark;
	}

	public Integer getTrackStatus() {
		return this.trackStatus;
	}

	public void setTrackStatus(Integer trackStatus) {
		this.trackStatus = trackStatus;
	}

}