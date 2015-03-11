package com.sail.cot.action.mail;

import java.util.HashMap;
import java.util.Map;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotMailAccountCfg;

@SuppressWarnings("serial")
public class CotMailAccountCfgAction extends AbstractAction{
	private CotMailAccountCfg mailAccountCfg;
	public String query(){
		return "query";
	}
	
	public CotMailAccountCfg getMailAccountCfg() {
		return mailAccountCfg;
	}

	public void setMailAccountCfg(CotMailAccountCfg mailAccountCfg) {
		this.mailAccountCfg = mailAccountCfg;
	}

	public String list() {
		StringBuffer hql = new StringBuffer();
		hql.append("from CotMailAccountCfg obj where 1=1");
		//加入IdentityId的约束条件
		//super.getIdentityHql(hql);
		Map<String,Object> whereMap = new HashMap<String, Object>();
		if(mailAccountCfg != null){
	    	if(mailAccountCfg.getId() != null){
	    		hql.append(" and obj.id = :id");
    			whereMap.put("id", mailAccountCfg.getId());
			}
    		if(mailAccountCfg.getMailAccount() != null && !mailAccountCfg.getMailAccount().trim().equals("")){
    			hql.append(" and obj.mailAccount like :mailAccount");
    			whereMap.put("mailAccount", "%"+mailAccountCfg.getMailAccount()+"%");
    		}
    		if(mailAccountCfg.getMailPwd() != null && !mailAccountCfg.getMailPwd().trim().equals("")){
    			hql.append(" and obj.mailPwd like :mailPwd");
    			whereMap.put("mailPwd", "%"+mailAccountCfg.getMailPwd()+"%");
    		}
    		if(mailAccountCfg.getMailNickname() != null && !mailAccountCfg.getMailNickname().trim().equals("")){
    			hql.append(" and obj.mailNickname like :mailNickname");
    			whereMap.put("mailNickname", "%"+mailAccountCfg.getMailNickname()+"%");
    		}
    		if(mailAccountCfg.getMailSendName() != null && !mailAccountCfg.getMailSendName().trim().equals("")){
    			hql.append(" and obj.mailSendName like :mailSendName");
    			whereMap.put("mailSendName", "%"+mailAccountCfg.getMailSendName()+"%");
    		}
    		if(mailAccountCfg.getMailBoxType() != null && !mailAccountCfg.getMailBoxType().trim().equals("")){
    			hql.append(" and obj.mailBoxType like :mailBoxType");
    			whereMap.put("mailBoxType", "%"+mailAccountCfg.getMailBoxType()+"%");
    		}
	    	if(mailAccountCfg.getEmpId() != null){
	    		hql.append(" and obj.empId = :empId");
    			whereMap.put("empId", mailAccountCfg.getEmpId());
			}
	    	if(mailAccountCfg.getIdentityId() != null){
	    		hql.append(" and obj.identityId = :identityId");
    			whereMap.put("identityId", mailAccountCfg.getIdentityId());
			}
		}
		try {
			String[] excludes = {"accountCfg"};
			String popedomString = super.addPopedomJudge("mailaccountcfg.do", whereMap, "empId.id");
			hql.append(popedomString);
			jsonString = this.getBaseSerivce().findRecords(
					hql.toString(), whereMap, pageData.getStart(), pageData.getLimit(),excludes);
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}
	
	public void setMailaccountcfg(CotMailAccountCfg mailAccountCfg) {
		this.mailAccountCfg = mailAccountCfg;
	}

	public CotMailAccountCfg getMailaccountcfg() {
		return mailAccountCfg;
	}
}
