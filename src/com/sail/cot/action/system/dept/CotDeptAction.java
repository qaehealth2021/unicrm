package com.sail.cot.action.system.dept;

import java.util.HashMap;
import java.util.Map;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotDept;
/**
 * 部门资料的action
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: 2012-2-20 下午04:20:03 </p>
 * <p>Class Name: CotDeptAction.java </p>
 * @author azan
 *
 */
@SuppressWarnings("serial")
public class CotDeptAction extends AbstractAction{
	private CotDept dept;
	public String query(){
		return "query";
	}
	
	@SuppressWarnings("unchecked")
	public String list() {
		StringBuffer hql = new StringBuffer();
		hql.append("from CotDept obj where 1=1");
		//加入IdentityId的约束条件
		super.getIdentityHql(hql);
		Map<String,Object> whereMap = new HashMap<String, Object>();
		if(dept != null){
	    	if(dept.getId() != null){
	    		hql.append(" and obj.id = :id");
    			whereMap.put("id", dept.getId());
			}
	    	if(dept.getCompanyId() != null && dept.getCompanyId().getId()!=null){
	    		hql.append(" and obj.companyId = :companyId");
    			whereMap.put("companyId", dept.getCompanyId());
			}
    		if(dept.getDeptName() != null && !dept.getDeptName().trim().equals("")){
    			hql.append(" and obj.deptName like :deptName");
    			whereMap.put("deptName", "%"+dept.getDeptName()+"%");
    		}
    		if(dept.getRemark() != null && !dept.getRemark().trim().equals("")){
    			hql.append(" and obj.remark like :remark");
    			whereMap.put("remark", "%"+dept.getRemark()+"%");
    		}
		}
		if(pageData.getSort()!=null){
			hql.append(" order by obj."+pageData.getSort()+" "+pageData.getDir());
		}
		
		try {
			jsonString = this.getBaseSerivce().findRecords(hql.toString(), whereMap, pageData.getStart(), pageData.getLimit());
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}
	
	public void setDept(CotDept dept) {
		this.dept = dept;
	}

	public CotDept getDept() {
		return dept;
	}

}
