package com.sail.cot.action.system.module;

import java.util.HashMap;
import java.util.Map;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotModuleFun;

@SuppressWarnings("serial")
public class CotModuleFunAction extends AbstractAction{
	private CotModuleFun moduleFun;
	
	public String query(){
		return "query";
	}
	
	@SuppressWarnings("unchecked")
	public String list() {
		StringBuffer hql = new StringBuffer();
		hql.append("from CotModuleFun obj where 1=1");
		Map<String,Object> whereMap = new HashMap<String, Object>();
		if(moduleFun.getId() != null){
			hql.append(" and obj.id = :id");
			whereMap.put("id", moduleFun.getId());
		}
		if(moduleFun.getModuleId() != null){
			hql.append(" and obj.moduleId = :moduleId");
			whereMap.put("moduleId", moduleFun.getModuleId());
		}
		if(moduleFun.getFunName() != null){
			hql.append(" and obj.funName = :funName");
			whereMap.put("funName", moduleFun.getFunName());
		}
		if(moduleFun.getFunValidurl() != null){
			hql.append(" and obj.funValidurl = :funValidurl");
			whereMap.put("funValidurl", moduleFun.getFunValidurl());
		}
		if(moduleFun.getFunIcon() != null){
			hql.append(" and obj.funIcon = :funIcon");
			whereMap.put("funIcon", moduleFun.getFunIcon());
		}
		try {
			jsonString = this.getBaseSerivce().findRecords(hql.toString(), whereMap, pageData.getStart(), pageData.getLimit());
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}

	public void setModuleFun(CotModuleFun moduleFun) {
		this.moduleFun = moduleFun;
	}
	
}
