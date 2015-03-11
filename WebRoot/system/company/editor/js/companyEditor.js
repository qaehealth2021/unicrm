Ext.namespace('QH.company');

$importKey(IMPORT_PIC);
$importKeyCss(IMPORT_UPLOAD_CSS);
$importKey(IMPORT_NO_REPEAT);
$import('system/company/editor/js/companyFormPanel.js');
Ext.onReady(function(){
	var modeId = $('modId').value == 'null'?'':$('modId').value;
	QH_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'companyform',
			margins:'5 0 5 0',
			ref:'formPanel',
			gridId : $('gridId').value,
			isSaveClose:true,
			modId: modeId,
			objName:'CotCompany',
			height:230
		}]
	});
});
