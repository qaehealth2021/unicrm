package com.sail.cot.action.system.popedom;

import java.util.HashMap;
import java.util.Map;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotPopedomRecord;

@SuppressWarnings("serial")
public class CotPopedomRecordAction extends AbstractAction{
	private CotPopedomRecord popedomRecord;
	public String query(){
		return "query";
	}
	
	@SuppressWarnings("unchecked")
	public String list() {
		StringBuffer hql = new StringBuffer();
		hql.append("from CotPopedomRecord obj where 1=1");
		Map<String,Object> whereMap = new HashMap<String, Object>();
		String empsId = super.getRequest().getParameter("empsId");
		String url = super.getRequest().getParameter("url");
			if(url != null){
				hql.append(" and obj.module = :module");
	    		whereMap.put("module",url);
			}
	    	if(empsId != null){
	    		hql.append(" and obj.empsId = :empsId");
    			whereMap.put("empsId", Integer.valueOf(empsId));
			}
		try {
			jsonString = this.getBaseSerivce().findRecords(hql.toString(), whereMap, pageData.getStart(), pageData.getLimit());
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}
	
	public void setPopedomrecord(CotPopedomRecord popedomRecord) {
		this.popedomRecord = popedomRecord;
	}

	public CotPopedomRecord getPopedomrecord() {
		return popedomRecord;
	}

}
