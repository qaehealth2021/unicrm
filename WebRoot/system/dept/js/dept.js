Ext.namespace('QH.dept');

$importKey(IMPORT_GRID);
$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_COMPANY_COMBO);

$import('system/dept/js/deptStore.js');
$import('system/dept/js/deptGrid.js');
$import('system/dept/js/deptToolbar.js');

Ext.onReady(function(){
	QHERP_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'deptgrid',
			ref:'gridPanel'
		}]
	});
});
