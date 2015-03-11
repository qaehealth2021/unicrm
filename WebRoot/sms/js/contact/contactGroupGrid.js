/**
 * @author zhao
 * @class QH.contactGroup.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.contactGroup.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	editorDisable:true,
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
		];
		
		this.tbar = {
			xtype:'contactgrouptoolbar',
			grid:this
		}
		
		QH.contactGroup.GridPanel.superclass.initComponent.call(this);
		this.on("rowdblclick",function(grid,rowIndex,e){
			this.updateData();
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
	}
});
Ext.reg('contactgroupgrid',QH.contactGroup.GridPanel);
