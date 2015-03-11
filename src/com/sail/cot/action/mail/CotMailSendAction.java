package com.sail.cot.action.mail;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.util.Log4WebUtil;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotEmps;
import com.sail.cot.domain.CotMailAccountCfg;
/**
 * 
 * <p>Title: 旗航 MailServer-2.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Feb 24, 2012 6:36:44 PM </p>
 * <p>Class Name: CotMailSendAction.java </p>
 * @author zhao
 *
 */
@SuppressWarnings("serial")
public class CotMailSendAction extends AbstractAction{
	private Logger logger = Log4WebUtil.getLogger(CotMailSendAction.class);
	private String contactUrl;
	private String name;
	private String random;
	private String sendEmail; // 发送人邮箱地址
	private Integer accountId; // 账号ID
	
	public String query() {
		logger.debug("访问发送界面");
		if(accountId != null){
			CotMailAccountCfg accountCfg = (CotMailAccountCfg) this.getBaseSerivce().getObjById(accountId, CotMailAccountCfg.class);
			if(accountCfg != null){
				sendEmail = accountCfg.getMailAccount();
			}
		}
		return "query";
	}
	
	public String listcontact(){
		logger.debug("访问联系人");
		StringBuffer hql = new StringBuffer(); 
		
		hql.append("from CotContact obj where 1=1");
		//加入IdentityId的约束条件
		super.getIdentityHql(hql);
		// 过滤空邮箱
		hql.append(" and obj.contactEmail is not null and obj.contactEmail <> ''");
		
		Map<String,Object> whereMap = new HashMap<String, Object>();
		
		try {
			if (contactUrl != null && !contactUrl.trim().equals("")) {
				int queryIndex = contactUrl.lastIndexOf(";");
				contactUrl = contactUrl.substring(queryIndex + 1).trim();
				if (!contactUrl.equals("")) {
					hql.append(" and (obj.contactPerson like :contactUrl or obj.contactEmail like :contactUrl)");
					whereMap.put("contactUrl", contactUrl+"%");
				}else {
					return null;
				}
			}
			
			CotEmps emps = super.getCurrEmps(); 
			if(emps == null) throw new ServiceException("session超时,请重新登录");
			if(!"admin".equalsIgnoreCase(emps.getEmpsId().toLowerCase())){
				//非admin用户加入数据权限判断
				// 厂家权限
//				Map<String,Object> facMap = super.getBaseSerivce().getPopedomWhereMap("factorycontact.do", emps.getId());
//				if(facMap != null && !facMap.isEmpty()){ 
//					whereMap.putAll(facMap);
//				}
				// 客户权限
				Map<String,Object> custMap = super.getBaseSerivce().getPopedomWhereMap("customercontact.do", emps.getId());
				if(custMap != null && !custMap.isEmpty()){ 
					//custMap.putAll(custMap);
					whereMap.putAll(custMap);
				}
				hql.append(" and obj.empsId.id in(:empIds) ");
				//记录权限判断
				String action=super.getActionString();
				System.out.println("action:"+action);
				
				Map<String,Object> empMap = super.getBaseSerivce().getPopedomRecordWhereMap(action, emps.getId());
				if(empMap != null && !empMap.isEmpty()){
					hql.append(" or id in(:keyIds) ");
					whereMap.putAll(empMap);
				}
			}
			
			jsonString = this.getBaseSerivce().findRecords(hql.toString(), whereMap, pageData.getStart(), pageData.getLimit());
		} catch (ServiceException e) {
			e.printStackTrace();
			logger.error("联系人查询异常", e);
		}
		return Constants.JSONDATA;
	}
	public String listquicktemplate(){
		logger.debug("访问联系人");
		StringBuffer hql = new StringBuffer(); 
		String type = super.getRequest().getParameter("type");
		if(StringUtils.isEmpty(type))
			type = "T";
		hql.append("from CotMailTemplate obj where 1=1 and obj.type = '"+type+"'");
		String flag = super.getRequest().getParameter("flag");
		if(StringUtils.isNotEmpty(flag)){
			if(flag.equalsIgnoreCase("N")){
				flag = "N";
			}else if(flag.equalsIgnoreCase("F")){
				flag = "F";
			}else{
				flag = "R";
			}
			hql.append(" and obj.tag = '"+flag+"'");
		}
		Map<String,Object> whereMap = new HashMap<String, Object>();
		try {
			CotEmps emps = super.getCurrEmps(); 
			if(emps == null) throw new ServiceException("session超时,请重新登录");
			hql.append(" and obj.empId = :empId");
			whereMap.put("empId", emps.getId());
			jsonString = this.getBaseSerivce().findRecords(hql.toString(), whereMap, pageData.getStart(), pageData.getLimit());
		} catch (ServiceException e) {
			e.printStackTrace();
			logger.error("查询模板异常", e);
		}
		return Constants.JSONDATA;
	}
	public void setContactUrl(String contactUrl) {
		this.contactUrl = contactUrl;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRandom() {
		return random;
	}

	public void setRandom(String random) {
		this.random = random;
	}
	public String getSendEmail() {
		return sendEmail;
	}

	public void setSendEmail(String sendEmail) {
		this.sendEmail = sendEmail;
	}

	public Integer getAccountId() {
		return accountId;
	}

	public void setAccountId(Integer accountId) {
		this.accountId = accountId;
	}
	
}
