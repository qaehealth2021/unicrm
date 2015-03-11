/**
 * 
 */
package com.sail.cot.service.customer.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Service;

import com.sail.cot.common.service.impl.BaseServiceImpl;
import com.sail.cot.domain.CotArea;
import com.sail.cot.domain.CotCustomer;
import com.sail.cot.domain.CotCustomerTrackemps;
import com.sail.cot.domain.CotNation;
import com.sail.cot.domain.CotProvice;
import com.sail.cot.service.customer.CotCustomerService;
import com.sail.cot.service.customer.CustomerTreeNode;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Sep 20, 2012 3:06:27 PM </p>
 * <p>Class Name: CotCustomerServiceImpl.java </p>
 * @author achui
 *
 */
@Service("CotCustomerService")
public class CotCustomerServiceImpl extends BaseServiceImpl implements CotCustomerService{

	@Override
	public List<CustomerTreeNode> getAreaTreeNode() {
		//TODO:暂时未获取权限
		List<CotArea> areaList = this.getList("CotArea");
		List<CustomerTreeNode> list = new ArrayList<CustomerTreeNode>();
		for(CotArea area :areaList){
			
			CustomerTreeNode node = new CustomerTreeNode();
			node.setText(area.getAreaName());
			node.setTreeId(area.getId());
			node.setTreeLv(1);//1代表洲节点
			node.setExpandable(false);
			JSONObject json = new JSONObject();
			json.put("area", area.getId());
			json.put("country", 0);
			json.put("province",0);
			node.setTreeLvId(json.toString());
			list.add(node);
		}
		return list;
	}

	@Override
	public List<CustomerTreeNode> getCountryTreeNode(String treeLvId) {
		JSONObject jsonObject = JSONObject.fromObject(treeLvId);
		//获取客户中有洲信息的数据
		List<CotCustomer> listCust = new ArrayList<CotCustomer>();
		String hql  = " from CotCustomer where nationId.id is not null and areaId.id="+jsonObject.getInt("area");
		listCust = this.findRecordByHql(hql);
		List<Integer> nationIds = new ArrayList<Integer>();
		for(CotCustomer customer : listCust){
			if(!nationIds.contains(customer.getNationId().getId())){
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
		List<CustomerTreeNode> list = new ArrayList<CustomerTreeNode>();
		for(CotNation nation : listNation){
			CustomerTreeNode node = new CustomerTreeNode();
			node.setText(nation.getNationCn());
			node.setTreeId(nation.getId());
			node.setTreeLv(2);//1代表国家节点
			JSONObject json = jsonObject;
			json.put("area", jsonObject.getInt("area"));
			json.put("country", nation.getId());
			json.put("province",0);
			node.setTreeLvId(json.toString());
			list.add(node);
		}
		return list;
	}

	@Override
	public List<CustomerTreeNode> getProvinceTreeNode(String treeLvId) {
		// TODO Auto-generated method stub
		JSONObject jsonObject = JSONObject.fromObject(treeLvId);
		//获取客户中有洲信息的数据
		List<CotCustomer> listCust = new ArrayList<CotCustomer>();
		String hql  = " from CotCustomer where proviceId.id is not null and areaId.id="+jsonObject.getInt("area")+" and nationId.id="+jsonObject.getInt("country");
		listCust = this.findRecordByHql(hql);
		List<Integer> nationIds = new ArrayList<Integer>();
		for(CotCustomer customer : listCust){
			if(!nationIds.contains(customer.getProviceId().getId())){
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
		List<CustomerTreeNode> list = new ArrayList<CustomerTreeNode>();
		for(CotProvice province : listProvince){
			CustomerTreeNode node = new CustomerTreeNode();
			node.setText(province.getProvinceName());
			node.setTreeId(province.getId());
			node.setTreeLv(3);//1代表周节点
			JSONObject json = jsonObject;
			json.put("area", jsonObject.getInt("area"));
			json.put("country", jsonObject.getInt("country"));
			json.put("province",province.getId());
			node.setTreeLvId(json.toString());
			node.setLeaf(true);
			list.add(node);
		}
		return list;
	}
	

	/* (non-Javadoc)
	 * @see com.sail.cot.service.customer.CotCustomerService#shareToEmps(java.util.List, java.util.List)
	 */
	@Override
	public void shareToEmps(List<Integer> custIds, List<Integer> empIds,Integer currentEmpId) {
		List<CotCustomerTrackemps> list = new ArrayList<CotCustomerTrackemps>();
		for(Integer custId : custIds){
			for(Integer empId : empIds){
				String hql = " from CotCustomerTrackemps where custId = "+custId +" and empId = "+empId;
				List isExist = this.findRecordByHql(hql);
				//如果存在就不在添加
				if(CollectionUtils.isNotEmpty(isExist)) continue;
				CotCustomerTrackemps trackemps = new CotCustomerTrackemps();
				trackemps.setCustId(custId);
				trackemps.setEmpId(empId);
				trackemps.setShareEmpId(currentEmpId);
				list.add(trackemps);
			}
		}
		this.saveOrUpdateList(list);
	}


}
