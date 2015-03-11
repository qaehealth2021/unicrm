/**
 * 添加账号向导card面板
 * @class QH.mailAccountCfg.AddCardPanel
 * @extends Ext.Panel
 */
QH.mailAccountCfg.AddCardPanel =  Ext.extend(Ext.Panel,{
	layout:'card',
	activeItem:0,
	defaults:{
		border:false
	},
	frame : true,
	buttonAlign:'right',
	mailBoxType:'E',
	accountCfg:'',
	initComponent:function(){
		this.items = [{
			xtype:'form',
			labelWidth : 60,
			labelAlign : "right",
			ref:'startPanel',
			items:[{
				xtype:'panel',
				html:'<div style="padding-bottom:10px;font-weight:bold;">设置所属员工邮箱账号，单击"下一步"自动识别邮箱配置</div><hr>'
			},{
				xtype:'empbasecombo',
				fieldLabel:'所属员工',
				noBlankColor:true,
				allowBlank:false
			},{
				xtype:'fieldset',
				title:'账号密码',
				items:[{
					xtype:'textfield',
					fieldLabel:'邮箱账号',
					anchor : "100%",
					name:'mailAccount',
					regex:getEmailOrNullRegex(),
					regexText:'邮箱账号必须是电子邮件地址，格式如： "account@mail.com"',
					maxLength:100,
					noBlankColor:true,
					blankText:'请输入邮箱账号',
					allowBlank:false
				},{
					xtype:'label',
					html:'<div style="text-align:center;padding-bottom:5px;">示例：account@mail.com</div>'
				},{
					xtype:'textfield',
					fieldLabel:'密码',
					anchor : "100%",
					name:'mailPwd',
					inputType : "password",
					blankText : "请输入密码",
					maxLength:20,
					noBlankColor:true,
					allowBlank:false
				}]
			},{
				xtype:'hidden',
				name:'mailBoxType',
				value:this.mailBoxType
			}]
		},{
			xtype:'form',
			labelWidth : 143,
			labelAlign : "right",
			ref:'detailPanel',
			items:[{
				xtype:'panel',
				html:'<div style="padding-bottom:10px;font-weight:bold;">服务器配置</div><hr>'
			},{
				xtype:'label',
				html:'<div style="padding-left:5px;padding-bottom:5px;font-weight:bold;">登录信息</div>'
			},{
				layout:'column',
				items:[{
					columnWidth:.6,
					layout:'form',
					labelWidth : 59,
					labelAlign : "right",
					items:[{
						xtype:'textfield',
						fieldLabel:'邮箱账号',
						anchor : "100%",
						name:'mailAccount',
						regex:getEmailOrNullRegex(),
						regexText:'邮箱账号必须是电子邮件地址，格式如： "account@mail.com"',
						maxLength:100,
						noBlankColor:true,
						blankText:'请输入邮箱账号',
						allowBlank:false
					}]
				},{
					columnWidth:.4,
					layout:'form',
					labelWidth : 38,
					labelAlign : "right",
					items:[{
						xtype:'textfield',
						fieldLabel:'密码',
						anchor : "100%",
						name:'mailPwd',
						inputType : "password",
						blankText : "请输入密码",
						maxLength:20,
						noBlankColor:true,
						allowBlank:false
					}]
				}]
			},{
				xtype:'label',
				html:'<div style="padding-left:5px;padding-bottom:5px;font-weight:bold;">服务器信息</div>'
			},{
				xtype:'textfield',
				fieldLabel:'接收邮件服务器（POP3）',
				anchor : "100%",
				name:'pop3Cfg.pop3Host',
				maxLength:20,
				noBlankColor:true,
				blankText:'请输入接收邮件服务器地址',
				allowBlank:false
			},{
				xtype:'textfield',
				fieldLabel:'发送邮件服务器（SMTP）',
				anchor : "100%",
				name:'smtpCfg.smtpHost',
				maxLength:20,
				noBlankColor:true,
				blankText:'请输入发送邮件服务器地址',
				allowBlank:false
			},{
				layout:'column',
				items:[{
					columnWidth:1,
					html:'<div style="padding-left:11px;">&nbsp;</div>'
				},{
					xtype:'button',
					text:'高级',
					width:60,
					scope:this,
					handler:function(btn){
						// 显示高级设置窗口
						var detailWindow = new QH.mailAccountCfg.DetailWindow();
						detailWindow.show();
						detailWindow.loadValue(this.accountCfg);
					}
				}]
			}]
		},{
			
			layout:'form',
			ref:'infoPanel',
			items:[{
				html:'<div style="padding-bottom:10px;font-weight:bold;">设置完成</div><hr>'
			},{
				tplProp:'empId',
				tpl:'<div style="padding-left:11px;">所属员工：{empsId}</div>'
			},{
				layout:'column',
				items:[{
					columnWidth:1,
					tpl:'<div style="padding-left:11px;">账号：{mailAccount}</div>'
				},{
					xtype:'button',
					text:'修改配置',
					width:60,
					scope:this,
					handler:function(btn){
						if(!this.showDetailPanle){//点击上一步，跳到第二步，明细配置
							this.showDetailPanle = true;
							this.detailPanel.getForm().setValues(this.accountCfg);
						}
						this.refOwner.nextBtn.setText("下一步");
						this.activeItem = 1;
						this.layout.setActiveItem(this.activeItem);
					}
				},{
					xtype:'label',
					html:'&nbsp;'
				},{
					xtype:'button',
					width:60,
					text:'测试',
					scope:this,
					handler:function(){
						QH_LOADMASK = new Ext.LoadMask(this.refOwner.getEl(), {msg : '测试连接。。。'});
						QH_LOADMASK.show();
						mailAccountCfgService.connTest(this.accountCfg, function(res) {
							QH_LOADMASK.hide();
							if(res){
								Ext.Msg.show({
									title:'测试连接',
									icon:Ext.Msg.ERROR,
									msg:res,
									buttons:Ext.Msg.OK
								});
							}else{
								Ext.Msg.show({
									title:'测试连接',
									icon:Ext.Msg.INFO,
									msg:'测试连接成功',
									buttons:Ext.Msg.OK
								});
							}
						});
					}
				}]
			},{
				layout:'column',
				items:[{
					columnWidth:.5,
					layout:'form',
					style:'margin-right:2px;',
					items:[{
						xtype:'fieldset',
						defaultType:'label',
						title:'接收邮件服务器',
						tplProp:'pop3Cfg',
						tpl:'服务器：{pop3Host}<br/>' +
							'端口：{pop3Port}<br/>' +
							'<tpl if="pop3Ssl == true">安全：SSL</tpl>'
					}]
				},{
					columnWidth:.5,
					layout:'form',
					items:[{
						xtype:'fieldset',
						defaultType:'label',
						title:'发送邮件服务器',
						tplProp:'smtpCfg',
						tpl:'服务器：{smtpHost}<br/>' +
							'端口：{smtpPort}<br/>' +
							'<tpl if="smtpSsl == true">安全：SSL</tpl>'+
							'<tpl if="smtpTls == true">使用STARTTLS加密传输</tpl>'
					}]
				}]
			}]
		}];
		QH.mailAccountCfg.AddCardPanel.superclass.initComponent.call(this);
	}
});

