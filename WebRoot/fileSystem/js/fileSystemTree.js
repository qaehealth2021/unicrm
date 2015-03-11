QH.fileSystem.TreePanel = Ext.extend(Ext.tree.TreePanel,{
	autoScroll : true,
	enableDD : false,// 是否可以拖拽
	border : true, // 边框
	useArrows : false,// 文件夹前显示的图标改变了不在是+号了
	// animate : true,// 动画效果
	enableDrop : false,
	ddGroup : 'GridDD',
	pageCfg:'',// 页面配置
	dropConfig : {
		ddGroup : 'GridDD',
		getDropPoint : function(e, n, dd) {
			var tn = n.node;
			if(dd.grid){	// 从grid拖放数据到tree
				return QH.fileSystem.GridDataMoveFn(tn) ? "append" : false;
			}else{	// 移动树节点
				return QH.fileSystem.NodeMoveFn(tn,dd.tree) ? "append" : false;
			}
		},
		appendOnly : true
	},
	containerScroll : true,
	rootVisible : false,// 隐藏根节点
	initComponent:function(){
		var seeEmpIds;	// 有权限查看员工的IDS
//		DWREngine.setAsync(false);
//		cotFileSystemPopedomService.getEmpIds($('empId').value,true,function(res){
//			seeEmpIds = res;
//		});
//		DWREngine.setAsync(true);
//		var otherItems = [];
//		if(!Ext.isEmpty(seeEmpIds)){	// 如果不为空，则在管理他人文档加入这些员工节点
//			Ext.each(seeEmpIds,function(seeId){
//				otherItems.push({
//					text:empsMap[seeId]+'文档',
//					cotEmpsId:seeId,
//					iconCls:'folder',
//					updateFlag:false
//				});
//			});
//			
//		}
		this.root = new Ext.tree.AsyncTreeNode({
			text : '文档管理',
			expanded : true,
			draggable : false,
			children:[{
				text:'个人文档',
				iconCls:'folder',
				updateFlag:false,
				fileFlag:'MU',
				isMyDoc:true,
				expanded : true
			},{
				text:'我的共享',
				iconCls:'folder',
				isMyShare:true,
				fileFlag:'MS',
				updateFlag:false,
				leaf:true
			},{
				text:'他人共享',
				iconCls:'folder',
				isOtherShare:true,
				updateFlag:false,
				fileFlag:'MS',
				leaf:true
			},{
				text:'公共文档',
				iconCls:'folder',
				updateFlag:false,
				isPublicShare:true,
				fileFlag:'PS',
				expanded : true,
				children:[]
			}]
		});
		
		this.loader = new Ext.tree.TreeLoader({
			dataUrl:'listtree_filesystem.do',
			listeners:{
				'beforeload':function(loader,treeNode){
					// upadteFlag属性为false，则说明查看全部文档，否则查看对应节点下的文档
					if(!isNaN(treeNode.id)){
						loader.baseParams['parentId'] = treeNode.id;
					}
				},
				'load':function(loader,treeNode){
					// 加载完成后，选中个人文档节点
					if(treeNode.attributes.isMyDoc){
						treeNode.select();
						treeNode.fireEvent('click',treeNode);
					}
				}
			}
		});
		QH.fileSystem.TreePanel.superclass.initComponent.call(this);
		
		this.initContextMenu();
		this.on('beforenodedrop',function(e){
			if(e.data.grid)
				QH.fileSystem.moveGridDataToNodeFn(e.target);
			else
				QH.fileSystem.moveToNodeFn(e);
		})
		this.on('enddrag',function(tree,node,e){
			tree.getSelectionModel().select(node);
			tree.fireEvent('click',node);
		},this,{
			buffer:100
		});
		//this.on('beforeclick',function(){return false;},this,{buffer:1000})
		this.on('click',function(node,e){
			var gridPanel = QH_VIEWPORT.gridPanel;
			var gridTbar = gridPanel.getTopToolbar();
			var store = gridPanel.getStore();
			store.setBaseParam("fileTreeId",node.attributes.updateFlag===false?0:node.attributes.id);
			
			// 如果为他人共享节点则取，他人共享数据
			if(node.attributes.isOtherShare){
				store.setBaseParam("uploadEmpId","");
				store.setBaseParam("fileFlag","MS");
				gridTbar.uploadBtn.hide();
//				gridTbar.batchUploadBtn.hide();
				gridTbar.modBtn.hide();
				gridTbar.delBtn.hide();
				gridTbar.shareBtn.hide();
//				gridTbar.moveBtn.show();
//				QH_VIEWPORT.popedomGrid.hide();
			}else if(node.attributes.isMyShare){
				//取自己共享的数据
				store.setBaseParam("uploadEmpId",window.GET_SESSION_EMPS_ID);
				store.setBaseParam("fileFlag","MS");
				gridTbar.uploadBtn.hide();
//				gridTbar.batchUploadBtn.hide();
				gridTbar.modBtn.hide();
				gridTbar.delBtn.hide();
				gridTbar.shareBtn.show();
//				gridTbar.moveBtn.show();
			}else if(node.attributes.isPublicShare){
				store.setBaseParam("uploadEmpId","");
				store.setBaseParam("fileFlag","PS");
				gridTbar.uploadBtn.hide();
//				gridTbar.batchUploadBtn.hide();
				gridTbar.modBtn.hide();
				gridTbar.delBtn.hide();
				gridTbar.shareBtn.hide();
//				gridTbar.moveBtn.show();
			}
			else{
				store.setBaseParam("fileFlag","");
				store.setBaseParam("uploadEmpId",window.GET_SESSION_EMPS_ID);
				if(node.attributes.updateFlag === false){
					gridTbar.uploadBtn.hide();
//					gridTbar.batchUploadBtn.hide();
				}else{
					gridTbar.uploadBtn.show();
//					gridTbar.batchUploadBtn.show();
				}
				gridTbar.modBtn.show();
				gridTbar.delBtn.show();
				gridTbar.shareBtn.show();
//				gridTbar.moveBtn.hide();
//				QH_VIEWPORT.popedomGrid.show();
			}
//			QH_VIEWPORT.doLayout();
			store.load({
				params:{
					start : 0
				}
			});
		},this,{
			buffer:100
		});
	},
	/**
	 * 初始化树菜单
	 */
	initContextMenu : function(){
		this.ctxMenu = new Ext.menu.Menu({
			items : [{
				text : "新增文件夹",
				ref:'newMenu',
				handler : this.addDir,
				scope:this,
				menu : {
					layout : 'hbox',
					layoutConfig : {
						align : 'middle'
					},
					width : 200,
					items : [{
						xtype : 'textfield',
						maxLength : 100,
						ref:'docText',
						selectOnFocus : true,
						value : '新建文件夹'
					}, {
						xtype : 'button',
						text : "添加",
						flex : 1,
						iconCls : 'page_img',
						handler : this.addDir,
						scope:this
					}]
				}
			},{
				text : "删除",
				ref:'delMenu',
				handler : this.delDir,
				scope:this
			}, {
				text : "重命名",
				ref:'reMenu',
				handler : this.reDir,
				scope:this
			}]
		});
		this.on("contextmenu", this.prepareCtx, this);
	},
	/**
	 * 显示不同右键菜单
	 * @param {} node
	 * @param {} e
	 */
	prepareCtx : function(node,e){
		node.select();
		this.fireEvent('click', node, e);
		// 如果为共享或管理他人文档，则不显示菜单
		if (node.attributes.isMyShare || node.attributes.isOtherShare || node.attributes.isPublicShare) {
			return;
		}
		this.selNode = node;
		var ctxMenu = this.ctxMenu;
		// 如果为不可更新，则不显示删除及重命名菜单
		if (node.attributes.updateFlag === false) {
			ctxMenu.delMenu.setDisabled(true);
			ctxMenu.reMenu.setDisabled(true);
		} else {
			ctxMenu.delMenu.setDisabled(false);
			ctxMenu.reMenu.setDisabled(false);
		}
		ctxMenu.showAt(e.getXY());
	},
	/**
	 * 添加节点
	 */
	addDir:function(){
		var selNode = this.selNode;
		this.ctxMenu.hide();
		selNode.expand();
		// 保存到后台
		var nodeNewName = this.getDocTextField().getValue();
		if (nodeNewName == '') {
			nodeNewName = '新建文件夹';
		}
		var fileTree = new CotFileTree();
		var fileTree = {
			parentId:selNode.attributes.updateFlag !== false?selNode.attributes.id:null,
			nodeCls:'folder',
			nodeName:nodeNewName,
			empsId:window.GET_SESSION_EMPS_ID
		}
		QH_LOADMASK = new Ext.LoadMask(QH_VIEWPORT.el,{msg:'保存数据中。。。'});
		QH_LOADMASK.show();
		cotFileTreeService.saveFileTree(fileTree,function(res){
			QH_LOADMASK.hide();
			Ext.apply(fileTree,{
				id:res,
				text:fileTree.nodeName,
				iconCls:fileTree.nodeCls,
				fileFlag:'MU'
			})
			var newNode = new Ext.tree.TreeNode(fileTree);
			selNode.appendChild(newNode);
		});
	},
	/**
	 * 删除节点
	 */
	delDir : function(){
		var selNode = this.selNode;
		Ext.MessageBox.confirm("提示消息", "真的要删除\""+selNode.text+"\"这个节点吗？",
			function(button, text) {
				if (button == "yes") {
					cotFileTreeService.deleteNode(selNode.id,function(res) {
						var tempNode = selNode.parentNode;
						tempNode.removeChild(selNode);
						if (!tempNode.hasChildNodes()) {
							// 替换样式
							Ext.fly(tempNode.ui.elNode)
								.replaceClass("x-tree-node-collapsed","x-tree-node-leaf");
						}
					});
					// 保存到后台
				}
			});
	},
	/**
	 * 重命名节点
	 */
	reDir : function(){
		var selNode = this.selNode;
		Ext.MessageBox.prompt('文档重命名', '将"' + selNode.text + '" 修改为:', function(btn, text) {
			if (btn == 'ok') {
				if (text == '') {
					Ext.MessageBox.alert('提示消息', '节点名称不能为空');
					return false;
				}
				selNode.setText(text);// 更新节点内容
				// 保存到后台
				cotFileTreeService.renameTreeNode(selNode.id, text,function(res) {
				});
			}
		});
	},
	/**
	 * 获得新增文档的名称文本框
	 * @return {}
	 */
	getDocTextField:function(){
		return this.ctxMenu.newMenu.menu.docText;
	}
});
Ext.reg('filesystemtree',QH.fileSystem.TreePanel);


