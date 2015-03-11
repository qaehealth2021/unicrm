Ext.namespace('QH.emps','QH.sms');

$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_GRID);
$importKey(IMPORT_COMPANY_COMBO);
$importKey(IMPORT_DEPT_COMBO);
$importKey(IMPORT_EMP_COMBO);
$import('system/emps/js/empsStore.js');
$import('system/emps/js/empsGrid.js');
$import('system/emps/js/empsToolbar.js');
$import("dwr/interface/cotSmsService.js");
$import('sms/js/smsWinToolbar.js');
$import('sms/js/smsSendOneWin.js');

Ext.onReady(function(){
	QHERP_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'empsgrid',
			ref:'gridPanel'
		}]
	});
});
