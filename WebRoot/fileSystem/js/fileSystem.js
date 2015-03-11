Ext.namespace('QH.fileSystem','QH.fileSystemPopedom');
$importKey(IMPORT_UPLOAD);
$importKeyCss(IMPORT_UPLOAD_CSS);
$importKeyCss(IMPORT_BATCH_UPLOAD_CSS);
$importKey(IMPORT_BATCH_UPLOAD);
$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_GRID);


$import('dwr/interface/cotFileSystemService.js');
$import('dwr/interface/cotFileTreeService.js');

$import('fileSystem/js/ChoseEmpTree.js');
$import('fileSystem/js/AlreadyChoseEmpTree.js');
$import('fileSystem/js/fileSystemTree.js');
$import('fileSystem/js/fileSystemStore.js');
$import('fileSystem/js/fileSystemGrid.js');
$import('fileSystem/js/fileSystemToolbar.js');
$import('fileSystem/js/fileShareWin.js');

Ext.onReady(function(){

	QH_VIEWPORT = new Ext.Viewport({
		layout:'border',
		items:[{
			xtype:'filesystemtree',
			ref:'treePanel',
			region:'west',
			margins:'5 0 5 0',
			split:true,
			collapseMode:'mini',
			width:150,
			maxSize:300,
			minSize:100
		},{
			xtype:'filesystemgrid',
			ref:'gridPanel',
			region:'center',
			margins:'5 0 5 0'
		}
		]
	});
});