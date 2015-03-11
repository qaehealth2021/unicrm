/**
 * 接收邮件
 * 
 * @param {}
 *            btn
 */
QH.mail.ReciveMailFn = function() {
	var node = QH_VIEWPORT.getMainView().mailTree.getSelectionModel()
			.getSelectedNode(); // 初选中的节点
	var cfgId = parseInt(node.attributes.accountCfgId.id);
	if (!Ext.isNumber(cfgId))
		cfgId = '';
	if (QH_VIEWPORT['RECIVE_WINDOWS' + cfgId]) {// 已存在窗口，邮件还在接收中，直接显示窗口
		QH_VIEWPORT['RECIVE_WINDOWS' + cfgId].show();
		return;
	}
	var accountNode = QH.mail.getAccountNode(node);
	if (!accountNode.oldText)
		accountNode.oldText = accountNode.text;
	accountNode.setText(accountNode.oldText
			+ '<font color="#888888">&nbsp;正在接收邮件。。。</font>');

	var reciveCfgId;
	DWREngine.setAsync(false);
	mailAccountCfgService.getReciveAccountId(cfgId, function(res) {
				reciveCfgId = res;
			});
	DWREngine.setAsync(true);
	var window = new QH.mail.MailReciveWindow({
				title : accountNode.attributes.text,
				accountNode : accountNode,
				cfgId : cfgId,
				reciveCfgId : reciveCfgId
			});
	window.show();
	QH_VIEWPORT['RECIVE_WINDOWS' + cfgId] = window;
	var task = {
		run : QH.mail.ReciveMailUpdateClock.createDelegate(this, [reciveCfgId,
						window]),
		interval : 1000
	}
	var runner = new Ext.util.TaskRunner();
	runner.start(task);
	window.reciveRunner = runner;
	window.reciveTask = task;
	// 执行接收邮件
	mailReciveService.recivePOP3Message(cfgId, function() {
				if (!window.isDestroyed)
					window.close();
			});
}
QH.mail.ReciveMailUpdateClock = function(reciveCfgId, window) {
	mailReciveService.getReadingMailInfo(reciveCfgId, function(mail) {
		if (mail && !window.reciveIsStop) {
			var tpl = new Ext.XTemplate('<table width="330" style="font-size:11">'
							+ '<tr>'
							+ '<td>'
							+ '正接收邮件大小：<b>'
							+ QH.mail.sizeRenderer(mail.size)
							+ '</b>'
							+ '</td>'
							+ '<td align="right">'
							+ '共：<b>{total}</b>，还剩：<b>'
							+ (mail.total - mail.index)
							+ '</b>'
							+ '</td>'
							+ '</tr>'
							+ '<tr>'
							+ '<td colspan="2">'
							+ "发件人：<b>"
							+ mail.sender.name
							+ '&lt;'
							+ mail.sender.emailUrl
							+ '&gt;'
							+ '</b>'
							+ '</td>'
							+ '</tr>'
							+ '<tr>'
							+ '<td colspan="2">'
							+ '主　题：<b>{subject}</b>'
							+ '</td>' + '</tr>' + '</table>');
			window.accountNode
					.setText(window.accountNode.oldText
							+ '<font color="#888888">&nbsp;共：<b>' + mail.total
							+ '</b>，还剩：<b>' + (mail.total - mail.index)
							+ '</b></font>');
			tpl.overwrite(window.recivePanle.body, mail);
		}
	});
}
/**
 * 移动邮件到废件箱
 */
QH.mail.MoveMailToDelFn = function() {
	var grid = QH_VIEWPORT.getMainView().mailGrid; // 主Grid
	// 获得选中ID
	var ids = grid.getSelectionIds();
	// 获得删除节点
	var selNode = QH_VIEWPORT.getMainView().mailTree.getSelectionModel()
			.getSelectedNode(); // 初选中的节点
	QH_LOADMASK = new Ext.LoadMask(grid.getEl(), {
				msg : '正在删除邮件。。。'
			});
	QH_LOADMASK.show();
	mailTreeService.moveMailToDel(selNode.attributes.accountCfgId.id, ids,
			function(result) {
				QH_LOADMASK.hide();
				grid.getStore().reload();
			});
}
/**
 * 彻底删除邮件
 */
