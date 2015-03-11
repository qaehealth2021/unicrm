Ext.namespace('QH.bank');
$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_GRID);
$import('systemdic/bank/js/bankStore.js');
$import('systemdic/bank/js/bankGrid.js');
$import('systemdic/bank/js/bankToolbar.js');

Ext.onReady(function(){
	QHERP_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'bankgrid',
			ref:'gridPanel'
		}]
	});
});
