package com.sail.cot.action.systemdic;

import java.util.HashMap;
import java.util.Map;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotArea;

@SuppressWarnings("serial")
public class CotAreaAction extends AbstractAction{
	private CotArea area;
	public String query(){
		return "query";
	}
	
	@SuppressWarnings("unchecked")
	public String list() {
		StringBuffer hql = new StringBuffer();
		hql.append("from CotArea obj where 1=1");
		Map<String,Object> whereMap = new HashMap<String, Object>();
		if(area != null){
	    	if(area.getId() != null){
	    		hql.append(" and obj.id = :id");
    			whereMap.put("id", area.getId());
			}
    		if(area.getAreaName() != null && !area.getAreaName().trim().equals("")){
    			hql.append(" and obj.areaName like :areaName");
    			whereMap.put("areaName", "%"+area.getAreaName()+"%");
    		}
    		if(area.getAreaCode() != null && !area.getAreaCode().trim().equals("")){
    			hql.append(" and obj.areaCode like :areaCode");
    			whereMap.put("areaCode", "%"+area.getAreaCode()+"%");
    		}
    		if(area.getRemark() != null && !area.getRemark().trim().equals("")){
    			hql.append(" and obj.remark like :remark");
    			whereMap.put("remark", "%"+area.getRemark()+"%");
    		}
		}
		try {
			jsonString = this.getBaseSerivce().findRecords(hql.toString(), whereMap, pageData.getStart(), pageData.getLimit());
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}
	
	public void setArea(CotArea area) {
		this.area = area;
	}

	public CotArea getArea() {
		return area;
	}

}
