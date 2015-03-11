/**
 * 
 */
package com.sail.cot.query;


import java.util.Map;

import com.jason.core.dao.AbstractQueryInfo;
import com.sail.cot.common.entity.PageData;

/**
 * <p>Title: Ext+DWR+Spring</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2008</p>
 * <p>Company: </p>
 * <p>Create Time: Jul 9, 2008 11:13:37 PM </p>
 * <p>Class Name: QueryInfo.java </p>
 * @author achui
 *
 */
public class QueryInfo  extends AbstractQueryInfo {

	
	/**
	 * 指定需要转换的对象
	 */
	private Class clzz ;
	
	//json-lib过滤属性用
	private String[] excludes ;
	
	/**
	 * Map<String,Object> 传递查询条件
	 */
	private Map<String, Object> whereMap;
	
	private int count;
	
	public QueryInfo(){
	}
	
	/**
	 * 封装查询
	 * @param pageData 页面传递到action的分页和排序参数
	 * @param bean domain对象名
	 * @param orderBy 默认排序
	 */
	public QueryInfo(PageData pageData,String bean,String queryStr,String orderBy){
		String ob=" order by ";
		if(orderBy==null)
			orderBy=ob+"id desc";
		if(pageData.getSort()!=null){
			orderBy=ob+pageData.getSort()+" "+pageData.getDir();
		}
		this.setSelectString(" from "+bean +" where 1=1 ");
		this.setStartIndex(pageData.getStart());
		this.setCountOnEachPage(pageData.getLimit());
		this.setOrderString(orderBy);
		if(queryStr!=null)
			this.setQueryString(queryStr);
	}
	
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	

	/* (non-Javadoc)
	 * @see com.jason.core.dao.AbstractQueryInfo#populate()
	 */
	public void populate() {
		
		
	}
	public String[] getExcludes() {
		return excludes;
	}
	public void setExcludes(String[] excludes) {
		this.excludes = excludes;
	}
	public Class getClzz() {
		return clzz;
	}
	public void setClzz(Class clzz) {
		this.clzz = clzz;
	}
	public Map<String, Object> getWhereMap() {
		return whereMap;
	}
	public void setWhereMap(Map<String, Object> whereMap) {
		this.whereMap = whereMap;
	}
	

}
