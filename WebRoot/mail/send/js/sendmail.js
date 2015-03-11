Ext.namespace('QH.mail','QH.contactGroup','QH.contactGroupDetail','QH.contact');
/**
 * 引入扩展上传组件
 * 
 * @type Number
 */

//$import('common/js/swfupload_2.2.js');
//$import('common/js/SwfUploadPanel.js');
//$import('common/js/handlers.js');
//
//$import('mail/common/mailFn.js');
//
//
//
//
//$import('mail/send/js/mailObject.js');
//$import('mail/send/js/importPic.js');
//$import('mail/send/js/mailDelUpload.js');
//$import('mail/send/js/gears_init.js');
//$import('mail/send/js/XHRUpload.js');

$importKeyCss(IMPORT_BATCH_UPLOAD_CSS);
$importKey(IMPORT_BATCH_UPLOAD);
$importKey(IMPORT_CUSTOMER_COMBO);
$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_GRID);
$importKey(IMPORT_DIC_COMBO);
$importKey(IMPORT_ORDERNO_COMBO);
$importKey(IMPORT_EMP_COMBO);
$importKey(IMPORT_CONTACT_COMBO);
$importKey(IMPORT_NATION_COMBO);

$importCss('common/ext/resources/css/examples.css');
$importCss('common/ext/resources/css/mail.css');

$import('dwr/interface/mailSendService.js');
$import('dwr/interface/mailReadService.js');
$import('dwr/interface/mailTemplateService.js');

$import('common/ext/examples.js');

$import('common/js/ux/util/util.js');
$import('common/js/ux/form/DateTimeField.js');
$importCss('common/ext/ux/css/Spinner.css');
$import('common/ext/ux/Spinner.js');
$import('common/ext/ux/SpinnerField.js');

$import('common/js/ux/form/HtmlEditor.js');

$import('mail/common/constants.js');
$import('mail/common/mailFn.js');
$import('mail/common/MailHtmlEditor.js');

$import('mail/send/js/sendPanel.js');
$import('mail/send/js/mailForm.js');
$import('mail/send/js/mailStore.js');
$import('mail/send/js/mailObject.js');
$import('mail/send/js/sendToolbar.js');
$import('mail/send/js/sendFn.js');

$import('mail/contact/contactTabPanel.js');


$import('dwr/interface/cotContactService.js');
$import('contactgroup/js/contactGroupStore.js');
$import('contactgroup/js/contactGroupGrid.js');
$import('contactgroup/js/contactGroupToolbar.js');
/*分组明细*/
$import('contactgroup/detail/js/contactGroupDetailStore.js');
$import('contactgroup/detail/js/contactGroupDetailGrid.js');
$import('contactgroup/detail/js/contactGroupDetailToolbar.js');

$import('contactgroup/js/groupWin.js');
$import('contactgroup/detail/js/groupDetailWin.js');

/*联系人面板*/
$importKey('contact/js/contactStore.js');
$importKey('contact/js/contactToolbar.js');
$importKey('contact/js/contactGrid.js');
$import('dwr/interface/mailAccountCfgService.js');

/*快速文本面板*/
$importKey('mail/quicktxt/js/mailQuicktxtGrid.js');
/*信纸替换面板*/
$importKey('mail/quicktemplate/quicktemplateGrid.js');
/*共享附件*/
$importKey('mail/shareattach/js/shareattachGrid.js');
/*签名*/
$importKey('mail/signature/js/mailSwitchSignature.js');
Ext.onReady(function() {
	var sendTypeStatus = Ext.getDom('sendTypeStatus').value == 'null'?'':Ext.getDom('sendTypeStatus').value;
	var sendEmail = Ext.getDom('sendEmail').value == 'null'?'':Ext.getDom('sendEmail').value;
	var mailId = Ext.getDom('mailId').value == 'null'?'':Ext.getDom('mailId').value;
	var gridId = Ext.getDom('mailId').value == 'null'?'':Ext.getDom('gridId').value;
	QH_VIEWPORT = new Ext.Viewport({
		layout : 'fit',
		items : [{
			xtype : 'mailsendpanel',
			sendTypeStatus:sendTypeStatus,
			sendEmail:sendEmail,
			gridId:gridId,
			mailId:mailId,
			ref:'sendPanel'
		}],
		getGroupPanel:function(){
			return QH_VIEWPORT.sendPanel.contactTab.grouppanel;
		},
		getGroupDetailPanel:function(){
			return QH_VIEWPORT.sendPanel.contactTab.detailpanel;
		}
	});
	// 初始化数据
	QH_VIEWPORT.sendPanel.initSendMailData();
	
});
