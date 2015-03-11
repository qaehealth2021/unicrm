Ext.namespace('QH.targetPort');
$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_GRID);

$import('systemdic/targetport/js/targetPortStore.js');
$import('systemdic/targetport/js/targetPortGrid.js');
$import('systemdic/targetport/js/targetPortToolbar.js');

Ext.onReady(function(){
	QHERP_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'targetportgrid',
			ref:'gridPanel'
		}]
	});
});
