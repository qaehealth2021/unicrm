/**
 * 组织架构树
 * @class QH.controls.OrgTree
 * @extends Ext.tree.TreePanel
 */
QH.controls.OrgTree = Ext.extend(Ext.tree.TreePanel,{
	autoScroll : true,
	enableDD : false,// 是否可以拖拽
	border : true, // 边框
	useArrows : false,// 文件夹前显示的图标改变了不在是+号了
	enableDrop : true,
	containerScroll : true,
	rootVisible : false,// 隐藏根节点
	showAll:false,//是否立刻加载所有节点
	doParentCheck:true,//true是调用doCheckedValue方法
	initComponent : function(){
		var treePanel = this;
		this.root = new Ext.tree.AsyncTreeNode({
					text : '所有员工',
					expanded : true,
					draggable : false,
					id : "root_0"
				});
		this.loader = new Ext.tree.TreeLoader({
			dataUrl : "listFileCompanyLogin.do",
			listeners : {
				'beforeload' : {
					fn : function(loader, node) {
						var treeLv = node.attributes.treeLv;
						if (treeLv == 1) {
							loader.dataUrl = "listFileDeptLogin.do";
						}
						if (treeLv == 2) {
							loader.dataUrl = "listFileEmpLogin.do";
						}
						loader.baseParams = {
							treeLvId : node.attributes.treeLvId
						}
					},
					scope : this
				}
			}
		});
		QH.controls.OrgTree.superclass.initComponent.call(this);
	},
	listeners : {
		'afterrender' : function(tx) {
			if(this.showAll)
				tx.expandAll();
			var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"等待组织架构加载，大概需要8秒钟"});
			myMask.show();
			window.setTimeout(function(){myMask.hide()},8*1000);
		},
		'beforeclick' : {
			fn : function(node, e) {
				return false;
			}
		},
		'checkchange':function(node,checked){
			var root = this.getRootNode();
			//如果父亲节点已经已经勾选，子节点就不能在勾选了
			if(checked){
				node.setText('<font color=red>'+node.text+'</font>');
			}else{
				node.setText(node.attributes.backText);
			}
			if(checked){
				this.doCheckedValue(node,node,root);
			}
			if (node.hasChildNodes()) {
				node.eachChild(function(child) {
					child.getUI().toggleCheck(false);
				})
			}
		}
	},
	getCheckValue:function(type){
		if(type == "COMPANY")
			return this.getCheckCompanyValue();
		else if(type == "DEPT")
			return this.getCheckDeptValue();
		else if(type == "EMP")
			return this.getCheckEmpValue();
	},
	getCheckCompanyValue:function(){
		var checkVals = this.getChecked();
		var ids = [];
		Ext.each(checkVals,function(node){
			var idx = node.id.indexOf('company_');
			if(idx > -1){
				ids.push(node.attributes.treeId);
			}
		});
		return ids;
	},
	getCheckDeptValue:function(){
		var checkVals = this.getChecked();
		var ids = [];
		Ext.each(checkVals,function(node){
			var idx = node.id.indexOf('dept_');
			if(idx > -1){
				ids.push(node.attributes.treeId);
			}
		});
		return ids;
	},
	getCheckEmpValue:function(){
		var checkVals = this.getChecked();
		var ids = [];
		Ext.each(checkVals,function(node){
			var idx = node.id.indexOf('emp_');
			if(idx > -1){
				ids.push(node.attributes.treeId);
			}
		});
		return ids;
	},
	doCheckedValue:function(node,selfNode,root){
		var pNode = node.parentNode;
		if(pNode.getUI().isChecked()){
			selfNode.getUI().toggleCheck(false);
		}else if(pNode.id != root.id){
			this.doCheckedValue(pNode,selfNode,root)
		}
	},
	/**
	 * 绑定树节点的值
	 * @param {} list
	 * @param {} type
	 */
	setCheckValue:function(list,type){
		this.setTreeCheckValue(type.toLowerCase(),list);
	},
	//private
	setTreeCheckValue:function(type,list){
		var _self = this;
		Ext.each(list,function(id){
			var node = _self.getNodeById(type+"_"+id);
			if(node){
				node.getUI().toggleCheck(true);
			}
		})
	},
	checkedAll:function(isCheckAll){
		this.doCheckAll(isCheckAll,this.getRootNode());
	},
	//private
	doCheckAll:function(isCheckAll,startNode){
		var _self = this;
		if(startNode.hasChildNodes()){
			startNode.eachChild(function(node){
				_self.doCheckAll(isCheckAll,node);
			});
		}else{	
			startNode.getUI().toggleCheck(isCheckAll);
		}
	}
});
Ext.reg("orgtree",QH.controls.OrgTree);