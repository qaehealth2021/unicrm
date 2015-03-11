Ext.namespace('QH.boxMaterial');

$importKey(IMPORT_GRID);
$importKeyCss(IMPORT_GRID_CSS);

$import('systemdic/boxmaterial/js/boxMaterialStore.js');
$import('systemdic/boxmaterial/js/boxMaterialGrid.js');
$import('systemdic/boxmaterial/js/boxMaterialToolbar.js');

Ext.onReady(function(){
	QHERP_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'boxmaterialgrid',
			ref:'gridPanel'
		}]
	});
});
