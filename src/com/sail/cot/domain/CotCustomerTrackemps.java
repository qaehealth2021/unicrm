package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_customer_trackemps")
public class CotCustomerTrackemps extends com.sail.cot.domain.IdEntity
		implements java.io.Serializable {

	@Column(name = "cust_id", nullable = false)
	private Integer custId;

	@Column(name = "emp_id")
	private Integer empId;
	
	@Column(name = "share_emp_id")
	private Integer shareEmpId;

	public CotCustomerTrackemps() {
	}

	public CotCustomerTrackemps(Integer custId) {
		this.custId = custId;
	}

	public CotCustomerTrackemps(Integer custId, Integer empId) {
		this.custId = custId;
		this.empId = empId;
	}
	
	public Integer getCustId() {
		return this.custId;
	}

	public void setCustId(Integer custId) {
		this.custId = custId;
	}

	public Integer getEmpId() {
		return this.empId;
	}

	public void setEmpId(Integer empId) {
		this.empId = empId;
	}

	public Integer getShareEmpId() {
		return shareEmpId;
	}

	public void setShareEmpId(Integer shareEmpId) {
		this.shareEmpId = shareEmpId;
	}

}