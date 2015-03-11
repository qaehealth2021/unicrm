package com.sail.cot.action.customer;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.util.Log4WebUtil;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotCustomer;
import com.sail.cot.domain.CotEmps;
import com.sail.cot.service.customer.CotCustomerService;
import com.sail.cot.service.customer.CustomerTreeNode;
import com.sail.cot.util.GridServerHandler;
/**
 * 客户资料的action
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: 2012-2-20 下午04:16:57 </p>
 * <p>Class Name: CotCustomerAction.java </p>
 * @author azan
 *
 */
@SuppressWarnings("serial")
public class CotCustomerAction extends AbstractAction{
	private Logger logger = Log4WebUtil.getLogger(CotCustomer.class);
	private CotCustomer customer;
	private Date startAddTime;
	private Date endAddTime;
	private String treeLvId;
	public String query(){
		return "query";
	}
	
	@SuppressWarnings("unchecked")
	public String list() {
		StringBuffer hql = new StringBuffer();
		hql.append("from CotCustomer obj where 1=1");
		//加入IdentityId的约束条件
		super.getIdentityHql(hql);
		Map<String,Object> whereMap = new HashMap<String, Object>();
		if(customer != null){
    		if(customer.getCustomerShortName() != null && !customer.getCustomerShortName().trim().equals("")){
    			hql.append(" and obj.customerShortName like :customerShortName");
    			whereMap.put("customerShortName", "%"+customer.getCustomerShortName()+"%");
    		}
    		if(customer.getCustomerNo() != null && !customer.getCustomerNo().trim().equals("")){
    			hql.append(" and obj.customerNo like :customerNo");
    			whereMap.put("customerNo", "%"+customer.getCustomerNo()+"%");
    		}
    		if(customer.getPriContact() != null && !customer.getPriContact().trim().equals("")){
    			hql.append(" and obj.priContact like :priContact");
    			whereMap.put("priContact", "%"+customer.getPriContact()+"%");
    		}
    		if(customer.getFullNameCn() != null && !customer.getFullNameCn().trim().equals("")){
    			hql.append(" and obj.fullNameCn like :fullNameCn");
    			whereMap.put("fullNameCn", "%"+customer.getFullNameCn()+"%");
    		}
    		if(customer.getFullNameEn() != null && !customer.getFullNameEn().trim().equals("")){
    			hql.append(" and obj.fullNameEn like :fullNameEn");
    			whereMap.put("fullNameEn", "%"+customer.getFullNameEn()+"%");
    		}
    		if(customer.getContactNbr() != null && !customer.getContactNbr().trim().equals("")){
    			hql.append(" and obj.contactNbr like :contactNbr");
    			whereMap.put("contactNbr", "%"+customer.getContactNbr()+"%");
    		}
    		if(customer.getCustomerAddress() != null && !customer.getCustomerAddress().trim().equals("")){
    			hql.append(" and obj.customerAddress like :customerAddress");
    			whereMap.put("customerAddress", "%"+customer.getCustomerAddress()+"%");
    		}
    		if(customer.getCustomerEmail() != null && !customer.getCustomerEmail().trim().equals("")){
    			hql.append(" and obj.customerEmail like :customerEmail");
    			whereMap.put("customerEmail", "%"+customer.getCustomerEmail()+"%");
    		}
    		if(customer.getCustomerAddrEn() != null && !customer.getCustomerAddrEn().trim().equals("")){
    			hql.append(" and obj.customerAddrEn like :customerAddrEn");
    			whereMap.put("customerAddrEn", "%"+customer.getCustomerAddrEn()+"%");
    		}
    		if(customer.getCustomerPost() != null && !customer.getCustomerPost().trim().equals("")){
    			hql.append(" and obj.customerPost like :customerPost");
    			whereMap.put("customerPost", "%"+customer.getCustomerPost()+"%");
    		}
    		if(customer.getCustomerFax() != null && !customer.getCustomerFax().trim().equals("")){
    			hql.append(" and obj.customerFax like :customerFax");
    			whereMap.put("customerFax", "%"+customer.getCustomerFax()+"%");
    		}
    		if(customer.getCooperateLv() != null && !customer.getCooperateLv().trim().equals("")){
    			hql.append(" and obj.cooperateLv like :cooperateLv");
    			whereMap.put("cooperateLv", "%"+customer.getCooperateLv()+"%");
    		}
    		if(customer.getCustomerRemark() != null && !customer.getCustomerRemark().trim().equals("")){
    			hql.append(" and obj.customerRemark like :customerRemark");
    			whereMap.put("customerRemark", "%"+customer.getCustomerRemark()+"%");
    		}
    		if(customer.getAddPerson() != null && !customer.getAddPerson().trim().equals("")){
    			hql.append(" and obj.addPerson like :addPerson");
    			whereMap.put("addPerson", "%"+customer.getAddPerson()+"%");
    		}
    		if(customer.getCultureBackground() != null && !customer.getCultureBackground().trim().equals("")){
    			hql.append(" and obj.cultureBackground like :cultureBackground");
    			whereMap.put("cultureBackground", "%"+customer.getCultureBackground()+"%");
    		}
    		if(customer.getCustWeb() != null && !customer.getCustWeb().trim().equals("")){
    			hql.append(" and obj.custWeb like :custWeb");
    			whereMap.put("custWeb", "%"+customer.getCustWeb()+"%");
    		}
    		if(customer.getCustFrom() != null && !customer.getCustFrom().trim().equals("")){
    			hql.append(" and obj.custFrom like :custFrom");
    			whereMap.put("custFrom", "%"+customer.getCustFrom()+"%");
    		}
	    	if(customer.getCustLvId() != null){
	    		hql.append(" and obj.custLvId = :custLvId");
    			whereMap.put("custLvId", customer.getCustLvId());
			}
	    	if(customer.getCustTypeId() != null){
	    		hql.append(" and obj.custTypeId = :custTypeId");
    			whereMap.put("custTypeId", customer.getCustTypeId());
			}
	    	if(customer.getEmpsId() != null){
	    		hql.append(" and obj.empsId = :empsId");
    			whereMap.put("empsId", customer.getEmpsId());
			}
	    	if(customer.getNationId() != null && customer.getNationId().getId() != null && customer.getNationId().getId() != 0){
	    		hql.append(" and obj.nationId.id = :nationId");
    			whereMap.put("nationId", customer.getNationId().getId());
			}
	    	if(customer.getProviceId() != null && customer.getProviceId().getId() != null && customer.getProviceId().getId() != 0){
	    		hql.append(" and obj.proviceId.id = :proviceId");
    			whereMap.put("proviceId", customer.getProviceId().getId());
			}
	    	if(customer.getAreaId() != null && customer.getAreaId().getId() != null && customer.getAreaId().getId() != 0){
	    		hql.append(" and obj.areaId.id = :areaId");
    			whereMap.put("areaId", customer.getAreaId().getId());
			}
		}
		try {
			//权限控制
			CotEmps emps = super.getCurrEmps();
			if(emps == null){
				logger.error("登录超时,请重新登录");
				return Constants.JSONDATA;
			}
			String empId = emps.getEmpsId();
			//非Admin用户
			if(!empId.equalsIgnoreCase("admin")){
				Map<String,Object> where = super.getBaseSerivce().getPopedomWhereMap("customer.do", emps.getId());
				hql.append(" and obj.id in(select obj.custId from CotCustomerTrackemps obj where obj.empId in(:empIds))");
				whereMap.putAll(where);
			}
			jsonString = this.getBaseSerivce().findRecords(hql.toString(), whereMap, pageData.getStart(), pageData.getLimit());
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}
	
	public String listArea(){
		List<CustomerTreeNode> list = this.cotCustomerService.getAreaTreeNode();
		String[] exclude = {"children"};
		GridServerHandler gd = new GridServerHandler(exclude);
		gd.setData(list);
		jsonString = gd.getLoadDataText();
		System.out.println(jsonString);
		return Constants.JSONDATA;
	}
	public String listCountry(){
		List<CustomerTreeNode> list = this.cotCustomerService.getCountryTreeNode(this.treeLvId);
		String[] exclude = {"children"};
		GridServerHandler gd = new GridServerHandler(exclude);
		gd.setData(list);
		jsonString = gd.getLoadDataText();
		System.out.println(jsonString);
		return Constants.JSONDATA;
	}
	
	public String listProvince(){
		List<CustomerTreeNode> list = this.cotCustomerService.getProvinceTreeNode(this.treeLvId);
		String[] exclude = {"children"};
		GridServerHandler gd = new GridServerHandler(exclude);
		gd.setData(list);
		jsonString = gd.getLoadDataText();
		System.out.println(jsonString);
		return Constants.JSONDATA;
	}
	public String listShareEmp(){
//		List<CustomerTreeNode> list = this.cotCustomerService.getProvinceTreeNode(this.treeLvId);
//		String[] exclude = {"children"};
//		GridServerHandler gd = new GridServerHandler(exclude);
//		gd.setData(list);
//		jsonString = gd.getLoadDataText();
//		System.out.println(jsonString);
		//显示当前
		String hql = " from CotCustomerTrackemps obj where custId=:custId ";
		Map<String,Object> whereMap = new HashMap<String, Object>();
		whereMap.put("custId", this.customer.getId());
		jsonString = this.getBaseSerivce().findRecords(hql.toString(), whereMap, pageData.getStart(), pageData.getLimit());
		return Constants.JSONDATA;
	}
	public String modify(){
		return "modify";
	}
	
	public void setCustomer(CotCustomer customer) {
		this.customer = customer;
	}

	public Date getStartAddTime() {
		return startAddTime;
	}

	public void setStartAddTime(Date startAddTime) {
		this.startAddTime = startAddTime;
	}

	public Date getEndAddTime() {
		return endAddTime;
	}

	public void setEndAddTime(Date endAddTime) {
		this.endAddTime = endAddTime;
	}

	public CotCustomer getCustomer() {
		return customer;
	}

	public String getTreeLvId() {
		return treeLvId;
	}

	public void setTreeLvId(String treeLvId) {
		this.treeLvId = treeLvId;
	}
	@Resource(name="CotCustomerService")
	private CotCustomerService cotCustomerService;
}
