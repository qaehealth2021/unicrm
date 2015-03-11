QH.fileSystem.ChoseEmpTree = Ext.extend(Ext.tree.TreePanel, {
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
	resultOnline : null,
	initComponent : function() {
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
		this.empTxt=new Ext.form.TextField({
								width : 80,
								emptyText : '员工英文名',
								enableKeyEvents :true,
								listeners : {
									'keydown' : function(txt,e) {
										if (e.getKey() == Ext.EventObject.ENTER) {
											treePanel.findByKeyWordPath(false);
										}
									}
								}
							});
		this.labNum=new Ext.form.Label({
			text : "0/0"
		})
		this.tbar = new Ext.Toolbar({
			enableOverflow : true,
			items : [this.empTxt, {
						iconCls : "page_sel",
						tooltip : '查询',
						handler : this.findByKeyWordPath.createDelegate(this,[false])
					}, {
						tooltip : '重置',
						iconCls : "page_del_small",
						handler : function() {
							treePanel.empTxt.setValue('');
							treePanel.resetNum();
						}
					}, '-', this.labNum, {
						tooltip : '上一条',
						iconCls : "page_upload",
						handler :this.findByKeyWordPath.createDelegate(this,[true])
					}, {
						tooltip : '下一条',
						iconCls : "page_import",
						handler : this.findByKeyWordPath.createDelegate(this,[false])
					},  {
						iconCls : 'page_refresh',
						tooltip : '刷新',
						overflowText : '刷新',
						handler : function() {
							treePanel.loader.dataUrl = "listFileCompanyLogin.do";
							treePanel.resetNum();
							treePanel.loader.load(treePanel.root);
						},
						scope : this
					},'->',{
						text:'共享',
						iconCls : "page_pencil_go",
						tooltip : '共享给勾选的员工',
						overflowText : '共享',
						handler:this.shareToEmps.createDelegate(this)
					}]
		});
		this.on("checkchange", function(node, checked) {
					if (node.hasChildNodes()) {
						if(!node.isExpanded()){
							node.expand(true,true,function(){
								node.eachChild(function(child) {
										child.getUI().toggleCheck(checked);
									})
							});
						}else{
							node.eachChild(function(child) {
										child.getUI().toggleCheck(checked);
									})
						}
					}
				}, this);
		QH.fileSystem.ChoseEmpTree.superclass.initComponent.call(this);
	},
	listeners : {
		'beforeclick' : {
			fn : function(node, e) {
				return false;
			}
		}
	},
	resetNum:function(){
		this.selectOnline=0;
		this.totalOnline=0;
		this.keyOnline='';
		this.resultOnline=null;
		this.labNum.setText("0/0");
	},
	//flag==true是查找上一条
	findByKeyWordPath : function(flag) {
		var tree = this;
		var text = this.empTxt.getValue();
		if(!text)
			return;
		if(text!=tree.keyOnline){
			//dwr查询员工的树路径
			DWREngine.setAsync(false);
			cotLoginService.findTreePathByEmpName(text, function(res) {
					tree.resultOnline=res;
					tree.selectOnline=0;
			})
			DWREngine.setAsync(true);
		}
		if (tree.resultOnline==null || tree.resultOnline.length==0) {
			tree.resetNum();
			return;
		}
		tree.keyOnline=text;
		tree.totalOnline=tree.resultOnline.length;
		
		if(flag){
			tree.selectOnline--;
		}else{
			tree.selectOnline++;
		}
		//empfind里面的值不变,一直按回车时,要跳到下一条
		if(tree.selectOnline>tree.totalOnline){
			tree.selectOnline=1;
		}
		if(tree.selectOnline<=0){
			tree.selectOnline=tree.totalOnline;
		}
		tree.selectPath(tree.resultOnline[tree.selectOnline-1],'id',function(bSuccess, oSelNode){
			tree.labNum.setText(tree.selectOnline+"/"+tree.totalOnline);
			tree.empTxt.focus();
		});
	},
	shareToEmps:function(){
		var _self=this;
		Ext.Msg.confirm('提示消息','是否要共享给选择的员工?',function(btn){
			if(btn=='yes'){
				var empsIds=[];
				var ary=_self.getChecked("id");
				if(ary.length==0){
					alertMsg('请先勾选要共享的员工!');
					return;
				}else{
					for (var i = 0; i < ary.length; i++) {
						if(ary[i].indexOf('emp')!=-1){
							empsIds.push(ary[i].substring(4));
						}
					}
					if(empsIds.length==0){
						alertMsg('请先勾选要共享的员工!');				
						return;
					}
				}
				cotFileSystemService.saveFileShares(_self.ids,empsIds,function(res){
					//刷新文件主面板
					QH_VIEWPORT.gridPanel.getStore().reload();
					//刷新右边树面板
					//如果是选择2条文档以上来共享,则共享后右边树只显示当前左边勾选的员工
					var tree = _self.ownerCt.alreadyTree;
					if(_self.ids.length>1){
						tree.oneFileId=_self.ids[0];
						tree.empsIds=empsIds;
					}
					tree.loader.dataUrl = "listFileShareCompanyLogin.do";
					tree.loader.load(tree.root, function() {
								tree.expandAll();
							});
				})
			}
		})
		
	}
});
Ext.reg('choseemptree',QH.fileSystem.ChoseEmpTree);