package com.sail.cot.action.contact;

import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.util.Log4WebUtil;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotContact;
import com.sail.cot.domain.CotEmps;
/**
 * 联系人资料的action
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: 2012-2-20 下午04:17:37 </p>
 * <p>Class Name: CotContactAction.java </p>
 * @author azan
 *
 */
@SuppressWarnings("serial")
public class CotContactAction extends AbstractAction{
	
	Logger logger = Log4WebUtil.getLogger(CotContactAction.class);
	private CotContact contact;
	private String flag;
	
	/**
	 * 
	 * @Description：检查菜单表点击的是要查询厂家/客户/陌生联系人
	 * @Flow：
	 * @Example：
	 * @Files：
	 * @author:azan
	 * @Create:2011-12-31 上午11:38:32 void【】
	 */
	public void checkFlag(){
		//记录权限判断
		String action=super.getActionString();
		System.out.println("action:"+action);
		if(action.equalsIgnoreCase("query_customercontact.do")){
			this.flag="C";
		}else if(action.equalsIgnoreCase("query_factorycontact.do")){
			this.flag="F";
		}else{
			this.flag="S";
		}
	}
	
	public String query(){
		this.checkFlag();
		return "query";
	}
//	public String querycustomer(){
//		this.checkFlag();
//		return "query";
//	}
//	public String query(){
//		this.checkFlag();
//		return "query";
//	}
	public String modify(){
		return "modify";
	}
	@SuppressWarnings("unchecked")
	public String list() {
		StringBuffer hql = new StringBuffer(); 
		hql.append("from CotContact obj where 1=1 ");
		//加入IdentityId的约束条件
		super.getIdentityHql(hql);
		Map<String,Object> whereMap = new HashMap<String, Object>();
		if(contact != null){
	    	if(contact.getId() != null){
	    		hql.append(" and obj.id = :id");
    			whereMap.put("id", contact.getId());
			}
    		if(contact.getContactPerson() != null && !contact.getContactPerson().trim().equals("")){
    			hql.append(" and obj.contactPerson like :contactPerson");
    			whereMap.put("contactPerson", "%"+contact.getContactPerson()+"%");
    		}
    		if(contact.getContactNbr() != null && !contact.getContactNbr().trim().equals("")){
    			hql.append(" and obj.contactNbr like :contactNbr");
    			whereMap.put("contactNbr", "%"+contact.getContactNbr()+"%");
    		}
    		if(contact.getContactEmail() != null && !contact.getContactEmail().trim().equals("")){
    			hql.append(" and obj.contactEmail like :contactEmail");
    			whereMap.put("contactEmail", "%"+contact.getContactEmail()+"%");
    		}
    		if(contact.getContactDuty() != null && !contact.getContactDuty().trim().equals("")){
    			hql.append(" and obj.contactDuty like :contactDuty");
    			whereMap.put("contactDuty", "%"+contact.getContactDuty()+"%");
    		}
    		if(contact.getContactFax() != null && !contact.getContactFax().trim().equals("")){
    			hql.append(" and obj.contactFax like :contactFax");
    			whereMap.put("contactFax", "%"+contact.getContactFax()+"%");
    		}
//    		if(contact.getContactFlag() != null && !contact.getContactFlag().trim().equals("")){
//    			hql.append(" and obj.contactFlag = :contactFlag");
//    			whereMap.put("contactFlag", contact.getContactFlag());
//    		}
    		if(contact.getContactMobile() != null && !contact.getContactMobile().trim().equals("")){
    			hql.append(" and obj.contactMobile like :contactMobile");
    			whereMap.put("contactMobile", "%"+contact.getContactMobile()+"%");
    		}
    		if(contact.getRemark() != null && !contact.getRemark().trim().equals("")){
    			hql.append(" and obj.remark like :remark");
    			whereMap.put("remark", "%"+contact.getRemark()+"%");
    		}
//	    	if(contact.getFactoryId() != null && contact.getFactoryId().getId() != null){
//	    		hql.append(" and obj.factoryId.id = :factoryId");
//    			whereMap.put("factoryId", contact.getFactoryId().getId());
//			}
	    	if(contact.getCustomerId() != null && contact.getCustomerId().getId() != null){
	    		hql.append(" and obj.customerId.id = :customerId");
    			whereMap.put("customerId", contact.getCustomerId().getId());
			}
	    	if(contact.getCustomerId() != null && contact.getCustomerId().getNationId() != null && contact.getCustomerId().getNationId().getId() != null){
	    		hql.append(" and obj.customerId.nationId.id = :nationId");
    			whereMap.put("nationId", contact.getCustomerId().getNationId().getId());
			}
	    	if(contact.getEmpsId() != null){
	    		hql.append(" and obj.empsId = :empsId");
    			whereMap.put("empsId", contact.getEmpsId());
			}
		}
		try {
			CotEmps emps = super.getCurrEmps(); 
			if(emps == null) throw new ServiceException("session超时,请重新登录");
			if(!"admin".equalsIgnoreCase(emps.getEmpsId().toLowerCase())){
				//非admin用户加入数据权限判断
				Map<String,Object> map = super.getBaseSerivce().getPopedomWhereMap("customercontact.do", emps.getId());
				if(map != null && !map.isEmpty()){ 
					hql.append(" and obj.customerId.id in(select obj.custId from CotCustomerTrackemps obj where obj.empId in(:empIds)) ");
					//hql.append("or obj.empsId.id is null) ");
					whereMap.putAll(map);
				}
				map.clear();
				map = null;
				//记录权限判断
				String action=super.getActionString();
//				System.out.println("action:"+action);
				
//				map = super.getBaseSerivce().getPopedomRecordWhereMap(action, emps.getId());
//				if(map != null && !map.isEmpty()){
//					hql.append(" or id in(:keyIds) ");
//					whereMap.putAll(map);
//				}
			}
			jsonString = this.getBaseSerivce().findRecords(hql.toString(), whereMap, pageData.getStart(), pageData.getLimit());
		} catch (ServiceException e) {
			e.printStackTrace();
			logger.error("联系人查询异常", e);
		}
		return Constants.JSONDATA;
	}
	
	public void setContact(CotContact contact) {
			this.contact = contact;
	}
	public CotContact getContact() {
		return contact;
	}
	
	public String getFlag() {
		return flag;
	}

}
