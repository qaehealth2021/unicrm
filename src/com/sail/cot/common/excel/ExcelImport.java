/**
 * 
 */
package com.sail.cot.common.excel;

import java.beans.PropertyDescriptor;
import java.io.File;
import java.io.FileInputStream;
import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.sf.json.JSONObject;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;

import com.sail.cot.common.excel.check.IExcelCheck;
import com.sail.cot.common.excel.entity.ConvertKey;
import com.sail.cot.common.excel.entity.ExcelImportEntity;
import com.sail.cot.common.excel.entity.Importfield;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.service.BaseSerivce;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.common.util.StringUtil;
import com.sail.cot.custinterface.SequeceService;
import com.sail.cot.service.BaseData;

/**
 * <p>Title: 旗航不锈钢管理系统（QHERP）</p>
 * <p>Description:Excel导入操作</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Oct 18, 2011 5:27:16 PM </p>
 * <p>Class Name: ExcelImport.java </p>
 * @author achui
 *
 */
@SuppressWarnings("unchecked")
public class ExcelImport {
	
	private BaseSerivce baseSerivce;
	
	private BaseData baseData;
	/**
	 * String 配置文件的数据操作类型
	 */
	private final static String DB_OP_QUERY = "query";
	
	private final static String DB_OP_INSERT = "insert";
	
	/**
	 * int EXCEL表数据从第几行开始读取
	 */
	private final static int CAL_EXCEL_DATA_ROW = 2;
	
	/**
	 * int EXCEL表头数据，即数据库对应的字段的那一行
	 */
	private final static int CAL_EXCEL_TITLE_ROW = 1;
	
	/**
	 * 覆盖操作
	 */
	public final int CONVERT_ONLY = 1;
	/**
	 * 新增操作
	 */
	public final int ADD_ONLY = 0;
	
	/**
	 * 覆盖+新增
	 */
	public final int CONVET_AND_ADD = 9;
	
	//成功导入条数
	private int SUCCESS_NUM = 0;
	//失败条数
	private int FAIL_NUM = 0;
	//跳过条数
	private int CROSS_NUM = 0;
	//覆盖条数
	private int COVER_NUM = 0;
	
