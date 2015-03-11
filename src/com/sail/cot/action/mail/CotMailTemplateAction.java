package com.sail.cot.action.mail;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotMailTemplate;
import com.sail.cot.util.GridServerHandler;

@SuppressWarnings("serial")
public class CotMailTemplateAction extends AbstractAction{
	private String tag;
	private String type;
	
	public String query(){
		return "query";
	}
	
	@SuppressWarnings("unchecked")
	public String list() {
		StringBuffer hql = new StringBuffer();
		
		hql.append("from CotMailTemplate obj where obj.empId = :empId and obj.type = :type");
		//加入IdentityId的约束条件
		//super.getIdentityHql(hql);
		Map<String,Object> whereMap = new HashMap<String, Object>();
		
		whereMap.put("empId", this.getCurrEmps().getId());
		whereMap.put("type", type);
		
		if(tag != null && !tag.trim().equals("")){
			hql.append(" and obj.tag = :tag");
			whereMap.put("tag", tag);
		}
		
		try {
			List<CotMailTemplate> list = this.baseSerivce.findRecordByHql(hql.toString(), whereMap);
			GridServerHandler gd = new GridServerHandler();
			gd.setData(list);
			jsonString = gd.getLoadDataText();
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}
	
	public String listquicktxt(){
		StringBuffer hql = new StringBuffer();
		hql.append("from CotMailTemplate obj where 1=1 and (obj.empId = :empId or obj.isDefault = :isDefault) and obj.type = 'Q'");
		//加入IdentityId的约束条件
		//super.getIdentityHql(hql);
		Map<String,Object> whereMap = new HashMap<String, Object>();
		
		whereMap.put("empId", this.getCurrEmps().getId());
		whereMap.put("isDefault", true);
		
		try {
			List<CotMailTemplate> list = this.baseSerivce.findRecordByHql(hql.toString(), whereMap);
			jsonString = this.baseSerivce.getJsonData(hql.toString(), whereMap);
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}
	
	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
}
