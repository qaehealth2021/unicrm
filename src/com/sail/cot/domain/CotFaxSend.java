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
@Table(name = "aofax_send_task")
public class CotFaxSend implements java.io.Serializable {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "taskid", unique = true, nullable = false, length = 32)
	private Integer id; // 任务ID，主键，自增长

	@Column(name = "title", length = 200)
	private String title; // 传真主题

	@Column(name = "ic")
	private Integer ic; // 国际区号（必填，如86，即时传真时填0）

	@Column(name = "ldc")
	private Integer ldc;// 长途区号（必填，如755，即时传真或没有长途区号时填0）

	@Column(name = "fax", length = 64)
	private String fax;// 传真号码（发送有线传真时必填，如83235170）

	@Column(name = "account", length = 20)
	private String account; // 傲发帐号（发送即时传真时必填，如AF90000099）

	@Column(name = "sender1", length = 100)
	private String sender1; // 发件人1，标识传真发件人，如公司名

	@Column(name = "sender2", length = 30)
	private String sender2; // 发件人2，标识传真发件人，如人名等

	@Column(name = "receiver1", length = 100)
	private String receiver1; // 收件人1，标识传真收件人，如公司名

	@Column(name = "receiver2", length = 30)
	private String receiver2; // 收件人2，标识传真收件人，如人名等

	@Column(name = "sendfile", length = 500)
	private String sendFile; // 待发送文件名（必填，绝对路径），多个文件之间用“|”相隔（例如：“C:\fax1.txt|D:\fax2.txt”）

	@Column(name = "sendflag", columnDefinition = "default 0")
	private Integer sendFlag; // 发送标志（必填）： 0：普通发送 1：优先发送（排到当前发送队列的首部）

	@Column(name = "line", columnDefinition = "default 0")
	private Integer line;// 4 选择线路（必填）：
							// 0：自动调度（先尝试即时传真，失败后由电话线发送）1：仅电话线发送（fax不能为空）
							// 2：仅即时传真发送（account不能为空）

	@Column(name = "status", columnDefinition = "default 0")
	private Integer status;// 任务状态： 0：提交（等待转换） 1：发送（已转换并排队发送）2：成功（传真发送成功）
							// 3：失败（传真发送失败）
							// 4：取消（传真发送被取消）添加新任务时固定填写为0，发送完成后状态由系统回写

	@Column(name = "extinfo", length = 200)
	private String extInfo; // 扩展信息

	@Column(name = "retcode", columnDefinition = "default 0")
	private Integer retCode; /*
							 * 结果码，发送完成后由系统回写： 0：未知原因 1：忙 2：无拨号音 3：无应答 4：文件格式错
							 * 5：发送页前信号中断 6：线路训练失败 7：发送页后信号中断 8：用户取消 9：超时无应答
							 * 20：待发送文件错误 21：系统读写错误 22：打印转换错误
							 */

	@Column(name = "sendtime")
	private Integer sendTime; // 发送时间（标准C
								// time_t格式，从1970年1月1日0时0分0秒开始计算的秒数），发送完成后由系统回写

	@Column(name = "faxfile", length = 260)
	private String faxFile; // 转换后传真文件名（TIF格式，绝对路径），发送完成后由系统回写

	@Column(name = "reserve1")
	private Integer reserve1; // 保留字段1，固定填0

	@Column(name = "reserve2")
	private Integer reserve2; // 保留字段2，固定填0

	@Column(name = "ext1")
	private Integer ext1; // 扩展字段1，固定填0

	@Column(name = "ext2")
	private Integer ext2; // 扩展字段2，固定填0

	@Column(name = "memo", length = 200)
	private String memo; // 备注

	@Column(name = "subtype")
	private Integer subType; // 提交类型：0：接口提交 1：客户端提交

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

	@Column(name = "order_pol", length = 300)
	private String orderPol;// 起运港
	
	@Column(name = "order_pod", length = 300)
	private String orderPod;// 目的港

	@ManyToOne
	@JoinColumn(name = "track_status")
	private CotDictionary statusId;// 数据字典(wlzt)--物流状态

	@ManyToOne
	@JoinColumn(name = "belong_emp_id")
	private CotEmps empsId;// 数据字典(wlzt)--物流状态

	public CotFaxSend() {
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public CotCustomer getCustomerId() {
		return customerId;
	}

	public CotEmps getEmpsId() {
		return empsId;
	}

	public void setEmpsId(CotEmps empsId) {
		this.empsId = empsId;
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

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
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

	public String getSendFile() {
		return sendFile;
	}

	public void setSendFile(String sendFile) {
		this.sendFile = sendFile;
	}

	public Integer getSendFlag() {
		return sendFlag;
	}

	public void setSendFlag(Integer sendFlag) {
		this.sendFlag = sendFlag;
	}

	public Integer getLine() {
		return line;
	}

	public void setLine(Integer line) {
		this.line = line;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getExtInfo() {
		return extInfo;
	}

	public void setExtInfo(String extInfo) {
		this.extInfo = extInfo;
	}

	public Integer getRetCode() {
		return retCode;
	}

	public void setRetCode(Integer retCode) {
		this.retCode = retCode;
	}

	public Integer getSendTime() {
		return sendTime;
	}

	public void setSendTime(Integer sendTime) {
		this.sendTime = sendTime;
	}

	public String getFaxFile() {
		return faxFile;
	}

	public void setFaxFile(String faxFile) {
		this.faxFile = faxFile;
	}

	public Integer getReserve1() {
		return reserve1;
	}

	public void setReserve1(Integer reserve1) {
		this.reserve1 = reserve1;
	}

	public Integer getReserve2() {
		return reserve2;
	}

	public void setReserve2(Integer reserve2) {
		this.reserve2 = reserve2;
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

	public Integer getSubType() {
		return subType;
	}

	public void setSubType(Integer subType) {
		this.subType = subType;
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