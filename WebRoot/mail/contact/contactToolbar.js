$importKey(IMPORT_CUSTOMER_COMBO);
/**
 * @author zhao
 * @class QH.mail.ContactToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.mail.ContactToolbar = Ext.extend(QH.ux.grid.BaseToolbar,{
	objName:'CotContact',
	tbarModel:'all',
	hiddenAddBtn:true,
	hiddenDelBtn:true,
	
	initComponent:function(){
		
		// 设置联系人类型
		this.grid.store.setBaseParam('contact.contactFlag',this.grid.flag);
		var customerId = this.grid.customerId;
		var factoryId = this.grid.factoryId;
		if(customerId != '' && customerId != null){ // 属于客户
			this.grid.store.setBaseParam('contact.customerId.id',customerId);
		}
		if(factoryId != '' && factoryId != null){	// 属于厂家
			this.grid.store.setBaseParam('contact.factoryId.id',factoryId);
		}
		var items = [];
		
		if(this.grid.flag == MAIL_CONTACT_FLAG.CUSTOMER){ // 属于客户，则加入客户下拉框
			items.push({
  			xtype:'nationbasecombo',
			searchName:'contact.customerId.nationId.id',
			isSearchField:true,
			emptyText:'国家',
			width:70
		},{
				xtype:'customerbasecombo',
				searchName:'contact.customerId.id',
				isSearchField:true,
				emptyText:'客户',
				width:70
			});
		}
//		else if(this.grid.flag == MAIL_CONTACT_FLAG.FACTORY){	// 属于厂家，则加入厂家下拉框
//			items.push({
//				xtype:'factorybasecombo',
//				searchName:'contact.factoryId.id',
//				isSearchField:true,
//				emptyText:'厂家',
//				width:90
//			});
//		}
		
		this.items = items.concat([{
  			xtype:'textfield',
			searchName:'contact.contactPerson',
			isSearchField:true,
			emptyText:'联系人',
			width:50,
			maxLength:100,
			maxLengthText:'联系人长度最大不能超过{0}'
 		},{
  			xtype:'textfield',
			searchName:'contact.contactNbr',
			isSearchField:true,
			hidden:true,
			emptyText:'联系电话',
			width:90,
			maxLength:100,
			maxLengthText:'联系电话长度最大不能超过{0}'
 		},{
 			hidden:true,
 			xtype:'textfield',
			searchName:'contact.contactDuty',
			isSearchField:true,
			hidden:true,
			emptyText:'职务',
			width:90,
			maxLength:50,
			maxLengthText:'职务长度最大不能超过{0}'
 		},{
 			hidden:true,
 			xtype:'textfield',
			searchName:'contact.contactFax',
			isSearchField:true,
			emptyText:'传真',
			hidden:true,
			width:90,
			maxLength:100,
			maxLengthText:'传真长度最大不能超过{0}'
 		},{
 			hidden:true,
 			xtype:'textfield',
			searchName:'contact.contactMobile',
			isSearchField:true,
			emptyText:'手机',
			hidden:true,
			width:90,
			maxLength:100,
			maxLengthText:'长度最大不能超过{0}'
 		},{
 			hidden:true,
 			xtype:'textfield',
			searchName:'contact.remark',
			isSearchField:true,
			emptyText:'备注',
			hidden:true,
			width:90,
			maxLength:250,
			maxLengthText:'长度最大不能超过{0}'
 		},{
			xtype:'searchcombo',
			searchName:'contact.contactEmail',
			store:this.grid.store,
			checkModified:true,
			emptyText:'邮箱'
		}]);
		QH.mail.ContactToolbar.superclass.initComponent.call(this);
	}
});
Ext.reg('mailcontacttoolbar',QH.mail.ContactToolbar);
