package com.sail.cot.util;

import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONNull;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.processors.DefaultValueProcessor;
import net.sf.json.processors.JsDateJsonBeanProcessor;
import net.sf.json.util.PropertyFilter;

/**
 * @author fins
 * 
 */
public class GridServerHandler {

	public static String CONTENTTYPE = "text/html; charset=UTF-8";
	public static String GT_JSON_NAME = "_gt_json";
	public static String DATA_ROOT = "data";
		
		private String exception;

		private List data;
		private String recordType;
		private String encoding=null;
		
		private boolean success;
		
		private JSONObject jsonObject;
		
		private JSONArray jsonData =null;
		
		private int totalCount = 0;
		private String[] exclude = null;
		
		private  JsonConfig config = new JsonConfig();
		
		public int getTotalCount() {
			return totalCount;
		}

		public void setTotalCount(int totalCount) {
			this.totalCount = totalCount;
		}

		public GridServerHandler(){
			JsDateJsonBeanProcessor beanProcessor = new JsDateJsonBeanProcessor();
			config.registerJsonBeanProcessor(java.sql.Date.class, beanProcessor);
			config.registerDefaultValueProcessor(Long.class,  
		        new DefaultValueProcessor() {  
		            public Object getDefaultValue(Class type) {  
		                return JSONNull.getInstance();  
		            }  
			});  
			config.setJsonPropertyFilter(new JsonPropertyFilter());
		}
		
		public GridServerHandler(String[] excludes){
			JsDateJsonBeanProcessor beanProcessor = new JsDateJsonBeanProcessor();
			config.registerJsonBeanProcessor(java.sql.Date.class, beanProcessor);
			config.registerDefaultValueProcessor(Long.class,  
			        new DefaultValueProcessor() {  
			            public Object getDefaultValue(Class type) {  
			                return null;  
			            }  
				}); 
			//过滤某些属性，不生成json数据
			
			config.setExcludes(excludes);
			config.setJsonPropertyFilter(new JsonPropertyFilter());
		}

		public String getSaveResponseText(){
			JSONObject json=new JSONObject();
			try {
				json.put("success", success);
				json.put("exception", exception);
			} catch (JSONException e) {
				//LogHandler.error(this,e);
			}
			return json.toString();
		}
		
		public JSONObject getLoadResponseJSON(){
			JSONObject json=new JSONObject();
			try {
				json.put(DATA_ROOT, jsonData);
				json.put("totalCount", this.getTotalCount());
				json.put("exception", exception);
				json = JSONObject.fromObject(json, config);
			} catch (JSONException e) {
				//LogHandler.error(this,e);
			}
			return json;
		}
		public String getLoadResponseText(){
			JSONObject json=getLoadResponseJSON();
			String jstr=json==null?"":json.toString();
//			System.out.println("AJAX OUT:"+jstr);
			return jstr;
		}
		public String getLoadDataText(){
			if(jsonData == null)
				return null;
			JSONArray json = JSONArray.fromObject(jsonData, config);
			String jstr = json.toString();
//			System.out.println("AJAX OUT:"+jstr);
			return jstr;
		}
	

		public void setData(List data) {
			this.data = data;
			setJsonData(JSONArray.fromObject(data,config));
			
		}

		public String getException() {
			return exception;
		}

		public void setException(String exception) {
			this.exception = exception;
		}

		
		public List getData() {
			return data;
		}

		public String getRecordType() {
			return recordType;
		}


		public boolean isSuccess() {
			return success;
		}

		public void setSuccess(boolean success) {
			this.success = success;
		}

		public JSONObject getJsonObject() {
			return jsonObject;
		}
		public void setJsonObject(JSONObject jsonObject) {
			this.jsonObject = jsonObject;
		}
		public JSONArray getJsonData() {
			return jsonData;
		}
		public void setJsonData(JSONArray jsonData) {
			this.jsonData = jsonData;
		}

		public String getEncoding() {
			return encoding;
		}

		public void setEncoding(String encoding) {
			this.encoding = encoding;
		}
			
	//处理Hibernate的lazy集合的数据
	class  JsonPropertyFilter implements PropertyFilter{
		public boolean apply(Object source, String name, Object value) {
			//转JSON时，如果是预处理的集合就不转为json，避免jsonlib递归调用
				if(value != null){
					if(value.getClass().getSimpleName().equals("PersistentSet")){
						return true;
					}
				}
				return false;
			}
		}
}