	public void setBaseSerivce(BaseSerivce baseSerivce) {
		this.baseSerivce = baseSerivce;
	}
	public void setBaseData(BaseData baseData) {
		this.baseData = baseData;
	}
	/**
	 * @see 功能描述（必填）：针对xml中field的db_op = query的字段进行操作，把得到的值付给Object对象
	 * @see 处理流程（选填）：<p>1、根据db_op_field的值查询relate_table所指定的表，在根据return_field获取返回值<p>
	 * 					   <p>2、把返回值赋值给entity的相应属性<p>
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @param entity：需要负责的对象，一般是根据xml文件中与table节点对应的对象
	 * @param field：该字段的一些配置
	 * 返回值：boolean:如果设置成功，返回true，如果没有记录，返回false
	 * Author:achui
	 * Create Time:Oct 18, 2011 5:40:15 PM
	 */
	public boolean dbOpQuery(Object entity,Importfield field) throws ServiceException{
		String relateTable = field.getRelateTable();//需要查询表
		String returnField = field.getReturnField();//需要返回字段
		String value = field.getFieldValue();//需要查询的值
		String relateField = field.getDbOpField();//需要查询的列(如果有多个,用","隔开)
		String queryJson = field.getQueryJson();
		String[] relateFields=relateField.split(",");
		String hql = " from "+relateTable+" where (";
		for (int i = 0; i < relateFields.length; i++) {
			hql+=relateFields[i] + "= '"+value+"' or ";
		}
		hql=hql.substring(0, hql.length()-4)+")";
		if(StringUtils.isNotEmpty(queryJson)){
			JSONObject jsObject = JSONObject.fromObject(queryJson);
			Set<Map.Entry<String, Object>> set = jsObject.entrySet();
			for(Map.Entry<String,Object> entry : set){
				String key = entry.getKey();
				String queryValue = entry.getValue().toString();
				hql += " and "+key+"='"+queryValue+"' ";
			}
		}
		//查询关联记录记录
		List list = this.baseSerivce.findRecordByHql(hql);
		if(list == null || list.size() == 0){
			
			return false;
		} 
		Object obj = list.get(0);
		try {
			//TODO:
			String returnValue = null;//BeanUtils.getProperty(obj, returnField);
			//如果returnValue的形式为obj.attr，obj为对象的属性即子对象，attr为子对象的属性
			//通过obj获取子对象的类型，在实例化子对象，然后将attr赋予子对象，最后在赋予福对象
			if(returnField.indexOf(".") > -1){
				String strSubObj = returnField.substring(0,returnField.indexOf("."));
				PropertyDescriptor descriptor = PropertyUtils.getPropertyDescriptor(entity, strSubObj);
				Class clzz = descriptor.getReadMethod().getReturnType();
				try {
					Object subOjb = clzz.newInstance();
					BeanUtils.setProperty(entity, strSubObj, subOjb);
					returnValue =  BeanUtils.getProperty(obj, returnField.substring(returnField.indexOf(".")+1));
					BeanUtils.setProperty(entity, returnField, returnValue);
					field.setReturnValue(returnValue);
				} catch (InstantiationException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}else {
				returnValue = BeanUtils.getProperty(obj, returnField);
				field.setReturnValue(returnValue);
				BeanUtils.setProperty(entity, field.getField(), returnValue);
			}
			
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		}
		return true;
	}
	/**
	 * @see 功能描述（必填）：针对xml中field的db_op = query的字段进行操作，把得到的值付给Object对象
	 * @see 处理流程（选填）：<p>1、根据db_op_field的值查询relate_table所指定的表</p>
	 * 							<p>（1）如果有记录，则根据return_field获取返回值</p>
	 * 							<p>（2）如果没有记录，则将该记录插入对应的relate_table中，在根据return_field获取返回值</p>
	 * 					   <p>2、把返回值赋值给entity的相应属性</p>
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 18, 2011 5:40:15 PM</p>
	 * @param entity：需要负责的对象，一般是根据xml文件中与table节点对应的对象
	 * @param field：该字段的一些配置
	 * 返回值：void
	 */
	public void dbOpInsert(Object entity,Importfield field)throws ServiceException{
		boolean isExist = false;//数据库是否存在记录
		//空值就不插入
		if(StringUtils.isEmpty(field.getFieldValue())) return ;
		isExist = dbOpQuery(entity, field);
		if(isExist)  return;
		//做数据库保存操作
		//String relateTable = field.getRelateTable();//需要查询表
		String returnField = field.getReturnField();//需要返回字段
		String value = field.getFieldValue();//需要查询的值
		String relateField = field.getDbOpField();//需要查询的列
		String[] relateFields=relateField.split(",");
		String queryJson = field.getQueryJson();
		try {
			//声明relateTable定义的对象对象
			Class clzz = Class.forName(field.getDomainClzz());
			Object inserObj = clzz.newInstance();
			//将db_op_field的属性设置值，值为Excel表中，field配置项的值
			for (int i = 0; i < relateFields.length; i++) {
				BeanUtils.setProperty(inserObj, relateFields[i], value);
			}
			//设置条件
			if(StringUtils.isNotEmpty(queryJson)){
				JSONObject jsObject = JSONObject.fromObject(queryJson);
				Set<Map.Entry<String, Object>> set = jsObject.entrySet();
				for(Map.Entry<String,Object> entry : set){
					String key = entry.getKey();
					String queryValue = entry.getValue().toString();
					BeanUtils.setProperty(inserObj, key, queryValue);
				}
			}
			//设置自动编码
			if(StringUtils.isNotEmpty(field.getAutoGenCode())){
				Class autoGenClzz = Class.forName(field.getAutoGenClass());
				SequeceService sequeceService = (SequeceService)autoGenClzz.newInstance();
				String autoCode = sequeceService.getAllNo(inserObj, field.getAutoGenCode(), null,null);
				BeanUtils.setProperty(inserObj, field.getAutoGenField(), autoCode);
				sequeceService.saveSeq(field.getAutoGenCode());
			}
			this.baseSerivce.addObj(inserObj);
			//设置entity对象的值
			if(returnField.indexOf(".") > -1){
				//是子对象
				String strSubObj = returnField.substring(0,returnField.indexOf("."));
				BeanUtils.setProperty(entity,strSubObj, inserObj);
			}else{
				String returnValue = BeanUtils.getProperty(inserObj, returnField.substring(returnField.indexOf(".")+1));
				BeanUtils.setProperty(entity,field.getField(), returnValue);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * @see 功能描述（必填）：处理Excel表格中相关的依赖性
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 20, 2011 2:52:27 PM</p>
	 * @param entity
	 * @param field
	 * 返回值：void
	 */
	public void doRelyOn(Object entity,Importfield field,Map<String,Importfield> fieldCfgMap)throws Exception{
		String fieldValue = field.getFieldValue();
		if(!StringUtils.isEmpty(fieldValue)) return ;
		Class clzz = Class.forName(field.getRelyClass());
		ExcelRelyOnBiz biz = (ExcelRelyOnBiz)clzz.newInstance(); 
		Object value = biz.doRelyBiz(field, fieldCfgMap);
		//设置计算后的值
		BeanUtils.setProperty(entity, field.getField(), value);
	}
	
	/**
	 * 
	 * @see 功能描述（必填）：初始化系统默认配置和制单人,制单时间和全局标识
	 * <p>返回值：void</p>
	 * @see <p>Author:azan</p>
	 * @see <p>Create Time:2012-4-24 上午10:23:04</p>
	 * @param excelEntity
	 * @param insertObj
	 * @throws Exception
	 */
	private void setSystemCfgToObj(ExcelImportEntity excelEntity,Object insertObj) throws Exception{
//		Object[] obj=this.baseData.getSessionByDwr();
//		if(excelEntity.getLoginIdKey()!=null){
//			String loginKey = StringUtil.convert2JavaBeanName(excelEntity.getLoginIdKey(), false);
//			CotEmps cotEmps =(CotEmps)obj[0];
//			BeanUtils.setProperty(insertObj, loginKey,cotEmps.getId());
//		}
//		if(excelEntity.getIdentityIdKey()!=null){
//			String identityIdKey = StringUtil.convert2JavaBeanName(excelEntity.getIdentityIdKey(), false);
//			BeanUtils.setProperty(insertObj, identityIdKey,(Integer)obj[1]);
//		}
//		if(excelEntity.getAddDateKey()!=null){
//			String addDateKey = StringUtil.convert2JavaBeanName(excelEntity.getAddDateKey(), false);			
//			BeanUtils.setProperty(insertObj, addDateKey,new java.util.Date());
//		}
		//this.cotSystemCfgService.setCfgToObj(excelEntity.getTable(), (Integer)obj[1], insertObj);
	}
	
	/**
	 * @see 功能描述（必填）：将Excel数据导入到数据库中
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 19, 2011 10:35:47 AM</p>
	 * @param excelPath
	 * @param convert：是否需要覆盖记录，true：返回数据库查询的记录，false：声明一个clzz对应的对象
	 * @param flag:0:返回数据库的记录，1：返回一个
	 * @param checkMsgList：验证不通过的消息列表，也是一个返回值
	 * 返回值：void
	 * @throws Exception 
	 */
	public List getListFromExcel(String excelPath,String xmlClassPath, int flag,List<String> checkMsgList) throws Exception{
		List list = new ArrayList();
		List<String> crossList =  new ArrayList<String>();
		URL xmlFilePath = ExcelImport.class.getResource(xmlClassPath);
		ExcelImportEntity excelEntity = XmlPaserUtil.paserXML(xmlFilePath);
		Map<String, Importfield> fieldCfgMap = excelEntity.getFieldCfgMap();
		//防止报异常 a different object with the same identifier value was already associated with the session
		//包查到的数据库存在的ID保存起来用于过滤数据
		Map<Integer,Integer> existIdMap = new HashMap<Integer, Integer>();
		//获取，每行，每个列的配置值
		List<Map<String,Importfield>> listData = getExcelData(excelPath,fieldCfgMap);
		//遍历数组，生成对象进行保存
		//一个list里面的每个Map，存放着Excel中，每条记录对应的所有列的值和列的XML配置
		for(Map<String,Importfield> fieldMap : listData){
			Class clzz = Class.forName(excelEntity.getDomainClzz());
			boolean isChecked = true;
			//生成需要保存的对象
			String convertKey = excelEntity.getConvertKey().getCovertKey();
			//BUG：当有多条重复记录是，会执行多次，导致list里面有重复记录
			//可能会存在查到重复记录的情况，然后多次添加
			//报异常 a different object with the same identifier value was already associated with the session
			List insertObjList = getInitObject(fieldMap,excelEntity.getConvertKey(),clzz);
			for(Object insertObj : insertObjList){
				Iterator<String> iterator = fieldMap.keySet().iterator();
				String id1 = BeanUtils.getProperty(insertObj, "id");
				//azan修改开始 2012/4/24----
				//新增的时候,需要初始化默认配置
				if(id1==null)
					this.setSystemCfgToObj(excelEntity,insertObj);
				//azan修改结束 2012/4/24----
				//遍历所有列，根据配置做操作
				while(iterator.hasNext()){
					String key = iterator.next();
					Importfield field = fieldMap.get(key);
					//TODO:添加验证判断
					Map<String, String> msgMap = new HashMap<String, String>();//反馈消息
					if(!checkField(field, msgMap)){
						checkMsgList.add(msgMap.get("msg"));
						isChecked = false;//验证不通过
						continue;
					}
					if(isChecked){
						//验证通过才做后面操作
						if(field.getDbOp() != null) {
							if(field.getDbOp().equals(DB_OP_QUERY))
								dbOpQuery(insertObj, field);
							else if (field.getDbOp().equals(DB_OP_INSERT))
								dbOpInsert(insertObj, field);
						}
						else if(field.getRelyOn() != null)
							//针对每个列做依赖计算，这部需要放在最后执行
							doRelyOn(insertObj, field, fieldMap);
						else {
							//设置默认值
							if(StringUtils.isNotEmpty(field.getDefaultValue())){
								field.setField(field.getDefaultValue());
							}
							BeanUtils.setProperty(insertObj, field.getField(),field.getFieldValue());
						}
					}
				}
				if(isChecked){
					String id = BeanUtils.getProperty(insertObj, "id");
					String key = BeanUtils.getProperty(insertObj, convertKey);
					if(flag == ADD_ONLY && id != null){
						//不覆盖，并且要导入的数据已存在，则视为跳过
						CROSS_NUM++;
						String msg = key+" 已存在，系统跳过，不进行处理";
						crossList.add(msg);
						continue;
					}
					else if(flag != ADD_ONLY && id != null ){
						//覆盖条数
						COVER_NUM++;
					}
					else if(id == null && flag == CONVERT_ONLY){
						//只能覆盖，不处理数据库中不存在的
						continue;
					}
					else if(id == null && flag != CONVERT_ONLY){
						//新增条数
						SUCCESS_NUM++;
					}
					list.add(insertObj);
				}else{
					//失败条数
					FAIL_NUM++;
				}
			}
		}
		String format = "共 新增(%d)条，覆盖(%d)条，失败(%d)条，跳过(%d)条 ";
		format = String.format(format, SUCCESS_NUM,COVER_NUM,FAIL_NUM,CROSS_NUM);
		checkMsgList.add(0, format);
		checkMsgList.addAll(crossList);
		listData.clear();
		return list;
	}
	
	/**
	 * @see 功能描述（必填）：将Excel数据保存到数据库(目前只有新增)
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 19, 2011 3:51:10 PM</p>
	 * @param excelPath
	 * @param xmlClassPath
	 * @param flag：1-只覆盖，0-只新增，9-覆盖+新增
	 * 返回值：void
	 * @throws Exception 
	 */
	public List<String> saveFromExcel(String excelPath,String xmlClassPath,int flag) throws Exception{
		List<String> checkMsgList = new ArrayList<String>();
		List list = getListFromExcel(excelPath, xmlClassPath,flag,checkMsgList);
		this.baseSerivce.saveOrUpdateList(list);
		return checkMsgList;
	}
	/**
	 * @see 功能描述（必填）：获取Excel文件的表头，用Map封装，map的key值为列的索引，value表头的值
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 19, 2011 10:43:42 AM</p>
	 * @param excelPath
	 * @return
	 * 返回值：Map<Integer,String> 用Map封装，map的key值为列的索引，value表头的值
	 */
	private Map<Integer,String> getExcelTitle(String excelPath) throws Exception{
		FileInputStream input = new FileInputStream(new File(excelPath));
		POIFSFileSystem fs = new POIFSFileSystem(input);
		HSSFWorkbook wb = new HSSFWorkbook(fs);  
	    HSSFSheet sheet = wb.getSheetAt(0);
	    HSSFRow row = sheet.getRow(CAL_EXCEL_TITLE_ROW);
	    Map<Integer, String> map = new HashMap<Integer, String>();
	    for(Cell cell : row){
	    	int cellIndex = cell.getColumnIndex();
	    	String cellValue = StringUtil.convert2JavaBeanName(cell.getStringCellValue(),false);
	    	map.put(cellIndex, cellValue);
	    }
	    return  map;
	}
	/**
	 * @see 功能描述（必填）：获取Excel表格中所有列的值，并封装成Importfield对象，
	 * 						存在List，list中的Map存放列对应的列索引和该列的XML配置值
	 * 					 
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 19, 2011 11:12:28 AM</p>
	 * @param excelPath
	 * @param fieldCfgMap:配置文件每个列的配置项
	 * @return
	 * 返回值：List<Map<String,Importfield>>
	 * <p>一个list里面的每个Map，存放着Excel中，每条记录对应的所有列的值和列的XML配置</p>
	 */
	private List<Map<String,Importfield>> getExcelData(String excelPath, Map<String, Importfield> fieldCfgMap) throws Exception{
		List<Map<String,Importfield>> list = new ArrayList<Map<String,Importfield>>();
		//titleMap，表头对应的目录
		Map<Integer, String> titleMap = getExcelTitle(excelPath);
		FileInputStream input = new FileInputStream(new File(excelPath));
		POIFSFileSystem fs = new POIFSFileSystem(input);
		HSSFWorkbook wb = new HSSFWorkbook(fs);  
	    HSSFSheet sheet = wb.getSheetAt(0);
	    //克隆出一个XML文件中列配置的对象,用于过滤出Excel中不存在的列，而XML中有配置，主要针对relyOn属性
	   	int cellNum = fieldCfgMap.size();
	    for(Row row : sheet){
	   		int rowIndex = row.getRowNum();
	   		boolean check = true;//是否验证通过
	   		//TODO:第N行不处理
	   		if(rowIndex < CAL_EXCEL_DATA_ROW) continue;//第CAL_EXCEL_DATA_ROW行不做处理
	   		Map<String, Importfield> cloneFieldCfgMap = (Map<String, Importfield>)ContextUtil.deepClone(fieldCfgMap);
	   		Map<String,Importfield> cellMap = new HashMap<String, Importfield>();
	   		//int cellNum = row.getLastCellNum();
	   		for(int i=0; i< cellNum ; i++){
	   			Cell cell = row.getCell(i,Row.CREATE_NULL_AS_BLANK);
	   			String cellIndex = titleMap.get(cell.getColumnIndex()); 
	   			//处理Excel不存在，而XML配置文件存在的列，从fieldCfgMap过滤出来
	   			Importfield val=cloneFieldCfgMap.remove(cellIndex);
		    	if(val!=null){
		    		Importfield fieldCfg = fieldCfgMap.get(cellIndex);
		    		//克隆对象，避免指针重复引用
		    		Importfield cloneFieldCfg = (Importfield)BeanUtils.cloneBean(fieldCfg);
		    		String cellValue = getCellValue(cell);
		    		cloneFieldCfg.setFieldValue(cellValue);
		    		cloneFieldCfg.setRowIndex(rowIndex);
		    		cloneFieldCfg.setCellIndex(i);
		    		//fieldCfg.setField(cellIndex);
		    		cellMap.put(cellIndex, cloneFieldCfg);
		    	}
	   		}
	   		//处理Excel不存在，而XML配置文件存在的列，从fieldCfgMap过滤出来
	   		//对过滤出来的列进行处理，针对有rely_on属性的列进行过滤，生成Excel数据
	   		//TODO:效率比较低，在想想比较好的办法
	   		if(check){//验证通过，才能加了如列表
		   		Iterator<String> iterator = cloneFieldCfgMap.keySet().iterator();
		   		while(iterator.hasNext()){
		   			String key = iterator.next();
		   			Importfield fieldCfg = cloneFieldCfgMap.get(key);
		   			if(fieldCfg.getRelyOn() == null) continue;
		   			Importfield cloneFieldCfg = (Importfield)BeanUtils.cloneBean(fieldCfg);
		   			cellMap.put(key, cloneFieldCfg);
		   		}
		   		list.add(cellMap);
	   		}
	   	}
	   return list;
	}
	
	/**
	 * @see 功能描述（必填）：根据Excel配置的convert_key的值，从数据库中查询是否该列对应的值含有记录，如果有返回记录，如果没有，返回一个新对象
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 20, 2011 9:48:20 AM</p>
	 * @param fieldMap:Excel配置文件的映射
	 * @param clzz：需要查询的对象
	 * @param convert：是否需要覆盖记录，true：返回数据库查询的记录，false：声明一个clzz对应的对象
	 * @return
	 * 返回值：Object
	 * @throws ServiceException 
	 */
	private List getInitObject(Map<String,Importfield> fieldMap,ConvertKey convertKey,Class clzz) throws ServiceException{
		List list = null;
		Object obj = null;
		try {
			obj = clzz.newInstance();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		//if(!convert)return obj;
		//多条件过滤覆盖记录
		Importfield field = fieldMap.get(convertKey.getCovertKey());
		String[] queryOptField = convertKey.getQueryOptFields();
		String hql = " from " + clzz.getSimpleName()+" where "+field.getField() +" = '"+field.getFieldValue()+"'";
		if(queryOptField != null){
			for(String query : queryOptField){
				Importfield optQueryField = fieldMap.get(query);
				if(optQueryField == null) continue;
				String queryField = optQueryField.getField();
				if(optQueryField.getDbOp() != null){
					//如果是关联查询的值，需要初始化数据
					if(!dbOpQuery(obj, optQueryField)) continue;
					
					queryField = optQueryField.getReturnField();
				}
				
				hql += " and "+queryField+" = '"+optQueryField.getReturnValue()+"'";
			}
		}
		list = this.baseSerivce.findRecordByHql(hql);
		if(list == null || list.size()==0){
			list = new ArrayList();
			list.add(obj);
		}
		return list;
	}
	private String getCellValue(Cell cell){
		int cellType = cell.getCellType();
		Object obj = null;
		switch (cellType) {
		case Cell.CELL_TYPE_NUMERIC:
			obj = BigDecimal.valueOf(cell.getNumericCellValue());
			break;
		case Cell.CELL_TYPE_STRING:
			obj = cell.getStringCellValue();
			break;
		case Cell.CELL_TYPE_FORMULA:
			obj = cell.getCellFormula();
			break;
		case Cell.CELL_TYPE_BLANK:
			obj = null;
			break;
		default:
			obj = cell.getStringCellValue();
			break;
		}
		if(obj instanceof String){
			if(StringUtils.isEmpty(String.valueOf(obj))){
				obj = null;
			}
		}
		return obj==null ?null:String.valueOf(obj).trim();
	}
	
	private boolean checkField(Importfield importfield,Map<String, String> msgMap){
		if(importfield.getCheckClass() == null) return true;
		try{
			Class clzz = Class.forName(importfield.getCheckClass());
			IExcelCheck biz = (IExcelCheck)clzz.newInstance(); 
			boolean checked = biz.checkRelateTable(importfield, msgMap);
			//验证关联关系
			if(!checked){
				return checked;
			}
			//验证是否为空
			checked = biz.checkDataLength(importfield,msgMap);
			if(!checked){
				return checked;
			}
			//先验证长度
			checked = biz.checkDataLength(importfield,msgMap);
			if(!checked){
				return checked;
			}
			//在验证类型
			checked = biz.checkType(importfield,msgMap);
			if(!checked){
				return checked;
			}
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return true;
	}
}
