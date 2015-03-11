/**
 * @author zhao
 * @class QH.currency.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.currency.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar,{
	objName:'CotCurrency',
	tbarModel:'all',
	initComponent:function(){
		this.items = [{
  			xtype:'textfield',
			searchName:'currency.curName',
			isSearchField:true,
			emptyText:'币种中文名称',
			width:90,
			maxLength:50,
			maxLengthText:'币种中文名称长度最大不能超过{0}'
 		},{
  			xtype:'textfield',
			searchName:'currency.curNameEn',
			isSearchField:true,
			emptyText:'币种英文名称',
			width:90,
			maxLength:50,
			maxLengthText:'币种英文名称长度最大不能超过{0}'
 		},{
  			xtype:'textfield',
			searchName:'currency.curUnit',
			isSearchField:true,
			emptyText:'币种单位',
			width:90,
			maxLength:50,
			maxLengthText:'币种单位长度最大不能超过{0}'
 		},{
			xtype:'searchcombo',
			searchName:'currency.curRate',
			store:this.grid.store,
			checkModified:true,
			emptyText:'汇率'
		}];
		QH.currency.GridToolbar.superclass.initComponent.call(this);
	}
});
Ext.reg('currencytoolbar',QH.currency.GridToolbar);
