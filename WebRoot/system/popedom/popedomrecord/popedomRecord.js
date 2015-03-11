Ext.namespace('QH.popedomRecord');
$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_GRID);

$import('popedomRecord/js/popedomRecordStore.js');
$import('popedomRecord/js/popedomRecordGrid.js');
$import('popedomRecord/js/popedomRecordToolbar.js');

Ext.onReady(function(){
	QHERP_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'popedomrecordgrid',
			ref:'gridPanel'
		}]
	});
});