Ext.reg('mailaccountcfgaddcard',QH.mailAccountCfg.AddCardPanel);
/**
 * 添加账号向导窗口
 * @class QH.mailAccountCfg.AddCardWindow
 * @extends QH.Window
 */
QH.mailAccountCfg.AddCardWindow = Ext.extend(QH.Window,{
	layout:'fit',
	title:'添加个人邮箱账号向导',
	width:410,
	height:260,
	closeAction:'hide',
	border:false,
	initComponent:function(){
		this.items = [{
			xtype:'mailaccountcfgaddcard',
			ref:'addCardPanel'
		}];
		this.buttons = [{
			text:'上一步',
			width:60,
			disabled:true,
			ref:'../upBtn',
			scope:this,
			handler:this.transformCardItem
		},{
			text:'下一步',
			width:60,
			ref:'../nextBtn',
			scope:this,
			handler:this.transformCardItem
		},{
			text:'取消',
			ref:'../cancle',
			width:60,
			scope:this,
			handler:function(btn){
				this.hide();
			}
		}]
		QH.mailAccountCfg.AddCardWindow.superclass.initComponent.call(this);
		this.on('hide',function(win){
			win.clearValue();
		});
	},
	/**
	 * 清空值，回复到初始状态
	 */
	clearValue : function(){
		var addCardPanel = this.addCardPanel;
		addCardPanel.startPanel.getForm().reset();
		addCardPanel.startPanel.getForm().clearInvalid();
		addCardPanel.detailPanel.getForm().reset();
		this.upBtn.disable();
		this.nextBtn.setText("下一步");
		addCardPanel.activeItem = 0;
		addCardPanel.layout.setActiveItem(addCardPanel.activeItem);
		delete addCardPanel.accountCfg;
	},
	/**
	 * 切换面板并处理
	 * @param {} btn
	 */
	transformCardItem:function(btn){
		var addCardPanel = this.addCardPanel;
		var startForm = addCardPanel.startPanel.getForm();
		var detailForm = addCardPanel.detailPanel.getForm();
		if(addCardPanel.activeItem == 0){// 当前在第一步，设置账号密码
			if(!startForm.isValid())// 未通过验证
				return ;
			// 获得输入信息
			var accountCfg = startForm.getValues();
			// 获得员工名称
			var empField = startForm.findField('empId');
			accountCfg.empId = {
				id:empField.getValue(),
				empsId:empField.getRawValue()
			}
			// 获得账号
			var account = accountCfg.mailAccount;
			// 已存在，并未修改账号密码，则直接显示下一步
			if(addCardPanel.accountCfg 
				&& addCardPanel.accountCfg.mailAccount == account
				&& addCardPanel.accountCfg.mailPwd == accountCfg.mailPwd){
				if(addCardPanel.showDetailPanle){
					this.upBtn.enable();
					this.nextBtn.setText("下一步");
					addCardPanel.activeItem = 1;
				}else{
					this.upBtn.enable();
					this.nextBtn.setText("完成");
					addCardPanel.activeItem = 2;
				}
			}else{
				addCardPanel.accountCfg =  accountCfg;
				// 获得账号类型
				var accountType = account.substring(account.indexOf('@')+1);
				// 获得默认配置
				var defaultCfg = DEFAULT_ACCOUNT_CFG[accountType];
				if(defaultCfg){// 有默认配置，直接到最后一步
					// 标记detailPanel，是否显示过
					addCardPanel.showDetailPanle = false;
					Ext.applyIf(addCardPanel.accountCfg,defaultCfg);
					addCardPanel.accountCfg.pop3Cfg.pop3Account = account; // 设置连接账号
					this.tplOrerWrite(addCardPanel.infoPanel.items.items);
					this.upBtn.enable();
					this.nextBtn.setText("完成");
					addCardPanel.activeItem = 2;
				}else{// 没有，则再配置
					addCardPanel.showDetailPanle = true;
					Ext.apply(addCardPanel.accountCfg,{
						pop3Cfg:Ext.apply({pop3Host:'pop.' + accountType},DEFAULT_ACCOUNT_CFG.pop3Cfg),
						smtpCfg:Ext.apply({smtpHost:'smtp.' + accountType},DEFAULT_ACCOUNT_CFG.smtpCfg)
					})
					detailForm.setValues(addCardPanel.accountCfg);
					this.upBtn.enable();
					this.nextBtn.setText("下一步");
					addCardPanel.activeItem = 1;
				}
			}
			
		}else if(addCardPanel.activeItem == 1){// 第二步，设置配置明细
			var detailCfg = detailForm.getFieldValues();
			Ext.apply(addCardPanel.accountCfg,{
				mailAccount:detailCfg.mailAccount,
				mailPwd:detailCfg.mailPwd
			});
			if(btn == this.nextBtn){// 点击下一步
				Ext.apply(addCardPanel.accountCfg.pop3Cfg,detailCfg.pop3Cfg);
				Ext.apply(addCardPanel.accountCfg.smtpCfg,detailCfg.smtpCfg);
				addCardPanel.accountCfg.pop3Cfg.pop3Account = detailCfg.mailAccount; // 设置连接账号
				
				this.tplOrerWrite(addCardPanel.infoPanel.items.items);
				this.upBtn.enable();
				this.nextBtn.setText("完成");
				addCardPanel.activeItem = 2;
			}else{	//点击上一步，跳到第一步，账号密码配置
				startForm.setValues(addCardPanel.accountCfg);
				
				this.upBtn.disable();
				this.nextBtn.setText("下一步");
				addCardPanel.activeItem = 0;
			}
		}else{// 最后一步，显示配置信息
			if(btn == this.nextBtn){// 点击完成
				this.saveData();
			}else if(addCardPanel.showDetailPanle){//点击上一步，跳到第二步，明细配置
				this.nextBtn.setText("下一步");
				addCardPanel.activeItem = 1;
			}else{// 点击上一步
				this.upBtn.disable();
				this.nextBtn.setText("下一步");
				addCardPanel.activeItem = 0;
			}
		}
		addCardPanel.layout.setActiveItem(addCardPanel.activeItem);
	},
	/**
	 * 根据数据及tpl属性更新面板
	 * @param {} items
	 */
	tplOrerWrite:function(items){
		Ext.each(items,function(item){
			if(item.tpl){	// 存在tpl
				if(item.tplProp)	// 取账号配置的属性对象
					item.tpl.overwrite(item.body,this.addCardPanel.accountCfg[item.tplProp]);
				else	// 取账号配置对象
					item.tpl.overwrite(item.body,this.addCardPanel.accountCfg);
			}
			if(item.items)	// 如果包含子项，则递归
				this.tplOrerWrite(item.items.items);
		},this);
	},
	/**
	 * 保存数据
	 */
	saveData : function(){
		var formPanel = this.addCardPanel;
		formPanel.accountCfg.autoReceiveTime = 30; // 自动接收默认30分钟
		formPanel.accountCfg.mailBackDay = -1; // 保留副本
		QH_LOADMASK = new Ext.LoadMask(this.getEl(), {msg : '数据保存中'});
		QH_LOADMASK.show();
		mailAccountCfgService.saveAccountCfg(formPanel.accountCfg, function(res) {
			QH_LOADMASK.hide();
			formPanel.refOwner.hide();
			QH_VIEWPORT.gridPanel.getStore().reload();
		});
	}
});
/**
 * 账号配置高级面板
 * @class QH.mailAccountCfg.DetailPanel
 * @extends Ext.form.FormPanel
 */
