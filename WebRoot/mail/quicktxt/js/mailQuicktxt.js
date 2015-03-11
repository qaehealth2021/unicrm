Ext.namespace('QH.mail');

$importKeyCss(IMPORT_BATCH_UPLOAD_CSS);
$importKey(IMPORT_BATCH_UPLOAD);

$importCss('common/ext/resources/css/mail.css');

$import('dwr/interface/baseSerivce.js');
$import('dwr/interface/mailTemplateService.js');

$import('common/js/ux/form/HtmlEditor.js');

$import('mail/common/constants.js');
$import('mail/common/MailHtmlEditor.js');

$import('mail/template/js/mailTemplateForm.js');
$import('mail/template/js/mailTemplateTree.js');
$import('mail/template/js/mailTemplateTreeRightMenu.js');

$import('mail/quicktxt/js/mailQuicktxtTree.js');

Ext.onReady(function(){
	QH_VIEWPORT = new Ext.Viewport({
		layout:'border',
		items:[{
			region:'west',
			xtype:'mailquicktxttree',
			width:200,
			margins:'5 0 5 5',
			collapsible:true,
			titleCollapse:true,
			split:true,
			ref:'mailTemplateTreePanel'
		},{
			region:'center',
			xtype:'mailtemplateform',
			margins:'5 5 5 0',
			isHtmlType:false,
			enableBackgroundImage:false,
			ref:'mailTemplateFormPanel'
		}]
	});
});
