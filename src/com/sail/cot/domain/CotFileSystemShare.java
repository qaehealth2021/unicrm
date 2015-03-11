package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_file_system_share")
public class CotFileSystemShare extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {


	@Column(name = "file_system_id")
	private Integer fileSystemId;

	@Column(name = "emps_id")
	private Integer empsId;

	public CotFileSystemShare() {
	}

	public CotFileSystemShare(Integer fileSystemId, Integer empsId) {
		this.fileSystemId = fileSystemId;
		this.empsId = empsId;
	}

	public Integer getFileSystemId() {
		return this.fileSystemId;
	}

	public void setFileSystemId(Integer fileSystemId) {
		this.fileSystemId = fileSystemId;
	}

	public Integer getEmpsId() {
		return this.empsId;
	}

	public void setEmpsId(Integer empsId) {
		this.empsId = empsId;
	}

}