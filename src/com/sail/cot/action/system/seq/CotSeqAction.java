package com.sail.cot.action.system.seq;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotSeq;

@SuppressWarnings("serial")
public class CotSeqAction extends AbstractAction{
	private CotSeq seq;
	public String query(){
		return "query";
	}
	public String modify(){
		return "modify";
	}

	@SuppressWarnings("unchecked")
	public String list() {
		StringBuffer hql = new StringBuffer();
		hql.append("from CotSeq obj where 1=1");
		//加入IdentityId的约束条件
		super.getIdentityHql(hql);
		Map<String,Object> whereMap = new HashMap<String, Object>();
		if(seq != null){
			if(StringUtils.isNotEmpty(seq.getType())){
				hql.append(" and obj.type = :type");
    			whereMap.put("type", seq.getType());
			}
			if(StringUtils.isNotEmpty(seq.getSeqCfg())){
				hql.append(" and obj.seqCfg = :seqCfg");
    			whereMap.put("seqCfg", seq.getSeqCfg());
			}
		}
		try {
			jsonString = this.getBaseSerivce().findRecords(hql.toString(), whereMap, pageData.getStart(), pageData.getLimit());
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}
	public String listcfg() {
		StringBuffer hql = new StringBuffer();
		String belongType = super.getRequest().getParameter("belongType");
		//例如:belongType可能是element,child 查找所有含有child的记录
		hql.append("from CotSeqCfg obj where 1=1 and obj.belongType = 'ALL' or LOCATE('"+belongType+"',obj.belongType)>0)");
		Map<String,Object> whereMap = new HashMap<String, Object>();
		try {
			jsonString = this.getBaseSerivce().findRecords(hql.toString(), whereMap, pageData.getStart(), pageData.getLimit());
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}
	public void setSeq(CotSeq seq) {
		this.seq = seq;
	}

	public CotSeq getSeq() {
		return seq;
	}

}