QH.fileSystem.MoveTreeWindow = Ext.extend(Ext.Window, {
	width : 300,
	height : 300,
	shadow : true,
	constrain : true,
	title : "转载文档到",
	resizable : true,
	layout : 'fit',
	modal : true,
	initComponent : function() {
		var treeWin = this;
		var tree = new QH.fileSystem.MoveTree({
		});
		tree.on('click', function(node, e) {
			treeWin.okBtn.enable();
		});
		this.items = [tree];
		this.buttons = [{
			text : '确定',
			ref : '../okBtn',
			disabled : true,
			scope : this,
			handler : function() {
				var node = tree.getSelectionModel().getSelectedNode();
				var nodeId = node.attributes.id;
				var records = QH_VIEWPORT.gridPanel.getSelectionModel().getSelections();
				var datas = [];
				Ext.each(records,function(record){
					datas.push(Ext.apply(new CotFileSystem(),{
						id:null,
						moveSourceNode:record.get('id'),
						cotFileTreeId:nodeId
					},record.data));
				});
				QH_LOADMASK = new Ext.LoadMask(tree.getEl(),{msg:'转载文档中。。。'});
				QH_LOADMASK.show();
				cotFileSystemPopedomService.updatePodomMoveFlag(datas,$('empId').value,function(){
					QH_LOADMASK.hide();
					QH_VIEWPORT.gridPanel.getStore().reload();
					treeWin.close();
				});
			}
		}, {
			text : '取消',
			handler : function() {
				treeWin.close();
			}
		}]
		QH.fileSystem.MoveTreeWindow.superclass.initComponent.call(this);
	}
});

