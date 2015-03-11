/**
 * 
 */
package com.sail.cot.service.system.emp;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.jason.core.exception.DAOException;
import com.sail.cot.common.service.BaseSerivce;
import com.sail.cot.domain.CotEmps;
import com.sail.cot.entity.CheckStatisticsTreeNode;
import com.sail.cot.entity.StatisticsTreeNode;

/**
 * 系统登录接口
 * 
 * @Title: 旗航外贸管理软件V8.0
 * @Description:
 * @Copyright: Copyright (c) 2011
 * @Company: 厦门市旗航软件有限公司
 * @Create Time: Nov 9, 2011 9:40:54 AM
 * @Class Name: CotLoginService.java
 * @author azan
 * 
 */
public interface CotLoginService extends BaseSerivce {

	/**
	 * 
	 * @Description：系统登录验证
	 * @Flow：
	 * @Example：
	 * @Files：
	 * @author:azan
	 * @Create:Nov 9, 2011 10:01:42 AM
	 * @param empsId
	 * @param empsPwd
	 * @param otp
	 * @return int 【0--代表工号不存在】 【1--代表密码不正确】 【如果大于100--代表成功】 【3--代表已经达到最大登录人数】
	 *         【4--，5代表还没注册】 【6--员工状态为离职】 【7--临时试用登录（走试用流程）】 【8--该员工需要命令牌,但是没输入】
	 *         【9--输入了错误的命令牌】 【10--一个命令牌重复登录】
	 */
	public int login(String empsId, String empsPwd, String otp);
	
	/**
	 * @see 功能描述（必填）：设置员工的登录缓存，用于在线人数数量的判断用,SESSIONID为key，value：当前时间戳
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 11, 2011 5:46:31 PM</p>
	 * @param sessionId:sessionId
	 * @param netId:comet的连接id
	 * @param remove:是否删除sessionId对应的缓存，true:删除，false：不删除，直接添加
	 * 当前时间戳，默认45秒更新一次
	 * 返回值：void
	 */
	public void setLoginEmpCache(String sessId,boolean remove);
	
	/**
	 * 
	 * @Description：重新修改员工密码
	 * @Flow：
	 * @Example：
	 * @Files：
	 * @author:azan
	 * @Create:Nov 17, 2011 10:23:12 AM
	 * @param empId
	 * @param newPwd
	 * @throws Exception void【】
	 */
	public void updateEmpPassWord(Integer empId,String newPwd) throws Exception;
	
	public void addToSysLog(CotEmps curEmps, Integer opType, String ip,String sessionId) throws DAOException;
	
	/**
	 * 查询登录人数
	 * @Method: findLoginNum
	* @Description: 
	* @return : Integer
	 */
	public Integer findLoginNum();
	
	public String getLoginTree(Integer flag) throws DAOException;
	
	/**
	 * @Method: modifyPwdByEmpId
	* @Description: 
	* @param oldPwd
	* @param newPwd
	* @return : int 1:旧密码错误;0:修改密码成功
	 */
	public int modifyPwdByEmpId(String oldPwd, String newPwd);
	
	/**
	 * 删除登录信息
	 * @Method: deleteLoginInfo
	* @Description: 
	* @throws DAOException : void
	 */
	public void deleteLoginInfo() throws DAOException;
	
	// 根据IP地址删除
	public void deleteLoginInfos(String ip);
	
	public void logDo(CotEmps emps,HttpServletRequest request)throws DAOException;
	
	//退出系统
	public void logOut()throws DAOException;
	
	public List<StatisticsTreeNode> getCompanyTreeNode();
	
	public List<CheckStatisticsTreeNode> getOnlineCompanyTreeNode();
	
	public List<StatisticsTreeNode> getDeptTreeNode(String treeLvId);
	
	public List<CheckStatisticsTreeNode> getOnlineDeptTreeNode(String treeLvId);
	
	public List<StatisticsTreeNode> getEmpTreeNode(String treeLvId);
	
	public List<CheckStatisticsTreeNode> getOnlineEmpTreeNode(String treeLvId);
	
	/**
	 * 查找员工英文名含有empName 的员工树路径(例如:/root_0/company_10/dept_2/emp_3)
	 * @Method: findTreePathByEmpName
	* @Description: 
	* @param empName
	* @return : List<String>
	 */
	public List<String> findTreePathByEmpName(String empName);
	
	public List<String> findTreePathByArea(Integer flag,String key);
	
	public List<String> findTreePathBySaArea(Integer custId,Integer flag,String key);
	
	public void sendMsg(String ids, String msg);
	
	public List<CheckStatisticsTreeNode> getFileCompanyTreeNode();
	
	public List<CheckStatisticsTreeNode> getFileDeptTreeNode(String treeLvId);
	
	public List<CheckStatisticsTreeNode> getFileEmpTreeNode(String treeLvId);
	
	public List<CheckStatisticsTreeNode> getFileShareCompanyTreeNode(int oneFileId,int[] empsIds);
	
	public List<CheckStatisticsTreeNode> getFileShareDeptTreeNode(String treeLvId,int oneFileId,int[] empsIds);
	
	public List<CheckStatisticsTreeNode> getFileShareEmpTreeNode(String treeLvId,int oneFileId,int[] empsIds);
	
}
