package com.sail.cot.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.apache.commons.lang.StringUtils;

import com.sail.cot.common.util.ContextUtil;

/**
 * 
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>邮件账号
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Dec 28, 2011 2:39:05 PM </p>
 * <p>Class Name: CotMailAccountCfg.java </p>
 * @author zhao
 *
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "cot_mail_account_cfg")
public class CotMailAccountCfg extends IdEntity implements java.io.Serializable {

	@Column(name = "mail_account", length = 100)
	private String mailAccount;
	
	@Column(name = "mail_pwd", length = 20)
	private String mailPwd;

	@Column(name = "mail_back_day")
	private Integer mailBackDay;

	@Column(name = "auto_receive_time")
	private Integer autoReceiveTime;

	@Column(name = "mail_nickname", length = 100)
	private String mailNickname;

	@Column(name = "mail_send_name", length = 50)
	private String mailSendName;

	@Column(name = "mail_box_type", length = 1)
	private String mailBoxType;

	@ManyToOne
	@JoinColumn(name = "emp_id")
	private CotEmps empId;
	
	@OneToOne(cascade = CascadeType.ALL, mappedBy = "accountCfg")
	private CotMailSmtpCfg smtpCfg;
	
	@OneToOne(cascade = CascadeType.ALL, mappedBy = "accountCfg")
	private CotMailPop3Cfg pop3Cfg;
	
	@OneToOne(cascade = CascadeType.ALL, mappedBy = "accountCfg")
	private CotMailImapCfg imapCfg;

	@Column(name="identity_id")
	private Integer identityId;
	
	public Integer getIdentityId() {
		return identityId;
	}

	public void setIdentityId(Integer identityId) {
		this.identityId = identityId;
	}
	
	public CotMailAccountCfg() {
	}

	public String getMailAccount() {
		return this.mailAccount;
	}

	public void setMailAccount(String mailAccount) {
		this.mailAccount = mailAccount;
	}

	public Integer getMailBackDay() {
		return this.mailBackDay;
	}

	public void setMailBackDay(Integer mailBackDay) {
		this.mailBackDay = mailBackDay;
	}

	public Integer getAutoReceiveTime() {
		String autoRecv = ContextUtil.getProperty("mail.properties", "mail.auto_receive_interval");
		if(StringUtils.isNotEmpty(autoRecv)){
			return Integer.valueOf(autoRecv);
		}else {
			return this.autoReceiveTime;
		}
	}

	public void setAutoReceiveTime(Integer autoReceiveTime) {
		this.autoReceiveTime = autoReceiveTime;
	}

	public String getMailNickname() {
		return this.mailNickname;
	}

	public void setMailNickname(String mailNickname) {
		this.mailNickname = mailNickname;
	}

	public String getMailSendName() {
		return this.mailSendName;
	}

	public void setMailSendName(String mailSendName) {
		this.mailSendName = mailSendName;
	}

	public String getMailBoxType() {
		return this.mailBoxType;
	}

	public void setMailBoxType(String mailBoxType) {
		this.mailBoxType = mailBoxType;
	}

	public CotEmps getEmpId() {
		return this.empId;
	}

	public void setEmpId(CotEmps empId) {
		this.empId = empId;
	}

	public CotMailSmtpCfg getSmtpCfg() {
		return smtpCfg;
	}

	public void setSmtpCfg(CotMailSmtpCfg smtpCfg) {
		this.smtpCfg = smtpCfg;
	}

	public CotMailPop3Cfg getPop3Cfg() {
		return pop3Cfg;
	}

	public void setPop3Cfg(CotMailPop3Cfg pop3Cfg) {
		this.pop3Cfg = pop3Cfg;
	}

	public CotMailImapCfg getImapCfg() {
		return imapCfg;
	}

	public void setImapCfg(CotMailImapCfg imapCfg) {
		this.imapCfg = imapCfg;
	}

	public String getMailPwd() {
		return mailPwd;
	}

	public void setMailPwd(String mailPwd) {
		this.mailPwd = mailPwd;
	}

}