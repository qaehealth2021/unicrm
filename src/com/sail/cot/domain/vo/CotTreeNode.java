/**
 * 
 */
package com.sail.cot.domain.vo;

import java.util.HashMap;
import java.util.Map;



/**
 * <p>Title: Ext+DWR+Spring</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2008</p>
 * <p>Company: </p>
 * <p>Create Time: Jul 17, 2008 5:51:07 PM </p>
 * <p>Class Name: TreeNode.java </p>
 * @author achui
 *
 */
public  class CotTreeNode {
	private String id;  
	private String url;
	private String text;   
	private Boolean leaf;   
	private String cls;  
	private String href;
	private Boolean expandable; //是否展开 
	private String description; //描述信息 

	public CotTreeNode(){}
	
	public CotTreeNode(String id,String text){
		this.id = id;
		this.text = text;
	}
	public CotTreeNode(String id,String text,Boolean leaf){
		this.id = id;
		this.text = text;
		this.leaf = leaf;
	}
	
	//iframe的名称
	private String hrefTarget="f2";
	private Map<String,String> parentMap = new HashMap<String,String>();
	

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public boolean isLeaf() {
		if(this.leaf == null)
			return this.parentMap.get(this.id) == null?true:false; 
		else
			return leaf;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	public String getCls() {
		if(this.cls == null)
			return this.parentMap.get(this.id) == null?"file":"folder";   
		else
			return this.cls;
	}

	public void setCls(String cls) {
		this.cls = cls;
	}

	public String getHref() {
		return href;
	}

	public void setHref(String href) {
		this.href = href;
	}

	public Boolean getExpandable() {
		return this.expandable;
	}

	public void setExpandable(Boolean expandable) {
		this.expandable = expandable;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getHrefTarget() {
		return hrefTarget;
	}

	public void setHrefTarget(String hrefTarget) {
		this.hrefTarget = hrefTarget;
	}

	public Map<String, String> getParentMap() {
		return parentMap;
	}

	public void setParentMap(Map<String, String> parentMap) {
		this.parentMap = parentMap;
	}
	
	
}