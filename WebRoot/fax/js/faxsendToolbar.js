/**
 * @author zhao
 * @class QH.faxsend.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.faxsend.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar, {
			objName : 'CotFaxSend',
			tbarModel : 'all',
			initComponent : function() {
				var toolbar = this;
				var custId = $('custId').value == 'null'?'':$('custId').value;
				var customerBo = new QH.controls.CustomerBaseCombo({
							searchName : 'faxSend.customerId.id',
							isSearchField : true,
							hidden:custId?true:false,
							emptyText : '客户',
							width : 80
						})

				this.items = [customerBo, {
							xtype : 'contactbasecombo',
							searchName : 'faxSend.contactId.id',
							isSearchField : true,
							hidden:custId?true:false,
							parentCombo : customerBo,
							parentComboWith : 'customerId.id',
							emptyText : '联系人',
							width : 80
						}, {
							xtype : "combo",
							name : 'status',
							searchName : 'faxSend.status',
							isSearchField : true,
							editable : false,
							store : new Ext.data.SimpleStore({
										fields : ["id", "name"],
										data : [[0, '传真状态'], [1, '提交'],
												[2, '发送'], [3, '成功'],
												[4, '失败'], [5, '取消']]
									}),
							valueField : "id",
							displayField : "name",
							mode : 'local',
							validateOnBlur : true,
							triggerAction : 'all',
							width : 90,
							emptyText : '传真状态',
							hiddenName : 'status',
							selectOnFocus : true
						}, {
							xtype : 'textfield',
							searchName : 'faxSend.title',
							isSearchField : true,
							emptyText : '传真主题',
							width : 90,
							maxLength : 200,
							maxLengthText : '传真主题最大不能超过{0}'
						}, {
							xtype : 'searchcombo',
							searchName : 'faxSend.orderNo',
							isSearchField : true,
							emptyText : '订单号',
							width : 90,
							maxLength : 200,
							store : this.grid.store,
							checkModified : true,
							maxLengthText : '订单号长度最大不能超过{0}'
						},'->',{
							text:'重发',
							iconCls:'page_table_save',
							cls:'SYSOP_ADD',
							handler:toolbar.sendFaxAgain.createDelegate(this)
						}];
				QH.faxsend.GridToolbar.superclass.initComponent.call(this);
			},
			sendFaxAgain:function(){
				var selModel = this.grid.getSelectionModel();
				var records = selModel.getSelections();
				if (records.length != 1) {
					alertMsg('一次只能重发一条传真!');
				} else {
					cotFaxService.saveFaxAndSendAgain(records[0].data.id, function(real) {
								alertMsg('重发成功!');
							})
				}
				
			}
		});
Ext.reg('faxsendtoolbar', QH.faxsend.GridToolbar);
