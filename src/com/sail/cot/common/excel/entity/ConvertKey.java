/**
 * 
 */
package com.sail.cot.common.excel.entity;

import org.apache.commons.lang.StringUtils;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:excel配置项中，covert_key的对象</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Nov 13, 2012 5:17:53 PM </p>
 * <p>Class Name: ConvertKey.java </p>
 * @author achui
 *
 */
public class ConvertKey {

	private String covertKey;//需要覆盖的查询键
	
	private String queryFields;//额外的查询条件，逗号隔开
	
	private String[] queryOptFields;

	public String getCovertKey() {
		return covertKey;
	}

	public void setCovertKey(String covertKey) {
		this.covertKey = covertKey;
	}

	public String getQueryFields() {
		return queryFields;
	}

	public void setQueryFields(String queryFields) {
		this.queryFields = queryFields;
	}

	public String[] getQueryOptFields() {
		if(StringUtils.isEmpty(this.queryFields)) return null;
		queryOptFields = this.queryFields.split(",");
		return queryOptFields;
	}

	public void setQueryOptFields(String[] queryOptFields) {
		this.queryOptFields = queryOptFields;
	}
}
