Ext.namespace('QH.mail');

$importCss('common/ext/resources/css/mail.css');
$import('dwr/interface/mailReciveService.js');
$import('dwr/interface/mailReadService.js');
$import('dwr/interface/mailTreeService.js');
$import('dwr/interface/mailAccountCfgService.js');
$import('dwr/interface/mailUpdateService.js');

$import('mail/common/constants.js');
$import('mail/common/mailFn.js');

$import('mail/info/js/infoToolbar.js');
$import('mail/info/js/infoPanel.js');

Ext.onReady(function(){
	var mailId = $('mailId').value == 'null'?'':$('mailId').value;
	var gridId = $('gridId').value == 'null'?'':$('gridId').value;
	QH_VIEWPORT = new Ext.Viewport({
		layout:'border',
		items:[{
			region:'north',
			height:40,
			xtype:'mailinfotoolbar',
			gridId:gridId,
			ref:'infoToolbar'
		},{
			region:'center',
			xtype:'mailinfopanel',
			ref:'infoPanel',
			border:false,
			mailId:mailId,
			gridId:gridId
		}]
	});
});