QH.fileSystem.MoveTree = Ext.extend(Ext.tree.TreePanel, {
	ref : 'mailTree',
	enableDD : false,// 是否可以拖拽
	border : true, // 边框
	useArrows : false,// 文件夹前显示的图标改变了不在是+号了
	animate : true,// 动画效果
	containerScroll : true,
	autoScroll : true,
	rootVisible : false,// 隐藏根节点
	hiddenPkgs : [],
	initComponent : function() {
		var tree = this;
		tree.root = new Ext.tree.AsyncTreeNode({
			text:'个人文档',
			cotEmpsId:$('empId').value,
			iconCls:'folder',
			updateFlag:false,
			isMyDoc:true,
			expanded : true,
			draggable : false
		});
		tree.loader = new Ext.tree.TreeLoader({
			dataUrl:'cotfilesystem.do?method=queryTree',
			listeners:{
				'beforeload':function(loader,treeNode){
					loader.baseParams.parentId = treeNode.attributes.updateFlag !== false 
					?treeNode.attributes.id:'';
					loader.baseParams.cotEmpsId = treeNode.attributes.cotEmpsId;
				},
				'load':function(loader,treeNode){
//							if(treeNode.attributes.isMyDoc){
//								treeNode.select();
//								treeNode.fireEvent('click',treeNode);
//							}
				}
			}
		});
		tree.filter = new Ext.tree.TreeFilter(tree);
		QH.fileSystem.MoveTree.superclass.initComponent.call(this);
	}
});

