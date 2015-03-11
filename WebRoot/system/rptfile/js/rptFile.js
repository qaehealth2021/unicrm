Ext.namespace('QH.rptFile');

$importKey(IMPORT_GRID);
$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_RPTTYPE_COMBO);
$importKey(IMPORT_UPLOAD);
$importKeyCss(IMPORT_UPLOAD_CSS);
$import('system/rptfile/js/rptFileStore.js');
$import('system/rptfile/js/rptFileGrid.js');
$import('system/rptfile/js/rptFileToolbar.js');

Ext.onReady(function(){
	QHERP_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'rptfilegrid',
			ref:'gridPanel'
		}]
	});
});
