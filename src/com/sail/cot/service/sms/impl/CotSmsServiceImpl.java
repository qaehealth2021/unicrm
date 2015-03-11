/**
 * 
 */
package com.sail.cot.service.sms.impl;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.stereotype.Service;

import com.jason.core.exception.DAOException;
import com.jasson.im.api.APIClient;
import com.jasson.im.api.RPTItem;
import com.sail.cot.common.service.impl.BaseServiceImpl;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.domain.CotContact;
import com.sail.cot.domain.CotDictionary;
import com.sail.cot.domain.CotEmps;
import com.sail.cot.domain.CotSms;
import com.sail.cot.service.sms.CotSmsService;
import com.zhao.mail.util.CodeUtil;

/**
 * <p>
 * Title: 旗航外贸管理软件V8.0
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Copyright: Copyright (c) 2011
 * </p>
 * <p>
 * Company: 厦门市旗航软件有限公司
 * </p>
 * <p>
 * Create Time: Oct 11, 2012 6:24:50 PM
 * </p>
 * <p>
 * Class Name: CotSmsServiceImpl.java
 * </p>
 * 
 * @author achui
 * 
 */
@Service("CotSmsService")
public class CotSmsServiceImpl extends BaseServiceImpl implements CotSmsService {

	private String host = ContextUtil.getProperty("smsdb.properties",
			"sms.db.host");
	private String dbName = ContextUtil.getProperty("smsdb.properties",
			"sms.db.dbName");
	private String apiId = ContextUtil.getProperty("smsdb.properties",
			"sms.db.apiId");
	private String name = ContextUtil.getProperty("smsdb.properties",
			"sms.db.name");
	private String pwd = ContextUtil.getProperty("smsdb.properties",
			"sms.db.pwd");

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.sail.cot.service.sms.CotSmsService#getRPTItem(int,
	 * java.lang.String)
	 */
	@Override
	public RPTItem[] getRPTItem(int smId, String mobile) {
		APIClient client = new APIClient();
		// 初始化数据库
		client.init(this.host, this.name, this.pwd, this.apiId);
		RPTItem[] listItems = client.receiveRPT(smId, mobile, -1);
		return listItems;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.sail.cot.service.sms.CotSmsService#sentSM(java.lang.String[],
	 * java.lang.String, long)
	 */
	@Override
	public int sentSM(String[] mobiles, String content, long smID) {
		// TODO Auto-generated method stub
		APIClient client = new APIClient();
		// 初始化数据库
		client.init(this.host, this.name, this.pwd, this.apiId, this.dbName);
		int result = client.sendSM(mobiles, content, smID);
		return result;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.sail.cot.service.sms.CotSmsService#saveSms(java.lang.Integer[],
	 * java.lang.String, java.lang.Integer, java.lang.String, java.lang.String)
	 */
	public int saveSms(Integer[] contactIds, String orderNo, Integer statusId,
			String remark, String airRemark, String content)
			throws DAOException {
//		HttpSession session = WebContextFactory.get().getSession();
//		CotEmps emp = (CotEmps) session.getAttribute("emp");
		Object[] tmp=this.getSessionByDwr();
		CotEmps emp =(CotEmps) tmp[0]; 
		
		java.util.Random rdm = new Random();
		Integer smId = rdm.nextInt(99999999);
		List list = new ArrayList();
		String[] mobiles = new String[contactIds.length];
		for (int i = 0; i < contactIds.length; i++) {
			CotContact cotContact = (CotContact) this.getBaseDao().getById(
					CotContact.class, contactIds[i]);
			mobiles[i] = cotContact.getContactMobile();
			CotSms cotSms = new CotSms();
			cotSms.setEmpId(emp);
			cotSms.setOrderNo(orderNo);
			if (statusId != null) {
				CotDictionary cotDictionary = (CotDictionary) this.getBaseDao()
						.getById(CotDictionary.class, statusId);
				cotSms.setStatusId(cotDictionary);
			}
			cotSms.setRemark(remark);
			cotSms.setAirRemark(airRemark);
			cotSms.setSmId(smId);
			cotSms.setSrcId(smId);
			cotSms.setMobiles(cotContact.getContactMobile());
			cotSms.setContent(content);
			cotSms.setIsWap(0);
			cotSms.setUrl("");
			cotSms.setSendTime(null);
			cotSms.setSmType(0);
			cotSms.setMsgFmt(0);
			cotSms.setTpPid(0);
			cotSms.setTpUdhi(0);
			cotSms.setFeeUserType(0);
			cotSms.setContactId(cotContact);
			cotSms.setCustomerId(cotContact.getCustomerId());
			cotSms.setSaveTime(new Date());
			list.add(cotSms);
		}
		this.getBaseDao().saveRecords(list);
		return this.sentSM(mobiles, content, smId);
	}

	public boolean saveOtherSms(Integer[] contactIds, String nbrs, String orderNo,
			Integer statusId, String remark, String airRemark, String content)
			throws DAOException {
//		HttpSession session = WebContextFactory.get().getSession();
//		CotEmps emp = (CotEmps) session.getAttribute("emp");
		Object[] tmp=this.getSessionByDwr();
		CotEmps emp =(CotEmps) tmp[0];
		List list = new ArrayList();
		if(contactIds!=null){
			for (int i = 0; i < contactIds.length; i++) {
				CotContact cotContact = (CotContact) this.getBaseDao().getById(
						CotContact.class, contactIds[i]);
				CotSms cotSms = new CotSms();
				cotSms.setEmpId(emp);
				cotSms.setOrderNo(orderNo);
				if (statusId != null) {
					CotDictionary cotDictionary = (CotDictionary) this.getBaseDao()
							.getById(CotDictionary.class, statusId);
					cotSms.setStatusId(cotDictionary);
				}
				cotSms.setRemark(remark);
				cotSms.setAirRemark(airRemark);
				java.util.Random rdm = new Random();
				Integer smId = rdm.nextInt(99999999);
				cotSms.setSmId(smId);
				cotSms.setSrcId(smId);
				String mob=cotContact.getContactMobile();
				if(mob!=null){
					int t=mob.indexOf("0");
					if(t==0){
						mob=mob.substring(1);
					}
				}
				cotSms.setMobiles(mob);
				cotSms.setContent(content);
				cotSms.setIsWap(0);
				cotSms.setUrl("");
				cotSms.setSendTime(null);
				cotSms.setSmType(0);
				cotSms.setMsgFmt(0);
				cotSms.setTpPid(0);
				cotSms.setTpUdhi(0);
				cotSms.setFeeUserType(0);
				cotSms.setContactId(cotContact);
				cotSms.setCustomerId(cotContact.getCustomerId());
				cotSms.setSaveTime(new Date());
				list.add(cotSms);
			}
		}
		//陌生人的手机号码
		if(!"".equals(nbrs)){
			String[] ary =nbrs.split(",");
			for (int i = 0; i < ary.length; i++) {
				CotSms cotSms = new CotSms();
				cotSms.setEmpId(emp);
				cotSms.setOrderNo(orderNo);
				if (statusId != null) {
					CotDictionary cotDictionary = (CotDictionary) this.getBaseDao()
							.getById(CotDictionary.class, statusId);
					cotSms.setStatusId(cotDictionary);
				}
				cotSms.setRemark(remark);
				cotSms.setAirRemark(airRemark);
				java.util.Random rdm = new Random();
				Integer smId = rdm.nextInt(99999999);
				cotSms.setSmId(smId);
				cotSms.setSrcId(smId);
				cotSms.setMobiles(ary[i]);
				cotSms.setContent(content);
				cotSms.setIsWap(0);
				cotSms.setUrl("");
				cotSms.setSendTime(null);
				cotSms.setSmType(0);
				cotSms.setMsgFmt(0);
				cotSms.setTpPid(0);
				cotSms.setTpUdhi(0);
				cotSms.setFeeUserType(0);
				cotSms.setContactId(null);
				cotSms.setCustomerId(null);
				cotSms.setSaveTime(new Date());
				list.add(cotSms);
			}
		}
		this.getBaseDao().saveRecords(list);
		return true;
	}

	public String sendSms(String mobile, String msg) throws Exception {
		String user = "unilogistics";
		String pwd = "773030";
		msg = msg.replace("&", "?");
		msg = CodeUtil.urlEncode(msg, "GB2312");
		
		String str = "http://www.xmfree.net:10085/shttp.recmt?ua=" + user
				+ "&pw=" + pwd + "&gwid=1&subcode=rtf&mobile=" + mobile
				+ "&msg=" + msg;
		URL url = new URL(str);
		URLConnection connection = url.openConnection();
		HttpURLConnection httpUrlConnection = (HttpURLConnection) connection;
		httpUrlConnection.setDoOutput(true);
		httpUrlConnection.setRequestMethod("GET");
		httpUrlConnection.connect();
		// 获得回馈相应，是个XML格式
		InputStream is = httpUrlConnection.getInputStream();
		byte[] b = new byte[is.available()];
		is.read(b);
		String str1 = new String(b, "UTF-8");
		String result = this.readStringXmlOut(str1);
		System.out.println(result);
		is.close();
		if ("发送成功".equals(result)) {
			return "";
		} else {
			return result;
		}
	}

	/**
	 * @description result值 含义 1 发送成功 -1 帐号或密码为空 -2 下发号码为空 -3 下发内容为空 -5 下发号码错误
	 *              -9 没有指定通道 -10 下发账户已停用 -11 下发账户余额不足 -17 密码错误次数超限 -18 密码错误 -19
	 *              账户类型不符 -20 单次提交超过规定限额 -99 系统异常
	 * @param xml
	 * @return String
	 */
	public String readStringXmlOut(String xml) {
		Document doc = null;
		try {
			doc = DocumentHelper.parseText(xml);
			Element rootElt = doc.getRootElement(); // 获取根节点
			Integer result = Integer
					.parseInt(rootElt.elementTextTrim("Result"));
			System.out.println("Result：" + result);
			switch (result) {
			case -1:
				return "短信帐号或密码为空";
			case -2:
				return "短信号码为空";
			case -3:
				return "短信内容不能为空";
			case -5:
				return "短信号码错误";
			case -9:
				return "没有指定通道";
			case -10:
				return "短信账户已停用";
			case -11:
				return "短信账户余额不足,不能再发短信";
			case -17:
				return "短信帐号密码错误次数超限";
			case -18:
				return "短信帐号密码错误";
			case -19:
				return "短信账户类型不符";
			case -20:
				return "单次提交超过规定限额";
			case -99:
				return "系统异常";
			default:
				break;
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return "发送成功";
	}

}
