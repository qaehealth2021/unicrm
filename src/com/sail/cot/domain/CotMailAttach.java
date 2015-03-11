package com.sail.cot.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.zhao.mail.entity.IMailAttach;

/**
 * 
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p> 邮件附件
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Dec 28, 2011 2:39:34 PM </p>
 * <p>Class Name: CotMailAttach.java </p>
 * @author zhao
 *
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "cot_mail_attach")
public class CotMailAttach extends IdEntity implements IMailAttach, java.io.Serializable {
	
	public CotMailAttach() {
	}
	
	public CotMailAttach(CotMail cotMail) {
		this.cotMail = cotMail;
	}
	public CotMailAttach(Integer id,Integer mailId,String name,Integer size,String url,Date sendTime){
		super();
		this.setId(id);
		CotMail mail = new CotMail();
		mail.setId(mailId);
		mail.setSendTime(sendTime);
		this.setCotMail(mail);
		this.name = name;
		this.size = size;
		this.url = url;
	}

	@Column(name = "name", length = 200)
	private String name;

	@Column(name = "url", length = 500)
	private String url;

	@Column(name = "size")
	private Integer size;
	
	@ManyToOne
	@JoinColumn(name = "mail_ID", nullable = false)
	private CotMail cotMail;
	
	@Transient
	private String cid;

	public CotMail getCotMail() {
		return this.cotMail;
	}

	public void setCotMail(CotMail cotMail) {
		this.cotMail = cotMail;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUrl() {
		return this.url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Integer getSize() {
		return this.size;
	}

	public void setSize(Integer size) {
		this.size = size;
	}

	public String getCid() {
		return this.cid;
	}

	public void setCid(String cid) {
		this.cid = cid;
	}

}