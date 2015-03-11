package com.sail.cot.mail.service;

import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.service.BaseSerivce;
import com.sail.cot.domain.CotMail;
import com.sail.cot.mail.util.MailSendUtil;
/**
 * 
 * <p>Title: 旗航 MailServer-2.0</p>
 * <p>Description:发送邮件接口</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Feb 28, 2012 5:16:57 PM </p>
 * <p>Class Name: MailSendService.java </p>
 * @author zhao
 *
 */
public interface MailSendService extends BaseSerivce{
	/**
	 * 
	 * @see 功能描述（必填）：发送邮件并添加到数据库
	 * <p>返回值：void</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Mar 1, 2012 6:07:01 PM</p>
	 * @param cotMail
	 * @param random
	 */
	public Integer addSendout(CotMail cotMail) throws ServiceException;
	/**
	 * 
	 * @see 功能描述（必填）：保存草稿，如果该封草稿，已不是草稿，则另存一份
	 * <p>返回值：boolean</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Feb 28, 2012 5:17:16 PM</p>
	 * @param cotMail
	 * @param random
	 * @return
	 */
	public Integer saveDraft(CotMail cotMail) throws ServiceException ;
	
	public MailSendUtil getSendUtil();
	/**
	 * 根据附件路径删除临时附件
	 * @param url
	 */
	public void delAttachByUrl(String url);
}
