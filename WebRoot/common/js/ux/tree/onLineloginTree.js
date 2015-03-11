Ext.namespace("Ext.Login");
Ext.Login.OnLineLoginTree = Ext.extend(Ext.tree.TreePanel, {
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
					text : '在线员工',
					expanded : true,
					draggable : false,
					id : "root_0"
				});
//		this.tbar = new Ext.Toolbar({
//					enableOverflow : true,
//					items : ['->', {
//								iconCls : 'filesystem_share',
//								text : '勾选群发',
//								tooltip : '勾选群发',
//								overflowText : '勾选群发',
//								handler : treePanel.showSendMsg.createDelegate(treePanel,[false])
//							},'-', {
//								iconCls : 'group',
//								text : '在线全发',
//								tooltip : '在线全发',
//								overflowText : '在线全发',
//								handler : treePanel.showSendMsg.createDelegate(treePanel,[true])
//							}]
//				});
		this.loader = new Ext.tree.TreeLoader({
					dataUrl : "listOnlineCompanyLogin.do",
					listeners : {
						'beforeload' : {
							fn : function(loader, node) {
								var treeLv = node.attributes.treeLv;
								if (treeLv == 1) {
									loader.dataUrl = "listOnlineDeptLogin.do";
								}
								if (treeLv == 2) {
									loader.dataUrl = "listOnlineEmpLogin.do";
								}
								loader.baseParams = {
									treeLvId : node.attributes.treeLvId
								}
							},
							scope : this
						}
					}
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
			} else {
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
		this.on("checkchange", function(node, checked) {
					if (node.hasChildNodes()) {
						node.eachChild(function(child) {
									child.getUI().toggleCheck(checked);
								})
					}
				}, this);
		Ext.Login.OnLineLoginTree.superclass.initComponent.call(this);
	},
	showSendMsg : function(flag) {
		//勾选群发时获得勾选的节点
		var ids=null;
		if(!flag){
			var ary=this.getChecked("id");
			if(ary.length==0){
				alertMsg('请先勾选要发送的在线人!');
				return;
			}else{
				ids="";
				for (var i = 0; i < ary.length; i++) {
					if(ary[i].indexOf('emp')!=-1){
						ids+=ary[i].substring(4)+",";
					}
				}
				if(ids==""){
					alertMsg('请先勾选要发送的在线人!');				
					return;
				}
				ids=ids.substring(0,ids.length-1);
			}
		}
		var win = new Ext.Window({
					title : '消息群发',
					width : 300,
					height : 200,
					modal : true,
					frame : true,
					layout : 'fit',
					listeners : {
						'show' : function() {
							this.findByType('textarea')[0].focus(true, true);
						}
					},
					items : [{
						xtype : 'form',
						labelAlign : 'right',
						monitorValid : true,
						labelAlign : 'right',
						buttonAlign : 'center',
						fbar : [{
							text : '发送',
							scale : 'large',
							formBind : true,
							iconCls : "page_table_save",
							handler : function() {
								var ctx = win.context.getValue();
								cotLoginService.sendMsg(ids, ctx,
										function(res) {
											alertMsg('发送成功!');
											win.close();
										})
							}
						}],
						items : [{
									xtype : 'textarea',
									ref : "../context",
									allowBlank : false,
									blankText : '请填写消息内容!',
									hideLabel : true,
									anchor : '100%',
									height : 120
								}]
					}]
				});
		win.show();
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
Ext.reg('onlinelogintree', Ext.Login.OnLineLoginTree);