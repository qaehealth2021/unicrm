/**
 * @author zhao
 * @class QH.dept.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.dept.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar,{
	objName:'CotDept',
	tbarModel:'all',
	initComponent:function(){
		this.items = [{
			xtype:'companybasecombo',
			width:90,
			isSearchField:true,
			searchName:'dept.companyId.id',
			emptyText:'公司'
		},{
  			xtype:'textfield',
			searchName:'dept.deptName',
			isSearchField:true,
			emptyText:'部门名称',
			width:90,
			maxLength:50,
			maxLengthText:'部门名称长度最大不能超过{0}'
 		},{
			xtype:'searchcombo',
			searchName:'dept.remark',
			store:this.grid.store,
			checkModified:true,
			emptyText:'备注'
		}];
		QH.dept.GridToolbar.superclass.initComponent.call(this);
	}
});
Ext.reg('depttoolbar',QH.dept.GridToolbar);
