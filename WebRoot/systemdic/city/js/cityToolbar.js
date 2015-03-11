/**
 * @author zhao
 * @class QH.city.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.city.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar,{
	objName:'CotCity',
	tbarModel:'all',
	initComponent:function(){
		this.items = [{
			xtype:'searchcombo',
			searchName:'city.cityName',
			store:this.grid.store,
			checkModified:true,
			emptyText:'省份名称'
		}];
		QH.city.GridToolbar.superclass.initComponent.call(this);
	}
});
Ext.reg('citytoolbar',QH.city.GridToolbar);
