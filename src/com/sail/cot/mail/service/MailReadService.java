package com.sail.cot.mail.service;

import java.util.List;

import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.domain.CotContact;
import com.sail.cot.domain.CotMail;
import com.sail.cot.domain.CotMailBodyHtml;
import com.sail.cot.domain.CotMailBodyText;
import com.zhao.mail.entity.IMailAttach;

/**
 * 
 * <p>Title: 旗航 MailServer-2.0</p>
 * <p>Description: 邮件 读取信息接口</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Feb 18, 2012 10:26:30 AM </p>
 * <p>Class Name: MailReadService.java </p>
 * @author zhao
 *
 */
public interface MailReadService {
	/**
	 * 
	 * @see 功能描述（必填）：获得邮件信息，不包含内容及附件
	 * <p>返回值：CotMail</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Feb 18, 2012 10:27:47 AM</p>
	 * @param id
	 * @return
	 */
	public CotMail getMail(Integer id);
	/**
	 * 根据邮件ID，获得邮件基本信息
	 * @param ids
	 * @return
	 * @throws ServiceException
	 */
	public List<CotMail> getMailList(List<Integer> ids) throws ServiceException;
	/**
	 * 获得所属邮件附件
	 * @param mailId
	 * @return
	 * @throws ServiceException
	 */
	public List<IMailAttach> getMailAttach(Integer mailId) throws ServiceException;
	/**
	 * 获得HTML格式
	 * @param mailId
	 * @return
	 * @throws ServiceException
	 */
	public CotMailBodyHtml getBodyHtml(Integer mailId) throws ServiceException;
	/**
	 * 获得TEXT格式
	 * @param mailId
	 * @return
	 * @throws ServiceException
	 */
	public CotMailBodyText getBodyText(Integer mailId) throws ServiceException;
	/**
	 * 获得邮件所有信息
	 * @param mailId
	 * @return
	 * @throws ServiceException
	 */
	public CotMail getMailAllInfo(Integer mailId, boolean showAttach) throws ServiceException;
	/**
	 * 获得发件类型邮件
	 * @param mailId
	 * @param showAttach 是否显示附件
	 * @return
	 * @throws ServiceException
	 */
	public CotMail getSendMailInfo(Integer mailId,boolean showAttach) throws ServiceException;
	/**
	 * 
	 * @param mailList
	 */
	public void saveMailToEml(List<CotMail> mailList) throws Exception;
	/**
	 * 查询是否存在
	 * @param emailUrl
	 * @return
	 */
	public CotContact findExistByEMail(String emailUrl);
}
