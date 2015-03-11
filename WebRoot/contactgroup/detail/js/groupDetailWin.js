QH.contactGroupDetail.GroupDetailWin = Ext.extend(Ext.Window,{
	grid:null,
	initComponent:function(){
		var _self = this;
		this.title = '分组明细';
		this.closeAction = 'close';
		this.layout = 'fit';
		this.width = 600;
		this.height = 450,
		this.items = [{
			xtype:'contactgrid',
			showUsefulCol:true,
			ref:'contactgrid',
			flag:'C'
		}]
		this.buttonAlign = 'center'
		this.fbar = [{
			text:'保存',
			handler:_self.addToGroupDetail.createDelegate(_self,[])
		}]
		QH.contactGroupDetail.GroupDetailWin.superclass.initComponent.call(this);
	},
	addToGroupDetail:function(){
		var contactGrid = this.contactgrid;
		var _self = this;
		var ids = contactGrid.getSelectionIds();
		var groupGrid = QH_VIEWPORT.getGroupPanel();
		var rec = groupGrid.getSelectionModel().getSelected();
		if(rec == null){
			window.alertMsg("请选择一个分组");
			return;
		}
		var groupId = rec.get('id');
		if(ids.length == 0){
			window.alertMsg("请选择需要分组的联系人");
			return;
		}
		cotContactService.addToContactGroupDetail(groupId,ids,function(res){
			_self.grid.getStore().reload();
		});
		this.close();	
	}
})