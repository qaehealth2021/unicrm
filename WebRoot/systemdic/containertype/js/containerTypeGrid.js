/**
 * @author zhao
 * @class QH.containerType.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.containerType.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	initComponent:function(){
		var grid = this;
		this.store = new QH.containerType.Store();
		this.columns = [{
			header:'id',
			dataIndex:'id',
			hidden:true,
			editor:{
				maxLength:10,
				maxLengthText:'长度最大不能超过{0}'
			}
		},{
			header:'集装箱类型',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'集装箱类型长度最大不能超过{0}'
			},
			dataIndex:'containerName'
		},{
			header:'柜体积',
			editor:{
				decimalPrecision:4,
				minValue:1.0E-4,
				minText:'柜体积最小值不能小于{0}',
				maxValue:9999.9999,
				maxText:'柜体积最大值不能超过{0}'
			},
			dataIndex:'containerCube'
		},{
			header:'备注',
			editor:{
				xtype:'textfield',
				maxLength:200,
				maxLengthText:'备注长度最大不能超过{0}'
			},
			dataIndex:'containerRemark'
		},{
			header:'集装箱可载重',
			editor:{
				decimalPrecision:4,
				minValue:1.0E-4,
				minText:'集装箱可载重最小值不能小于{0}',
				maxValue:9999.9999,
				maxText:'集装箱可载重最大值不能超过{0}'
			},
			dataIndex:'containerWeigh'
		}];
		
		this.tbar = {
			xtype:'containertypetoolbar',
			grid:this
		}
		
		QH.containerType.GridPanel.superclass.initComponent.call(this);
	}
});
Ext.reg('containertypegrid',QH.containerType.GridPanel);
