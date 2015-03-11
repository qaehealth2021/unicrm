/**
 * 
 */
package com.sail.cot.service.system.popedom.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.ehcache.Cache;
import net.sf.ehcache.Element;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MultiHashMap;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.service.impl.BaseServiceImpl;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.common.util.Log4WebUtil;
import com.sail.cot.domain.CotEmps;
import com.sail.cot.domain.CotPopedomEmpData;
import com.sail.cot.domain.CotPopedomEmpFun;
import com.sail.cot.domain.CotPopedomRecord;
import com.sail.cot.service.BaseData;
import com.sail.cot.service.system.popedom.CotPopedomService;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Nov 7, 2011 6:07:30 PM </p>
 * <p>Class Name: CotPopedomServiceImpl.java </p>
 * @author achui
 *
 */
@Service("CotPopedomService")
@Transactional
@SuppressWarnings("unchecked")
public class CotPopedomServiceImpl extends BaseServiceImpl implements CotPopedomService{
	private BaseData baseData;
	public BaseData getBaseData() {
		return baseData;
	}

	@Resource(name="BaseData")
	public void setBaseData(BaseData baseData) {
		this.baseData = baseData;
	}
	
	Logger logger = Log4WebUtil.getLogger(CotPopedomServiceImpl.class);
	public Map<String,List> getDataPopedomByEmp(Integer moduleId, Integer empId) throws ServiceException {
		String hql = "from CotPopedomEmpData obj where obj.moduleId="+moduleId+" and obj.empsId="+empId;
		List<CotPopedomEmpData> res = super.findRecordByHql(hql);
		if(CollectionUtils.isEmpty(res)) return null;
		CotPopedomEmpData popedomEmpData = res.get(0);
		String json = popedomEmpData.getDataJson();
		if(StringUtils.isEmpty(json)) return null;
		Map<String, List> map = new HashMap<String, List>();
		//将json数据转换为map数据，其中key代表部门，公司，或个人的数据，value为公司，部门，个人对应的ID结果集
		JSONObject jsonObject = JSONObject.fromObject(json);
		Iterator<String> iterator = jsonObject.keys();
		while(iterator.hasNext()){
			String key = iterator.next();
			JSONArray array = jsonObject.getJSONArray(key);
			List list = (List)JSONArray.toCollection(array);
			//为空就跳过
			if(CollectionUtils.isEmpty(list))continue;
			map.put(key, list);
		}
		return map;
	}

	public List getFunPopedomByEmp(Integer moduleId, Integer empId) throws ServiceException {
		String hql = "from CotPopedomEmpFun obj where obj.moduleId="+moduleId+" and obj.empsId="+empId;
		List res = super.findRecordByHql(hql);
		return res;
	}

	public Integer saveDataPopedom(List<Integer> moduleIds, Integer empId,
			String moduleIdsMapJson) throws ServiceException {
		//先删除权限
		String hql = "delete from CotPopedomEmpData obj where obj.empsId=:empsId and obj.moduleId in(:moduleId)";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("empsId", empId);
		whereMap.put("moduleId", moduleIds);
		super.updateOrDelTable(hql,whereMap);
		//保存数据权限
		JSONObject moduleIdsMap = JSONObject.fromObject(moduleIdsMapJson,new JsonConfig());
		List list = new ArrayList();
		for(Integer moduleId : moduleIds){
			JSONObject jsonObject = moduleIdsMap.getJSONObject(moduleId.toString());
			String jsonData = jsonObject.toString();
			CotPopedomEmpData popedomData = new CotPopedomEmpData(empId,moduleId,jsonData);
			list.add(popedomData);
			//Integer count = super.saveOrUpdateObj(popedomData);
		}
		Integer count = super.saveOrUpdateList(list);
		return count;
	}

