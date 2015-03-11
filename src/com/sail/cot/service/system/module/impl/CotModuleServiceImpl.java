/**
 * 
 */
package com.sail.cot.service.system.module.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MultiMap;
import org.apache.commons.collections.Predicate;
import org.apache.commons.collections.map.MultiValueMap;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jason.core.exception.DAOException;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.service.impl.BaseServiceImpl;
import com.sail.cot.domain.CotEmps;
import com.sail.cot.domain.CotModule;
import com.sail.cot.domain.CotModuleFun;
import com.sail.cot.domain.CotPopedomEmpData;
import com.sail.cot.entity.TreeNode;
import com.sail.cot.service.BaseData;
import com.sail.cot.service.system.module.CotModuleService;
import com.sail.cot.util.GridServerHandler;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Nov 3, 2011 11:47:24 AM </p>
 * <p>Class Name: CotModuleServiceImp.java </p>
 * @author achui
 *
 */
@Service("CotModuleService")
@Transactional
public class CotModuleServiceImpl extends BaseServiceImpl implements CotModuleService{

	@Resource(name="BaseData")
	private BaseData baseData;
	/**
	 * List<CotModule> 获取1-2级菜单
	 */
	private List<CotModule> allMenu;
	
	/* (non-Javadoc)
	 * @see com.sail.cot.service.system.module.CotModuleService#getModuleTreeJsonData()
	 */
	public String getModuleTreeJsonData(Integer parentId) throws ServiceException {
		
		List<TreeNode> res = new ArrayList<TreeNode>();
		String hql = " from CotModule obj where obj.parentId = "+parentId;
		List<CotModule> list = super.findRecordByHql(hql);
		for (CotModule oaModule : list) {
			TreeNode node = new TreeNode();
			node.setId(oaModule.getId().toString());
			node.setText(oaModule.getModuleName());
			node.setUrl(oaModule.getModuleUrl());
			node.setHref(oaModule.getModuleUrl());
			try {
				node.setLeaf(node.getLeafStatus(oaModule.getId()));
			} catch (ServiceException e) {
				e.printStackTrace();
			}
			res.add(node);
		}
		String excludes[] = {"map","parentMap","children"};
		GridServerHandler gd = new GridServerHandler(excludes);
		gd.setData(res);
		gd.setTotalCount(res.size());
		JSONObject jsonObj = gd.getLoadResponseJSON();
		JSONArray jsonArray = (JSONArray)jsonObj.get("data");
		return jsonArray.toString();
	}

