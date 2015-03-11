/**
 * 
 */
package com.sail.cot.service.contact.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.sail.cot.common.service.impl.BaseServiceImpl;
import com.sail.cot.domain.CotContact;
import com.sail.cot.domain.CotContactGroup;
import com.sail.cot.domain.CotContactGroupDetail;
import com.sail.cot.service.contact.CotContactService;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Sep 25, 2012 4:17:31 PM </p>
 * <p>Class Name: CotContantServiceImpl.java </p>
 * @author achui
 *
 */
@Service("CotContactService")
public class CotContantServiceImpl extends BaseServiceImpl implements CotContactService{

	@Override
	public void addToContactGroupDetail(Integer groupId, List<Integer> contactIds) {
		CotContactGroup group = new CotContactGroup(groupId);
		List list = new ArrayList();
		for(Integer id : contactIds){
			//该组下面是有已经存在改联系人
			CotContactGroupDetail exist = (CotContactGroupDetail)this.findUniqueRecordsByHql(" from CotContactGroupDetail where groupId.id="+groupId+" and contactId.id="+id);
			if(exist != null) continue;//已经存在，改ID不用加入
			CotContact contact = new CotContact(id);
			CotContactGroupDetail groupDetail = new CotContactGroupDetail();
			groupDetail.setContactId(contact);
			groupDetail.setGroupId(group);
			list.add(groupDetail);
		}
		this.saveOrUpdateList(list);
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.service.contact.CotContactService#addToContactGroup(java.lang.Integer, java.lang.Integer)
	 */
	@Override
	public Integer addToContactGroup(CotContactGroup contactGroup) {
		this.saveOrUpdateObj(contactGroup);
		//TODO:需要判断是否超过限制
		return 0;
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.service.contact.CotContactService#getContactsByGroupIds(java.util.List)
	 */
	@Override
	public List<CotContact> getContactsByGroupIds(List<Integer> groupIds) {
		// TODO Auto-generated method stub
		String hql = " from CotContactGroupDetail obj where obj.groupId.id in (:groupIds)";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("groupIds", groupIds);
		List<CotContactGroupDetail> list = this.findRecordByHql(hql, whereMap);
		//Map<Integer,Integer> map = new HashMap<Integer, Integer>();
		List<CotContact> contactList = new ArrayList<CotContact>();
		for(CotContactGroupDetail detail : list){
			CotContact contact = detail.getContactId();
			if(!contactList.contains(contact)){
				contactList.add(detail.getContactId());
			}
//			if(map.get(contact.getId()) == null){
//				map.put(contact.getId(), contact.getId());
//			}
		}
		return contactList;
	}
	
	public boolean checkIsExist(Integer customerId,String conPerson,Integer contactId){
		String hql="select obj.id from CotContact obj where obj.contactPerson=:contactPerson and obj.customerId.id=:customerId";
		Map whereMap=new HashMap();
		whereMap.put("contactPerson", conPerson);
		whereMap.put("customerId", customerId);
		List list=this.getBaseDao().findRecordsByHql(hql, whereMap);
		if(list!=null && list.size()>0){
			Integer id=(Integer) list.get(0);
			if(contactId!=null){
				if(id.intValue()==contactId.intValue()){
					return false;
				}else{
					return true;
				}
			}else{
				return true;
			}
		}else{
			return false;
		}
	}
	
}
