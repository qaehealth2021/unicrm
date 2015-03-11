/**
 * 
 */
package com.sail.cot.service.system.module;

import java.util.List;

import com.jason.core.exception.DAOException;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.service.BaseSerivce;
import com.sail.cot.domain.CotEmps;
import com.sail.cot.domain.CotModule;
import com.sail.cot.domain.CotModuleFun;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Nov 3, 2011 10:37:18 AM </p>
 * <p>Class Name: CotModuleService.java </p>
 * @author achui
 *
 */
public interface CotModuleService extends BaseSerivce{

	/**
	 * @see 功能描述（必填）：根据父节点获取，该节点下面的直接的，返回树结构的json数据
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 4, 2011 3:29:09 PM</p>
	 * @param parentId
	 * @return
	 * @throws ServiceException
	 * 返回值：String
	 */
	public String getModuleTreeJsonData(Integer parentId) throws ServiceException;
	/**
	 * @see 功能描述（必填）：根据条件，将菜单表的所有数据转为json的树结构
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 4, 2011 3:29:44 PM</p>
	 * @return
	 * @throws ServiceException
	 * 返回值：String
	 */
	public String getAllModuleTreeJsnoData(CotEmps emps)throws ServiceException;
	/**
	 * 
	 * @see 功能描述（必填）：添加菜单及菜单功能
	 * @see 处理流程（选填）：
	 * @see 调用例子（选填）：
	 * @see 相关说明文件：
	 * <p>返回值：String</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Nov 8, 2011 8:57:27 AM</p>
	 * @param module
	 * @param moduleFuns
	 * @return
	 */
	public Integer addModule(CotModule module, List<CotModuleFun> moduleFuns) throws DAOException;
	/**
	 * 
	 * @see 功能描述（必填）：保存菜单
	 * @see 处理流程（选填）：
	 * @see 调用例子（选填）：
	 * @see 相关说明文件：
	 * <p>返回值：void</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Nov 8, 2011 9:04:35 AM</p>
	 * @param module
	 * @throws DAOException
	 */
	public void saveModule(CotModule module) throws DAOException;
	/**
	 * 
	 * @see 功能描述（必填）：保存菜单功能
	 * @see 处理流程（选填）：
	 * @see 调用例子（选填）：
	 * @see 相关说明文件：
	 * <p>返回值：String</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Nov 8, 2011 9:01:44 AM</p>
	 * @param moduleFun
	 * @throws DAOException
	 */
	public void saveModuleFun(CotModuleFun moduleFun) throws DAOException;
	/**
	 * 
	 * @see 功能描述（必填）：删除菜单
	 * @see 处理流程（选填）：
	 * @see 调用例子（选填）：
	 * @see 相关说明文件：
	 * <p>返回值：void</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Nov 8, 2011 9:13:42 AM</p>
	 * @param id
	 * @throws DAOException
	 */
	public void deleteModule(Integer id) throws DAOException;
	/**
	 * 
	 * @see 功能描述（必填）：删除菜单功能
	 * @see 处理流程（选填）：
	 * @see 调用例子（选填）：
	 * @see 相关说明文件：
	 * <p>返回值：void</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Nov 8, 2011 9:14:24 AM</p>
	 * @param id
	 * @throws DAOException
	 */
	public void deleteModuleFun(Integer id) throws DAOException;
	/**
	 * 
	 * @see 功能描述（必填）：获得模块
	 * @see 处理流程（选填）：
	 * @see 调用例子（选填）：
	 * @see 相关说明文件：
	 * <p>返回值：CotModule</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Nov 8, 2011 10:26:20 AM</p>
	 * @param id
	 * @return
	 */
	public CotModule getModule(Integer id);
	/**
	 * 
	 * @see 功能描述（必填）：获得模块菜单
	 * @see 处理流程（选填）：
	 * @see 调用例子（选填）：
	 * @see 相关说明文件：
	 * <p>返回值：CotModuleFun</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Nov 8, 2011 10:26:44 AM</p>
	 * @param id
	 * @return
	 */
	public CotModuleFun getModuleFun(Integer id);

	/**
	 * 
	 * @see 功能描述（必填）：移动菜单节点
	 * @see 处理流程（选填）：
	 * @see 调用例子（选填）：
	 * @see 相关说明文件：
	 * <p>返回值：void</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Nov 9, 2011 11:34:49 AM</p>
	 * @param moveId 移动节点ID
	 * @param targetId 目标节点ID
	 * @param point 相对目标移动方式，为append加入，above移到上面，below移动下面
	 * @throws DAOException
	 */
	public void moveModule(Integer moveId,Integer targetId,String point) throws DAOException;
	
	
	/**
	 * 
	 * @see 功能描述（必填）：获得所有第一级菜单,按菜单排序字段排序
	 * @see 相关说明文件：
	 * <p>返回值：List</p>
	 * @see <p>Author:azan</p>
	 * @see <p>Create Time:2012-3-23 上午8:49:00</p>
	 * @return
	 * @throws ServiceException
	 */
	public List getFirstModules() throws ServiceException;
	
	/**
	 * 
	 * @see 功能描述（必填）：通过父类id获得子菜单
	 * <p>返回值：List</p>
	 * @see <p>Author:azan</p>
	 * @see <p>Create Time:2012-3-23 上午9:53:51</p>
	 * @param parentId
	 * @return
	 * @throws ServiceException
	 */
	public List getModulesByParentId(Integer parentId) throws ServiceException;
	
	public String getAllModuleTreeJsnoDataSecond(CotEmps emps) throws ServiceException;
	
}
