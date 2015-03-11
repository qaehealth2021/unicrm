package com.sail.cot.action;

import java.beans.PropertyDescriptor;
import java.lang.annotation.Annotation;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.persistence.Entity;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang.StringUtils;

import com.opensymphony.xwork2.ActionContext;
import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.entity.PageData;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotEmps;
import com.sail.cot.query.QueryInfo;
import com.sail.cot.util.ConvertTypeUtil;

/**
 * 下拉框通用
 * 
 * @Title: 旗航外贸管理软件V8.0
 * @Description:
 * @Copyright: Copyright (c) 2011
 * @Company: 厦门市旗航软件有限公司
 * @Create Time: Nov 14, 2011 2:51:13 PM
 * @Class Name: CotComboAction.java
 * @author azan
 * 
 */
@SuppressWarnings("serial")
public class CotComboAction extends AbstractAction {

	public Map doParamMap(Map<String,String[]> map) {
		Map returnMap = new HashMap();
		Iterator<String> iterator = map.keySet().iterator();
		String query = null;//模糊查询的值
		String displayField = null;//模糊查询的字段
		String[] column = null;//需要显示的列
		String domain = map.get("domain")[0];//需要查询的表
		String parentComboWith = null;//关联的外键
		String parentValue = null;//关联外键的值
		ConvertTypeUtil convertTypeUtil = null;
		boolean hasIdentityId = false;
		if(StringUtils.isNotEmpty(domain)){
			try {
				Class clzz = Class.forName("com.sail.cot.domain."+domain);
				Object obj = clzz.newInstance();
				//判断是否含有identityId的属性
				hasIdentityId = PropertyUtils.isReadable(obj,"identityId");
				convertTypeUtil = new ConvertTypeUtil(obj);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		Map<String, Object> otherParam = new HashMap<String, Object>();
		while(iterator.hasNext()){
			String key = iterator.next();
			if(key.indexOf("pageData") > -1 
				|| key.indexOf("popedomUrl") > -1 
				|| key.indexOf("popedomQueryId") > -1){
				continue;
			}
			if(map.get(key) != null){
				if("query".equals(key)){
					query = map.get(key)[0];
				}else if("displayField".equals(key)){
					displayField = map.get(key)[0];
				}else if("fields".equals(key)){
					column =  map.get(key)[0].split(",");
				}else if("domain".equals(key)){
					domain = map.get(key)[0];
				}else if("parentComboWith".equals(key)){
					parentComboWith = map.get(key)[0];
				}else if("parentValue".equals(key)){
					parentValue =  map.get(key)[0];
				}
				else{
					String[] params = map.get(key);
					List list = new ArrayList();
					for(String param : params){
						Object obj = convertTypeUtil.convert(key, param);
						if(obj != null)
							list.add(obj);
					}
					if(list.size() > 0){
						key = key.replace(".", "_");
						otherParam.put(key,list);
					}
				}
			}
		}
		StringBuffer queryBuffer = new StringBuffer();

		Map whereMap = new HashMap();
		if(hasIdentityId){
			queryBuffer.append(" and identityId="+super.getCurrentIdentityId());
		}
		if(StringUtils.isNotEmpty(query)){
			queryBuffer.append(" and ").append(displayField).append(" like :").append(displayField);
			whereMap.put(displayField, "%"+query+"%");
		}
		iterator = otherParam.keySet().iterator();
		while(iterator.hasNext()){
			String key = iterator.next();
			String attr = key.replace("_", ".");
			queryBuffer.append(" and ").append(attr).append(" in(:").append(key).append(")");
		}
		whereMap.putAll(otherParam);
		//如果有关联父类下拉框
		
		if(parentComboWith!=null && StringUtils.isNotEmpty(parentValue)){
			PropertyDescriptor descriptor = null;
			try {
				descriptor = PropertyUtils.getPropertyDescriptor(convertTypeUtil.getObject(), parentComboWith);
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				e.printStackTrace();
			} catch (NoSuchMethodException e) {
				e.printStackTrace();
			}
			boolean isDomainClass = false;//外键是否为ManyToOne配置的对象
			Annotation clzz = descriptor.getPropertyType().getAnnotation(Entity.class);
			if(clzz != null)
				isDomainClass = true;
			if(isDomainClass){
				//需要用外键关系来查找
				queryBuffer.append(" and ").append(parentComboWith).append(".id =:").append(parentComboWith);
			}else {
				queryBuffer.append(" and "+parentComboWith + "=:" + parentComboWith);
			}
			whereMap.put(parentComboWith,Integer.parseInt(parentValue));
		}
		returnMap.put("query", queryBuffer.toString());
		returnMap.put("where", whereMap);
		returnMap.put("domain", domain);
		//obj[0] = queryBuffer.toString();
		//obj[1] = whereMap;
		return returnMap;
	}
	
	/**
	 * 普通查询，不带权限控制
	 */
	public String query() {
		ActionContext ac = ActionContext.getContext(); // 获取当前action的上下文
		Map<String,String[]> map = ac.getParameters();

		Map returnMap = this.doParamMap(map);
		if(this.getPageData() == null){
			PageData pageData = new PageData();
			pageData.setStart(0);
			pageData.setLimit(1000);
			this.setPageData(pageData);
		}
		QueryInfo queryInfo = new QueryInfo(this.getPageData(), (String)returnMap.get("domain"),
				(String)returnMap.get("query"), null);
		queryInfo.setWhereMap((Map)returnMap.get("where"));

		try {
			jsonString = this.getBaseSerivce().getJsonData(queryInfo);
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}
	/**
	 * @see 功能描述（必填）：带权限的查询
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Dec 24, 2011 3:41:56 PM</p>
	 * @return
	 * 返回值：String
	 */
	public String popedomquery() {
		ActionContext ac = ActionContext.getContext(); // 获取当前action的上下文
		Map<String,String[]> map = ac.getParameters(); 

		Map returnMap = this.doParamMap(map);
		if(this.getPageData() == null){
			PageData pageData = new PageData();
			pageData.setStart(0);
			pageData.setLimit(1000);
			this.setPageData(pageData);
		}
		QueryInfo queryInfo = new QueryInfo(this.getPageData(), (String)returnMap.get("domain"),
				(String)returnMap.get("query"), null);
		queryInfo.setWhereMap((Map)returnMap.get("where"));
		CotEmps currEmp = super.getCurrEmps();
		//非admin用户加入权限判断
		if(!"admin".equalsIgnoreCase(currEmp.getEmpsId())){
			String popedomUrl = super.getRequest().getParameter("popedomUrl");
			String popedomQueryId = super.getRequest().getParameter("popedomQueryId");
			if(StringUtils.isEmpty(popedomQueryId))
				popedomQueryId = "empsId";
			if(StringUtils.isNotEmpty(popedomUrl)){
				CotEmps emps = super.getCurrEmps();
				try {
					//加入数据权限判断
					Map<String,Object> popedomMap = super.getBaseSerivce().getPopedomWhereMap(popedomUrl, emps.getId());
					 String queryString = (String)returnMap.get("query");
					 queryString = queryString == null?"":queryString;
					 if("customer.do".equalsIgnoreCase(popedomUrl)){
						 queryString += " and ("+popedomQueryId+" in (select obj.custId from CotCustomerTrackemps obj where obj.empId in(:empIds)))";
					 }else{
						 queryString += " and ("+popedomQueryId+" in( :empIds) or "+popedomQueryId+" is null) "; 
					 }
					 //加入记录权限判断
					 //Map<String,Object> popedomRecordMap = super.getBaseSerivce().getPopedomRecordWhereMap(popedomUrl, emps.getId());
					 if(queryInfo.getWhereMap() == null){
						 queryInfo.setWhereMap(popedomMap);
					 }else {
						 queryInfo.getWhereMap().putAll(popedomMap);
					 }
//					 if(popedomMap != null){
//						 queryInfo.getWhereMap().putAll(popedomRecordMap);
//						 queryString += " or id in(:keyIds) ";
//					 }
					 queryInfo.setQueryString(queryString);
				} catch (ServiceException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		try {
			jsonString = this.getBaseSerivce().getJsonData(queryInfo);
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}

}
