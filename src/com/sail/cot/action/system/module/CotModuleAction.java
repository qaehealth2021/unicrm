package com.sail.cot.action.system.module;

import javax.annotation.Resource;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotEmps;
import com.sail.cot.service.system.module.CotModuleService;
/**
 * 
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>模块菜单Action
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Nov 2, 2011 10:44:49 AM </p>
 * <p>Class Name: CotModuleAction.java </p>
 * @author zhao
 *
 */
@SuppressWarnings("serial")
public class CotModuleAction extends AbstractAction{
	@Resource(name="CotModuleService")
	private CotModuleService moduleService;
	
	@SuppressWarnings("unchecked")
	@Override
	public String query() {
		
		try {
			CotEmps emps = super.getCurrEmps();
//			String jsonString = moduleService.getAllModuleTreeJsnoData(emps);
			String jsonString = moduleService.getAllModuleTreeJsnoDataSecond(emps);
			jsonString = "{totalCount:1,data:"+jsonString+"}";
			this.setJsonString(jsonString);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return Constants.JSONDATA;
	}
	
	public String querycfgtree(){
		try {
			CotEmps emps = super.getCurrEmps();
			this.setJsonString(moduleService.getAllModuleTreeJsnoData(emps));
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}
	
	public String listdictree(){
		try {
			String jsonString = moduleService.getModuleTreeJsonData(20);
			this.setJsonString(jsonString);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}
	
	public String querycfg(){
		return "queryCfg";
	}
	
	public String jumpModuleTree(){
		return "moduletree";
	}
	
	//显示自定义excel模版页面
	public String defineExcel(){
		return "defineExcel";
	}
	
	public void setModuleService(CotModuleService moduleService) {
		this.moduleService = moduleService;
	}

}
