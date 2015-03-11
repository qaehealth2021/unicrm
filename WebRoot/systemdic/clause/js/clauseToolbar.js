/**
 * @author zhao
 * @class QH.clause.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.clause.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar,{
	objName:'CotClause',
	tbarModel:'all',
	initComponent:function(){
		this.items = [{
  			xtype:'textfield',
			searchName:'clause.clauseName',
			isSearchField:true,
			emptyText:'价格条款',
			width:90,
			maxLength:100,
			maxLengthText:'价格条款长度最大不能超过{0}'
 		},{
  			xtype:'textfield',
			searchName:'clause.clauseRemark',
			isSearchField:true,
			emptyText:'价格条款备注',
			width:90,
			maxLength:200,
			maxLengthText:'价格条款备注长度最大不能超过{0}'
 		},{
			xtype:'searchcombo',
			searchName:'clause.calId',
			store:this.grid.store,
			checkModified:true,
			emptyText:''
		}];
		QH.clause.GridToolbar.superclass.initComponent.call(this);
	}
});
Ext.reg('clausetoolbar',QH.clause.GridToolbar);
