
/**
 * 修改账号配置面板
 * @class QH.mailAccountCfg.UpdatePanel
 * @extends Ext.form.FormPanel
 */
QH.mailAccountCfg.UpdatePanel = Ext.extend(Ext.form.FormPanel,{
	layout:'fit',
	labelAlign:'right',
	initComponent:function(){
		
		this.items = [{
			xtype:'tabpanel',
			activeTab:0,
			border:false,
			items:[{
				title:'常规',
				layout:'form',
				labelWidth:60,
				frame:true,
				items:[{
					xtype:'hidden',
					name:'id'
				},{
					xtype:'hidden',
					name:'pop3Cfg.id'
				},{
					xtype:'hidden',
					name:'smtpCfg.id'
				},{
					xtype:'empbasecombo',
					fieldLabel:'所属员工',
					noBlankColor:true,
					allowBlank:false,
					name:'empId.id'
				},{
					xtype:'textfield',
					fieldLabel:'账号名称',
					anchor : "100%",
					name:'mailNickname',
					maxLength:100
				},{
					xtype:'textfield',
					fieldLabel:'E-mail',
					anchor : "100%",
					name:'mailAccount',
					regex:getEmailOrNullRegex(),
					regexText:'格式如： "account@mail.com"',
					maxLength:100,
					blankText:'请输入E-mail',
					allowBlank:false
				},{
					xtype:'textfield',
					fieldLabel:'发件人名',
					anchor : "100%",
					name:'mailSendName',
					maxLength:50
				}]
			},{
				title:'服务器',
				layout:'form',
				labelWidth:107,
				frame:true,
				items:[{
					layout:'form',
					labelWidth:60,
					items:[{
						xtype:'textfield',
						fieldLabel:'POP3账号',
						anchor : "100%",
						name:'pop3Cfg.pop3Account',
						regex:getEmailOrNullRegex(),
						regexText:'POP3账号必须是电子邮件地址，格式如： "account@mail.com"',
						maxLength:100,
						noBlankColor:true,
						blankText:'请输入POP3账号',
						allowBlank:false
					},{
						xtype:'textfield',
						fieldLabel:'POP3密码',
						anchor : "100%",
						name:'mailPwd',
						inputType : "password",
						blankText : "请输入POP3密码",
						maxLength:20,
						allowBlank:false
					}]
				},{
					xtype:'textfield',
					fieldLabel:'接收邮件（POP3）',
					anchor : "100%",
					name:'pop3Cfg.pop3Host',
					maxLength:20,
					noBlankColor:true,
					blankText:'请输入接收邮件地址',
					allowBlank:false
				},{
					xtype:'textfield',
					fieldLabel:'发送邮件（SMTP）',
					anchor : "100%",
					name:'smtpCfg.smtpHost',
					maxLength:20,
					noBlankColor:true,
					blankText:'请输入发送邮件地址',
					allowBlank:false
				},{
					xtype:"numberfield",
					hidden:true,
					//fieldLabel:'自动接收时间(分)',
					width:60,
					allowBlank:false,
					value:30,
					minValue:20,
					maxValue:99,
					name:"autoReceiveTime"
				}]
			},{
				title:'服务器端口',
				layout:'form',
				labelWidth:145,
				frame:true,
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
								var smtpPort = this.getForm().findField('smtpCfg.smtpPort');												
								if(!checked)
									smtpPort.setValue(25);
								else{
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
								if(checked){
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
				labelWidth:1,
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
					id:'smtpAuthRadio',
					listeners:{
						'check':{
							fn:function(checkbox,checked){
								var smtpAuthAccount = this.getForm().findField('smtpCfg.smtpAuthAccount');
								var smtpAuthPwd = this.getForm().findField('smtpCfg.smtpAuthPwd');
								smtpAuthAccount.setDisabled(!checked);
								smtpAuthPwd.setDisabled(!checked);
							},
							scope:this
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
						disabled:true
					},{
						xtype:'textfield',
						fieldLabel:'密码',
						anchor : "100%",
						disabled:true,
						name:'smtpCfg.smtpAuthPwd',
						inputType : "password",
						maxLength:20
					}]
				}]
			},{
				title:'保留备份',
				layout:'form',
				labelWidth:10,
				frame:true,
				items:[{
					xtype:'label',
					text:'是否在服务器上保留邮件备份'
				},{
					xtype:"radio",
					boxLabel:"保留全部邮件备份",
					anchor:'100%',
					name:"mailBackDayRadio",
					id:'backDayAllRadio',
					inputValue:-1
				},{
					layout:'column',
					style:'margin-bottom:5px;',
					hidden:false,
					items:[{
						columnWidth:.25,
						xtype:"radio",
						style:'margin-left:15px;',
						boxLabel:"收取邮件",
						anchor:'100%',
						name:"mailBackDayRadio",
						id:'backDayRadio',
						inputValue:7,
						listeners:{
							'check':{
								fn:function(checkbox,checked){
									var mailBackDayField = this.getForm().findField('mailBackDayField')
									mailBackDayField.setDisabled(!checked);
								},
								scope:this
							}
						}
					},{
						columnWidth:.15,
						xtype:'numberfield',
						anchor:'100%',
						disabled:true,
						minValue:1,
						value:7,
						allowBlank:false,
						name:'mailBackDayField'
					},{
						columnWidth:.6,
						xtype:'label',
						style:'padding-top:5px;',
						text:'天后删除'
					}]
				},{
					xtype:"radio",
					hidden:true,
					boxLabel:"不保留邮件备份",
					id:'backDayNoRadio',
					anchor:'100%',
					inputValue:-1,
					name:"mailBackDayRadio"
				}]
			}]
		}];
		
		QH.mailAccountCfg.UpdatePanel.superclass.initComponent.call(this);
	}
});
Ext.reg('mailaccountcfgupdatetabpanel',QH.mailAccountCfg.UpdatePanel);
/**
 * 修改账号配置窗口
 * @class QH.mailAccountCfg.UpdateWindow
 * @extends QH.Window
 */
