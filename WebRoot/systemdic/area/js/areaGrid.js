/**
 * @author zhao
 * @class QH.area.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.area.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	initComponent:function(){
		var grid = this;
		this.store = new QH.area.Store();
		this.columns = [{
			header:'洲名',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'洲名长度最大不能超过{0}'
			},
			dataIndex:'areaName'
		},{
			header:'备注',
			editor:{
				xtype:'textfield',
				maxLength:200,
				maxLengthText:'备注长度最大不能超过{0}'
			},
			dataIndex:'remark'
		}];
		
		this.tbar = {
			xtype:'areatoolbar',
			grid:this
		}
		
		QH.area.GridPanel.superclass.initComponent.call(this);
	}
});
Ext.reg('areagrid',QH.area.GridPanel);
