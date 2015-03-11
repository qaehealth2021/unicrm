Ext.ns('QH.ux.icon');

$importKeyCss(IMPORT_PIC_CSS);
$importKeyCss(IMPORT_BATCH_UPLOAD_CSS);
$importKey(IMPORT_DRAG);
$importKey(IMPORT_BATCH_UPLOAD);

$import('dwr/interface/iconManager.js');
$import('module/icon/js/iconstore.js');
$import('module/icon/js/iconpanel.js');

Ext.onReady(function(){
	QH_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'iconpanel',
			ref:'iconPanel'
		}]
	});
});