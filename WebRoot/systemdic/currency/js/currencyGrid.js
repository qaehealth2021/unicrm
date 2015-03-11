/**
 * @author zhao
 * @class QH.currency.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.currency.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	initComponent:function(){
		var grid = this;
		this.store = new QH.currency.Store();
		this.columns = [{
			header:'',
			hidden:true,
			dataIndex:'id'
		},{
			header:'币种中文名称',
			editor:{
				xtype:'textfield',
				maxLength:50,
				maxLengthText:'币种中文名称长度最大不能超过{0}'
			},
			dataIndex:'curName'
		},{
			header:'币种英文名称',
			editor:{
				xtype:'textfield',
				maxLength:50,
				maxLengthText:'币种英文名称长度最大不能超过{0}'
			},
			dataIndex:'curNameEn'
		},{
			header:'币种单位',
			editor:{
				xtype:'textfield',
				maxLength:50,
				maxLengthText:'币种单位长度最大不能超过{0}'
			},
			dataIndex:'curUnit'
		},{
			header:'汇率',
			editor:{
				decimalPrecision:2,
				minValue:0.01,
				minText:'汇率最小值不能小于{0}',
				maxValue:99.99,
				maxText:'汇率最大值不能超过{0}'
			},
			dataIndex:'curRate'
		}];
		
		this.tbar = {
			xtype:'currencytoolbar',
			grid:this
		}
		
		QH.currency.GridPanel.superclass.initComponent.call(this);
	}
});
Ext.reg('currencygrid',QH.currency.GridPanel);
