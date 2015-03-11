/**
 * @author zhao
 * @class QH.contactGroup.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.contactGroup.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar, {
			objName : 'CotContactGroup',
			tbarModel : 'base',
			hiddenAddBtn : true,
			hiddenDelBtn : true,
			initComponent : function() {
				var _self = this;
				this.items = [{
							xtype : 'searchcombo',
							searchName : 'contactGroup.groupName',
							store : this.grid.store,
							checkModified : true,
							emptyText : '组名'
						}, "->", {
							text : '加入群发',
							iconCls : "page_popedom",
							selectShow:true,
							ref : 'groupsend',
							handler : _self.addToGroupSend.createDelegate(
									_self, [])
						}];
				QH.contactGroup.GridToolbar.superclass.initComponent.call(this);
			},
			addToGroupSend : function() {
				var grid = this.grid;
				var ids = this.grid.getSelectionIds();// 获取需要加入的记录
				cotContactService.getContactsByGroupIds(ids, function(
								contactList) {
							var ary=new Array();
							var ds = Ext.getCmp('choseGrid').getStore();
							Ext.each(contactList, function(contact) {
										if(contact.contactMobile){
											var u = new ds.recordType(contact);
											ary.push(u);
										}
									});
							if(ary.length==0){
								alertMsg('您选择的分组联系人全都没设置手机号码!');
							}else{
								ds.add(ary);
							}
						});
			}
		});
Ext.reg('contactgrouptoolbar', QH.contactGroup.GridToolbar);
