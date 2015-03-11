package com.sail.cot.domain.vo;

import java.io.Serializable;

import com.zhao.mail.entity.MailPerson;
/**
 * *********************************************
 * @Copyright :(C),2008-2010
 * @CompanyName :厦门市旗航软件有限公司(www.xmqh.net)
 * @Version :1.0
 * @Date :Nov 24, 2010
 * @author : zhao
 * @class :CotReadMailInfoVO.java
 * @Description :正在接收邮件信息
 */
@SuppressWarnings("serial")
public class CotReadMailInfoVO implements Serializable{
	private String subject;  // 主题
	private Integer size;    // 大小
	private MailPerson sender;   // 发件人
	private Integer total;	// 新邮件总数
	private Integer index;  // 当前数
	
	public CotReadMailInfoVO(){}
	
	public CotReadMailInfoVO(String subject, Integer size, MailPerson sender,
			Integer total, Integer index) {
		super();
		this.subject = subject;
		this.size = size;
		this.sender = sender;
		this.total = total;
		this.index = index;
	}



	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public Integer getSize() {
		return size;
	}
	public void setSize(Integer size) {
		this.size = size;
	}
	public MailPerson getSender() {
		return sender;
	}
	public void setSender(MailPerson sender) {
		this.sender = sender;
	}
	public Integer getTotal() {
		return total;
	}
	public void setTotal(Integer total) {
		this.total = total;
	}
	public Integer getIndex() {
		return index;
	}
	public void setIndex(Integer index) {
		this.index = index;
	}
}
