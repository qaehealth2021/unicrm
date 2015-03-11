Ext.namespace('QH.sms', 'QH.mail', 'QH.statistics','QH.rpt','QH.contactGroup','QH.contactGroupDetail','QH.contact');

$import("dwr/interface/cotSmsService.js");
$import("dwr/interface/cotContactService.js");

$import('statistics/js/statisticsTree.js');

$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_GRID);
$importKey(IMPORT_ORDERNO_COMBO);
$importKey(IMPORT_CUSTOMER_COMBO);
$importKey(IMPORT_CONTACT_COMBO);
$importKey(IMPORT_EMP_COMBO);

$import('sms/js/contact/contactGroupStore.js');
$import('sms/js/contact/contactGroupGrid.js');
$import('sms/js/contact/contactGroupToolbar.js');

$import('sms/js/rptStore.js');
$import('sms/js/rptGrid.js');
$import('sms/js/smsStore.js');
$import('sms/js/smsGrid.js');
$import('sms/js/smsToolbar.js');
$import('sms/js/smsWinToolbar.js');
$import('sms/js/smsSendWin.js');

Ext.onReady(function() {
			QHERP_VIEWPORT = new Ext.Viewport({
						layout : 'border',
						items : [{
							xtype : 'statisticstree',
							queryFlag:'SMS',
							region : 'west',
							isSms : true,
							queryFlag:'SMS',
							ref : '../statisticsTree',
							margins : '0 5 0 0',
							width : 200,
							listeners : {
								'refreshsms' : function(treeNodeId) {
									var store = QHERP_VIEWPORT.gridPanel
											.getStore();
									store.setBaseParam("treeLvId", treeNodeId);
									store.load();
									
									var store2 = QHERP_VIEWPORT.mogridPanel
											.getStore();
									store2.setBaseParam("treeLvId", treeNodeId);
									store2.load();
								}
							}
						}, {
							xtype : 'qhtabpanel',
							region : 'center',
							activeTab : 0,
							items:[{
								title:"普通短信",
								xtype : 'smsgrid',
								ref : '../gridPanel'
							},{
								title:"陌生人短信",
								mo:true,
								xtype : 'smsgrid',
								ref : '../mogridPanel'
							}
//							,{
//								xtype : 'rptgrid',
//								region : 'south',
//								margins : '5 0 0 0',
//								height:150,
//								ref : '../rptGridPanel'
//							}
							]
						}]
					});
		});
