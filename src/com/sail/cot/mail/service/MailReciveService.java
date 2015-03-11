package com.sail.cot.mail.service;

import java.util.Map;

import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.domain.CotMail;
import com.sail.cot.domain.vo.CotReadMailInfoVO;

public interface MailReciveService {
	/**
	 * 
	 * @see 功能描述（必填）：根据邮件账号接收POP3邮件
	 * <p>返回值：void</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Feb 3, 2012 10:05:26 AM</p>
	 * @param cfgId 账号ID
	 * @throws ServiceException
	 */
	public void recivePOP3Message(Integer cfgId) throws ServiceException;
	
	public Map<String, Object>  remotePOP3Message(Integer cfgId,int start,int limit) throws ServiceException;
	
	/**
	 * 
	 * @see 功能描述（必填）：根据账号取得正在接收邮件地址
	 * @see 相关说明文件：
	 * <p>返回值：void</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Feb 24, 2012 3:30:08 PM</p>
	 * @param reciveCfgId
	 */
	public CotReadMailInfoVO getReadingMailInfo(Integer reciveCfgId);
	/**
	 * 
	 * @see 功能描述（必填）：根据账号取消接收邮件
	 * <p>返回值：void</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Feb 3, 2012 6:04:31 PM</p>
	 * @param cfgId
	 */
	public void cancleReciveMail(Integer reciveCfgId);
	/**
	 * 
	 * @see 功能描述（必填）：初始化邮件缓存
	 * @see 相关说明文件：
	 * <p>返回值：void</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Feb 24, 2012 4:44:43 PM</p>
	 * @throws ServiceException
	 */
	public void initMailList2Cache() throws ServiceException;
	
	/**
	 * 根据map中的ID,移动指派归档邮件
	 * @param idMap map中的KEY值与CotMail属性名一至
	 * @param cotMail
	 */
	public void moveAssignMail(Map<String,Integer> idMap, CotMail cotMail);
	
}
