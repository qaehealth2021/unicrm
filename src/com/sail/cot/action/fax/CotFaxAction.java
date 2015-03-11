package com.sail.cot.action.fax;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotEmps;
import com.sail.cot.domain.CotFaxRecv;
import com.sail.cot.domain.CotFaxSend;
/**
 * *********************************************
* @Copyright :(C),2008-2010
* @CompanyName :厦门市旗航软件有限公司(www.xmqh.net)
* @Version :1.0
* @Date :2012-9-10
* @author : azan
* @class :CotFaxAction.java
* @Description :传真
 */
@SuppressWarnings("serial")
public class CotFaxAction extends AbstractAction{
	private CotFaxRecv faxRecv;
	private CotFaxSend faxSend;
	private Date startTime;
	private Date endTime;
	private String treeLvId;
	public String query(){
		return "query";
	}
	
	public String getTreeLvId() {
		return treeLvId;
	}

	public void setTreeLvId(String treeLvId) {
		this.treeLvId = treeLvId;
	}

	@SuppressWarnings("unchecked")
	public String listsend() {
		StringBuffer hql = new StringBuffer();
		hql.append("from CotFaxSend obj where 1=1");
		Map<String,Object> whereMap = new HashMap<String, Object>();
		if(faxSend != null){
			//主题
    		if(faxSend.getTitle() != null && !faxSend.getTitle().trim().equals("")){
    			hql.append(" and obj.title like :title");
    			whereMap.put("title", "%"+faxSend.getTitle()+"%");
    		}
    		//订单号
    		if(faxSend.getOrderNo() != null && !faxSend.getOrderNo().trim().equals("")){
    			hql.append(" and obj.orderNo like :orderNo");
    			whereMap.put("orderNo", "%"+faxSend.getOrderNo()+"%");
    		}
    		//订单状态
    		if(faxSend.getStatusId() != null && faxSend.getStatusId().getId()!=null){
    			hql.append(" and obj.statusId.id=:statusId");
    			whereMap.put("statusId",faxSend.getStatusId().getId());
    		}
    		//传真状态
    		if(faxSend.getStatus() != null && faxSend.getStatus()!=0){
    			hql.append(" and obj.status=:status");
    			whereMap.put("status",faxSend.getStatus()-1);
    		}
    		//客户
    		if(faxSend.getCustomerId() != null && faxSend.getCustomerId().getId()!=null){
    			hql.append(" and obj.customerId.id=:customerId");
    			whereMap.put("customerId",faxSend.getCustomerId().getId());
    		}
    		//联系人
    		if(faxSend.getContactId() != null && faxSend.getContactId().getId()!=null){
    			hql.append(" and obj.contactId.id=:contactId");
    			whereMap.put("contactId",faxSend.getContactId().getId());
    		}
    		//发送人
    		if(faxSend.getEmpsId() != null && faxSend.getEmpsId().getId()!=null){
    			hql.append(" and obj.empId.id=:empId");
    			whereMap.put("empId",faxSend.getEmpsId().getId());
    		}
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
		String popedomString = super.addPopedomJudge("fax.do", whereMap, "empsId.id");
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
	public String listrecv() {
		StringBuffer hql = new StringBuffer();
		hql.append("from CotFaxRecv obj where 1=1 ");
		if(faxRecv != null && faxRecv.getCustomerId() != null && faxRecv.getCustomerId().getId()!=null){
		}else{
			hql.append(" and obj.empsId is null or (1=1");
		}
		Map<String,Object> whereMap = new HashMap<String, Object>();
		if(faxRecv != null){
			//接收标识
    		if(faxRecv.getDeviceid() != null && !faxRecv.getDeviceid().trim().equals("")){
    			hql.append(" and obj.deviceid=:deviceid");
    			whereMap.put("deviceid",faxRecv.getDeviceid());
    		}
    		//传真文件
    		if(faxRecv.getTitle() != null && !faxRecv.getTitle().trim().equals("")){
    			hql.append(" and obj.title like :title");
    			whereMap.put("title", "%"+faxRecv.getTitle()+"%");
    		}
    		//订单号
    		if(faxRecv.getOrderNo() != null && !faxRecv.getOrderNo().trim().equals("")){
    			hql.append(" and obj.orderNo like :orderNo");
    			whereMap.put("orderNo", "%"+faxRecv.getOrderNo()+"%");
    		}
    		//客户
    		if(faxRecv.getCustomerId() != null && faxRecv.getCustomerId().getId()!=null){
    			hql.append(" and obj.customerId.id=:customerId");
    			whereMap.put("customerId",faxRecv.getCustomerId().getId());
    		}
		}
		if(this.treeLvId != null && !"".equals(this.treeLvId)){
			JSONObject json = JSONObject.fromObject(this.treeLvId);
			if(json.getInt("emps") != -1 && json.getInt("emps") != 0){
				hql.append(" and obj.empsId.id=:empsId");
    			whereMap.put("empsId",json.getInt("emps"));
    			//增加业务员的传真标识
    			CotEmps cotEmps=(CotEmps) this.getBaseSerivce().getObjByIntegerId(json.getInt("emps"), "CotEmps");
    			hql.append(" and obj.deviceid=:deviceids");
    			whereMap.put("deviceids",cotEmps.getFaxMapId().getFaxDevice());
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
		String popedomString = super.addPopedomJudge("fax.do", whereMap, "empsId.id");
		hql.append(popedomString);
		
		if(faxRecv != null && faxRecv.getCustomerId() != null && faxRecv.getCustomerId().getId()!=null){
		}else{
			hql.append(")");
		}
		
		hql.append(" order by obj.id desc");
		try {
			jsonString = this.getBaseSerivce().findRecords(hql.toString(), whereMap, pageData.getStart(), pageData.getLimit());
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}
	
	public String modify(){
		return "modify";
	}

	public CotFaxRecv getFaxRecv() {
		return faxRecv;
	}

	public CotFaxSend getFaxSend() {
		return faxSend;
	}

	public void setFaxSend(CotFaxSend faxSend) {
		this.faxSend = faxSend;
	}

	public void setFaxRecv(CotFaxRecv faxRecv) {
		this.faxRecv = faxRecv;
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

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	

}
