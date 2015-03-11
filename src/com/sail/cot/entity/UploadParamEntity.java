package com.sail.cot.entity;

import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileItem;

public class UploadParamEntity {
	private FileItem fileItem;		// 上传项
	private String uploadPath;		// 文件上传路径
	private String tbName;			// 更新表名
	private String id;				// 主键
	private String field;			// 更新字段
	private String fkIdVal;			// 关联外键的值
	private String fkField;			// 关联外键属性
	private boolean doDbOp;			// 是否新增
	private String paramJson;		// 要存入其它属性值的JSON格式
	private boolean isRName;		// 是否随机名字
	private HttpSession session;	// session 
	
	
	
	public FileItem getFileItem() {
		return fileItem;
	}
	public void setFileItem(FileItem fileItem) {
		this.fileItem = fileItem;
	}
	public String getUploadPath() {
		return uploadPath;
	}
	public void setUploadPath(String uploadPath) {
		this.uploadPath = uploadPath;
	}
	public String getTbName() {
		return tbName;
	}
	public void setTbName(String tbName) {
		this.tbName = tbName;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getField() {
		return field;
	}
	public void setField(String field) {
		this.field = field;
	}
	public String getFkIdVal() {
		return fkIdVal;
	}
	public void setFkIdVal(String fkIdVal) {
		this.fkIdVal = fkIdVal;
	}
	public String getFkField() {
		return fkField;
	}
	public void setFkField(String fkField) {
		this.fkField = fkField;
	}
	public boolean isDoDbOp() {
		return doDbOp;
	}
	public void setDoDbOp(boolean doDbOp) {
		this.doDbOp = doDbOp;
	}
	public String getParamJson() {
		return paramJson;
	}
	public void setParamJson(String paramJson) {
		this.paramJson = paramJson;
	}
	public boolean isRName() {
		return isRName;
	}
	public void setRName(boolean isRName) {
		this.isRName = isRName;
	}
	public HttpSession getSession() {
		return session;
	}
	public void setSession(HttpSession session) {
		this.session = session;
	}
}
