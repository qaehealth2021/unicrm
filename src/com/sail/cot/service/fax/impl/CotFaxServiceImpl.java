/**
 * 
 */
package com.sail.cot.service.fax.impl;

import java.io.UnsupportedEncodingException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.stereotype.Service;

import com.jason.core.exception.DAOException;
import com.sail.cot.common.service.impl.BaseServiceImpl;
import com.sail.cot.domain.CotCustomer;
import com.sail.cot.domain.CotDictionary;
import com.sail.cot.domain.CotEmps;
import com.sail.cot.domain.CotFaxRecv;
import com.sail.cot.domain.CotFaxSend;
import com.sail.cot.domain.CotFaxdeviceMap;
import com.sail.cot.domain.CotOrderNo;
import com.sail.cot.service.BaseData;
import com.sail.cot.service.fax.CotFaxService;

/**
 * *********************************************
 * 
 * @Copyright :(C),2008-2010
 * @CompanyName :厦门市旗航软件有限公司(www.xmqh.net)
 * @Version :1.0
 * @Date :2012-10-9
 * @author : azan
 * @class :CotFaxServiceImpl.java
 * @Description :
 */
@Service("CotFaxService")
public class CotFaxServiceImpl extends BaseServiceImpl implements CotFaxService {
	
	@Resource(name="BaseData")
	private BaseData baseData;
	@Override
	public String getRealSendFile(String sendFile, Integer empsId) throws UnsupportedEncodingException {
		CotEmps emps = (CotEmps) this.getBaseDao().getById(CotEmps.class,
				empsId);
		CotFaxdeviceMap faxMapId = emps.getFaxMapId();
		String str = sendFile.replace("/", "\\");
		String ip = "\\\\" + faxMapId.getServerIpAddr() + "\\" + str;
		return ip;
	}

	@Override
	public void callProc(Integer faxSendId, Integer empsId) throws DAOException {
		SqlParameter[] sp = new SqlParameter[1];
		sp[0] = new SqlParameter("sendId", Types.INTEGER);
		Map map = new HashMap();
		map.put("sendId", faxSendId);
		CotEmps emps = (CotEmps) this.getBaseDao().getById(CotEmps.class,
				empsId);
		CotFaxdeviceMap faxMapId = emps.getFaxMapId();
		if(faxMapId!=null){
			this.getBaseDao().callProc(faxMapId.getUsedSp(), sp, map);
		}
	}

	@Override
	public void saveFaxAndSendAgain(Integer faxSendId) throws Exception {
		CotFaxSend faxSend = (CotFaxSend) this.getBaseDao().getById(
				CotFaxSend.class, faxSendId);
		CotFaxSend faxSendNew = new CotFaxSend();
		BeanUtils.copyProperties(faxSendNew, faxSend);
		faxSendNew.setId(null);
		List list = new ArrayList();
		list.add(faxSendNew);
		this.getBaseDao().saveRecords(list);
		this.callProc(faxSendNew.getId(), faxSendNew.getEmpsId().getId());
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.service.fax.CotFaxService#saveOrderNo(java.lang.String)
	 */
	public void saveOrderNo(String orderNo) throws DAOException{
		String hql = " from CotOrderNo where orderNo = :orderNo";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("orderNo", orderNo);
		List listOrder = this.findRecordByHql(hql, whereMap);
		if (CollectionUtils.isEmpty(listOrder)) {
			CotOrderNo cotOrderNo = new CotOrderNo();
			cotOrderNo.setOrderNo(orderNo);
			List list=new ArrayList();
			list.add(cotOrderNo);
			this.getBaseDao().saveRecords(list);
		}
	}

	@Override
	public void updateFaxrecvs(List<String> list, String orderNo,
			String remark, String airRemark,Integer customerId, Integer statusId,Integer empsId,String pol,String pod)
			throws Exception {
		List listObj = new ArrayList();
		Iterator<?> it = list.iterator();
		while (it.hasNext()) {
			String id = (String) it.next();
			CotFaxRecv faxRecv = (CotFaxRecv) this.getBaseDao().getById(
					CotFaxRecv.class, Integer.parseInt(id));
			faxRecv.setOrderNo(orderNo);
			faxRecv.setRemark(remark);
			faxRecv.setAirRemark(airRemark);
			if(customerId!=null){
				CotCustomer cust = new CotCustomer();
				cust.setId(customerId);
				faxRecv.setCustomerId(cust);
			}
			if(statusId!=null){
				CotDictionary status = new CotDictionary();
				status.setId(statusId);
				faxRecv.setStatusId(status);
			}
			if(empsId!=null){
				CotEmps emps = new CotEmps();
				emps.setId(empsId);
				faxRecv.setEmpsId(emps);
			}
			faxRecv.setOrderPol(pol);
			faxRecv.setOrderPod(pod);
			listObj.add(faxRecv);
		}
		this.getBaseDao().updateRecords(listObj);
		if(orderNo!=null && !orderNo.equals("")){
			CotOrderNo orderNoNew = new CotOrderNo();
			orderNoNew.setOrderNo(orderNo);
			orderNoNew.setCustId(customerId);
			orderNoNew.setTrackStatus(statusId);
			orderNoNew.setRemark(remark);
			orderNoNew.setAirRemark(airRemark);
			orderNoNew.setPol(pol);
			orderNoNew.setPod(pod);
			this.baseData.saveOrderNo(orderNoNew);
		}
	}

	@Override
	public void saveAfterFaxSend(String orderNo, Integer faxSendId,
			Integer empsId) throws DAOException {
		if(orderNo!=null && !orderNo.equals("")){
			this.saveOrderNo(orderNo);
		}
		this.callProc(faxSendId, empsId);
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.service.fax.CotFaxService#getEmpFromCustId(java.lang.Integer)
	 */
	public List getEmpFromCustId(Integer custId){
		String hql="select obj from CotCustomer c,CotContact t, CotEmps obj where t.empsId.id=obj.id and t.customerId=c.id and c.id="+custId;
		return this.getBaseDao().find(hql);
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.service.fax.CotFaxService#updateFaxRecvFlag(java.lang.Integer, java.lang.Integer)
	 */
	public boolean updateFaxRecvFlag(Integer recvId,Integer state) throws DAOException{
		String updateHql="update CotFaxRecv obj set readflag=? where obj.id=?";
		this.getBaseDao().executeUpdate(updateHql, state,recvId);
		return true;
	}

}
