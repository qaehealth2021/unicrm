Ext.namespace('QH.emps')

$importCss('index/css/picview.css');


$import('common/ext/ux/TabCloseMenu.js');
$import('common/js/ux/form/BaseComboBox.js');

$import('common/ext/ux/RowEditor.js');
$import('common/js/ux/grid/BaseGrid.js');
$import('common/js/ux/grid/BaseRowEditor.js');
$import('common/js/ux/grid/BaseToolbar.js');

$import('index/js/commonTypeGrid.js');
$import('index/js/commonTypeStore.js');

$import('index/js/empsGrid.js');
$import('index/js/empsStore.js');

$import('index/js/picStore.js');
$import('index/js/PicView.js');
$import('index/js/TabPanel.js');


Ext.onReady(function(){
	QH_VIEWPORT = new Ext.Viewport({
		layout:'border',
		items:[{
			region:'west',
			width:190,
			split:true,
			title:'菜单栏',
			renderHidden:true,
			collapsible:true,
			layout:'fit',
			items:[{
				xtype:'picview',
				ref:'../menuView',
				disableMouseOver:false
			}],
			bbar:[{
				text:'快捷',
				handler:function(btn){
					if(!btn.win){
						btn.win = new Ext.Window({
							title:'快捷按钮',
							closeAction:'hide',
							layout:'fit',
							items:[{
								xtype:'iconview',
								enableDrog:true,
								parentId:1,
								enableClickAddTab:true,
								width:300,
								height:200
							}]
						});
					}
					btn.win.show(btn.el);
				}
			}],
			listeners:{
				'click':function(){
					alert(1)
				}
			}
		},{
			region:'center',
			xtype:'qhtabpanel',
			ref:'tabPanel'
		}]
	});
})