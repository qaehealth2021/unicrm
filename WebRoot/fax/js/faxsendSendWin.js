$importKey(IMPORT_UPLOAD);
$importKeyCss(IMPORT_UPLOAD_CSS);
$importKey(IMPORT_DIC_COMBO);
$importKey(IMPORT_EMP_COMBO);
$importKey(IMPORT_ORDERNO_COMBO);
$importKey(IMPORT_CUSTOMER_COMBO);
$importKey(IMPORT_CONTACT_COMBO);
$import('sms/js/contact/contactGrid.js');
$import('sms/js/contact/contactStore.js');
$import('sms/js/contact/contactToolbar.js');
$import('fax/js/faxsendFormPanel.js');

QH.faxsend.FaxSendSendWin = Ext.extend(Ext.Window, {
			title : '发送传真',
			layout : 'fit',
			modal : true,
			constrainHeader : true,
			width : 600,
			height : 410,
			queryBar : '',
			gridId:'',
			sendId:'',
			url:'',
			fdObj:'',//别的模块直接调用新增传真界面时传进的对象
			initComponent : function() {
				var win = this;
				this.items = [{
							xtype : 'faxsendform',
							margins : '5 0 5 0',
							ref : 'formPanel',
							url:win.url,
							fdObj:win.fdObj,
							gridId : this.gridId,
							sendId : this.sendId,
							objName : 'CotFaxSend'
						}];
				QH.faxsend.FaxSendSendWin.superclass.initComponent.call(this);
			}
		});
Ext.reg("faxsendsendwin", QH.faxsend.FaxSendSendWin);