package com.sail.cot.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_login_info")
public class CotLoginInfo extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {

	@Column(name = "LOGIN_EMPID", length = 100)
	private String loginEmpid;

	@Column(name = "LOGIN_NAME", length = 100)
	private String loginName;

	@Column(name = "LOGIN_IPADDR", length = 100)
	private String loginIpaddr;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "LOGIN_TIME", length = 0)
	private Date loginTime;

	@Column(name = "SESSION_ID", length = 100)
	private String sessionId;

	// Constructors

	public String getSessionId() {
		return sessionId;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	/** default constructor */
	public CotLoginInfo() {
	}

	/** minimal constructor */
	public CotLoginInfo(String loginEmpid) {
		this.loginEmpid = loginEmpid;
	}

	/** full constructor */
	public CotLoginInfo(String loginEmpid, String loginName,
			String loginIpaddr, Date loginTime) {
		this.loginEmpid = loginEmpid;
		this.loginName = loginName;
		this.loginIpaddr = loginIpaddr;
		this.loginTime = loginTime;
	}

	public String getLoginEmpid() {
		return this.loginEmpid;
	}

	public void setLoginEmpid(String loginEmpid) {
		this.loginEmpid = loginEmpid;
	}

	public String getLoginName() {
		return this.loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getLoginIpaddr() {
		return this.loginIpaddr;
	}

	public void setLoginIpaddr(String loginIpaddr) {
		this.loginIpaddr = loginIpaddr;
	}

	public Date getLoginTime() {
		return this.loginTime;
	}

	public void setLoginTime(Date loginTime) {
		this.loginTime = loginTime;
	}

}