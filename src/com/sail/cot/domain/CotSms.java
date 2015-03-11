package com.sail.cot.domain;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@SuppressWarnings("serial")
@Entity
@Table(name = "api_mt_uni")
public class CotSms implements java.io.Serializable {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "AUTO_SN", unique = true, nullable = false, length = 32)
	private Integer id; // 任务ID，主键，自增长

	@Column(name = "SM_ID")
	private Integer smId;

	@Column(name = "SRC_ID")
	private Integer srcId;

	@Column(name = "CONTENT", length = 2000)
	private String content;

	@Column(name = "MOBILES", length = 3000)
	private String mobiles;

	@Column(name = "IS_WAP")
	private Integer isWap;

	@Column(name = "URL", length = 110)
	private String url;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "SEND_TIME", length = 0)
	private Date sendTime;

	@Column(name = "SM_TYPE")
	private Integer smType;

	@Column(name = "MSG_FMT")
	private Integer msgFmt;

	@Column(name = "TP_PID")
	private Integer tpPid;

	@Column(name = "TP_UDHI")
	private Integer tpUdhi;

	@Column(name = "FEE_TERMINAL_ID", length = 10)
	private String feeTerminalId;

	@Column(name = "FEE_TYPE", length = 10)
	private String feeType;

	@Column(name = "FEE_CODE", length = 10)
	private String feeCode;

	@Column(name = "FEE_USER_TYPE")
	private Integer feeUserType;

	@Column(name = "order_no", length = 200)
	private String orderNo;// 订单号

	@Column(name = "order_remark", length = 300)
	private String remark;// 海运备注

	@Column(name = "order_air_remark", length = 300)
	private String airRemark;// 空运备注

	@ManyToOne
	@JoinColumn(name = "track_status")
	private CotDictionary statusId;// 数据字典(wlzt)--物流状态

	@ManyToOne
	@JoinColumn(name = "belong_emp_id")
	private CotEmps empId;// 业务员

	@ManyToOne
	@JoinColumn(name = "cust_Id")
	private CotCustomer customerId;// 客户

	@ManyToOne
	@JoinColumn(name = "contact_ID")
	private CotContact contactId;// 联系人

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "SAVE_TIME", length = 0)
	private Date saveTime;// 添加时间
	
	@Column(name = "order_pol", length = 20)
	private String orderPol;// 起运港
	
	@Column(name = "order_pod", length = 20)
	private String orderPod;// 目的港

	public CotSms() {
	}

	public String getContent() {
		return content;
	}

	public CotCustomer getCustomerId() {
		return customerId;
	}

	public String getOrderPol() {
		return orderPol;
	}

	public void setOrderPol(String orderPol) {
		this.orderPol = orderPol;
	}

	public String getOrderPod() {
		return orderPod;
	}

	public void setOrderPod(String orderPod) {
		this.orderPod = orderPod;
	}

	public Date getSaveTime() {
		return saveTime;
	}

	public void setSaveTime(Date saveTime) {
		this.saveTime = saveTime;
	}

	public String getAirRemark() {
		return airRemark;
	}

	public void setAirRemark(String airRemark) {
		this.airRemark = airRemark;
	}

	public void setCustomerId(CotCustomer customerId) {
		this.customerId = customerId;
	}

	public CotContact getContactId() {
		return contactId;
	}

	public void setContactId(CotContact contactId) {
		this.contactId = contactId;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public CotDictionary getStatusId() {
		return statusId;
	}

	public void setStatusId(CotDictionary statusId) {
		this.statusId = statusId;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getSmId() {
		return smId;
	}

	public void setSmId(Integer smId) {
		this.smId = smId;
	}

	public Integer getSrcId() {
		return srcId;
	}

	public void setSrcId(Integer srcId) {
		this.srcId = srcId;
	}

	public String getMobiles() {
		return mobiles;
	}

	public void setMobiles(String mobiles) {
		this.mobiles = mobiles;
	}

	public Integer getIsWap() {
		return isWap;
	}

	public void setIsWap(Integer isWap) {
		this.isWap = isWap;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Date getSendTime() {
		return sendTime;
	}

	public void setSendTime(Date sendTime) {
		this.sendTime = sendTime;
	}

	public Integer getSmType() {
		return smType;
	}

	public void setSmType(Integer smType) {
		this.smType = smType;
	}

	public Integer getMsgFmt() {
		return msgFmt;
	}

	public void setMsgFmt(Integer msgFmt) {
		this.msgFmt = msgFmt;
	}

	public Integer getTpPid() {
		return tpPid;
	}

	public void setTpPid(Integer tpPid) {
		this.tpPid = tpPid;
	}

	public Integer getTpUdhi() {
		return tpUdhi;
	}

	public void setTpUdhi(Integer tpUdhi) {
		this.tpUdhi = tpUdhi;
	}

	public String getFeeTerminalId() {
		return feeTerminalId;
	}

	public void setFeeTerminalId(String feeTerminalId) {
		this.feeTerminalId = feeTerminalId;
	}

	public String getFeeType() {
		return feeType;
	}

	public void setFeeType(String feeType) {
		this.feeType = feeType;
	}

	public String getFeeCode() {
		return feeCode;
	}

	public void setFeeCode(String feeCode) {
		this.feeCode = feeCode;
	}

	public Integer getFeeUserType() {
		return feeUserType;
	}

	public void setFeeUserType(Integer feeUserType) {
		this.feeUserType = feeUserType;
	}

	public CotEmps getEmpId() {
		return empId;
	}

	public void setEmpId(CotEmps empId) {
		this.empId = empId;
	}

}