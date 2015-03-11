/**
 * 
 */
package com.sail.cot.common.dao.impl;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.text.SimpleDateFormat;

import net.sf.json.JSONObject;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.DateConverter;
import org.apache.commons.beanutils.converters.LongConverter;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.text.StrTokenizer;
import org.springframework.jdbc.core.RowMapper;

/**
 * <p>Title: 工艺品管理系统</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2008</p>
 * <p>Company: </p>
 * <p>Create Time: Oct 23, 2008 8:50:59 PM </p>
 * <p>Class Name: JdbcRowMapper.java </p>
 * @author achui
 *
 */
public class JdbcRowMapper implements RowMapper{

	/* (non-Javadoc)
	 * @see org.springframework.jdbc.core.RowMapper#mapRow(java.sql.ResultSet, int)
	 */
	private Class clzz;
	
	private SimpleDateFormat SpringDateCovertFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	//
	public JdbcRowMapper(Class clzz)
	{
		this.clzz = clzz;
	}
	public JdbcRowMapper(Class clzz,SimpleDateFormat df){
		this.clzz = clzz;
		this.SpringDateCovertFormat = df;
	}
	public Object mapRow(ResultSet rs, int index) throws SQLException {
		
		ResultSetMetaData meta =  rs.getMetaData();
		ConvertUtils.register(new DateConverter(null), java.util.Date.class);  //先将日期型进行转换
		//ConvertUtils.register(new SqlTimeConverter(), java.sql.Timestamp.class);  //先将日期型进行转换
		ConvertUtils.register(new LongConverter(null), Long.class); 
		try
		{
			Object obj = null;
			if(clzz != null){
				obj = clzz.newInstance();
			}else{
				obj = new JSONObject();
			}
			for(int i=1; i<= meta.getColumnCount(); i++){
				String colName = meta.getColumnName(i);
				StrTokenizer tokenizer = new StrTokenizer(colName,"_");
				//第一个单词不作处理
				String col = tokenizer.nextToken();
				col = col.toLowerCase();
				while(tokenizer.hasNext()){
					String str = tokenizer.nextToken().toLowerCase();
					col += StringUtils.capitalize(str);
				}
				Object val = rs.getObject(colName);
				if(this.clzz != null)
					BeanUtils.setProperty(obj, col, val);
				else {
					((JSONObject)obj).put(colName, val);
				}
			}
			return obj;
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
		}
		return null;
		
		
	}
	
}
