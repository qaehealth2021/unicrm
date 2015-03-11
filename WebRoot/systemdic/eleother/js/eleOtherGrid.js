/**
 * @author zhao
 * @class QH.eleOther.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.eleOther.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	initComponent:function(){
		var grid = this;
		this.store = new QH.eleOther.Store();
		this.columns = [{
			header:'id',
			hidden:true,
			dataIndex:'id'
		},{
			header:'中文名称',
			editor:{
				xtype:'textfield',
				maxLength:200,
				maxLengthText:'中文名称长度最大不能超过{0}'
			},
			dataIndex:'cnName'
		},{
			header:'英文名称',
			editor:{
				xtype:'textfield',
				maxLength:200,
				maxLengthText:'英文名称长度最大不能超过{0}'
			},
			dataIndex:'enName'
		},{
			header:'海关编码',
			editor:{
				xtype:'textfield',
				maxLength:50,
				maxLengthText:'海关编码长度最大不能超过{0}'
			},
			dataIndex:'hscode'
		},{
			header:'退税率',
			editor:{
				decimalPrecision:1,
				minValue:0.1,
				minText:'退税率最小值不能小于{0}',
				maxValue:9.9,
				maxText:'退税率最大值不能超过{0}'
			},
			dataIndex:'taxRate'
		},{
			header:'备注',
			editor:{
				xtype:'textfield',
				maxLength:500,
				maxLengthText:'备注长度最大不能超过{0}'
			},
			dataIndex:'remark'
		}];
		
		this.tbar = {
			xtype:'eleothertoolbar',
			grid:this
		}
		
		QH.eleOther.GridPanel.superclass.initComponent.call(this);
	}
});
Ext.reg('eleothergrid',QH.eleOther.GridPanel);
