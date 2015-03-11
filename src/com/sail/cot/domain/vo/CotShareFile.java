/**
 * 
 */
package com.sail.cot.domain.vo;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Oct 19, 2012 5:08:41 PM </p>
 * <p>Class Name: CotShareFile.java </p>
 * @author achui
 *
 */
public class CotShareFile {

	private String fileName;//文件名
	
	private String filePath;//文件路径（带文件名，是相对路径）
	
	private String fileAbsoutePath;//绝对路径
	
	private long fileSize;

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public long getFileSize() {
		return fileSize;
	}

	public void setFileSize(long fileSize) {
		this.fileSize = fileSize;
	}

	public String getFileAbsoutePath() {
		return fileAbsoutePath;
	}

	public void setFileAbsoutePath(String fileAbsoutePath) {
		this.fileAbsoutePath = fileAbsoutePath;
	}
}
