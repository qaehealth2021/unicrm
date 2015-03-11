/**
 * @author zhao
 * @class QH.moduleFun.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.moduleFun.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	tbarCfg:{
		objName:'CotModuleFun',
		tbarModel:'all'
	},
	initComponent:function(){
		var grid = this;
		this.store = new QH.moduleFun.Store();
		this.columns = [{
			header:'功能名',
			editor:{
				xtype:'textfield',
				allowBlank:false,
				maxLength:50,
				maxLengthText:'功能名长度最大不能超过{0}'
			},
			dataIndex:'funName'
		},{
			header:'功能权限判断',
			editor:{
				xtype:'textfield',
				allowBlank:false,
				maxLength:100,
				maxLengthText:'功能权限判断长度最大不能超过{0}'
			},
			dataIndex:'funValidurl'
		},{
			header:'功能',
			editor:{
				xtype:'textfield',
				maxLength:16,
				maxLengthText:'图标长度最大不能超过{0}'
			},
			dataIndex:'funType'
		},{
			header:'图标',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'图标长度最大不能超过{0}'
			},
			dataIndex:'funIcon'
		}];
		
		this.tbar = {
			xtype:'modulefuntoolbar',
			grid:this,
			editorDisable:this.editorDisable
		}
		
		QH.moduleFun.GridPanel.superclass.initComponent.call(this);
	}
});
Ext.reg('modulefungrid',QH.moduleFun.GridPanel);
