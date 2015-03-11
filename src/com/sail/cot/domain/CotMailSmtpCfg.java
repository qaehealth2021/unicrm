package com.sail.cot.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.zhao.mail.entity.IPOP3Config;
import com.zhao.mail.entity.ISMTPConfig;

/**
 * 
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p> 邮件SMTP账号配置
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Dec 28, 2011 2:38:24 PM </p>
 * <p>Class Name: CotMailSmtpCfg.java </p>
 * @author zhao
 *
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "cot_mail_smtp_cfg", uniqueConstraints = @UniqueConstraint(columnNames = "account_cfg_id"))
public class CotMailSmtpCfg extends IdEntity implements ISMTPConfig, Serializable {

	@Column(name = "smtp_host", length = 20)
	private String smtpHost;

	@Column(name = "smtp_port")
	private Integer smtpPort;

	@Column(name = "smtp_auth")
	private Boolean smtpAuth;

	@Column(name = "smtp_auth_account", length = 100)
	private String smtpAuthAccount;

	@Column(name = "smtp_auth_pwd", length = 20)
	private String smtpAuthPwd;

	@Column(name = "smtp_ssl")
	private Boolean smtpSsl;

	@Column(name = "smtp_tls")
	private Boolean smtpTls;

	@Column(name = "smtp_after_pop")
	private Boolean smtpAfterPop;

	@Column(name = "smtp_encoding", length = 50)
	private String smtpEncoding;
	
	@OneToOne
	@JoinColumn(name = "account_cfg_id", nullable = false)
	private CotMailAccountCfg accountCfg;

	public CotMailSmtpCfg() {
	}

	public String getSmtpHost() {
		return this.smtpHost;
	}

	public void setSmtpHost(String smtpHost) {
		this.smtpHost = smtpHost;
	}

	public Integer getSmtpPort() {
		return this.smtpPort;
	}

	public void setSmtpPort(Integer smtpPort) {
		this.smtpPort = smtpPort;
	}

	public Boolean getSmtpAuth() {
		return this.smtpAuth;
	}

	public void setSmtpAuth(Boolean smtpAuth) {
		this.smtpAuth = smtpAuth;
	}

	public String getSmtpAuthAccount() {
		return this.smtpAuthAccount;
	}

	public void setSmtpAuthAccount(String smtpAuthAccount) {
		this.smtpAuthAccount = smtpAuthAccount;
	}

	public String getSmtpAuthPwd() {
		return this.smtpAuthPwd;
	}

	public void setSmtpAuthPwd(String smtpAuthPwd) {
		this.smtpAuthPwd = smtpAuthPwd;
	}

	public Boolean getSmtpSsl() {
		return this.smtpSsl;
	}

	public void setSmtpSsl(Boolean smtpSsl) {
		this.smtpSsl = smtpSsl;
	}

	public Boolean getSmtpTls() {
		return this.smtpTls;
	}

	public void setSmtpTls(Boolean smtpTls) {
		this.smtpTls = smtpTls;
	}

	public Boolean getSmtpAfterPop() {
		return this.smtpAfterPop;
	}

	public void setSmtpAfterPop(Boolean smtpAfterPop) {
		this.smtpAfterPop = smtpAfterPop;
	}

	public String getSmtpEncoding() {
		return this.smtpEncoding;
	}

	public void setSmtpEncoding(String smtpEncoding) {
		this.smtpEncoding = smtpEncoding;
	}

	public CotMailAccountCfg getAccountCfg() {
		return this.accountCfg;
	}

	public void setAccountCfg(CotMailAccountCfg accountCfg) {
		this.accountCfg = accountCfg;
	}

	public IPOP3Config getPop3Cfg() {
		return this.accountCfg.getPop3Cfg();
	}

}