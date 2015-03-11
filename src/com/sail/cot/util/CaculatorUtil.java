/**
 * 
 */
package com.sail.cot.util;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import org.apache.commons.lang.StringUtils;

import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.util.StringUtil;

/**
 * <p>Title: 旗航不锈钢管理系统（QHERP）</p>
 * <p>Description:公式计算工具</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Mar 18, 2011 9:06:03 AM </p>
 * <p>Class Name: CaculatorUtil.java </p>
 * @author achui
 *
 */
public class CaculatorUtil {

	/**
	 * 描述： 公式计算
	 * @param express 公式表达式
	 * @param params  公式中需要用到的参数
	 * @return 计算的结果
	 * 返回值：Object
	 */
	public static Object eval(String express,Map params){
		ScriptEngineManager manager = new ScriptEngineManager();
		ScriptEngine engine = manager.getEngineByName("javascript");
		if(StringUtils.isEmpty(express)) return null;
		Iterator iterator = params.keySet().iterator();
		while(iterator.hasNext()){
			String key = (String)iterator.next();
			express = express.replace(key, params.get(key).toString());
			//engine.put(key, params.get(key));
		}
		Object obj = null;
		try {
			obj = engine.eval(express);
		} catch (ScriptException e) {
			e.printStackTrace();
		}
		return obj;
	}
	
	public static Object eval(String express) throws ServiceException{
		ScriptEngineManager manager = new ScriptEngineManager();
		ScriptEngine engine = manager.getEngineByName("javascript");
		if(StringUtils.isEmpty(express)) return null;
		Object obj = null;
		try {
			obj = engine.eval(express);
		} catch (ScriptException e) {
			throw new ServiceException("公式计算异常",e);
		}
		return obj;
	}
	
	/**
	 * 描述：解析计算表达式，计算出表达是里面有多少个参数,通过参数beginToken，和endToken，进行解析
	 * @param express 如："100*${a}+120/${b}"
	 * @param beginToken 包含字符串参数的左闭包 如："${"
	 * @param endToken 包含字符串参数的右闭包 如："}"
	 * @return 返回一个参数字符串，用|隔开
	 * 返回值：String
	 */
	public static String paserExpress2ParamList(String express,String beginToken,String endToken){
		String[] strs = StringUtil.stringsBetween(express, beginToken, endToken);
		String param = "";
		for(String str: strs){
			param += beginToken+str+endToken + "|";
		}
		if(StringUtils.isEmpty(param)) return null;
		
		return param.substring(0,param.length()-1);
	}
	
	public static String paserExpress2BaseParamList(String express){
		return paserExpress2ParamList(express,"${","}");
	}
	/**
	 * 描述：解析计算表达式，计算出表达是里面有多少个参数,通过参数beginToken，和endToken，进行解析
	 * @param express 如："100*${a}+120/${b}"
	 * @param beginToken 包含字符串参数的左闭包 如："${"
	 * @param endToken 包含字符串参数的右闭包 如："}"
	 * @return 一个map，key为公式包含的参数，value：属性
	 * 返回值：String
	 */
	public static Map paserExpress2MapParam(String express,String beginToken,String endToken){
		String[] strs = StringUtil.stringsBetween(express, beginToken, endToken);
		Map<String,Object> map = new HashMap<String, Object>();
		for(String str: strs){
			map.put(beginToken+str+endToken, str);
		}
		if(map.isEmpty()) return null;
		
		return map;
	}
	public static Map paserExpress2BaseMapParam(String express){
		return paserExpress2MapParam(express,"${","}");
	}
	
	public static void main(String[] args){
		String express = "#{boxObL}*#{boxObW}*#{boxObH}";
		Map map = new HashMap();
		map.put("${a}", "2");
		Double val = (Double)CaculatorUtil.eval(express, map);
		System.out.println("val:"+val);
	}
}
