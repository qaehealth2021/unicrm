Ext.namespace('QH.sysLog');

$importKey(IMPORT_GRID);
$importKeyCss(IMPORT_GRID_CSS);

$import('system/syslog/js/sysLogStore.js');
$import('system/syslog/js/sysLogGrid.js');
$import('system/syslog/js/sysLogToolbar.js');

Ext.onReady(function(){
	QHERP_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'sysloggrid',
			ref:'gridPanel'
		}]
	});
});
