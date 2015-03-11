/**
 * 
 */
package com.sail.imp.excel;

import java.util.List;

import org.apache.commons.beanutils.BeanUtils;

import com.sail.cot.common.service.BaseSerivce;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.query.QueryInfo;

/**
 * <p>Title: 旗航ERP管理系统（QHERP）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2010</p>
 * <p>Company: </p>
 * <p>Create Time: Feb 28, 2011 4:22:56 PM </p>
 * <p>Class Name: ImpIdField.java </p>
 * @author achui
 *
 */
public class ImpIdField extends ImpBaseField{
	private BaseSerivce baseService = (BaseSerivce)ContextUtil.getBean("baseService");
	/**
	 * idSource的主键
	 */
	private String idProperty;
	/**
	 * 获取关联ID的对象
	 */
	private String idSource;
	
	private String sourceProperty;

	public String getSourceProperty() {
		return sourceProperty;
	}

	public void setSourceProperty(String sourceProperty) {
		this.sourceProperty = sourceProperty;
	}

	public String getIdProperty() {
		return idProperty;
	}

	public void setIdProperty(String idProperty) {
		this.idProperty = idProperty;
	}

	public String getIdSource() {
		return idSource;
	}

	public void setIdSource(String idSource) {
		this.idSource = idSource;
	}

	private String getId(String value) {
		String id = null;
		QueryInfo queryInfo = new QueryInfo();
		String sql = " from "+this.idSource+" obj where obj."+this.sourceProperty+" = '"+value+"'";
		queryInfo.setSelectString(sql);
		queryInfo.setOrderString("");
		queryInfo.setQueryString("");
		try {
			List list = baseService.findRecords(queryInfo);
			//存在记录
			if(list != null && list.size() > 0){
				Object object = list.get(0);
				id = BeanUtils.getProperty(object, this.idProperty);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return id;
	}

	public void saveAndgetId(String value) {
		String id = this.getId(value);
		if(id == null){
			//数据库中不存在，插入，并返回ID
			try {
				Class clzz = Class.forName("com.sail.cot.domain."+this.idSource);
				Object object = clzz.newInstance();
				BeanUtils.setProperty(object, this.sourceProperty, value);
				//插入数据库
				baseService.addObj(object);
				id = BeanUtils.getProperty(object, this.idProperty);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		//重置父类的ID
		super.setValue(id);
		//return id;
	}
	
}
