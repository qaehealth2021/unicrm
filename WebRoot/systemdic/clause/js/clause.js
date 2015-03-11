Ext.namespace('QH.clause');
$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_GRID);

$import('systemdic/clause/js/clauseStore.js');
$import('systemdic/clause/js/clauseGrid.js');
$import('systemdic/clause/js/clauseToolbar.js');

Ext.onReady(function(){
	QHERP_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'clausegrid',
			ref:'gridPanel'
		}]
	});
});
