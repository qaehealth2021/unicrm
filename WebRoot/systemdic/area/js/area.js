Ext.namespace('QH.area');
$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_GRID);

$import('systemdic/area/js/areaStore.js');
$import('systemdic/area/js/areaGrid.js');
$import('systemdic/area/js/areaToolbar.js');

Ext.onReady(function(){
	QHERP_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'areagrid',
			ref:'gridPanel'
		}]
	});
});
