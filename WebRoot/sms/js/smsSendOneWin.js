$importCss('common/ext/resources/css/mail.css');
$importKey(IMPORT_DIC_COMBO);
$importKey(IMPORT_ORDERNO_COMBO);
$import('sms/js/smsFormPanel.js');

QH.sms.SmsSendOneWin = Ext.extend(Ext.Window, {
			layout : 'fit',
			id : 'smsSendWin',
			modal : true,
			constrainHeader : true,
			width : 480,
			height : 450,
			queryBar : '',
			gridId : '',
			contactId : '',
			contactNbr : '',
			smsId : null,
			initComponent : function() {
				var win = this;
				this.items = [{
										xtype : 'smsform',
										id : 'smsSendForm',
										ref : 'customerGrid',
										gridId : this.gridId,
										contactId : this.contactId,
										contactNbr : this.contactNbr,
										objName : 'CotSms'
									}];
				QH.sms.SmsSendOneWin.superclass.initComponent.call(this);
			}
		});
Ext.reg("smssendonewin", QH.sms.SmsSendOneWin);