package com.sail.cot.common.entity;

/**
 * 
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:ExtJs分页并排序对象</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Nov 1, 2011 3:19:46 PM </p>
 * <p>Class Name: PageData.java </p>
 * @author zhao
 *
 */
public class PageData {
	private Integer start;
	private Integer limit;
	private String sort;
	private String dir;
	
	public Integer getStart() {
		return start;
	}
	public void setStart(Integer start) {
		this.start = start;
	}
	public Integer getLimit() {
		return limit;
	}
	public void setLimit(Integer limit) {
		this.limit = limit;
	}
	public String getSort() {
		return sort;
	}
	public void setSort(String sort) {
		this.sort = sort;
	}
	public String getDir() {
		return dir;
	}
	public void setDir(String dir) {
		this.dir = dir;
	}
}
