package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_msg_unread")
public class CotMsgUnread extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {

	@Column(name = "emps_id", nullable = false)
	private Integer empsId;

	@Column(name = "account_cfg_id")
	private Integer accountCfgId;

	@Column(name = "unread_count")
	private Integer unreadCount;

	@Column(name = "type", length = 5)
	private String type;

	public CotMsgUnread() {
	}

	public CotMsgUnread(Integer empsId) {
		this.empsId = empsId;
	}

	public CotMsgUnread(Integer empsId, Integer accountCfgId,
			Integer unreadCount, String type) {
		this.empsId = empsId;
		this.accountCfgId = accountCfgId;
		this.unreadCount = unreadCount;
		this.type = type;
	}

	public Integer getEmpsId() {
		return this.empsId;
	}

	public void setEmpsId(Integer empsId) {
		this.empsId = empsId;
	}

	public Integer getAccountCfgId() {
		return this.accountCfgId;
	}

	public void setAccountCfgId(Integer accountCfgId) {
		this.accountCfgId = accountCfgId;
	}

	public Integer getUnreadCount() {
		return this.unreadCount;
	}

	public void setUnreadCount(Integer unreadCount) {
		this.unreadCount = unreadCount;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

}