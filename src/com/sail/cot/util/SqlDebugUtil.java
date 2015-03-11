/**
 * 
 */
package com.sail.cot.util;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.sail.cot.query.QueryInfo;

/**
 * <p>Title: 旗航不锈钢管理系统（QHERP）</p>
 * <p>Description:调试SQL语句的小工具</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Oct 28, 2011 2:33:46 PM </p>
 * <p>Class Name: SqlDebugUtil.java </p>
 * @author achui
 *
 */
public class SqlDebugUtil {

	/**
	 * @see 功能描述（必填）：生成SQL调试语句，用于分析调试使用（主要用于select）
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 28, 2011 2:36:13 PM</p>
	 * @param queryInfo
	 * @return
	 * 返回值：String
	 */
	public static String genSql(QueryInfo queryInfo){
		String hql = queryInfo.getSelectString();
		if(!StringUtils.isEmpty(queryInfo.getQueryString())){
			hql += " "+queryInfo .getQueryString();
		}
		if(!StringUtils.isEmpty(queryInfo.getOrderString())){
			hql += " "+queryInfo.getOrderString();
		}
		//如果没有带whereMap属性，则认为是普通的SQL查询，直接打印出来即可
		Map<String,Object> whereMap = queryInfo.getWhereMap();
		//hql = genSql(hql,null, whereMap);
		return  genSql(hql,null, whereMap);
	}
	
	/**
	 * @see 功能描述（必填）：生成SQL调试语句，用于分析调试使用(主要用于update，select)
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 28, 2011 3:06:32 PM</p>
	 * @param hql
	 * @param whereMap
	 * @return
	 * 返回值：String
	 */
	public static String genSql(String hql,Map<String,Object> valueMap,Map<String, Object> whereMap){
		//处理值，主要用于update语句
		if (valueMap != null && !valueMap.isEmpty()){
			Iterator<String> iterator = valueMap.keySet().iterator();
			while(iterator.hasNext()){
				String key = iterator.next();
				Object value = valueMap.get(key);
				hql = hql.replace(":"+key, "'"+String.valueOf(value)+"'");
			}
		}
		//处理where条件
		if (whereMap != null && !whereMap.isEmpty()) {
			Iterator<String> iterator = whereMap.keySet().iterator();
			while(iterator.hasNext()){
				String key = iterator.next();
				Object value = whereMap.get(key);
				if(value instanceof List){
					hql = hql.replace(":"+key, paserList((List)value));
				}else{
					hql = hql.replace(":"+key, "'"+String.valueOf(value)+"'");
				}
			}
		}
		return hql;
	}
	/**
	 * @see 功能描述（必填）：生成SQL调试语句，用于分析调试使用
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 28, 2011 3:13:02 PM</p>
	 * @param hql
	 * @param whereMap
	 * @return
	 * 返回值：String
	 */
	public static String genSql(String hql,Map<String, Object> whereMap){
		return genSql(hql,null,whereMap);
	}
	private static String paserList(List list){
		String res = "";
		for(int i=0; i<list.size(); i++){
			String val = String.valueOf(list.get(i));
			res += "'"+val+"'";
			if(i < list.size() - 1)
				res += ",";
		}
		return res;
	}
}
