package com.sail.cot.domain;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_contact_group")
public class CotContactGroup extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {


	@Column(name = "group_name", nullable = true, length = 20)
	private String groupName;

	@Column(name = "emps_id", nullable = true)
	private Integer empsId;

	public CotContactGroup() {
	}

	public CotContactGroup(Integer id) {
		super.setId(id);
	}
	
	public CotContactGroup(String groupName, Integer empsId) {
		this.groupName = groupName;
		this.empsId = empsId;
	}

	public CotContactGroup(String groupName, Integer empsId,
			Set<CotContactGroupDetail> cotContactGroupDetails) {
		this.groupName = groupName;
		this.empsId = empsId;
	}

	public String getGroupName() {
		return this.groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public Integer getEmpsId() {
		return this.empsId;
	}

	public void setEmpsId(Integer empsId) {
		this.empsId = empsId;
	}

}