package com.sail.cot.action.systemdic;

import java.util.HashMap;
import java.util.Map;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotNation;

@SuppressWarnings("serial")
public class CotNationAction extends AbstractAction{
	private CotNation nation;
	public String query(){
		return "query";
	}
	
	@SuppressWarnings("unchecked")
	public String list() {
		StringBuffer hql = new StringBuffer();
		hql.append("from CotNation obj where 1=1");
		Map<String,Object> whereMap = new HashMap<String, Object>();
		if(nation != null){
	    	if(nation.getId() != null){
	    		hql.append(" and obj.id = :id");
    			whereMap.put("id", nation.getId());
			}
	    	if(nation.getAreaId() != null && nation.getAreaId().getId() != null){
	    		hql.append(" and obj.areaId.id = :areaId");
    			whereMap.put("areaId", nation.getAreaId().getId());
			}
    		if(nation.getNationShort() != null && !nation.getNationShort().trim().equals("")){
    			hql.append(" and obj.nationShort like :nationShort");
    			whereMap.put("nationShort", "%"+nation.getNationShort()+"%");
    		}
    		if(nation.getNationCn() != null && !nation.getNationCn().trim().equals("")){
    			hql.append(" and obj.nationCn like :nationCn");
    			whereMap.put("nationCn", "%"+nation.getNationCn()+"%");
    		}
    		if(nation.getNationName() != null && !nation.getNationName().trim().equals("")){
    			hql.append(" and obj.nationName like :nationName");
    			whereMap.put("nationName", "%"+nation.getNationName()+"%");
    		}
    		if(nation.getNationCode() != null && !nation.getNationCode().trim().equals("")){
    			hql.append(" and obj.nationCode like :nationCode");
    			whereMap.put("nationCode", "%"+nation.getNationCode()+"%");
    		}
    		if(nation.getNationRemark() != null && !nation.getNationRemark().trim().equals("")){
    			hql.append(" and obj.nationRemark like :nationRemark");
    			whereMap.put("nationRemark", "%"+nation.getNationRemark()+"%");
    		}
		}
		try {
			jsonString = this.getBaseSerivce().findRecords(hql.toString(), whereMap, pageData.getStart(), pageData.getLimit());
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}
	
	public void setNation(CotNation nation) {
		this.nation = nation;
	}
}
