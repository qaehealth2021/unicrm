package com.sail.cot.action.sms;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import com.jasson.im.api.RPTItem;
import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotSms;
import com.sail.cot.service.sms.CotSmsService;
import com.sail.cot.util.GridServerHandler;
/**
 * *********************************************
* @Copyright :(C),2008-2010
* @CompanyName :厦门市旗航软件有限公司(www.xmqh.net)
* @Version :1.0
* @Date :2012-9-6
* @author : azan
* @class :CotSmsAction.java
* @Description :短信管理
 */
@SuppressWarnings("serial")
public class CotSmsAction extends AbstractAction{
	private CotSms sms;
	private Date startTime;
	private Date endTime;
	private String treeLvId;
	private String smId;
	private String mobile;
	private CotSmsService smsService;
	
	@Resource(name="CotSmsService")
	public void setSmsService(CotSmsService smsService) {
		this.smsService = smsService;
	}
	

	public CotSmsService getSmsService() {
		return smsService;
	}
	
	public String query(){
		return "query";
	}
	
	@SuppressWarnings("unchecked")
	public String list() {
		StringBuffer hql = new StringBuffer();
		hql.append("from CotSms obj where 1=1 and obj.contactId.id is not null");
		Map<String,Object> whereMap = new HashMap<String, Object>();
		if(sms != null){
	    	if(sms.getId() != null){
	    		hql.append(" and obj.id = :id");
    			whereMap.put("id", sms.getId());
			}
    		if(sms.getContent() != null && !sms.getContent().trim().equals("")){
    			hql.append(" and obj.content like :content");
    			whereMap.put("content", "%"+sms.getContent()+"%");
    		}
    		if(sms.getStatusId() != null && !sms.getStatusId().equals("")){
    			hql.append(" and obj.statusId.id=:statusId");
    			whereMap.put("statusId",sms.getStatusId().getId());
    		}
    		//客户
    		if(sms.getCustomerId() != null && sms.getCustomerId().getId()!=null){
    			hql.append(" and obj.customerId.id=:customerId");
    			whereMap.put("customerId",sms.getCustomerId().getId());
    		}
    		//联系人
    		if(sms.getContactId() != null && sms.getContactId().getId()!=null){
    			hql.append(" and obj.contactId.id=:contactId");
    			whereMap.put("contactId",sms.getContactId().getId());
    		}
    		//发送人
    		if(sms.getEmpId() != null && sms.getEmpId().getId()!=null){
    			hql.append(" and obj.empId.id=:empId");
    			whereMap.put("empId",sms.getEmpId().getId());
    		}
		}
		if(startTime != null){
			hql.append(" and obj.saveTime >= :startSmsDate");
			whereMap.put("startSmsDate", startTime);
		}
		if(endTime != null){
			hql.append(" and obj.saveTime <= :endSmsDate");
			whereMap.put("endSmsDate", endTime);
		}
		if(this.treeLvId != null && !"".equals(this.treeLvId)){
			JSONObject json = JSONObject.fromObject(this.treeLvId);
			if(json.getInt("emps") != -1 && json.getInt("emps") != 0){
				hql.append(" and obj.contactId.empsId.id=:empsId");
    			whereMap.put("empsId",json.getInt("emps"));
			}
			if(json.getInt("cust") != -1 && json.getInt("cust") != 0){
				hql.append(" and obj.customerId.id=:customerId");
    			whereMap.put("customerId",json.getInt("cust"));
			}
			if(json.getInt("area") != -1 && json.getInt("area") != 0){
				hql.append(" and obj.customerId.areaId.id=:areaId");
    			whereMap.put("areaId",json.getInt("area"));
			}
			if(json.getInt("country") != -1 && json.getInt("country") != 0){
				hql.append(" and obj.customerId.nationId.id=:country");
    			whereMap.put("country",json.getInt("country"));
			}
			if(json.getInt("province") != -1 && json.getInt("province") != 0){
				hql.append(" and obj.customerId.proviceId.id=:province");
    			whereMap.put("province",json.getInt("province"));
			}
			if(json.getString("orderno") != null && !json.getString("orderno").equals("")){
    			hql.append(" and obj.orderNo=:orderNo");
    			whereMap.put("orderNo", json.getString("orderno"));
    		}
		}
		String popedomString = super.addPopedomJudge("sms.do", whereMap, "empId.id");
		hql.append(popedomString);
		hql.append(" order by obj.id desc");
		try {
			jsonString = this.getBaseSerivce().findRecords(hql.toString(), whereMap, pageData.getStart(), pageData.getLimit());
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}
	
	@SuppressWarnings("unchecked")
	public String listmo() {
		StringBuffer hql = new StringBuffer();
		hql.append("from CotSms obj where 1=1 and obj.contactId.id is null");
		Map<String,Object> whereMap = new HashMap<String, Object>();
		if(sms != null){
    		if(sms.getContent() != null && !sms.getContent().trim().equals("")){
    			hql.append(" and obj.content like :content");
    			whereMap.put("content", "%"+sms.getContent()+"%");
    		}
    		if(sms.getStatusId() != null && !sms.getStatusId().equals("")){
    			hql.append(" and obj.statusId.id=:statusId");
    			whereMap.put("statusId",sms.getStatusId().getId());
    		}
    		//发送人
    		if(sms.getEmpId() != null && sms.getEmpId().getId()!=null){
    			hql.append(" and obj.empId.id=:empId");
    			whereMap.put("empId",sms.getEmpId().getId());
    		}
		}
		if(startTime != null){
			hql.append(" and obj.saveTime >= :startSmsDate");
			whereMap.put("startSmsDate", startTime);
		}
		if(endTime != null){
			hql.append(" and obj.saveTime <= :endSmsDate");
			whereMap.put("endSmsDate", endTime);
		}
		if(this.treeLvId != null && !"".equals(this.treeLvId)){
			JSONObject json = JSONObject.fromObject(this.treeLvId);
			if(json.getInt("emps") != -1 && json.getInt("emps") != 0){
				hql.append(" and obj.empId.id=:empsId");
    			whereMap.put("empsId",json.getInt("emps"));
			}
		}
		String popedomString = super.addPopedomJudge("sms.do", whereMap, "empId.id");
		hql.append(popedomString);
		hql.append(" order by obj.id desc");
		try {
			jsonString = this.getBaseSerivce().findRecords(hql.toString(), whereMap, pageData.getStart(), pageData.getLimit());
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}
	
	@SuppressWarnings("unchecked")
	public String listrpt() {
		if(smId != null && mobile!=null){
			RPTItem[] items=smsService.getRPTItem(Integer.parseInt(smId), mobile);
			List list =new ArrayList();
			if(items!=null){
				for (int i = 0; i < items.length; i++) {
					list.add(items[i]);
				}
			}
			try {
				GridServerHandler gd = new GridServerHandler();
				gd.setData(list);
				gd.setTotalCount(list.size());
				this.setJsonString(gd.getLoadResponseText());
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return Constants.JSONDATA;
	}
	
	@SuppressWarnings("unchecked")
	public String listdetail() {
		return Constants.JSONDATA;
	}
	
	public String modify(){
		return "modify";
	}

	public CotSms getSms() {
		return sms;
	}

	public void setSms(CotSms sms) {
		this.sms = sms;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public String getTreeLvId() {
		return treeLvId;
	}

	public void setTreeLvId(String treeLvId) {
		this.treeLvId = treeLvId;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getSmId() {
		return smId;
	}

	public void setSmId(String smId) {
		this.smId = smId;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	

}
