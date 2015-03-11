/**
 * @author zhao
 * @class QH.popedomRecord.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.popedomRecord.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	initComponent:function(){
		var grid = this;
		this.store = new QH.popedomRecord.Store();
		this.columns = [{
			header:'',
			editor:{
				maxLength:10,
				maxLengthText:'长度最大不能超过{0}'
			},
			dataIndex:'id'
		},{
			header:'数据的来源模块(用.do来表示)',
			editor:{
				xtype:'textfield',
				maxLength:30,
				maxLengthText:'数据的来源模块(用.do来表示)长度最大不能超过{0}'
			},
			dataIndex:'module'
		},{
			header:'',
			editor:{
				xtype:'textfield',
				maxLength:32,
				maxLengthText:'长度最大不能超过{0}'
			},
			dataIndex:'primaryId'
		},{
			header:'',
			editor:{
				maxLength:10,
				maxLengthText:'长度最大不能超过{0}'
			},
			dataIndex:'empsId'
		}];
		
		this.tbar = {
			xtype:'popedomrecordtoolbar',
			grid:this
		}
		
		QH.popedomRecord.GridPanel.superclass.initComponent.call(this);
	}
});
Ext.reg('popedomrecordgrid',QH.popedomRecord.GridPanel);
