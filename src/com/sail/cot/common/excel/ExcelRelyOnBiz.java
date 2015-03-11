/**
 * 
 */
package com.sail.cot.common.excel;

import java.util.Map;

import com.sail.cot.common.excel.entity.Importfield;

/**
 * <p>Title: 旗航不锈钢管理系统（QHERP）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Oct 20, 2011 2:53:57 PM </p>
 * <p>Class Name: ExcelRelyOnBiz.java </p>
 * @author achui
 *
 */
public interface ExcelRelyOnBiz {

	/**
	 * @see 功能描述（必填）：依赖性处理接口，所有依赖的处理必须实现该接口
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 20, 2011 2:54:58 PM</p>
	 * @param entity：需要保存到数据库中的对象，函数运行完后，需要对该对象的某些字段赋值
	 * @param field：字段的配置值
	 * @param fieldCfg:一条记录所有列的配置项
	 * @return 返回计算后的结果
	 * 返回值：Object
	 */
	public Object doRelyBiz(Importfield field,Map<String,Importfield> fieldCfg);
}
