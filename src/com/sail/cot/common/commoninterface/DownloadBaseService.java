/**
 * 
 */
package com.sail.cot.common.commoninterface;


/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:通用下载接口</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Feb 16, 2012 3:12:37 PM </p>
 * <p>Class Name: DownloadBaseService.java </p>
 * @author achui
 *
 */
public interface DownloadBaseService {

	/**
	 * @see 功能描述（必填）：下载文件
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Feb 16, 2012 3:13:39 PM</p>
	 * @param filePath：需要下载的文件路径
	 * @param downJson：需要的额外参数：
	 * 					<p>downJson必须要有的一些参数：</p>
	 * 					<p>tableName：模块名</p>
	 * 					<p>exlSheet：是否分多个sheet导出</p>
	 * 					<p>exportType：导出的文件格式，取值为：EXCEL，PDF</p>
	 * 					<p>@see downJson可选参数：</p>
	 * 					<p>barcde：是否是条码打印的模块，true,false</p>
	 * 				 	<p>HEADER_PER_PAGE：是否每页都显示表头</p>	
	 * 					<p>expFileName：导出的文件名(扩展名通过exlSheet来识别)，如果不填，就随机生成一个文件名</p>
	 * 					<p>id:主单ID</p>	
	 * 返回值：String:下载文件路径，全路径
	 */
	public String downloadJasperReport(String filePath,String downJson);
	
	/**
	 * @see 功能描述（必填）：下载普通文件
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Feb 16, 2012 3:56:54 PM</p>
	 * @param filePath：文件路径
	 * @param downJson：额外的参数
	 * @param useDefaultParentPath：是否是有系统默认的存放路径，true:使用ContextUtil.getTomcatHome()作为filePath的父路径
	 * 返回值：String:下载文件路径，全路径
	 */
	public String downloadCommonFile(String filePath,String downJson,boolean useDefaultParentPath);
	
}
