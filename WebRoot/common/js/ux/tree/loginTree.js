Ext.namespace("Ext.Login");
Ext.Login.LoginTree = Ext.extend(Ext.tree.TreePanel, {
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
					dataUrl : "listCompanyLogin.do",
					listeners : {
						'beforeload' : {
							fn : function(loader, node) {
								var treeLv = node.attributes.treeLv;
								if (treeLv == 1) {
									loader.dataUrl = "listDeptLogin.do";
								}
								if (treeLv == 2) {
									loader.dataUrl = "listEmpLogin.do";
								}
								loader.baseParams = {
									treeLvId : node.attributes.treeLvId
								}
							},
							scope : this
						}
					}
				});
		this.tbar = new Ext.Toolbar({
			enableOverflow : true,
			items : [new Ext.form.TextField({
								width : 80,
								emptyText : '员工英文名',
								id : 'empfind',
								name : 'empFind',
								enableKeyEvents :true,
								listeners : {
									'keydown' : function(txt,e) {
										if (e.getKey() == Ext.EventObject.ENTER) {
											treePanel.findByKeyWordPath(false);
										}
									}
								}
							}), {
						iconCls : "page_sel",
						tooltip : '查询',
						handler : this.findByKeyWordPath.createDelegate(this,[false])
					}, {
						tooltip : '重置',
						iconCls : "page_del_small",
						handler : function() {
							Ext.getCmp('empfind').setValue('');
							treePanel.resetNum();
						}
					}, '-', {
						xtype : 'label',
						id : 'resultNum',
						text : "0/0"
					}, {
						tooltip : '上一条',
						iconCls : "page_upload",
						handler :this.findByKeyWordPath.createDelegate(this,[true])
					}, {
						tooltip : '下一条',
						iconCls : "page_import",
						handler : this.findByKeyWordPath.createDelegate(this,[false])
					}, '->', {
						iconCls : 'page_refresh',
						tooltip : '刷新',
						overflowText : '刷新',
						handler : function() {
							//					this.root.expand(true);
							treePanel.loader.dataUrl = "listCompanyLogin.do";
							treePanel.resetNum();
							treePanel.loader.load(treePanel.root);
							cotLoginService.findLoginNum(function(res) {
										$('loginNum').innerText = '(' + res
												+ ')';
									});
						},
						scope : this
					}]
		});

		// 被选中的节点
		var sn;
		// 显示不同右键菜单
		function prepareCtx(node, e) {
			node.select();
			this.fireEvent('click', node, e);
			sn = node;
			if (node.attributes.treeLv != 3
					|| GET_SESSION_EMPS_ID == node.attributes.treeId) {
				//				Ext.getCmp('qqBtn').setDisabled(true);
				//				Ext.getCmp('msnBtn').setDisabled(true);
			} else {
				//				Ext.getCmp('qqBtn').setDisabled(false);
				//				Ext.getCmp('msnBtn').setDisabled(false);
				baseSerivce.getObjByIntegerId(node.attributes.treeId,
						"CotEmps", function(res) {
							// 右键菜单
							var ctxMenu = new Ext.menu.Menu({
										items : [{
											text : '电话:'
													+ (!res.empsPhone
															? '无'
															: res.empsPhone),
											handler : function() {
												if (res.empsPhone)
													downRpt('sip:9'
															+ res.empsPhone);
											}
										}, {
											text : '手机:'
													+ (!res.empsMobile
															? '无'
															: res.empsMobile),
											handler : function() {
												if (res.empsMobile)
													downRpt('sip:9'
															+ res.empsMobile);
											}
										}, {
											text : 'X-LITE:'
													+ (!res.xlite
															? '无'
															: res.xlite),
											handler : function() {
												if (res.xlite)
													downRpt('sip:' + res.xlite);
											}
										}]
									});
							ctxMenu.showAt(e.getXY());
						});
			}
		}
		this.on("contextmenu", prepareCtx, this);
		Ext.Login.LoginTree.superclass.initComponent.call(this);
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
		Ext.getCmp('resultNum').setText("0/0");
	},
	//flag==true是查找上一条
	findByKeyWordPath : function(flag) {
		var tree = this;
		var text = Ext.getCmp('empfind').getValue();
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
			Ext.getCmp('resultNum').setText(tree.selectOnline+"/"+tree.totalOnline);
			Ext.getCmp('empfind').focus();
		});
	}
});
Ext.reg('logintree', Ext.Login.LoginTree);