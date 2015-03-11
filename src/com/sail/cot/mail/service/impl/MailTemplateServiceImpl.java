package com.sail.cot.mail.service.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.jason.core.exception.DAOException;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.service.impl.BaseServiceImpl;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.common.util.Log4WebUtil;
import com.sail.cot.domain.CotEmps;
import com.sail.cot.domain.CotMailTemplate;
import com.sail.cot.mail.service.MailTemplateService;
import com.sail.cot.mail.util.MailConstants;
import com.sail.cot.service.BaseData;

@Service("MailTemplateService")
public class MailTemplateServiceImpl extends BaseServiceImpl implements MailTemplateService{
	private Logger logger = Log4WebUtil.getLogger(MailTemplateServiceImpl.class);
	@Resource(name="BaseData")
	private BaseData baseData;
	
	@SuppressWarnings("unchecked")
	public String getEmpsTemplate(Integer empId,String type,String tag) throws ServiceException{
		String hql = "select htmlText from CotMailTemplate where empId = :empId and isDefault = true and type = :type";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("empId", empId);
		whereMap.put("type", type);
		if(tag != null){
			hql += " and tag = :tag";
			whereMap.put("tag", tag);
		}
		List<String> list = this.findRecordByHql(hql, whereMap);
		if(list != null && !list.isEmpty())
			return list.get(0);
		else if(MailConstants.MAIL_TEMPLATE_TYPE_TEMPLATE.equals(type))
			return this.getSystemTemplate(tag);
		else
			return "";
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailTemplateService#getSystemTemplate(java.lang.Integer)
	 */
	@Override
	public String getSystemTemplate(String tag) {
		String path = null;
		if(MailConstants.MAIL_TEMPLATE_TAG_NEW.equals(tag)){
			path = "New/HTML.htm";
		}else if(MailConstants.MAIL_TEMPLATE_TAG_REPLY.equals(tag)){
			path = "Reply/HTML.htm";
		}else if(MailConstants.MAIL_TEMPLATE_TAG_FORWARD.equals(tag)){
			path = "Forward/HTML.htm";
		}
		File file = new File(ContextUtil.getProjectHome() + "mail/template/file/" + path);
		
		if(!file.exists()) return "";
		
		BufferedReader br = null;
		try {
			br = new BufferedReader(new InputStreamReader(new FileInputStream(file),"UTF-8"));
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		}
        String str;
        String s = "";
        try {
			while((str = br.readLine() ) != null)    
			{    
			    s=s+str;
			}
		} catch (IOException e) {
			e.printStackTrace();
		} 
		return s;
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailTemplateService#addMailTemplate(java.lang.String, java.lang.String)
	 */
	@Override
	public CotMailTemplate addTemplate(String name,String type, String tag) throws ServiceException {
		CotMailTemplate mailTemplate = new CotMailTemplate();
		CotEmps emps = this.baseData.getCurrentEmps();
		mailTemplate.setEmpId(emps.getId());
		mailTemplate.setIsDefault(false);
		mailTemplate.setName(name);
		mailTemplate.setTag(tag);
		mailTemplate.setType(type);
		this.saveOrUpdateObj(mailTemplate);
		return mailTemplate;
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailTemplateService#reNameTemplate(java.lang.Integer, java.lang.String)
	 */
	@Override
	public void updateTemplateName(Integer id,String name) throws ServiceException {
		String hql = "update CotMailTemplate set name = :name where id = :id";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("name", name);
		whereMap.put("id", id);
		this.updateOrDelTable(hql, whereMap);
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailTemplateService#updateTemplateHtml(java.lang.Integer, java.lang.String)
	 */
	@Override
	public void updateTemplateHtml(Integer id,String html) throws ServiceException {
		String hql = "update CotMailTemplate set htmlText = :html where id = :id";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("html", html);
		whereMap.put("id", id);
		this.updateOrDelTable(hql, whereMap);
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailTemplateService#updateTemplateDefault(java.lang.Integer, java.lang.String)
	 */
	@Override
	public void updateTemplateDefault(Integer id,String type,String tag) throws ServiceException {
		CotEmps emps = this.baseData.getCurrentEmps();
		String hql = "update cot_mail_template set is_default = (case id when ? then 1 else 0 end) WHERE emp_ID = ? and type = ?";
		try {
			if(tag != null && !tag.trim().equals("")){
				hql += " and tag = ?";
				this.getBaseDao().updateRecordsBySql(hql,id,emps.getId(),type,tag);
			}else{
				this.getBaseDao().updateRecordsBySql(hql,id,emps.getId(),type);
			}
		} catch (DAOException e) {
			logger.error(e);
			throw new ServiceException(e.getMessage());
		}
	}
	@Override
	public void updateTemplateShare(Integer id, Boolean share)
			throws ServiceException {
		//CotEmps emps = this.baseData.getCurrentEmps();
		String hql = "update CotMailTemplate set isDefault = :share WHERE  id = :id";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("share", share);
		whereMap.put("id", id);
		try {
			this.getBaseDao().executeUpdate(hql, null, whereMap);
		} catch (DAOException e) {
			logger.error(e);
			throw new ServiceException(e.getMessage());
		}
		
	}
}
