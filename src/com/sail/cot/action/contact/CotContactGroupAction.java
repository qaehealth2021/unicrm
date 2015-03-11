package com.sail.cot.action.contact;

import java.util.HashMap;
import java.util.Map;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotContactGroup;
import com.sail.cot.domain.CotContactGroupDetail;

@SuppressWarnings("serial")
public class CotContactGroupAction extends AbstractAction{
	private CotContactGroup contactGroup;
	private CotContactGroupDetail contactGroupDetail;
	public String query(){
		return "query";
	}
	
	public String querydetail(){
		return "query";
	}
	
	@SuppressWarnings("unchecked")
	public String list() {
		StringBuffer hql = new StringBuffer();
		hql.append("from CotContactGroup obj where 1=1");
		//加入IdentityId的约束条件
		//super.getIdentityHql(hql);
		Map<String,Object> whereMap = new HashMap<String, Object>();
		if(contactGroup != null){
    		if(contactGroup.getGroupName() != null && !contactGroup.getGroupName().trim().equals("")){
    			hql.append(" and obj.groupName like :groupName");
    			whereMap.put("groupName", "%"+contactGroup.getGroupName()+"%");
    		}
	    	if(contactGroup.getEmpsId() != null){
	    		hql.append(" and obj.empsId = :empsId");
    			whereMap.put("empsId", contactGroup.getEmpsId());
			}
		}
		try {
			jsonString = this.getBaseSerivce().findRecords(hql.toString(), whereMap, pageData.getStart(), pageData.getLimit());
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}
	
	public String  listdetail(){
		StringBuffer hql = new StringBuffer();
		hql.append("from CotContactGroupDetail obj where 1=1");
		//加入IdentityId的约束条件
		super.getIdentityHql(hql);
		Map<String,Object> whereMap = new HashMap<String, Object>();
		if(contactGroupDetail != null){
	    	if(contactGroupDetail.getGroupId() != null){
	    		hql.append(" and obj.groupId = :groupId");
    			whereMap.put("groupId", contactGroupDetail.getGroupId());
			}
	    	if(contactGroupDetail.getContactId() != null){
	    		hql.append(" and obj.contactId = :contactId");
    			whereMap.put("contactId", contactGroupDetail.getContactId());
			}
		}
		try {
			jsonString = this.getBaseSerivce().findRecords(hql.toString(), whereMap, pageData.getStart(), pageData.getLimit());
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}

	public CotContactGroup getContactGroup() {
		return contactGroup;
	}

	public void setContactGroup(CotContactGroup contactGroup) {
		this.contactGroup = contactGroup;
	}

	public CotContactGroupDetail getContactGroupDetail() {
		return contactGroupDetail;
	}

	public void setContactGroupDetail(CotContactGroupDetail contactGroupDetail) {
		this.contactGroupDetail = contactGroupDetail;
	}

}
