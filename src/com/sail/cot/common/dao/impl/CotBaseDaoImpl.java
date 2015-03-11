/**
 * 
 */
package com.sail.cot.common.dao.impl;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.apache.commons.lang.StringUtils;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;

import com.jason.core.dao.AbstractDAO;
import com.jason.core.dao.AbstractQueryInfo;
import com.jason.core.exception.DAOException;
import com.sail.cot.common.dao.CotBaseDao;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.common.util.ExceptionStackTracePaser;
import com.sail.cot.query.QueryInfo;
import com.sail.cot.util.GridServerHandler;

/**
 * <p>Title: 旗航ERP管理系统（QHERP）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2010</p>
 * <p>Company: </p>
 * <p>Create Time: Jan 29, 2011 4:17:25 PM </p>
 * <p>Class Name: CotBaseDaoImpl.java </p>
 * @author achui
 *
 */
public class CotBaseDaoImpl extends AbstractDAO implements CotBaseDao{

	/* (non-Javadoc)
	 * @see com.sail.cot.dao.CotBaseDao#callProc(java.lang.String, java.lang.Object[])
	 */
	public Map callProc(String procedureName, SqlParameter[] sqlParameters,Map inParam) throws DAOException {
		DataSource ds = (DataSource) ContextUtil.getBean("dataSource");
		SimpleJdbcCall jdbcCall = new SimpleJdbcCall(ds);
		jdbcCall.withProcedureName(procedureName);
		jdbcCall.withoutProcedureColumnMetaDataAccess();
		for(SqlParameter sqlParameter : sqlParameters){
			jdbcCall.addDeclaredParameter(sqlParameter);
		}
		Map returMap = jdbcCall.execute(inParam);
		return returMap;
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.dao.CotBaseDao#deleteRecordById(java.io.Serializable, java.lang.String)
	 */
	public int deleteRecordById(Serializable id, String objName)
			throws DAOException {
		List ids = new ArrayList();
		ids.add(id);
		return this.deleteRecordByIds(ids, objName);
		
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.dao.CotBaseDao#deleteRecordByIds(java.util.List, java.lang.String)
	 */
	public int deleteRecordByIds(List ids, String objName) throws DAOException {
		try {
			return (Integer)super.getHibernateTemplate().execute(new BatchDeleteCallback(ids, objName));
		} catch (Exception ex) {
			String msg = ExceptionStackTracePaser.paserStactTrace(ex);
			throw new DAOException("error: delete fail,"+msg);
		}
		
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.dao.CotBaseDao#executeUpdate(com.sail.cot.query.QueryInfo, java.util.Map)
	 */
	public int executeUpdate(QueryInfo queryInfo, Map values ,Map whereMap)
			throws DAOException {
		try {
			String select = queryInfo.getSelectString() + (queryInfo.getQueryString() == null ? "" : queryInfo.getQueryString());
			Integer result = (Integer) super.getHibernateTemplate().execute(
									new BatchUpdatePropertyCallBack(select,values,whereMap));
			return result;
		} catch (DataAccessException ex) {
			String msg = ExceptionStackTracePaser.paserStactTrace(ex);
			throw new DAOException("批量属性更新异常:" + msg);
		}
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.dao.CotBaseDao#executeUpdate(java.lang.String, java.util.Map)
	 */
	public int executeUpdate(String updateHql, Map values,Map whereMap) throws DAOException{
		try {
			Integer result = (Integer) super.getHibernateTemplate().execute(
									new BatchUpdatePropertyCallBack(updateHql,values,whereMap));
			return result;
		} catch (DataAccessException ex) {
			String msg = ExceptionStackTracePaser.paserStactTrace(ex);
			throw new DAOException("批量属性更新异常:" + msg);
		}
	}
	public int executeUpdate(String updateHql,Object...values) throws DAOException{
//		try{
			return super.getHibernateTemplate().bulkUpdate(updateHql, values);
//		} catch (DataAccessException ex) {
//			String msg = ExceptionStackTracePaser.paserStactTrace(ex);
//			throw new DAOException("批量属性更新异常:" + msg);
//		}
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.dao.CotBaseDao#findRecords(com.jason.core.dao.AbstractQueryInfo)
	 */
	/**
	 * @deprecated findRecordsEx代替
	 */
	public List findRecords(AbstractQueryInfo queryInfo) throws DAOException {
		queryInfo.populate();
		Query query = null;
		List records = null;
		StringBuffer queryBuffer = new StringBuffer();
		queryBuffer.append(queryInfo.getSelectString());
		if(StringUtils.isNotEmpty(queryInfo.getQueryString())){
			queryBuffer.append(queryInfo.getQueryString());
		}
		if (StringUtils.isNotEmpty(queryInfo.getOrderString())) {
			queryBuffer.append(queryInfo.getOrderString());
		} else {
			// 默认按id排序
			queryBuffer.append(" order by id desc");
		}
		try {
			System.out.println("-------" + queryBuffer.toString());
			Session session = getHibernateTemplate().getSessionFactory().openSession();
			query = session.createQuery(queryBuffer.toString());
			query.setProperties(queryInfo);
			query.setFirstResult(queryInfo.getStartIndex());
			query.setMaxResults(queryInfo.getCountOnEachPage());
			query.setCacheable(super.isCacheQuery());
			records = query.list();
			session.flush();
			session.close();
		} catch (HibernateException he) {
			String msg = ExceptionStackTracePaser.paserStactTrace(he);
			throw new DAOException("find fail,"+msg);
		}
		return records;
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.dao.CotBaseDao#findRecords(com.sail.cot.query.QueryInfo, java.lang.Class)
	 */
	/**
	 * @deprecated findRecordsEx代替
	 */
	public List findRecords(QueryInfo queryInfo, Class clzz)
			throws DAOException {
		queryInfo.populate();
		SQLQuery query = null;
		List records = null;
		StringBuffer queryBuffer = new StringBuffer();
		queryBuffer.append(queryInfo.getSelectString());
		if(StringUtils.isNotEmpty(queryInfo.getQueryString())){
			queryBuffer.append(queryInfo.getQueryString());
		}
		if (StringUtils.isNotBlank(queryInfo.getOrderString())) {
			queryBuffer.append(queryInfo.getOrderString());
		} else {
			// 默认按id排序
			queryBuffer.append(" order by id desc");
		}
		try {
			System.out.println("-------" + queryBuffer.toString());
			Session session = getHibernateTemplate().getSessionFactory().openSession();
			query = session.createSQLQuery(queryBuffer.toString());
			query.setProperties(queryInfo);
			query.setFirstResult(queryInfo.getStartIndex());
			query.setMaxResults(queryInfo.getCountOnEachPage());
			// if not use level 2 cache it will invoke query.list()
			// fix me:it will be invoked at here? or use global
			// setCacheQuery(..)?
			query.setCacheable(super.isCacheQuery());
			records = query.addEntity(clzz).list();
			session.flush();
			session.close();
		} catch (HibernateException he) {
			String msg = ExceptionStackTracePaser.paserStactTrace(he);
			throw new DAOException("find fail,"+msg);
		}
		return records;
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.dao.CotBaseDao#findRecordsBySql(java.lang.String, java.lang.Class)
	 */
	public List findRecordsBySql(String sql, Class clzz) {
		if(clzz==null){
			List res = super.getSession().createSQLQuery(sql).list();
			return res;
		}else{
			List res = super.getSession().createSQLQuery(sql).addEntity(clzz).list();
			return res;
		}
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.dao.CotBaseDao#findRecordsJDBC(com.sail.cot.query.QueryInfo, java.lang.Class)
	 */
	
	public List findRecordsJDBC(QueryInfo queryInfo, Class clzz)
			throws DAOException {
		StringBuffer queryBuffer = new StringBuffer();
		queryBuffer.append(queryInfo.getSelectString()).append(queryInfo.getQueryString());
		// 设置每页翻页记录数
		Page page = new Page();
		SpringJdbcPagenation jdbcpage = new SpringJdbcPagenation();
		int currentPage = 0;
		currentPage = (queryInfo.getStartIndex() + queryInfo.getCountOnEachPage()) / queryInfo.getCountOnEachPage();
		page.setCurrentPage(currentPage);
		page.setPageSize(queryInfo.getCountOnEachPage());
		jdbcpage.setPage(page);
		JdbcRowMapper rowMapper = new JdbcRowMapper(clzz);

		Connection conn = super.getSession().connection();
		return jdbcpage.queryForPage(queryBuffer.toString(), rowMapper, conn);
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.dao.CotBaseDao#getConnection()
	 */
	public Connection getConnection() {
		return super.getSession().connection();
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.dao.CotBaseDao#getHibernateSession()
	 */
	public Session getHibernateSession() {
		return super.getSession();
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.dao.CotBaseDao#getJsonData(com.sail.cot.query.QueryInfo)
	 */
	/**
	 * @deprecated getJsonDataEx代替
	 */
	public String getJsonData(QueryInfo queryInfo) throws DAOException {
		try {
			GridServerHandler gd = null;
			if (queryInfo.getExcludes() != null)
				gd = new GridServerHandler(queryInfo.getExcludes());
			else
				gd = new GridServerHandler();
			List res = null;
			if (queryInfo.getClzz() != null)
				res = this.findRecords(queryInfo, queryInfo.getClzz());
			else
				res = this.findRecords(queryInfo);
			int count = this.getRecordsCount(queryInfo);
			gd.setData(res);
			gd.setTotalCount(count);
			return gd.getLoadResponseText();
		} catch (DAOException ex) {
			String msg = ExceptionStackTracePaser.paserStactTrace(ex);
			throw new DAOException("DAOException:" + msg);
		}
	}
	@SuppressWarnings("unchecked")
	public String getJsonData(String objName) throws DAOException {
		try {
			GridServerHandler gd = new GridServerHandler();
			List res = this.getRecords(objName);
			gd.setData(res);
			gd.setTotalCount(res.size());
			return gd.getLoadResponseText();
		} catch (Exception ex) {
			String msg = ExceptionStackTracePaser.paserStactTrace(ex);
			throw new DAOException("DAOException:" + msg);
		}
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.dao.CotBaseDao#getJsonDataJDBC(com.sail.cot.query.QueryInfo, java.lang.Class)
	 */
	public String getJsonDataJDBC(QueryInfo queryInfo, Class clzz)
			throws DAOException {
		try {
			GridServerHandler gd = null;
			if (queryInfo.getExcludes() != null)
				gd = new GridServerHandler(queryInfo.getExcludes());
			else
				gd = new GridServerHandler();
			List res = null;
			res = this.findRecordsJDBC(queryInfo, clzz);
			int count = this.getRecordsCountJDBC(queryInfo);
			gd.setData(res);
			gd.setTotalCount(count);
			return gd.getLoadResponseText();
		} catch (DAOException ex) {
			String msg = ExceptionStackTracePaser.paserStactTrace(ex);
			throw new DAOException("DAOException:" + msg);
		}
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.dao.CotBaseDao#getRecords(java.lang.String)
	 */
	public List getRecords(String objName) {
		return super.getHibernateTemplate().find("from " + objName);
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.dao.CotBaseDao#getRecordsCount(com.jason.core.dao.AbstractQueryInfo)
	 */
	/**
	 * @deprecated getRecordsCount代替
	 */
	public int getRecordsCount(AbstractQueryInfo queryInfo) {
		int count = 0;
		String countQuery = queryInfo.getCountQuery();
		if (countQuery == null) {
			StringBuffer select = new StringBuffer();
			select.append(StringUtils.replace(queryInfo.getSelectString(), "select", "select count("));
			select.append(')');
			select.append(queryInfo.getQueryString());
			countQuery = select.toString();
		}
		System.out.println("getCountQuery" + queryInfo.getCountQuery());
		Session session = getHibernateTemplate().getSessionFactory().openSession();
		Query query = session.createQuery(queryInfo.getCountQuery());
		query.setProperties(queryInfo);
		query.setCacheable(super.isCacheQuery());
		// count = query.list().size();
		count = ((Long) query.list().get(0)).intValue();
		session.flush();
		session.close();
		return count;
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.dao.CotBaseDao#getRecordsCountJDBC(com.sail.cot.query.QueryInfo)
	 */
	public int getRecordsCountJDBC(QueryInfo queryInfo) {
		int res = 0;
		Connection conn = null;
		PreparedStatement pstm = null;
		ResultSet rs = null;
		try {
			conn = super.getSession().connection();
			pstm = conn.prepareStatement(queryInfo.getCountQuery());
			rs = pstm.executeQuery();
			while (rs.next()) {
				res = rs.getInt(1);
			}

		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (rs != null)
				try {
					rs.close();
				} catch (SQLException e1) {
					e1.printStackTrace();
				}
			if (pstm != null)
				try {
					pstm.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			if(conn == null){
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		return res;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.ptn.ext.dao.ExtBaseDao#queryForLists(java.lang.String,
	 *      java.lang.Object[])
	 */
	/**
	 * @deprecated 用findRecordsByHql代替
	 */
	@SuppressWarnings("unchecked")
	public List queryForLists(final String select, final Object[] values) throws DAOException {
		List res = null;
		try {
			Session session = getHibernateTemplate().getSessionFactory()
					.openSession();
			Query query = session.createQuery(select);
			if (values != null) {
				for (int i = 0; i < values.length; i++){
					if (values[i] instanceof List) {
						//因为setParameterList需要别名,不能指定位置
						//例如select obj from CotElements obj where obj.eleId in (:eleIds)
						//则在传递的list最后追加一个元素,名字是别名eleIds,再删除这元素
						List list = (List) values[i];
						String temp = (String) list.get(list.size()-1);
						list.remove(list.size()-1);
						query.setParameterList(temp, list);
					} else{
						query.setParameter(i, values[i]);
					}
				}
			}
			res = query.list();
			session.flush();
			session.close();
		} catch (Exception ex) {
			ex.printStackTrace();
			String msg = ExceptionStackTracePaser.paserStactTrace(ex);
			throw new DAOException("DAOException:" + msg);
		}
		return res;
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.dao.CotBaseDao#queryForLists(java.lang.String, int, int, java.lang.Object[])
	 */
	/**
	 * @deprecated 用findRecordsByHql代替
	 */
	@SuppressWarnings("unchecked")
	public List queryForLists(final String select, int start, int limit,
			final Object[] values) {
		List res = null;
		try {
			Session session = getHibernateTemplate().getSessionFactory()
					.openSession();
			Query query = session.createQuery(select);
			if (values != null) {
				for (int i = 0; i < values.length; i++){
					if (values[i] instanceof List) {
						//因为setParameterList需要别名,不能指定位置
						//例如select obj from CotElements obj where obj.eleId in (:eleIds)
						//则在传递的list最好追加一个元素,名字是别名eleIds,再删除这元素
						List list = (List) values[i];
						String temp = (String) list.get(list.size()-1);
						list.remove(list.size()-1);
						query.setParameterList(temp, list);
					} else{
						query.setParameter(i, values[i]);
					}
				}
			}
			query.setFirstResult(start);
			query.setMaxResults(limit);
			res = query.list();
			session.flush();
			session.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return res;
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.dao.CotBaseDao#saveOrUpdateRecords(java.util.List)
	 */
	public int saveOrUpdateRecords(List records) throws DAOException {
		try {
			return (Integer)super.getHibernateTemplate().execute(new BatchSoUCallback(records));
		} catch (DataAccessException ex) {
			String msg = ExceptionStackTracePaser.paserStactTrace(ex);
			throw new DAOException("DataAccessException:" + msg);
		}
		
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.common.dao.CotBaseDao#saveOrUpdateRecord(java.lang.Object)
	 */
	public void saveOrUpdateRecord(Object record) throws DAOException {
		List<Object> records = new ArrayList<Object>();
		records.add(record);
		this.saveOrUpdateRecords(records);
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.dao.CotBaseDao#saveRecords(java.util.List)
	 */
	public int saveRecords(List records) throws DAOException {
		try {
			return (Integer)super.getHibernateTemplate().execute(new BatchInsertCallback(records));
		} catch (DataAccessException ex) {
			String msg = ExceptionStackTracePaser.paserStactTrace(ex);
			throw new DAOException("DataAccessException:" + msg);
		}
		
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.dao.CotBaseDao#updateRecords(java.util.List)
	 */
	public int updateRecords(List records) throws DAOException {
		try {
			return (Integer)super.getHibernateTemplate().execute(new BatchUpdateCallback(records));
		} catch (DataAccessException ex) {
			String msg = ExceptionStackTracePaser.paserStactTrace(ex);
			throw new DAOException("DataAccessException:" + msg);
		}
		
		
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.dao.CotBaseDao#updateRecordsBySql(java.lang.String)
	 */
	public int updateRecordsBySql(String sql,Object...params) throws DAOException {
		try {
			SQLQuery sqlQuery = super.getSession().createSQLQuery(sql);
			if (params != null) {
				for (int i = 0; i < params.length; i++) {
					sqlQuery.setParameter(i, params[i]);
				}
			}
			int result = sqlQuery.executeUpdate();
			return result;
		} catch (HibernateException he) {
			String msg = ExceptionStackTracePaser.paserStactTrace(he);
			throw new DAOException("find fail,"+msg);
		}
	}
	

	/* (non-Javadoc)
	 * @see com.sail.cot.common.dao.CotBaseDao#findRecordsEx(com.sail.cot.query.QueryInfo)
	 */
	
	public List findRecordsEx(QueryInfo queryInfo) throws DAOException {
		queryInfo.populate();
		Query query = null;
		List records = null;
		StringBuffer queryBuffer = new StringBuffer();
		queryBuffer.append(queryInfo.getSelectString());
		if(StringUtils.isNotEmpty(queryInfo.getQueryString())){
			queryBuffer.append(queryInfo.getQueryString());
		}
		if (StringUtils.isNotEmpty(queryInfo.getOrderString())) {
			queryBuffer.append(queryInfo.getOrderString());
		} else {
			// 默认按id排序
			queryBuffer.append(" order by id desc");
		}
		try {
			System.out.println("-------" + queryBuffer.toString());
			Session session = getHibernateTemplate().getSessionFactory().openSession();
			query = session.createQuery(queryBuffer.toString());
			query.setProperties(queryInfo);
			query.setFirstResult(queryInfo.getStartIndex());
			query.setMaxResults(queryInfo.getCountOnEachPage());
			query.setCacheable(super.isCacheQuery());
			//设置预处理参数
			setQueryInfo(query, queryInfo.getWhereMap());
			records = query.list();
			session.flush();
			session.close();
		} catch (HibernateException he) {
			String msg = ExceptionStackTracePaser.paserStactTrace(he);
			throw new DAOException("find fail,"+msg);
		}
		return records;
	}
	
	/**
	 * @see 功能描述（必填）：将查询条件设置到query对象中，实现预处理过程
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 26, 2011 10:04:06 AM</p>
	 * @param query
	 * @param whereMap
	 * 返回值：void
	 */
	private void setQueryInfo(Query query,Map<String,Object> whereMap){
		if(whereMap == null || whereMap.isEmpty()) return;
		Iterator<String> iterator = whereMap.keySet().iterator();
		while(iterator.hasNext()){
			String key = iterator.next();
			Object obj = whereMap.get(key);
			if(obj == null || obj.equals("")) continue;
			if(obj instanceof List){
				query.setParameterList(key, (List)obj);
			}else{
				query.setParameter(key, obj);
			}
		}
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.common.dao.CotBaseDao#getRecordsCountEx(com.sail.cot.query.QueryInfo)
	 */
	public int getRecordsCountEx(QueryInfo queryInfo) {
		int count = 0;
		String countQuery = queryInfo.getCountQuery();
		if (countQuery == null) {
			StringBuffer select = new StringBuffer();
			
			boolean chk=queryInfo.getSelectString().startsWith("select");
			if(!chk){
				select.append("select count(*)");
				select.append(queryInfo.getSelectString());
			}else{
				select.append(StringUtils.replace(queryInfo.getSelectString(), "select", "select count("));
				select.append(')');
			}
			if(queryInfo.getQueryString()!=null){
				select.append(queryInfo.getQueryString());
			}
//			countQuery = select.toString();
			queryInfo.setCountQuery(select.toString());
		}
		Session session = getHibernateTemplate().getSessionFactory().openSession();
		Query query = session.createQuery(queryInfo.getCountQuery());
		query.setProperties(queryInfo);
		query.setCacheable(super.isCacheQuery());
		//设置预处理参数
		setQueryInfo(query, queryInfo.getWhereMap());
		count = ((Long) query.list().get(0)).intValue();
		session.flush();
		session.close();
		return count;
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.common.dao.CotBaseDao#findRecordsEx(com.sail.cot.query.QueryInfo, java.lang.Class)
	 */
	public List findRecordsEx(QueryInfo queryInfo, Class clzz)
			throws DAOException {
		queryInfo.populate();
		SQLQuery query = null;
		List records = null;
		StringBuffer queryBuffer = new StringBuffer();
		queryBuffer.append(queryInfo.getSelectString());
		if(StringUtils.isNotEmpty(queryInfo.getQueryString())){
			queryBuffer.append(queryInfo.getQueryString());
		}
		if (StringUtils.isNotBlank(queryInfo.getOrderString())) {
			queryBuffer.append(queryInfo.getOrderString());
		} else {
			// 默认按id排序
			queryBuffer.append(" order by id desc");
		}
		try {
			System.out.println("-------" + queryBuffer.toString());
			Session session = getHibernateTemplate().getSessionFactory().openSession();
			query = session.createSQLQuery(queryBuffer.toString());
			query.setProperties(queryInfo);
			query.setFirstResult(queryInfo.getStartIndex());
			query.setMaxResults(queryInfo.getCountOnEachPage());
			query.setCacheable(super.isCacheQuery());
			//设置预处理参数
			setQueryInfo(query, queryInfo.getWhereMap());
			records = query.addEntity(clzz).list();
			session.flush();
			session.close();
		} catch (HibernateException he) {
			String msg = ExceptionStackTracePaser.paserStactTrace(he);
			throw new DAOException("find fail,"+msg);
		}
		return records;
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.common.dao.CotBaseDao#getJsonDataEx(com.sail.cot.query.QueryInfo)
	 */
	public String getJsonDataEx(QueryInfo queryInfo) throws DAOException {
		try {
			GridServerHandler gd = null;
			if (queryInfo.getExcludes() != null)
				gd = new GridServerHandler(queryInfo.getExcludes());
			else
				gd = new GridServerHandler();
			List res = null;
			if (queryInfo.getClzz() != null)
				res = this.findRecordsEx(queryInfo, queryInfo.getClzz());
			else
				res = this.findRecordsEx(queryInfo);
			int count = this.getRecordsCountEx(queryInfo);
			gd.setData(res);
			gd.setTotalCount(count);
			return gd.getLoadResponseText();
		} catch (DAOException ex) {
			String msg = ExceptionStackTracePaser.paserStactTrace(ex);
			throw new DAOException("DAOException:" + msg);
		}
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.common.dao.CotBaseDao#findRecords(java.lang.String, java.util.Map)
	 */
	public List findRecordsByHql(String hql, Map<String, Object> whereMap) {
		Session session = getHibernateTemplate().getSessionFactory().openSession();
		//如果是查询count不排序
		if(hql.toLowerCase().indexOf("order by") == -1 && hql.toLowerCase().indexOf("count") == -1){
			hql += " order by id desc";
		}
		Query query = session.createQuery(hql);
		setQueryInfo(query, whereMap);
		List list = query.list();
		session.flush();
		session.close();
		return list;
	}

	public Object findUniqueRecordsByHql(String hql, Map<String, Object> whereMap) {
		Session session = getHibernateTemplate().getSessionFactory().openSession();
		if(hql.toLowerCase().indexOf("order by") == -1){
			hql += " order by id desc";
		}
		Query query = session.createQuery(hql);
		setQueryInfo(query, whereMap);
		Object obj = query.uniqueResult();
		session.flush();
		session.close();
		return obj;
	}
	/* (non-Javadoc)
	 * @see com.sail.cot.common.dao.CotBaseDao#findRecordsBySql(java.lang.String, int, int, java.util.Map)
	 */
	public List findRecordsByHql(String select, int start, int limit,
			Map<String, Object> whereMap) {
		Session session = getHibernateTemplate().getSessionFactory().openSession();
		if(select.toLowerCase().indexOf("order by") == -1){
			select += " order by id desc";
		}
		Query query = session.createQuery(select);
		query.setFirstResult(start);
		query.setMaxResults(limit);
		setQueryInfo(query, whereMap);
		List list = query.list();
		session.flush();
		session.close();
		return list;
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.common.dao.CotBaseDao#findRecordsByHql(java.lang.String, java.util.Map, int, int)
	 */
	public String findRecordsByHql(String hql,Map<String, Object> whereMap, int start, int limit){
		return this.findRecordsByHql(hql, whereMap, start, limit, null);
	}
	
	@SuppressWarnings("unchecked")
	public String findRecordsByHql(String hql,
			Map<String, Object> whereMap, int start, int limit,String[] excludes){
		Session session = getHibernateTemplate().getSessionFactory().openSession();
		if(hql.toLowerCase().indexOf("order by") == -1){
			hql += " order by id desc";
		}
		Query query = session.createQuery(hql);
		query.setFirstResult(start);
		query.setMaxResults(limit);
		setQueryInfo(query, whereMap);
		List list = query.list();
		
		GridServerHandler gd = new GridServerHandler(excludes);
		gd.setData(list);
		
		hql = "select count(*) "+hql.substring(hql.indexOf("from"));
		//hql = hql.toLowerCase();
		int index = hql.indexOf("order by");
		if(index > -1){
			hql = hql.substring(0,index);
		}
		query = session.createQuery(hql);
		setQueryInfo(query, whereMap);
		list = query.list();
		
		gd.setTotalCount(Integer.parseInt(list.get(0).toString()));
		
		session.flush();
		session.close();
		return gd.getLoadResponseText();
	}

}