QH.mailAccountCfg.DetailPanel = Ext.extend(Ext.form.FormPanel,{
	layout:'fit',
	buttonAlign:'right',
	labelWidth:1,
	initComponent:function(){
		
		this.items = [{
			xtype:'tabpanel',
			activeTab:0,
			border:false,
			items:[{
				title:'服务器端口',
				layout:'form',
				labelWidth:140,
				frame:true,
				border:false,
				items:[{
					xtype:"numberfield",
					fieldLabel:"接收服务器端口（POP3）",
					allowBlank:false,
					name:"pop3Cfg.pop3Port",
					maxValue:999,
					minValue:0,
					value:110,
					width:40
				},{
					layout:'form',
					labelWidth:20,
					items:[{
						xtype:'checkbox',
						boxLabel:'接收服务器要求加密连接（SSL）',
						name:'pop3Cfg.pop3Ssl',
						anchor:'100%',
						listeners:{
							scope:this,
							check:function(checkbox,checked){
								// 勾选切换时，设置端口默认值
								var pop3Port = this.getForm().findField('pop3Cfg.pop3Port');
								if(!checked)
									pop3Port.setValue(110);
								else
									pop3Port.setValue(995);
							}
						}
					}]
				},{
					xtype:"numberfield",
					fieldLabel:"发送服务器端口（SMTP）",
					allowBlank:false,
					name:"smtpCfg.smtpPort",
					maxValue:999,
					minValue:0,
					value:25,
					width:40
				},{
					layout:'form',
					labelWidth:20,
					items:[{
						xtype:'checkbox',
						boxLabel:'使用SSL加密连接发送服务器',
						name:'smtpCfg.smtpSsl',
						anchor:'100%',
						listeners:{
							scope:this,
							check:function(checkbox,checked){
								// 勾选切换时，设置端口默认值
								var smtpPort = this.getForm().findField('smtpCfg.smtpPort');												
								if(!checked)
									smtpPort.setValue(25);
								else{	// 当SSL选中时，TLS不选
									var smtpTls = this.getForm().findField('smtpCfg.smtpTls');
									smtpTls.setValue(false);
									smtpPort.setValue(465);
								}
							}
						}
					},{
						xtype:'checkbox',
						boxLabel:'使用STARTTLS加密连接发送服务器',
						name:'smtpCfg.smtpTls',
						anchor:'100%',
						listeners:{
							scope:this,
							check:function(checkbox,checked){
								var smtpPort = this.getForm().findField('smtpCfg.smtpPort');												
								if(checked){	// 当TLS选中时，不选SSL，及端口设置为25
									var smtpSsl = this.getForm().findField('smtpCfg.smtpSsl');
									smtpSsl.setValue(false);
									smtpPort.setValue(25);
								}
							}
						}
					}]
				}]
			},{
				title:'发送验证',
				layout:'form',
				frame:true,
				items:[{
					xtype:'checkbox',
					boxLabel:'发送服务器需要身份验证',
					name:'smtpCfg.smtpAuth',
					checked:true,
					anchor:'100%'
				},{
					xtype:"radio",
					boxLabel:"使用与接收服务器相同的设置",
					anchor:'100%',
					name:"defaultAuth",
					checked:true
				},{
					xtype:"radio",
					name:"defaultAuth",
					boxLabel:"验证信息",
					listeners:{
						scope:this,
						check:function(checkbox,checked){
							// 如果验证信息选中，则账号密码验证配置可用，否则不可用
							var smtpAuthAccount = this.getForm().findField('smtpCfg.smtpAuthAccount');
							var smtpAuthPwd = this.getForm().findField('smtpCfg.smtpAuthPwd');
							smtpAuthAccount.setDisabled(!checked);
							smtpAuthPwd.setDisabled(!checked);
						}
					}
				},{
					layout:'form',
					labelWidth:60,
					labelAlign:'right',
					items:[{
						xtype:'textfield',
						fieldLabel:'账号',
						anchor : "100%",
						name:'smtpCfg.smtpAuthAccount',
						maxLength:100,
						disabled:true,
						blankText:'请输入账号',
						allowBlank:false
					},{
						xtype:'textfield',
						fieldLabel:'密码',
						anchor : "100%",
						disabled:true,
						name:'smtpCfg.smtpAuthPwd',
						inputType : "password",
						blankText : "请输入密码",
						maxLength:20,
						allowBlank:false
					}]
				}]
			}]
		}];
		
		QH.mailAccountCfg.DetailPanel.superclass.initComponent.call(this);
	}
});
Ext.reg('mailaccountcfgdetailpanel',QH.mailAccountCfg.DetailPanel);
/**
 * 高级设置
 * @class QH.mailAccountCfg.DetailWindow
 * @extends QH.Window
 */
