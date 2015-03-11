/**
 * @author zhao
 * @class QH.sysLog.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.sysLog.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar,{
	objName:'CotSysLog',
	tbarModel:'all',
	initComponent:function(){
		this.items = [{
  			xtype:'textfield',
			searchName:'sysLog.empsId.id',
			isSearchField:true,
			emptyText:'业务员',
			width:90
 		},{
  			xtype:'datefield',
			id:'startOpTimeId',
			endDateId:'endOpTimeId',
			searchName:'startOpTime',
			isSearchField:true,
			vtype:'daterange',
			emptyText:'操作时间',
			width:100
		},{
			xtype:'datefield',
			vtype:'daterange',
			id:'endOpTimeId',
			startDateId:'startOpTimeId',
			searchName:'endOpTime',
			isSearchField:true,
			emptyText:'操作时间',
			width:100
 		},{
			xtype:'searchcombo',
			searchName:'sysLog.opMessage',
			store:this.grid.store,
			checkModified:true,
			emptyText:'内容'
			
		}];
		QH.sysLog.GridToolbar.superclass.initComponent.call(this);
	}
});
Ext.reg('syslogtoolbar',QH.sysLog.GridToolbar);