QH.fileSystem.GridDataMoveFn = function(target) {
	if (target.attributes.updateFlag !== false && target.attributes.cotEmpsId == $('empId').value)
		return true;
	else
		return false;
}
QH.fileSystem.NodeMoveFn = function(target,tree) {
	var node = tree.getSelectionModel().getSelectedNode();
	if (target.attributes.updateFlag !== false && target.attributes.cotEmpsId == node.attributes.cotEmpsId
		)
		return true;
	else
		return false;
}
QH.fileSystem.moveToNodeFn = function(e){
	var target = e.target;
	var ddNode = e.data.node;
	QH_LOADMASK = new Ext.LoadMask(QH_VIEWPORT.getEl(),{msg:'保存中。。。'});
	QH_LOADMASK.show();
	cotFileTreeService.moveToNode(ddNode.id,target.id,function(){
		QH_LOADMASK.hide();
	});
	
}
QH.fileSystem.moveGridDataToNodeFn = function(target) {
	var selNode = QH_VIEWPORT.treePanel.getSelectionModel().getSelectedNode();
	if (target.attributes.cotEmpsId != $('empId').value && !selNode.attributes.isShare)
		return ;
	var grid = QH_VIEWPORT.gridPanel; // 选中的grid
	var records = grid.getSelectionModel().getSelections();
	if (records.length > 0){
		if(selNode.attributes.isShare){
			QH_LOADMASK = new Ext.LoadMask(QH_VIEWPORT.getEl(),{msg:'转载文档中。。。'});
			QH_LOADMASK.show();
			var datas = [];
			Ext.each(records,function(record){
				datas.push(Ext.apply(new CotFileSystem(),{
					id:null,
					moveSourceNode:record.get('id'),
					cotFileTreeId:target.id
				},record.data));
			});
			cotFileSystemPopedomService.updatePodomMoveFlag(datas,$('empId').value,function(){
				QH_LOADMASK.hide();
				grid.getStore().reload();
			});
		}else{
			var mailIds = [];
			Ext.each(records, function(record) {
				mailIds.push(record.get('id'));
			});
			QH_LOADMASK = new Ext.LoadMask(QH_VIEWPORT.getEl(),{msg:'移动文档中。。。'});
			QH_LOADMASK.show();
			cotFileTreeService.moveFileToNode(target.id, mailIds, function(result) {
				QH_LOADMASK.hide();
				grid.getStore().reload();
			});
		}
	}
}