	public Integer saveFunPopedom(List<Integer> moduleIds, Integer empId, String funIdsMapJson)
			throws ServiceException {
		//先删除功能权限表的数据
		String hql = "delete from CotPopedomEmpFun obj where obj.empsId=:empsId and obj.moduleId in(:moduleId)";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("empsId", empId);
		whereMap.put("moduleId", moduleIds);
		super.updateOrDelTable(hql,whereMap);
		//保存功能权限
		List list = new ArrayList();
		for(Integer moduleId : moduleIds){
			JSONObject jsonObject = JSONObject.fromObject(funIdsMapJson);
			JSONArray funIds = jsonObject.getJSONArray(moduleId.toString());
			for(int i=0; i<funIds.size(); i++){
				Integer funId = Integer.valueOf(funIds.get(i).toString());
				CotPopedomEmpFun popedomFun = new CotPopedomEmpFun(funId,empId,moduleId);
				list.add(popedomFun);
			}
		}
		Integer count = super.saveOrUpdateList(list);
		//设置现有缓存，如果有就更新缓存，如果没有就跳过
		Cache popedomCache = ContextUtil.getCacheManager("PopedomCache");
		Element element = popedomCache.get(empId);
		if(element != null){
			this.setPopedomCacheByEmpId(empId, true);
		}
		return count;
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.service.system.popedom.CotPopedomService#getModuleFun(java.lang.Integer)
	 */
	public List getModuleFun(Integer moduleId) {
		String hql = " from CotModuleFun obj where obj.moduleId="+moduleId;
		List res = null;
		try {
			res = super.findRecordByHql(hql);
		} catch (ServiceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return res;
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.service.system.popedom.CotPopedomService#getFunMapByEmpId(java.lang.Integer)
	 */
	public Map getDataMapByEmpId(Integer empId) {
		String sql = "select m.MODULE_VALIDURL,d.data_json " +
						"from cot_module m,cot_popedom_emp_data d where 1=1  " +
						"and m.ID = d.module_ID " +
						"and d.emps_ID = "+empId;
		Map map = new HashMap();
		Connection conn = null;
		PreparedStatement pstm = null;
		ResultSet rs = null;
		conn = super.getBaseDao().getConnection();
		try {
			pstm = conn.prepareStatement(sql);
			rs = pstm.executeQuery();
			while(rs.next())
			{
				map.put(rs.getString("MODULE_VALIDURL"), rs.getString("data_json"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		finally
		{
			try
			{
				if(rs != null )
					rs.close();
				if(pstm != null)
					pstm.close();
				if(conn != null)
					conn.close();
			}
			catch(Exception ex)
			{
				ex.printStackTrace();
			}
		}
		return map;
	}
	/**
	 * @see 功能描述（必填）：根据模块的URL判断该模块的数据权限
	 * @see 处理流程（选填）：1、获取员工数据权限表的数据权限，根据数据权限，转换为员工的ID列表
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 10, 2011 10:00:04 AM</p>
	 * @param url
	 * @return
	 * 返回值：Map<String,Object>
	 * @throws ServiceException 
	 */
	public Map<String, Object> getPopedomWhereMap(String url,Integer empId) throws ServiceException{
		//获取员工的数据权限
		Map map = this.getDataMapByEmpId(empId);
		String jsonData = (String)map.get(url); 
		JSONObject jsonObject = JSONObject.fromObject(jsonData);
		Map<String,Object> whereMap = new HashMap<String, Object>();
		List<Integer> ids = new ArrayList();
		List<CotEmps> empList = new ArrayList<CotEmps>();
		//判断数据权限
		
		if(CollectionUtils.isNotEmpty(jsonObject.getJSONArray("COMPANY"))){
			String hql = " from CotEmps obj where obj.companyId.id in (:companyIds)";
			ids = this.getIntegerList(jsonObject.getJSONArray("COMPANY"));
			whereMap.clear();
			whereMap.put("companyIds",ids);
			List tmp = super.findRecordByHql(hql,whereMap);
			if(CollectionUtils.isNotEmpty(tmp)){
				empList.addAll(tmp);
			}
		}
		if(CollectionUtils.isNotEmpty(jsonObject.getJSONArray("DEPT"))){
			String hql = " from CotEmps obj where obj.deptId.id in (:deptIds)";
			ids = this.getIntegerList(jsonObject.getJSONArray("DEPT"));
			whereMap.clear();
			whereMap.put("deptIds",ids);
			List tmp = super.findRecordByHql(hql,whereMap);
			if(CollectionUtils.isNotEmpty(tmp)){
				empList.addAll(tmp);
			}
		}
		if(CollectionUtils.isNotEmpty(jsonObject.getJSONArray("EMP"))){
			String hql = " from CotEmps obj where obj.id in (:empIds)";
			ids = this.getIntegerList(jsonObject.getJSONArray("EMP"));
			whereMap.clear();
			whereMap.put("empIds",ids);
			List tmp = super.findRecordByHql(hql,whereMap);
			if(CollectionUtils.isNotEmpty(tmp)){
				empList.addAll(tmp);
			}
		}
		ids.clear();
		if(CollectionUtils.isEmpty(empList)) return null;
		for(CotEmps emp : empList){
			ids.add(emp.getId());
		}
		whereMap.clear();
		whereMap.put("empIds", ids);
		return whereMap;
	}
	
	private List<Integer> getIntegerList(List list){
		List<Integer> ids = new ArrayList<Integer>();
		for(int i=0; i<list.size(); i++){
			Integer value = Integer.valueOf(list.get(i).toString());
			ids.add(value);
		}
		return ids;
	}

	public MultiHashMap getFunMapByEmpId(Integer empId) {
		String sql = "select MODULE_VALIDURL,fun_type " +
				"from cot_module m,cot_popedom_emp_fun f,cot_module_fun mf " +
				"where f.module_fun_ID = mf.ID " +
				"and mf.module_ID = m.ID " +
				"and emps_id="+empId;
		MultiHashMap map = new MultiHashMap();
		Connection conn = null;
		PreparedStatement pstm = null;
		ResultSet rs = null;
		conn = super.getBaseDao().getConnection();
		try {
			pstm = conn.prepareStatement(sql);
			rs = pstm.executeQuery();
			while(rs.next())
			{
				map.put(rs.getString("MODULE_VALIDURL"), rs.getString("fun_type"));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally
		{
			try
			{
				if(rs != null )
					rs.close();
				if(pstm != null)
					pstm.close();
				if(conn != null)
					conn.close();
			}
			catch(Exception ex)
			{
				ex.printStackTrace();
			}
		}
		return map;
	}
	
	public void setPopedomCacheByEmpId(Integer empId,boolean reload) {
		Cache popedomCache = ContextUtil.getCacheManager("PopedomCache"); 
		MultiHashMap popedomMap = null;
		Element element = popedomCache.get(empId);
		if(reload || element == null){
			popedomCache.remove(empId);
			popedomMap = this.getFunMapByEmpId(empId);
			logger.info("empId："+empId+"的权限——————"+popedomMap);
			element = new Element(empId,popedomMap);
			popedomCache.put(element);
		}
	}
	
	public boolean getFunPopedomByFunName(String url, String funName,
			Integer empId) {
		Cache popedomCache = ContextUtil.getCacheManager("PopedomCache");
		Element element = popedomCache.get(empId);
		if(element == null){
			logger.warn("不存在员工ID为["+empId+"]的权限缓存");
			return false;
		}else{
			MultiHashMap map = (MultiHashMap)element.getValue();
			return map.containsValue(url, funName);
		}
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.service.system.popedom.CotPopedomService#saveOrUpdateRecordPopedom(java.lang.String, java.util.List, java.util.List)
	 */
	public Integer saveOrUpdateRecordPopedom(String url, List<Integer> empsIds,
			List<Integer> keyIds) throws ServiceException {
		List<CotPopedomRecord> list = new ArrayList<CotPopedomRecord>();
		CotPopedomRecord record = null;
		for(Integer empId : empsIds){
			for(Integer keyId : keyIds){
				record = new CotPopedomRecord();
				record.setEmpsId(empId);
				record.setModule(url);
				record.setPrimaryId(keyId.toString());
				list.add(record);
			}
		}
		Integer num = super.saveOrUpdateList(list);
		list.clear();
		return num;
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.service.system.popedom.CotPopedomService#getPopedomRecordWhereMap(java.lang.String, java.lang.Integer)
	 */
	public Map<String, Object> getPopedomRecordWhereMap(String url,
			Integer empId) throws ServiceException {
		List<CotPopedomRecord> list = this.findRecordByHql(" from CotPopedomRecord obj where obj.module='"+url+"' and obj.empsId="+empId);
		List<Integer> keyIds = new ArrayList<Integer>();
		for(CotPopedomRecord record : list){
			keyIds.add(Integer.valueOf(record.getPrimaryId()));
		}
		list.clear();
		if(!keyIds.isEmpty()){
			Map<String, Object> whereMap = new HashMap<String, Object>();
			//获取员工的数据权限
			whereMap.put("keyIds", keyIds);
			return whereMap;
		}else {
			return null;
		}
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.service.system.popedom.CotPopedomService#getFunPopedomMap(java.lang.String, java.lang.Integer)
	 */
	public Map<String, String> getFunPopedomMap(String url,boolean reloadMap)
			throws ServiceException {
		CotEmps emp = this.getBaseData().getCurrentEmps();
		if(reloadMap){
			this.setPopedomCacheByEmpId(emp.getId(), true);
		}
		Cache popedomCache = ContextUtil.getCacheManager("PopedomCache");
		Element element = popedomCache.get(emp.getId());
		Map<String, String> map = new HashMap<String, String>();
//		//admin用户所有权限
//		if("admin".equalsIgnoreCase(emp.getEmpsId())){
//			map.put("ALL", "ALL");
//			return map;
//		}
		if(element == null){
			logger.warn("getFunPopedomMap:不存在员工ID为["+emp.getId()+"("+emp.getEmpsId()+")]的权限缓存");
			return map;
		}else{
			MultiHashMap multiValueMap = (MultiHashMap)element.getValue();
			List<String> list = (List<String>)multiValueMap.getCollection(url);
			if(CollectionUtils.isEmpty(list)) return map;
			for(String fun : list ){
				map.put(fun, fun);
			}
		}
		return map;
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.service.system.popedom.CotPopedomService#getLoginEmp()
	 */
	public CotEmps getLoginEmp() {
		// TODO Auto-generated method stub
		try {
			return this.getBaseData().getCurrentEmps();
		} catch (ServiceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.service.system.popedom.CotPopedomService#copyPopedom(java.lang.Integer, java.lang.Integer)
	 */
	@Override
	@Transactional(propagation=Propagation.NOT_SUPPORTED)  
	public void copyPopedom(Integer fromEmpId, Integer toEmpId) {
		CotEmps fromEmps=(CotEmps)this.getBaseDao().getById(CotEmps.class, fromEmpId);
		CotEmps toEmps=(CotEmps)this.getBaseDao().getById(CotEmps.class, toEmpId);
		// TODO Auto-generated method stub
		SqlParameter[] parameters = new SqlParameter[2];
		parameters[0] = new SqlParameter("fromEmpId",Types.INTEGER);
		parameters[1] = new SqlParameter("toEmpId",Types.INTEGER);
		Map inParam = new HashMap();
		inParam.put("fromEmpId", fromEmpId);
		inParam.put("toEmpId", toEmpId);
		this.callProc("copyPopedom", parameters, inParam);
		//删除数据
		deletePopedomEmpDataByEmpId(toEmpId);
//		super.updateOrDelTable("delete from CotPopedomEmpData obj where obj.empsId = "+toEmpId,null);
		List<CotPopedomEmpData> list = super.findRecordByHql(" from CotPopedomEmpData obj where obj.empsId = "+fromEmpId);
		int index = 0;
		for(CotPopedomEmpData popedomEmpData : list){
			String dataJson = popedomEmpData.getDataJson();
			popedomEmpData.setId(null);
			popedomEmpData.setEmpsId(toEmpId);
			//"EMP":["2","1"],"DEPT":["2"]}
			//处理公司
			int comIndex = dataJson.indexOf("\"COMPANY\"");
			int parIndex = dataJson.indexOf(",\"PARENT\"");
			String com = dataJson.substring(comIndex+10, parIndex);
			//如果A可以看到A,B的,复制给B后,B应该也能看到A,B的,这时,要判断emp中是否已经含有B,如果含有则不替换
			if(com.indexOf("\""+fromEmps.getCompanyId().getId()+"\"") > -1 && com.indexOf("\""+toEmps.getCompanyId().getId()+"\"") == -1){
				//替换
				String newEmp = com.replaceAll("\""+fromEmps.getCompanyId().getId()+"\"", "\""+toEmps.getCompanyId().getId()+"\"");
				String newEmpData = "\"COMPANY\":"+newEmp+"";
				dataJson = dataJson.substring(0,comIndex)+newEmpData+dataJson.substring(parIndex);
			}
			//处理员工
			int empIndex = dataJson.indexOf("\"EMP\"");
			int deptIndex = dataJson.indexOf(",\"DEPT\"");
			//截取EMP后面到DEPT直接的字符串,"EMP":["2","1"],"DEPT":["2"]}
			//即["2","1"]
			String emp = dataJson.substring(empIndex+6, deptIndex);
			//如果A可以看到A,B的,复制给B后,B应该也能看到A,B的,这时,要判断emp中是否已经含有B,如果含有则不替换
			if(emp.indexOf("\""+fromEmpId+"\"") > -1 && emp.indexOf("\""+toEmpId+"\"") == -1){
				//替换
				String newEmp = emp.replaceAll("\""+fromEmpId+"\"", "\""+toEmpId+"\"");
				String newEmpData = "\"EMP\":"+newEmp+"";
				dataJson = dataJson.substring(0,empIndex)+newEmpData+dataJson.substring(deptIndex);
			}
			//处理部门
			int deIndex = dataJson.indexOf("\"DEPT\"");
			int endIndex = dataJson.indexOf("}");
			String dept = dataJson.substring(deIndex+7, endIndex);
			//如果A可以看到A,B的,复制给B后,B应该也能看到A,B的,这时,要判断emp中是否已经含有B,如果含有则不替换
			if(dept.indexOf("\""+fromEmps.getDeptId().getId()+"\"") > -1 && dept.indexOf("\""+toEmps.getDeptId().getId()+"\"") == -1){
				//替换
				String newEmp = dept.replaceAll("\""+fromEmps.getDeptId().getId()+"\"", "\""+toEmps.getDeptId().getId()+"\"");
				String newEmpData = "\"DEPT\":"+newEmp+"";
				dataJson = dataJson.substring(0,deIndex)+newEmpData+dataJson.substring(endIndex);
			}
			popedomEmpData.setDataJson(dataJson);
			list.set(index, popedomEmpData);
			index++;
		}
		super.saveOrUpdateList(list);
	}
	private void deletePopedomEmpDataByEmpId(Integer empId){
		String hql = "delete from CotPopedomEmpData obj where obj.empsId=:empsId ";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("empsId", empId);
		super.updateOrDelTable(hql,whereMap);
	}
}
