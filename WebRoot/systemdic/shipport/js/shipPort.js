Ext.namespace('QH.shipPort');
$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_GRID);

$import('systemdic/shipport/js/shipPortStore.js');
$import('systemdic/shipport/js/shipPortGrid.js');
$import('systemdic/shipport/js/shipPortToolbar.js');

Ext.onReady(function(){
	QHERP_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'shipportgrid',
			ref:'gridPanel'
		}]
	});
});
