package com.sail.cot.action.price;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotPrice;
/**
 * *********************************************
* @Copyright :(C),2008-2010
* @CompanyName :厦门市旗航软件有限公司(www.xmqh.net)
* @Version :1.0
* @Date :2012-9-6
* @author : azan
* @class :CotPriceAction.java
* @Description :报价管理
 */
@SuppressWarnings("serial")
public class CotPriceAction extends AbstractAction{
	private CotPrice price;
	private Date startTime;
	private Date endTime;
	
	public String query(){
		return "query";
	}
	
	@SuppressWarnings("unchecked")
	public String list() {
		StringBuffer hql = new StringBuffer();
		hql.append("from CotPrice obj where 1=1");
		Map<String,Object> whereMap = new HashMap<String, Object>();
		
		hql.append(" and obj.quoteType=:quoteType");
		whereMap.put("quoteType", 0);
		
		if(price != null){
    		if(price.getInputPeople() != null && !price.getInputPeople().trim().equals("")){
    			hql.append(" and obj.inputPeople like :inputPeople");
    			whereMap.put("inputPeople", "%"+price.getInputPeople()+"%");
    		}
    		if(price.getCarrier() != null && !price.getCarrier().trim().equals("")){
    			hql.append(" and obj.carrier like :carrier");
    			whereMap.put("carrier", "%"+price.getCarrier()+"%");
    		}
    		if(price.getPolCode() != null && !price.getPolCode().trim().equals("")){
    			hql.append(" and obj.polCode like :polCode");
    			whereMap.put("polCode", "%"+price.getPolCode()+"%");
    		}
    		if(price.getPodCode() != null && !price.getPodCode().trim().equals("")){
    			hql.append(" and obj.podCode like :podCode");
    			whereMap.put("podCode", "%"+price.getPodCode()+"%");
    		}
    		if(price.getOnets() != null && !price.getOnets().trim().equals("")){
    			hql.append(" and obj.onets like :onets");
    			whereMap.put("onets", "%"+price.getOnets()+"%");
    		}
    		if(price.getTwots() != null && !price.getTwots().trim().equals("")){
    			hql.append(" and obj.twots like :twots");
    			whereMap.put("twots", "%"+price.getTwots()+"%");
    		}
    		if(price.getThreets() != null && !price.getThreets().trim().equals("")){
    			hql.append(" and obj.threets like :threets");
    			whereMap.put("threets", "%"+price.getThreets()+"%");
    		}
    		if(startTime != null){
    			hql.append(" and obj.validity >= :startSmsDate");
    			whereMap.put("startSmsDate", startTime);
    		}
    		if(endTime != null){
    			hql.append(" and obj.validity <= :endSmsDate");
    			whereMap.put("endSmsDate", endTime);
    		}
		}
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

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public CotPrice getPrice() {
		return price;
	}

	public void setPrice(CotPrice price) {
		this.price = price;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}


}
