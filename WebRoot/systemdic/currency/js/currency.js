Ext.namespace('QH.currency');
$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_GRID);

$import('systemdic/currency/js/currencyStore.js');
$import('systemdic/currency/js/currencyGrid.js');
$import('systemdic/currency/js/currencyToolbar.js');

Ext.onReady(function(){
	QHERP_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'currencygrid',
			ref:'gridPanel'
		}]
	});
});
