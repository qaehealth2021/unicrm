Ext.namespace("QH.fileSystem");
QH.fileSystem.AlreadyChoseEmpTree = Ext.extend(Ext.tree.TreePanel, {
	// title:'员工邮箱',
	autoScroll : true,
	enableDD : false,// 是否可以拖拽
	border : true, // 边框
	useArrows : false,// 文件夹前显示的图标改变了不在是+号了
	enableDrop : true,
	pageCfg : '',// 页面配置
	containerScroll : true,
	rootVisible : false,// 隐藏根节点
	selectOnline : 0,
	totalOnline : 0,
	keyOnline : '',
	ids:'',//勾选的文档ids数组
	empsIds:'',
	resultOnline : null,
	initComponent : function() {
		var treePanel = this;
		//如果只选择一条文档时,这时要加载该条文档已经共享给了哪些人,否则不用
		this.oneFileId=0;
		if(this.ids && this.ids.length==1){
			this.oneFileId=this.ids[0];
		}
		this.root = new Ext.tree.AsyncTreeNode({
					text : '已共享的员工',
					expanded : true,
					draggable : false,
					id : "root_0"
				});
		this.tbar = new Ext.Toolbar({
					enableOverflow : true,
					items : ['->', {
								iconCls : 'filesystem_share',
								text : '取消共享',
								tooltip : '取消共享',
								overflowText : '取消共享',
								handler : treePanel.showSendMsg.createDelegate(treePanel,[false])
							}]
				});
		this.loader = new Ext.tree.TreeLoader({
					dataUrl : "listFileShareCompanyLogin.do",
					listeners : {
						'beforeload' : {
							fn : function(loader, node) {
								var treeLv = node.attributes.treeLv;
								if (treeLv == 1) {
									loader.dataUrl = "listFileShareDeptLogin.do";
								}
								if (treeLv == 2) {
									loader.dataUrl = "listFileShareEmpLogin.do";
								}
								loader.baseParams = {
									treeLvId : node.attributes.treeLvId,
									oneFileId : treePanel.oneFileId,
									empsIds : treePanel.empsIds
								}
							},
							scope : this
						}
					}
				});

		this.on("checkchange", function(node, checked) {
					if (node.hasChildNodes()) {
						node.eachChild(function(child) {
									child.getUI().toggleCheck(checked);
								})
					}
				}, this);
		QH.fileSystem.AlreadyChoseEmpTree.superclass.initComponent.call(this);
	},
	showSendMsg : function() {
		var _self=this;
		var ary=_self.getChecked("id");
		if(ary.length==0){
			alertMsg('请先勾选要取消共享的员工!');
			return;
		}else{
			var empsIds=[];
			var nodes=[];
			for (var i = 0; i < ary.length; i++) {
				if(ary[i].indexOf('emp')!=-1){
					empsIds.push(ary[i].substring(4));
					nodes.push(ary[i]);
				}
			}
			if(empsIds.length==0){
				alertMsg('请先勾选要取消共享的员工!');				
				return;
			}
			Ext.Msg.confirm('提示消息','是否要取消共享给选择的员工?',function(btn){
				if(btn=='yes'){
					cotFileSystemService.deleteFileShares(_self.ids,empsIds,function(res){
						for (var i = 0; i < nodes.length; i++) {
							var node=_self.getRootNode().findChild("id",nodes[i],true);
							node.remove(true);
						}
						//刷新文件主面板
						QH_VIEWPORT.gridPanel.getStore().reload();
						//关闭
						_self.ownerCt.close();
					})
				}
			})
		}
		
	},
	listeners : {
		'afterrender' : function(tx) {
			tx.expandAll();
		},
		'beforeclick' : {
			fn : function(node, e) {
				return false;
			}
		}
	}
});
Ext.reg('alreadychoseemptree', QH.fileSystem.AlreadyChoseEmpTree);