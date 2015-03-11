package com.sail.cot.action.system.emps;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.lang.RandomStringUtils;

import com.jason.core.exception.DAOException;
import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotEmps;
import com.sail.cot.entity.CheckStatisticsTreeNode;
import com.sail.cot.entity.StatisticsTreeNode;
import com.sail.cot.service.system.emp.CotLoginService;
import com.sail.cot.util.CacheUtil;
import com.sail.cot.util.GridServerHandler;

/**
 * 系统成功登录后的处理
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
 * Create Time: 2012-2-20 下午04:28:43
 * </p>
 * <p>
 * Class Name: CotLoginAction.java
 * </p>
 * 
 * @author azan
 * 
 */
@SuppressWarnings("serial")
public class CotLoginAction extends AbstractAction {

	private String username;
	private String pwd;
	private String otp;
	private String pm;
	private String empId;
	private String flag;
	private int treeId;
	private int oneFileId;
	private int[] empsIds;
	private String treeLvId;

	private CotLoginService loginService;

	@Resource(name = "CotLoginService")
	public void setLoginService(CotLoginService loginService) {
		this.loginService = loginService;
	}

	public int getOneFileId() {
		return oneFileId;
	}

	public void setOneFileId(int oneFileId) {
		this.oneFileId = oneFileId;
	}

	public int[] getEmpsIds() {
		return empsIds;
	}

	public void setEmpsIds(int[] empsIds) {
		this.empsIds = empsIds;
	}

