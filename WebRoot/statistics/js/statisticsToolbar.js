/**
 * @author zhao
 * @class QH.customer.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.statistics.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar,{
	objName:'CotCustomer',
	tbarModel:'all',
	hiddenAddBtn:true,
	hiddenDelBtn:true,
	initComponent:function(){
		this.items = [{
  			xtype:'empbasecombo',
			searchName:'queryEmpId',
			isSearchField:true,
			emptyText:'业务员',
			width:90
 		},{
  			xtype:'customerbasecombo',
			searchName:'queryCustId',
			isSearchField:true,
			emptyText:'客户',
			width:90
		},{
			xtype:'searchcombo',
			searchName:'orderNo',
			store:this.grid.store,
			checkModified:true,
			emptyText:'订单号'
		}];
		QH.statistics.GridToolbar.superclass.initComponent.call(this);
	}
});
Ext.reg('statisticstoolbar',QH.statistics.GridToolbar);
