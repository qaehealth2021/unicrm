/**
 * 
 */
package com.sail.cot.common.excel.entity;

import java.io.Serializable;

/**
 * <p>Title: 旗航不锈钢管理系统（QHERP）</p>
 * <p>Description:Excel导入的字段属性类，根据excel-import.xml来定义</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Oct 18, 2011 3:21:17 PM </p>
 * <p>Class Name: Importfield.java </p>
 * @author achui
 *
 */
public class Importfield implements Serializable{
	/*
	Excel 通用导入方法XML定义 
	table（必须）：存放数据库的表，用于表示要忘那张表插入数据
	convert_key:(选填)：覆盖关键字，true表示，根据该列的值来查询数据库空是否有记录存在，有的话覆盖，没有的话插入
		query_fields（选填）：覆盖记录的额外查询条件，必须是field的配置项，多个的时候，用“,”隔开
	domain-package(必须):定义在系统对象映射类所在的包
	field(必填)：存放要插入数据库的字段，改字段的值从Excel文件中读取,改域配置有一些属性如下
		can_null(选填):字段是否允许空值（在Excel中""和空格都认为是null）true或不填：允许为空,false：不允许为空
		default_value(选填):该字段的默认值，目前没办法实现日期类型，只能简单的数据类型
		relate_table(选填)：关联的数据库表（如果需要关联查询或插入其他表，需要填写该属性），
							一般用于，Excel写的是中文，而插入数据库的时候需要是ID
							（注意：要写成对象名，不能用数据库名，如：CotCompany,而不是cot_company）
		query_json(选填)：需要关联查询的或者插入的值，用json表示如：{flag=pjlb,delete_flag=Y}
		db_op(选填):数据库操作模式，目前有的值为
					query:查询（根据field的值查询出相关数据）
					insert：插入（更加field的值，插入数据库表）
		db_op_field(选填,多个列时用","隔开,插入时同时插入进多列,查询时用"or"):查询/插入的数据库字段（当db_op为query时）,插入到数据库的字段(（当db_op为insert时)
		return_field(选填):查询/插入结果的返回值,返回当中的某列，
						  可选值为----普通属性：如id，ele_id,注：数据库的字段
						  		----Obj.attr：Obj:Hibernate映射的对象，attr:对象的属性（对应于java的配置）
						  如果retun_field的值填为：Obj.attr的形式，
						  如CotFactory.id，表示该关联对象在hibernate中配置为一对多或多对多的模式，是一个对象
						  其中Obj表示hibernate映射的对象，attr表示该对象的一个属性
		注：以下3个auto字段必须同时出现的			  
		auto_gen_code:(选填)：是否需要自动生成编码(sequcenceService.getAllNo()的type参数)
		auto_gen_field:(选填)：需要自动编码的字段
		auto_gen_class:(选填)：进行自动编码的处理类（必须实现com.sail.cot.custinterface.SequeceService接口）
		--------------------------------------------------------------------------------------------
		rely_on(选填)：依赖项，表示改field字段依赖于配置的字段，用逗号隔开
		rely_mode(选填)：依赖模式，有两个取值：single和double，
						single表示单向依赖，即该field只依赖与rely_on配置的值
						double：双向依赖，即该field既依赖于rely_on，rely_on配置的值也依赖于该field
		rely_class(选填)：依赖想与该field之间需要处理的类，该类必须实现ExcelRelyOnBiz这个接口，
						  需要精确到包名如：com.achui.cot.class
		---------------------------------------------------------------------------------------------
		data_type(选填)：该字段的数据类型（默认为String类型）
		data_length(选填)：该字段的数据长度（如果不填，则默认不检验）
		check_class(选填)：该字段的校验类，必须实现IExcelCheck接口
		——————————————————————————————————————————————————————————————————————————————————————
		loginId-key(选填)：登录人
		identityId-key(选填)：全局标识
		addDate-key(选填)：创建日期
		*/
	
	private String domainPackage;
	
	private String defaultValue;
	
