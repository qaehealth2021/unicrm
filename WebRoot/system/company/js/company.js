Ext.namespace('QH.company');

$importKey(IMPORT_GRID);
$importKeyCss(IMPORT_GRID_CSS);

$import('system/company/js/companyStore.js');
$import('system/company/js/companyGrid.js');
$import('system/company/js/companyToolbar.js');

Ext.onReady(function(){
	QHERP_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'companygrid',
			ref:'gridPanel'
		}]
	});
});
