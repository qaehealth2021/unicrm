package com.sail.cot.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.zhao.mail.entity.IIMAPConfig;

/**
 * 
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p> 邮件IMAP账号
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Dec 28, 2011 2:41:18 PM </p>
 * <p>Class Name: CotMailImapCfg.java </p>
 * @author zhao
 *
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "cot_mail_imap_cfg", uniqueConstraints = @UniqueConstraint(columnNames = "account_cfg_id"))
public class CotMailImapCfg extends IdEntity implements IIMAPConfig, Serializable {
	
	@Column(name = "imap_account", length = 100)
	private String imapAccount;

	@Column(name = "imap_host", length = 20)
	private String imapHost;

	@Column(name = "imap_port")
	private Integer imapPort;

	@Column(name = "imap_ssl")
	private Boolean imapSsl;

	@OneToOne
	@JoinColumn(name = "account_cfg_id", nullable = false)
	private CotMailAccountCfg accountCfg;

	public CotMailImapCfg() {
	}

	public String getImapHost() {
		return this.imapHost;
	}

	public void setImapHost(String imapHost) {
		this.imapHost = imapHost;
	}

	public Integer getImapPort() {
		return this.imapPort;
	}

	public void setImapPort(Integer imapPort) {
		this.imapPort = imapPort;
	}

	public Boolean getImapSsl() {
		return this.imapSsl;
	}

	public void setImapSsl(Boolean imapSsl) {
		this.imapSsl = imapSsl;
	}

	public String getImapAccount() {
		return this.imapAccount;
	}

	public void setImapAccount(String imapAccount) {
		this.imapAccount = imapAccount;
	}

	public CotMailAccountCfg getAccountCfg() {
		return accountCfg;
	}

	public void setAccountCfg(CotMailAccountCfg accountCfg) {
		this.accountCfg = accountCfg;
	}

	public String getImapPwd() {
		return this.accountCfg.getMailPwd();
	}

}