/**
 * @author zhao
 * @class QH.area.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.area.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar,{
	objName:{
		name:'CotArea'
	},
	tbarModel:'all',
	initComponent:function(){
		this.items = [{
  			xtype:'textfield',
			searchName:'area.areaName',
			isSearchField:true,
			emptyText:'洲名',
			width:90,
			maxLength:100,
			maxLengthText:'洲名长度最大不能超过{0}'
 		},{
			xtype:'searchcombo',
			searchName:'area.remark',
			store:this.grid.store,
			checkModified:true,
			emptyText:'备注'
		}];
		QH.area.GridToolbar.superclass.initComponent.call(this);
	}
});
Ext.reg('areatoolbar',QH.area.GridToolbar);