QH.mail.DeleteMailFn = function() {
	var grid = QH_VIEWPORT.getMainView().mailGrid; // 主Grid
	// 获得选中ID
	var ids = grid.getSelectionIds();
	// 获得删除节点
	var delNode = QH_VIEWPORT.getMainView().mailTree
			.getBaseNode(MAIL_NODE_TYPE.D);
	var isSending = false; // 判断是否正在发送
	var records = grid.getSelectionModel().getSelections();
	var mailStatus;
	Ext.each(records, function(record) {
				mailStatus = record.get('mailStatus');
				if (record.get('mailType') == MAIL_NODE_TYPE.SENDING) {
					isSending = true;
					return false;
				}
			});
	Ext.Msg.show({
				buttons : Ext.Msg.YESNO,
				icon : isSending ? Ext.Msg.WARNING : Ext.Msg.INFO,
				title : '系统提示',
				msg : isSending ? '可能存在正在发送的邮件，如果彻底删除，则不发送' : '确认彻底删除?',
				fn : function(btnId) {
					if (btnId == 'yes') {
						QH_LOADMASK = new Ext.LoadMask(grid.getEl(), {
									msg : '正在彻底删除邮件。。。'
								});
						QH_LOADMASK.show();
						mailUpdateService.deleteMails(ids, function() {
									QH_LOADMASK.hide();
									// 删除成功则重新加载
									Ext.example.msg('系统提示', "彻底删除成功", grid
													.getEl());
									grid.store.reload();
								});
					}
				}
			});
}
QH.mail.doRelateFn = function() {
	var win = new Ext.Window({
		title : '关联订单',
		layout : 'form',
		width : 260,
		closeAction : 'close',
		items : [{
			xtype : 'form',
			id : 'relateForm',
			labelAlign : 'right',
			frame : true,
			labelWidth : 70,
			width : 250,
			buttonAlign : 'center',
			fbar : [{
				text : '保存',
				handler : function() {
					var form = Ext.getCmp("relateForm").getForm();
					var obj = form.getValues();
					var grid = QH_VIEWPORT.getMainView().mailGrid;
					var selIds = grid.getSelectionIds();
					if (!form.isValid())
						return;
					QH_LOADMASK = new Ext.LoadMask(grid.getEl(), {
								msg : '正在关联邮件。。。'
							});
					QH_LOADMASK.show();
					mailUpdateService.relateOrder(selIds, Ext.encode(obj),
							function() {
								QH_LOADMASK.hide();
								// _self.hidden = true;
								grid.getStore().reload();
								window.alertMsg("关联完成");
								win.close();
								// 关联完成后，刷新一下当前选中节点的父亲节点
								var tree = QH_VIEWPORT.getMainView().statisticsTree;
								var node = tree.getSelectionModel()
										.getSelectedNode();
								if (node) {
									var treeLv = node.attributes.treeLv;
									tree.getLoader().load(node);
									// if(treeLv == 2){
									// tree.getLoader().load(node);
									// }
								}
							});
				}
			}],
			defaults : {
				width : 170,
				allowBlank : false
			},
			items : [{
						xtype : 'customerbasecombo',
						name : "customerId",
						hiddenName : "customerId",
						width : 100,
						id : 'relate_custcombo',
						fieldLabel : "客户"
					}, {
						xtype : 'customerbasecombo',
						dataUrl : "commoncombo.do",
						name : "consignCustId",
						hiddenName : "consignCustId",
						width : 100,
						id : 'relate_consigncombo',
						fieldLabel : "委托客户"
					}, {
						xtype : 'ordernocombo',
						id : 'relate_orderNo',
						allowBlank : false,
						needReset : false,
						parentCombo : 'relate_custcombo',
						parentComboWith : 'custId',
						listeners : {
							'select' : function(combo, record, index) {
								var form = Ext.getCmp("relateForm").getForm();
								form.setValues({
											orderPol : record.get('pol'),
											orderPod : record.get('pod'),
											orderRemark : record.get('remark'),
											orderAirRemark : record
													.get('airRemark')
										});
								var trackStatus = Ext
										.getCmp('relate_trackStatus');
								trackStatus
										.bindValue(record.get('trackStatus'));
							}
						}
					}, {
						xtype : 'commontypebasecombo',
						queryParams : {
							flag : 'wlzt'
						},
						fieldLabel : '状态',
						editable : false,
						allowBlank : false,
						noBlankColor : true,
						name : 'trackStatus',
						id : 'relate_trackStatus',
						hiddenName : 'trackStatus'
					}, {
						xtype : 'textfield',
						fieldLabel : '海运备注',
						allowBlank : true,
						name : "orderRemark",
						id : 'relate_orderRemark'
					}, {
						xtype : 'textfield',
						fieldLabel : '空运备注',
						allowBlank : true,
						name : "orderAirRemark",
						id : 'relate_orderAirRemark'
					}, {
						xtype : 'textfield',
						fieldLabel : '起运港',
						allowBlank : true,
						name : "orderPol",
						id : 'relate_orderPol'
					}, {
						xtype : 'textfield',
						fieldLabel : '目的港',
						allowBlank : true,
						name : "orderPod",
						id : 'relate_orderPod'
					}]
		}],
		listeners : {
			'afterrender' : {
				fn : function() {
					var form = Ext.getCmp("relateForm").getForm();
					var tree = QH_VIEWPORT.getMainView().statisticsTree;
					var node = tree.getSelectionModel().getSelectedNode();
					var grid = QH_VIEWPORT.getMainView().mailGrid; // 主Grid
					var rec = grid.getSelectionModel().getSelected();
					if (node != null) {
						var treeLvId = Ext.decode(node.attributes.treeLvId);
						if (treeLvId.cust) {
							var custcombo = Ext.getCmp('relate_custcombo');
							custcombo.bindValue(treeLvId.cust);
						}
					}
					// 绑定选中的客户订单信息
					if (rec) {
						if (rec.get('custId')) {
							var custcombo = Ext.getCmp('relate_custcombo');
							custcombo.bindValue(rec.get('custId').id);
						}
						if (rec.get('consignCustId')) {
							var custcombo = Ext.getCmp('relate_consigncombo');
							custcombo.bindValue(rec.get('consignCustId').id);
						}
						if (rec.get('orderNo')) {
							var orderNo = Ext.getCmp('relate_orderNo');
							orderNo.setRawValue(rec.get('orderNo'));
							orderNo.setValue(rec.get('orderNo'));
						}
						if (rec.get('orderRemark') != 'null') {
							var orderRemark = Ext.getCmp('relate_orderRemark');
							orderRemark.setValue(rec.get('orderRemark'));
						}
						if (rec.get('orderAirRemark') != 'null') {
							var orderRemark = Ext
									.getCmp('relate_orderAirRemark');
							orderRemark.setValue(rec.get('orderAirRemark'));
						}
						if (rec.get('trackStatus')) {
							var trackStatus = Ext.getCmp('relate_trackStatus');
							trackStatus.bindValue(rec.get('trackStatus').id);
						}
						if (rec.get('orderPol')) {
							var pol = Ext.getCmp('relate_orderPol');
							pol.setValue(rec.get('orderPol'));
						}
						if (rec.get('orderPod')) {
							var pod = Ext.getCmp('relate_orderPod');
							pod.setValue(rec.get('orderPod'));
						}
					}
				},
				scope : this
			}
		}

	});
	win.show();
}
QH.mail.showDealingMail = function() {
	var panel = QH_VIEWPORT.getMainView().dealingsPanel; // 主Grid
	QH_VIEWPORT.getMainView().dealingsPanel.dealingsContorl();
	if (panel.collapsed)
		panel.expand();
	else
		panel.collapse();
}
// 显示黑名单
QH.mail.showBlackMail = function() {
	var node = QH_VIEWPORT.getMainView().mailTree.getSelectionModel()
			.getSelectedNode();
	var accountId = node.attributes.accountCfgId.id;
	var mailAccount = node.attributes.accountCfgId.mailAccount;
	// 查找该账户的黑名单信息
	mailUpdateService.findCotMailGarbageCfgByAccountId(accountId,
			function(res) {
				var filterAccount='';
				var filterServer='';
				var cfgId=null;
				if (res != null) {
					cfgId=res.id;
					var filter = Ext.decode(res.filter);
					filterAccount=filter.ACCOUNT;
					filterServer=filter.ACCOUNT_SERVER;
				}
				var win = new QH.Window({
					width : 500,
					height : 400,
					title : '邮件黑名单',
					frame : true,
					layout : 'fit',
					buttonAlign : 'center',
					buttons : [{
								text : '保存',
								scale : 'large',
								iconCls : "page_table_save",
								handler : function() {
									var cfg=new CotMailGarbageCfg();
									cfg.id=cfgId;
									cfg.accountId=accountId;
									var obj={};
									obj.ACCOUNT=win.filterAccount.getValue();
									obj.ACCOUNT_SERVER=win.filterServer.getValue();
									cfg.filter=Ext.encode(obj);
									mask();
									baseSerivce.saveOrUpdateObjRId([cfg],function(result){
										unmask();
										win.close();
										alertMsg('保存成功!');
									})
								}
							}, {
								text : '取消',
								scale : 'large',
								iconCls : "page_cancel",
								handler : function() {
									win.close();
								}
							}],
					items : [{
						xtype : 'form',
						frame : true,
						labelAlign : 'right',
						labelWidth : 110,
						items : [{
									xtype : 'textfield',
									fieldLabel : '邮件帐号',
									disabled : true,
									disabledClass : 'combo-disabled',
									value:mailAccount,
									anchor : '100%'
								}, {
									xtype : 'panel',
									height : 10,
									html : '&nbsp;'
								}, {
									xtype : 'panel',
									height : 30,
									html : '<span style="margin-left:110px;"><font color=blue>待过滤的邮件帐号和服务器如果有多个,请用英文";"隔开</font></span>'
								}, {
									xtype : 'textarea',
									fieldLabel : '待过滤邮件帐号',
									height : 90,
									emptyText:'格式:例如aaa@qq.com;',
									value:filterAccount,
									ref:'../filterAccount',
									anchor : '100%'
								}, {
									xtype : 'textarea',
									fieldLabel : '待过滤邮件服务器',
									height : 110,
									emptyText:'格式:例如163@com;',
									value:filterServer,
									ref:'../filterServer',
									anchor : '100%'
								}]
					}]
				});
				win.show();
			})
}