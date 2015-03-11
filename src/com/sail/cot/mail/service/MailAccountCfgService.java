package com.sail.cot.mail.service;

import java.util.List;

import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.domain.CotMailAccountCfg;

/**
 * 
 * <p>Title: 旗航 MailServer-2.0</p>
 * <p>Description:</p> 邮件账号
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Jan 31, 2012 2:13:20 PM </p>
 * <p>Class Name: MailAccountCfgService.java </p>
 * @author zhao
 *
 */
public interface MailAccountCfgService {
	/**
	 * 
	 * @see 功能描述（必填）：获得接收账号，如果与公共邮箱账号一样，则取公共邮箱
	 * <p>返回值：CotMailAccountCfg</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Jan 31, 2012 2:42:31 PM</p>
	 * @param cfgId
	 * @return
	 */
	public CotMailAccountCfg getReciveAccount(Integer cfgId) throws ServiceException;
	/**
	 * 
	 * @see 功能描述（必填）：获得接收账号ID，如果与公共邮箱账号一样，则取公共邮箱ID
	 * <p>返回值：CotMailAccountCfg</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Jan 31, 2012 2:42:31 PM</p>
	 * @param cfgId
	 * @return
	 */
	public Integer getReciveAccountId(Integer cfgId) throws ServiceException;
	/**
	 * 
	 * @see 功能描述（必填）：保存邮件账号
	 * <p>返回值：boolean</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Feb 7, 2012 11:43:25 AM</p>
	 * @param accountCfg
	 * @return
	 */
	public void saveAccountCfg(CotMailAccountCfg accountCfg) throws ServiceException;
	/**
	 * 
	 * @see 功能描述（必填）：
	 * <p>返回值：String</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Feb 10, 2012 2:22:02 PM</p>
	 * @param accountCfg
	 * @return
	 */
	public String connTest(CotMailAccountCfg accountCfg);
	
	/**
	 * @see 功能描述（必填）：获取所有个人邮箱或者公共邮箱账号
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Sep 11, 2012 4:02:03 PM</p>
	 * @param flag 
	 * @return
	 * 返回值：List<CotMailAccountCfg>
	 */
	public List<CotMailAccountCfg> getEmpCfgList(String flag);
	
	/**
	 * @see 功能描述（必填）：根据业务员获取发送邮件的账号，如果有多个账号去第一个
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Sep 22, 2012 4:55:02 PM</p>
	 * @param empId
	 * @return
	 * 返回值：CotMailAccountCfg
	 */
	public CotMailAccountCfg getAccountCfgByEmpId(Integer empId);
	
}
