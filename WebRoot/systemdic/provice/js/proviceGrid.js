/**
 * @author zhao
 * @class QH.provice.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.provice.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	initComponent:function(){
		var grid = this;
		this.store = new QH.provice.Store();
		this.columns = [{
			header:'国家',
			editor:{
				xtype:'nationbasecombo'
			},
			renderIndex:'nationId.nationShort',
			dataIndex:'nationId.id'
		},{
			header:'省州名称',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'长度最大不能超过{0}'
			},
			dataIndex:'provinceName'
		},{
			header:'备注',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'长度最大不能超过{0}'
			},
			dataIndex:'provinceRemark'
		}];
		
		this.tbar = {
			xtype:'provicetoolbar',
			grid:this
		}
		
		QH.provice.GridPanel.superclass.initComponent.call(this);
	}
});
Ext.reg('provicegrid',QH.provice.GridPanel);
