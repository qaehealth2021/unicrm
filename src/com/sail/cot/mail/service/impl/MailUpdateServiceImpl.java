package com.sail.cot.mail.service.impl;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.commons.fileupload.FileItem;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.service.impl.BaseServiceImpl;
import com.sail.cot.common.util.ExceptionStackTracePaser;
import com.sail.cot.common.util.Log4WebUtil;
import com.sail.cot.common.util.StringUtil;
import com.sail.cot.domain.CotMail;
import com.sail.cot.domain.CotMailGarbageCfg;
import com.sail.cot.domain.CotOrderNo;
import com.sail.cot.mail.service.MailUpdateService;
import com.sail.cot.mail.util.MailConstants;
import com.sail.cot.service.BaseData;
import com.zhao.mail.util.MailServiceConstants;
/**
 * 
 * <p>Title: 旗航 MailServer-2.0</p>
 * <p>Description:邮件更新操作类</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Mar 1, 2012 11:19:54 AM </p>
 * <p>Class Name: MailUpdateServiceImpl.java </p>
 * @author zhao
 *
 */
@Service("MailUpdateService")
public class MailUpdateServiceImpl extends BaseServiceImpl implements MailUpdateService{

	private Logger logger = Log4WebUtil.getLogger(MailUpdateServiceImpl.class);

	@Resource(name="BaseData")
	private BaseData baseData;
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailUpdateService#deleteMails(java.util.List)
	 */
	public void deleteMails(List<Integer> ids) {
		logger.debug("执行彻底删除邮件方法");
		this.deleteIntListReturnIds(ids, "CotMail");
	}

	/**
	 * 设置收件箱邮件为已读或未读
	 * @param ids
	 * @param isNew true设置为未读,false设置为已读
	 * @throws ServiceException 
	 */
	public void updateMailRead(List<Integer> ids, boolean isRead) throws ServiceException {
		logger.debug("更新本地邮件状态");
		if (ids == null || ids.size() == 0)
			return ;
		String hql  = "update CotMail set isRead = :isRead where id in(:ids)";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("isRead", isRead);
		whereMap.put("ids", ids);
		this.updateOrDelTable(hql, whereMap);
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailUpdateService#moveAssignMail(java.util.Map, com.sail.cot.domain.CotMail)
	 */
	@Override
	public void moveAssignMail(Map<String, Integer> idMap, CotMail cotMail) {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailUpdateService#relateOrder(java.util.List, java.lang.String)
	 */
	@Override
	public void relateOrder(List<Integer> ids, String jsonParam) {
		logger.debug("关联邮件订单");
		if (ids == null || ids.size() == 0)
			return ;
		String hql  = "update CotMail set orderNo = :orderNo,orderRemark=:orderRemark," +
				"orderAirRemark=:orderAirRemark,trackStatus.id=:trackStatus," +
				"orderPod=:orderPod,orderPol=:orderPol,"+
				"consignCustId.id=:consignCustId,"+
				"custId.id=:customerId where id in(:ids)";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		JSONObject jsonObject = JSONObject.fromObject(jsonParam);
		whereMap.put("orderNo", jsonObject.getString("orderNo"));
		whereMap.put("orderRemark", jsonObject.getString("orderRemark"));
		whereMap.put("orderAirRemark", jsonObject.getString("orderAirRemark"));
		whereMap.put("trackStatus", jsonObject.getInt("trackStatus"));
		whereMap.put("customerId", jsonObject.getInt("customerId"));
		whereMap.put("consignCustId", jsonObject.getInt("consignCustId"));
		whereMap.put("orderPod", jsonObject.getString("orderPod"));
		whereMap.put("orderPol", jsonObject.getString("orderPol"));
		
		whereMap.put("ids", ids);
		this.updateOrDelTable(hql, whereMap);
		//往订单单号表中插入一条数据,用于关联订单时查找
		//TODO:需要添加字段
		CotOrderNo orderNo = new CotOrderNo();
		orderNo.setOrderNo(jsonObject.getString("orderNo"));
		orderNo.setCustId(jsonObject.getInt("customerId"));
		orderNo.setTrackStatus(jsonObject.getInt("trackStatus"));
		orderNo.setRemark(jsonObject.getString("orderRemark"));
		orderNo.setAirRemark(jsonObject.getString("orderAirRemark"));
		orderNo.setPol(jsonObject.getString("orderPol"));
		orderNo.setPod(jsonObject.getString("orderPod"));
		this.baseData.saveOrderNo(orderNo);
	}
	
	@Override
	//负载均衡时调用，进行文件拷贝
	public Object upload(FileItem fileItem, String uploadPath, String tbName,
			String id, String field, String fkIdVal, String fkField,
			boolean doDbOp, String paramJson, boolean isRName,
			HttpSession session) throws ServiceException {
		String fileName = StringUtil.takeOutFileName(fileItem.getName());
		
		File pf = new File(MailServiceConstants.MAIL_FILE_BASEPATH + uploadPath);
		if (!pf.exists())
			pf.mkdirs();
		File file = new File(MailServiceConstants.MAIL_FILE_BASEPATH + uploadPath + fileName);
		// 上传文件
		try {
			fileItem.write(file);
		} catch (Exception e) {
			String msg = ExceptionStackTracePaser.paserStactTrace(e);
			throw new ServiceException("文件上传异常：" + msg);
		}
		
		// 上传获取文件名
		JSONObject json = new JSONObject();
		json.put("filePath", uploadPath);
		json.put("fileName", MailConstants.MAIL_FILE_DOWN_URL + uploadPath + fileName);
		json.put("success", true);
		return json.toString();
	}
	
	public CotMailGarbageCfg findCotMailGarbageCfgByAccountId(Integer accountId){
		String hql="from CotMailGarbageCfg obj where obj.accountId="+accountId;
		List list=this.getBaseDao().find(hql);
		if(list.size()>0){
			return (CotMailGarbageCfg) list.get(0);
		}else{
			return null;
		}
	}
	
}
