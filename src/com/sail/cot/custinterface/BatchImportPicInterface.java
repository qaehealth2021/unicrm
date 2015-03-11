/**
 * 
 */
package com.sail.cot.custinterface;

import java.util.Map;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:批量上传业务逻辑接口</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Feb 7, 2012 4:59:59 PM </p>
 * <p>Class Name: BatchUploadInterface.java </p>
 * @author achui
 *
 */
public interface BatchImportPicInterface {

	/**
	 * @see 功能描述（必填）：批量导入图片，执行覆盖策略策略
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Feb 7, 2012 5:02:53 PM</p>
	 * @param importPath:上传文件的文件夹名字
	 * @param tableName:需要查询的模块
	 * @param queryAttr:进行重复判断的需要验证的字段属性
	 * @return
	 * 返回值： Map<String, Integer>:key:SUCCESS_NUM:成功覆盖条数，FAIL_NUM:失败条数
	 */
	public Map<String, Integer> importPicByConvert(String importPath,String tableName,String queryAttr);
	
	/**
	 * @see 功能描述（必填）：批量导入图片，执行新建策略
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Feb 8, 2012 2:13:48 PM</p>
	 * @param importPath:上传文件的文件夹名字
	 * @param tableName:需要查询的模块
	 * @param queryAttr:进行重复判断的需要验证的字段属性
	 * @return
	 * 返回值： Map<String, Integer>:key:SUCCESS_NUM:成功覆盖条数，FAIL_NUM:失败条数
	 */
	public Map<String, Integer> importPicByNew(String importPath,String tableName,String queryAttr);
	
	/**
	 * @see 功能描述（必填）：获取指定上传路径下的说有上传文件，不递归操作，值显示指定问价夹下的文件
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Feb 8, 2012 2:19:03 PM</p>
	 * @param importPath
	 * @return
	 * 返回值：String
	 */
	public Map<String, String> getImportPicList(String importPath);
	
	
}
