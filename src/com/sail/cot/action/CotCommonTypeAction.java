package com.sail.cot.action;

import java.util.Map;

import javax.annotation.Resource;

import com.sail.cot.common.dao.CotBaseDao;
import com.sail.cot.query.QueryInfo;

public class CotCommonTypeAction {
	@Resource(name="CotBaseDao")
	private CotBaseDao baseDao;
	private Map<String,Object> proMap;
	private Integer start;
	private Integer limit;
	private String type;
	private String content;
	private String remark;
	private String flag;
	
	@SuppressWarnings("unchecked")
	public String list() {
		StringBuffer queryString = new StringBuffer(" where 1=1");
		
		QueryInfo queryInfo = new QueryInfo();
		
		if(type!=null&&!type.trim().equals("")){
			queryString.append(" and obj.type like '%" + type.trim() + "%'");
		}
		if(content!=null&&!content.trim().equals("")){
			queryString.append(" and obj.content like '%" + content.trim() + "%'");
		}
		if(remark!=null&&!remark.trim().equals("")){
			queryString.append(" and obj.remark like '%" + remark.trim() + "%'");
		}
		if(flag!=null&&!flag.trim().equals("")){
			queryString.append(" and obj.flag like '%" + flag.trim() + "%'");
		}
		
		// 设置每页显示多少行
		int pageCount = 15;
		// 取得页面选择的每页显示条数
		pageCount = limit;
		// 设定每页显示记录数
		queryInfo.setCountOnEachPage(pageCount);
		// 设置查询记录总数语句
		queryInfo.setCountQuery("select count(*) from CotCommonType obj" + queryString.toString());
		// 设置查询记录语句
		queryInfo.setSelectString("from CotCommonType obj");
		// 设置查询条件语句
		queryInfo.setQueryString(queryString.toString());
		// 设置排序语句
		queryInfo.setOrderString("");
		int startIndex = start;
		queryInfo.setStartIndex(startIndex);
		try {
			int count = baseDao.getRecordsCount(queryInfo);
//			List<CotCommonType> res = baseDao.findRecords(queryInfo);
//			proMap = new HashMap<String,Object>();
//			proMap.put("totalCount", count);
//			proMap.put("data", res);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "list";
	}

	public CotBaseDao getBaseDao() {
		return baseDao;
	}

	public void setBaseDao(CotBaseDao baseDao) {
		this.baseDao = baseDao;
	}

	public Integer getStart() {
		return start;
	}

	public void setStart(Integer start) {
		this.start = start;
	}

	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public Map<String, Object> getProMap() {
		return proMap;
	}

	public void setProMap(Map<String, Object> proMap) {
		this.proMap = proMap;
	}
}
