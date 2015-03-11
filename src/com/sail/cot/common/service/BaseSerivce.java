/**
 * 
 */
package com.sail.cot.common.service;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.SqlParameter;

import com.sail.cot.common.commoninterface.DownloadBaseService;
import com.sail.cot.common.commoninterface.UploadBaseService;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.query.QueryInfo;


/**
 * <p>Title: 旗航ERP管理系统</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2008</p>
 * <p>Company: </p>
 * <p>Create Time: May 4, 2009 2:22:43 PM </p>
 * <p>Class Name: BaseTypeSerivce.java </p>
 * @author achui
 *
 */
public interface BaseSerivce extends UploadBaseService,DownloadBaseService {

	/**
	 * 描述： 获取对象的列表信息，不做分页处理，一般用户数据字典的获取
	 * @param objName
	 * @return
	 * @throws ServiceException
	 * 返回值：List
	 */
	public List getList(String objName )throws ServiceException;
	
	/**
	 * 描述： 数据库添加操作
	 * @param objList
	 * @throws ServiceException
	 * 返回值：void
	 */
	public int addList(List objList) throws ServiceException;
	
	/**
	 * 描述：数据库修改操作
	 * @param objList
	 * @throws ServiceException
	 * 返回值：void
	 */
	public int modifyList(List objList) throws ServiceException;
	
	/**
	 * 描述： 数据库删除操作
	 * @param ids
	 * @param objName
	 * @throws ServiceException
	 * 返回值：void
	 */
	public int deleteList(List ids,String objName) throws ServiceException;
	
	/**
	 * 描述： 获取数据库某条记录，根据主键ID获取
	 * @param id
	 * @param clzz
	 * @return
	 * @throws ServiceException
	 * 返回值：Object
	 */
	public Object getObjById(Serializable id,Class clzz);
	
	/**
	 * 描述： 获取数据库某条记录，根据主键ID获取
	 * @param id
	 * @param className
	 * @return
	 * @throws ServiceException
	 * 返回值：Object
	 */
	public Object getObjByNameId(String id,String className) throws ServiceException;
	
	/**
	 * 描述： 获取数据库某条记录，根据主键ID获取
	 * @param id
	 * @param className
	 * @return
	 * @throws ServiceException
	 * 返回值：Object
	 */
	public Object getObjByIntegerId(Integer id,String className) throws ServiceException;
	/**
	 * 描述：查找数据库符合条件的集合，分页显示
	 * @param queryInfo
	 * @return
	 * @throws ServiceException
	 * 返回值：List
	 */
	public List findRecords(QueryInfo queryInfo) throws ServiceException;
	/**
	 * 
	 * @see 功能描述（必填）：通过HQL进行查询，有带分页功能
	 * @see 处理流程（选填）：
	 * @see 调用例子（选填）：
	 * @see 相关说明文件：
	 * <p>返回值：String</p> 返回分页格式的JSON string
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Nov 12, 2011 10:21:02 AM</p>
	 * @param hql
	 * @param whereMap
	 * @param start
	 * @param limit
	 * @return
	 * @throws ServiceException
	 */
	public String findRecords(String hql,Map<String,Object> whereMap,int start,int limit) throws ServiceException;
	/**
	 * 
	 * @see 功能描述（必填）：通过HQL进行查询，有带分页功能,并可过滤
	 * @see 处理流程（选填）：
	 * @see 调用例子（选填）：
	 * @see 相关说明文件：
	 * <p>返回值：String</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Feb 4, 2012 11:40:57 AM</p>
	 * @param hql
	 * @param whereMap
	 * @param start
	 * @param limit
	 * @param excludes
	 * @return
	 * @throws ServiceException
	 */
	public String findRecords(String hql,Map<String,Object> whereMap,int start,int limit,String[] excludes) throws ServiceException;
	
	/**
	 * @see 功能描述（必填）：根据HQL获取结果集，不做分页
	 * @see 处理流程（选填）：
	 * @see 调用例子（选填）：
	 * @see 相关说明文件：
	 * @param hql
	 * @return
	 * @throws ServiceException
	 * 返回值：List
	 * Author:achui
	 * Create Time:Oct 19, 2011 8:51:38 AM
	 */
	public List findRecordByHql(String hql) throws ServiceException;
	
	/**
	 * @see 功能描述（必填）：根据HQL获取一条记录
	 * @see 处理流程（选填）：
	 * @see 调用例子（选填）：
	 * @see 相关说明文件：
	 * @param hql
	 * @return
	 * @throws ServiceException
	 * 返回值：List
	 * Author:achui
	 * Create Time:Oct 19, 2011 8:51:38 AM
	 */
	public Object findUniqueRecordsByHql(String hql) throws ServiceException;
	
