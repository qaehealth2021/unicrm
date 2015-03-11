Ext.namespace('QH.nation');
$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_GRID);
$importKey(IMPORT_AERA_COMBO);

$import('systemdic/nation/js/nationStore.js');
$import('systemdic/nation/js/nationGrid.js');
$import('systemdic/nation/js/nationToolbar.js');

Ext.onReady(function(){
	QHERP_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'nationgrid',
			ref:'gridPanel'
		}]
	});
});