	@SuppressWarnings("unchecked")
	public List<CotModule> getModulePopedomMenus() {
		String hql = " from CotModule obj where obj.moduleType = 'MODULE' and obj.parentId is not null and obj.moduleLv >=1 and obj.moduleLv <=3 order by obj.moduleOrder asc";
		// 获得一二级菜单
		List<CotModule> moduleList = this.getBaseDao().find(hql);
		// 缓存菜单，将同个父节点的菜单放在一起
		MultiMap multiMap = new MultiValueMap();
		for (CotModule module : moduleList) {
			multiMap.put(module.getParentId(), module);
		}
		// 获得各自的子节点并在moduleList删除属于子节点
		CotModule module;
		for (int i = 0; i < moduleList.size(); i++) {
			module = moduleList.get(i);
			module.setChildren((List)multiMap.get(module.getId()));
			// 删除不属于一级菜单
			if(module.getParentId().intValue() != 1){	
				moduleList.remove(i);
				i--;
			}
		}
		return moduleList;
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.service.system.module.CotModuleService#getAllModuleTreeJsnoData()
	 */
	public String getAllModuleTreeJsnoData(CotEmps emps) throws ServiceException {
		// TODO Auto-generated method stub
		//if(CollectionUtils.isEmpty(allMenu))
		if("admin".equalsIgnoreCase(emps.getEmpsId()))
			allMenu = //getPopedomModuleByEmp(1);
				super.findRecordByHql("from CotModule obj where obj.moduleLv <=3 and id != 1 order by obj.moduleOrder");
		else {
			allMenu = getPopedomModuleByEmp(emps.getId());
		}
		List<TreeNode> moduleTree = recursionModuleTree(allMenu,1);
		String excludes[] = {"map","parentMap"};
		GridServerHandler gd = new GridServerHandler(excludes);
		gd.setData(moduleTree);
		gd.setTotalCount(moduleTree.size());
		JSONObject jsonObj = gd.getLoadResponseJSON();
		JSONArray jsonArray = (JSONArray)jsonObj.get("data");
		//清空list的数据
		moduleTree.clear();
		return jsonArray.toString();
	}
	
	/**
	 * @see 功能描述（必填）：递归菜单树
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 4, 2011 3:52:14 PM</p>
	 * @return
	 * 返回值：List<TreeNode>
	 */
	private List<TreeNode> recursionModuleTree(List<CotModule> moduleList,Integer parentId){
		List<TreeNode> list = new ArrayList<TreeNode>();
		if(parentId == 1)//先过滤出一级菜单
			moduleList = (List<CotModule>) CollectionUtils.select(allMenu, new ModuleChildFilter(parentId));
		for(CotModule module : moduleList){
			TreeNode node = new TreeNode();
			node.setId(module.getId().toString());
			node.setText(module.getModuleName());
			node.setUrl(module.getModuleUrl());
			node.setImgUrl(module.getModuleImgurl());
			node.setHref(null);
			node.setLeaf(true);
			List<CotModule> childrenModule = (List<CotModule>) CollectionUtils.select(allMenu, new ModuleChildFilter(module.getId()));
			//递归生成子菜单
			if(CollectionUtils.isNotEmpty(childrenModule)){
				List<TreeNode> childrenTree = recursionModuleTree(childrenModule,module.getId());
				node.setLeaf(false);
				node.setChildren(childrenTree);
			}
			list.add(node);
		}
		return list;
	}
	/**
	 * 内部类，过滤数组中符合条件数据
	 */
	class ModuleChildFilter implements Predicate{
		private Integer parentId;
		public ModuleChildFilter(Integer parentId){
			this.parentId = parentId;
		}
		public boolean evaluate(Object value) {
			CotModule module = (CotModule)value;
			if(module.getParentId()  == null )return false;
			return this.parentId == module.getParentId();
		}
		
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.service.system.module.CotModuleService#addModule(com.sail.cot.domain.CotModule, java.util.List)
	 */
	@SuppressWarnings("unchecked")
	public Integer addModule(CotModule module, List<CotModuleFun> moduleFuns) throws DAOException {
		if(module.getModuleOrder()==null){
			String hql="select max(obj.moduleOrder) from CotModule obj where obj.parentId = "+module.getParentId();
			List<Long> list =this.getBaseDao().find(hql);
			if(list.size()>0){
				long order = list.get(0);
				module.setModuleOrder(order+1l);
			}else
				module.setModuleOrder(1l);
		}
		this.getBaseDao().saveOrUpdateRecord(module);
		if(moduleFuns != null && moduleFuns.size() > 0){
			for (CotModuleFun moduleFun : moduleFuns) {
				moduleFun.setModuleId(module.getId());
			}
			this.getBaseDao().saveOrUpdateRecords(moduleFuns);
		}
		return module.getId();
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.service.system.module.CotModuleService#saveModule(com.sail.cot.domain.CotModule)
	 */
	public void saveModule(CotModule module) throws DAOException {
		this.getBaseDao().saveOrUpdateRecord(module);
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.service.system.module.CotModuleService#saveModuleFun(com.sail.cot.domain.CotModuleFun)
	 */
	public void saveModuleFun(CotModuleFun moduleFun) throws DAOException {
		this.getBaseDao().saveOrUpdateRecord(moduleFun);
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.service.system.module.CotModuleService#deleteModule(java.lang.String)
	 */
	public void deleteModule(Integer id) throws DAOException {
		this.getBaseDao().deleteRecordById(id, "CotModule");
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.service.system.module.CotModuleService#deleteModuleFun(java.lang.String)
	 */
	public void deleteModuleFun(Integer id) throws DAOException {
		this.getBaseDao().deleteRecordById(id, "CotModuleFun");
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.service.system.module.CotModuleService#getModule(java.lang.Integer)
	 */
	public CotModule getModule(Integer id) {
		return (CotModule) this.getObjById(id, CotModule.class);
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.service.system.module.CotModuleService#getModuleFun(java.lang.Integer)
	 */
	public CotModuleFun getModuleFun(Integer id) {
		return (CotModuleFun) this.getObjById(id, CotModule.class);
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.service.system.module.CotModuleService#moveModule(java.lang.Integer, java.lang.Integer, java.lang.String)
	 */
	@SuppressWarnings("unchecked")
	public void moveModule(Integer moveId, Integer targetId, String point) throws DAOException {
		CotModule moveModule = this.getModule(moveId);
		CotModule targetModule = this.getModule(targetId);
		if(point.equals("append")){// 加入时获得最大的排序号
			moveModule.setParentId(targetModule.getId());
			String hql="select max(obj.moduleOrder) from CotModule obj where obj.parentId = "+targetModule.getId();
			List<Long> list =this.getBaseDao().find(hql);
			if(list.size()>0 && list.get(0) != null){
				long order = list.get(0);
				moveModule.setModuleOrder(order+1l);
			}else
				moveModule.setModuleOrder(1l);
		}else if(point.equals("above")){// 移动时，把目标及目标后面的排序号都加1，移动的节点为目标的排序号
			moveModule.setParentId(targetModule.getParentId());
			moveModule.setModuleOrder(targetModule.getModuleOrder());
			String hql = "update CotModule obj set obj.moduleOrder = obj.moduleOrder+1 where obj.parentId = ? and obj.moduleOrder >= ?";
			this.getBaseDao().executeUpdate(hql, targetModule.getParentId(),targetModule.getModuleOrder());
		}else if(point.equals("below")){// 移动时，把目标后面的排序号都加1，移动的节点为目标位置+1的排序号
			moveModule.setParentId(targetModule.getParentId());
			moveModule.setModuleOrder(targetModule.getModuleOrder()+1);
			String hql = "update CotModule obj set obj.moduleOrder = obj.moduleOrder+1 where obj.parentId = ? and obj.moduleOrder > ?";
			this.getBaseDao().executeUpdate(hql, targetModule.getParentId(),targetModule.getModuleOrder());
		}
		this.saveModule(moveModule);
	}
	
	/**
	 * @see 功能描述（必填）：获取员工能够看到的权限树
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 9, 2011 3:13:37 PM</p>
	 * @param empId
	 * @return
	 * 返回值：List<CotModule>
	 * @throws ServiceException 
	 */
	private List<CotModule> getPopedomModuleByEmp(Integer empId) throws ServiceException{
		//查询改员工能看到的菜单
		String hql = "from CotPopedomEmpData where empsId="+empId;
		List list = (List)super.findRecordByHql(hql);
		if(CollectionUtils.isEmpty(list)) return null;
		List moduleIdsList = new ArrayList();
		for(int i=0; i<list.size(); i++){
			CotPopedomEmpData data = (CotPopedomEmpData)list.get(i);
			moduleIdsList.add(data.getModuleId());
			JSONObject object = JSONObject.fromObject(data.getDataJson());
			List parent = (List)JSONArray.toCollection(object.getJSONArray("PARENT"));
			for(int j=0; j<parent.size(); j++){
				Integer paretnId = Integer.valueOf(parent.get(j).toString());
				if(moduleIdsList.contains(paretnId))continue;
				moduleIdsList.add(paretnId);
			}
		}
		//根据获取的到模块ID，记录
		hql = " from CotModule obj where obj.id !=0 and  obj.id in (:ids) and obj.moduleLv <=3 order by obj.moduleOrder";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("ids", moduleIdsList);
		list = (List)super.findRecordByHql(hql, whereMap);
		return  list;
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.service.system.module.CotModuleService#deleteShortcut(java.lang.Integer)
	 */
	public Integer deleteShortcut(Integer moduleId) throws ServiceException {
		CotEmps emp = this.baseData.getCurrentEmps();
		String hql = "delete from CotShortcut where empsId="+emp.getId()+"and moduleId = "+moduleId;
		Integer res = super.updateOrDelTable(hql, null);
		return res;
	}

	
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.service.system.module.CotModuleService#getFirstModules()
	 */
	public List getFirstModules() throws ServiceException {
		// 调用员工信息
		CotEmps emps = this.baseData.getCurrentEmps();
		List<CotModule> list=null;
		if("admin".equalsIgnoreCase(emps.getEmpsId()))
			list = super.findRecordByHql("from CotModule obj where obj.parentId = 1 and id != 1 order by obj.moduleOrder");
		else {
			list = getPopedomModuleRootByEmp(emps.getId());
		}
		return list;
	}
	
	public List getModulesByParentId(Integer parentId) throws ServiceException {
		String hql = " from CotModule obj where obj.parentId="+parentId;
		return super.findRecordByHql(hql);
	}
	
	private List<CotModule> getPopedomModuleRootByEmp(Integer empId) throws ServiceException{
		//查询改员工能看到的菜单
		String hql = "from CotPopedomEmpData where empsId="+empId;
		List list = (List)super.findRecordByHql(hql);
		if(CollectionUtils.isEmpty(list)) return null;
		List moduleIdsList = new ArrayList();
		for(int i=0; i<list.size(); i++){
			CotPopedomEmpData data = (CotPopedomEmpData)list.get(i);
			moduleIdsList.add(data.getModuleId());
			JSONObject object = JSONObject.fromObject(data.getDataJson());
			List parent = (List)JSONArray.toCollection(object.getJSONArray("PARENT"));
			for(int j=0; j<parent.size(); j++){
				Integer paretnId = Integer.valueOf(parent.get(j).toString());
				if(moduleIdsList.contains(paretnId))continue;
				moduleIdsList.add(paretnId);
			}
		}
		//根据获取的到模块ID，记录
		hql = " from CotModule obj where obj.id !=0 and  obj.id in (:ids) and obj.parentId = 1 order by obj.moduleOrder";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("ids", moduleIdsList);
		list = (List)super.findRecordByHql(hql, whereMap);
		return  list;
	}
	
	private List<CotModule> getPopedomModuleByEmpSecond(Integer empId) throws ServiceException{
		//查询改员工能看到的菜单
		String hql = "from CotPopedomEmpData where empsId="+empId;
		List list = (List)super.findRecordByHql(hql);
		if(CollectionUtils.isEmpty(list)) return null;
		List moduleIdsList = new ArrayList();
		for(int i=0; i<list.size(); i++){
			CotPopedomEmpData data = (CotPopedomEmpData)list.get(i);
			moduleIdsList.add(data.getModuleId());
			JSONObject object = JSONObject.fromObject(data.getDataJson());
			List parent = (List)JSONArray.toCollection(object.getJSONArray("PARENT"));
			for(int j=0; j<parent.size(); j++){
				Integer paretnId = Integer.valueOf(parent.get(j).toString());
				if(moduleIdsList.contains(paretnId))continue;
				moduleIdsList.add(paretnId);
			}
		}
		//根据获取的到模块ID，记录
		hql = " from CotModule obj where obj.parentId!=1 and  obj.id !=0 and  obj.id in (:ids) and obj.moduleLv <=3 order by obj.moduleOrder";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("ids", moduleIdsList);
		list = (List)super.findRecordByHql(hql, whereMap);
		return  list;
	}
	
	public String getAllModuleTreeJsnoDataSecond(CotEmps emps) throws ServiceException {
		if("admin".equalsIgnoreCase(emps.getEmpsId()))
			allMenu = super.findRecordByHql("from CotModule obj where obj.parentId!=1 and obj.moduleLv <=3 and id != 1 order by obj.moduleOrder");
		else {
			allMenu = getPopedomModuleByEmpSecond(emps.getId());
		}
		String excludes[] = {"children"};
		GridServerHandler gd = new GridServerHandler(excludes);
		if(allMenu==null)
			allMenu=new ArrayList();
		gd.setData(allMenu);
		gd.setTotalCount(allMenu.size());
		JSONObject jsonObj = gd.getLoadResponseJSON();
		JSONArray jsonArray = (JSONArray)jsonObj.get("data");
		return jsonArray.toString();
	}
	
}
