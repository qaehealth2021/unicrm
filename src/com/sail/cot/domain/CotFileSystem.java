package com.sail.cot.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_file_system")
public class CotFileSystem extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {

	@Column(name = "file_tree_id")
	private Integer fileTreeId;

	@Column(name = "file_name", length = 280)
	private String fileName;

	@Column(name = "file_path", length = 300)
	private String filePath;

	@Column(name = "file_path_visual", length = 200)
	private String filePathVisual;

	@Column(name = "file_desc", length = 200)
	private String fileDesc;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "add_time", length = 23)
	private Date addTime;

	@Column(name = "file_extension", length = 10)
	private String fileExtension;

	@ManyToOne
	@JoinColumn(name = "update_emps_id")
	private CotEmps updateEmpsId;

	@Column(name = "move_source_node")
	private Integer moveSourceNode;

	@Column(name = "file_size", precision = 8, scale = 0)
	private Long fileSize;

	//MS:我的共享，PS:公共共享，MU:个人文档
	//他人共享文档，需要结合share表
	@Column(name = "file_flag", length = 2)
	private String fileFlag;

	public CotFileSystem() {
	}

	public String getFileName() {
		return this.fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFilePath() {
		return this.filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getFilePathVisual() {
		return this.filePathVisual;
	}

	public void setFilePathVisual(String filePathVisual) {
		this.filePathVisual = filePathVisual;
	}

	public String getFileDesc() {
		return this.fileDesc;
	}

	public void setFileDesc(String fileDesc) {
		this.fileDesc = fileDesc;
	}

	public Date getAddTime() {
		return this.addTime;
	}

	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}

	public String getFileExtension() {
		return this.fileExtension;
	}

	public void setFileExtension(String fileExtension) {
		this.fileExtension = fileExtension;
	}


	public Integer getFileTreeId() {
		return fileTreeId;
	}

	public void setFileTreeId(Integer fileTreeId) {
		this.fileTreeId = fileTreeId;
	}

	public CotEmps getUpdateEmpsId() {
		return updateEmpsId;
	}

	public void setUpdateEmpsId(CotEmps updateEmpsId) {
		this.updateEmpsId = updateEmpsId;
	}

	public Integer getMoveSourceNode() {
		return this.moveSourceNode;
	}

	public void setMoveSourceNode(Integer moveSourceNode) {
		this.moveSourceNode = moveSourceNode;
	}

	public Long getFileSize() {
		return this.fileSize;
	}

	public void setFileSize(Long fileSize) {
		this.fileSize = fileSize;
	}

	public String getFileFlag() {
		return this.fileFlag;
	}

	public void setFileFlag(String fileFlag) {
		this.fileFlag = fileFlag;
	}

}