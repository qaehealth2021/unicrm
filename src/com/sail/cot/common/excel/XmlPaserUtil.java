/**
 * 
 */
package com.sail.cot.common.excel;

import java.lang.reflect.InvocationTargetException;
import java.net.URL;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.beanutils.BeanUtils;
import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.sail.cot.common.excel.entity.ConvertKey;
import com.sail.cot.common.excel.entity.ExcelImportEntity;
import com.sail.cot.common.excel.entity.Importfield;
import com.sail.cot.common.util.StringUtil;

/**
 * <p>
 * Title: 旗航不锈钢管理系统（QHERP）
 * </p>
 * <p>
 * Description:XML解析工具类
 * </p>
 * <p>
 * Copyright: Copyright (c) 2011
 * </p>
 * <p>
 * Company: 厦门市旗航软件有限公司
 * </p>
 * <p>
 * Create Time: Oct 18, 2011 3:53:19 PM
 * </p>
 * <p>
 * Class Name: XmlPaser.java
 * </p>
 * 
 * @author achui
 * 
 */
public class XmlPaserUtil {

	public static ExcelImportEntity paserXML(URL xmlFilePath) {
		SAXReader reader = new SAXReader();
		ExcelImportEntity entity = new ExcelImportEntity();
		try {
			Document document = reader.read(xmlFilePath);
			Element root = document.getRootElement();
			// 处理xml文件的table节点
			Element element = root.element("table");
			entity.setTable(StringUtil.convert2JavaBeanName(
					element.getTextTrim(), true));
			// 处理xml文件的domain-package
			element = root.element("domain-package");
			String domainPackage = element.getTextTrim();
			entity.setDomainPackage(domainPackage);
			// 处理xml文件的convet-key
			element = root.element("convert-key");
			String convertKey = StringUtil.convert2JavaBeanName(element.getTextTrim(), false);
			ConvertKey convert = new ConvertKey();
			convert.setCovertKey(convertKey);
			entity.setConvertKey(paserField(convert,element.attributes()));
			// 处理xml文件的loginId-key
			element = root.element("loginId-key");
			if (element != null) {
				String loginIdKey = element.getTextTrim();
				entity.setLoginIdKey(loginIdKey);
			}
			// 处理xml文件的identityId-key
			element = root.element("identityId-key");
			if (element != null) {
				String identityIdKey = element.getTextTrim();
				entity.setIdentityIdKey(identityIdKey);
			}
			// 处理xml文件的addDate-key
			element = root.element("addDate-key");
			if (element != null) {
				String addDateKey = element.getTextTrim();
				entity.setAddDateKey(addDateKey);
			}

			// 处理xml文件的field-set节点
			element = root.element("field-set");
			Iterator iterator = element.elementIterator("field");
			Set<Importfield> fieldSet = new HashSet<Importfield>();
			Map<String, Importfield> fieldCfgMap = new HashMap<String, Importfield>();
			while (iterator.hasNext()) {
				Importfield importfield = new Importfield();
				Element field = (Element) iterator.next();
				String mapField = StringUtil.convert2JavaBeanName(
						field.getTextTrim(), false);
				importfield.setField(mapField);
				importfield.setDomainPackage(domainPackage);
				paserField(importfield, field.attributes());
				fieldCfgMap.put(mapField, importfield);
			}
			entity.setFieldCfgMap(fieldCfgMap);
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return entity;
	}

	/**
	 * @see 功能描述（必填）：将XML文件中，field的字段属性解析赋予importField对象
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @param importField
	 *            ：
	 * @param attributeList
	 *            ：field节点中含有的属性列表
	 * @return 返回值：Importfield Author:achui Create Time:Oct 18, 2011 4:52:44 PM
	 */
	public static Importfield paserField(Importfield importField,
			List<Attribute> attributeList) {
		if (attributeList == null || attributeList.size() == 0)
			return importField;
		for (Attribute attribute : attributeList) {
			String attrName = StringUtil.convert2JavaBeanName(
					attribute.getName(), false);// 获取Attribute的name：如db_op,relate_table等
			String attrValue = StringUtil.convert2JavaBeanName(
					attribute.getValue(), false);
			// if(!attrName.equals("queryJson")){
			//
			// }else {
			// attrValue = attribute.getValue();
			// }
			try {
				BeanUtils.setProperty(importField, attrName, attrValue);
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				e.printStackTrace();
			}
		}
		return importField;
	}
	
	public static ConvertKey paserField(ConvertKey convertKey,
			List<Attribute> attributeList) {
		if (attributeList == null || attributeList.size() == 0)
			return convertKey;
		for (Attribute attribute : attributeList) {
			String attrName = StringUtil.convert2JavaBeanName(
					attribute.getName(), false);// 获取Attribute的name：如db_op,relate_table等
			String attrValue = StringUtil.convert2JavaBeanName(
					attribute.getValue(), false);
			// if(!attrName.equals("queryJson")){
			//
			// }else {
			// attrValue = attribute.getValue();
			// }
			try {
				BeanUtils.setProperty(convertKey, attrName, attrValue);
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				e.printStackTrace();
			}
		}
		return convertKey;
	}

}
