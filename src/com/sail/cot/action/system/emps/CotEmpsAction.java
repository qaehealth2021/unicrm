package com.sail.cot.action.system.emps;

import java.util.HashMap;
import java.util.Map;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotEmps;
/**
 * 员工资料action
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: 2012-2-20 下午04:20:16 </p>
 * <p>Class Name: CotEmpsAction.java </p>
 * @author azan
 *
 */
@SuppressWarnings("serial")
public class CotEmpsAction extends AbstractAction{
	private CotEmps emps;
	public String query(){
		return "query";
	}
	
	@SuppressWarnings("unchecked")
	public String list() {
		StringBuffer hql = new StringBuffer();
		hql.append("from CotEmps obj where 1=1");
		//加入IdentityId的约束条件
		super.getIdentityHql(hql);
		Map<String,Object> whereMap = new HashMap<String, Object>();
		if(emps != null){
	    	if(emps.getId() != null){
	    		hql.append(" and obj.id = :id");
    			whereMap.put("id", emps.getId());
			}
	    	if(emps.getDeptId() != null && emps.getDeptId().getId()!=null){
	    		hql.append(" and obj.deptId = :deptId");
    			whereMap.put("deptId", emps.getDeptId());
			}
    		if(emps.getEmpsName() != null && !emps.getEmpsName().trim().equals("")){
    			hql.append(" and obj.empsName like :empsName");
    			whereMap.put("empsName", "%"+emps.getEmpsName()+"%");
    		}
    		if(emps.getEmpNameCn() != null && !emps.getEmpNameCn().trim().equals("")){
    			hql.append(" and obj.empNameCn like :empNameCn");
    			whereMap.put("empNameCn", "%"+emps.getEmpNameCn()+"%");
    		}
    		if(emps.getEmpsPwd() != null && !emps.getEmpsPwd().trim().equals("")){
    			hql.append(" and obj.empsPwd like :empsPwd");
    			whereMap.put("empsPwd", "%"+emps.getEmpsPwd()+"%");
    		}
    		if(emps.getEmpsId() != null && !emps.getEmpsId().trim().equals("")){
    			hql.append(" and obj.empsId like :empsId");
    			whereMap.put("empsId", "%"+emps.getEmpsId()+"%");
    		}
    		if(emps.getEmpsStatus() != null){
    			hql.append(" and obj.empsStatus =:empsStatus");
    			whereMap.put("empsStatus", emps.getEmpsStatus());
    		}
    		if(emps.getEmpsRemark() != null && !emps.getEmpsRemark().trim().equals("")){
    			hql.append(" and obj.empsRemark like :empsRemark");
    			whereMap.put("empsRemark", "%"+emps.getEmpsRemark()+"%");
    		}
    		if(emps.getEmpsPhone() != null && !emps.getEmpsPhone().trim().equals("")){
    			hql.append(" and obj.empsPhone like :empsPhone");
    			whereMap.put("empsPhone", "%"+emps.getEmpsPhone()+"%");
    		}
    		if(emps.getEmpsMobile() != null && !emps.getEmpsMobile().trim().equals("")){
    			hql.append(" and obj.empsMobile like :empsMobile");
    			whereMap.put("empsMobile", "%"+emps.getEmpsMobile()+"%");
    		}
	    	if(emps.getCompanyId() != null && emps.getCompanyId().getId()!=null){
	    		hql.append(" and obj.companyId = :companyId");
    			whereMap.put("companyId", emps.getCompanyId());
			}
		}
		try {
			CotEmps emps = super.getCurrEmps(); 
			if(emps == null) throw new ServiceException("session超时,请重新登录");
			if(!"admin".equalsIgnoreCase(emps.getEmpsId().toLowerCase())){
				//非admin用户加入数据权限判断
				Map<String,Object> map = super.getBaseSerivce().getPopedomWhereMap("emps.do", emps.getId());
				if(map != null && !map.isEmpty()){ 
					hql.append(" and id in(:empIds) ");
					whereMap.putAll(map);
				}
			}
			jsonString = this.getBaseSerivce().findRecords(hql.toString(), whereMap, pageData.getStart(), pageData.getLimit());
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}
	
	public String modify(){
		return "modify";
	}
	
	public void setEmps(CotEmps emps) {
		this.emps = emps;
	}

	public CotEmps getEmps() {
		return emps;
	}

}
