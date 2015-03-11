mask();
$importKey(IMPORT_UPLOAD);
$importKeyCss(IMPORT_UPLOAD_CSS);
$import(EXCEL_DEFINE_WIN);
$import(EXCEL_IMPORT_PANEL);
$import('dwr/interface/importImageService.js');

Ext.onReady(function() {
			QHERP_VIEWPORT = new Ext.Viewport({
						layout : 'fit',
						items : [{
									xtype : "importexcelpanel",
									tbName : 'CotContact',
									uploadFileFolder : 'contact_excel_tmp',
									excelCfgFileType : "contact"
								}]
					});
			unmask();
		});