	private String relateTable;
	
	private String dbOp;
	
	private String dbOpField;
	
	private String returnField;
	
	private String relyOn;
	
	private String relyMode;
	
	private String relyClass;
	
	private String field;//xml配置参数配置的列
	
	private String dataType;
	
	private String checkClass;
	
	private String dataLength;
	
	private String fieldValue;//从Excel读取的对应field的值
	
	private int rowIndex; //发生该值的行索引
	
	private int cellIndex;//发生该值的列索引
	
	private String queryJson;
	
	private String autoGenCode;
	
	private String autoGenField;
	
	private String autoGenClass;
	
	private String canNull;
	
	private boolean isNull = true;
	
	private String returnValue;//returnField执行完后所对应的值

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public String getRelateTable() {
		return relateTable;
	}

	public void setRelateTable(String relateTable) {
		this.relateTable = relateTable;
	}

	public String getDbOp() {
		return dbOp;
	}

	public void setDbOp(String dbOp) {
		this.dbOp = dbOp;
	}

	public String getDbOpField() {
		return dbOpField;
	}

	public void setDbOpField(String dbOpField) {
		this.dbOpField = dbOpField;
	}

	public String getReturnField() {
		return returnField;
	}

	public void setReturnField(String returnField) {
		this.returnField = returnField;
	}

	public String getFieldValue() {
		return fieldValue;
	}

	public void setFieldValue(String fieldValue) {
		this.fieldValue = fieldValue;
	}

	public String getDomainPackage() {
		return domainPackage;
	}

	public void setDomainPackage(String domainPackage) {
		this.domainPackage = domainPackage;
	}
	
	public String getDomainClzz(){
		return this.getDomainPackage()+"."+this.getRelateTable();
	}

	public String getRelyOn() {
		return relyOn;
	}

	public void setRelyOn(String relyOn) {
		this.relyOn = relyOn;
	}

	public String getRelyMode() {
		return relyMode;
	}

	public void setRelyMode(String relyMode) {
		this.relyMode = relyMode;
	}

	public String getRelyClass() {
		return relyClass;
	}

	public void setRelyClass(String relyClass) {
		this.relyClass = relyClass;
	}

	public String getDataType() {
		return dataType;
	}

	public void setDataType(String dataType) {
		this.dataType = dataType;
	}

	public String getCheckClass() {
		return checkClass;
	}

	public void setCheckClass(String checkClass) {
		this.checkClass = checkClass;
	}

	public String getDataLength() {
		return dataLength;
	}

	public void setDataLength(String dataLength) {
		this.dataLength = dataLength;
	}

	public int getRowIndex() {
		return rowIndex;
	}

	public void setRowIndex(int rowIndex) {
		this.rowIndex = rowIndex;
	}

	public int getCellIndex() {
		return cellIndex;
	}

	public void setCellIndex(int cellIndex) {
		this.cellIndex = cellIndex;
	}

	public String getQueryJson() {
		return queryJson;
	}

	public void setQueryJson(String queryJson) {
		this.queryJson = queryJson;
	}

	public String getAutoGenCode() {
		return autoGenCode;
	}

	public void setAutoGenCode(String autoGenCode) {
		this.autoGenCode = autoGenCode;
	}

	public String getAutoGenField() {
		return autoGenField;
	}

	public void setAutoGenField(String autoGenField) {
		this.autoGenField = autoGenField;
	}

	public String getAutoGenClass() {
		return autoGenClass;
	}

	public void setAutoGenClass(String autoGenClass) {
		this.autoGenClass = autoGenClass;
	}

	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	public boolean isNull() {
		if(this.canNull == null || Boolean.parseBoolean(this.canNull))
			return true;
		return false;
	}

	public void setNull(boolean isNull) {
		this.isNull = isNull;
	}

	public String getCanNull() {
		return canNull;
	}

	public String getReturnValue() {
		return returnValue;
	}

	public void setReturnValue(String returnValue) {
		this.returnValue = returnValue;
	}
}
