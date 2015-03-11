/**
 * @author zhao
 * @class QH.contactGroupDetail.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.contactGroupDetail.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar,{
	objName:'CotContactGroupDetail',
	tbarModel:'all',
	initComponent:function(){
		this.items = [{
			xtype:'searchcombo',
			searchName:'contactGroupDetail.contactId',
			store:this.grid.store,
			checkModified:true,
			emptyText:'联系人ID'
		}];
		QH.contactGroupDetail.GridToolbar.superclass.initComponent.call(this);
	}
});
Ext.reg('contactgroupdetailtoolbar',QH.contactGroupDetail.GridToolbar);
