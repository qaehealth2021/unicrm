/**
 * 树形组件，点击节点才记载第二个节点的数据
 * @class QH.controls.ModuleTree
 * @extends Ext.tree.TreePanel
 */
QH.controls.ModuleTree = Ext.extend(Ext.tree.TreePanel,{
	/**
	 * 传递到后台查询子树的参数
	 * @type String
	 */
	queryParam:"type",
	/**
	 * 需要加载功能的面板
	 * @type 
	 */
	funModule:'',
	/**
	 * 需要设置的业务员ID
	 * @type String
	 */
	empId:0,
	initComponent:function(){
		var tree = this;
		Ext.applyIf(this,{
			autoScroll:true,   
	        animate:true,   
	        enableDD:true,   
	        containerScroll: true,    
	        root:new Ext.tree.AsyncTreeNode({   
	             text: '外贸管理软件', 
	             expanded :true,
	             draggable:false,   
	             id:"1" })
		});
		//初始化loader
		var loader = this.loader;
		if(!loader){
	        loader=new Ext.tree.TreeLoader({    
	           dataUrl:this.dataUrl ,
	           listeners : {   
				"beforeload" : function(loader, node){ 
	                 this.baseParams[tree.queryParam] = node.id;
	             }
	           }   
	       });
		}
		Ext.applyIf(this,{loader:loader});
		
	   QH.controls.ModuleTree.superclass.initComponent.call(this);
	   this.on('checkchange',function(node,checked){
//			if (node.hasChildNodes()) {
//				node.eachChild(function(child) {
//					child.getUI().toggleCheck(checked);
//				})
//			}
			if(node.isLeaf()){
				checked == true?this.addFunModule(node):this.removeFunModule(node);
			}else
				node.getUI().toggleCheck(false);
	   });
	},
	/**
	 * 获取选择的模块，不包含根几点，都是叶子节点
	 */
	getSelectedModule : function(){
		var list = [];
		//var selModules = {}
		var checkedList = this.getChecked();
		Ext.each(checkedList,function(node){
			if(node.isLeaf()){
				var obj = {};
				obj.parentId = node.parentNode.id;
				obj.moduleId = node.id;
				list.push(obj);
			}
		});
		return list;
	},
	/**
	 * 动态添加功能权限面板
	 * @param {} node
	 */
	addFunModule:function(node){
		var funmodule = Ext.getCmp(this.funModule);
				var item = {
					xtype:'fieldset',
					title:node.text,
					id:'fieldset_'+node.id,
					items:[{
						hideLabel :true,
						xtype:"checkboxmodule",
						id:"checkGroup_"+node.id,
						tbName:"CotModuleFun",
						displayField:"funName",
						valueField:"id",
						checkedField:"moduleFunId",
						ref:"../../moduleFun_"+node.id,
						columns:4,
						isDWRFun:true,
						requestParam:{
							moduleId:node.id
						},
						dataSource:cotPopedomService.getModuleFun
					}]
				};
				funmodule.add(item);
				funmodule.doLayout();
				this.bindCheckValue(node);
	},
	removeFunModule:function(node){
		var funmodule = Ext.getCmp(this.funModule);
		var funItem = Ext.getCmp("fieldset_"+node.id);
		funmodule.remove(funItem);
		funmodule.doLayout();
	},
	bindCheckValue:function(node){
		var funItem = Ext.getCmp("checkGroup_"+node.id);
		cotPopedomService.getFunPopedomByEmp(node.id,this.empId,function(res){
			funItem.setCheckedValue(res);
		});
	}
})
Ext.reg("moduletree",QH.controls.ModuleTree);