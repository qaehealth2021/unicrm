/**
 * 
 */
package com.sail.cot.util;

import java.beans.PropertyDescriptor;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Map;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.text.StrTokenizer;

import com.sail.cot.common.util.StringUtil;
import com.sail.cot.domain.IdEntity;

/**
 * <p>Title: 旗航不锈钢管理系统（QHERP）</p>
 * <p>Description:类型转换，根据对象的属性将String值转为相应的类型</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Oct 25, 2011 5:48:51 PM </p>
 * <p>Class Name: ConvertTypeUtil.java </p>
 * @author achui
 *
 */
public class ConvertTypeUtil {
	private Object object;
	private Map propertyMap = null;
	public ConvertTypeUtil(Object object){
		this.object = object;
		try {
			propertyMap = PropertyUtils.describe(this.object);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	public Object getObject(){
		return this.object;
	}
	public  Object convert(String attr,String value){
		Object returnVal = null;
		if(StringUtils.isEmpty(value))return null;
		Class clzz = null;
		try{
			clzz = getClassByAttr(attr);
		}catch (Exception e) {
			e.printStackTrace();
			//如果内部引用的对象为空，就返回null
			return null;
		}
		if(clzz == null) return null;
		else if(clzz == Integer.class){
			returnVal = Integer.valueOf(value,10);
		}else if(clzz == String.class){
			returnVal = value;
		}else if(clzz == Short.class){
			returnVal = Short.valueOf(value,10);
		}else if(clzz == Float.class){
			returnVal = Float.valueOf(value);
		}else if(clzz == Double.class){
			returnVal = Double.valueOf(value);
		}else if(clzz == BigDecimal.class){
			returnVal = BigDecimal.valueOf(Double.valueOf(value));
		}else if(clzz == Long.class){
			returnVal = Long.valueOf(value,10);
		}else if(clzz == Date.class){
			returnVal = StringUtil.getSimpleDate(value);
		}else if(clzz == Byte.class){
			returnVal = Byte.valueOf(value,10);
		}else if(clzz == Timestamp.class){
			returnVal = StringUtil.getSimpleDate(value);
		}else if(clzz == boolean.class){
			returnVal = Boolean.valueOf(value);
		}
		return returnVal;
	}
	public Class getClassByAttr(String attr){
		StrTokenizer tokenizer = new StrTokenizer(attr,".");
		Class clzz = null;
		while(tokenizer.hasNext()){
			String attribute = tokenizer.nextToken();
			PropertyDescriptor descriptor;
			try {
				descriptor = PropertyUtils.getPropertyDescriptor(object, attribute);
				clzz = descriptor.getReadMethod().getReturnType();
				if(IdEntity.class.isAssignableFrom(clzz)){
					String aString = StringUtils.removeStart(attr, attribute+".");
					clzz = getClassByAttr(aString);
				}else {
					break;
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return clzz;
	}
}
