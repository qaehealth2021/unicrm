/**
 * @author zhao
 * @class QH.shipPort.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.shipPort.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar,{
	objName:'CotShipPort',
	tbarModel:'all',
	initComponent:function(){
		this.items = [{
  			xtype:'textfield',
			searchName:'shipPort.shipPortName',
			isSearchField:true,
			emptyText:'起运港中文名称',
			width:90,
			maxLength:100,
			maxLengthText:'起运港中文名称长度最大不能超过{0}'
 		},{
  			xtype:'textfield',
			searchName:'shipPort.shipPortNameEn',
			isSearchField:true,
			emptyText:'起运港英文名称',
			width:90,
			maxLength:100,
			maxLengthText:'起运港英文名称长度最大不能超过{0}'
 		},{
			xtype:'searchcombo',
			searchName:'shipPort.shipPortRemark',
			store:this.grid.store,
			checkModified:true,
			emptyText:'起运港备注'
		}];
		QH.shipPort.GridToolbar.superclass.initComponent.call(this);
	}
});
Ext.reg('shipporttoolbar',QH.shipPort.GridToolbar);
