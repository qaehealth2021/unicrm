Ext.namespace('QH.contactGroup','QH.contactGroupDetail','QH.contact','QH.faxsend','QH.sms');

$importKey(IMPORT_GRID);
$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_EMP_COMBO);
$importKey(IMPORT_CONTACT_COMBO);
$importKey(IMPORT_CUSTOMER_COMBO);
$importKey(IMPORT_NATION_COMBO);

$import('dwr/interface/cotContactService.js');
$import('contactgroup/js/contactGroupStore.js');
$import('contactgroup/js/contactGroupGrid.js');
$import('contactgroup/js/contactGroupToolbar.js');
/*分组明细*/
$import('contactgroup/detail/js/contactGroupDetailStore.js');
$import('contactgroup/detail/js/contactGroupDetailGrid.js');

$import('contactgroup/js/groupWin.js');
$import('contactgroup/detail/js/groupDetailWin.js');


/*联系人面板*/
$import('contact/js/contactStore.js');
$import('contact/js/contactToolbar.js');
$import('contact/js/contactGrid.js');
$import('dwr/interface/mailAccountCfgService.js');
$import("dwr/interface/cotFaxService.js");
$import("dwr/interface/cotSmsService.js");
$import('fax/js/faxsendSendWin.js');
$import('sms/js/smsWinToolbar.js');
$import('sms/js/smsSendOneWin.js');


var empsMap 

Ext.onReady(function(){
	DWREngine.setAsync(false);
	baseDataUtil.getBaseDicDataMap("CotEmps", "id", "empsName", null,function(res) {
		empsMap = res;
	});
	DWREngine.setAsync(true);
	QH_VIEWPORT = new Ext.Viewport({
		layout:'border',
		items:[{
			xtype:'contactgroupgrid',
			ref:'groupapnel',
			region:'west',
			width:600
		},{
			xtype:'contactgroupdetailgrid',
			region:'center',
			ref:'detailpanel'
		}],
		getGroupPanel:function(){
			return QH_VIEWPORT.groupapnel;
		},
		getGroupDetailPanel:function(){
			return QH_VIEWPORT.detailpanel;
		}
	});
});
