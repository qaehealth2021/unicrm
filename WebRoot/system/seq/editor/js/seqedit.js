Ext.namespace('QH.seq','QH.seqCfg');
$import('system/seq/js/seqcombodata.js');
$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_GRID);

$import('system/seq/editor/js/seqCfgStore.js');
$import('system/seq/editor/js/seqCfgGrid.js');
$import('system/seq/editor/js/seqFormPanel.js');

Ext.onReady(function(){
	var modId = $('modId').value == 'null'?'':$('modId').value;
	QHERP_VIEWPORT = new Ext.Viewport({
		layout:'border',
		items:[{
			xtype:'seqcfggrid',
			region:"west",
			width:300,
			ref:'gridPanel'
		},{
			xtype:"seqformpanel",
			modId:modId,
			gridId : $('gridId').value,
			region:"center",
			objName:'CotSeq',
			ref:'formPanel'
		}]
	});
});
