Ext.namespace('QH.dictionary');

$importCss('common/ext/ux/css/RowEditor.css');

//$import('common/ext/miframe-min.js');
$import('common/ext/ux/RowEditor.js');
$import('common/js/ux/grid/BaseGrid.js');
$import('common/js/ux/grid/BaseRowEditor.js');
$import('common/js/ux/grid/BaseToolbar.js');
$import('common/ext/ux/TabCloseMenu.js');

$import('systemdic/dictionary/dictionaryTree.js');
$import('systemdic/dictionary/dictionaryTabPanel.js');
$import('systemdic/dictionary/dictionaryGrid.js');
$import('systemdic/dictionary/dictionaryStore.js');

var dataFlagMap = [];

DWREngine.setAsync(false);

baseDataUtil.getBaseDicDataMap("CotDictionaryCfg", "flag", "headCfg",null, function(res) {
	dataFlagMap = res;
});

DWREngine.setAsync(true);

Ext.onReady(function(){
	QH_VIEWPORT = new Ext.Viewport({
		layout:'border',
		items:[{
			xtype:'dictionarytreepanel',
			region:'west',
			split:true,
			collapseMode:'mini',
			width:'180',
			minWidth:150,
			maxWidth:250,
			ref:'treePanel'
		},{
			xtype:'dictionarytabpanel',
			region:'center',
			ref:'tabPanel'
		}]
	});
});