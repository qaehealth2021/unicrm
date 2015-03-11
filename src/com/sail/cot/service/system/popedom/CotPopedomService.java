/**
 * 
 */
package com.sail.cot.service.system.popedom;

import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MultiHashMap;

import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.service.BaseSerivce;
import com.sail.cot.domain.CotEmps;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Nov 7, 2011 6:00:42 PM </p>
 * <p>Class Name: CotPopedomService.java </p>
 * @author achui
 *
 */
public interface CotPopedomService extends BaseSerivce{
	
	/**
	 * @see 功能描述（必填）：获取指定员工指定模块的功能权限，
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 7, 2011 6:04:38 PM</p>
	 * @param moduleId:指定模块Id
	 * @param empId：指定业务员Id
	 * @return
	 * 返回值：List
	 * @throws ServiceException 
	 */
	public List getFunPopedomByEmp(Integer moduleId,Integer empId) throws ServiceException;
	
	/**
	 * @see 功能描述（必填）：获取指定员工，指定模块的数据权限，主要用于页面权限项的加载
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 7, 2011 6:06:18 PM</p>
	 * @param moduleId
	 * @param empId
	 * @return  key：公司，部门，员工，value：对应的已选权限
	 * 返回值： Map<String,List>
	 * @throws ServiceException 
	 */
	public Map<String,List> getDataPopedomByEmp(Integer moduleId,Integer empId) throws ServiceException;
	
	/**
	 * @see 功能描述（必填）：保存指定员工指定模块的功能权限
	 * @see 处理流程（选填）：1、先删除该员工，该模块的所有权限；2:、保存数据
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 8, 2011 9:00:40 AM</p>
	 * @param moduleId：模块ID
	 * @param empId：指定员工ID
	 * @param saveFunPopedom：模块ID对应功能权限id列表，是个json格式
	 * @return 返回插入功能权限表的记录数
	 * @throws ServiceException
	 * 返回值：Integer
	 */
	public Integer saveFunPopedom(List<Integer> moduleId,Integer empId,String funIdsMapJson) throws ServiceException;
	
	/**
	 * @see 功能描述（必填）：保存指定员工指定模块的数据权限
	 * @see 处理流程（选填）：1、先删除该员工，该模块的所有权限；2:、保存数据
	 * 					   需要把前台传过来的map参数转换为json字符串存入数据库
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 8, 2011 9:04:00 AM</p>
	 * @param moduleId 指定模块ID
	 * @param empId 指定员工ID
	 * @param moduleIdsMapJson 模块对应该员工的数据权，
	 * 				moduleId：模块的ID
	 * 				map显示，key为：数据权限的类别，公司COMPANY，部门：DEPT，员工：EMP，value为对应的ID集合,PARENT：该模块对应的父亲节点
	 * @return
	 * @throws ServiceException
	 * 返回值：Integer
	 */
	public Integer saveDataPopedom(List<Integer> moduleIds,Integer empId,String moduleIdsMapJson) throws ServiceException;
	
	/**
	 * @see 功能描述（必填）：查询菜单所对应的功能模块
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 9, 2011 2:53:47 PM</p>
	 * @param moduleId
	 * @return
	 * 返回值：List
	 */
	public List getModuleFun(Integer moduleId);
	
	/**
	 * @see 功能描述（必填）：获取指定员工，所有模块的数据权限，用map表示，key：模块对应的url，value：数据权限列表
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 10, 2011 10:36:55 AM</p>
	 * @param empId
	 * @return
	 * 返回值：MultiValueMap
	 */
	public Map getDataMapByEmpId(Integer empId);
	
	/**
	 * @see 功能描述（必填）：获取指定员工，所有模块的功能权限，用MultiValueMap表示，key：模块对应的url，value：功能权限列表
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 10, 2011 6:09:55 PM</p>
	 * @param empId
	 * @return
	 * 返回值：MultiValueMap
	 */
	public MultiHashMap getFunMapByEmpId(Integer empId);
	
	/**
	 * @see 功能描述（必填）：根据模块的URL判断该模块的数据权限
	 * @see 处理流程（选填）：1、获取员工数据权限表的数据权限，根据数据权限，转换为员工的ID列表
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 10, 2011 10:00:04 AM</p>
	 * @param url
	 * @return
	 * 返回值：Map<String,Object>
	 * @throws ServiceException 
	 */
	public Map<String, Object> getPopedomWhereMap(String url,Integer empId) throws ServiceException;
	
	/**
	 * @see 功能描述（必填）：将指定员工权限缓存起来，用于日后使用
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 17, 2011 2:18:09 PM</p>
	 * @param empId：
	 * @param reload:是否重新设置权限缓存
	 * 返回值：void
	 */
	public void setPopedomCacheByEmpId(Integer empId,boolean reload);
	
	/**
	 * @see 功能描述（必填）：获取指定员工是否有指定模块的指定操作权限（如：是否有样品档案的新增权限）
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 17, 2011 2:37:30 PM</p>
	 * @param url：指定模块的URL
	 * @param funName：指定的功能权限，如MOD等
	 * @return true:有该权限，false:没有该权限或者未设置缓存
	 * 返回值：boolean
	 */
	public boolean getFunPopedomByFunName(String url,String funName,Integer empId);
	
	/**
	 * @see 功能描述（必填）：保存的模块的记录权限
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Dec 26, 2011 3:06:01 PM</p>
	 * @param url：模块对应的URL
	 * @param empsIds：针对可见的业务员列表
	 * @param keyIds：可见的记录的ID列表
	 * @return
	 * 返回值：Integer
	 * @throws ServiceException 
	 */
	public Integer saveOrUpdateRecordPopedom(String url,List<Integer> empsIds,List<Integer> keyIds) throws ServiceException;
	
	
	/**
	 * @see 功能描述（必填）：根据模块的URL判断该模块所具有的记录权限
	 * @see 处理流程（选填）：1、获取查询模块的而外的记录ID
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 10, 2011 10:00:04 AM</p>
	 * @param url
	 * @return
	 * 返回值：Map<String,Object>
	 * @throws ServiceException 
	 */
	public Map<String, Object> getPopedomRecordWhereMap(String url,Integer empId) throws ServiceException; 
	
	/**
	 * @see 功能描述（必填）：获取指定员工，指定模块的所有权限集合
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Feb 22, 2012 7:29:55 PM</p>
	 * @param url
	 * @param empId
	 * @return
	 * @throws ServiceException
	 * 返回值：Map<String,String>
	 */
	public Map<String, String> getFunPopedomMap(String url,boolean reloadMap) throws ServiceException;
	
	/**
	 * @see 功能描述（必填）：
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Feb 24, 2012 11:07:11 AM</p>
	 * @return
	 * 返回值：CotEmps
	 */
	public CotEmps getLoginEmp();
	
	/**
	 * @see 功能描述（必填）：权限复制
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 10, 2012 2:13:22 PM</p>
	 * @param fromEmpId ：权限来源业务员ID
	 * @param toEmpId：复制给的业务员ID
	 * 返回值：void
	 */
	public void copyPopedom(Integer fromEmpId,Integer toEmpId);
}
