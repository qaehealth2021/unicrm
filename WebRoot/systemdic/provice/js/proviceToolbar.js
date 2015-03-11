/**
 * @author zhao
 * @class QH.provice.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.provice.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar,{
	objName:'CotProvice',
	tbarModel:'all',
	initComponent:function(){
		this.items = [new QH.controls.NationBaseCombo({emptyText : '国家',
									searchName : 'provice.nationId.id'}),{
  			xtype:'textfield',
			searchName:'provice.provinceName',
			isSearchField:true,
			emptyText:'省州名称',
			width:90,
			maxLength:100,
			maxLengthText:'长度最大不能超过{0}'
 		},{
 			xtype:'searchcombo',
			searchName:'provice.provinceRemark',
			store:this.grid.store,
			checkModified:true,
			emptyText:'备注'
		}];
		QH.provice.GridToolbar.superclass.initComponent.call(this);
	}
});
Ext.reg('provicetoolbar',QH.provice.GridToolbar);
