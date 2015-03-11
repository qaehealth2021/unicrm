/**
 * @author zhao
 * @class QH.targetPort.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.targetPort.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	initComponent:function(){
		var grid = this;
		this.store = new QH.targetPort.Store();
		this.columns = [{
			header:'',
			dataIndex:'id',
			hidden:true
		},{
			header:'目的港中文名称',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'目的港中文名称长度最大不能超过{0}'
			},
			dataIndex:'targetPortName'
		},{
			header:'目的港英文名称',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'目的港英文名称长度最大不能超过{0}'
			},
			dataIndex:'targetPortNameEn'
		},{
			header:'国别',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'长度最大不能超过{0}'
			},
			dataIndex:'targetPortNation'
		},{
			header:'航线',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'长度最大不能超过{0}'
			},
			dataIndex:'shipingLine'
		},{
			header:'备注',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'目的港备注长度最大不能超过{0}'
			},
			dataIndex:'targetPortRemark'
		}];
		
		this.tbar = {
			xtype:'targetporttoolbar',
			grid:this
		}
		
		QH.targetPort.GridPanel.superclass.initComponent.call(this);
	}
});
Ext.reg('targetportgrid',QH.targetPort.GridPanel);
