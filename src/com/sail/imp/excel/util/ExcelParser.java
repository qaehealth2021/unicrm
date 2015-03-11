/**
 * 
 */
package com.sail.imp.excel.util;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import jxl.Sheet;
import jxl.Workbook;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.MethodUtils;
import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.service.BaseSerivce;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.common.util.Log4WebUtil;
import com.sail.cot.query.QueryInfo;
import com.sail.imp.custinterface.FormulaInterface;
import com.sail.imp.excel.ImpBaseField;
import com.sail.imp.excel.ImpFormula;
import com.sail.imp.excel.ImpIdField;

/**
 * <p>Title: 旗航ERP管理系统（QHERP）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2010</p>
 * <p>Company: </p>
 * <p>Create Time: Feb 28, 2011 5:50:01 PM </p>
 * <p>Class Name: ExcelParser.java </p>
 * @author achui
 *
 */
/**
 * <p>Title: 旗航ERP管理系统（QHERP）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2010</p>
 * <p>Company: </p>
 * <p>Create Time: Mar 1, 2011 11:31:20 AM </p>
 * <p>Class Name: ExcelParser.java </p>
 * @author achui
 *
 */
public class ExcelParser<T> {
	private Document document = null;
	private String xmlPath = "E:\\demo\\imp.xml";
	private Logger logger = Log4WebUtil.getLogger(ExcelParser.class);
	private boolean needRepeat = false;
	private String keyName;
	private String queryObj;
	/**
	 * @param needRepeat
	 */
	public ExcelParser(boolean needRepeat,String keyName,String queryObj) {
		this.needRepeat = needRepeat;
		this.keyName = keyName;
		this.queryObj = queryObj;
	}
	public ExcelParser(String keyName,String queryObj) {
		this.needRepeat = false;
		this.keyName = keyName;
		this.queryObj = queryObj;
	}
	public ExcelParser() {
		this.needRepeat = false;
	}
	public List<T> paserExcel(String excelFile, Class<T> clzz) {
		Workbook wb = null;
		List list = new ArrayList();
		try {
			wb = Workbook.getWorkbook(new File(excelFile));
		} catch (Exception e) {
			e.printStackTrace();
		}
		Sheet sheet = wb.getSheet(0);//获取第一个Sheet
		try {
			for(int i=2; i<sheet.getRows(); i++){
				String queryValue = sheet.getCell(0, i).getContents();
				T res = clzz.newInstance();
				List<ImpFormula> formulaList = new ArrayList<ImpFormula>();
				String fieldName = "";
				if(this.needRepeat)
					res = this.getRepeatJudge(this.keyName, queryValue, this.queryObj);
				for(int j = 0; j<sheet.getColumns(); j++){
					fieldName = sheet.getCell(j, 1).getContents();
					String excelValue = sheet.getCell(j, i).getContents();
					//转换成对应单元格对象
					Object object = paserXmlToField(fieldName);
					BeanUtils.setProperty(object, "value", excelValue);
					if(object instanceof ImpIdField){
						MethodUtils.invokeMethod(object, "saveAndgetId", excelValue);
					}else if(object instanceof ImpFormula){
						MethodUtils.invokeMethod(object, "setObj", res);
						formulaList.add((ImpFormula)object);
					}
					//TODO:else if(),其他类型判断
					//获取 ImpIdField对象的value属性
					String value = BeanUtils.getProperty(object, "value");
					//设置返回值信息
					BeanUtils.setProperty(res, fieldName, value);
				}
				//对公式列进行计算
				for(int k=0; k<formulaList.size();k++){
					ImpFormula<T> formula = (ImpFormula<T>)formulaList.get(k);
					String foumulaClzz = formula.getCalClass();
					Class calClzz = Class.forName(foumulaClzz);
					//通过对应公式计算类进行计算
					String value = formula.getFormulaValue((FormulaInterface)clzz.newInstance());
					BeanUtils.setProperty(res, fieldName, value);
				}
				list.add(res);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	/**
	 * 描述：解析Excel的单元格，生成相应的对象
	 * @param fieldName：需要被解析的单元格属性
	 * @return
	 * 返回值：Object，对应的单元格对象
	 */
	private Object paserXmlToField(String fieldName){
		Object obj = null;
		SAXReader builder = new SAXReader();
		try {
			if(document == null)
				document = builder.read(new File(xmlPath));
			Element root = document.getRootElement();
			Element field = root.element(fieldName);
			//field = field.getChild(fieldName);
			obj = getField(field);
		} catch (DocumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return obj;
	}
	private Object getField(Element field){
		String type = field.selectSingleNode("type").getText();
		if(FieldEnum.NORMAL_FIELD.equals(type)){
			ImpBaseField obj = new ImpBaseField();
			obj.setProperty(field.selectSingleNode("type").getText());
			return obj;
		}else if(FieldEnum.ID_FIELD.equals(type)){
			ImpIdField obj = new ImpIdField();
			obj.setProperty(field.selectSingleNode("type").getText());
			obj.setIdProperty(field.selectSingleNode("IdSource").getText());
			obj.setIdSource(field.selectSingleNode("IdProperty").getText());
			obj.setSourceProperty(field.selectSingleNode("sourceProperty").getText());
			return obj;
		}else if(FieldEnum.FORMULA_FIELD.equals(type)){
			ImpFormula obj = new ImpFormula();
			obj.setProperty(field.selectSingleNode("type").getText());
			obj.setCalClass(field.selectSingleNode("calClass").getText());
		}	
		return null;
	}
	
	
	/**
	 * 描述：重复性判断
	 * @param keyName 需要查询的属性
	 * @param value 查询的值
	 * @param obj 查询的表
	 * @return
	 * 返回值：T 如果查无记录，就返回new出来的T对象，否则返回查询出来的T对象
	 */
	private T getRepeatJudge(String keyName,String value,String obj){
		BaseSerivce baseService = (BaseSerivce)ContextUtil.getBean("baseService");
		QueryInfo queryInfo = new QueryInfo();
		String sql = " from "+obj+" obj where obj."+keyName+" = '"+value+"'";
		queryInfo.setSelectString(sql);
		queryInfo.setOrderString("");
		queryInfo.setQueryString("");
		try {
			List list = baseService.findRecords(queryInfo);
			if(list != null && list.size() > 0)
				return (T)list.get(0);
		} catch (ServiceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try {
			Class clzz = Class.forName("com.sail.cot.domain."+obj);
			return (T)clzz.newInstance();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}
