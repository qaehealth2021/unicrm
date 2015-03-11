/**
 * 
 */
package com.sail.cot.service.imageservice.impl;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.sail.cot.common.excel.ExcelImport;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.service.BaseSerivce;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.common.util.ExceptionStackTracePaser;
import com.sail.cot.constants.Constants;
import com.sail.cot.custinterface.BatchImportPicInterface;
import com.sail.cot.service.BaseData;
import com.sail.cot.service.imageservice.ImportImageService;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Feb 8, 2012 3:31:50 PM </p>
 * <p>Class Name: ImageServiceImpl.java </p>
 * @author achui
 *
 */

@Service("ImportImageService")
@Transactional
public class ImportImageServiceImpl implements ImportImageService,BatchImportPicInterface{

	private BaseSerivce baseSerivce;
	
//	@Resource(name="CotSystemCfgService")
//	private CotSystemCfgService cotSystemCfgService;
	
	@Resource(name="BaseData")
	private BaseData baseData;
	
	private final String SUCCESS_NUM = "SUCCESS_NUM";
	private final String FAIL_NUM = "FAIL_NUM";
	private Map newCreateMap = new HashMap();//保存需要新增的记录
	public BaseSerivce getBaseSerivce() {
		return baseSerivce;
	}
	@Resource(name="BaseService")
	public void setBaseSerivce(BaseSerivce baseSerivce) {
		this.baseSerivce = baseSerivce;
	}
	/* (non-Javadoc)
	 * @see com.sail.cot.custinterface.BatchImportPicInterface#getImportPicList(java.lang.String)
	 */
	public Map<String,String>getImportPicList(String importPath) {
		String path = ContextUtil.getLocalTomcatSubPath(importPath);
		Map<String,String> map = new HashMap<String, String>();
		File files = new File(path);
		if(!files.exists()){
			return null;
		}
		File[] fileArray = files.listFiles();
		for(File file : fileArray){
			if(file.isDirectory()) continue;
			//获取没有带扩展名的文件名
			String fileName = FilenameUtils.getBaseName(file.getName());
			map.put(fileName, file.getAbsolutePath());
		}
		return map;
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.custinterface.BatchImportPicInterface#importPicByConvert(java.util.List)
	 */
	public Map<String,Integer> importPicByConvert(String importFileFolder,String tableName,String queryAttr) {
		Map<String,String> map = this.getImportPicList(importFileFolder);
		List<String> list =  new ArrayList<String>();
		list.addAll(map.keySet());
		String hql = " from "+tableName+" obj where obj."+queryAttr+" in ( :list )";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("list", list);
		List existList = null;
		try {
			existList = this.getBaseSerivce().findRecordByHql(hql, whereMap);
		} catch (ServiceException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		int index = 0;
		int success = 0;//成功条数
		int fail = 0;//失败条数
		String desPath = this.getBaseSerivce().getUploadPath(importFileFolder, true);
		File destDir = new File(ContextUtil.getTomcatHome()+Constants.DEFAULT_UPLOAD_FILE+desPath);
		for(Object object : existList){
			String key = null;
			try {
				//覆盖记录
				key = BeanUtils.getProperty(object, queryAttr);
				String path = desPath + FilenameUtils.getName(map.get(key));
				BeanUtils.setProperty(object, "picPath", path);
				existList.set(index++, object);
				File sourceFile = new File(map.get(key));
				//如果目录中存在文件就删除
				File delFile = new File(ContextUtil.getTomcatHome()+Constants.DEFAULT_UPLOAD_FILE+path);
				if(delFile.exists())
					FileUtils.forceDelete(delFile);
				FileUtils.moveFileToDirectory(sourceFile, destDir, true);
				this.getBaseSerivce().modifyObj(object);
				success++;
				map.remove(key);
				
			} catch (Exception e) {
				fail++;
				map.remove(key);
				e.printStackTrace();
			}
		}
		Map<String, Integer> returnMap = new HashMap<String, Integer>();
		returnMap.put(SUCCESS_NUM, success);
		returnMap.put(FAIL_NUM, fail);
		this.newCreateMap = map;
		return returnMap;
	}
	/* (non-Javadoc)
	 * @see com.sail.cot.custinterface.BatchImportPicInterface#importPicByNew(java.lang.String, java.lang.String, java.lang.String)
	 */
	public Map<String, Integer> importPicByNew(String importPath,
			String tableName, String queryAttr) {
		int success = 0;
		int fail = 0;
		try {
			Class clzz = Class.forName("com.sail.cot.domain."+tableName);
			Iterator<String> iterator = this.newCreateMap.keySet().iterator();
			while(iterator.hasNext()){
				String key = iterator.next();
				String value = String.valueOf(this.newCreateMap.get(key));
				Object obj = clzz.newInstance();
				BeanUtils.setProperty(obj, queryAttr, key);
				BeanUtils.setProperty(obj, "picPath", value);
				this.getBaseSerivce().addObj(obj);
				this.newCreateMap.remove(key);
				success++;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		Map<String, Integer> returnMap = new HashMap<String, Integer>();
		returnMap.put(SUCCESS_NUM, success);
		returnMap.put(FAIL_NUM, fail);
		return returnMap;
	}
	/* (non-Javadoc)
	 * @see com.sail.cot.service.imageservice.ImageService#importPic(java.lang.String, java.lang.String)
	 */
	public String importPic(String jsonParam,String importFolder,String tableName, String queryAttr) {
		
		JSONObject json = JSONObject.fromObject(jsonParam);
		boolean isCover = json.getBoolean("isCover");
		boolean isAdd = json.getBoolean("isAdd");
		int crossNum = 0;
		if(!isCover && !isAdd){
			Map<String, String> map = this.getImportPicList(importFolder);
			crossNum = map.size();
		}
		Map<String, Integer> returnMap = new HashMap<String, Integer>();
		if(isCover)
			returnMap = this.importPicByConvert(importFolder, tableName, queryAttr);
		int success = returnMap.get(SUCCESS_NUM) == null?0:returnMap.get(SUCCESS_NUM);
		String msg = "成功覆盖："+success+"个 </br>";
		if(isAdd)
			returnMap = this.importPicByNew(importFolder, tableName, queryAttr);
		success = returnMap.get(SUCCESS_NUM) == null?0:returnMap.get(SUCCESS_NUM);
		msg += "成功新增："+success+"个 </br>";
		if(crossNum == 0)
			crossNum = this.newCreateMap.size();
		msg += "跳过："+crossNum+"个 </br>";
		return msg;
	}
	/* (non-Javadoc)
	 * @see com.sail.cot.service.imageservice.ImportImageService#deletePic(java.lang.String)
	 */
	public String deletePic(String filePath) throws ServiceException {
		try {
			FileUtils.forceDelete(new File(filePath));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			String msg = ExceptionStackTracePaser.paserStactTrace(e);
			throw new ServiceException(msg);
		}
		return null;
	}
	/* (non-Javadoc)
	 * @see com.sail.cot.service.imageservice.ImportImageService#importExcelFile(java.lang.String, java.lang.String)
	 */
	@Transactional(propagation=Propagation.NOT_SUPPORTED)
	public List<String> importExcelFile(String jsonParam,String excelFilePath, String excelCfgFileType) throws ServiceException {
		// TODO Auto-generated method stub
		JSONObject json = JSONObject.fromObject(jsonParam);
		boolean isCover = json.getBoolean("isCover");
		boolean isAdd = json.getBoolean("isAdd");
		ExcelImport excelImport = new ExcelImport();
		int flag = excelImport.CONVET_AND_ADD;
		if(isCover && isAdd)//新增和
			flag = excelImport.CONVET_AND_ADD;
		else if(isCover && !isAdd)//只有覆盖选项
			flag = excelImport.CONVERT_ONLY;
		else if(!isCover && isAdd)//只有新增选项
			flag = excelImport.ADD_ONLY;
		excelImport.setBaseSerivce(this.getBaseSerivce());
		excelImport.setBaseData(this.baseData);
//		excelImport.setCotSystemCfgService(this.cotSystemCfgService);
		List<String> msgList = null;
		try {
			String xmlPath = "/config/excel/"+File.separator+ "excel-"+excelCfgFileType+"-import.xml";
			String filePath = ContextUtil.getLocalTomcatHome()+Constants.DEFAULT_UPLOAD_FILE+excelFilePath;
			msgList = excelImport.saveFromExcel(filePath,xmlPath,flag);
			for(String msg : msgList){
				System.out.println(msg);
			}
		} catch (Exception e) {
			e.printStackTrace();
			// TODO Auto-generated catch block
			throw new ServiceException(ExceptionStackTracePaser.paserStactTrace(e));
		}
		return msgList;
	}


}
