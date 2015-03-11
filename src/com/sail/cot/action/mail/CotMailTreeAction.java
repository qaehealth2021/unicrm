package com.sail.cot.action.mail;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.util.Log4WebUtil;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotEmps;
import com.sail.cot.domain.CotMailTree;
import com.sail.cot.mail.service.MailTreeService;
/**
 * 
 * <p>Title: 旗航 MailServer-2.0</p>
 * <p>Description:邮箱树</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Feb 13, 2012 3:14:09 PM </p>
 * <p>Class Name: CotMailTreeAction.java </p>
 * @author zhao
 *
 */
@SuppressWarnings("serial")
public class CotMailTreeAction extends AbstractAction{
	private Logger logger = Log4WebUtil.getLogger(CotMailAction.class);
	private CotMailTree mailTree;
	private Integer empId;//过滤出员工的账号
	@Resource(name="MailTreeService")
	private MailTreeService treeService;
	
	public String query() {
		return "query";
	}
	
	public String list(){
		StringBuffer hql = new StringBuffer();
		hql.append("from CotMailTree obj where 1=1");
		CotEmps emps = super.getCurrEmps();
		Map<String,Object> whereMap = new HashMap<String, Object>();
		if(!"admin".equals(emps.getEmpsId())){
			whereMap.putAll(this.getBaseSerivce().getPopedomWhereMap("mail.do", emps.getId()));
			hql.append(" and accountCfgId.empId.id in(:empIds)");
		}
		if(mailTree != null){
			if(mailTree.getAccountCfgId() != null && mailTree.getAccountCfgId().getId() != null){
				hql.append(" and obj.accountCfgId.id = :accountCfgId");
				whereMap.put("accountCfgId", mailTree.getAccountCfgId().getId());
			}
		}
		if(this.empId == null){
			hql.append(" and 1=0 ");
		}else {
			hql.append(" and obj.accountCfgId.empId.id = :empId");
			whereMap.put("empId", empId);
		}
		try {
			jsonString = treeService.getMailTree(hql.toString(),whereMap);
		} catch (ServiceException e) {
			logger.error(e);
		}
		return Constants.JSONDATA;
	}

	public CotMailTree getMailTree() {
		return mailTree;
	}
	public void setMailTree(CotMailTree mailTree) {
		this.mailTree = mailTree;
	}

	public Integer getEmpId() {
		return empId;
	}

	public void setEmpId(Integer empId) {
		this.empId = empId;
	}
}
