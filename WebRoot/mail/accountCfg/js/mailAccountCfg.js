Ext.namespace('QH.mailAccountCfg');

$importKey(IMPORT_GRID);
$importKeyCss(IMPORT_GRID_CSS);

$importKey(IMPORT_EMP_COMBO);

$importCss('common/ext/resources/css/mail.css');

$import('dwr/interface/mailAccountCfgService.js');

$import('mail/common/constants.js');


$import('mail/accountCfg/js/mailAccountCfgStore.js');
$import('mail/accountCfg/js/mailAccountCfgGrid.js');
$import('mail/accountCfg/js/mailAccountCfgToolbar.js');
$import('mail/accountCfg/js/mailAccountCfgAddCard.js');
$import('mail/accountCfg/js/mailAccountCfgUpdate.js');

Ext.onReady(function(){
	QH_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'mailaccountcfggrid',
			ref:'gridPanel'
		}]
	});
	
});
