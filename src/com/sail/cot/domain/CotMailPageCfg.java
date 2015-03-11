package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p> 邮件页面配置
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Dec 28, 2011 2:41:45 PM </p>
 * <p>Class Name: CotMailPageCfg.java </p>
 * @author zhao
 *
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "cot_mail_page_cfg")
public class CotMailPageCfg extends IdEntity implements java.io.Serializable {

	@Column(name = "EMP_ID")
	private Integer empId;

	@Column(name = "Info_Panel")
	private String infoPanel;

	@Column(name = "Tree_Panel")
	private String treePanel;

	@Column(name = "Detail_Panel")
	private String detailPanel;

	@Column(name = "History_Card")
	private String historyCard;

	@Column(name = "Mail_Tree_Panel")
	private String mailTreePanel;

	@Column(name = "History_Attach_Panel")
	private String historyAttachPanel;

	@Column(name = "Inbox_Grid", length = 16777215)
	private String inboxGrid;

	@Column(name = "Send_Grid", length = 16777215)
	private String sendGrid;

	@Column(name = "Draft_Grid", length = 16777215)
	private String draftGrid;

	@Column(name = "Del_Grid", length = 16777215)
	private String delGrid;

	@Column(name = "Check_Grid", length = 16777215)
	private String checkGrid;

	public CotMailPageCfg() {
	}

	public CotMailPageCfg(Integer empId, String infoPanel, String treePanel,
			String detailPanel, String historyCard, String mailTreePanel,
			String historyAttachPanel, String inboxGrid, String sendGrid,
			String draftGrid, String delGrid, String checkGrid) {
		this.empId = empId;
		this.infoPanel = infoPanel;
		this.treePanel = treePanel;
		this.detailPanel = detailPanel;
		this.historyCard = historyCard;
		this.mailTreePanel = mailTreePanel;
		this.historyAttachPanel = historyAttachPanel;
		this.inboxGrid = inboxGrid;
		this.sendGrid = sendGrid;
		this.draftGrid = draftGrid;
		this.delGrid = delGrid;
		this.checkGrid = checkGrid;
	}

	public Integer getEmpId() {
		return this.empId;
	}

	public void setEmpId(Integer empId) {
		this.empId = empId;
	}

	public String getInfoPanel() {
		return this.infoPanel;
	}

	public void setInfoPanel(String infoPanel) {
		this.infoPanel = infoPanel;
	}

	public String getTreePanel() {
		return this.treePanel;
	}

	public void setTreePanel(String treePanel) {
		this.treePanel = treePanel;
	}

	public String getDetailPanel() {
		return this.detailPanel;
	}

	public void setDetailPanel(String detailPanel) {
		this.detailPanel = detailPanel;
	}

	public String getHistoryCard() {
		return this.historyCard;
	}

	public void setHistoryCard(String historyCard) {
		this.historyCard = historyCard;
	}

	public String getMailTreePanel() {
		return this.mailTreePanel;
	}

	public void setMailTreePanel(String mailTreePanel) {
		this.mailTreePanel = mailTreePanel;
	}

	public String getHistoryAttachPanel() {
		return this.historyAttachPanel;
	}

	public void setHistoryAttachPanel(String historyAttachPanel) {
		this.historyAttachPanel = historyAttachPanel;
	}

	public String getInboxGrid() {
		return this.inboxGrid;
	}

	public void setInboxGrid(String inboxGrid) {
		this.inboxGrid = inboxGrid;
	}

	public String getSendGrid() {
		return this.sendGrid;
	}

	public void setSendGrid(String sendGrid) {
		this.sendGrid = sendGrid;
	}

	public String getDraftGrid() {
		return this.draftGrid;
	}

	public void setDraftGrid(String draftGrid) {
		this.draftGrid = draftGrid;
	}

	public String getDelGrid() {
		return this.delGrid;
	}

	public void setDelGrid(String delGrid) {
		this.delGrid = delGrid;
	}

	public String getCheckGrid() {
		return this.checkGrid;
	}

	public void setCheckGrid(String checkGrid) {
		this.checkGrid = checkGrid;
	}

}