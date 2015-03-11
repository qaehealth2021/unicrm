package com.sail.cot.mail.service;

import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.domain.CotMailTemplate;

public interface MailTemplateService {
	/**
	 * 根据模板类型，获得系统默认模板
	 * @param tag 模板类型
	 * @return
	 */
	public String getSystemTemplate(String tag);
	/**
	 * 新增邮件模板
	 * @param name 模板名字
	 * @param tag	模板标识
	 * @return
	 * @throws ServiceException
	 */
	public CotMailTemplate addTemplate(String name,String type,String tag) throws ServiceException;
	/**
	 * 修改邮件模板名字
	 * @param id 模板ID
	 * @param name	模板名字
	 * @throws ServiceException
	 */
	public void updateTemplateName(Integer id,String name) throws ServiceException;
	/**
	 * 修改邮件模板HTML内容
	 * @param id
	 * @param html
	 * @throws ServiceException
	 */
	public void updateTemplateHtml(Integer id,String html) throws ServiceException;
	/**
	 * 设置邮件默认模板
	 * @param id
	 * @param tag
	 */
	public void updateTemplateDefault(Integer id,String type,String tag) throws ServiceException;
	
	/**
	 * 设置邮件快速文本共享
	 * @param id
	 * @param tag
	 */
	public void updateTemplateShare(Integer id,Boolean share) throws ServiceException;
	
	/**
	 * 获得员工默认模板或签名内容
	 * @param empId
	 * @param type
	 * @param tag
	 * @return
	 * @throws ServiceException
	 */
	public String getEmpsTemplate(Integer empId,String type,String tag) throws ServiceException;
}
