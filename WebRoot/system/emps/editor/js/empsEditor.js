Ext.namespace('QH.emps');

$importKey(IMPORT_NO_REPEAT);
$importKey(IMPORT_COMPANY_COMBO);
$importKey(IMPORT_DEPT_COMBO);
$importKey(IMPORT_FAXMAP_COMBO)
$import('system/emps/editor/js/empsFormPanel.js');

Ext.onReady(function(){
	var modeId = $('modId').value == 'null'?'':$('modId').value;
	QH_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'empsform',
			margins:'5 0 5 0',
			ref:'formPanel',
			gridId : $('gridId').value,
			isSaveClose:true,
			modId: modeId,
			objName:'CotEmps',
			height:230
		}]
	});
});
