/**
 * @author zhao
 * @class QH.boxtSolution.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.boxtSolution.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar,{
	objName:'CotBoxtSolution',
	tbarModel:'all',
	initComponent:function(){
		this.items = [{
  			xtype:'textfield',
			searchName:'boxtSolution.typeName',
			isSearchField:true,
			emptyText:'中文名',
			width:90,
			maxLength:50,
			maxLengthText:'中文名长度最大不能超过{0}'
 		},{
  			xtype:'searchcombo',
			searchName:'boxtSolution.typeNameEn',
			isSearchField:true,
			emptyText:'英文名',
			width:90,
			maxLength:100,
			maxLengthText:'英文名长度最大不能超过{0}',
			store:this.grid.store,
			checkModified:true
 		}];
		QH.boxtSolution.GridToolbar.superclass.initComponent.call(this);
	}
});
Ext.reg('boxtsolutiontoolbar',QH.boxtSolution.GridToolbar);
