package com.sail.cot.action.system.company;

import java.util.HashMap;
import java.util.Map;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotCompany;
/**
 * 公司资料的action
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: 2012-2-20 下午04:18:33 </p>
 * <p>Class Name: CotCompanyAction.java </p>
 * @author azan
 *
 */
@SuppressWarnings("serial")
public class CotCompanyAction extends AbstractAction{
	private CotCompany company;
	public String query(){
		return "query";
	}
	
	@SuppressWarnings("unchecked")
	public String list() {
		StringBuffer hql = new StringBuffer();
		hql.append("from CotCompany obj where 1=1");
		//加入IdentityId的约束条件
		super.getIdentityHql(hql);
		Map<String,Object> whereMap = new HashMap<String, Object>();
		if(company != null){
	    	if(company.getId() != null){
	    		hql.append(" and obj.id = :id");
    			whereMap.put("id", company.getId());
			}
    		if(company.getCompanyName() != null && !company.getCompanyName().trim().equals("")){
    			hql.append(" and obj.companyName like :companyName");
    			whereMap.put("companyName", "%"+company.getCompanyName()+"%");
    		}
    		if(company.getCompanyNameEn() != null && !company.getCompanyNameEn().trim().equals("")){
    			hql.append(" and obj.companyNameEn like :companyNameEn");
    			whereMap.put("companyNameEn", "%"+company.getCompanyNameEn()+"%");
    		}
    		if(company.getCompanyShortName() != null && !company.getCompanyShortName().trim().equals("")){
    			hql.append(" and obj.companyShortName like :companyShortName");
    			whereMap.put("companyShortName", "%"+company.getCompanyShortName()+"%");
    		}
    		if(company.getCompanyCorporation() != null && !company.getCompanyCorporation().trim().equals("")){
    			hql.append(" and obj.companyCorporation like :companyCorporation");
    			whereMap.put("companyCorporation", "%"+company.getCompanyCorporation()+"%");
    		}
    		if(company.getComapanyAddr() != null && !company.getComapanyAddr().trim().equals("")){
    			hql.append(" and obj.comapanyAddr like :comapanyAddr");
    			whereMap.put("comapanyAddr", "%"+company.getComapanyAddr()+"%");
    		}
    		if(company.getCompanyAddrEn() != null && !company.getCompanyAddrEn().trim().equals("")){
    			hql.append(" and obj.companyAddrEn like :companyAddrEn");
    			whereMap.put("companyAddrEn", "%"+company.getCompanyAddrEn()+"%");
    		}
    		if(company.getCompanyNbr() != null && !company.getCompanyNbr().trim().equals("")){
    			hql.append(" and obj.companyNbr like :companyNbr");
    			whereMap.put("companyNbr", "%"+company.getCompanyNbr()+"%");
    		}
    		if(company.getCompanyFax() != null && !company.getCompanyFax().trim().equals("")){
    			hql.append(" and obj.companyFax like :companyFax");
    			whereMap.put("companyFax", "%"+company.getCompanyFax()+"%");
    		}
    		if(company.getCompanyPost() != null && !company.getCompanyPost().trim().equals("")){
    			hql.append(" and obj.companyPost like :companyPost");
    			whereMap.put("companyPost", "%"+company.getCompanyPost()+"%");
    		}
    		if(company.getCompanyWebSite() != null && !company.getCompanyWebSite().trim().equals("")){
    			hql.append(" and obj.companyWebSite like :companyWebSite");
    			whereMap.put("companyWebSite", "%"+company.getCompanyWebSite()+"%");
    		}
    		if(company.getCompanyMail() != null && !company.getCompanyMail().trim().equals("")){
    			hql.append(" and obj.companyMail like :companyMail");
    			whereMap.put("companyMail", "%"+company.getCompanyMail()+"%");
    		}
    		if(company.getRemark() != null && !company.getRemark().trim().equals("")){
    			hql.append(" and obj.remark like :remark");
    			whereMap.put("remark", "%"+company.getRemark()+"%");
    		}
    		if(company.getCompanyLogo() != null && !company.getCompanyLogo().trim().equals("")){
    			hql.append(" and obj.companyLogo like :companyLogo");
    			whereMap.put("companyLogo", "%"+company.getCompanyLogo()+"%");
    		}
//	    	if(company.getIdentityId() != null){
//	    		hql.append(" and obj.identityId = :identityId");
//    			whereMap.put("identityId", company.getIdentityId());
//			}
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
	
	public void setCompany(CotCompany company) {
		this.company = company;
	}

	public CotCompany getCompany() {
		return company;
	}

}
