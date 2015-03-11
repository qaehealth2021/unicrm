/**
 * @author zhao
 * @class QH.contact.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.contact.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar,{
	objName:'CotContact',
	tbarModel:'all',
	hiddenSaveAllBtn:true,
	hiddenRetractBtn:true,
	hiddenRetractAllBtn:true,
	listeners:{
		"beforeadddata":function(tbar){
//			openFullWindow("modify_customercontact.do?customerId="+tbar.grid.customerId+"&gridId="+tbar.grid.getId());
			openDeskWin('新增联系人',"modify_customercontact.do?customerId="+tbar.grid.customerId+"&gridId="+tbar.grid.getId());
			return false;
		}
	},
	initComponent:function(){
		var _self = this;
		this.grid.store.setBaseParam('contact.contactFlag',this.grid.flag);
		var customerId = this.grid.customerId;
		var factoryId = this.grid.factoryId;
		if(customerId != '' && customerId != null){
			this.grid.store.setBaseParam('contact.customerId.id',customerId);
		}
		if(factoryId != '' && factoryId != null){
			this.grid.store.setBaseParam('contact.factoryId.id',factoryId);
		}
		this.items = [{
  			xtype:'nationbasecombo',
			searchName:'contact.customerId.nationId.id',
			isSearchField:true,
			emptyText:'国家',
			width:90
		},{
  			xtype:'customerbasecombo',
			searchName:'contact.customerId.id',
			isSearchField:true,
			hidden:this.grid.flag=='C'?false:true,
			emptyText:'客户',
			width:90
		},{
  			xtype:'empbasecombo',
			searchName:'contact.empsId.id',
			isSearchField:true,
			hidden:this.grid.showUsefulCol,
			emptyText:'跟进人',
			width:90
 		},{
  			xtype:'textfield',
			searchName:'contact.contactNbr',
			hidden:this.grid.showUsefulCol,
			isSearchField:true,
			emptyText:'电话',
			width:90,
			maxLength:100,
			maxLengthText:'电话长度最大不能超过{0}'
 		},{
  			xtype:'textfield',
			searchName:'contact.contactEmail',
			isSearchField:true,
			emptyText:'邮箱',
			hidden:this.grid.showUsefulCol,
			width:90,
			maxLength:100,
			maxLengthText:'邮箱长度最大不能超过{0}'
 		},{
 			hidden:true,
 			xtype:'textfield',
			searchName:'contact.contactDuty',
			isSearchField:true,
			emptyText:'职位',
			width:90,
			maxLength:50,
			maxLengthText:'职位长度最大不能超过{0}'
 		},{
 			hidden:true,
 			xtype:'textfield',
			searchName:'contact.contactFax',
			isSearchField:true,
			emptyText:'传真',
			width:90,
			maxLength:100,
			maxLengthText:'传真长度最大不能超过{0}'
 		},{
 			hidden:true,
 			xtype:'textfield',
			searchName:'contact.contactMobile',
			isSearchField:true,
			emptyText:'手机',
			width:90,
			maxLength:100,
			maxLengthText:'长度最大不能超过{0}'
 		},{
			xtype:'searchcombo',
			searchName:'contact.contactPerson',
			store:this.grid.store,
			//hidden:this.grid.showUsefulCol,
			checkModified:true,
			emptyText:'联系人'
		},"->",{
			text:'加入组',
			iconCls:'page_allocated',
			hidden:$('modId')?false:true,//只在客户页面显示
			handler:this.addToGroup.createDelegate(_self)
		},{
			text:'导出',
			cls:'SYSOP_EXCEL',
			iconCls:'excel_out',
			handler:this.exportSelectCust.createDelegate(this)
		}];
		QH.contact.GridToolbar.superclass.initComponent.call(this);
	},
	addToGroup:function(){
		var _self = this;
		var win = new Ext.Window({
			title:'加入群发组',
			layout:'fit',
			width:400,
			height:300,
			closeAction:'close',
			fbar:[{
				text:'保存',
				handler:function(){
					var grid = win.contactgroupgrid
					var groupRec = grid.getSelectionModel().getSelected();
					var ids = _self.grid.getSelectionIds();
					if(ids.lengt == 0 || groupRec == null){
						window.alertMsg('请选择联系人或者组');
						return;
					}
					mask('正在关联组,请等待...');
					cotContactService.addToContactGroupDetail(groupRec.id,ids,function(res){
						window.alertMsg('加入成功')
						win.close();
						unmask();
					})
				}
			}],
			buttonAlign:'center',
			items:[{
				xtype:'contactgroupgrid',
				ref:'contactgroupgrid'
			}]
		});
		win.show();
	},
	exportSelectCust:function() {
		var list = this.grid.getSelectionIds();
		if (list.length == 0) {
			Ext.Msg.alert("提示信息", "请先选择要导出的客户联系人!");
			return;
		}
		var str = "";
		for (var i = 0; i < list.length; i++) {
			var rec = list[i];
			str += rec;
			if (i < list.length - 1)
				str += ","
		}
		
		downRpt("./servlet/DownCustServlet?flag=1&ids=" + str);
	}
});
Ext.reg('contacttoolbar',QH.contact.GridToolbar);
