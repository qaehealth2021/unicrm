package com.sail.cot.domain;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_contact_group_detail")
public class CotContactGroupDetail extends com.sail.cot.domain.IdEntity
		implements java.io.Serializable {

	@ManyToOne
	@JoinColumn(name = "group_id", nullable = false)
	private CotContactGroup groupId;

	@ManyToOne
	@JoinColumn(name = "contact_id", nullable = false)
	private CotContact contactId;

	public CotContactGroupDetail() {
	}

	public CotContactGroup getGroupId() {
		return groupId;
	}

	public void setGroupId(CotContactGroup groupId) {
		this.groupId = groupId;
	}


	public CotContact getContactId() {
		return contactId;
	}

	public void setContactId(CotContact contactId) {
		this.contactId = contactId;
	}
}