Ext.namespace('QH.seq');

$importCss('common/ext/ux/css/RowEditor.css');
	
$import('system/seq/js/seqcombodata.js');
$import('common/ext/ux/RowEditor.js');
$import('common/js/ux/grid/BaseGrid.js');
$import('common/js/ux/grid/BaseRowEditor.js');
$import('common/js/ux/grid/BaseToolbar.js');

$import('system/seq/js/seqStore.js');
$import('system/seq/js/seqGrid.js');
$import('system/seq/js/seqToolbar.js');

Ext.onReady(function(){
	QHERP_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'seqgrid',
			ref:'gridPanel'
		}]
	});
});
