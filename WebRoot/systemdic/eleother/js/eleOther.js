Ext.namespace('QH.eleOther');

$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_GRID);

$import('systemdic/eleother/js/eleOtherStore.js');
$import('systemdic/eleother/js/eleOtherGrid.js');
$import('systemdic/eleother/js/eleOtherToolbar.js');

Ext.onReady(function(){
	QHERP_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'eleothergrid',
			ref:'gridPanel'
		}]
	});
});
