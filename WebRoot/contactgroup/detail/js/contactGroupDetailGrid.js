/**
 * @author zhao
 * @class QH.contactGroupDetail.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.contactGroupDetail.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	editorDisable:true,
	tbarCfg:{
		objName:'CotContactGroupDetail',
		tbarModel:'all',
		listeners:{
			'beforeadddata':{
				fn:function(tbar,defaultData){
					var groupDetailWin = new QH.contactGroupDetail.GroupDetailWin({
						grid:tbar.grid
					});
					groupDetailWin.show();
					return false;
				}
			}
		}
	},
	initComponent:function(){
		var grid = this;
		this.store = new QH.contactGroupDetail.Store();
		this.columns = [{
			header:'ID',
			dataIndex:'id',
			hidden:true
		},{
			header:'联系人',
			dataIndex:'contactId.contactPerson'
		},{
			header:'邮箱',
			dataIndex:'contactId.contactEmail'
		},{
			header:'手机',
			dataIndex:'contactId.contactMobile'
		}
		];
		
//		this.tbar = {
//			xtype:'contactgroupdetailtoolbar',
//			grid:this
//		}
		
		QH.contactGroupDetail.GridPanel.superclass.initComponent.call(this);
	}
});
Ext.reg('contactgroupdetailgrid',QH.contactGroupDetail.GridPanel);
