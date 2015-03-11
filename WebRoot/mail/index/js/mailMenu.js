
QH.mail.MenuToolbar = Ext.extend(Ext.Toolbar,{
	enableSelectItems:[],	// 当有选择邮件时，显示
	enableOneSelectItems:[],	// 当选择一封邮件时，显示
	enableNodeSelectItems:[],	// 当树节点有选择时，显示
	initComponent:function(){
		this.items = [{
			text:'文件(F)',
			ref:'fileMenu',
			menu:{
				items:[{
					text:'撰写邮件',
					iconCls:'mail_add',
					enableNodeSelect:true,
					scope:this,
		        	sendType:MAIL_SEND_TYPE_STATUS.NEW,
					handler:QH.mail.openSendMailFn
				},{
					text:'接收邮件',
		        	iconCls:'mail_recive',
					enableNodeSelect:true,
		        	scope:this,
		        	handler:QH.mail.ReciveMailFn
				},'-',{
					text:'导入邮件',
					iconCls:'mail_import_eml',
					enableNodeSelect:true,
					scope:this,
					ref:'importEmlBtn',
					handler:this.importEmlMail
				},{
					text:'导出邮件',
					iconCls:'mail_export_eml',
					enableSelect:true,
					scope:this,
					ref:'exportEmlBtn',
					handler:this.exportEmlMail
				},'-',{
					text:'打印',
					iconCls:'page_print',
					enableOneSelect:true,
					scope:this,
					ref:'printBtn',
					handler:this.printMail
				}]
			}
		},
		{
			text:'视图(V)',
			ref:'mailview',
			menu:{
				items:[
				{
					text:'邮件预览窗口',
					menu:{
						items:[{
							text:'靠右',
							checked: true,
							group: 'detailPositon',
							position:MAIL_DETAIL_PANEL_POSITION.RIGHT,
							checkHandler:this.detailPosition
						},{
							text:'底端',
							checked: false,
							group: 'detailPositon',
							position:MAIL_DETAIL_PANEL_POSITION.BOTTOM,
							checkHandler:this.detailPosition
						},{
							text:'关闭',
							checked: false,
							position:MAIL_DETAIL_PANEL_POSITION.CLOSE,
							group: 'detailPositon',
							checkHandler:this.detailPosition
						}]
					}
				},'-',
//				{
//					text:'工具栏',
//					checked:true,
//					scope:this,
//					checkHandler:this.showMailToolbar
//				},
				{
					text:'显示往来邮件',
					checked: false,
					scope:this,
					ref:'maildealingbtn',
					checkHandler:this.showDealingsPanel
				}
//				,{
//					text:'显示子节点邮件',
//					checked: false,
//					scope:this,
//					checkHandler:this.showNodeChildMail
//				},'-',{
//					text:'以标签页方式打开邮件',
//					checked: false,
//					scope:this,
//					checkHandler:this.showTabByOpenMail
//				}
				]
			}
		},
		{
			text:'邮件(M)',
			menu:{
				items:[{
					text:'回复发件人',
					iconCls:'mail_reply',
					enableOneSelect:true,
					scope:this,
		        	sendType:MAIL_SEND_TYPE_STATUS.REPLY,
					handler:QH.mail.openSendMailFn
				},{
					text:'全部回复',
					iconCls:'mail_reply_all',
					enableOneSelect:true,
					scope:this,
		        	sendType:MAIL_SEND_TYPE_STATUS.REPLYALL,
					handler:QH.mail.openSendMailFn
				},{
					text:'转发',
					iconCls:'mail_forward',
					enableOneSelect:true,
					scope:this,
		        	sendType:MAIL_SEND_TYPE_STATUS.FORWARD,
					handler:QH.mail.openSendMailFn
				},
//				{
//					text:'更多操作',
//					enableOneSelect:true,
//					menu:{
//						items:[{
//							text:'再次编辑发送',
//							scope:this,
//				        	sendType:MAIL_SEND_TYPE_STATUS.AGAIN,
//							handler:QH.mail.openSendMailFn
//						},{
//							text:'带附件回复',
//							enableOneSelect:true,
//							scope:this,
//				        	sendType:MAIL_SEND_TYPE_STATUS.ATTACHREPLY,
//							handler:QH.mail.openSendMailFn
//						}]
//					}
//				},'-',{
//					text:'移动到',
//					enableSelect:true,
//					scope:this,
//					handler:this.moveMailTo
//				},
				{
					text:'移到废件箱',
					enableSelect:true,
					iconCls:'mail_delete',
					scope:this,
					handler:QH.mail.MoveMailToDelFn,
					menu:{
						items:[{
							text:'彻底删除',
							enableSelect:true,
							cls:"SYSOP_DEL",
							iconCls:'page_del',
							scope:this,
							handler:QH.mail.DeleteMailFn
						}]
					}
				}]
			}
		}
//		,{
//			text:'工具(T)',
//			ref:'toolMenu',
//			menu:{
//				items:[{
//					text:'远程管理',
//					enableNodeSelect:true,
//					ref:'remoteMailBtn',
//					scope:this,
//					handler:this.remoteMail
//				}]
//			}
//		}
		];
		
		QH.mail.MenuToolbar.superclass.initComponent.call(this);
		
		this.initControlItem();
	},
	/**
	 * 初始化可控制的按钮
	 * private
	 */
	initControlItem : function(){
		this.itemMenuControl(this);
	},
	// private
	itemMenuControl : function(menu){
		var items = menu.items.items,disable;
		Ext.each(items,function(item){
			disable = true;
			if(item.enableOneSelect)
				this.enableOneSelectItems.push(item);
			else if(item.enableSelect)
				this.enableSelectItems.push(item);
			else if(item.enableNodeSelect)
				this.enableNodeSelectItems.push(item);
			else
				disable = false;
			item.setDisabled(disable);
			if(item.menu)
				this.itemMenuControl(item.menu);
		},this);
	},
	/**
	 * 邮件详情面板
	 */
	detailPosition:function(item,checked){
		if(!checked)
			return;
		QH_VIEWPORT.getMainView().showDetailPanel(item.position);
		QH_VIEWPORT.getMainView().doLayout();
		
	},
	/**
	 * 是否显示往来邮件
	 * @param {} item
	 * @param {} checked
	 */
	showDealingsPanel:function(item,checked){
		if(checked)
			QH_VIEWPORT.getMainView().dealingsPanel.show();
		else
			QH_VIEWPORT.getMainView().dealingsPanel.hide();
		QH_VIEWPORT.getMainView().dealingsPanel.dealingsContorl();
		QH_VIEWPORT.getMainView().doLayout();
	},
	/**
	 * 是否显示工具栏
	 * @param {} item
	 * @param {} checked
	 */
	showMailToolbar:function(item,checked){
		if(checked){
			QH_VIEWPORT.getMainView().mailToolbar.show();
			QH_VIEWPORT.getMainView().toolbar.setHeight(56);
		}else{
			QH_VIEWPORT.getMainView().mailToolbar.hide();
			QH_VIEWPORT.getMainView().toolbar.setHeight(28);
		}
		QH_VIEWPORT.getMainView().doLayout();
	},
	/**
	 * 是否显示子节点邮件
	 * @param {} item
	 * @param {} checked
	 */
	showNodeChildMail:function(item,checked){
		MAIL_NODE_SHOW_CHILD_MAIL = checked;
		var store = QH_VIEWPORT.getMainView().mailGrid.getStore();// TODO:被击活的grid
		store.reload();
	},
	/**
	 * 以标签页方式打开邮件
	 */
	showTabByOpenMail : function(item,checked){
		MAIL_OPEN_SHOW_TAB = checked;
		var mainViewContainer = QH_VIEWPORT.getMainViewContainer();
		var mainView = QH_VIEWPORT.getMainView();
		var mainTab = QH_VIEWPORT.getMainTab();
		if(checked){
			mainView.title = '邮件系统';
			mainTab.remove(0,true);	// 去除多出的面板
			mainTab.insert(0,mainView);
			mainTab.setActiveTab(mainView);
			QH_VIEWPORT.getLayout().setActiveItem(mainTab);
		}else{
			mainTab.insert(0,{xtype:'panel'});	// 当只有一个邮件系统页签时，防止下次切换加入页签时，不能点击到
			mainViewContainer.add(mainView);
			QH_VIEWPORT.getLayout().setActiveItem(mainViewContainer);
		}
		QH_VIEWPORT.doLayout();
	},
	/**
	 * 远程管理邮件
	 */
	remoteMail : function(){
		var node = QH_VIEWPORT.getMainView().mailTree.getSelectionModel().getSelectedNode(); // 初选中的节点
		var remoteWin = new QH.mail.RemoteWindow({
			accountId:node.attributes.accountCfgId.id
		});
		remoteWin.show();
	},
	/**
	 * 打印邮件
	 */
	printMail : function(){
		if(QH_VIEWPORT.getMainView().detailPanelPosition == MAIL_DETAIL_PANEL_POSITION.CLOSE){
			Ext.Msg.show({
				title:'系统提示',
				msg:'请显示邮件预览窗口，再选择打印',
				icon:Ext.Msg.WARNING,
				buttons:Ext.Msg.OK
			});
		}else{
			QH_VIEWPORT.getMainView().detailPanel.printMail();
		}
	},
	/**
	 * 导入邮件
	 */
	importEmlMail : function(){
		var node = QH_VIEWPORT.getMainView().mailTree.getSelectionModel().getSelectedNode();
		var win = new QH.ux.win.UploadWindow({
			title:'批量导入邮件',
			swfUploadCfg : {
				file_upload_limit : 300, // 上传数量
				file_size_limit : 100 * 1024,
				file_types : "*.eml;",
				post_params : {
					beanName : "MailReciveService",
					uploadPath : "attach",
					isRName : true,
					doDbOp : false,
					paramJson:Ext.encode({
						nodeId:node.id
					})
				}
			},
			reloadFn:function(result){
				QH_VIEWPORT.getMainView().mailGrid.getStore().reload();
			}
		});
		win.show();
	},
	/**
	 * 导出邮件
	 */
	exportEmlMail : function(){
		var mailToolbar = this;
		var records = QH_VIEWPORT.getMainView().mailGrid.getSelectionModel().getSelections();
		// 获得选中ID
		var mailIds = [];
		Ext.each(records,function(record){
			mailIds.push(record.get('id'));
		});
		var params = {
			mailIds:mailIds.join(','),
			t:'eml'
		}
		downRpt(MAIL_DOWNLOAD_MAIL_FILE + '?' + Ext.urlEncode(params));
	},
	/**
	 * 移动邮件到某个节点下，只能本账号移动
	 */
	moveMailTo : function(){
		var node = QH_VIEWPORT.getMainView().mailTree.getSelectionModel().getSelectedNode(); // 初选中的节点
		var win = new QH.mail.MailMoveTreeWindow({
			cfgId:node.attributes.accountCfgId.id
		});
		win.show();
	},
	/**
	 * 与邮件树操作相对应
	 */
	itemControlByTree:function(){
		var node = QH_VIEWPORT.getMainView().mailTree.getSelectionModel().getSelectedNode(); // 初选中的节点
		Ext.each(this.enableNodeSelectItems,function(selItem){
			selItem.setDisabled(!node);
		},this);
		if(node){
			var nodeType = node.attributes.nodeType;
			// 对导入按钮操作， 不能导入审核节点或查询节点
			this.fileMenu.menu.importEmlBtn.setDisabled(
				nodeType == MAIL_NODE_TYPE.P || nodeType == MAIL_NODE_TYPE.Q
			);
		}
	},
	/**
	 * 与邮件GRID操作相对应
	 */
	itemControlByGird : function(){
		var selModel = QH_VIEWPORT.getMainView().mailGrid.getSelectionModel();
		
		var selMailCount = selModel.getCount();
		var selMail = selModel.getSelected(); // 获得单个选中的邮件
		
		Ext.each(this.enableOneSelectItems,function(selItem){
			selItem.setDisabled(selMailCount != 1);
		},this);
		
		Ext.each(this.enableSelectItems,function(selItem){
			selItem.setDisabled(selMailCount == 0);
		},this);
		
	}
});

Ext.reg('mailmenutoolbar',QH.mail.MenuToolbar);