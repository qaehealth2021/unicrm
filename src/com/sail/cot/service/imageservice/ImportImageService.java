/**
 * 
 */
package com.sail.cot.service.imageservice;

import java.util.List;

import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.custinterface.BatchImportPicInterface;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Feb 8, 2012 3:31:10 PM </p>
 * <p>Class Name: ImageService.java </p>
 * @author achui
 *
 */
public interface ImportImageService extends BatchImportPicInterface{

	/**
	 * @see 功能描述（必填）：图片导入
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Feb 8, 2012 5:25:49 PM</p>
	 * @param tableName
	 * @param queryAttr
	 * @param jsonParam:配置参数，json表达式
	 * @return
	 * 返回值：String
	 */
	public String importPic(String jsonParam,String importFolder,String tableName,String queryAttr);
	
	public String deletePic(String filePath) throws ServiceException;
	
	/**
	 * @see 功能描述（必填）：Excel导入
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Feb 10, 2012 3:11:07 PM</p>
	 * @param excelFilePath：Excel文件夹
	 * @param excelCfgFileType：指定要读取的Excel配置文件，
	 * 			<p>Excel配置文件的命名规则为:excel_XXX_import.xml,其中XXX就代表excelCfgFileType的值<p>
	 * @return
	 * 返回值：String
	 * @throws ServiceException 
	 */
	public List<String> importExcelFile(String jsonParam,String excelFilePath,String excelCfgFileType) throws ServiceException;
}
