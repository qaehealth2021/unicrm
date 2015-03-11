Ext.namespace('QH.price','QH.faxsend','QH.sms');
$import("dwr/interface/cotFaxService.js");
$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_GRID);

$importKey(IMPORT_UPLOAD);
$importKeyCss(IMPORT_UPLOAD_CSS);
$importKey(IMPORT_DIC_COMBO);
$importKey(IMPORT_EMP_COMBO);
$importKey(IMPORT_ORDERNO_COMBO);
$importKey(IMPORT_CUSTOMER_COMBO);
$importKey(IMPORT_CONTACT_COMBO);
$import('sms/js/contact/contactGrid.js');
$import('sms/js/contact/contactStore.js');
$import('sms/js/contact/contactToolbar.js');
$import('fax/js/faxsendFormPanel.js');
$import('fax/js/faxsendSendWin.js');

$import('price/js/priceStore.js');
$import('price/js/priceGrid.js');
$import('price/js/priceToolbar.js');
$import('price/js/queryPanel.js');
$import('price/js/priceCommonPanel.js');
$import('common/js/ux/win/printWin.js');
$import('dwr/interface/mailAccountCfgService.js');
$importKey(IMPORT_RPTFILE_COMBO);

Ext.onReady(function() {
			var typeId = $('typeId').value;
			QHERP_VIEWPORT = new Ext.Viewport({
						layout : 'border',
						items : [{
									xtype : 'queryform',
									region : 'north',
									height : 115,
									ref : 'queryPanel'
								}, {
									xtype : 'qhtabpanel',
									activeTab : 0,
									region : 'center',
									items : [{
												xtype : 'pricegrid',
												title : '概览',
												typeId:typeId,
												ref : '../gridPanel'
											}, {
												title : '常规',
												ref : '../commonForm',
												xtype : 'commonform'
											}]

								}]
					});
		});
