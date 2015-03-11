/**
 * @author zhao
 * @class QH.nation.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.nation.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	initComponent:function(){
		var grid = this;
		this.store = new QH.nation.Store();
		this.columns = [{
			header:'洲',
			editor:{
				xtype:'areabasecombo'
			},
			renderIndex:'areaId.areaName',
			dataIndex:'areaId.id'
		},{
			header:'国家缩写',
			editor:{
				xtype:'textfield',
				maxLength:10,
				maxLengthText:'国家缩写长度最大不能超过{0}'
			},
			dataIndex:'nationShort'
		},{
			header:'国家中文',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'国家中文长度最大不能超过{0}'
			},
			dataIndex:'nationCn'
		},{
			header:'国家英文',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'国家英文长度最大不能超过{0}'
			},
			dataIndex:'nationName'
		},{
			header:'国家代码',
			editor:{
				xtype:'textfield',
				maxLength:10,
				maxLengthText:'国家代码长度最大不能超过{0}'
			},
			dataIndex:'nationCode'
		},{
			header:'备注',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'备注长度最大不能超过{0}'
			},
			dataIndex:'nationRemark'
		}];
		
		this.tbar = {
			xtype:'nationtoolbar',
			grid:this
		}
		
		QH.nation.GridPanel.superclass.initComponent.call(this);
	}
});
Ext.reg('nationgrid',QH.nation.GridPanel);
