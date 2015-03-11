/**
 * 
 */
package com.sail.cot.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;


/**
 * <p>Title: 旗航ERP管理系统（QHERP）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2010</p>
 * <p>Company: </p>
 * <p>Create Time: Dec 8, 2010 4:18:36 PM </p>
 * <p>Class Name: DBUtil.java </p>
 * @author achui
 *
 */
public class DBUtil {
	
	private static Connection conn = null;
	private static Connection getSQLLiteConnection(){
		try{
			Class.forName("org.sqlite.JDBC");
	       
	       //建立一个数据库名zieckey.db的连接，如果不存在就在当前目录下创建之
			if(conn == null){
				String classPath = DBUtil.class.getResource("/").toString();
				String systemPath = classPath.substring(6, classPath.length() - 16);
				String connStr ="jdbc:sqlite:"+systemPath+"/Quote.db";
				System.out.println(connStr);
				conn = DriverManager.getConnection(connStr);
			}
		}
		catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}
		return conn;
	}
	private static boolean closeConn(){
		if(conn != null){
			try {
				conn.setAutoCommit(true);
				conn.close();
				conn = null;
				return true;
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return false;
			}
		}
		return false;
	}
	public static int executeSQL(String sql){
		int i = -1;
		conn = DBUtil.getSQLLiteConnection();
		Statement stat  = null;
		try {
			stat = conn.createStatement();
			i = stat.executeUpdate(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			if(stat != null)
				try {
					stat.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			DBUtil.closeConn();
		}
		return i;
	}
	public static int executeSQL(List<String> sqlList){
		int i = -1;
		conn = DBUtil.getSQLLiteConnection();
		Statement stat  = null;
		int count = 0;
		try{
			conn.setAutoCommit(false);
			stat = conn.createStatement();
			for(String sql :sqlList){
				stat.addBatch(sql);
				count++;
				//10条提交一次
				if(count == 9){
					stat.executeBatch();
					conn.commit();
					stat.clearBatch();
					count = 0;
				}
			}
			stat.executeBatch();
			conn.commit();
			i = 1;
		}catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}finally{
			
			if(stat != null)
				try {
					stat.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			DBUtil.closeConn();
		}
		return i;
	}
}