	/**
	 * 
	 * @see 功能描述（必填）：根据HQL和条件获取结果集，不做分页
	 * @see 处理流程（选填）：
	 * @see 调用例子（选填）：
	 * @see 相关说明文件：
	 * <p>返回值：List</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Nov 2, 2011 11:04:56 AM</p>
	 * @param hql
	 * @param whereMap
	 * @return
	 * @throws ServiceException
	 */
	public List findRecordByHql(String hql ,Map<String, Object> whereMap) throws ServiceException;
	
	/**
	 * @see 功能描述（必填）：根据HQL获取一条记录
	 * @see 处理流程（选填）：
	 * @see 调用例子（选填）：
	 * @see 相关说明文件：
	 * @param hql
	 * @param whereMap
	 * @return
	 * @throws ServiceException
	 * 返回值：List
	 * Author:achui
	 * Create Time:Oct 19, 2011 8:51:38 AM
	 */
	public Object findUniqueRecordsByHql(String hql, Map<String, Object> whereMap) throws ServiceException;
	
	/**
	 * 描述： 根据条件查询数据，并且返回为对象为clzz参数所指定的结果集
	 * @param queryInfo
	 * @param clzz 需要指定的转换的对象
	 * @return
	 * @throws ServiceException
	 * 返回值：List
	 */
	public List findRecords(QueryInfo queryInfo,Class clzz) throws ServiceException;
	
	/**
	 * 描述：查询符合条件的数据库记录数
	 * @param queryInfo
	 * @return
	 * @throws ServiceException
	 * 返回值：int
	 */
	public int getRecordCount(QueryInfo queryInfo) throws ServiceException;
	
	/**
	 * 描述: 获得json对象字符串
	 * @param queryInfo
	 * @throws ServiceException
	 * @return
	 */
	public String getJsonData(QueryInfo queryInfo) throws ServiceException;
	
	/**
	 * @see 功能描述（必填）：返回指定查询条件的json结果集，不分页
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 3, 2011 11:13:04 AM</p>
	 * @param tableName
	 * @param whereMap
	 * @return
	 * 返回值：String
	 * @throws ServiceException 
	 */
	public String getJsonData(String hql,Map<String, Object> whereMap) throws ServiceException;
	
	/**
	 * @see 功能描述（必填）：返回指定表指定结果集的json格式
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 3, 2011 11:32:57 AM</p>
	 * @param objName
	 * @return
	 * @throws ServiceException
	 * 返回值：String
	 */
	public String getJsonData(String objName) throws ServiceException;
	
	/**
	 * 描述: 数据库新建或修改操作
	 * @param objList
	 * @throws ServiceException : void
	 */
	public int saveOrUpdateList(List objList) throws ServiceException;
		
	/**
	 * 描述: 新增或修改某个对象
	 * @param obj
	 * @throws ServiceException
	 */
	public int saveOrUpdateObj(Object obj) throws ServiceException;
	
	/**
	 * 描述: 保存某个对象
	 * @param obj
	 * @throws ServiceException : void
	 */
	public int addObj(Object obj) throws ServiceException;
	
	/**
	 * 描述: 修改某个对象
	 * @param obj
	 * @throws ServiceException : void
	 */
	public int modifyObj(Object obj) throws ServiceException;
	
	/**
	 * 描述: 根据sql语句查询,将结果记录转为clzz
	 * @param sql
	 * @param clzz
	 * @return
	 * @throws ServiceException : List
	 */
	public List findRecordsBySql(String sql, Class clzz) throws ServiceException;
	
	/**
	 * 描述： 获取JSON字符串（JDBC方式）
	 * @param queryInfo
	 * @param clzz
	 * @return
	 * @throws ServiceException
	 * 返回值：String
	 */
	public String getJsonDataJDBC(QueryInfo queryInfo,Class clzz) throws ServiceException;
	
	public Map callProc(String procedureName, SqlParameter[] sqlParameters,Map inParam) throws ServiceException;
	
	/**
	 * 描述：对对象属性值进行同步
	 * @param src，同步的源对象
	 * @param des 同步的目标对象
	 * @param synParams 需要同步的属性，Key为源对象的属性，value为目标对象的属性
	 * @return
	 * 返回值：boolean
	 */
	public boolean updateSynObj(Object src,Object des,Map<String,String> synParams) throws ServiceException;
	
