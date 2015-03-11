/**
 * @author zhao
 * @class QH.city.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.city.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	initComponent:function(){
		var grid = this;
		this.store = new QH.city.Store();
		this.columns = [{
			header:'省份名称',
			editor:{
				xtype:'textfield',
				maxLength:30,
				maxLengthText:'省份名称长度最大不能超过{0}'
			},
			dataIndex:'cityName'
		}];
		
		this.tbar = {
			xtype:'citytoolbar',
			grid:this
		}
		
		QH.city.GridPanel.superclass.initComponent.call(this);
	}
});
Ext.reg('citygrid',QH.city.GridPanel);
