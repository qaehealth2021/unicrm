/**
 * @author zhao
 * @class QH.eleOther.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.eleOther.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar,{
	objName:'CotEleOther',
	tbarModel:'all',
	initComponent:function(){
		this.items = [{
  			xtype:'textfield',
			searchName:'eleOther.cnName',
			isSearchField:true,
			emptyText:'中文名称',
			width:80,
			maxLength:200,
			maxLengthText:'中文名称长度最大不能超过{0}'
 		},{
  			xtype:'textfield',
			searchName:'eleOther.enName',
			isSearchField:true,
			emptyText:'英文名称',
			width:80,
			maxLength:200,
			maxLengthText:'英文名称长度最大不能超过{0}'
 		},{
  			xtype:'textfield',
			searchName:'eleOther.hscode',
			isSearchField:true,
			emptyText:'海关编码',
			width:80,
			maxLength:50,
			maxLengthText:'海关编码长度最大不能超过{0}'
 		},{
			hidden:true,
			xtype:'numberfield',
			searchName:'eleOther.taxRate',
			isSearchField:true,
			emptyText:'退税率',
			width:90,
			decimalPrecision:1,
			maxValue:99.9,
			maxText:'退税率最大值不能超过{0}'
 		},{
			xtype:'searchcombo',
			searchName:'eleOther.remark',
			store:this.grid.store,
			checkModified:true,
			emptyText:'备注'
		}];
		QH.eleOther.GridToolbar.superclass.initComponent.call(this);
	}
});
Ext.reg('eleothertoolbar',QH.eleOther.GridToolbar);
