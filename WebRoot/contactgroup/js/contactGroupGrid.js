/**
 * @author zhao
 * @class QH.contactGroup.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.contactGroup.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	editorDisable:true,
	tbarCfg:{
		objName:'CotContactGroup',
		tbarModel:'all',
		listeners:{
			'beforeadddata':{
				fn:function(tbar,defaultData){
					var groupWin = new QH.contactGroup.GroupWin({
						grid:tbar.grid
					});
					groupWin.show();
					return false;
				}
			}
		}
	},
	initComponent:function(){
		var grid = this;
		this.store = new QH.contactGroup.Store();
		this.columns = [{
			header:'id',
			dataIndex:'id',
			hidden:true
		},{
			header:'组名',
			editor:{
				xtype:'textfield',
				maxLength:20,
				maxLengthText:'组名长度最大不能超过{0}'
			},
			dataIndex:'groupName'
		}
//		,
//		{
//			header:'业务员',
//			editor:{
//				xtype:'empbasecombo',
//				allowBlank:false
//			},
//			dataIndex:'empsId',
//			renderer:function(value){
//				return empsMap[value];			
//			}
//		}
		];
		
		this.tbar = {
			xtype:'contactgrouptoolbar',
			grid:this
		}
		
		QH.contactGroup.GridPanel.superclass.initComponent.call(this);
		this.on("rowdblclick",function(grid,rowIndex,e){
			this.updateData();
		},this);
		this.on("rowclick",function(grid,rowIndex,e){
			if(!$('modId')){
				var tbar = grid.getTopToolbar();
				if(tbar.getPersonText() != null){
					tbar.groupsend.setDisabled(false);
				}
				var record = grid.getSelectionModel().getSelected();
				this.loadDetail(record.get('id'));
			}
		},this);
		
	},
	updateData:function(){
		var grid = this;
		var record = grid.getSelectionModel().getSelected();
		var tbar = this.getTopToolbar();
		var field = tbar.getPersonText();
		if(field){
			tbar.addToGroupSend();
		}else{
			var group = new CotContactGroup();
			group.groupName = record.get('groupName');
			group.empsId = record.get('empsId');
			group.id = record.get('id');
			var groupWin = new QH.contactGroup.GroupWin({
				grid:grid,
				contactGroup:group
			});
			groupWin.show();
		}
	},
	loadDetail:function(groupId){
		var detailGrid = QH_VIEWPORT.getGroupDetailPanel();
		detailGrid.getStore().setBaseParam('contactGroupDetail.groupId.id',groupId);
		detailGrid.getStore().load();
	}
});
Ext.reg('contactgroupgrid',QH.contactGroup.GridPanel);
