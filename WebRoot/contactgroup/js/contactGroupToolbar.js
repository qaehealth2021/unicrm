/**
 * @author zhao
 * @class QH.contactGroup.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.contactGroup.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar,{
	objName:'CotContactGroup',
	tbarModel:'all',
	initComponent:function(){
		var _self = this;
		this.items = [
//		{
//			xtype:'empbasecombo',
//			isSearchField:true,
//			searchName:'contactGroup.empsId',
//			emptyText:'业务员',
//			width:90
//		},
		{
			xtype:'searchcombo',
			searchName:'contactGroup.groupName',
			store:this.grid.store,
			checkModified:true,
			emptyText:'组名'
		},"->",{
 			text:'加入群发',
 			iconCls:"page_popedom",
 			ref:'groupsend',
 			hidden:true,
 			disabled:true,
 			handler:_self.addToGroupSend.createDelegate(_self,[])
 		}];
		QH.contactGroup.GridToolbar.superclass.initComponent.call(this);
	},
	addToGroupSend:function(){
		var grid = this.grid;
		var ids = this.grid.getSelectionIds();//获取需要加入的记录
		var urls = '';
		var field = this.getPersonText();
		if(!field){
			window.alertMsg('请在邮件发送界面进行该操作');
			return;
		}
		cotContactService.getContactsByGroupIds(ids,function(contactList){
			//在群发框中显示
			Ext.each(contactList,function(contact){
				if(contactEmail == '') return false;
				var mailPerson = new QH.mail.MailPerson();
				mailPerson.setUrl(contact.contactEmail);
				mailPerson.setName(contact.contactPerson);
				urls += mailPerson.toString() + ";";
			});
			field.urlRange.saveValue(urls);
			field.setValue(urls);
		});
	},
	/**
	 * 获得当前被激活的地址栏，如果没有地址栏被激活，则取收件人一栏
	 * @return {}
	 */
	getPersonText:function(){

		if(QH_VIEWPORT.sendPanel){
			return this.ownerCt.ownerCt.ownerCt.personField ?
					this.ownerCt.ownerCt.ownerCt.personField.personText : 
					QH_VIEWPORT.sendPanel.getForm().findField('to');
		}
		return null;
	}
});
Ext.reg('contactgrouptoolbar',QH.contactGroup.GridToolbar);
