package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_file_tree")
public class CotFileTree extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {

	@Column(name = "parent_id")
	private Integer parentId;

	@Column(name = "node_name", length = 20)
	private String nodeName;

	@Column(name = "node_flag", length = 3)
	private String nodeFlag;

	@Column(name = "node_cls", length = 20)
	private String nodeCls;

	@Column(name = "emps_id")
	private Integer empsId;

	public CotFileTree() {
	}

	public String getNodeName() {
		return this.nodeName;
	}

	public void setNodeName(String nodeName) {
		this.nodeName = nodeName;
	}

	public String getNodeFlag() {
		return this.nodeFlag;
	}

	public void setNodeFlag(String nodeFlag) {
		this.nodeFlag = nodeFlag;
	}

	public String getNodeCls() {
		return this.nodeCls;
	}

	public void setNodeCls(String nodeCls) {
		this.nodeCls = nodeCls;
	}

	public Integer getEmpsId() {
		return this.empsId;
	}

	public void setEmpsId(Integer empsId) {
		this.empsId = empsId;
	}

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}
}