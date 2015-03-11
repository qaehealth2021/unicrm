/**
 * 
 */
package com.sail.cot.service.system.emp.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.ehcache.Cache;
import net.sf.ehcache.Element;
import net.sf.json.JSONObject;

import org.comet4j.core.CometConnection;
import org.comet4j.core.CometContext;
import org.comet4j.core.CometEngine;
import org.directwebremoting.WebContext;
import org.directwebremoting.WebContextFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jason.core.exception.DAOException;
import com.sail.cot.common.service.impl.BaseServiceImpl;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotCompany;
import com.sail.cot.domain.CotDept;
import com.sail.cot.domain.CotEmps;
import com.sail.cot.domain.CotLoginInfo;
import com.sail.cot.domain.CotNation;
import com.sail.cot.domain.CotProvice;
import com.sail.cot.domain.CotSysLog;
import com.sail.cot.entity.CheckStatisticsTreeNode;
import com.sail.cot.entity.StatisticsTreeNode;
import com.sail.cot.query.QueryInfo;
import com.sail.cot.service.statistics.StatisticsService;
import com.sail.cot.service.system.emp.CotLoginService;
import com.zhao.mail.util.CommonUtil;

/**
 * 系统登录实现
 * 
 * @Title: 外贸管理系统
 * @Description:
 * @Copyright: Copyright (c) 2011
 * @Company: 厦门市旗航软件有限公司
 * @Create Time: Nov 7, 2011
 * @Class Name: CotLoginServiceImpl.java
 * @author azan
 * 
 */
