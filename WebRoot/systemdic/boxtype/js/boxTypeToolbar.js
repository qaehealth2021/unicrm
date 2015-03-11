/**
 * @author zhao
 * @class QH.boxType.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.boxType.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar,{
	objName:'CotBoxType',
	tbarModel:'all',
	initComponent:function(){
		this.items = [{
  			xtype:'textfield',
			searchName:'boxType.typeName',
			isSearchField:true,
			emptyText:'名称',
			width:90,
			maxLength:20,
			maxLengthText:'名称长度最大不能超过{0}'
 		},{
  			xtype:'searchcombo',
			searchName:'boxType.typeRemark',
			isSearchField:true,
			emptyText:'备注',
			width:90,
			store:this.grid.store,
			checkModified:true,
			maxLength:100,
			maxLengthText:'备注长度最大不能超过{0}'
 		}];
		QH.boxType.GridToolbar.superclass.initComponent.call(this);
	}
});
Ext.reg('boxtypetoolbar',QH.boxType.GridToolbar);
