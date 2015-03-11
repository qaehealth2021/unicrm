
QH.module.ModuleTree = Ext.extend(Ext.tree.TreePanel,{
	dataUrl:'querycfgtreemodule.do',
	enableDD : true,// 是否可以拖拽
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
		this.loader = new Ext.tree.TreeLoader({    
           dataUrl:this.dataUrl 
       });
	   QH.module.ModuleTree.superclass.initComponent.call(this);
       this.on("contextmenu", this.showEditMenu, this);
       this.on("beforeclick", this.moduleClick, this);
       this.on('beforenodedrop',this.beforeNodeDrop,this);
	},
	beforeNodeDrop:function(e){
   		var target = e.target;
		var ddNode = e.data.node;
		var resultError = true;
		DWREngine.setAsync(false);
		cotModuleService.moveModule(ddNode.id,target.id,e.point,function(){
			resultError = false;
		});
		DWREngine.setAsync(true);
		if(!resultError)
			this.moduleClick(ddNode);
		else
			return false;
	},
	moduleClick:function(node){
		var form = QH_VIEWPORT.moduleForm.getForm();
		cotModuleService.getModule(node.id,function(obj){
			form.setValues(obj);
			QH_VIEWPORT.moduleForm.setIcon(obj.moduleImgurl);
		})
		var moduleFunGrid = QH_VIEWPORT.moduleFunGrid;
		var store = moduleFunGrid.getStore();
		if(node == this.root || node.parentNode == this.root){
			moduleFunGrid.disable();
			store.clearData();
		}else{
			moduleFunGrid.enable();
			moduleFunGrid.getTopToolbar().setDefaultData({
				moduleId:node.id
			});
			store.setBaseParam('moduleFun.moduleId',node.id);
			store.reload();
		}
		node.select();
		return false;
	},
	showEditMenu:function(node, e){
		if(!this.editMenu){
			this.editMenu = new Ext.menu.Menu({
	       		items:[{
	       			text:'新建子菜单',
	       			id:'addMenuBtn',
	       			scope:this,
	       			handler:this.addModule
	       		},{
	       			text:'删除菜单',
	       			id:'delMenuBtn',
	       			scope:this,
	       			handler:this.delModule
	       		}]
	       });
		}
		this.moduleClick(node);
		if(node == this.root){
			Ext.getCmp('addMenuBtn').enable();
			Ext.getCmp('delMenuBtn').disable();
		}else{
			Ext.getCmp('addMenuBtn').enable();
			Ext.getCmp('delMenuBtn').enable();
		}
		this.editMenu.showAt(e.getXY());
	},
	addNode:function(module){
		var node = this.getSelectionModel().selNode;
		var newNode = new Ext.tree.TreeNode({
			id:module.id,
			text:module.moduleName,
			leaf:true
		});
		node.appendChild(newNode);
		this.moduleClick(newNode);
	},
	addModule:function(){
		var node = this.getSelectionModel().selNode;
		var form = QH_VIEWPORT.moduleForm.getForm();
		form.reset();
		form.setValues({
			moduleType:'MODULE',
			moduleLv:node == this.root ? 1 : 3,
			moduleUrl:'home.jsp',
			moduleValidurl:'home.jsp',
			parentId:node.id,
			moduleFlag:'ALL'
		});
	},
	delModule:function(btn){
		var tree = this;
		var node = this.getSelectionModel().selNode;
		Ext.Msg.confirm('系统提示','确定删除 '+node.text+' 菜单节点？',function(btn){
			if(btn=='yes'){
				QH_LOADMASK = new Ext.LoadMask(this.getEl(),{msg:'删除菜单节点。。。'});
				QH_LOADMASK.show();
				cotModuleService.deleteModule(node.id,function(){
					QH_LOADMASK.hide();
					var parentNode = node.parentNode;
					parentNode.removeChild(node);
					tree.moduleClick(parentNode);
				});
			}
		},this);
		
		
	}
})
Ext.reg("moduletree",QH.module.ModuleTree);