QH.mailAccountCfg.DetailWindow = Ext.extend(QH.Window,{
	layout:'fit',
	title:'高级设置',
	width:410,
	height:260,
	closeAction:'hide',
	border:false,
	accountCfg:'',
	initComponent:function(){
		this.items = [{
			xtype:'mailaccountcfgdetailpanel',
			ref:'detailPanel'
		}];
		this.buttons = [{
			text:'确定',
			width:60,
			scope:this,
			handler:function(){
				var cfg = this.detailPanel.getForm().getFieldValues();
				if(cfg.defaultAuth[0]){ // 没有设置另外的SMTP验证账号，则默认都设置为NULL
					cfg.smtpCfg.smtpAuthAccount = null;
					cfg.smtpCfg.smtpAuthPwd = null;
				}
				Ext.apply(this.accountCfg,{pop3Cfg:cfg.pop3Cfg});
				Ext.apply(this.accountCfg,{smtpCfg:cfg.smtpCfg});
				this.close();
			}
		},{
			text:'取消',
			width:60,
			scope:this,
			handler:function(){
				this.close();
			}
		}]
		QH.mailAccountCfg.DetailWindow.superclass.initComponent.call(this);
	},
	/**
	 * 加载账号配置
	 * @param {} accountCfg
	 */
	loadValue:function(accountCfg){
		this.accountCfg = accountCfg;
		this.detailPanel.getForm().setValues(accountCfg);
	}
});
