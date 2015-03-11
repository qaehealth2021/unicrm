package com.sail.cot.domain;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "aofax_recv_task")
public class CotFaxRecv implements java.io.Serializable {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "taskid", unique = true, nullable = false, length = 32)
	private Integer id; // 任务ID，主键，自增长

	@Column(name = "title", length = 200)
	private String title;// 传真主题

	@Column(name = "ic")
	private Integer ic; // 国际区号（发送方）

	@Column(name = "ldc")
	private Integer ldc; // 长途区号（发送方）

	@Column(name = "fax", length = 64)
	private String fax; // 传真号码（发送方传真号码，即时传真时为“传真号码/傲发号”，如“83235170/AF90000099”）

	@Column(name = "sender1", length = 100)
	private String sender1; // 发件人1，标识传真发件人，如公司名

	@Column(name = "sender2", length = 30)
	private String sender2; // 发件人2，标识传真发件人，如人名等

	@Column(name = "receiver1", length = 100)
	private String receiver1; // 收件人1，标识传真收件人，如公司名、部门等

	@Column(name = "receiver2", length = 30)
	private String receiver2; // 收件人2，标识传真收件人，如人名、分机号等

	@Column(name = "faxfile", length = 260)
	private String faxfile; // 传真文件名（绝对路径，TIF格式）

	@Column(name = "page")
	private Integer page; // 传真页数

	@Column(name = "recvtime")
	private Integer recvtime; // 接收时间（标准C time_t格式，从1970年1月1日0时0分0秒开始计算的秒数）

	@Column(name = "recvflag")
	private Integer recvflag; // 接收标志：0：电话线传输方式;1：即时传真传输方式

	@Column(name = "deviceid", length = 16)
	private String deviceid;// 传真机SN码，主要用在多路的情况下标识传真是从哪台3G-FAX接收

	@Column(name = "extinfo", length = 200)
	private String extinfo;// 扩展信息

	@Column(name = "ext1")
	private Integer ext1;// 扩展字段1，固定为0

	@Column(name = "ext2")
	private Integer ext2;// 扩展字段2，固定为0

	@Column(name = "memo", length = 200)
	private String memo;// 备注

	@Column(name = "readflag")
	private Integer readflag;// 已读标识：0：未读1：已读

	@ManyToOne
	@JoinColumn(name = "cust_Id")
	private CotCustomer customerId;// 客户

	@ManyToOne
	@JoinColumn(name = "contact_ID")
	private CotContact contactId;// 联系人

	@Column(name = "order_no", length = 200)
	private String orderNo;// 订单号

	@Column(name = "order_remark", length = 300)
	private String remark;// 订单备注

	@Column(name = "order_air_remark", length = 300)
	private String airRemark;// 空运备注
	
	@Column(name = "order_pol", length = 20)
	private String orderPol;// 空运备注
	
	@Column(name = "order_pod", length = 20)
	private String orderPod;// 空运备注

	@ManyToOne
	@JoinColumn(name = "track_status")
	private CotDictionary statusId;// 数据字典(wlzt)--物流状态

	@ManyToOne
	@JoinColumn(name = "belong_emp_id")
	private CotEmps empsId;// 数据字典(wlzt)--物流状态

	public CotFaxRecv() {
	}

	public CotCustomer getCustomerId() {
		return customerId;
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

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getAirRemark() {
		return airRemark;
	}

	public void setAirRemark(String airRemark) {
		this.airRemark = airRemark;
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

	public CotEmps getEmpsId() {
		return empsId;
	}

	public void setEmpsId(CotEmps empsId) {
		this.empsId = empsId;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Integer getIc() {
		return ic;
	}

	public void setIc(Integer ic) {
		this.ic = ic;
	}

	public Integer getLdc() {
		return ldc;
	}

	public void setLdc(Integer ldc) {
		this.ldc = ldc;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getSender1() {
		return sender1;
	}

	public void setSender1(String sender1) {
		this.sender1 = sender1;
	}

	public String getSender2() {
		return sender2;
	}

	public void setSender2(String sender2) {
		this.sender2 = sender2;
	}

	public String getReceiver1() {
		return receiver1;
	}

	public void setReceiver1(String receiver1) {
		this.receiver1 = receiver1;
	}

	public String getReceiver2() {
		return receiver2;
	}

	public void setReceiver2(String receiver2) {
		this.receiver2 = receiver2;
	}

	public String getFaxfile() {
		return faxfile;
	}

	public void setFaxfile(String faxfile) {
		this.faxfile = faxfile;
	}

	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public Integer getRecvtime() {
		return recvtime;
	}

	public void setRecvtime(Integer recvtime) {
		this.recvtime = recvtime;
	}

	public Integer getRecvflag() {
		return recvflag;
	}

	public void setRecvflag(Integer recvflag) {
		this.recvflag = recvflag;
	}

	public String getDeviceid() {
		return deviceid;
	}

	public void setDeviceid(String deviceid) {
		this.deviceid = deviceid;
	}

	public String getExtinfo() {
		return extinfo;
	}

	public void setExtinfo(String extinfo) {
		this.extinfo = extinfo;
	}

	public Integer getExt1() {
		return ext1;
	}

	public void setExt1(Integer ext1) {
		this.ext1 = ext1;
	}

	public Integer getExt2() {
		return ext2;
	}

	public void setExt2(Integer ext2) {
		this.ext2 = ext2;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public Integer getReadflag() {
		return readflag;
	}

	public void setReadflag(Integer readflag) {
		this.readflag = readflag;
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
}