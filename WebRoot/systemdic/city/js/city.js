Ext.namespace('QH.city');
$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_GRID);

$import('systemdic/city/js/cityStore.js');
$import('systemdic/city/js/cityGrid.js');
$import('systemdic/city/js/cityToolbar.js');

Ext.onReady(function(){
	QHERP_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'citygrid',
			ref:'gridPanel'
		}]
	});
});
