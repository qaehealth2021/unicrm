/**
 * @author zhao
 * @class QH.boxType.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.boxType.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	initComponent:function(){
		var grid = this;
		this.store = new QH.boxType.Store();
		this.columns = [{
			header:'id',
			hidden:true,
			dataIndex:'id'
		},{
			header:'名称',
			editor:{
				xtype:'textfield',
				maxLength:20,
				maxLengthText:'名称长度最大不能超过{0}'
			},
			dataIndex:'typeName'
		},{
			header:'备注',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'备注长度最大不能超过{0}'
			},
			dataIndex:'typeRemark'
		}];
		
		this.tbar = {
			xtype:'boxtypetoolbar',
			grid:this
		}
		
		QH.boxType.GridPanel.superclass.initComponent.call(this);
	}
});
Ext.reg('boxtypegrid',QH.boxType.GridPanel);
