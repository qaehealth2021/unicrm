/**
 * @author zhao
 * @class QH.faxrecv.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.faxrecv.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar, {
			objName : 'CotFaxRecv',
			tbarModel : 'all',
			delCls:'SYSOP_DELRECV',
			initComponent : function() {
				var toolbar = this;
				var custId = $('custId').value == 'null'
						? ''
						: $('custId').value;
				var customerBo = new QH.controls.CustomerBaseCombo({
							searchName : 'faxRecv.customerId.id',
							isSearchField : true,
							hidden : custId ? true : false,
							emptyText : '客户',
							width : 80
						})

				this.items = [customerBo, {
							xtype : "combo",
							name : 'faxRecvDeviceid',
							editable : false,
							store : new Ext.data.SimpleStore({
										fields : ["id", "name"],
										data :faxAry
									}),
							valueField : "id",
							displayField : "name",
							mode : 'local',
							validateOnBlur : true,
							triggerAction : 'all',
							width : 90,
							emptyText : '接收标识',
							isSearchField : true,
							searchName : 'faxRecv.deviceid',
							hiddenName : 'faxRecvDeviceid',
							selectOnFocus : true
						}, {
							xtype : 'textfield',
							searchName : 'faxRecv.title',
							isSearchField : true,
							emptyText : '传真文件',
							width : 90,
							maxLength : 200,
							maxLengthText : '传真文件最大不能超过{0}'
						}, {
							xtype : 'searchcombo',
							searchName : 'faxRecv.orderNo',
							isSearchField : true,
							emptyText : '订单号',
							width : 90,
							maxLength : 200,
							store : this.grid.store,
							checkModified : true,
							maxLengthText : '订单号长度最大不能超过{0}'
						}, '->', {
							text : '关联订单',
							iconCls : 'mail_relate_order',
							handler : toolbar.linkOrder.createDelegate(this)
						}];
				QH.faxrecv.GridToolbar.superclass.initComponent.call(this);
			},
			// 关联订单
			linkOrder : function() {
				var tbar = this;
				var selModel = this.grid.getSelectionModel();
				var records = selModel.getSelections();
				if (records.length == 0) {
					alertMsg('请先选择传真!');
				} else {
					var orderNo = records[0].data.orderNo;
					var remark = records[0].data.remark;
					var airRemark = records[0].data.airRemark;
					var orderPol = records[0].data.orderPol;
					var orderPod = records[0].data.orderPod;
					var customerId = !records[0].data.customerId
							? 0
							: records[0].data.customerId.id;
					var statusId = !records[0].data.statusId
							? 0
							: records[0].data.statusId.id;
					var empsId = !records[0].data.empsId
							? 0
							: records[0].data.empsId.id;
					var empsName_load = !records[0].data.empsId
							?""
							: records[0].data.empsId.empsId;
							

					var win = new Ext.Window({
								width : 300,
								height : 300,
								title : '关联订单',
								id : 'updateOrderWin',
								layout : 'fit',
								modal : true,
								frame : true,
								buttonAlign : 'center',
								fbar : [{
											text : '保存',
											handler : function() {
												tbar.updateFaxRecvs(records);
											}
										}],
								listeners:{
									'afterrender':function(){
										var empcombo = Ext.getCmp('empComboRecvId');
										empcombo.setRawValue(empsName_load);
										empcombo.setValue(empsId);
									}
								},
								items : [{
									xtype : 'form',
									labelWidth : 60,
									labelAlign : 'right',
									id:'relateForm',
									frame : true,
									items : [{
										xtype : 'customerbasecombo',
										id : "customerIdRecv",
										name : "customerIdRecv",
										hiddenName : "customerIdForRecv",
										anchor : '100%',
										fieldLabel : "客户",
										listeners : {
											'render' : function(com) {
												com.bindValue(customerId);
											},
											'select' : function(com, record,
													index) {
												if (record.data.id != '') {
													cotFaxService.getEmpFromCustId(record.data.id,function(res){
														var data=[];
														for (var i = 0; i < res.length; i++) {
															var ary=[];
															ary.push(res[i].id);
															ary.push(res[i].empsName);
															data.push(ary);
														}
														Ext.getCmp('empComboRecvId').reset();
														Ext.getCmp('empComboRecvId').setValue("");
														Ext.getCmp('empComboRecvId').setRawValue("");
														Ext.getCmp('empComboRecvId').getStore().loadData(data);
													})
												}else{
													Ext.getCmp('empComboRecvId').getStore().removeAll();
												}
												var orderCombo = Ext.getCmp('orderNoRecv');
												var store = orderCombo.getStore();
												store.setBaseParam('custId',record.data.id);
												store.reload();
											}
										}
									}, {
										xtype : 'ordernocombo',
										fieldLabel : '单号',
										id : 'orderNoRecv',
										name : 'orderNoRecv',
										anchor : '100%',
										needReset : false,
										listeners : {
											'render' : function(com) {
												com.bindValue(orderNo);
											},
											'select':function(combo, record, index ){
												var form = Ext.getCmp("relateForm").getForm();
												form.setValues({
													orderPol:record.get('pol'),
													orderPod:record.get('pod'),
													remarkRecv:record.get('remark'),
													airRemarkRecv:record.get('airRemark')
												});
												var trackStatus = Ext.getCmp('statusIdRecv');
												trackStatus.bindValue(record.get('trackStatus'));
											}
										}
									}, {
										xtype : 'textfield',
										fieldLabel : '海运备注',
										value : remark,
										id : 'remarkRecv',
										name : 'remarkRecv',
										anchor : '100%'
									}, {
										xtype : 'textfield',
										fieldLabel : '空运备注',
										value : airRemark,
										id : 'airRemarkRecv',
										name : 'airRemarkRecv',
										anchor : '100%'
									}, {
										xtype : 'commontypebasecombo',
										queryParams : {
											flag : 'wlzt'
										},
										anchor : '100%',
										fieldLabel : '状态',
										id : 'statusIdRecv',
										name : 'statusIdRecv',
										hiddenName : 'statusIdForRecv',
										listeners : {
											'render' : function(com) {
												com.bindValue(statusId);
											}
										}
									},{
										xtype:'textfield',
										fieldLabel:'起运港',
										value:orderPol,
										allowBlank:true,
										anchor : '100%',
										id:"relate_orderPol",
										name:"orderPol",
										id:'relate_orderPol'
									},{
										xtype:'textfield',
										fieldLabel:'目的港',
										anchor : '100%',
										value:orderPod,
										allowBlank:true,
										id:"relate_orderPod",
										name:"orderPod",
										id:'relate_orderPod'
									},{
										xtype:'combo',
										fieldLabel : "业务员",
										editable : false,
										id : 'empComboRecvId',
										name : "empComboRecv",
										store : new Ext.data.SimpleStore({
													fields : ["tp", "name"],
													data : []
												}),
										valueField : "tp",
										displayField : "name",
										mode : 'local',
										validateOnBlur : true,
										triggerAction : 'all',
										anchor : "100%",
										hiddenName : 'empComboRecv',
										selectOnFocus : true
									}]
								}]
							});
					win.show();
				}

			},
			updateFaxRecvs : function(recs) {
				var tbar = this;
				var ids = new Array();
				for (var i = 0; i < recs.length; i++) {
					ids.push(recs[i].data.id);
				}
				var orderNo = Ext.getCmp('orderNoRecv').getRawValue();
				var remark = Ext.getCmp('remarkRecv').getValue();
				var airRemark = Ext.getCmp('airRemarkRecv').getValue();
				var pol = Ext.getCmp('relate_orderPol').getValue();
				var pod = Ext.getCmp('relate_orderPod').getValue();
				var customerId = Ext.getCmp('customerIdRecv').getValue();
				var statusId = Ext.getCmp('statusIdRecv').getValue();
				var empComboRecvId = Ext.getCmp('empComboRecvId').getValue();
				
				cotFaxService.updateFaxrecvs(ids, orderNo, remark, airRemark,
						customerId, statusId, empComboRecvId,pol,pod, function() {
							tbar.grid.getStore().reload();
							Ext.getCmp('updateOrderWin').close();
						});
			}

		});
Ext.reg('faxrecvtoolbar', QH.faxrecv.GridToolbar);
