package com.sail.cot.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.zhao.mail.entity.IPOP3Config;

/**
 * 
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p> 邮件POP账号配置
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Dec 28, 2011 2:42:03 PM </p>
 * <p>Class Name: CotMailPop3Cfg.java </p>
 * @author zhao
 *
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "cot_mail_pop3_cfg", uniqueConstraints = @UniqueConstraint(columnNames = "account_cfg_id"))
public class CotMailPop3Cfg extends IdEntity implements IPOP3Config, Serializable {
	
	@Column(name = "pop3_host", length = 20)
	private String pop3Host;

	@Column(name = "pop3_port")
	private Integer pop3Port;

	@Column(name = "pop3_ssl")
	private Boolean pop3Ssl;

	@Column(name = "pop3_account", length = 100)
	private String pop3Account;
	
	@OneToOne
	@JoinColumn(name = "account_cfg_id", nullable = false)
	private CotMailAccountCfg accountCfg;

	public CotMailPop3Cfg() {
	}

	public String getPop3Host() {
		return this.pop3Host;
	}

	public void setPop3Host(String pop3Host) {
		this.pop3Host = pop3Host;
	}

	public Integer getPop3Port() {
		return this.pop3Port;
	}

	public void setPop3Port(Integer pop3Port) {
		this.pop3Port = pop3Port;
	}

	public Boolean getPop3Ssl() {
		return this.pop3Ssl;
	}

	public void setPop3Ssl(Boolean pop3Ssl) {
		this.pop3Ssl = pop3Ssl;
	}

	public String getPop3Account() {
		return this.pop3Account;
	}

	public void setPop3Account(String pop3Account) {
		this.pop3Account = pop3Account;
	}

	public CotMailAccountCfg getAccountCfg() {
		return accountCfg;
	}

	public void setAccountCfg(CotMailAccountCfg accountCfg) {
		this.accountCfg = accountCfg;
	}

	public String getPop3Pwd() {
		return this.accountCfg.getMailPwd();
	}
}