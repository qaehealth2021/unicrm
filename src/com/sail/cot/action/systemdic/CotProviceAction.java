package com.sail.cot.action.systemdic;

import java.util.HashMap;
import java.util.Map;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotProvice;

@SuppressWarnings("serial")
public class CotProviceAction extends AbstractAction{
	private CotProvice provice;
	public String query(){
		return "query";
	}
	
	@SuppressWarnings("unchecked")
	public String list() {
		StringBuffer hql = new StringBuffer();
		hql.append("from CotProvice obj where 1=1");
		Map<String,Object> whereMap = new HashMap<String, Object>();
		if(provice != null){
	    	if(provice.getId() != null){
	    		hql.append(" and obj.id = :id");
    			whereMap.put("id", provice.getId());
			}
    		if(provice.getProvinceName() != null && !provice.getProvinceName().trim().equals("")){
    			hql.append(" and obj.provinceName like :provinceName");
    			whereMap.put("provinceName", "%"+provice.getProvinceName()+"%");
    		}
    		if(provice.getProvinceRemark() != null && !provice.getProvinceRemark().trim().equals("")){
    			hql.append(" and obj.provinceRemark like :provinceRemark");
    			whereMap.put("provinceRemark", "%"+provice.getProvinceRemark()+"%");
    		}
	    	if(provice.getNationId() != null && provice.getNationId().getId() != null){
	    		hql.append(" and obj.nationId.id = :nationId");
    			whereMap.put("nationId", provice.getNationId().getId());
			}
		}
		try {
			jsonString = this.getBaseSerivce().findRecords(hql.toString(), whereMap, pageData.getStart(), pageData.getLimit());
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}
	
	public void setProvice(CotProvice provice) {
		this.provice = provice;
	}

}
