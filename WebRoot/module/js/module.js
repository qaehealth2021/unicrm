Ext.ns('QH.controls','QH.module','QH.moduleFun','QH.ux.icon');

$import("dwr/interface/cotModuleService.js");
$import('dwr/interface/iconManager.js');
$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_GRID);
$import("module/js/moduleOverride.js");
$import("module/js/moduleTree.js");
$import("module/js/modulePanel.js");
$import("module/js/moduleFunGrid.js");
$import("module/js/moduleFunStore.js");
$import("module/js/moduleFunToolbar.js");

//导入图标库
$importKeyCss(IMPORT_PIC_CSS);
$importKeyCss(IMPORT_BATCH_UPLOAD_CSS);
$importKey(IMPORT_DRAG);
$importKey(IMPORT_BATCH_UPLOAD);
$import('module/icon/js/iconstore.js');
$import('module/icon/js/iconpanel.js');

QH.module.Viewport = Ext.extend(Ext.Viewport,{
	layout:'border',
	initComponent:function(){
		
		this.items = [{
			xtype:'moduletree',
			split:true,
			width:200,
			region:'west',
			title:'系统菜单',
			ref:'moduleTree'
		},{
			region:'center',
			layout:'border',
			items:[{
				title:'菜单明细',
				xtype:'qhmoduleform',
				ref:'../moduleForm',
				region:'west',
				width:350,
				split:true
			},{
				title:'菜单功能',
				xtype:'modulefungrid',
				disabled:true,
				ref:'../moduleFunGrid',
				region:'center'				
			}]
		}];
		QH.module.Viewport.superclass.initComponent.call(this);
	}
});

Ext.onReady(function(){
	QH_VIEWPORT = new QH.module.Viewport();
});