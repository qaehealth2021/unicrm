/**
 * @author zhao
 * @class QH.sms.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.sms.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar, {
			objName : 'CotSms',
			tbarModel : 'all',
			initComponent : function() {
				var toolbar = this;
				var custId = $('custId').value == 'null'?'':$('custId').value;
				var customerBo = new QH.controls.CustomerBaseCombo({
							searchName : 'sms.customerId.id',
							isSearchField : true,
							hidden:custId|| this.grid.mo?true:false,
							emptyText : '客户',
							width : 80
						})
				this.items = [customerBo, {
							xtype : 'contactbasecombo',
							searchName : 'sms.contactId.id',
							isSearchField : true,
							parentCombo : customerBo,
							hidden:custId|| this.grid.mo?true:false,
							parentComboWith : 'customerId.id',
							emptyText : '联系人',
							width : 80
						}, {
							xtype : 'empbasecombo',
							searchName : 'sms.empsId.id',
							isSearchField : true,
							emptyText : '发送人',
							width : 90
						}, {
							xtype : 'datefield',
							id : 'startOrderTimeId',
							endDateId : 'endOrderTimeId',
							searchName : 'startTime',
							isSearchField : true,
							vtype : 'daterange',
							emptyText : '发送起始',
							hidden:true,
							width : 100
						}, {
							xtype : 'datefield',
							vtype : 'daterange',
							id : 'endOrderTimeId',
							startDateId : 'startOrderTimeId',
							searchName : 'endTime',
							isSearchField : true,
							emptyText : '发送结束',
							hidden:true,
							width : 100
						}, {
							xtype : 'commontypebasecombo',
							emptyText : '订单状态',
							tabIndex : 5,
							name : 'statusId.id',
							hiddenName : 'statusId.id',
							searchName : 'sms.statusId.id',
							isSearchField : true,
							width : 90,
							queryParams : {
								flag : 'wlzt'
							}
						}, {
							xtype : 'textfield',
							searchName : 'sms.content',
							isSearchField : true,
							emptyText : '短信内容',
							hidden:true,
							width : 90,
							maxLength : 140,
							maxLengthText : '短信内容最大不能超过{0}'
						}, {
							xtype : 'searchcombo',
							searchName : 'sms.mobiles',
							isSearchField : true,
							emptyText : '手机号码',
							width : 90,
							maxLength : 100,
							store : this.grid.store,
							checkModified : true,
							maxLengthText : '手机号码长度最大不能超过{0}'
						}];
				QH.sms.GridToolbar.superclass.initComponent.call(this);
			}
		});
Ext.reg('smstoolbar', QH.sms.GridToolbar);
