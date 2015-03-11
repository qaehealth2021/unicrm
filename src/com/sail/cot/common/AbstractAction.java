/**
 * 
 */
package com.sail.cot.common;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.sail.cot.common.entity.PageData;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotEmps;
import com.sail.cot.service.system.popedom.CotPopedomService;

/**
 * <p>Title: 旗航不锈钢管理系统（QHERP）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Oct 29, 2011 9:57:50 AM </p>
 * <p>Class Name: AbstractAction.java </p>
 * @author achui
 *
 */
public abstract class AbstractAction extends ActionSupport{
	@Resource(name="CotPopedomService")
	protected CotPopedomService baseSerivce;
	/**
	 * PageData 页面通用的查询参数
	 */
	protected PageData pageData;
	/**
	 * 页面通用返回参数
	 */
	protected String jsonString;
	
	private String xaction;
	
	private HttpServletRequest request;
	
	private HttpServletResponse response;
	
	private HttpSession session;
	
	private ServletContext application;
	/**
	 * @see 功能描述（必填）：需要实现该方法，用于查询
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 29, 2011 10:01:12 AM</p>
	 * @return
	 * 返回值：String
	 */
	public abstract String query();
	
	/**
	 * @see 功能描述（必填）：获取前台传递的参数
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 29, 2011 10:04:20 AM</p>
	 * @param paramName：前台传递的参数名
	 * @return
	 * 返回值：String
	 */
	public String getParam(String paramName){
		request = ServletActionContext.getRequest();
		String param = request.getParameter(paramName);
		return param;
	}

	public HttpServletRequest getRequest() {
		return ServletActionContext.getRequest();
	}

	public HttpServletResponse getResponse() {
		return ServletActionContext.getResponse();
	}

	/**
	 * @see 功能描述（必填）：获取Session集合
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 29, 2011 10:13:02 AM</p>
	 * @return
	 * 返回值：Map
	 */
	public HttpSession getSession() {
		return this.getRequest().getSession();
	}
	
	public ServletContext getApplication(){
		return ServletActionContext.getServletContext();
	}

	public CotPopedomService getBaseSerivce() {
		return baseSerivce;
	}

	public PageData getPageData() {
		return pageData;
	}

	public void setPageData(PageData pageData) {
		this.pageData = pageData;
	}
	
	public String getJsonString() {
		return jsonString;
	}
	public void setJsonString(String jsonString) {
		this.jsonString = jsonString;
	}

	public String getXaction() {
		return xaction;
	}

	public void setXaction(String xaction) {
		this.xaction = xaction;
	}
	
	/**
	 * @see 功能描述（必填）：获取当前登录人
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Dec 20, 2011 10:04:25 AM</p>
	 * @return
	 * 返回值：CotEmps
	 */
	public CotEmps getCurrEmps(){
		HttpSession session = this.getSession();
		CotEmps currEmp = (CotEmps)session.getAttribute(Constants.SESSION_EMP);
		if(currEmp == null){
			//如果session没有存在，就去cookies中的数据
			Cookie[] cookies = this.getRequest().getCookies();
			Object empStr = null;
			for(Cookie cookie : cookies){
				if(Constants.COOKIE_CURRENT_EMP.equalsIgnoreCase(cookie.getName())){
					empStr = cookie.getValue();
					break;
				}
			}
			if(empStr != null){
				try {
					empStr = URLDecoder.decode(empStr.toString(),"utf-8");
				} catch (UnsupportedEncodingException e) {
					e.printStackTrace();
				}
				JSONObject json = JSONObject.fromObject(empStr);
				currEmp = (CotEmps) JSONObject.toBean(json,CotEmps.class);
			}
		}
		return currEmp;
	}
	/**
	 * @see 功能描述（必填）：获取Struts请求的URL，只到.do这个层面
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Dec 26, 2011 3:59:20 PM</p>
	 * @return
	 * 返回值：String
	 */
	public String getActionString(){
		String action = ServletActionContext.getContext().getName();
		action += ".do";
		return action;
	}
	
	public String getCurrentIdentityId(){
		Cookie[] cookies = this.getRequest().getCookies();
		Object identityId = null;
		for(Cookie cookie : cookies){
			if("COT_IDENTITY_ID".equalsIgnoreCase(cookie.getName())){
				identityId = cookie.getValue();
				break;
			}
		}
		return String.valueOf(identityId);
	}
	/**
	 * @see 功能描述（必填）：生成带identity约束的查询条件
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Jan 4, 2012 9:54:03 AM</p>
	 * @param hql：需要查询的HQL语句
	 * 返回值：void
	 */
	public void getIdentityHql(StringBuffer hql){
//		String currentIdentityId = this.getCurrentIdentityId();
//		if(currentIdentityId != null){
//			hql.append(" and obj.identityId = "+currentIdentityId);
//		}
	}
	
	/**
	 * @see 功能描述（必填）：加入权限判断
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 10, 2012 3:07:52 PM</p>
	 * @param popedomUrl：权限URL
	 * 返回值：String hql;返回部分Hql字符串
	 */
	public String addPopedomJudge(String popedomUrl,Map<String,Object> whereMap,String empField){
		CotEmps emps = this.getCurrEmps(); 
		if(emps == null) throw new ServiceException("session超时,请重新登录");
		if(!"admin".equalsIgnoreCase(emps.getEmpsId().toLowerCase())){
			//非admin用户加入数据权限判断
			Map<String,Object> map = this.getBaseSerivce().getPopedomWhereMap(popedomUrl, emps.getId());
			if(map != null && !map.isEmpty()){ 
				StringBuffer hql = new StringBuffer();
				hql.append(" and "+empField+" in(:empIds) ");
				whereMap.putAll(map);
				return hql.toString();
			}
		}
		return "";
	}
}
