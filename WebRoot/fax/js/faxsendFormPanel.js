
/**
 * @author zhao
 * @class QH.faxsend.FormPanel
 * @extends QH.form.FormPanel
 */
QH.faxsend.FormPanel = Ext.extend(QH.form.FormPanel, {
	frame : false,
	bodyStyle : {
		backgroundColor : '#DFE8F6'
	},
	padding : 10,
	labelWidth : 65,
	isAddFbar : false,
	isSaveClose : false,
	initComponent : function() {
		var form = this;
		this.fileUpload = true;
//		this.fbar = new Ext.Toolbar({
//					items : [{
//								text : "发送",
//								scale:'large',
//								cls : "SYSOP_ADD",
//								iconCls : "page_table_save",
//								handler : function() {
//									form.saveData();
//								}
//							}, {
//								text : "取消",
//								scale:'large',
//								iconCls : "page_cancel",
//								handler : function() {
//									form.ownerCt.close();
//								}
//							}]
//				});
		this.tbar = [{
					text : '选择客户',
					scale:'large',
					iconCls : 'page_popedom',
					handler : form.showContactGrid.createDelegate(this)
				},'->',{
								text : "发送",
								scale:'large',
								cls : "SYSOP_ADD",
								iconCls : "page_table_save",
								handler : function() {
									form.saveData();
								}
							}];
		this.items = [{
			xtype : "panel",
			layout : "column",
			border : false,
			padding : 5,
			bodyStyle : {
				backgroundColor : '#DFE8F6'
			},
			anchor : "100%",
			items : [{
				xtype : "panel",
				layout : "form",
				columnWidth : .5,
				bodyStyle : {
					backgroundColor : '#DFE8F6'
				},
				border : false,
				labelWidth : 60,
				items : [{
							xtype : "textfield",
							fieldLabel : "客户",
//							allowBlank : false,
							disabled : true,
							disabledClass : 'combo-disabled',
							anchor : "100%",
							id : "customerName",
							name : "customerName",
							tabIndex : 1,
							maxLength : 100
						}, {
							xtype : "textfield",
							fieldLabel : "传真号码",
							allowBlank : false,
							anchor : "100%",
							emptyText : '国际区号-长途区号-传真号',
							id : "faxNum",
							name : "faxNum",
							tabIndex : 3,
							maxLength : 20
						}, {
							xtype : 'ordernocombo',
//							allowBlank : false,
							id : "orderNoSendCom",
							name : "orderNo",
							tabIndex : 5,
							fieldLabel : '订单号',
							hiddenName : 'orderNo',
							anchor : '100%',
							needReset : false,
							listeners:{
								'select':function(combo, record, index ){
									//var form = Ext.getCmp("relateForm").getForm();
									form.getForm().setValues({
										orderPol:record.get('pol'),
										orderPod:record.get('pod'),
										remark:record.get('remark'),
										airRemark:record.get('airRemark')
									});
									var trackStatus = Ext.getCmp('statusIdSend');
									trackStatus.bindValue(record.get('trackStatus'));
								}
							}
						}, {
							xtype : 'empbasecombo',
							id : 'empCombo',
							name : "empsId.id",
							fieldLabel : "业务员",
							hidden:true,
							hideLabel:true,
							disabled : true,
							disabledClass : 'combo-disabled',
							allowBlank : false,
							tabIndex : 7,
							hiddenName : "empsId.id",
							anchor : "100%",
							listeners : {
								'render' : function(com) {
									com.bindValue(GET_SESSION_EMPS_ID);
								}
							}
						},{
							xtype : "textfield",
							fieldLabel : "海运备注",
							anchor : "100%",
							name : "remark",
							tabIndex : 7,
							maxLength : 300
						},{
							xtype : "textfield",
							fieldLabel : "起运港",
							anchor : "100%",
							name : "orderPol",
							tabIndex : 7,
							maxLength : 20
						},{
							xtype : "combo",
							name : 'status',
							fieldLabel : '传真状态',
							editable : false,
							disabled : true,
							disabledClass : 'combo-disabled',
							store : new Ext.data.SimpleStore({
										fields : ["id", "name"],
										data : [[0, '提交'], [1, '发送'],
												[2, '成功'], [3, '失败'], [4, '取消']]
									}),
							value : 0,
							valueField : "id",
							displayField : "name",
							mode : 'local',
							validateOnBlur : true,
							triggerAction : 'all',
							anchor : "100%",
							tabIndex : 9,
							emptyText : '请选择',
							hiddenName : 'status',
							selectOnFocus : true
						}]
			}, {
				xtype : "panel",
				layout : "form",
				columnWidth : .5,
				bodyStyle : {
					backgroundColor : '#DFE8F6'
				},
				border : false,
				labelWidth : 60,
				items : [{
							xtype : "textfield",
							fieldLabel : "联系人",
							disabled : true,
							disabledClass : 'combo-disabled',
//							allowBlank : false,
							anchor : "100%",
							id : "contactName",
							name : "contactName",
							tabIndex : 2,
							maxLength : 100
						}, {
							xtype : 'fileuploadfield',
							emptyText : '上传传真文件',
							anchor : '100%',
							allowBlank : false,
							blankText : "请选择传真文件",
							fieldLabel : '传真文件',
							id : 'sendFile',
							tabIndex : 4,
							name : 'sendFile',
							buttonText : '',
							buttonCfg : {
								iconCls : 'upload-icon'
							},
							listeners : {
								"fileselected" : function(field, value) {
									form.selectFlag = true;
								}
							}
						}, {
							xtype : 'commontypebasecombo',
							fieldLabel : '订单状态',
							tabIndex : 6,
							id:'statusIdSend',
							name : 'statusId.id',
							hiddenName : 'statusId.id',
							queryParams : {
								flag : 'wlzt'
							}
						}, {
							xtype : "textfield",
							fieldLabel : "空运备注",
							anchor : "100%",
							name : "airRemark",
							tabIndex : 8,
							maxLength : 300
						},{
							xtype : "textfield",
							fieldLabel : "目的港",
							anchor : "100%",
							name : "orderPod",
							tabIndex : 7,
							maxLength : 20
						}, {
							xtype : "combo",
							name : 'retCode',
							fieldLabel : '结果',
							editable : false,
							disabled : true,
							disabledClass : 'combo-disabled',
							store : new Ext.data.SimpleStore({
										fields : ["id", "name"],
										data : [[0, '无'], [1, '忙'],
												[2, '无拨号音'], [3, '无应答'],
												[4, '文件格式错'], [5, '发送页前信号中断'],
												[6, '线路训练失败'], [7, '发送页后信号中断'],
												[8, '用户取消'], [9, '超时无应答'],
												[20, '待发送文件错误'],
												[21, '系统读写错误'], [22, '打印转换错误']]
									}),
							value : 0,
							valueField : "id",
							displayField : "name",
							mode : 'local',
							validateOnBlur : true,
							triggerAction : 'all',
							anchor : "100%",
							tabIndex : 10,
							emptyText : '请选择',
							hiddenName : 'retCode',
							selectOnFocus : true
						}]
			}]
		}, {
			xtype : "textfield",
			fieldLabel : "传真主题",
			anchor : "100%",
			name : "title",
			tabIndex : 11,
			maxLength : 200
		}, {
			xtype : "textarea",
			fieldLabel : "备注",
			anchor : "100%",
			height : 100,
			name : "memo",
			tabIndex : 12,
			maxLength : 200
		}, {
			xtype : 'hidden',
			name : 'id'
		}, {
			xtype : 'hidden',
			id : 'customerId',
			name : 'customerId'
		}, {
			xtype : 'hidden',
			id : 'contactId',
			name : 'contactId'
		}, {
			xtype : 'hidden',
			id : 'line',
			value : '0',
			name : 'line'
		}, {
			xtype : 'hidden',
			id : 'sendFlag',
			value : '0',
			name : 'sendFlag'
		}];
		QH.faxsend.FormPanel.superclass.initComponent.call(this);
		this.on('beforeloaddata', function(formPanel) {
			if (formPanel.sendId) {
				baseSerivce.getObjByIntegerId(formPanel.sendId,
						formPanel.objName, function(res) {
							obj = res;
							formPanel.getForm().setValues(obj);
							formPanel.loadSpForm(obj);
							if(res.customerId){
								Ext.getCmp('customerName')
										.setValue(res.customerId.customerShortName);
								Ext.getCmp('customerId')
										.setValue(res.customerId.id);
							}
							if(res.contactId){
								Ext.getCmp('contactName')
										.setValue(res.contactId.contactPerson);
								Ext.getCmp('contactId').setValue(res.contactId.id);
							}
							var faxNum = res.ic + "-" + res.ldc + "-" + res.fax;
							Ext.getCmp('faxNum').setValue(faxNum);
						});
			}
			if(formPanel.fdObj){
				if(formPanel.fdObj.url){
					DWRUtil.setValue("sendFile", formPanel.fdObj.url);
				}
				if(formPanel.fdObj.customerName){
					Ext.getCmp('customerName')
					.setValue(formPanel.fdObj.customerName);
				}
				if(formPanel.fdObj.contactName){
					Ext.getCmp('contactName')
					.setValue(formPanel.fdObj.contactName);
				}
				if(formPanel.fdObj.customerId){
					Ext.getCmp('customerId')
					.setValue(formPanel.fdObj.customerId);
				}
				if(formPanel.fdObj.contactId){
					Ext.getCmp('contactId')
					.setValue(formPanel.fdObj.contactId);
				}
				if(formPanel.fdObj.faxNum){
					Ext.getCmp('faxNum')
					.setValue(formPanel.fdObj.faxNum);
				}
			}
			return false;
		})

		this.on('beforesavedata', function(formPanel, obj) {
					// 判断传真号码格式是否正确
					var faxNum = Ext.getCmp('faxNum').getValue();
					var t = faxNum.indexOf('-');
					var p = faxNum.lastIndexOf('-');
					var guo = faxNum.substring(0, t);
					var chang = faxNum.substring(t + 1, p);
					var qu = faxNum.substring(p + 1);
					obj.ic = guo;
					obj.ldc = chang;
					obj.fax = qu;
					obj.sendTime = 0;
					obj.status = 0;
					if (formPanel.sendId) {
						obj.retCode = 0;// 当重新发送时,这要设置成0
						obj.id = null;// 新增一份传真,不做更新
					}
					obj.sender1 = Ext.getCmp('empCombo').getRawValue();
					obj.orderNo = Ext.getCmp('orderNoSendCom').getRawValue();
					obj.receiver1 = Ext.getCmp('contactName').getValue();
					if($('customerId').value){
						var cust = new CotCustomer();
						cust.id = $('customerId').value;
						obj.customerId = cust;
					}
					if($('contactId').value){
						var con = new CotContact();
						con.id = $('contactId').value;
						obj.contactId = con;
					}
					//在客户编辑页面的联系人主界面时,有modId会报错
					if(formPanel.fdObj){
						obj.id = null;
					}
					if (formPanel.selectFlag == true) {
						DWREngine.setAsync(false);
						cotFaxService.getRealSendFile($('sendFile').value,
								obj.empsId.id, function(real) {
									obj.sendFile = real;
								})
						DWREngine.setAsync(true);
					}
				});
		this.on('aftersavedata', function(formPanel, res, obj) {
					// 调用存储过程
					cotFaxService.saveAfterFaxSend(obj.orderNo, res,
							obj.empsId.id, function(real) {
								if(!formPanel.fdObj){
									QHERP_VIEWPORT.faxTabPanel.faxSendGrid
											.getStore().reload();
								}else{
									alertMsg('发送传真完成!');
								}
								formPanel.ownerCt.close();
							})
				});
	},
	// 上次传真文件操作
	uploadFile : function() {
		var formPanel = this;
		this.getForm().submit({
					url : './servlet/UploadServlet',
					method : 'post',
					params : {
						// tbName : "CotRptFile",
						uploadPath : "faxsend",
						bGenDate : false,
						isRName : true,
						beanName : "BaseService"
					},
					waitTitle : '请等待',
					waitMsg : '上传文件中...',
					success : function(fp, o) {
						var filePath = Ext.util.Format
								.htmlDecode(o.result.filePath);
						DWRUtil.setValue("sendFile", filePath);
						// 调用父对象的保存方法
						QH.faxsend.FormPanel.superclass.saveData
								.call(formPanel);
					},
					failure : function(fp, o) {
						alertMsg(o.result.msg);
					}
				})
	},
	// 表单保存
	saveData : function() {
		// 判断传真号码格式是否正确
		var faxNum = Ext.getCmp('faxNum').getValue();
		var t = faxNum.indexOf('-');
		var p = faxNum.lastIndexOf('-');
		if (t == -1 || p == -1 || t == p || t == 0) {
			alertMsg('传真号码格式不正确!格式为:国际区号-长途区号-传真号');
			return;
		}
		var formPanel = this;
		//如果是从报价打印打开时
		if(formPanel.fdObj){
			QH.faxsend.FormPanel.superclass.saveData.call(formPanel);
		}else{
			// 新增的时候，直接提交
			if (!formPanel.sendId) {
				formPanel.uploadFile();
			} else {
				// 修改时，需要判断是否有新上传的文件
				if (this.selectFlag == true) {
					formPanel.uploadFile();
				} else {
					QH.faxsend.FormPanel.superclass.saveData.call(formPanel);
				}
			}
		}
		
	},
	showContactGrid : function() {
		var form = this;
		var win = new Ext.Window({
					title : '客户联系人',
					width : 600,
					height : 400,
					layout : 'fit',
					id : 'contactWin',
					items : [{
								xtype : 'smscontactgrid',
								isFax:true,
								insertTo : function(record) {
									if(record){
										form.setContact(record);
									}else{
										var selModel = this.getSelectionModel();
										var records = selModel.getSelections();
										if (records.length != 1) {
											alertMsg('请只选择一条客户联系人!');
										} else {
											form.setContact(records[0]);
										}
									}
								}
							}]
				});
		win.show();
	},
	// 填写客户/联系人/传真号码
	setContact : function(record) {
		Ext.getCmp('customerName')
				.setValue(record.data.customerId.customerShortName);
		Ext.getCmp('contactName').setValue(record.data.contactPerson);
		Ext.getCmp('customerId').setValue(record.data.customerId.id);
		Ext.getCmp('contactId').setValue(record.data.id);
		Ext.getCmp('faxNum').setValue(record.data.contactFax);
		Ext.getCmp('contactWin').close();
		var store = Ext.getCmp('orderNoSendCom').getStore();
		store.setBaseParam('custId',record.data.customerId.id);
		store.reload();
	}
});

Ext.reg('faxsendform', QH.faxsend.FormPanel);