@Service("CotLoginService")
@Transactional
public class CotLoginServiceImpl extends BaseServiceImpl implements
		CotLoginService {
	
	@Resource(name="StatisticsService")
	StatisticsService statisticsService;

	// 根据IP地址删除
	public void deleteLoginInfos(String ip) {
		String hql = "from CotLoginInfo c where c.sessionId='" + ip + "'";
		List<?> list = this.getBaseDao().find(hql);
		List<Integer> ids = new ArrayList<Integer>();
		for (int i = 0; i < list.size(); i++) {
			CotLoginInfo cotLoginInfo = (CotLoginInfo) list.get(i);
			ids.add(cotLoginInfo.getId());
		}
		if (ids.size() != 0) {
			try {
				this.getBaseDao().deleteRecordByIds(ids, "CotLoginInfo");
			} catch (DAOException e) {
				e.printStackTrace();
			}
		}
	}

	@Override
	public void addToSysLog(CotEmps curEmps, Integer opType, String ip,
			String sessionId) throws DAOException {
		// TODO Auto-generated method stub
		CotSysLog sysLog = new CotSysLog();
		sysLog.setEmpsId(curEmps);
		if (opType == 0) {
			// 登录
			sysLog.setOpMessage(curEmps.getEmpsId() + "登录系统");
			// 增加一条登录记录
			CotLoginInfo cotLoginInfo = this.findIsExistLoginInfo(sessionId);
			// //往登录人数表中添加记录
			if (cotLoginInfo == null) {
				cotLoginInfo = new CotLoginInfo();
				cotLoginInfo.setLoginEmpid(curEmps.getId().toString());
				cotLoginInfo.setLoginName(curEmps.getEmpsId());
				cotLoginInfo.setLoginIpaddr(ip);
				cotLoginInfo.setSessionId(sessionId);
			}
			cotLoginInfo.setLoginTime(new Date());
			this.getBaseDao().saveOrUpdateRecord(cotLoginInfo);
		} else if (opType == 9) {
			// 登出
			sysLog.setOpMessage(curEmps.getEmpsId() + "退出系统");
			this.deleteLoginInfos(sessionId);
		}
		sysLog.setOpType(opType);
		sysLog.setOpModule(ip);
		sysLog.setOpTime(new Timestamp(System.currentTimeMillis()));
		super.addObj(sysLog);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.sail.cot.service.system.module.CotLoginService#login(java.lang.String
	 * , java.lang.String, java.lang.String)
	 */
	public int login(String username, String empsPwd, String otp) {
		CotEmps cotEmps = this.isHasUserName(username);
		if (cotEmps == null)
			return 0;// 用户名不存在
		if (!cotEmps.getEmpsPwd().equals(empsPwd))
			return 1;// 密码错误
		if (cotEmps.getEmpsStatus() != null && cotEmps.getEmpsStatus() == 9)
			return 6;// 员工离职
		// CotServerInfo cotServerInfo = this.isRegister();
		// if (cotServerInfo == null)
		// return 4;// 服务器未注册
		// boolean isExceedMaxPerson =
		// this.isExceedMaxPerson(cotServerInfo);
		// if (isExceedMaxPerson)
		// return 3;// 在线人数已满
		// if ("1".equals(cotServerInfo.getIsAlone()))
		// return 7;// 临时用户登录
		// Integer otpFlag=this.checkOtp(cotEmps,otp);
		// if(otpFlag!=null){
		// return otpFlag;
		// }
		return cotEmps.getId() + 100;
	}

	/**
	 * @see 功能描述（必填）：判断员工登录帐号是否存在,存在返回员工对象,不存在返回null
	 * @see 处理流程（选填）：
	 * @see 调用例子（选填）：
	 * @see 相关说明文件： 返回值：CotEmps
	 * @see Author:azan
	 * @see Create Time:Nov 7, 2011 4:55:42 PM
	 * @param userName
	 * @return
	 */
	public CotEmps isHasUserName(String userName) {
		String hql = "from CotEmps obj where obj.empsId=:empsId";
		Map map = new HashMap();
		map.put("empsId", userName);
		List list = this.getBaseDao().findRecordsByHql(hql, map);
		if (list.size() > 0)
			return (CotEmps) list.get(0);
		else
			return null;
	}

	/**
	 * @see 功能描述（必填）：获得当前登录总人数
	 * @see 处理流程（选填）：
	 * @see 调用例子（选填）：
	 * @see 相关说明文件： 返回值：Integer
	 * @see Author:azan
	 * @see Create Time:Nov 7, 2011 4:55:48 PM
	 * @return
	 */
	public Integer nowEnterEmps() {
		// java.text.SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		// String hql =
		// "select count(distinct c.sessionId) from CotLoginInfo c where DATE(c.loginTime)='"
		// + sdf.format(new Date()) + "'";
		// List<?> listCount = this.getBaseDao().find(hql);
		// return (Integer) listCount.get(0);
		Cache empCache = ContextUtil.getCacheManager("EmpCache");
		return empCache.getSize();
	}

	/**
	 * @see 功能描述（必填）：判断是否需要动态令牌,返回null表示不需要 8--该员工需要命令牌,但是没输入, 9--输入了错误的命令牌,
	 *      10--一个命令牌重复登录
	 * @see 处理流程（选填）：
	 * @see 调用例子（选填）：
	 * @see 相关说明文件： 返回值：Integer
	 * @see Author:azan
	 * @see Create Time:Nov 7, 2011 5:15:34 PM
	 * @param cotEmps
	 * @param otp
	 * @return
	 */
	public Integer checkOtp(CotEmps cotEmps, String otp) {
		// 如果该员工需要输入动态命令牌则必须输入otp
		// if (cotEmps.getEtId() == null)
		// return null;
		if (otp.equals(""))
			return 8;
		// // 判断该命令牌是否正确
		// CotEtOtp cotEtOtp = (CotEtOtp) this.getBaseDao().getById(
		// CotEtOtp.class, cotEmps.getEtId());
		// String seed = cotEtOtp.getAuthKey();
		// int iDrift = cotEtOtp.getCurrDft();
		// long lSucc = cotEtOtp.getCurrSucc();
		//
		// Map hashMap = OTPVerify.ET_CheckPwdz201(seed, // 令牌密钥
		// System.currentTimeMillis() / 1000, // 调用本接口计算机的当前时间
		// 0, // 给0
		// 60, // 给60，因为每60秒变更新的动态口令
		// iDrift, // 漂移值，用于调整硬件与服务器的时间偏差，见手册说明
		// 20, // 认证窗口，见手册说明
		// lSucc, // 成功值，用于调整硬件与服务器的时间偏差，见手册说明
		// otp); // 要认证的动态口令OTP
		//
		// Long nReturn = (Long) hashMap.get("returnCode");
		// if (nReturn == OTPVerify.OTP_SUCCESS) {
		// iDrift = ((Long) hashMap.get("currentDrift")).intValue();
		// lSucc = ((Long) hashMap.get("currentUTCEpoch")).longValue();
		// // 将漂移值和成功值存入cot_et_otp
		// cotEtOtp.setCurrDft(iDrift);
		// cotEtOtp.setCurrSucc(lSucc);
		// List listEt = new ArrayList();
		// listEt.add(cotEtOtp);
		// this.getBaseDao().updateRecords(listEt);
		// } else if (nReturn == OTPVerify.OTP_ERR_REPLAY) {
		// return 10;
		// } else {
		// return 9;
		// }
		return null;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.sail.cot.service.system.emp.CotLoginService#setLoginEmpCache(java
	 * .lang.String, java.lang.Long)
	 */
	public void setLoginEmpCache(String sessId,boolean remove) {
		Cache empCache = ContextUtil.getCacheManager("EmpCache");
		if (remove) {
			empCache.remove(sessId);
		} else {
			Element element = new Element(sessId, 0);
			empCache.put(element);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.sail.cot.service.system.emp.CotLoginService#updateEmpPassWord(java
	 * .lang.Integer, java.lang.String)
	 */
	public void updateEmpPassWord(Integer empId, String newPwd)
			throws Exception {
		String sql = "update CotEmps obj set obj.empsPwd=:empsPwd where obj.id=:id";
		QueryInfo queryInfo = new QueryInfo();
		queryInfo.setSelectString(sql);
		Map map = new HashMap();
		map.put("empsPwd", newPwd);
		map.put("id", empId);
		this.getBaseDao().executeUpdate(queryInfo, map, null);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.sail.cot.service.system.module.CotModuleService#findLoginNum()
	 */
	public Integer findLoginNum() {
		List list = super.findRecordByHql("from CotLoginInfo obj");
		Map<String, CotLoginInfo> map = new HashMap<String, CotLoginInfo>();
		for (int i = 0; i < list.size(); i++) {
			CotLoginInfo login = (CotLoginInfo) list.get(i);
			String key = login.getLoginEmpid() + "_" + login.getLoginIpaddr();
			if (map.get(key) == null) {
				map.put(key, login);
			}
		}
		return map.keySet().size();
	}

	// 过滤掉ip和登录人都一致的
	public List getLoginList(List list) {
		Map<String, CotLoginInfo> map = new HashMap<String, CotLoginInfo>();
		for (int i = 0; i < list.size(); i++) {
			CotLoginInfo login = (CotLoginInfo) list.get(i);
			String key = login.getLoginEmpid() + "_" + login.getLoginIpaddr();
			if (map.get(key) == null) {
				map.put(key, login);
			}
		}
		List listNew = new ArrayList();
		for (String key : map.keySet()) {
			CotLoginInfo login = map.get(key);
			listNew.add(login);
		}
		return listNew;
	}

	// 查询在线人数树
	public String getLoginTree(Integer flag) throws DAOException {
		StringBuffer returnStr = new StringBuffer();
		List listOld = this.getBaseDao().find("from CotLoginInfo obj");
		// 过滤掉ip和登录人都一致的
		List list = this.getLoginList(listOld);

		Map<String, List> map = new HashMap<String, List>();
		for (int i = 0; i < list.size(); i++) {
			CotLoginInfo login = (CotLoginInfo) list.get(i);
			// 登录人
			CotEmps emps = (CotEmps) this.getBaseDao().getById(CotEmps.class,
					Integer.parseInt(login.getLoginEmpid()));
			// 按照用户名--ip显示
			List listChild = null;
			if (map.get(login.getLoginName()) == null) {
				listChild = new ArrayList();
			} else {
				listChild = map.get(login.getLoginName());
			}
			listChild.add(login);
			map.put(login.getLoginName(), listChild);
		}
		return this.modifyStr(this.recursionFn(map, flag));
	}

	// 递归运算
	@SuppressWarnings("unchecked")
	public String recursionFn(Map<String, List> map, Integer flag) {
		StringBuffer returnStr = new StringBuffer();
		int num = 0;
		Iterator<?> it = map.keySet().iterator();
		while (it.hasNext()) {
			num++;
			String key = (String) it.next();
			List listChild = map.get(key);
			for (int i = 0; i < listChild.size(); i++) {
				CotLoginInfo login = (CotLoginInfo) listChild.get(i);

				if (i == 0) {
					returnStr.append("{id:'");
					returnStr.append("aaa" + num);
					returnStr.append("',empId:");
					returnStr.append(login.getLoginEmpid());
					// if (flag == 0) {
					// returnStr.append(login.getLoginEmpid());
					// } else {
					// returnStr.append(-1);
					// }
					returnStr.append(",text:'");
					returnStr.append(key);
					returnStr.append("',parentId:'root_0'");
					returnStr.append(",sessionId:'");
					returnStr.append("");
					returnStr.append("',leaf:false");
					returnStr.append(",children:[");
				}
				returnStr.append("{id:");
				returnStr.append(login.getId());
				returnStr.append(",empId:'");
				returnStr.append(login.getLoginEmpid());
				returnStr.append("',text:'");
				returnStr.append(login.getLoginIpaddr());
				// if (flag == 0) {
				// returnStr.append(login.getLoginIpaddr());
				// } else {
				// returnStr.append(login.getLoginName());
				// }
				returnStr.append("',parentId:'aaa" + num);
				returnStr.append("',sessionId:'");
				returnStr.append(login.getSessionId());
				returnStr.append("',leaf:true},");
			}
			returnStr.append("]},");
		}
		return returnStr.toString();
	}

	// 修饰一下才能满足Extjs的Json格式
	public String modifyStr(String returnStr) {
		return ("[" + returnStr + "]").replaceAll(",]", "]");

	}

	public CotEmps getLoginEmp() {
//		HttpSession session = WebContextFactory.get().getSession();
//		CotEmps emp = (CotEmps) session.getAttribute("emp");
		Object[] tmp=this.getSessionByDwr();
		CotEmps emp =(CotEmps) tmp[0]; 
		return emp;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.sail.cot.service.system.emp.CotLoginService#modifyPwdByEmpId(java
	 * .lang.String, java.lang.String)
	 */
	public int modifyPwdByEmpId(String oldPwd, String newPwd) {
		CotEmps emp = getLoginEmp();
		if (!emp.getEmpsPwd().equals(oldPwd)) {
			return 1;
		}
		emp.setEmpsPwd(newPwd);
		this.getBaseDao().update(emp);
		return 0;
	}

	// 查询是否存在登录记录
	public CotLoginInfo findIsExistLoginInfo(String ip) {
		String hql = "from CotLoginInfo c where c.sessionId='" + ip + "'";
		List<?> list = this.getBaseDao().find(hql);
		if (list != null && list.size() != 0) {
			return (CotLoginInfo) list.get(0);
		} else {
			return null;
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.sail.cot.service.system.emp.CotLoginService#deleteLoginInfo()
	 */
	public void deleteLoginInfo() throws DAOException {
		List<CotLoginInfo> res = this.getBaseDao().getRecords("CotLoginInfo");
		List ids = new ArrayList();
		for (CotLoginInfo loginInfo : res) {
			ids.add(loginInfo.getId());
		}
		if (ids.size() > 0) {
			this.getBaseDao().deleteRecordByIds(ids, "CotLoginInfo");
		}
	}

	public void logDo(CotEmps emps, HttpServletRequest request)
			throws DAOException {
		HttpSession session = request.getSession();
		this.addToSysLog(emps, 9, request.getRemoteAddr(), request.getSession()
				.getId());
		session.removeAttribute(Constants.SESSION_EMP);
		
		String rdm=(String) session.getAttribute(Constants.LOGIN_RAM);
		// 退出是，删除缓存
		this.setLoginEmpCache(rdm,true);
		
		// 删除登录人数表中的记录
		this.deleteLoginInfos(rdm);
		session.removeAttribute(Constants.LOGIN_RAM);
//		ServletContext application = session.getServletContext();
//		ConcurrentHashMap<String, Long> onLineMap = (ConcurrentHashMap<String, Long>) application
//				.getAttribute("onLineMap");
		// 删除内存中的登录记录
//		if (onLineMap != null)
//			onLineMap.remove(request.getRemoteAddr());
	}

	// 退出系统
	public void logOut() throws DAOException {
		WebContext ctx = WebContextFactory.get();
//		HttpSession session = ctx.getSession();
//		CotEmps cotEmps = (CotEmps) session.getAttribute(Constants.SESSION_EMP);
		CotEmps cotEmps =this.getLoginEmp();
		this.logDo(cotEmps, ctx.getHttpServletRequest());
	}

	public List<StatisticsTreeNode> getCompanyTreeNode() {
		String hql="from CotCompany obj order by obj.companyShortName";
		List<CotCompany> comList =this.getBaseDao().findRecordsByHql(hql,null);
		List<StatisticsTreeNode> list = new ArrayList<StatisticsTreeNode>();
		for (CotCompany com : comList) {
			StatisticsTreeNode node = new StatisticsTreeNode();
			Long loginNum=this.getLoginEmpCountWithCompanyId(com.getId());
			Long empNum=this.getEmpCountWithCompanyId(com.getId());
			node.setId("company_"+com.getId());
			node.setText(com.getCompanyShortName()+" ["+loginNum+"/"+empNum+"]");
			node.setTreeId(com.getId());
//			node.setHref("#");
			node.setTreeLv(1);
			// node.setLeaf(custId == 0?false:true);
			node.setExpandable(false);
			JSONObject json = new JSONObject();
			json.put("company", com.getId());
			json.put("dept", 0);
			json.put("emp", 0);
			node.setTreeLvId(json.toString());
			list.add(node);
		}
		return list;
	}
	
	public List<CheckStatisticsTreeNode> getOnlineCompanyTreeNode() {
		String hql="select obj,p from CotEmps e, CotLoginInfo p, CotCompany obj  where e.companyId.id=obj.id and p.loginEmpid=e.id  order by obj.companyShortName";
		List comList =this.getBaseDao().findRecordsByHql(hql,null);
		List<CheckStatisticsTreeNode> list = new ArrayList<CheckStatisticsTreeNode>();
		Map map=new HashMap();
		if(comList!=null){
			Iterator<?> it =comList.iterator();
			while(it.hasNext()){
				Object[] obj=(Object[]) it.next();
				CotCompany com=(CotCompany) obj[0];
				CotLoginInfo cotLoginInfo=(CotLoginInfo) obj[1];
				Integer key=com.getId();
				if(map.get(key)==null){
					CheckStatisticsTreeNode node = new CheckStatisticsTreeNode();
					Long loginNum=this.getLoginEmpCountWithCompanyId(com.getId());
					Long empNum=this.getEmpCountWithCompanyId(com.getId());
					node.setId("company_"+com.getId());
					node.setText(com.getCompanyShortName()+" ["+loginNum+"/"+empNum+"]");
					node.setTreeId(com.getId());
//					node.setHref("#");
					node.setTreeLv(1);
					node.setChecked(false);
					// node.setLeaf(custId == 0?false:true);
					node.setExpandable(false);
					JSONObject json = new JSONObject();
					json.put("company", com.getId());
					json.put("dept", 0);
					json.put("emp", 0);
					json.put("ip", "");
					node.setTreeLvId(json.toString());
					list.add(node);
					map.put(key, key);
				}
			}
		}
		return list;
	}
	
	/**
	 * 获得某个公司底下的员工数
	 * @Method: getEmpCountWithCompanyId
	* @Description: 
	* @param companyId
	* @return : Long
	 */
	private Long getEmpCountWithCompanyId(Integer companyId){
		List list = super.findRecordByHql("select count(*) from CotEmps obj where  obj.companyId.id="+companyId);
		Long num=0l;
		if(list!=null){
			num=(Long) list.get(0);
		}
		return num;
	}
	
	/**
	 * 获得某个部门底下的员工数
	 * @Method: getEmpCountWithDeptId
	* @Description: 
	* @param deptId
	* @return : Long
	 */
	private Long getEmpCountWithDeptId(Integer deptId){
		List list = super.findRecordByHql("select count(*) from CotEmps obj where obj.deptId.id="+deptId);
		Long num=0l;
		if(list!=null){
			num=(Long) list.get(0);
		}
		return num;
	}
	
	private Long getLoginEmpCountWithCompanyId(Integer companyId){
		List list = super.findRecordByHql("select count(*) from CotLoginInfo obj,CotEmps e,CotCompany d where obj.loginEmpid=e.id and e.companyId.id=d.id and d.id="+companyId);
		Long num=0l;
		if(list!=null){
			num=(Long) list.get(0);
		}
		return num;
	}
	
	private Long getLoginEmpCountWithDeptId(Integer deptId){
		List list = super.findRecordByHql("select count(*) from CotLoginInfo obj,CotEmps e,CotDept d where obj.loginEmpid=e.id and e.deptId.id=d.id and d.id="+deptId);
		Long num=0l;
		if(list!=null){
			num=(Long) list.get(0);
		}
		return num;
	}
	
	public List<StatisticsTreeNode> getDeptTreeNode(String treeLvId) {
		JSONObject json = JSONObject.fromObject(treeLvId);
		Integer companyId=json.getInt("company");
		String hql="from CotDept obj where obj.companyId.id="+companyId+" order by obj.deptName";
		List<CotDept> deptList =this.getBaseDao().findRecordsByHql(hql, null);
		List<StatisticsTreeNode> list = new ArrayList<StatisticsTreeNode>();
		for (CotDept dept : deptList) {
			StatisticsTreeNode node = new StatisticsTreeNode();
			Long loginNum=this.getLoginEmpCountWithDeptId(dept.getId());
			Long empNum=this.getEmpCountWithDeptId(dept.getId());
			node.setId("dept_"+dept.getId());
			node.setText(dept.getDeptName()+" ["+loginNum+"/"+empNum+"]");
			node.setTreeId(dept.getId());
//			node.setHref("#");
			node.setTreeLv(2);
			// node.setLeaf(custId == 0?false:true);
			node.setExpandable(false);
			json.put("dept", dept.getId());
			node.setTreeLvId(json.toString());
			list.add(node);
		}
		return list;
	}
	
	public List<CheckStatisticsTreeNode> getOnlineDeptTreeNode(String treeLvId) {
		JSONObject json = JSONObject.fromObject(treeLvId);
		Integer companyId=json.getInt("company");
		String hql="select obj,p from CotEmps e, CotLoginInfo p,CotDept obj where e.deptId.id=obj.id and p.loginEmpid=e.id and obj.companyId.id="+companyId+" order by obj.deptName";
		List deptList =this.getBaseDao().findRecordsByHql(hql, null);
		List<CheckStatisticsTreeNode> list = new ArrayList<CheckStatisticsTreeNode>();
		
		Map map=new HashMap();
		if(deptList!=null){
			Iterator<?> it =deptList.iterator();
			while(it.hasNext()){
				Object[] obj=(Object[]) it.next();
				CotDept dept=(CotDept) obj[0];
				CotLoginInfo cotLoginInfo=(CotLoginInfo) obj[1];
				Integer key=dept.getId();
				if(map.get(key)==null){
					CheckStatisticsTreeNode node = new CheckStatisticsTreeNode();
					Long loginNum=this.getLoginEmpCountWithDeptId(dept.getId());
					Long empNum=this.getEmpCountWithDeptId(dept.getId());
					node.setId("dept_"+dept.getId());
					node.setText(dept.getDeptName()+" ["+loginNum+"/"+empNum+"]");
					node.setTreeId(dept.getId());
//					node.setHref("#");
					node.setTreeLv(2);
					node.setChecked(false);
					// node.setLeaf(custId == 0?false:true);
					node.setExpandable(false);
					json.put("dept", dept.getId());
					node.setTreeLvId(json.toString());
					list.add(node);
					map.put(key, key);
				}
			}
		}
		return list;
	}
	
	private Map<Integer,CotLoginInfo> getLoginEmpsMap(){
		List list = super.findRecordByHql("from CotLoginInfo obj");
		Map<Integer, CotLoginInfo> map = new HashMap<Integer, CotLoginInfo>();
		for (int i = 0; i < list.size(); i++) {
			CotLoginInfo login = (CotLoginInfo) list.get(i);
			Integer key = Integer.parseInt(login.getLoginEmpid());
			if (map.get(key) == null) {
				map.put(key, login);
			}
		}
		return map;
	}
	
	public List<StatisticsTreeNode> getEmpTreeNode(String treeLvId) {
		Map<Integer,CotLoginInfo> loginMap=this.getLoginEmpsMap();
		JSONObject json = JSONObject.fromObject(treeLvId);
		Integer deptId=json.getInt("dept");
		String hql="from CotEmps obj where obj.deptId.id="+deptId+" order by obj.empsName";
		List<CotEmps> empList =this.getBaseDao().findRecordsByHql(hql, null);
		List<StatisticsTreeNode> list = new ArrayList<StatisticsTreeNode>();
		for (CotEmps emp : empList) {
			StatisticsTreeNode node = new StatisticsTreeNode();
			node.setId("emp_"+emp.getId());
			node.setText(emp.getEmpsName());
			node.setTreeId(emp.getId());
			node.setTreeLv(3);
			node.setLeaf(true);
			node.setUrl("");
			if(loginMap.get(emp.getId())==null){
				node.setIconCls("unline_emp");
			}else{
				node.setIconCls("online_emp");
			}
			
			node.setExpandable(false);
			json.put("emp", emp.getId());
			node.setTreeLvId(json.toString());
			list.add(node);
		}
		return list;
	}
	
	public List<CheckStatisticsTreeNode> getOnlineEmpTreeNode(String treeLvId) {
		JSONObject json = JSONObject.fromObject(treeLvId);
		Integer deptId=json.getInt("dept");
		String hql="select obj,g from CotEmps obj,CotLoginInfo g where g.loginEmpid=obj.id and obj.deptId.id="+deptId+" order by obj.empsName";
		List empList =this.getBaseDao().findRecordsByHql(hql, null);
		List<CheckStatisticsTreeNode> list = new ArrayList<CheckStatisticsTreeNode>();
		if(empList!=null){
			Iterator<?> it =empList.iterator();
			while(it.hasNext()){
				Object[] obj=(Object[]) it.next();
				CotEmps emp=(CotEmps) obj[0];
				CotLoginInfo cotLoginInfo=(CotLoginInfo) obj[1];
				CheckStatisticsTreeNode node = new CheckStatisticsTreeNode();
				node.setId("emp_"+emp.getId());
				node.setText(emp.getEmpsName()+"-["+cotLoginInfo.getLoginIpaddr()+"]");
				node.setTreeId(emp.getId());
				node.setTreeLv(3);
				node.setLeaf(true);
				node.setUrl("");
				node.setChecked(false);
				node.setIconCls("online_emp");
				node.setExpandable(false);
				json.put("emp", emp.getId());
				node.setTreeLvId(json.toString());
				list.add(node);
			}
		}
		return list;
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.service.system.emp.CotLoginService#findTreePathByEmpName(java.lang.String)
	 */
	public List<String> findTreePathByEmpName(String empName){
		String hql="from CotEmps obj where obj.empsName like :empName order by obj.companyId.companyShortName,obj.deptId.deptName,obj.empsName";
		Map<String,Object> whereMap = new HashMap<String, Object>();
		whereMap.put("empName", "%"+empName+"%");
		List list=this.getBaseDao().findRecordsByHql(hql, whereMap);
		List listStr=new ArrayList(); 
		if(list!=null && list.size()>0){
			Iterator<?> it =list.iterator();
			while(it.hasNext()){
				String root="/root_0";
				CotEmps cotEmps= (CotEmps)it.next();
				root+="/company_"+cotEmps.getCompanyId().getId();
				root+="/dept_"+cotEmps.getDeptId().getId();
				root+="/emp_"+cotEmps.getId();
				listStr.add(root);
			}
		}
		return listStr;
	}
	
	
	public List<String> findTreePathByArea(Integer flag,String key){
		Map<String,Object> whereMap = new HashMap<String, Object>();
		String hql="";
		if(flag==1){
			//获取客户中有国家信息的数据
			String custHql  = "select obj.nationId.id  from CotCustomer obj where obj.nationId.id is not null and obj.nationId.nationCn like :nationCn";
			Map<String,Object> whereCustMap = new HashMap<String, Object>();
			whereCustMap.put("nationCn", "%"+key+"%");
			List<Integer> listCust = this.findRecordByHql(custHql,whereCustMap);
			List<Integer> ids = new ArrayList<Integer>();
			for(Integer  id: listCust){
				if(!ids.contains(id)){
					ids.add(id);
				}
			}
			if(ids.size() == 0){
				ids.add(0);
			}
			hql="from CotNation obj where obj.id in(:ids) order by obj.areaId.id,obj.nationCn";
			whereMap.put("ids", ids);
		}else{
			//获取客户中有省份信息的数据
			String custHql  = "select obj.proviceId.id  from CotCustomer obj where obj.proviceId.id is not null and obj.proviceId.provinceName like :provinceName";
			Map<String,Object> whereCustMap = new HashMap<String, Object>();
			whereCustMap.put("provinceName", "%"+key+"%");
			List<Integer> listCust = this.findRecordByHql(custHql,whereCustMap);
			List<Integer> ids = new ArrayList<Integer>();
			for(Integer  id: listCust){
				if(!ids.contains(id)){
					ids.add(id);
				}
			}
			if(ids.size() == 0){
				ids.add(0);
			}
			hql="from CotProvice obj where obj.id in(:ids) order by obj.nationId.areaId.id, obj.nationId.nationCn,obj.provinceName";
			whereMap.put("ids", ids);
		}
		List list=this.getBaseDao().findRecordsByHql(hql, whereMap);
		List listStr=new ArrayList(); 
		if(list!=null && list.size()>0){
			Iterator<?> it =list.iterator();
			while(it.hasNext()){
				String root="/所有区域";
				if(flag==1){
					CotNation cotNation= (CotNation)it.next();
					root+="/"+cotNation.getAreaId().getAreaName();
					root+="/"+cotNation.getNationCn();
				}else{
					CotProvice cotProvice= (CotProvice)it.next();
					root+="/"+cotProvice.getNationId().getAreaId().getAreaName();
					root+="/"+cotProvice.getNationId().getNationCn();
					root+="/"+cotProvice.getProvinceName();
				}
				listStr.add(root);
			}
		}
		return listStr;
	}
	
	public List<String> findTreePathBySaArea(Integer custId,Integer flag,String key){
//		WebContext ctx=WebContextFactory.get();
//		HttpSession session = ctx.getHttpServletRequest().getSession();
//		CotEmps currEmp = (CotEmps)session.getAttribute(Constants.SESSION_EMP);
		CotEmps currEmp =this.getLoginEmp();
		
		List listStr=new ArrayList();
		String root="/全部";
		if(flag==1){
			List<StatisticsTreeNode> list = this.statisticsService.getEmpTreeNode(custId,currEmp);
			for (StatisticsTreeNode statisticsTreeNode : list) {
				if(statisticsTreeNode.getText().toLowerCase().contains(key.toLowerCase())){
					listStr.add(root+"/"+statisticsTreeNode.getText());
				}
			}
		}
		if(flag==2){
			List<StatisticsTreeNode> list = this.statisticsService.getEmpTreeNode(custId,currEmp);
			for (StatisticsTreeNode statisticsTreeNode : list) {
				List<StatisticsTreeNode> listArea = this.statisticsService.getAreaTreeNodeByEmpId(statisticsTreeNode.getTreeLvId());
				for (StatisticsTreeNode areaNode : listArea) {
					if(areaNode.getText().toLowerCase().contains(key.toLowerCase())){
						String str=root+"/"+statisticsTreeNode.getText();
						str+="/"+areaNode.getText();
						listStr.add(str);
					}
				}
			}
			
		}
		if(flag==3){
			List<StatisticsTreeNode> list = this.statisticsService.getEmpTreeNode(custId,currEmp);
			for (StatisticsTreeNode statisticsTreeNode : list) {
				List<StatisticsTreeNode> listArea = this.statisticsService.getAreaTreeNodeByEmpId(statisticsTreeNode.getTreeLvId());
				for (StatisticsTreeNode areaNode : listArea) {
					List<StatisticsTreeNode> listCountry = this.statisticsService.getCountryTreeNode(areaNode.getTreeLvId());
					for (StatisticsTreeNode countryNode : listCountry) {
						if(countryNode.getText().toLowerCase().contains(key.toLowerCase())){
							String str=root+"/"+statisticsTreeNode.getText();
							str+="/"+areaNode.getText();
							str+="/"+countryNode.getText();
							listStr.add(str);
						}
					}
				}
			}
		}
		if(flag==4){
			List<StatisticsTreeNode> list = this.statisticsService.getEmpTreeNode(custId,currEmp);
			for (StatisticsTreeNode statisticsTreeNode : list) {
				List<StatisticsTreeNode> listArea = this.statisticsService.getAreaTreeNodeByEmpId(statisticsTreeNode.getTreeLvId());
				for (StatisticsTreeNode areaNode : listArea) {
					List<StatisticsTreeNode> listCountry = this.statisticsService.getCountryTreeNode(areaNode.getTreeLvId());
					for (StatisticsTreeNode countryNode : listCountry) {
						List<StatisticsTreeNode> listCust = this.statisticsService.getCustTreeNode(countryNode.getTreeLvId(),custId);
						for (StatisticsTreeNode custNode : listCust) {
							if(custNode.getText().toLowerCase().contains(key.toLowerCase())){
								String str=root+"/"+statisticsTreeNode.getText();
								str+="/"+areaNode.getText();
								str+="/"+countryNode.getText();
								str+="/"+custNode.getText();
								listStr.add(str);
							}
						}
					}
				}
			}
		}
		
		return listStr;
	}
	
	/**
	 * 描述：像指定的员工发消息
	 * @param empId 指定的业务员
	 * @param sendToAll 是否全体发送（只针对在线）
	 * @param msg 消息内容
	 * 返回值：void
	 */
	private void saveAndSendMsg(CotEmps person,String empIds,boolean sendToAll,String msg){
		CometEngine engine = CometContext.getInstance().getEngine();
		Map dto = new HashMap();
		dto.put("person", person);
		dto.put("time", CommonUtil.getFormatTime("yyyy-MM-dd HH:mm:ss",null));
		dto.put("msg", msg);
		if(sendToAll)
			engine.sendToAll(Constants.UNICRM_APP_CHANNEL, dto);
		else {
			if(empIds!=null){
				String[] empIdList = empIds.split(",");
				for(String empId : empIdList ){
					Cache empCache = ContextUtil.getCacheManager("EmpCache");
					
					System.out.println(empCache.getKeys().size());
					Element val=empCache.get(empId);
					String value=(String) val.getObjectValue();
					String[] obj=value.split("_");
					List<CometConnection> listConnection = new ArrayList<CometConnection>();
					listConnection.add(engine.getConnection(obj[1]));
					engine.sendTo(Constants.UNICRM_APP_CHANNEL, listConnection, dto);
				}
			}
		}
	}
	
	public void sendMsg(String ids, String msg){
		CotEmps emps=this.getLoginEmp();
		boolean sendToAll=true;
		if(ids!=null)
			sendToAll=false;
		this.saveAndSendMsg(emps,ids, sendToAll, msg);
	}
	
	public List<CheckStatisticsTreeNode> getFileCompanyTreeNode() {
		String hql="from CotCompany obj order by obj.companyShortName";
		List<CotCompany> comList =this.getBaseDao().findRecordsByHql(hql,null);
		List<CheckStatisticsTreeNode> list = new ArrayList<CheckStatisticsTreeNode>();
		for (CotCompany com : comList) {
			CheckStatisticsTreeNode node = new CheckStatisticsTreeNode();
			Long empNum=this.getEmpCountWithCompanyId(com.getId());
			node.setId("company_"+com.getId());
			node.setText(com.getCompanyShortName()+" ["+empNum+"]");
			node.setTreeId(com.getId());
			node.setChecked(false);
//			node.setHref("#");
			node.setTreeLv(1);
			// node.setLeaf(custId == 0?false:true);
			node.setExpandable(false);
			JSONObject json = new JSONObject();
			json.put("company", com.getId());
			json.put("dept", 0);
			json.put("emp", 0);
			node.setTreeLvId(json.toString());
			list.add(node);
		}
		return list;
	}
	
	public List<CheckStatisticsTreeNode> getFileDeptTreeNode(String treeLvId) {
		JSONObject json = JSONObject.fromObject(treeLvId);
		Integer companyId=json.getInt("company");
		String hql="from CotDept obj where obj.companyId.id="+companyId+" order by obj.deptName";
		List<CotDept> deptList =this.getBaseDao().findRecordsByHql(hql, null);
		List<CheckStatisticsTreeNode> list = new ArrayList<CheckStatisticsTreeNode>();
		for (CotDept dept : deptList) {
			CheckStatisticsTreeNode node = new CheckStatisticsTreeNode();
			Long empNum=this.getEmpCountWithDeptId(dept.getId());
			node.setId("dept_"+dept.getId());
			node.setText(dept.getDeptName()+" ["+empNum+"]");
			node.setTreeId(dept.getId());
			node.setChecked(false);
//			node.setHref("#");
			node.setTreeLv(2);
			// node.setLeaf(custId == 0?false:true);
			node.setExpandable(false);
			json.put("dept", dept.getId());
			node.setTreeLvId(json.toString());
			list.add(node);
		}
		return list;
	}
	
	public List<CheckStatisticsTreeNode> getFileEmpTreeNode(String treeLvId) {
		Map<Integer,CotLoginInfo> loginMap=this.getLoginEmpsMap();
		JSONObject json = JSONObject.fromObject(treeLvId);
		Integer deptId=json.getInt("dept");
		String hql="from CotEmps obj where obj.deptId.id="+deptId+" order by obj.empsName";
		List<CotEmps> empList =this.getBaseDao().findRecordsByHql(hql, null);
		List<CheckStatisticsTreeNode> list = new ArrayList<CheckStatisticsTreeNode>();
		for (CotEmps emp : empList) {
			CheckStatisticsTreeNode node = new CheckStatisticsTreeNode();
			node.setId("emp_"+emp.getId());
			node.setText(emp.getEmpsName());
			node.setTreeId(emp.getId());
			node.setTreeLv(3);
			node.setLeaf(true);
			node.setChecked(false);
			node.setUrl("");
			node.setIconCls("online_emp");
			node.setExpandable(false);
			json.put("emp", emp.getId());
			node.setTreeLvId(json.toString());
			list.add(node);
		}
		return list;
	}
	
	public List<CheckStatisticsTreeNode> getFileShareCompanyTreeNode(int oneFileId,int[] empsIds) {
		//只选择一条文档来共享时,需要显示已经共享的员工
		String fileIdStr=" and p.fileSystemId="+oneFileId;
		String emps="";
		if(empsIds!=null){
			emps+=" and e.id in (";
			for (int i = 0; i < empsIds.length; i++) {
				emps+=empsIds[i]+",";
			}
			emps=emps.substring(0,emps.length()-1);
			emps+=")";
		}
		String hql="select obj from CotEmps e, CotFileSystemShare p, CotCompany obj  where e.companyId.id=obj.id and p.empsId=e.id "+fileIdStr+emps+"  order by obj.companyShortName";
		List comList =this.getBaseDao().findRecordsByHql(hql,null);
		List<CheckStatisticsTreeNode> list = new ArrayList<CheckStatisticsTreeNode>();
		Map map=new HashMap();
		if(comList!=null){
			Iterator<?> it =comList.iterator();
			while(it.hasNext()){
				CotCompany com=(CotCompany)  it.next();
				Integer key=com.getId();
				if(map.get(key)==null){
					CheckStatisticsTreeNode node = new CheckStatisticsTreeNode();
					Long empNum=this.getEmpCountWithCompanyId(com.getId());
					node.setId("company_"+com.getId());
					node.setText(com.getCompanyShortName()+" ["+empNum+"]");
					node.setTreeId(com.getId());
//					node.setHref("#");
					node.setTreeLv(1);
					node.setChecked(false);
					// node.setLeaf(custId == 0?false:true);
					node.setExpandable(false);
					JSONObject json = new JSONObject();
					json.put("company", com.getId());
					json.put("dept", 0);
					json.put("emp", 0);
					json.put("ip", "");
					node.setTreeLvId(json.toString());
					list.add(node);
					map.put(key, key);
				}
			}
		}
		return list;
	}
	
	public List<CheckStatisticsTreeNode> getFileShareDeptTreeNode(String treeLvId,int oneFileId,int[] empsIds) {
		JSONObject json = JSONObject.fromObject(treeLvId);
		Integer companyId=json.getInt("company");
		//只选择一条文档来共享时,需要显示已经共享的员工
		String fileIdStr=" and p.fileSystemId="+oneFileId;
		String emps="";
		if(empsIds!=null){
			emps+=" and e.id in (";
			for (int i = 0; i < empsIds.length; i++) {
				emps+=empsIds[i]+",";
			}
			emps=emps.substring(0,emps.length()-1);
			emps+=")";
		}
		String hql="select obj from CotEmps e, CotFileSystemShare p,CotDept obj where e.deptId.id=obj.id and p.empsId=e.id and obj.companyId.id="+companyId+fileIdStr+emps+" order by obj.deptName";
		List deptList =this.getBaseDao().findRecordsByHql(hql, null);
		List<CheckStatisticsTreeNode> list = new ArrayList<CheckStatisticsTreeNode>();
		
		Map map=new HashMap();
		if(deptList!=null){
			Iterator<?> it =deptList.iterator();
			while(it.hasNext()){
				CotDept dept=(CotDept) it.next();
				Integer key=dept.getId();
				if(map.get(key)==null){
					CheckStatisticsTreeNode node = new CheckStatisticsTreeNode();
					Long empNum=this.getEmpCountWithDeptId(dept.getId());
					node.setId("dept_"+dept.getId());
					node.setText(dept.getDeptName()+" ["+empNum+"]");
					node.setTreeId(dept.getId());
//					node.setHref("#");
					node.setTreeLv(2);
					node.setChecked(false);
					// node.setLeaf(custId == 0?false:true);
					node.setExpandable(false);
					json.put("dept", dept.getId());
					node.setTreeLvId(json.toString());
					list.add(node);
					map.put(key, key);
				}
			}
		}
		return list;
	}
	
	public List<CheckStatisticsTreeNode> getFileShareEmpTreeNode(String treeLvId,int oneFileId,int[] empsIds) {
		JSONObject json = JSONObject.fromObject(treeLvId);
		Integer deptId=json.getInt("dept");
		//只选择一条文档来共享时,需要显示已经共享的员工
		String fileIdStr=" and g.fileSystemId="+oneFileId;
		String emps="";
		if(empsIds!=null){
			emps+=" and obj.id in (";
			for (int i = 0; i < empsIds.length; i++) {
				emps+=empsIds[i]+",";
			}
			emps=emps.substring(0,emps.length()-1);
			emps+=")";
		}
		String hql="select obj from CotEmps obj,CotFileSystemShare g where g.empsId=obj.id and obj.deptId.id="+deptId+fileIdStr+emps+" order by obj.empsName";
		List empList =this.getBaseDao().findRecordsByHql(hql, null);
		List<CheckStatisticsTreeNode> list = new ArrayList<CheckStatisticsTreeNode>();
		if(empList!=null){
			Iterator<?> it =empList.iterator();
			while(it.hasNext()){
				CotEmps emp=(CotEmps) it.next();
				CheckStatisticsTreeNode node = new CheckStatisticsTreeNode();
				node.setId("emp_"+emp.getId());
				node.setText(emp.getEmpsName());
				node.setTreeId(emp.getId());
				node.setTreeLv(3);
				node.setLeaf(true);
				node.setUrl("");
				node.setChecked(false);
				node.setIconCls("online_emp");
				node.setExpandable(false);
				json.put("emp", emp.getId());
				node.setTreeLvId(json.toString());
				list.add(node);
			}
		}
		return list;
	}
}
