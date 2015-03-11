$importKey(IMPORT_CUSTOMER_COMBO);
/**
 * @author azan
 * @class QH.sms.ContactToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.sms.ContactToolbar = Ext.extend(QH.ux.grid.BaseToolbar, {
			objName : 'CotContact',
			tbarModel : 'base',
			hiddenAddBtn : true,
			hiddenDelBtn : true,
			/**
			 * 收件人模式
			 * 
			 * @type Boolean
			 */
			chooseModel : false,
			initComponent : function() {
				// 设置联系人类型
				this.grid.store.setBaseParam('contact.contactFlag',
						this.grid.flag);
				var customerId = this.grid.customerId;
				if (customerId != '' && customerId != null) { // 属于客户
					this.grid.store.setBaseParam('contact.customerId.id',
							customerId);
				}
				this.items = [{
							xtype : 'customerbasecombo',
							searchName : 'contact.customerId.id',
							isSearchField : true,
							hidden : this.chooseModel,
							emptyText : '客户',
							width : 80
						}, {
							xtype : 'textfield',
							searchName : 'contact.contactPerson',
							isSearchField : true,
							hidden : this.chooseModel,
							emptyText : '联系人',
							width : 80,
							maxLength : 100,
							maxLengthText : '联系人长度最大不能超过{0}'
						}, {
							xtype : 'searchcombo',
							searchName : 'contact.contactMobile',
							width : 80,
							hidden : this.chooseModel,
							store : this.grid.store,
							checkModified : true,
							emptyText : '手机'
						}, "->", {
							text : '选择',
							hidden : this.chooseModel,
							iconCls : "page_popedom",
							handler : this.insertTo.createDelegate(this, [])
						}, {
							text : '删除',
							hidden : !this.chooseModel,
							iconCls : "page_del",
							handler : this.del.createDelegate(this, [])
						}];

				QH.sms.ContactToolbar.superclass.initComponent.call(this);
			},
			insertTo : function() {
				this.grid.insertTo();
			},
			del:function(){
				var selModel = this.grid.getSelectionModel();
				var records = selModel.getSelections();
				var ds = this.grid.getStore();
				Ext.each(records, function(item) {
						ds.remove(item);
				});
			}
		});
Ext.reg('smscontacttoolbar', QH.sms.ContactToolbar);
