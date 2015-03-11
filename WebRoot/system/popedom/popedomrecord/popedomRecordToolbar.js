/**
 * @author zhao
 * @class QH.popedomRecord.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.popedomRecord.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar,{
	objName:'CotPopedomRecord',
	tbarModel:'all',
	initComponent:function(){
		this.items = [{
  			xtype:'textfield',
			searchName:'popedomRecord.module',
			isSearchField:true,
			emptyText:'数据的来源模块(用.do来表示)',
			width:90,
			maxLength:30,
			maxLengthText:'数据的来源模块(用.do来表示)长度最大不能超过{0}'
 		},{
			xtype:'searchcombo',
			searchName:'popedomRecord.empsId',
			store:this.grid.store,
			checkModified:true,
			emptyText:''
		}];
		QH.popedomRecord.GridToolbar.superclass.initComponent.call(this);
	}
});
Ext.reg('popedomrecordtoolbar',QH.popedomRecord.GridToolbar);
