/**
 * 
 */
package com.sail.cot.common.excel.entity;

import java.util.Map;

/**
 * <p>Title: 旗航不锈钢管理系统（QHERP）</p>
 * <p>Description:封装Excel的导入对象</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Oct 18, 2011 3:46:08 PM </p>
 * <p>Class Name: ExcelImportEntity.java </p>
 * @author achui
 *
 */
public class ExcelImportEntity {
	
	private String table;
	
	private String domainPackage;
	
	private ConvertKey convertKey;
	
	private String loginIdKey;
	
	private String identityIdKey;
	
	private String addDateKey;
	
	private Map<String, Importfield> fieldCfgMap;
	
	//private Set<Importfield> importFieldSet;

	public ExcelImportEntity(){
		
	}
	
	public String getTable() {
		return table;
	}
	
	public void setTable(String table) {
		this.table = table;
	}

//	public Set<Importfield> getImportFieldSet() {
//		return importFieldSet;
//	}
//
//	public void setImportFieldSet(Set<Importfield> importFieldSet) {
//		this.importFieldSet = importFieldSet;
//	}

	public String getLoginIdKey() {
		return loginIdKey;
	}

	public void setLoginIdKey(String loginIdKey) {
		this.loginIdKey = loginIdKey;
	}

	public String getIdentityIdKey() {
		return identityIdKey;
	}

	public void setIdentityIdKey(String identityIdKey) {
		this.identityIdKey = identityIdKey;
	}

	public String getAddDateKey() {
		return addDateKey;
	}

	public void setAddDateKey(String addDateKey) {
		this.addDateKey = addDateKey;
	}

	public String getDomainPackage() {
		return domainPackage;
	}

	public void setDomainPackage(String domainPackage) {
		this.domainPackage = domainPackage;
	}

	public Map<String, Importfield> getFieldCfgMap() {
		return fieldCfgMap;
	}

	public void setFieldCfgMap(Map<String, Importfield> fieldCfgMap) {
		this.fieldCfgMap = fieldCfgMap;
	}
	
	public String getDomainClzz(){
		return this.getDomainPackage()+"."+this.getTable();
	}

	public ConvertKey getConvertKey() {
		return convertKey;
	}

	public void setConvertKey(ConvertKey convertKey) {
		this.convertKey = convertKey;
	}

}
