package com.sail.cot.domain;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import com.zhao.mail.entity.IMailAttach;
import com.zhao.mail.entity.IMailInfo;
import com.zhao.mail.entity.MailPerson;
import com.zhao.mail.util.EntityConverUtil;

/**
 * 
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p> 邮件
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Dec 28, 2011 2:38:41 PM </p>
 * <p>Class Name: CotMail.java </p>
 * @author zhao
 *
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "cot_mail")
public class CotMail extends IdEntity implements IMailInfo,java.io.Serializable {

	//obj.id,obj.mailType,obj.subject,obj.isContainAttach,obj.sendTime
	public CotMail() {
		super();
	}
	
	public CotMail(Integer id,String mailType,String subject,
			Boolean isContainAttach,Date sendTime) {
		super();
		this.setId(id);
		this.subject = subject;
		this.sendTime = sendTime;
		this.isContainAttach = isContainAttach;
		this.mailType = mailType;
	}


	@Column(name = "msg_id", length = 200)
	private String msgId;
	

	@Column(name = "old_mail_id")
	private Integer oldMailId;		// 原相对邮件ID

	@Column(name = "subject", length = 1000)
	private String subject;

	@Column(name = "send_name", length = 100)
	private String sendName;

	@Column(name = "send_url", length = 100)
	private String sendUrl;

	@Column(name = "to_name", length = 16777215)
	private String toName;

	@Column(name = "to_url", length = 16777215)
	private String toUrl;

	@Column(name = "cc_name", length = 16777215)
	private String ccName;

	@Column(name = "cc_url", length = 16777215)
	private String ccUrl;

	@Column(name = "bcc_name", length = 16777215)
	private String bccName;

	@Column(name = "bcc_url", length = 16777215)
	private String bccUrl;

	@Column(name = "reply_to_name", length = 16777215)
	private String replyToName;

	@Column(name = "reply_to_url", length = 16777215)
	private String replyToUrl;

	@Column(name = "to_index")
	private Integer toIndex;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "send_time", length = 0)
	private Date sendTime;

	@Column(name = "size")
	private Integer size;

	@Column(name = "is_notification")
	private Boolean isNotification;

	@Column(name = "is_contain_attach")
	private Boolean isContainAttach;

	@Column(name = "mail_type", length = 1)
	private String mailType;

	@Column(name = "is_read")
	private Boolean isRead;
	
	@Column(name = "priority")
	private Integer priority;

	@Column(name = "mail_tag", length = 10)
	private String mailTag;

	@Column(name = "eml_path", length = 500)
	private String emlPath;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "add_time", length = 0)
	private Date addTime;

	@Column(name = "send_priv", length = 50)
	private String sendPriv;

	@Column(name = "error_msg", length = 500)
	private String errorMsg;

	@Column(name = "remark", length = 200)
	private String remark;
	
	@Column(name = "body_type", length = 10)
	private String bodyType;

	@ManyToOne
	@JoinColumn(name = "send_emp_ID")
	private CotEmps sendEmpId;

	@ManyToOne
	@JoinColumn(name = "exec_emp_ID")
	private CotEmps execEmpId;

	@ManyToOne
	@JoinColumn(name = "check_emp_ID")
	private CotEmps checkEmpId;

	@ManyToOne
	@JoinColumn(name = "contact_ID")
	private CotContact contactId;
	
	@ManyToOne
	@JoinColumn(name = "node_ID", nullable = false)
	private CotMailTree nodeId;
	
	@ManyToOne
	@JoinColumn(name = "mail_flag_ID")
	private CotMailFlag mailFlagId;
	
	@ManyToOne
	@JoinColumn(name = "belong_emp_id")
	private CotEmps belongEmpId;
	
	@Column(name="cfg_id")
	private Integer cfgId;
	
	@Column(name="order_no",length=20)
	private String orderNo;
	
	@Column(name="order_remark",length=300)
	private String orderRemark;
	
	@Column(name="order_air_remark",length=300)
	private String orderAirRemark;
	
	@Column(name="order_pol",length=20)
	private String orderPol;
	
	@Column(name="order_pod",length=20)
	private String orderPod;
	
	@ManyToOne
	@JoinColumn(name = "consign_cust_id")
	private CotCustomer consignCustId;
	
	@ManyToOne
	@JoinColumn(name = "track_status")
	private CotDictionary trackStatus;
	
	@ManyToOne
	@JoinColumn(name = "cust_id")
	private CotCustomer custId;
	
	@Transient
	private CotMailBodyHtml cotMailBodyHtml;
	
	@Transient
	private CotMailBodyText cotMailBodyText;
	
	@Transient
	private Map<String, String> headers;
	
	@Transient
	private List<IMailAttach> attachs;	// 附件
	
	public Integer getOldMailId() {
		return oldMailId;
	}

	public void setOldMailId(Integer oldMailId) {
		this.oldMailId = oldMailId;
	}

	@Column(name="identity_id")
	private Integer identityId;
	
	public Integer getIdentityId() {
		return identityId;
	}

	public void setIdentityId(Integer identityId) {
		this.identityId = identityId;
	}

	public String getMsgId() {
		return this.msgId;
	}

	public void setMsgId(String msgId) {
		this.msgId = msgId;
	}

	public String getSubject() {
		return this.subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getSendName() {
		return this.sendName;
	}

	public void setSendName(String sendName) {
		this.sendName = sendName;
	}

	public String getSendUrl() {
		return this.sendUrl;
	}

	public void setSendUrl(String sendUrl) {
		this.sendUrl = sendUrl;
	}

	public String getToName() {
		return this.toName;
	}

	public void setToName(String toName) {
		this.toName = toName;
	}

	public String getToUrl() {
		return this.toUrl;
	}

	public void setToUrl(String toUrl) {
		this.toUrl = toUrl;
	}

	public String getCcName() {
		return this.ccName;
	}

	public void setCcName(String ccName) {
		this.ccName = ccName;
	}

	public String getCcUrl() {
		return this.ccUrl;
	}

	public void setCcUrl(String ccUrl) {
		this.ccUrl = ccUrl;
	}

	public String getBccName() {
		return this.bccName;
	}

	public void setBccName(String bccName) {
		this.bccName = bccName;
	}

	public String getBccUrl() {
		return this.bccUrl;
	}

	public void setBccUrl(String bccUrl) {
		this.bccUrl = bccUrl;
	}

	public String getReplyToName() {
		return this.replyToName;
	}

	public void setReplyToName(String replyToName) {
		this.replyToName = replyToName;
	}

	public String getReplyToUrl() {
		return this.replyToUrl;
	}

	public void setReplyToUrl(String replyToUrl) {
		this.replyToUrl = replyToUrl;
	}

	public Integer getToIndex() {
		return this.toIndex;
	}

	public void setToIndex(Integer toIndex) {
		this.toIndex = toIndex;
	}

	public Date getSendTime() {
		return this.sendTime;
	}

	public void setSendTime(Date sendTime) {
		this.sendTime = sendTime;
	}

	public Integer getSize() {
		return this.size;
	}

	public void setSize(Integer size) {
		this.size = size;
	}

	public Boolean getIsNotification() {
		return this.isNotification;
	}

	public void setIsNotification(Boolean isNotification) {
		this.isNotification = isNotification;
	}

	public Boolean getIsContainAttach() {
		return this.isContainAttach;
	}

	public void setIsContainAttach(Boolean isContainAttach) {
		this.isContainAttach = isContainAttach;
	}

	public String getMailType() {
		return this.mailType;
	}

	public void setMailType(String mailType) {
		this.mailType = mailType;
	}

	public String getMailTag() {
		return this.mailTag;
	}

	public void setMailTag(String mailTag) {
		this.mailTag = mailTag;
	}

	public String getEmlPath() {
		return this.emlPath;
	}

	public void setEmlPath(String emlPath) {
		this.emlPath = emlPath;
	}

	public Date getAddTime() {
		return this.addTime;
	}

	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}

	public String getSendPriv() {
		return this.sendPriv;
	}

	public void setSendPriv(String sendPriv) {
		this.sendPriv = sendPriv;
	}

	public String getErrorMsg() {
		return this.errorMsg;
	}

	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public CotMailTree getNodeId() {
		return nodeId;
	}

	public void setNodeId(CotMailTree nodeId) {
		this.nodeId = nodeId;
	}

	public CotMailFlag getMailFlagId() {
		return mailFlagId;
	}

	public void setMailFlagId(CotMailFlag mailFlagId) {
		this.mailFlagId = mailFlagId;
	}

	public void setSendEmpId(CotEmps sendEmpId) {
		this.sendEmpId = sendEmpId;
	}

	public void setExecEmpId(CotEmps execEmpId) {
		this.execEmpId = execEmpId;
	}

	public void setCheckEmpId(CotEmps checkEmpId) {
		this.checkEmpId = checkEmpId;
	}

	public void setContactId(CotContact contactId) {
		this.contactId = contactId;
	}

	public CotEmps getSendEmpId() {
		return sendEmpId;
	}

	public CotEmps getExecEmpId() {
		return execEmpId;
	}

	public CotEmps getCheckEmpId() {
		return checkEmpId;
	}

	public CotContact getContactId() {
		return contactId;
	}

	public String getBodyType() {
		return bodyType;
	}

	public void setBodyType(String bodyType) {
		this.bodyType = bodyType;
	}

	public CotMailBodyHtml getCotMailBodyHtml() {
		return cotMailBodyHtml;
	}

	public void setCotMailBodyHtml(CotMailBodyHtml cotMailBodyHtml) {
		if(cotMailBodyHtml != null)
			cotMailBodyHtml.setMail(this);
		this.cotMailBodyHtml = cotMailBodyHtml;
	}

	public CotMailBodyText getCotMailBodyText() {
		return cotMailBodyText;
	}

	public void setCotMailBodyText(CotMailBodyText cotMailBodyText) {
		if(cotMailBodyText != null)
			cotMailBodyText.setMail(this);
		this.cotMailBodyText = cotMailBodyText;
	}
	
	public String getBodyHtml(){
		return this.cotMailBodyHtml == null ? null : this.cotMailBodyHtml.getBody();
	}

	public void setBodyHtml(String bodyHtml) {
		if(this.cotMailBodyHtml == null){
			this.cotMailBodyHtml = new CotMailBodyHtml(bodyHtml);
			this.cotMailBodyHtml.setMail(this);
		}else{
			this.cotMailBodyHtml.setBody(bodyHtml);
		}
	}

	public void setBodyText(String bodyText) {
		if(this.cotMailBodyText == null){
			this.cotMailBodyText = new CotMailBodyText(bodyText);
			this.cotMailBodyText.setMail(this);
		}else{
			this.cotMailBodyText.setBody(bodyText);
		}
	}
	
	public String getBodyText(){
		return this.cotMailBodyText == null ? null : this.cotMailBodyText.getBody();
	}
	
	public Map<String, String> getHeaders() {
		return this.headers;
	}

	public void setHeaders(Map<String, String> headers) {
		this.headers = headers;
	}
	
	public MailPerson getSender() {
		if(this.sendName == null && this.sendUrl == null)
			return null;
		return new MailPerson(this.sendName,this.sendUrl);
	}

	public void setSender(MailPerson sender) {
		if(sender!=null){
			this.sendName = sender.getName();
			this.sendUrl = sender.getEmailUrl();
		}else {
			this.sendName = null;
			this.sendUrl = null;
		}
	}

	public List<MailPerson> getBcc() {
		return EntityConverUtil.toPersons(this.bccName, this.bccUrl);
	}

	public List<MailPerson> getCc() {
		return EntityConverUtil.toPersons(this.ccName, this.ccUrl);
	}

	public List<MailPerson> getReplyTo() {
		return EntityConverUtil.toPersons(this.replyToName, this.replyToUrl);
	}

	public List<MailPerson> getTo() {
		return EntityConverUtil.toPersons(this.toName, this.toUrl);
	}

	public void setBcc(List<MailPerson> bcc) {
		Map<String, String> map = EntityConverUtil.toNameUrlMap(bcc);
		if(map == null){
			this.bccName = null;
			this.bccUrl = null;
		}else{
			this.bccName = map.get("name");
			this.bccUrl = map.get("url");
		}
	}

	public void setCc(List<MailPerson> cc) {
		Map<String, String> map = EntityConverUtil.toNameUrlMap(cc);
		if(map == null){
			this.ccName = null;
			this.ccUrl = null;
		}else{
			this.ccName = map.get("name");
			this.ccUrl = map.get("url");
		}
	}

	public void setReplyTo(List<MailPerson> replayTo) {
		Map<String, String> map = EntityConverUtil.toNameUrlMap(replayTo);
		if(map == null){
			this.replyToName = null;
			this.replyToUrl = null;
		}else{
			this.replyToName = map.get("name");
			this.replyToUrl = map.get("url");
		}
		
	}

	public void setTo(List<MailPerson> to) {
		Map<String, String> map = EntityConverUtil.toNameUrlMap(to);
		if(map == null){
			this.toName = null;
			this.toUrl = null;
		}else{
			this.toName = map.get("name");
			this.toUrl = map.get("url");
		}
	}
	public Boolean getIsRead() {
		return isRead;
	}

	public void setIsRead(Boolean isRead) {
		this.isRead = isRead;
	}

	public List<IMailAttach> getAttachs() {
		return this.attachs;
	}

	public void setAttachs(List<IMailAttach> list) {
		this.attachs = list;
	}

	public Integer getPriority() {
		return this.priority;
	}

	public void setPriority(Integer priority) {
		this.priority = priority;
	}

	public CotEmps getBelongEmpId() {
		return belongEmpId;
	}

	public void setBelongEmpId(CotEmps belongEmpId) {
		this.belongEmpId = belongEmpId;
	}

	public Integer getCfgId() {
		return cfgId;
	}

	public void setCfgId(Integer cfgId) {
		this.cfgId = cfgId;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getOrderRemark() {
		return orderRemark;
	}

	public void setOrderRemark(String orderRemark) {
		this.orderRemark = orderRemark;
	}

	public CotDictionary getTrackStatus() {
		return trackStatus;
	}

	public void setTrackStatus(CotDictionary trackStatus) {
		this.trackStatus = trackStatus;
	}

	public CotCustomer getCustId() {
		return custId;
	}

	public void setCustId(CotCustomer custId) {
		this.custId = custId;
	}

	public String getOrderAirRemark() {
		return orderAirRemark;
	}

	public void setOrderAirRemark(String orderAirRemark) {
		this.orderAirRemark = orderAirRemark;
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

	public CotCustomer getConsignCustId() {
		return consignCustId;
	}

	public void setConsignCustId(CotCustomer consignCustId) {
		this.consignCustId = consignCustId;
	}
	
}