/**
 * @author zhao
 * @class QH.containerType.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.containerType.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar,{
	objName:'CotContainerType',
	tbarModel:'all',
	initComponent:function(){
		this.items = [{
  			xtype:'textfield',
			searchName:'containerType.containerName',
			isSearchField:true,
			emptyText:'集装箱名称',
			width:90
 		},{
			xtype:'searchcombo',
			searchName:'containerType.containerWeigh',
			store:this.grid.store,
			checkModified:true,
			emptyText:'集装箱可载重'
		}];
		QH.containerType.GridToolbar.superclass.initComponent.call(this);
	}
});
Ext.reg('containertypetoolbar',QH.containerType.GridToolbar);
