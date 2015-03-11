/**
 * @(#) BatchDeleteCallback.java 2007-6-25
 * 
 * Copyright 2006 ptnetwork
 */
package com.sail.cot.common.dao.impl;

import java.sql.SQLException;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

/**
 * <p>Title: 不锈钢外贸系统</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2006</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * @author achui
 *
 */
public class BatchDeleteCallback implements HibernateCallback {
	private List ids;
	private String objectName;
	
	public BatchDeleteCallback(List ids, String objectName) {
		this.ids = ids;
		this.objectName = objectName;
	}

	public Object doInHibernate(Session session) throws HibernateException, SQLException {
		session.clear();
		StringBuffer sb = new StringBuffer("delete from ");
		sb.append(this.objectName).append( " where id in(:ids)");
		Query query = session.createQuery(sb.toString());
		query.setParameterList("ids", ids);
		int res = query.executeUpdate();
		session.flush();
		session.clear();
		return res;
	}

}
