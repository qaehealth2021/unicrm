Ext.namespace('QH.fax', 'QH.faxsend', 'QH.faxrecv', 'QH.sms', 'QH.statistics');

$import("dwr/interface/cotFaxService.js");
$import("dwr/interface/cotLoginService.js");

$import('statistics/js/statisticsTree.js');

$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_GRID);
$importKey(IMPORT_CUSTOMER_COMBO);
$importKey(IMPORT_CONTACT_COMBO);
$importKey(IMPORT_ORDERNO_COMBO);

$import('fax/js/faxsendStore.js');
$import('fax/js/faxsendGrid.js');
$import('fax/js/faxsendToolbar.js');
$import('fax/js/faxsendSendWin.js');
$import('fax/js/faxrecvStore.js');
$import('fax/js/faxrecvGrid.js');
$import('fax/js/faxrecvToolbar.js');
var faxMap = [];
var faxAry = [];
Ext.onReady(function() {
	DWREngine.setAsync(false);
	baseDataUtil.getBaseDicDataMap("CotFaxdeviceMap", "faxDevice", "faxNbr",
			null, function(res) {
				faxMap = res;
				for(var p in faxMap){
					var ary=[];
					ary.push(p);
					ary.push(faxMap[p]);
					faxAry.push(ary);
				}
			});
	DWREngine.setAsync(true);
	QHERP_VIEWPORT = new Ext.Viewport({
				layout : 'fit',
				items : [{
					xtype : 'qhtabpanel',
					activeTab : 0,
					ref : 'faxTabPanel',
					items : [{
						title : '发送',
						xtype : 'panel',
						layout : 'border',
						items : [{
							xtype : 'statisticstree',
							region : 'west',
							isFax : true,
							queryFlag:'FAXSEND',
							ref : '../statisticsTree',
							margins : '0 5 0 0',
							width : 200,
							listeners : {
								'refreshfax' : function(treeNodeId) {
									var store = QHERP_VIEWPORT.faxTabPanel.faxSendGrid
											.getStore();
									store.setBaseParam("treeLvId", treeNodeId);
									store.load();
								}
							}
						}, {
							xtype : 'faxsendgrid',
							region : 'center',
							ref : '../faxSendGrid'
						}]
					}, {
						title : '接收',
						xtype : 'panel',
						layout : 'border',
						items : [{
							xtype : 'statisticstree',
							region : 'west',
							isFax : true,
							queryFlag:'FAXRECV',
							ref : '../statisticsTree',
							margins : '0 5 0 0',
							width : 200,
							listeners : {
								'refreshfax' : function(treeNodeId) {
									var store2 = QHERP_VIEWPORT.faxTabPanel.faxRecvGrid
											.getStore();
									store2.setBaseParam("treeLvId", treeNodeId);
									store2.load();
								}
							}
						},
								// {
								// xtype : 'panel',
								// region : 'south',
								// margins : '5 0 0 0',
								// height : 200
								// },
								{
									xtype : 'faxrecvgrid',
									region : 'center',
									ref : '../faxRecvGrid'
								}]
					}]
				}]
			});
});
