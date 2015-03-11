Ext.namespace('QH.contact','QH.faxsend','QH.sms');

$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_GRID);
$importKey(IMPORT_NATION_COMBO);
$importKey('contact/js/contactStore.js');
$importKey('contact/js/contactToolbar.js');
$importKey('contact/js/contactGrid.js');
$import("dwr/interface/cotFaxService.js");
$import("dwr/interface/cotSmsService.js");
$import('dwr/interface/mailAccountCfgService.js');
$importKey(IMPORT_CUSTOMER_COMBO);
$importKey(IMPORT_EMP_COMBO);

$import('fax/js/faxsendSendWin.js');
$import('sms/js/smsWinToolbar.js');
$import('sms/js/smsSendOneWin.js');

var empsMap = [];
Ext.onReady(function() {
	baseDataUtil.getBaseDicDataMap("CotEmps", "id", "empsName", null,function(res) {
		empsMap = res;
	});
	var flag = $('flag').value == 'null' ? '' : $('flag').value;
	QHERP_VIEWPORT = new Ext.Viewport({
				layout : 'fit',
				items : [{
							xtype : 'contactgrid',
							ref : 'gridPanel',
							flag : flag
						}]
			});
});