	public CotLoginService getLoginService() {
		return loginService;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	/**
	 * 储存登录员工的id和员工对象到session
	 */
	@Override
	public String query() {
		HttpServletRequest request = super.getRequest();
//		ServletContext application = request.getSession().getServletContext();
		CotEmps cotEmps = (CotEmps) this.getBaseSerivce().getObjById(
				Integer.parseInt(this.getEmpId()), CotEmps.class);
		String rdm=RandomStringUtils.randomNumeric(8);
		request.getSession().setAttribute(Constants.LOGIN_RAM, rdm);
		request.getSession().setAttribute(Constants.SESSION_EMP, cotEmps);
		HttpServletResponse response = super.getResponse();
		// TODO:暂时设置IDENTITY的id为1；
		Cookie cookie = new Cookie(Constants.COOKIE_IDENTITY, "1");
		cookie.setMaxAge(60 * 60 * 24 * 365);// 设置有效期1年
		response.addCookie(cookie);
		// 将当前登录人转为json格式存入cookies
		JSONObject json = JSONObject.fromObject(cotEmps);
		String jsonstr = json.toString();
		try {
			jsonstr = URLEncoder.encode(jsonstr, "utf-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("-===================:" + jsonstr.length());
		Cookie currempCookie = new Cookie(Constants.COOKIE_CURRENT_EMP, jsonstr);
		currempCookie.setMaxAge(60 * 60 * 24 * 365);
		response.addCookie(currempCookie);
		request.getSession().setAttribute(Constants.COOKIE_IDENTITY, 1);
//		ConcurrentHashMap<String, Long> onLineMap = (ConcurrentHashMap<String, Long>) application
//				.getAttribute("onLineMap");
//		if (onLineMap == null)
//			onLineMap = new ConcurrentHashMap<String, Long>();
		// 存放当前登录员工的IP和当前登录时间，用于退出的判断
//		onLineMap.put(request.getSession().getId(), System.currentTimeMillis());
//		application.setAttribute("onLineMap", onLineMap);
		// 记录在线设置员工缓存
//		this.loginService.setLoginEmpCache(super.getSession().getId(), false);
		this.loginService.setLoginEmpCache(rdm, false);
		// 缓存员工权限
		super.getBaseSerivce().setPopedomCacheByEmpId(cotEmps.getId(), true);
		// 初始化系统缓存(按照IDENTITY)
		CacheUtil.initSystemCache(1);
		// 判断是否有建立Constants.DEFAULT_UPLOAD_PROJ这个文件夹,不然再第一次上传图片会显示麻将牌
		File pf = new File(ContextUtil.getTomcatHome()
				+ Constants.DEFAULT_UPLOAD_FILE);
		if (!pf.exists())
			pf.mkdirs();
		// 登录记录
		try {
			this.loginService.addToSysLog(cotEmps, 0, this.getRequest()
					.getRemoteAddr(), rdm);
		} catch (DAOException e) {
			e.printStackTrace();
		}
		return "query";
	}

	public String getEmpId() {
		return empId;
	}

	public void setEmpId(String empId) {
		this.empId = empId;
	}

	/**
	 * 退出系统时 清除session数据
	 * 
	 * @Description：
	 * @Flow：
	 * @Example：
	 * @Files：
	 * @author:azan
	 * @Create:Nov 17, 2011 9:09:14 AM
	 * @return String【】
	 */
	public String logout() {
		HttpServletRequest request = super.getRequest();
		// 登录记录
		CotEmps emps = super.getCurrEmps();
		try {
			this.loginService.logDo(emps, request);
		} catch (DAOException e) {
			e.printStackTrace();
		}
		return "logout";
	}

	// 查询公司树
	public String listCompany() {
		CotEmps currEmp = super.getCurrEmps();
		List<StatisticsTreeNode> list = this.loginService.getCompanyTreeNode();
		String[] exclude = { "children" };
		GridServerHandler gd = new GridServerHandler(exclude);
		gd.setData(list);
		jsonString = gd.getLoadDataText();
		System.out.println(jsonString);
		return Constants.JSONDATA;
	}

	// 查询部门树
	public String listDept() {
		List<StatisticsTreeNode> list = this.loginService
				.getDeptTreeNode(this.treeLvId);
		String[] exclude = { "children" };
		GridServerHandler gd = new GridServerHandler(exclude);
		gd.setData(list);
		jsonString = gd.getLoadDataText();
		System.out.println(jsonString);
		return Constants.JSONDATA;
	}

	// 查询员工树
	public String listEmp() {
		List<StatisticsTreeNode> list = this.loginService
				.getEmpTreeNode(this.treeLvId);
		String[] exclude = { "children" };
		GridServerHandler gd = new GridServerHandler(exclude);
		gd.setData(list);
		jsonString = gd.getLoadDataText();
		System.out.println(jsonString);

		return Constants.JSONDATA;
	}

	// 查询在线公司树
	public String listOnlineCompany() {
		List<CheckStatisticsTreeNode> list = this.loginService
				.getOnlineCompanyTreeNode();
		String[] exclude = { "children" };
		GridServerHandler gd = new GridServerHandler(exclude);
		gd.setData(list);
		jsonString = gd.getLoadDataText();
		System.out.println(jsonString);
		return Constants.JSONDATA;
	}

	// 查询在线部门树
	public String listOnlineDept() {
		List<CheckStatisticsTreeNode> list = this.loginService
				.getOnlineDeptTreeNode(this.treeLvId);
		String[] exclude = { "children" };
		GridServerHandler gd = new GridServerHandler(exclude);
		gd.setData(list);
		jsonString = gd.getLoadDataText();
		System.out.println(jsonString);
		return Constants.JSONDATA;
	}

	// 查询在线员工树
	public String listOnlineEmp() {
		List<CheckStatisticsTreeNode> list = this.loginService
				.getOnlineEmpTreeNode(this.treeLvId);
		String[] exclude = { "children" };
		GridServerHandler gd = new GridServerHandler(exclude);
		gd.setData(list);
		jsonString = gd.getLoadDataText();
		System.out.println(jsonString);

		return Constants.JSONDATA;
	}
	
	// 文档共享左边树显示公司
		public String listFileCompany() {
			List<CheckStatisticsTreeNode> list = this.loginService.getFileCompanyTreeNode();
			String[] exclude = { "children" };
			GridServerHandler gd = new GridServerHandler(exclude);
			gd.setData(list);
			jsonString = gd.getLoadDataText();
			System.out.println(jsonString);
			return Constants.JSONDATA;
		}

		// 文档共享左边树显示部门
		public String listFileDept() {
			List<CheckStatisticsTreeNode> list = this.loginService
					.getFileDeptTreeNode(this.treeLvId);
			String[] exclude = { "children" };
			GridServerHandler gd = new GridServerHandler(exclude);
			gd.setData(list);
			jsonString = gd.getLoadDataText();
			System.out.println(jsonString);
			return Constants.JSONDATA;
		}

		// 文档共享左边树显示员工
		public String listFileEmp() {
			List<CheckStatisticsTreeNode> list = this.loginService
					.getFileEmpTreeNode(this.treeLvId);
			String[] exclude = { "children" };
			GridServerHandler gd = new GridServerHandler(exclude);
			gd.setData(list);
			jsonString = gd.getLoadDataText();
			System.out.println(jsonString);

			return Constants.JSONDATA;
		}
		
		// 文档共享右边树显示已经被共享的公司
		public String listFileShareCompany() {
			List<CheckStatisticsTreeNode> list = this.loginService
					.getFileShareCompanyTreeNode(this.oneFileId,this.empsIds);
			String[] exclude = { "children" };
			GridServerHandler gd = new GridServerHandler(exclude);
			gd.setData(list);
			jsonString = gd.getLoadDataText();
			System.out.println(jsonString);
			return Constants.JSONDATA;
		}

		// 文档共享右边树显示已经被共享的部门
		public String listFileShareDept() {
			List<CheckStatisticsTreeNode> list = this.loginService
					.getFileShareDeptTreeNode(this.treeLvId,this.oneFileId,this.empsIds);
			String[] exclude = { "children" };
			GridServerHandler gd = new GridServerHandler(exclude);
			gd.setData(list);
			jsonString = gd.getLoadDataText();
			System.out.println(jsonString);
			return Constants.JSONDATA;
		}

		// 文档共享右边树显示已经被共享的员工
		public String listFileShareEmp() {
			List<CheckStatisticsTreeNode> list = this.loginService
					.getFileShareEmpTreeNode(this.treeLvId,this.oneFileId,this.empsIds);
			String[] exclude = { "children" };
			GridServerHandler gd = new GridServerHandler(exclude);
			gd.setData(list);
			jsonString = gd.getLoadDataText();
			System.out.println(jsonString);

			return Constants.JSONDATA;
		}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}

	public int getTreeId() {
		return treeId;
	}

	public void setTreeId(int treeId) {
		this.treeId = treeId;
	}

	public String getTreeLvId() {
		return treeLvId;
	}

	public void setTreeLvId(String treeLvId) {
		this.treeLvId = treeLvId;
	}

	public String getPm() {
		return pm;
	}

	public void setPm(String pm) {
		this.pm = pm;
	}

}
