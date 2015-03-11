/**
 * 
 */
package com.sail.cot.custinterface;

import com.sail.cot.common.exception.ServiceException;


/**
 * <p>Title: 旗航ERP管理系统（QHERP）</p>
 * <p>Description:获取树结构父亲节点接口</p>
 * <p>Copyright: Copyright (c) 2010</p>
 * <p>Company: </p>
 * <p>Create Time: Feb 24, 2011 5:18:55 PM </p>
 * <p>Class Name: TreeParent.java </p>
 * @author achui
 * @param <T>
 *
 */
public interface TreeParent {
	
	/**
	 * @see 功能描述（必填）：获取叶子节点的状态，通过返回值来判断是叶子节点还是根节点，true：叶子节点，false：根节点
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 4, 2011 6:33:27 PM</p>
	 * @param parent:父亲节点的对象
	 * @return
	 * 返回值：boolean
	 */
	public boolean getLeafStatus(Object parent) throws ServiceException;
}
