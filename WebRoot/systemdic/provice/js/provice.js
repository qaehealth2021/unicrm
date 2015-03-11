Ext.namespace('QH.provice');
$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_GRID);
$importKey(IMPORT_NATION_COMBO)
$import('common/js/ux/form/BaseComboBox.js');
$import('common/controls/NationBaseCombo.js');

$import('systemdic/provice/js/proviceStore.js');
$import('systemdic/provice/js/proviceGrid.js');
$import('systemdic/provice/js/proviceToolbar.js');

Ext.onReady(function(){
	QHERP_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'provicegrid',
			ref:'gridPanel'
		}]
	});
});
