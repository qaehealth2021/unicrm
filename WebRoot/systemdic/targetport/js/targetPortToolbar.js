/**
 * @author zhao
 * @class QH.targetPort.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.targetPort.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar,{
	objName:'CotTargetPort',
	tbarModel:'all',
	initComponent:function(){
		this.items = [{
  			xtype:'textfield',
			searchName:'targetPort.targetPortName',
			isSearchField:true,
			emptyText:'目的港中文名称',
			width:90,
			maxLength:100,
			maxLengthText:'目的港中文名称长度最大不能超过{0}'
 		},{
  			xtype:'textfield',
			searchName:'targetPort.targetPortNameEn',
			isSearchField:true,
			emptyText:'目的港英文名称',
			width:90,
			maxLength:100,
			maxLengthText:'目的港英文名称长度最大不能超过{0}'
 		},{
  			xtype:'textfield',
			searchName:'targetPort.targetPortNation',
			isSearchField:true,
			emptyText:'',
			width:90,
			maxLength:100,
			maxLengthText:'长度最大不能超过{0}'
 		},{
 			hidden:true,
 			xtype:'textfield',
			searchName:'targetPort.shipingLine',
			isSearchField:true,
			emptyText:'',
			width:90,
			maxLength:100,
			maxLengthText:'长度最大不能超过{0}'
 		},{
			xtype:'searchcombo',
			searchName:'targetPort.targetPortRemark',
			store:this.grid.store,
			checkModified:true,
			emptyText:'目的港备注'
		}];
		QH.targetPort.GridToolbar.superclass.initComponent.call(this);
	}
});
Ext.reg('targetporttoolbar',QH.targetPort.GridToolbar);