	/**
	 * 描述: 批量删除，返回成功删除的ID集合
	 * @param ids
	 * @param objName
	 * @return : List<String>
	 */
	public List<String> deleteListReturnIds(List<String> ids,String objName);
	/**
	 * 描述: 批量删除，返回成功删除的ID集合
	 * @param ids
	 * @param objName
	 * @return : List<Integer>
	 */
	public List<Integer> deleteIntListReturnIds(List<Integer> ids,String objName);
	/**
	 * 
	 * @see 功能描述（必填）： 删除对象,并删除对应的文件,返回删除成功的id集合
	 * @see 处理流程（选填）：
	 * @see 调用例子（选填）：
	 * @see 相关说明文件：
	 * <p>返回值：List<String></p>
	 * @see <p>Author:azan</p>
	 * @see <p>Create Time:2012-3-15 上午11:03:30</p>
	 * @param tbName domain名称
	 * @param field 文件对应的属性名
	 * @param ids 要删除的id集合
	 * @return 返回删除成功的id集合
	 */
	public List<String> deleteObjAndFile(String tbName, String field, List<String> ids);
	/**
	 * 查询对象属性值
	 * @param domain 对象名
	 * @param field 属性名
	 * @param map 条件
	 * @return	如果存在，则返回属性值
	 * @throws ServiceException
	 */
	public Object findBeanFieldValue(String domain,String field,Map<String, String> map) throws ServiceException;
	/**
	 * 用途：主要用于页面输入框输入是否是唯一
	 * 说明：查询是否已存在值,并id不一至
	 * @param map key值存在 domain 表名,id 主键值,其他KEY 为 where条件
	 * @return 如果存在返回true,不存在返回false
	 */
	public boolean findIsExistValue(Map<String,String> map) throws ServiceException;
	
	/**
	 * 描述：删除对象的所对应的图片
	 * @param tbName 对象名
	 * @param id 主键
	 * @param field 需要更新的字段
	 * @return
	 * 返回值：boolean
	 * @throws ServiceException 
	 */
	public boolean deleteObjImg(String tbName,String id,String field) throws ServiceException;
	/**
	 * 获得对象对应属性值
	 * 用于下拉框存在分页时,查询对应的值
	 * @param objName 对象名
	 * @param id 主键
	 * @param field 需要查询的字段
	 * @return
	 * @throws ServiceException
	 */
	public Object getFieldValue(String objName,String id,String field) throws ServiceException;
	
	
	/**
	 * @see 功能描述（必填）：根据条件获取指定属性的值
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Feb 17, 2012 8:54:10 AM</p>
	 * @param objName：需要查询的表的名字
	 * @param fecthFieldJson：需要获取的属性的json字符串
	 * @param conditionJson：指定条件的json字符串
	 * @return
	 * @throws ServiceException
	 * 返回值：Object
	 */
	public Object getFieldValueByCondition(String objName,String fecthFieldJson,String conditionJson) throws ServiceException;
	/**
	 * 描述:通过集合ids查询表记录
	 * @param ids
	 * @param objName
	 * @return
	 * @throws ServiceException List
	 */
	public List getRecordsByIds(List<String> ids, String objName) throws ServiceException;
	
	
	/**
	 * 保存单个对象，返回被保存ID
	 * 主要用于前台需要获得对象保存后的ID
	 * @param objList
	 * @return
	 * @throws ServiceException
	 */
	public Object saveOrUpdateObjRId(List objList) throws ServiceException;
	
	/**
	 * 删除对象和关联的图片文件
	 * @param objName 对象
	 * @param ids ID集合
	 * @param paths 图片路径
	 * @throws ServiceException
	 */
	public void deleteObjAndPic(String objName,List<String> ids,List<String> paths) throws ServiceException;
	
	/**
	 * @see 功能描述（必填）：更新表的数据
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 25, 2011 4:10:47 PM</p>
	 * @param domain 需要更新的表
	 * @param paramMap 需要更新的字段，用Map映射，key：需要更新的字段，value：更新的值
	 * @param whereParam 需要更新的条件,key:条件字段，value，条件值
	 * @return 更新的记录数
	 * 返回值：int
	 * @throws ServiceException 
	 */
	
	public int updateTable(String domain,Map<String,Object> valueParam ,String whereJson) throws ServiceException;
	
	/**
	 * @see 功能描述（必填）：更新或者删除指定表的内容
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 9, 2011 10:31:54 AM</p>
	 * @param hql
	 * @param valueParam
	 * @param whereMap
	 * @return
	 * @throws ServiceException
	 * 返回值：int
	 */
	public int updateOrDelTable(String hql,Map<String, Object> whereMap) throws ServiceException;
	
	public List getListByCondition(String table, Map<String, Object> whereMap);
	
	public Object[] getSessionByDwr() throws ServiceException;
	
}
