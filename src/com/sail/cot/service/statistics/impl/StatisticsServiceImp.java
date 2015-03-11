/**
 * 
 */
package com.sail.cot.service.statistics.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.sail.cot.common.service.impl.BaseServiceImpl;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.domain.CotArea;
import com.sail.cot.domain.CotCustomer;
import com.sail.cot.domain.CotEmps;
import com.sail.cot.domain.CotFaxRecv;
import com.sail.cot.domain.CotFaxSend;
import com.sail.cot.domain.CotMail;
import com.sail.cot.domain.CotNation;
import com.sail.cot.domain.CotProvice;
import com.sail.cot.domain.CotSms;
import com.sail.cot.entity.StatisticsTreeNode;
import com.sail.cot.service.BaseData;
import com.sail.cot.service.statistics.StatisticsService;
import com.sail.cot.service.system.popedom.CotPopedomService;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Sep 18, 2012 6:27:26 PM </p>
 * <p>Class Name: StatisticsServiceImp.java </p>
 * @author achui
 *
 */		  
@Service("StatisticsService")
public class StatisticsServiceImp extends BaseServiceImpl implements StatisticsService {

	@Resource(name="CotPopedomService")
	CotPopedomService popedomService;
	
	@Resource(name="BaseData")
	BaseData baseData;
	/* (non-Javadoc)
	 * @see com.sail.cot.service.statistics.StatisticsService#getReportColumnDef(java.lang.String)
	 */
	@Override
	public List<Map<String, String>> getReportColumnDef(String tableName) {
		// TODO Auto-generated method stub
		Connection conn = super.getBaseDao().getConnection();
		PreparedStatement pstm = null;
		ResultSet rs = null;
		List<Map<String, String>> list = new ArrayList<Map<String,String>>();
		try {
			 pstm = conn.prepareStatement("select c.name as colName,t.name as columnType from sys.columns c ,sys.types t where c.object_id = OBJECT_ID('"+tableName+"','U')"
					+"and c.user_type_id = t.user_type_id order by c.column_id");
			 rs = pstm.executeQuery();
			 while(rs.next()){
				 Map<String, String> coldef = new HashMap<String, String>();
				 coldef.put("colName", rs.getString("colName"));
				 coldef.put("colType", rs.getString("columnType"));
				 list.add(coldef);
			 }
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}finally{
			try {
				if(rs != null)
					rs.close();
				if(pstm != null)
					pstm.close();
				if(conn != null)
					conn.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return list;
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.service.statistics.StatisticsService#getEmpTreeNode()
	 */
	@Override
	public List<StatisticsTreeNode> getEmpTreeNode(Integer custId,CotEmps currentEmp) {
		
		//TODO:暂时未获取权限
		List<CotEmps> empList = new ArrayList<CotEmps>();
		Map<String, Object> whereMap = new HashMap<String, Object>();
		if(custId != 0){
			//获取客户的跟踪业务员
			String hql = "select emp from CotCustomerTrackemps obj,CotEmps emp where emp.id = obj.empId and obj.custId = :custId";
			if(!"admin".equals(currentEmp.getEmpsId())){
				Map<String, Object> empIds = this.popedomService.getPopedomWhereMap("emps.do", currentEmp.getId());
				hql +=" and emp.id in(:empIds) order by emp.empsId";
				whereMap.putAll(empIds);
			}else {
				hql += " order by emp.empsId";
			}
			whereMap.put("custId", custId);
			List<CotEmps> list = this.findRecordByHql(hql,whereMap);
			Map existMap = new HashMap();
			for(CotEmps emp : list){
				//CotEmps emp =contact.getEmpsId();
				//联系人尚未指定业务员
				//if(emp == null) continue;
				if(existMap.get(emp.getId()) == null){
					empList.add(emp);
					existMap.put(emp.getId(), currentEmp.getId());
				}
			}
			
		}else{
			if(!"admin".equals(currentEmp.getEmpsId())){
				Map<String, Object> empIds = this.popedomService.getPopedomWhereMap("emps.do", currentEmp.getId());
				String hql = " from CotEmps obj where obj.id in(:empIds) order by empsId";
				whereMap.putAll(empIds);
				empList = this.findRecordByHql(hql, whereMap);
			}else {
				empList = this.findRecordByHql("from CotEmps order by empsId");
			}
		}
		List<StatisticsTreeNode> list = new ArrayList<StatisticsTreeNode>();
		for(CotEmps emp :empList){
			
			StatisticsTreeNode node = new StatisticsTreeNode();
			node.setText(emp.getEmpsId());
			node.setTreeId(emp.getId());
			node.setHref("#");
			node.setTreeLv(1);//1代表业务员节点
			//node.setLeaf(custId == 0?false:true);
			node.setExpandable(false);
			JSONObject json = new JSONObject();
			json.put("emps", emp.getId());
			json.put("cust", 0);
			json.put("orderno", "");
			json.put("area", 0);
			json.put("country", 0);
			json.put("province",0);
			node.setTreeLvId(json.toString());
			list.add(node);
		}
		return list;
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.service.statistics.StatisticsService#getCustTreeNode(java.lang.Integer)
	 */
	//from CotContact obj
	@Override
	public List<StatisticsTreeNode> getCustTreeNode(String treeLvId,Integer custId) {
		// TODO Auto-generated method stub
		JSONObject jsonObject = JSONObject.fromObject(treeLvId);
		String hql = "select cust from CotCustomer cust, CotCustomerTrackemps obj where" +
				" obj.custId = cust.id"+
				" and obj.empId ="+jsonObject.getInt("emps");
		if(custId != 0){
			hql += " and cust.id = " + custId;
		}
		//根据区域找国家
		if(jsonObject.getInt("area") > 0){
			hql +=" and cust.areaId.id = "+jsonObject.getInt("area");
		}
		if(jsonObject.getInt("country") > 0){
			hql +=" and cust.nationId.id = "+jsonObject.getInt("country");
		}
//		else if(jsonObject.getInt("province") > 0){
//			hql +=" and obj.proviceId.id =" + jsonObject.getInt("province");
//		}
		hql += " order by cust.customerShortName";
		List<CotCustomer> listContact = this.findRecordByHql(hql);
		List<StatisticsTreeNode> list = new ArrayList<StatisticsTreeNode>();
		Map custIdMap = new HashMap();
		for(CotCustomer customer : listContact){
			
			//CotCustomer customer = contact.getCustomerId();
			
			//已经存在客户ID
			if(custIdMap.get(customer.getId()) != null) continue;
			StatisticsTreeNode node = new StatisticsTreeNode();
			node.setText(customer.getCustomerShortName());
			node.setTreeId(customer.getId());
			node.setTreeLv(2);//1代表客户节点
			node.setUrl("");
			JSONObject json = jsonObject;
			json.put("emps", jsonObject.getInt("emps"));
			json.put("cust", customer.getId());
			json.put("orderno", "");
			node.setTreeLvId(json.toString());
			list.add(node);
			custIdMap.put(customer.getId(), customer.getId());
		}
		return list;
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.service.statistics.StatisticsService#getOrderTreeNode(java.lang.Integer)
	 */
	@Override
	public List<StatisticsTreeNode> getOrderTreeNodeMail(String treeLvId) {
		JSONObject jsonObject = JSONObject.fromObject(treeLvId);
		List<CotMail> listMail = this.findRecordByHql(" from CotMail obj where obj.custId ="+jsonObject.getInt("cust"));
		List<StatisticsTreeNode> list = new ArrayList<StatisticsTreeNode>();
		Map orderNoMap = new HashMap();
		for(CotMail mail : listMail){
			String orderNo = mail.getOrderNo();
			if(StringUtils.isEmpty(orderNo))
				continue;
			//已经存在单号
			if(orderNoMap.get(orderNo) != null) continue;
			StatisticsTreeNode node = new StatisticsTreeNode();
			node.setText(orderNo);
			//node.setTreeId(customer.getId());
			node.setTreeLv(3);//3代表订单节点是叶子节点
			node.setLeaf(true);
			node.setUrl("");
			if(mail.getTrackStatus() != null && mail.getTrackStatus().getId() != null)
				node.setIconCls(this.getOrderNoCls(mail.getTrackStatus().getId()));
			JSONObject json = jsonObject;
			json.put("emps", jsonObject.getInt("emps"));
			json.put("cust", jsonObject.getInt("cust"));
			json.put("orderno", orderNo);
			node.setTreeLvId(json.toString());
			list.add(node);
			orderNoMap.put(orderNo, orderNo);
		}
		return list;
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.service.statistics.StatisticsService#getAreaTreeNodeByEmpId(java.lang.Integer)
	 */
	@Override
	public List<StatisticsTreeNode> getAreaTreeNodeByEmpId(String treeLvId) {
		// TODO Auto-generated method stub
		JSONObject jsonObject = JSONObject.fromObject(treeLvId);
		String hql = "select cust from CotCustomer cust, CotCustomerTrackemps obj where " +
				" cust.id = obj.custId"+
				" and obj.empId ="+jsonObject.getInt("emps")+
				" order by cust.id";
		List<CotCustomer> listContact = this.findRecordByHql(hql);
		List<StatisticsTreeNode> list = new ArrayList<StatisticsTreeNode>();
		List<Integer> areaIds = new ArrayList<Integer>();
		for(CotCustomer customer : listContact){
			if(customer.getAreaId() == null) continue;
			if(!areaIds.contains(customer.getAreaId().getId()))
				areaIds.add(customer.getAreaId().getId());
		}
		if(areaIds.size() == 0){
			areaIds.add(0);//为了防止SQL语法错误，当没有区域信息的时候，添加一个数据库不存在的ID
		}
		String sqlArea = " from CotArea where id in(:ids)";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("ids", areaIds);
		List<CotArea> listArea = this.findRecordByHql(sqlArea, whereMap);
		for(CotArea area :listArea){
			StatisticsTreeNode node = new StatisticsTreeNode();
			node.setText(area.getAreaName());
			node.setTreeId(area.getId());
			node.setTreeLv(4);//4代表洲节点
			JSONObject json = jsonObject;
			json.put("emps", jsonObject.getInt("emps"));
			json.put("cust", 0);
			json.put("orderno", "");
			json.put("area", area.getId());
			json.put("country", 0);
			json.put("province",0);
			node.setTreeLvId(json.toString());
			list.add(node);
		}
		return list;
	}

	@Override
	public List<StatisticsTreeNode> getCountryTreeNode(String treeLvId) {
		JSONObject jsonObject = JSONObject.fromObject(treeLvId);
		String hql = "select cust from CotCustomer cust, CotCustomerTrackemps obj where " +
					" cust.id = obj.custId"+
					" and obj.empId ="+jsonObject.getInt("emps")+
					" order by cust.id";
		//获取客户中有省信息的数据
		List<CotCustomer> listCust = new ArrayList<CotCustomer>();
		//String hql  = " from CotCustomer where nationId.id is not null and areaId.id="+jsonObject.getInt("area");
		listCust = this.findRecordByHql(hql);
		List<Integer> nationIds = new ArrayList<Integer>();
		for(CotCustomer customer : listCust){
			if(customer.getNationId() == null)continue;
			if(customer.getNationId() != null && !nationIds.contains(customer.getNationId().getId())){
				nationIds.add(customer.getNationId().getId());
			}
		}
		if(nationIds.size() == 0){
			nationIds.add(0);
		}
		hql = " from CotNation obj where obj.areaId.id = :areaId and id in(:ids) order by obj.nationCn ";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("ids", nationIds);
		whereMap.put("areaId", jsonObject.getInt("area"));
		List<CotNation> listNation = this.findRecordByHql(hql,whereMap);
		List<StatisticsTreeNode> list = new ArrayList<StatisticsTreeNode>();
		for(CotNation nation : listNation){
			StatisticsTreeNode node = new StatisticsTreeNode();
			node.setText(nation.getNationCn());
			node.setTreeId(nation.getId());
			node.setTreeLv(5);//1代表国家节点
			JSONObject json = jsonObject;
			json.put("emps", jsonObject.getInt("emps"));
			json.put("cust", 0);
			json.put("orderno", "");
			json.put("area", jsonObject.getInt("area"));
			json.put("country", nation.getId());
			json.put("province",0);
			node.setTreeLvId(json.toString());
			list.add(node);
		}
		return list;
	}

	@Override
	public List<StatisticsTreeNode> getProvinceTreeNode(String treeLvId) {
		// TODO Auto-generated method stub
		JSONObject jsonObject = JSONObject.fromObject(treeLvId);
		//获取客户中有洲信息的数据
		List<CotCustomer> listCust = new ArrayList<CotCustomer>();
		String hql  = " from CotCustomer where proviceId.id is not null and areaId.id="+jsonObject.getInt("area")+" and nationId.id="+jsonObject.getInt("country");
		listCust = this.findRecordByHql(hql);
		List<Integer> nationIds = new ArrayList<Integer>();
		for(CotCustomer customer : listCust){
			if(customer.getProviceId() !=null && !nationIds.contains(customer.getProviceId().getId())){
				nationIds.add(customer.getProviceId().getId());
			}
		}
		if(nationIds.size() == 0){
			nationIds.add(0);
		}
		hql = " from CotProvice obj where obj.nationId.id = :nationId and id in(:ids) order by provinceName";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("ids", nationIds);
		whereMap.put("nationId", jsonObject.getInt("country"));
		List<CotProvice> listProvince = this.findRecordByHql(hql, whereMap);
		List<StatisticsTreeNode> list = new ArrayList<StatisticsTreeNode>();
		for(CotProvice province : listProvince){
			StatisticsTreeNode node = new StatisticsTreeNode();
			node.setText(province.getProvinceName());
			node.setTreeId(province.getId());
			node.setTreeLv(6);//1代表市节点
			JSONObject json = jsonObject;
			json.put("emps", jsonObject.getInt("emps"));
			json.put("cust", 0);
			json.put("orderno", "");
			json.put("area", jsonObject.getInt("area"));
			json.put("country", jsonObject.getInt("country"));
			json.put("province",province.getId());
			node.setTreeLvId(json.toString());
			node.setLeaf(false);
			list.add(node);
		}
		return list;
		
		
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.service.statistics.StatisticsService#getUnKnownCustTreeNode(java.lang.String)
	 */
	@Override
	public List<StatisticsTreeNode> getUnKnownCustTreeNode(String treeLvId) {
		JSONObject jsonObject = JSONObject.fromObject(treeLvId);
		String hql = "select cust from CotCustomer cust, CotCustomerTrackemps obj where " +
		" cust.id = obj.custId"+
		" and obj.empId = :empsId"+
		" order by cust.id";
		//String hql = " from CotContact obj where obj.empsId.id = :empsId";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("empsId", jsonObject.getInt("emps"));
		List<CotCustomer> list = this.findRecordByHql(hql,whereMap);
		List<Integer> custIds = new ArrayList<Integer>();
		for(CotCustomer customer : list){
			if(!custIds.contains(customer.getId()))
				custIds.add(customer.getId());
		}
		//根据区域找国家
		hql = " from CotCustomer obj where 1=1 and id in(:ids)";
		if(jsonObject.getInt("area") == -1){
			hql +=" and obj.areaId.id is null";
		}else if(jsonObject.getInt("country") == -1){
			hql +=" and obj.nationId.id is null and obj.areaId.id = "+jsonObject.getInt("area");
		}
		else if(jsonObject.getInt("province") == -1){
			hql +=" and obj.proviceId.id is null ";
			hql +=" and obj.areaId.id = "+jsonObject.getInt("area");
			hql +=" and obj.nationId.id = "+jsonObject.getInt("country");
		}
		if(custIds.size() == 0){
			custIds.add(0);
		}
		whereMap.clear();
		whereMap.put("ids", custIds);
		List<StatisticsTreeNode> treeList = new ArrayList<StatisticsTreeNode>();
		List<CotCustomer> custList = this.findRecordByHql(hql,whereMap);
		Map custIdMap = new HashMap();
		for(CotCustomer customer : custList){
			if(customer.getAreaId() != null && customer.getProviceId()== null && customer.getNationId() != null) 
				continue;
			StatisticsTreeNode node = new StatisticsTreeNode();
			node.setText(customer.getCustomerShortName());
			node.setTreeId(customer.getId());
			node.setTreeLv(2);//1代表客户节点
			node.setUrl("");
			JSONObject json = jsonObject;
			json.put("emps", jsonObject.getInt("emps"));
			json.put("cust", customer.getId());
			json.put("orderno", "");
			node.setTreeLvId(json.toString());
			treeList.add(node);
		}
		return treeList;
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.service.statistics.StatisticsService#getOrderTreeNodeFax(java.lang.String)
	 */
	@Override
	public List<StatisticsTreeNode> getOrderTreeNodeFax(String treeLvId,String table) {
		JSONObject jsonObject = JSONObject.fromObject(treeLvId);
		String hql = "";
		if(table.equals("recv")){
			hql = " from CotFaxRecv obj where obj.customerId.id ="+jsonObject.getInt("cust");
		}else {
			hql = " from CotFaxSend obj where obj.customerId.id ="+jsonObject.getInt("cust");
		}
		List listFax = this.findRecordByHql(hql);
		List<StatisticsTreeNode> list = new ArrayList<StatisticsTreeNode>();
		Map orderNoMap = new HashMap();
		Integer statusId = null;
		for(int i=0; i<listFax.size(); i++){
			String orderNo = "";
			if(table.equals("recv")){
				CotFaxRecv faxRecv = (CotFaxRecv)listFax.get(i);
				orderNo = faxRecv.getOrderNo();
				if(faxRecv.getStatusId() != null && faxRecv.getStatusId().getId() != null)
					statusId = faxRecv.getStatusId().getId(); 
			}else{
				CotFaxSend faxSend = (CotFaxSend)listFax.get(i);
				orderNo = faxSend.getOrderNo();
				if(faxSend.getStatusId() != null && faxSend.getStatusId().getId() != null)
					statusId = faxSend.getStatusId().getId(); 
			}
			if(StringUtils.isEmpty(orderNo))
				continue;
			//已经存在单号
			if(orderNoMap.get(orderNo) != null) continue;
			StatisticsTreeNode node = new StatisticsTreeNode();
			node.setText(orderNo);
			//node.setTreeId(customer.getId());
			node.setTreeLv(3);//3代表订单节点是叶子节点
			node.setLeaf(true);
			node.setUrl("");
			if(statusId != null)
				node.setIconCls(this.getOrderNoCls(statusId));
			JSONObject json = jsonObject;
			json.put("emps", jsonObject.getInt("emps"));
			json.put("cust", jsonObject.getInt("cust"));
			json.put("orderno", orderNo);
			node.setTreeLvId(json.toString());
			list.add(node);
			orderNoMap.put(orderNo, orderNo);
		}
		return list;
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.service.statistics.StatisticsService#getOrderTreeNodeSms(java.lang.String)
	 */
	@Override
	public List<StatisticsTreeNode> getOrderTreeNodeSms(String treeLvId) {
		JSONObject jsonObject = JSONObject.fromObject(treeLvId);
		List<CotSms> listMail = this.findRecordByHql(" from CotSms obj where obj.customerId.id ="+jsonObject.getInt("cust"));
		List<StatisticsTreeNode> list = new ArrayList<StatisticsTreeNode>();
		Map orderNoMap = new HashMap();
		for(CotSms sms : listMail){
			String orderNo = sms.getOrderNo();
			if(StringUtils.isEmpty(orderNo))
				continue;
			//已经存在单号
			if(orderNoMap.get(orderNo) != null) continue;
			StatisticsTreeNode node = new StatisticsTreeNode();
			node.setText(orderNo);
			//node.setTreeId(customer.getId());
			node.setTreeLv(3);//3代表订单节点是叶子节点
			node.setLeaf(true);
			node.setUrl("");
			if(sms.getStatusId() != null)
				node.setIconCls(this.getOrderNoCls(sms.getStatusId().getId()));
			JSONObject json = jsonObject;
			json.put("emps", jsonObject.getInt("emps"));
			json.put("cust", jsonObject.getInt("cust"));
			json.put("orderno", orderNo);
			node.setTreeLvId(json.toString());
			list.add(node);
			orderNoMap.put(orderNo, orderNo);
		}
		return list;
	}
	private String getOrderNoCls(Integer statusId){
		String cls = ContextUtil.getProperty("mail.properties", "mail.order.status."+statusId);
		return cls;
	}
	
	public Map findCustomerByEmpId(Integer empId){
		String hql="select obj.id,obj.customerShortName from CotCustomer obj,CotContact c,CotEmps e where c.customerId.id=obj.id and c.empsId.id=e.id and e.id="+empId;
		List list=this.getBaseDao().find(hql);
		Map map=new HashMap();
		for (int i = 0; i < list.size(); i++) {
			Object[] obj=(Object[])list.get(i);
			map.put(obj[0],obj[1]);
		}
		return map;
	}
}
