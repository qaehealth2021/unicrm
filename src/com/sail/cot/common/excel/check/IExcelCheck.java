/**
 * 
 */
package com.sail.cot.common.excel.check;

import java.util.Map;

import com.sail.cot.common.excel.entity.Importfield;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:Excel字段的有效性确认</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Nov 18, 2011 2:37:38 PM </p>
 * <p>Class Name: ICheck.java </p>
 * @author achui
 *
 */
public interface IExcelCheck {

	/**
	 * @see 功能描述（必填）：校验数据类型,防止数据类型转换出错
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 18, 2011 2:51:01 PM</p>
	 * @param fieldField：Excel单元格对象
	 * @param msgMap：验证不通过的信息，在返回为true的时候填写
	 * @return 是否验证通过 true：通过，false：不通过
	 * 返回值：boolean
	 */
	public boolean checkType(Importfield fieldField,Map<String, String> msg);
	
	/**
	 * @see 功能描述（必填）：
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 18, 2011 2:51:17 PM</p>
	 * @param fieldField：Excel单元格对象
	 * @param row：发生的行
	 * @param col：发生的列
	 * @param msgMap：验证不通过的信息，在返回为true的时候填写
	 * @return 是否验证通过 true：通过，false：不通过
	 * @return
	 * 返回值：boolean
	 */
	public boolean checkDataLength(Importfield field,Map<String, String> msgMap);
	
	/**
	 * @see 功能描述（必填）：验证关联表中的记录是否存在
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 18, 2011 2:51:17 PM</p>
	 * @param fieldField：Excel单元格对象
	 * @param msgMap：验证不通过的信息，在返回为true的时候填写
	 * @return 是否验证通过 true：通过，false：不通过
	 * @return
	 * 返回值：boolean
	 */
	public boolean checkRelateTable(Importfield field,Map<String, String> msgMap);
	
	public boolean checkNull(Importfield field,Map<String, String> msgMap);
	
}
