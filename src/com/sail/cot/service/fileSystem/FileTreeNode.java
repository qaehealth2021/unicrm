/**
 * 
 */
package com.sail.cot.service.fileSystem;

import com.sail.cot.entity.BaseTreeNode;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Nov 1, 2012 11:04:55 AM </p>
 * <p>Class Name: FileTreeNode.java </p>
 * @author achui
 *
 */
public class FileTreeNode extends BaseTreeNode{
	
	private String fileFlag = "MU";

	public String getFileFlag() {
		return fileFlag;
	}

	public void setFileFlag(String fileFlag) {
		this.fileFlag = fileFlag;
	}

}
