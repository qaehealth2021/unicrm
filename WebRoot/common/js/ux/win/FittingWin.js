Ext.namespace('QH.fittings');

/**
 * 配件查询窗口
 * queryBar 传入new Ext.Toolbar 调用模块的工具栏,如果没有,默认只有一个"导入"按钮的工具栏
 * 调用;var win=new QH.ux.win.FittingWin({
 listeners:{
 'importselection':function(grid,sm){
 var rec=sm.getSelections(); 
 ....
 }
 }
 });
 * @class QH.ux.win.FittingWin
 * @extends Ext.Window
 */
QH.ux.win.FittingWin = Ext.extend(Ext.Window, {
			title : '配件查询',
			layout : 'fit',
			modal : true,
			constrainHeader : true,
			width : 800,
			height : 500,
			queryBar : '',
			initComponent : function() {
				var win = this;
				this.items = [{
					xtype:'fittingsgrid',
					ref:'gridPanel',
					queryMol:true,
					queryBar:win.queryBar
				}];
				QH.ux.win.FittingWin.superclass.initComponent.call(this);
				this.addEvents(
						/**
						 * @event importselection
						 * 点击表格导入时
						 * @param {Grid} this
						 * @param {SelectionModel} selModel
						 */
						'importselection');
			}
		});
Ext.reg("fittingquerywin",QH.ux.win.FittingWin)