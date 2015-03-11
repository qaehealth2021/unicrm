/**
 * 
 */
package com.sail.cot.util;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import org.apache.commons.lang.ArrayUtils;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:获取注解的属性</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Feb 17, 2012 3:14:13 PM </p>
 * <p>Class Name: AnnotationUtil.java </p>
 * @author achui
 *
 */
public class AnnotationUtil {

	private static Map<String,String> map = null;
	private static Map<String, Class> mapClass = null;//映射属性的类型
	public static Map<String, String> getColumnAnnotation(Class clzz){
		if(map != null) return map;
		map = new HashMap<String, String>();
		mapClass = new HashMap<String, Class>();
		Field[] childFields = clzz.getDeclaredFields();
		Field[] parentFields = clzz.getSuperclass().getDeclaredFields();
		Field[] fields = (Field[])ArrayUtils.addAll(childFields,parentFields);
		for(Field field : fields){
			Column column = field.getAnnotation(Column.class);
			if(column == null){
				JoinColumn joinColumn = field.getAnnotation(JoinColumn.class);
				map.put(field.getName().toLowerCase(), joinColumn.name());
				mapClass.put(field.getName().toLowerCase(), Integer.class);
			}else {
				map.put(field.getName().toLowerCase(), column.name());
				mapClass.put(field.getName().toLowerCase(), field.getType());
			}
		}
		return map;
	}
	
	/**
	 * @see 功能描述（必填）：获取指定属性的注解的值
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Feb 17, 2012 3:20:33 PM</p>
	 * @param clzz
	 * @param attr
	 * @param annotationClass
	 * @return
	 * 返回值：String
	 */
	public static String getAnnotationValue(Class clzz,String attr){
		Map<String, String> map = getColumnAnnotation(clzz);
		return map.get(attr.toLowerCase());
	}
	
	/**
	 * @see 功能描述（必填）：指定属性的数据类型
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Feb 18, 2012 10:05:52 AM</p>
	 * @param clzz
	 * @param attr
	 * @return
	 * 返回值：Class
	 */
	public static Class getAnnotationClass(Class clzz,String attr){
		Map<String, String> map = getColumnAnnotation(clzz);
		return mapClass.get(attr.toLowerCase());
	}
	
	/**
	 * 
	 * @see 功能描述（必填）：通过domain类名获得数据库表名
	 * <p>返回值：String</p>
	 * @see <p>Author:azan</p>
	 * @see <p>Create Time:2012-3-1 上午11:49:51</p>
	 * @param clzz
	 * @return
	 */
	public static String getAnnotationTable(Class clzz){
		Table table=(Table)clzz.getAnnotation(Table.class);
		return table.name();
	}
	
	/**
	 * 
	 * @see 功能描述（必填）：获得clzz属性名为attr的类型
	 * <p>返回值：Class</p>
	 * @see <p>Author:azan</p>
	 * @see <p>Create Time:2012-4-18 下午4:49:57</p>
	 * @param clzz
	 * @param attr
	 * @return
	 */
	public static Class getAnnotationMyType(Class clzz,String attr){
		Field[] childFields = clzz.getDeclaredFields();
		Field[] parentFields = clzz.getSuperclass().getDeclaredFields();
		Field[] fields = (Field[])ArrayUtils.addAll(childFields,parentFields);
		Class temp=null;
		for(Field field : fields){
			if(field.getName().equals(attr)){
				temp= field.getType();
				break;
			}
		}
		return temp;
	}
}
