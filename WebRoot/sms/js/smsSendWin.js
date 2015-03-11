$importCss('common/ext/resources/css/mail.css');
$importKey(IMPORT_DIC_COMBO);
$importKey(IMPORT_CONTACT_COMBO);
$importKey(IMPORT_CUSTOMER_COMBO);
$import('sms/js/contact/contactGrid.js');
$import('sms/js/contact/contactStore.js');
$import('sms/js/contact/contactToolbar.js');
$import('sms/js/smsFormPanel.js');

QH.sms.SmsSendWin = Ext.extend(Ext.Window, {
			title : '发送短信',
			layout : 'border',
			id : 'smsSendWin',
			modal : true,
			constrainHeader : true,
			width : 980,
			height : 500,
			queryBar : '',
			gridId : '',
			smsId : null,
			initComponent : function() {
				var win = this;
				this.items = [{
							region : 'west',
							xtype : 'tabpanel',
							activeTab : 0,
							ref : 'contactTab',
							collapseMode : 'mini',
							split : true,
							margins : '5 5 5 0',
							width : 320,
							maxSize : 450,
							minSize : 150,
							items : [{
										xtype : 'smscontactgrid',
										title : '客户',
										srcGridId : null,
										ref : 'customerGrid'
									}, {
										title : '分组',
										xtype : 'contactgroupgrid',
										ref : 'grouppanel'
									}]
						}, {
							region : 'center',
							xtype : 'tabpanel',
							activeTab : 0,
							ref : 'contactTab',
							margins : '5 5 5 0',
							items : [{
										title : '收件人',
										srcGridId : this.smsId,
										xtype : 'smscontactgrid',
										id : 'choseGrid',
										bbarCfg : {
											pageSize : 1000,
											displaySize : "NONE"
										}
									}]
						}, {
							xtype : 'tabpanel',
							activeTab : 0,
							width : 320,
							collapseMode : 'mini',
							split : true,
							maxSize : 450,
							minSize : 150,
							margins : '5 0 5 0',
							region : 'east',
							ref : 'formPanel',
							items : [{
										title : '内容',
										xtype : 'smsform',
										id : 'smsSendForm',
										ref : 'customerGrid',
										gridId : this.gridId,
										objName : 'CotSms'
									}]
						}];
				QH.sms.SmsSendWin.superclass.initComponent.call(this);
			}
		});
Ext.reg("smssendwin", QH.sms.SmsSendWin);