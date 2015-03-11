/**
 * @author zhao
 * @class QH.sysLog.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.sysLog.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	editorDisable:true,
	initComponent:function(){
		var grid = this;
		this.store = new QH.sysLog.Store();
		this.columns = [{
			header:'ID',
			dataIndex:'id',
			hidden:true
		},{
			header:'操作日志',
			dataIndex:'opMessage'
		},{
			header:'操作时间',
			dataIndex:'opTime',
			renderer:Ext.util.Format.dateRenderer('Y-m-d H:i:s')
		},{
			header:'操作类型',
			dataIndex:'opType',
			renderer:function(value){
				return value == 0?'登录':'登出'
			}
		},{
			header:'IP',
			dataIndex:'opModule'
		},{
			header:'员工',
			dataIndex:'empsId.empsId'
		}];
		
		this.tbar = {
			xtype:'syslogtoolbar',
			grid:this,
			editorDisable:this.editorDisable,
			hiddenAddBtn:true,
			hiddenDelBtn:true
		}
		
		QH.sysLog.GridPanel.superclass.initComponent.call(this);
	}
});
Ext.reg('sysloggrid',QH.sysLog.GridPanel);
