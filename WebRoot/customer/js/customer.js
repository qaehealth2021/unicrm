Ext.namespace('QH.customer');

$importKey(IMPORT_GRID);
$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_EMP_COMBO);
$import("dwr/interface/cotLoginService.js");
$import("dwr/interface/cotCustomerService.js");
$import('customer/js/customerStore.js');
$import('customer/js/customerGrid.js');
$import('customer/js/customerToolbar.js');
$import('customer/js/customerTree.js');
$import('customer/js/ShareToWin.js');
var custMap;
var custFromMap;
Ext.onReady(function(){
	DWREngine.setAsync(false);
	baseDataUtil.getBaseDicDataMap("CotDictionary", "id", "content","{flag:'khlx'}", function(res) {
		custMap = res;
	});
	baseDataUtil.getBaseDicDataMap("CotDictionary", "id", "content","{flag:'khly'}", function(res) {
		custFromMap = res;
	});
	DWREngine.setAsync(true);
	
	QH_VIEWPORT = new Ext.Viewport({
		layout:'border',
		items:[{
			xtype:'customertree',
			width:200,
			region:'west',
			ref:'cutomerTree'
		},{
			xtype:'customergrid',
			ref:'gridPanel',
			region:'center'
		}]
	});
});
