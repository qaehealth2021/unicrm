Ext.namespace('QH.containerType');

$importKey(IMPORT_GRID);
$importKeyCss(IMPORT_GRID_CSS);

$import('systemdic/containertype/js/containerTypeStore.js');
$import('systemdic/containertype/js/containerTypeGrid.js');
$import('systemdic/containertype/js/containerTypeToolbar.js');

Ext.onReady(function(){
	QH_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'containertypegrid',
			ref:'gridPanel'
		}]
	});
});
