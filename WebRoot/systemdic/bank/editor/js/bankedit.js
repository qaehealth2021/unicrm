Ext.namespace("QH.bank")
$import('common/js/ux/form/BaseComboBox.js');
$import('common/controls/CommonTypeBaseCombo.js');
$import('common/controls/CurrencyBaseCombo.js');
$import('systemdic/bank/editor/js/bankForm.js');

Ext.onReady(function(){
	var modId = $('modId').value == 'null'?'':$('modId').value;
	QH_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'bankform',
			modId:modId,
			gridId : $('gridId').value,
			modId: modId,
			objName:'CotBank',
			ref:'formPanel'
		}]
	});
});