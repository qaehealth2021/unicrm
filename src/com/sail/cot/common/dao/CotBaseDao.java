/**
 * 
 */
package com.sail.cot.common.dao;

import java.io.Serializable;
import java.sql.Connection;
import java.util.List;
import java.util.Map;

import org.hibernate.Session;
import org.springframework.jdbc.core.SqlParameter;

import com.jason.core.dao.AbstractQueryInfo;
import com.jason.core.dao.BaseDao;
import com.jason.core.exception.DAOException;
import com.sail.cot.query.QueryInfo;

/**
 * <p>Title: </p>
 * <p>Description: 操作数据库的通用类</p>
 * <p>Copyright: Copyright (c) 2008</p>
 * <p>Company: </p>
 * <p>Create Time: Jul 9, 2008 4:27:30 PM </p>
 * <p>Class Name: ExtBaseDao.java </p>
 * @author achui
 *AZAN
 */
/**
 * <p>Title: 旗航ERP管理系统（QHERP）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2010</p>
 * <p>Company: </p>
 * <p>Create Time: Oct 12, 2010 10:00:19 AM </p>
 * <p>Class Name: ErpBaseDao.java </p>
 * @author achui
 *
 */ 
public interface CotBaseDao extends BaseDao{
	
	List getRecords(String objName);
	
	String getJsonData(String objName) throws DAOException;
	
	int deleteRecordByIds(List ids, String objName) throws DAOException;
	
	int deleteRecordById(Serializable id, String objName) throws DAOException;
	
	int saveRecords(List records) throws DAOException;
	/**
	 * 
	 * @see 功能描述（必填）：
	 * @see 处理流程（选填）：
	 * @see 调用例子（选填）：
	 * @see 相关说明文件：
	 * <p>返回值：void</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Nov 3, 2011 5:29:20 PM</p>
	 * @param record
	 * @throws DAOException
	 */
	void saveOrUpdateRecord(Object record) throws DAOException;
	
	int updateRecords(List records)throws DAOException;
	
	int saveOrUpdateRecords(List records)throws DAOException;
	/**
	 * @deprecated findRecordsEx代替
	 */
	List findRecords(final AbstractQueryInfo queryInfo) throws DAOException;
	
	/**
	 * @see 功能描述（必填）：采用预处理方式查询记录
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 26, 2011 9:53:58 AM</p>
	 * @param queryInfo，需要设置query的whereMap参数，分别传递预处理需要的键值,并且字段的类型要对应
	 * @return
	 * @throws DAOException
	 * 返回值：List
	 */
	List findRecordsEx(final QueryInfo queryInfo) throws DAOException;
	
	/**
	 * @deprecated getRecordsCountEx代替
	 */
	int getRecordsCount(final AbstractQueryInfo queryInfo);
	
	/**
	 * @see 功能描述（必填）：采用预处理方式获取记录数
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 26, 2011 9:53:58 AM</p>
	 * @param queryInfo，需要设置query的whereMap参数，分别传递预处理需要的键值,并且字段的类型要对应
	 * @return
	 * @throws DAOException
	 * 返回值：List
	 */
	int getRecordsCountEx(final QueryInfo queryInfo);
	
	/**
	 * @deprecated 用findRecordsByHql代替
	 */
	List queryForLists(String select,Object[] values) throws DAOException;
	
	/**
	 * @deprecated 用findRecordsByHql代替
	 */
	List queryForLists(String select,int start,int limit, Object[] values);
	
	int getRecordsCountJDBC(final QueryInfo queryInfo);
	
	public List findRecordsJDBC(QueryInfo queryInfo, Class clzz)throws DAOException ;
	
	/**
	 * @deprecated findRecordsEx代替
	 */
	List findRecords(QueryInfo queryInfo,Class clzz) throws DAOException;
	
	List findRecordsEx(QueryInfo queryInfo,Class clzz) throws DAOException;
	
	public Connection getConnection();
	
	
	/**
	 * 描述： 获取Hibernate的Session
	 * @return
	 * 返回值：Session
	 */
	public Session getHibernateSession();
	
	/**
	 * @deprecated getJsonDataEx代替
	 */
	public String getJsonData(final QueryInfo queryInfo) throws DAOException;
	
	public String getJsonDataEx(final QueryInfo queryInfo) throws DAOException;
	
	/**
	 * 描述：
	 * @param queryInfo
	 * @param clzz
	 * @return
	 * @throws DAOException
	 * 返回值：String
	 */
	public String getJsonDataJDBC(final QueryInfo queryInfo,Class clzz) throws DAOException;

