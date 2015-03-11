package com.sail.cot.action.system.syslog;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotSysLog;

@SuppressWarnings("serial")
public class CotSysLogAction extends AbstractAction{
	private CotSysLog sysLog;
	private Date startOpTime;
	private Date endOpTime;
	public String query(){
		return "query";
	}
	
	@SuppressWarnings("unchecked")
	public String list() {
		StringBuffer hql = new StringBuffer();
		hql.append("from CotSysLog obj where 1=1");
		//加入IdentityId的约束条件
		Map<String,Object> whereMap = new HashMap<String, Object>();
		if(sysLog != null){
	    	if(sysLog.getId() != null){
	    		hql.append(" and obj.id = :id");
    			whereMap.put("id", sysLog.getId());
			}
    		if(sysLog.getOpMessage() != null && !sysLog.getOpMessage().trim().equals("")){
    			hql.append(" and obj.opMessage like :opMessage");
    			whereMap.put("opMessage", "%"+sysLog.getOpMessage()+"%");
    		}
    		if(this.startOpTime != null){
    			hql.append(" and obj.opTime >= :opTime");
    			whereMap.put("opTime", this.startOpTime);
    		}
    		if(this.endOpTime != null){
    			hql.append(" and obj.opTime <= :opTime");
    			whereMap.put("opTime", this.endOpTime);
    		}
    		if(sysLog.getOpModule() != null && !sysLog.getOpModule().trim().equals("")){
    			hql.append(" and obj.opModule like :opModule");
    			whereMap.put("opModule", "%"+sysLog.getOpModule()+"%");
    		}
	    	if(sysLog.getEmpsId() != null){
	    		hql.append(" and obj.empsId = :empsId");
    			whereMap.put("empsId", sysLog.getEmpsId());
			}
		}
		try {
			hql.append(" order by id desc");
			jsonString = this.getBaseSerivce().findRecords(hql.toString(), whereMap, pageData.getStart(), pageData.getLimit());
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}
	
	public void setSyslog(CotSysLog sysLog) {
		this.sysLog = sysLog;
	}

	public CotSysLog getSyslog() {
		return sysLog;
	}

	public Date getStartOpTime() {
		return startOpTime;
	}

	public void setStartOpTime(Date startOpTime) {
		this.startOpTime = startOpTime;
	}

	public Date getEndOpTime() {
		return endOpTime;
	}

	public void setEndOpTime(Date endOpTime) {
		this.endOpTime = endOpTime;
	}

}
