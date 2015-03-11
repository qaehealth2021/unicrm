Ext.namespace('QH.elementsNew');
$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_GRID);

$importKey(IMPORT_FACTORY_COMBO);
$importKey(IMPORT_DIC_COMBO);
$importKey(IMPORT_ELEOTHER_COMBO);

$importKeyCss(IMPORT_PIC_CSS);
$importKey(IMPORT_DRAG);

$import('elementsNew/js/elementsNewStore.js');
$import('elementsNew/js/elementsNewGrid.js');
$import('elementsNew/js/elementsNewToolbar.js');
$import('elementsNew/js/elementsNewQueryForm.js');
$import('elementsNew/js/elementsNewPicPanel.js');
/**
 * 样品查询窗口
 * queryBar 传入new Ext.Toolbar 调用模块的工具栏,如果没有,默认只有一个"导入"按钮的工具栏
 * 调用;var win=new QH.ux.win.ElementWin({
 listeners:{
 'importselection':function(grid,records){
 ....
 }
 }
 });
 * @class QH.ux.win.ElementWin
 * @extends Ext.Window
 */
QH.ux.win.ElementWin = Ext.extend(Ext.Window, {
			title : '产品查询',
			layout : 'border',
			modal : true,
			constrainHeader : true,
			width : 800,
			height : 500,
			queryBar : '',
			initComponent : function() {
				var win = this;
				this.items = [{
							xtype : 'elementsqueryform',
							width : 200,
							region : 'west',
							margins : '0 5 0 0',
							collapsible : true
						}, {
							layout : 'card',
							region : 'center',
							ref : 'centerPanel',
							border : false,
							cls : 'leftBorder',
							activeItem : 0,
							defaults : {
								border : false
							},
							items : [{
										xtype : 'elementsnewgrid',
										ref : 'gridPanel',
										queryMol:true,
										queryBar:win.queryBar
									}, {
										xtype : 'elementsnewpic',
										ref : 'picPanel',
										queryMol:true
									}]
						}];
				QH.ux.win.ElementWin.superclass.initComponent.call(this);
				this.addEvents(
						/**
						 * @event importselection
						 * 点击表格导入时
						 * @param {Grid} this
						 * @param {Array} records
						 */
						'importselection');
			}
		});
Ext.reg("elementquerywin",QH.ux.win.ElementWin)