	/**
	 * 描述：
	 * @param queryInfo 查询条件
	 * @param values 对应的映射关系，映射关系的关键字，需要和查询条件对应的参数对应
	 * 如：update CotEmps set empName=:empName 这是 map的可以为empName
	 * 如果 需要更新语句需要 in 关键字，如 update CotEmps set empName = :empName where id in(:ids);
	 * map的key为empName，ids，其中ids对应的数据类型必须是List
	 * @param whereMap 查询的条件
	 * @return 影响的行数
	 * 返回值：int
	 */
	int executeUpdate(QueryInfo queryInfo,Map values,Map whereMap) throws DAOException;
	/**
	 * 描述：
	 * @param updateHql 查询条件
	 * @param values 对应的映射关系，映射关系的关键字，需要和查询条件对应的参数对应
	 * 如：update CotEmps set empName=:empName 这是 map的可以为empName
	 * 如果 需要更新语句需要 in 关键字，如 update CotEmps set empName = :empName where id in(:ids);
	 * map的key为empName，ids，其中ids对应的数据类型必须是List
	 * @param whereMap 查询条件
	 * @return 影响的行数
	 * 返回值：int
	 */
	int executeUpdate(String updateHql,Map values ,Map whereMap) throws DAOException;
	/**
	 * 更新
	 * @param updateHql
	 * @param values
	 * @return
	 * @throws DAOException
	 */
	int executeUpdate(String updateHql,Object...values) throws DAOException;
	
	/**
	 * 描述: 根据sql语句查询,将结果记录转为clzz
	 * @param sql
	 * @param clzz
	 * @return : List
	 */
	public List findRecordsBySql(String sql, Class clzz);
	
	/**
	 * 描述: jdbc执行sql语句更新数据库
	 * @param sql
	 * @return
	 * @throws DAOException : int
	 */
	public int updateRecordsBySql(String sql,Object...params)throws DAOException;
	
	/**
	 * 功能描述（必填）：调用存储过程
	 * 处理流程（选填）：
	 * 调用例子（必填）：
	 * 相关说明文件：
	 * @param procedureName 存储过程名
	 * @param sqlParameters 存储过程需要用到的参数和类型，封装在SqlParameter对象中，
	 * 		如 new SqlParameter("orderId",Types.Number);
	 * @param inParam 传递的参数，对应过程的产生，如 map.put("orderId",1);与过程中的参数名一致
	 * @return 
	 * @throws DAOException
	 * 返回值：Map 如果有带out参数，这返回参数对应的一个Map
	 * Author:achui
	 * Create Time:Oct 17, 2011 4:19:57 PM
	 */
	public Map callProc(String procedureName, SqlParameter[] sqlParameters,Map inParam) throws DAOException;
	
	/**
	 * @see 功能描述（必填）：根据指定条件查询相应的记录，
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：<p>例子： from CotEmps where id in (:id) 这里的:id就可以传一个list</p>
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 26, 2011 11:14:24 AM</p>
	 * @param hql 需要查询的语句
	 * @param whereMap  查询条件，如果是列表，可以用list表示，key查询语句的变量，value对应的值
	 * @return
	 * 返回值：List
	 */
	public List findRecordsByHql(String hql,Map<String,Object> whereMap);
	
	/**
	 * @see 功能描述（必填）：根据指定条件查询相应的记录，只返回一条，
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：<p>例子： from CotEmps where id in (:id) 这里的:id就可以传一个list</p>
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 26, 2011 11:14:24 AM</p>
	 * @param hql 需要查询的语句
	 * @param whereMap  查询条件，如果是列表，可以用list表示，key查询语句的变量，value对应的值
	 * @return
	 * 返回值：List
	 */
	public Object findUniqueRecordsByHql(String hql,Map<String,Object> whereMap);
	/**
	 * 
	 * @see 功能描述（必填）：通过HQL进行查询，有带分页功能
	 * @see 处理流程（选填）：
	 * @see 调用例子（选填）：
	 * @see 相关说明文件：
	 * <p>返回值：String</p> 返回分页格式的JSON string
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Nov 12, 2011 10:16:13 AM</p>
	 * @param hql
	 * @param whereMap
	 * @param start
	 * @param limit
	 * @return
	 */
	public String findRecordsByHql(String hql,Map<String, Object> whereMap, int start, int limit);
	/**
	 * 
	 * @see 功能描述（必填）：通过HQL进行查询，有带分页功能
	 * @see 处理流程（选填）：
	 * @see 调用例子（选填）：
	 * @see 相关说明文件：
	 * <p>返回值：String</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Feb 4, 2012 11:36:13 AM</p>
	 * @param hql
	 * @param whereMap
	 * @param start
	 * @param limit
	 * @param excludes
	 * @return
	 */
	public String findRecordsByHql(String hql,Map<String, Object> whereMap, int start, int limit,String[] excludes);
}
