/**
 * @author zhao
 * @class QH.clause.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.clause.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	initComponent:function(){
		var grid = this;
		this.store = new QH.clause.Store();
		this.columns = [{
			header:'',
			hidden:true,
			dataIndex:'id'
		},{
			header:'价格条款',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'价格条款长度最大不能超过{0}'
			},
			dataIndex:'clauseName'
		},{
			header:'价格条款备注',
			editor:{
				xtype:'textfield',
				maxLength:200,
				maxLengthText:'价格条款备注长度最大不能超过{0}'
			},
			dataIndex:'clauseRemark'
		},{
			header:'',
			editor:{
				maxLength:10,
				maxLengthText:'长度最大不能超过{0}'
			},
			dataIndex:'calId'
		}];
		
		this.tbar = {
			xtype:'clausetoolbar',
			grid:this
		}
		
		QH.clause.GridPanel.superclass.initComponent.call(this);
	}
});
Ext.reg('clausegrid',QH.clause.GridPanel);