QH.mailAccountCfg.UpdateWindow = Ext.extend(QH.Window,{
	layout:'fit',
	title:'账号配置',
	width:350,
	height:240,
	closeAction:'hide',
	border:false,
	initComponent:function(){
		
		this.items = [{
			xtype:'mailaccountcfgupdatetabpanel',
			ref:'formPanel'
		}];
		
		this.buttons = [{
			text:'测试',
			width:60,
			scope:this,
			handler:function(){
				var form = this.formPanel.getForm();
				if(!form.isValid())
					return;
				var accountCfg = this.getValue();
				QH_LOADMASK = new Ext.LoadMask(this.getEl(), {msg : '测试连接。。。'});
				QH_LOADMASK.show();
				mailAccountCfgService.connTest(accountCfg, function(res) {
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
		},{
			text:'保存',
			width:60,
			scope:this,
			handler:this.saveData
		},{
			text:'取消',
			width:60,
			scope:this,
			handler:function(){
				this.hide();
			}
		}]
		
		QH.mailAccountCfg.UpdateWindow.superclass.initComponent.call(this);
		this.on('hide',function(win){
			this.formPanel.getForm().reset();
			this.formPanel.getForm().clearInvalid();
		},this)
	},
	/**
	 * 根据账号配置加载面板数据
	 * @param {} accountCfg
	 */
	loadValue:function(accountCfg){
		this.accountCfg = accountCfg;
		var form = this.formPanel.getForm();
		form.setValues(accountCfg);	// 给表单设置数据
		form.findField('empId.id').bindValue();
		
		var backDay = accountCfg.mailBackDay;
		form.findField('mailBackDayField').setDisabled(backDay <= 0);
		if(backDay == -1){	// 保留备份
			Ext.getCmp('backDayNoRadio').setValue(false);
			Ext.getCmp('backDayRadio').setValue(false);
			Ext.getCmp('backDayAllRadio').setValue(true);
		}else if(backDay >= 0){	// 收取邮件N天后删除
			form.findField('mailBackDayField').setValue(backDay);
			Ext.getCmp('backDayNoRadio').setValue(false);
			Ext.getCmp('backDayRadio').setValue(true);
			Ext.getCmp('backDayAllRadio').setValue(false);
		}
		
		if(accountCfg.smtpCfg.smtpAuthAccount){	// 存在另外设置的SMTP验证账号
			form.findField('defaultAuth').setValue(false);
			Ext.getCmp('smtpAuthRadio').setValue(true);
		}else{	// 不存在
			form.findField('defaultAuth').setValue(true);
			Ext.getCmp('smtpAuthRadio').setValue(false);
		}
	},
	/**
	 * 获得值
	 * @return {accountCfg}
	 */
	getValue:function(){
		var form = this.formPanel.getForm();
		var accountCfg = form.getFieldValues();
		if(accountCfg.defaultAuth[0]){	// 没有设置另外的SMTP验证账号，则默认都设置为NULL
			accountCfg.smtpCfg.smtpAuthAccount = null;
			accountCfg.smtpCfg.smtpAuthPwd = null;
		}
		accountCfg.mailBackDay = -1// 保留全部备份
	 	if(accountCfg.mailBackDayRadio[1]){ // 收取邮件N天后删除
			accountCfg.mailBackDay = form.findField('mailBackDayField').getValue();
		}
		return accountCfg;
	},
	/**
	 * 保存配置数据
	 */
	saveData : function(){
		var win = this;
		var form = win.formPanel.getForm();
		if(!form.isValid())
			return;
		var accountCfg = this.getValue();
		QH_LOADMASK = new Ext.LoadMask(this.getEl(), {msg : '数据保存中'});
		QH_LOADMASK.show();
		mailAccountCfgService.saveAccountCfg(accountCfg, function(res) {
			QH_LOADMASK.hide();
			win.hide();
			QH_VIEWPORT.gridPanel.getStore().reload();
		});
	}
});