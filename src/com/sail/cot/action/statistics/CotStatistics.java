/**
 * 
 */
package com.sail.cot.action.statistics;

import java.util.List;

import javax.annotation.Resource;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotEmps;
import com.sail.cot.entity.StatisticsTreeNode;
import com.sail.cot.query.QueryInfo;
import com.sail.cot.service.statistics.StatisticsService;
import com.sail.cot.util.GridServerHandler;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Sep 14, 2012 5:28:45 PM </p>
 * <p>Class Name: CotStatistics.java </p>
 * @author achui
 *
 */
public class CotStatistics extends AbstractAction{

	/* (non-Javadoc)
	 * @see com.sail.cot.common.AbstractAction#query()
	 */
	private int treeId;
	private int treeLv;
	private String treeLvId;
	private Integer custId;
	
	private String orderNo;
	private Integer queryCustId;
	private Integer queryEmpId;
	
	public Integer getCustId() {
		return custId;
	}

	public void setCustId(Integer custId) {
		this.custId = custId;
	}

	public String getTreeLvId() {
		return treeLvId;
	}

	public void setTreeLvId(String treeLvId) {
		this.treeLvId = treeLvId;
	}

	public int getTreeId() {
		return treeId;
	}

	public void setTreeId(int treeId) {
		this.treeId = treeId;
	}

	public int getTreeLv() {
		return treeLv;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public Integer getQueryCustId() {
		return queryCustId;
	}

	public void setQueryCustId(Integer queryCustId) {
		this.queryCustId = queryCustId;
	}

	public Integer getQueryEmpId() {
		return queryEmpId;
	}

	public void setQueryEmpId(Integer queryEmpId) {
		this.queryEmpId = queryEmpId;
	}

	public void setTreeLv(int treeLv) {
		this.treeLv = treeLv;
	}

	@Override
	public String query() {
		// TODO Auto-generated method stub
		return "query";
	}
	
	public String list(){
		StringBuffer hql = new StringBuffer();
		hql.append("select * from cot_temp_report where 1=1");
		StringBuffer where = new StringBuffer();
		if(this.queryEmpId!=null){
			where.append(" and belongEmpId="+queryEmpId);
		}
		if(this.queryCustId!=null){
			where.append(" and custId="+queryCustId);
		}
		if(this.orderNo!=null && !"".equals(this.orderNo)){
			where.append(" and orderNo like '%"+this.orderNo+"%'");
		}
		System.out.println(where.toString());
		try {
			QueryInfo queryInfo = new QueryInfo();
			queryInfo.setSelectString(hql.toString());
			queryInfo.setCountQuery("select count(*) from cot_temp_report where 1=1 ");
			queryInfo.setQueryString(where.toString());
			queryInfo.setStartIndex(pageData.getStart());
			queryInfo.setCountOnEachPage(pageData.getLimit());
			jsonString = this.getBaseSerivce().getJsonDataJDBC(queryInfo, null);
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}

	public String listEmps(){
		CotEmps currEmp = super.getCurrEmps();
		List<StatisticsTreeNode> list = this.statisticsService.getEmpTreeNode(this.custId,currEmp);
		String[] exclude = {"children"};
		GridServerHandler gd = new GridServerHandler(exclude);
		gd.setData(list);
		jsonString = gd.getLoadDataText();
		System.out.println(jsonString);
		return Constants.JSONDATA;
	}
	
	public String listCust(){
		List<StatisticsTreeNode> list = this.statisticsService.getCustTreeNode(this.treeLvId,this.custId);
		String[] exclude = {"children"};
		GridServerHandler gd = new GridServerHandler(exclude);
		gd.setData(list);
		jsonString = gd.getLoadDataText();
		System.out.println(jsonString);
		return Constants.JSONDATA;
	}
	public String listOrder(){
		String flag = this.getRequest().getParameter("flag");
		if(flag == null) flag = "MAIL";
		List<StatisticsTreeNode> list = null;
		if(flag.equals("MAIL")){
			list =  this.statisticsService.getOrderTreeNodeMail(this.treeLvId);
		}else if(flag.equals("SMS")){
			list =  this.statisticsService.getOrderTreeNodeSms(this.treeLvId);
		}else if(flag.equals("FAXRECV")){
			list =  this.statisticsService.getOrderTreeNodeFax(this.treeLvId,"recv");
		}else if(flag.equals("FAXSEND")){
			list =  this.statisticsService.getOrderTreeNodeFax(this.treeLvId,"send");
		}
		String[] exclude = {"children"};
		GridServerHandler gd = new GridServerHandler(exclude);
		gd.setData(list);
		jsonString = gd.getLoadDataText();
		System.out.println(jsonString);
		return Constants.JSONDATA;
	}
	public String listArea(){
		List<StatisticsTreeNode> list = this.statisticsService.getAreaTreeNodeByEmpId(this.treeLvId);
		String[] exclude = {"children"};
		GridServerHandler gd = new GridServerHandler(exclude);
		gd.setData(list);
		jsonString = gd.getLoadDataText();
		System.out.println(jsonString);
		return Constants.JSONDATA;
	}
	public String listNation(){
		List<StatisticsTreeNode> list = this.statisticsService.getCountryTreeNode(this.treeLvId);
		String[] exclude = {"children"};
		GridServerHandler gd = new GridServerHandler(exclude);
		gd.setData(list);
		jsonString = gd.getLoadDataText();
		System.out.println(jsonString);
		return Constants.JSONDATA;
	}
	public String listProvince(){
		List<StatisticsTreeNode> list = this.statisticsService.getProvinceTreeNode(this.treeLvId);
		String[] exclude = {"children"};
		GridServerHandler gd = new GridServerHandler(exclude);
		gd.setData(list);
		jsonString = gd.getLoadDataText();
		return Constants.JSONDATA;
	}
	public String listUnknow(){
		List<StatisticsTreeNode> list = this.statisticsService.getUnKnownCustTreeNode(this.treeLvId);
		String[] exclude = {"children"};
		GridServerHandler gd = new GridServerHandler(exclude);
		gd.setData(list);
		jsonString = gd.getLoadDataText();
		return Constants.JSONDATA;
	}
	@Resource(name="StatisticsService")
	private StatisticsService statisticsService;
}
