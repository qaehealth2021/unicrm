package com.sail.cot.action.system.rptfile;

import java.util.HashMap;
import java.util.Map;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotRptFile;

@SuppressWarnings("serial")
public class CotRptFileAction extends AbstractAction{
	private CotRptFile rptFile;
	public String query(){
		return "query";
	}
	public String modify(){
		return "modify";
	}
	@SuppressWarnings("unchecked")
	public String list() {
		StringBuffer hql = new StringBuffer();
		hql.append("from CotRptFile obj where 1=1");
		//加入IdentityId的约束条件
		super.getIdentityHql(hql);
		Map<String,Object> whereMap = new HashMap<String, Object>();
		if(rptFile != null){
    		if(rptFile.getRptName() != null && !rptFile.getRptName().trim().equals("")){
    			hql.append(" and obj.rptName like :rptName");
    			whereMap.put("rptName", "%"+rptFile.getRptName()+"%");
    		}
	    	if(rptFile.getRptTypeId() != null){
	    		hql.append(" and obj.rptTypeId = :rptTypeId");
    			whereMap.put("rptTypeId", rptFile.getRptTypeId());
			}
		}
		try {
			jsonString = this.getBaseSerivce().findRecords(hql.toString(), whereMap, pageData.getStart(), pageData.getLimit());
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}
	
	public void setRptfile(CotRptFile rptFile) {
		this.rptFile = rptFile;
	}

	public CotRptFile getRptfile() {
		return rptFile;
	}

}
