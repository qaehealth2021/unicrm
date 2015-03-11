package com.sail.cot.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.zhao.mail.entity.IReceiveCache;

/**
 * 
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p> 邮件接收UID缓存
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Dec 28, 2011 2:42:29 PM </p>
 * <p>Class Name: CotMailReceiveCache.java </p>
 * @author zhao
 *
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "cot_mail_receive_cache")
public class CotMailReceiveCache extends IdEntity implements IReceiveCache,Serializable {

	@Column(name = "mail_account", nullable = false, length = 100)
	private String mailAccount;

	@Column(name = "mail_pop_uid", length = 100)
	private String mailPopUid;

	@Column(name = "mail_msg_id", length = 200)
	private String mailMsgId;

	@Column(name = "mail_imap_uid")
	private Long mailImapUid;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "add_time", length = 0)
	private Date addTime;

	public CotMailReceiveCache() {
	}

	public CotMailReceiveCache(String mailAccount) {
		this.mailAccount = mailAccount;
	}

	public String getMailAccount() {
		return this.mailAccount;
	}

	public void setMailAccount(String mailAccount) {
		this.mailAccount = mailAccount;
	}

	public String getMailPopUid() {
		return this.mailPopUid;
	}

	public void setMailPopUid(String mailPopUid) {
		this.mailPopUid = mailPopUid;
	}

	public String getMailMsgId() {
		return this.mailMsgId;
	}

	public void setMailMsgId(String mailMsgId) {
		this.mailMsgId = mailMsgId;
	}

	public Long getMailImapUid() {
		return this.mailImapUid;
	}

	public void setMailImapUid(Long mailImapUid) {
		this.mailImapUid = mailImapUid;
	}

	public Date getAddTime() {
		return this.addTime;
	}

	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}

}