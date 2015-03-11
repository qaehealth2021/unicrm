
/**
 * @author azan
 * @class QH.sms.FormPanel
 * @extends QH.form.FormPanel
 */
QH.sms.FormPanel = Ext.extend(QH.form.FormPanel, {
			isAddFbar : false,
			border : false,
			frame : false,
			padding : 5,
			contactId : '',
			bodyStyle : {
				backgroundColor : '#DFE8F6'
			},
			labelWidth : 65,
			initComponent : function() {
				var form = this;
				this.tbar = new QH.sms.SmsWinToolbar({
							contactId : form.contactId,
							contactNbr : form.contactNbr
						});
				this.items = [{
					xtype : "panel",
					layout : "column",
					border : false,
					bodyStyle : {
						backgroundColor : '#DFE8F6'
					},
					anchor : "100%",
					items : [{
						xtype : "panel",
						layout : "form",
						columnWidth : .5,
						border : false,
						bodyStyle : {
							backgroundColor : '#DFE8F6'
						},
						items : [{
							xtype : 'ordernocombo',
							//													allowBlank : false,
							//													noBlankColor : true,
							name : "orderNo",
							tabIndex : 2,
							fieldLabel : '订单号',
							id : 'orderNoCom',
							hiddenName : 'orderNo',
							anchor : '100%',
							needReset : false,
							listeners : {
								'select' : function(combo, record, index) {
									form.getForm().setValues({
												orderPol : record.get('pol'),
												orderPod : record.get('pod'),
												remark : record.get('remark'),
												airRemark : record
														.get('airRemark')
											});
									var trackStatus = Ext
											.getCmp('statusIdCom');
									trackStatus.bindValue(record
											.get('trackStatus'));
								}
							}
						}]
					}, {
						xtype : "panel",
						layout : "form",
						columnWidth : .5,
						labelWidth : 40,
						border : false,
						bodyStyle : {
							backgroundColor : '#DFE8F6'
						},
						items : [{
									xtype : 'commontypebasecombo',
									fieldLabel : '状态',
									tabIndex : 3,
									id : 'statusIdCom',
									name : 'statusId.id',
									hiddenName : 'statusId.id',
									queryParams : {
										flag : 'wlzt'
									}
								}]
					}]
				},{
					xtype : "textfield",
					fieldLabel : "陌生号码",
					hidden:form.contactNbr?true:false,
					hideLabel:form.contactNbr?true:false,
					value:form.contactNbr?form.contactNbr:"",
					anchor : "100%",
					emptyText:'多个号码用英文的\",\"隔开',
					id : "telephones",
					name : "telephones",
					tabIndex : 4,
					maxLength : 200
				},  {
					xtype : "textfield",
					fieldLabel : "起运港",
					anchor : "100%",
					id : "orderPol",
					name : "orderPol",
					tabIndex : 5,
					maxLength : 20
				}, {
					xtype : "textfield",
					fieldLabel : "目的港",
					anchor : "100%",
					id : "orderPod",
					name : "orderPod",
					tabIndex : 6,
					maxLength : 20
				}, {
					xtype : "textfield",
					fieldLabel : "海运备注",
					anchor : "100%",
					id : "remark",
					name : "remark",
					tabIndex : 7,
					maxLength : 200
				}, {
					xtype : "textfield",
					fieldLabel : "空运备注",
					anchor : "100%",
					id : "airRemark",
					name : "airRemark",
					tabIndex : 8,
					maxLength : 200
				}, {
					xtype : "textarea",
					fieldLabel : "短信",
					allowBlank : false,
					noBlankColor : true,
					anchor : "100%",
					height : 170,
					id : "content",
					name : "content",
					tabIndex : 9,
					maxLength : 140
				},{
					xtype:'panel',
					baseCls : 'ex-panel',
					html:'&nbsp;&nbsp;&nbsp;<font color=blue>短信内容不能含有"&",如果含有,发送后会用"?"代替</font>'
				}, {
					xtype : 'hidden',
					name : 'id'
				}];
				QH.sms.FormPanel.superclass.initComponent.call(this);
				this.on('beforesavedata', function(formPanel, obj) {
							obj.empId = GET_SESSION_EMPS;
							obj.smsDate = new Date();
						});
			}
		});

Ext.reg('smsform', QH.sms.FormPanel);