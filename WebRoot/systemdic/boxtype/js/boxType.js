Ext.namespace('QH.boxType');

$importKey(IMPORT_GRID);
$importKeyCss(IMPORT_GRID_CSS);

$import('systemdic/boxtype/js/boxTypeStore.js');
$import('systemdic/boxtype/js/boxTypeGrid.js');
$import('systemdic/boxtype/js/boxTypeToolbar.js');

Ext.onReady(function(){
	QHERP_VIEWPORT = new Ext.Viewport({
		layout:'fit', 
		items:[{
			xtype:'boxtypegrid',
			ref:'gridPanel'
		}]
	});
});
