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
 * <p>Description:</p>邮件TEXT格式内容
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Dec 28, 2011 2:40:46 PM </p>
 * <p>Class Name: CotMailBodyText.java </p>
 * @author zhao
 *
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "cot_mail_body_text", uniqueConstraints = @UniqueConstraint(columnNames = "mail_id"))
public class CotMailBodyText extends IdEntity implements java.io.Serializable {

	@Column(name = "body", length = 16777215)
	private String body;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "mail_id", unique = true, nullable = false)
	private CotMail mail;

	public CotMailBodyText() {
	}

	public CotMailBodyText(String body) {
		this.body = body;
	}
	
	public CotMailBodyText(CotMail mail) {
		this.mail = mail;
	}

	public CotMailBodyText(String body, CotMail mail) {
		this.body = body;
		this.mail = mail;
	}

	public String getBody() {
		return this.body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public CotMail getMail() {
		return this.mail;
	}

	public void setMail(CotMail mail) {
		this.mail = mail;
	}

}