/**
 * 
 */
package com.sail.cot.entity;

import com.sail.cot.custinterface.TreeParent;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Sep 19, 2012 2:11:11 PM </p>
 * <p>Class Name: StatisticsTreeNode.java </p>
 * @author achui
 *
 */
public class CheckStatisticsTreeNode extends StatisticsTreeNode implements TreeParent{
	private boolean checked;

	private String backText;//备份的文本
	public boolean isChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}

	public String getBackText() {
		return super.getText();
	}

	public void setBackText(String backText) {
		this.backText = super.getText();
	} 
	
}
