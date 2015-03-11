Ext.namespace("QH.rptfile");

$importKey(IMPORT_RPTTYPE_COMBO);
$importKey(IMPORT_NO_REPEAT);

$import('system/rptfile/editor/js/rptfileFormPanel.js');

Ext.onReady(function(){
	var modId = $('modId').value == 'null'?'':$('modId').value;
	QH_VIEWPORT = new Ext.Viewport({
		layout:'border',
		items:[{
			xtype:'rptfileform',
			modId:modId,
			region:'center',
			height:300,
			gridId : $('gridId').value,
			modId: modId,
			objName:'CotRptFile',
			ref:'formPanel'
		}]
	});
});