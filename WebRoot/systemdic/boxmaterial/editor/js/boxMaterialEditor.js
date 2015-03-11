Ext.namespace('QH.boxMaterial');

$importKey(IMPORT_FACTORY_COMBO);
$importKey(IMPORT_BOXTYPE_COMBO);
$import('systemdic/boxmaterial/editor/js/boxMaterialFormPanel.js');

Ext.onReady(function(){
	var modeId = $('modId').value == 'null'?'':$('modId').value;
	QH_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'boxmaterialform',
			margins:'5 0 5 0',
			ref:'formPanel',
			gridId : $('gridId').value,
			isSaveClose:true,
			modId: modeId,
			objName:'CotBoxMaterial',
			height:230
		}]
	});
});
