package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
 * 
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p> 邮件HTML格式内容
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Dec 28, 2011 2:39:58 PM </p>
 * <p>Class Name: CotMailBodyHtml.java </p>
 * @author zhao
 *
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "cot_mail_body_html", uniqueConstraints = @UniqueConstraint(columnNames = "mail_id"))
public class CotMailBodyHtml extends IdEntity implements java.io.Serializable {
	@Column(name = "body", length = 16777215)
	private String body;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "mail_id", unique = true, nullable = false)
	private CotMail mail;

	public CotMailBodyHtml() {
	}

	public CotMailBodyHtml(String body) {
		super();
		this.body = body;
	}


	public CotMailBodyHtml(CotMail mail) {
		this.mail = mail;
	}

	public CotMailBodyHtml(CotMail mail, String body) {
		this.mail = mail;
		this.body = body;
	}

	public CotMail getMail() {
		return this.mail;
	}

	public void setMail(CotMail mail) {
		this.mail = mail;
	}

	public String getBody() {
		return this.body;
	}

	public void setBody(String body) {
		this.body = body;
	}

}