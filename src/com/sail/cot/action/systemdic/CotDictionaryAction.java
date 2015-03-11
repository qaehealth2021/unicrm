package com.sail.cot.action.systemdic;

import java.util.HashMap;
import java.util.Map;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotDictionary;

@SuppressWarnings("serial")
public class CotDictionaryAction extends AbstractAction{
	private CotDictionary dictionary;
	
	public String query(){
		return "query";
	}
	
	@SuppressWarnings("unchecked")
	public String list() {
		StringBuffer hql = new StringBuffer();
		hql.append("from CotDictionary obj where 1=1");
		//加入IdentityId的约束条件
		super.getIdentityHql(hql);
		Map<String,Object> whereMap = new HashMap<String, Object>();
		if(dictionary != null){
			if(dictionary.getId() != null){
				hql.append(" and obj.id = :id");
				whereMap.put("id", dictionary.getId());
			}
			if(dictionary.getType() != null){
				hql.append(" and obj.type like :type");
				whereMap.put("type", "%"+dictionary.getType()+"%");
			}
			
			if(dictionary.getTypeEn() != null){
				hql.append(" and obj.typeEn like :typeEn");
				whereMap.put("typeEn", "%"+dictionary.getTypeEn()+"%");
			}
			if(dictionary.getContent() != null){
				hql.append(" and obj.content like :content");
				whereMap.put("content", "%"+dictionary.getContent()+"%");
			}
			if(dictionary.getRemark() != null){
				hql.append(" and obj.remark like :remark");
				whereMap.put("remark", "%"+dictionary.getRemark()+"%");
			}
			if(dictionary.getFlag() != null){
				hql.append(" and obj.flag = :flag");
				whereMap.put("flag", dictionary.getFlag());
			}
			if(dictionary.getDeleteFlag() != null){
				hql.append(" and obj.deleteFlag = :deleteFlag");
				whereMap.put("deleteFlag", dictionary.getDeleteFlag());
			}
			if(dictionary.getOrderSeq() != null){
				hql.append(" and obj.orderSeq = :orderSeq");
				whereMap.put("orderSeq", dictionary.getOrderSeq());
			}
		}
		try {
			jsonString = this.getBaseSerivce().findRecords(hql.toString(), whereMap, pageData.getStart(), pageData.getLimit());
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}

	public void setDictionary(CotDictionary dictionary) {
		this.dictionary = dictionary;
	}

}
