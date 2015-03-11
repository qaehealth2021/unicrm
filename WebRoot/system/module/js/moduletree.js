Ext.namespace("QH.controls");
$import("common/controls/ModuleTree.js");
$import("common/controls/CheckBoxModule.js");
$import("common/controls/OrgSelector.js");
$import("common/controls/OrgTree.js");
/**
 * 被选中的节点
 * @type 
 */
var selectNode = null;
var parentNodeIds = [];
var empId = null;
Ext.onReady(function(){
 var empId = $('empId').value;
 var viewport = new Ext.Viewport({
	layout:"border",
	items:[{
		xtype:"moduletree",
		title:"模块树-"+$('empsId').value,
		ref:'moduletree',
		funModule:'funmodule',
		empId:empId,
		dataUrl:"querycfgtreemodule.do",
		region:"west",
		width:200,
		listeners:{
			"beforeclick":function(node){
				if(node.getDepth() == 2){
					parentNodeIds = [];
					loadModuleFun(node);
					var temp = node;
					while(temp.id != 1){
						temp = temp.parentNode;
						if(temp.id == 1) continue;
						parentNodeIds.push(parseInt(temp.id));
					}
				}
				else if(node.isLeaf()){
					parentNodeIds = [];
					loadModuleFun(node);
					var temp = node;
					while(temp.id != 1){
						temp = temp.parentNode;
						if(temp.id == 1) continue;
						parentNodeIds.push(parseInt(temp.id));
					}
				}
			},
			"click":function(node){
				if(node.getDepth() == 1) selectNode = null;
				else {
					selectNode = node;
					bindData(node);
				}
			}
		}
	},{
		region:"center",
		frame:true,
		layout:"border",
		//autoScroll:true,
		padding:"0px",
		buttonAlign:"center",
		fbar:[{
			text:"保存",
			handler:saveFunPopedom
		},{
			text:"应用",
			handler:saveFunPopedom
		}],
		items:[
			{
				xtype:"panel",
				region:'east',
				width:500,
				title:"功能权限(配置业务员的操作权限，如添加，修改，删除等)",
				autoScroll:true,
				id:'funmodule'
				
				//columnWidth:1,
//				fbar:[{text:"全选/反选",handler:function(){
//					var group = Ext.getCmp("checkGroup");
//					group.checkedAll();
//				}}],
//				items:[{
//					xtype:"checkboxmodule",
//					id:"checkGroup",
//					tbName:"CotModuleFun",
//					displayField:"funName",
//					valueField:"id",
//					checkedField:"moduleFunId",
//					ref:"../../moduleFun",
//					columns:4,
//					isDWRFun:true,
//					requestParam:{
//						moduleId:0
//					},
//					dataSource:cotPopedomService.getModuleFun
//				}]
			},
			{
				xtype:"panel",
				title:"数据权限(配置业务员的数据查看权限，如只查看个人，或者公司，或者部门等)",
				region:'center',
				autoScroll:true,
				items:[{
					xtype:"orgtree",
					height:'auto',
					showAll:true,
					ref:"../../orgpopedom"
				}]
			}
		]
	}]
})
/**
 * 绑定节点对应的权限数据
 */
function bindData(node){
	
//	cotPopedomService.getFunPopedomByEmp(node.id,empId,function(res){
//		viewport.moduleFun.setCheckedValue(res);
//	})
	//绑定功能权限
	var moduleTree = viewport.moduletree;
	var checkedVals = moduleTree.getChecked();
	//单击节点的时候，只能当前节点被选中，其他节点都不能选中
	Ext.each(checkedVals,function(checkNode){
		checkNode.getUI().toggleCheck(false);
		//moduleTree.fireEvent('checkchange',checkNode,false);
	});
	node.getUI().toggleCheck(true);
	//绑定数据权限
	cotPopedomService.getDataPopedomByEmp(node.id,empId,function(res){
		if(res){
			viewport.orgpopedom.setCheckValue(res["COMPANY"],"COMPANY");
			viewport.orgpopedom.setCheckValue(res["DEPT"],"DEPT");
			viewport.orgpopedom.setCheckValue(res["EMP"],"EMP");
		}
	})
}
/**
 * 加载功能菜单数据
 */
function loadModuleFun(node){
	var cfg = {
		requestParam:{
			moduleId:node.id
		},
		cacheKey:node.id
	}
	//viewport.moduleFun.load(cfg);
	//清空所有已选项
	//viewport.moduleFun.checkedAll(false);
	viewport.orgpopedom.checkedAll(false)
}
function saveFunPopedom(){
	var selectedModule = viewport.moduletree.getSelectedModule();
	if(selectedModule.length == 0){
		window.alertMsg("请选择叶子节点");
		return;
	}
//	var funIds = viewport.moduleFun.getCheckedValue();
//	//保存功能权限
//	cotPopedomService.saveFunPopedom(selectNode.id,empId,funIds,function(res){
//	});
	
//	alert("COMPANY:"+dataPopedom.COMPANY);
//	alert("DEPT:"+dataPopedom.DEPT);
//	alert("EMP:"+dataPopedom.EMP);
//	return;
	var moduleIds = [];
	var moduleIdsMap = {};
	var funIdsMap = {};
	Ext.each(selectedModule,function(sel){
		parentNodeIds = [];
		parentNodeIds.push(sel.parentId);
		moduleIds.push(sel.moduleId);
		var dataPopedom = {
			COMPANY:viewport.orgpopedom.getCheckValue("COMPANY"),
			DEPT:viewport.orgpopedom.getCheckValue("DEPT"),
			EMP:viewport.orgpopedom.getCheckValue("EMP"),
			PARENT:parentNodeIds
		}
		moduleIdsMap[sel.moduleId] = dataPopedom;
		var funIds = Ext.getCmp('checkGroup_'+sel.moduleId).getCheckedValue();
		funIdsMap[sel.moduleId] = funIds
	});
	var funIdsMapJson = Ext.encode(funIdsMap);
	//保存功能权限
	cotPopedomService.saveFunPopedom(moduleIds,empId,funIdsMapJson,function(res){});
	var moduleIdsMapJson = Ext.encode(moduleIdsMap);
	//保存数据权限
	cotPopedomService.saveDataPopedom(moduleIds,empId,moduleIdsMapJson,function(res){
		window.alertMsg("保存成功");
	});
}
})
