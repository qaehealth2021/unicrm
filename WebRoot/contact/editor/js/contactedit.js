Ext.namespace("QH.contact")
$import("dwr/interface/cotContactService.js");

$importKey(IMPORT_CUSTOMER_COMBO);
$importKey(IMPORT_EMP_COMBO);

$import('contact/editor/js/contactFormPanel.js');

Ext.onReady(function(){
	var modId = $('modId').value == 'null'?'':$('modId').value;
	var fcId = $('fcId').value == 'null'?'':$('fcId').value;
	var personName = $('personName').value == 'null'?'':decodeURI($('personName').value);
	var personEmail = $('personEmail').value == 'null'?'':$('personEmail').value;
	var flag = $('flag').value;
	QH_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'contactform',
			gridId : $('gridId').value,
			personName:personName,
			personEmail:personEmail,
			modId: modId,
			fcId:fcId,
			flag:flag,
			objName:'CotContact',
			ref:'formPanel'
		}]
	});
});