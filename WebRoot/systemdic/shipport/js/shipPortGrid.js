/**
 * @author zhao
 * @class QH.shipPort.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.shipPort.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	initComponent:function(){
		var grid = this;
		this.store = new QH.shipPort.Store();
		this.columns = [{
			header:'',
			hidden:true,
			dataIndex:'id'
		},{
			header:'起运港中文名称',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'起运港中文名称长度最大不能超过{0}'
			},
			dataIndex:'shipPortName'
		},{
			header:'起运港英文名称',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'起运港英文名称长度最大不能超过{0}'
			},
			dataIndex:'shipPortNameEn'
		},{
			header:'起运港备注',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'起运港备注长度最大不能超过{0}'
			},
			dataIndex:'shipPortRemark'
		}];
		
		this.tbar = {
			xtype:'shipporttoolbar',
			grid:this
		}
		
		QH.shipPort.GridPanel.superclass.initComponent.call(this);
	}
});
Ext.reg('shipportgrid',QH.shipPort.GridPanel);
