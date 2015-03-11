/**
 * 联系人表单
 * 
 * @class QH.contact.FormPanel
 * @extends QH.form.FormPanel
 */
QH.contact.FormPanel = Ext.extend(QH.form.FormPanel, {
	/**
	 * 区分厂家/客户/陌生
	 * 
	 * @type String
	 */
	flag : '',
	/**
	 * 可能为厂家id或者客户id
	 * 
	 * @type String
	 */
	fcId : '',
	/**
	 * 邮件系统传过来的联系人名字，用于添加时
	 * 
	 * @type String
	 */
	personName : '',
	/**
	 * 邮件系统传过来的联系人Email，用于添加时
	 * 
	 * @type String
	 */
	personEmail : '',
	isAddFbar : false,
	frame : false,
	baseCls : 'ex-panel',
	padding : 5,
	bodyStyle : {
		backgroundColor : '#DFE8F6'
	},
	initComponent : function() {
		var form = this;
		this.layout = 'form';
		this.tbar = {
			items : ['->', {
						text : '保存',
						scale : 'large',
						iconCls : 'page_table_save',
						handler : form.saveData.createDelegate(form)
					}]
		};
		this.labelWidth = 60, this.labelAlign = "right", this.items = [{
			xtype : "panel",
			title : "",
			layout : "column",
			baseCls : 'ex-panel',
			items : [{
						xtype : "panel",
						title : "",
						columnWidth : 0.33,
						layout : "form",
						baseCls : 'ex-panel',
						items : [{
									xtype : 'customerbasecombo',
									name : "customerId.id",
									hiddenName : "customerId.id",
									ref : "../../customer",
									disabledClass : 'combo-disabled',
									anchor : "100%",
									tabIndex : 1,
									allowBlank : form.flag == 'C'
											? false
											: true,
									blankText : '请选择客户!',
									hidden : form.flag == 'C' ? false : true,
									hideLabel : form.flag == 'C' ? false : true,
									fieldLabel : "客户"
								}, {
									xtype : "textfield",
									fieldLabel : "传真",
									anchor : "100%",
									allowBlank : true,
									maxLength : 21,
									vtype : 'fax',
									id : "contactFax",
									name : "contactFax",
									tabIndex : 4
								}, {
									xtype : "textfield",
									fieldLabel : "电话",
									anchor : "100%",
									allowBlank : true,
									maxLength : 100,
									id : "contactNbr",
									name : "contactNbr",
									tabIndex : 7
								}]
					}, {
						xtype : "panel",
						title : "",
						columnWidth : 0.33,
						baseCls : 'ex-panel',
						layout : "form",
						labelWidth : 80,
						items : [{
									xtype : "textfield",
									fieldLabel : "联系人称呼",
									anchor : "100%",
									allowBlank : false,
									blankText : "请输入联系人",
									maxLength : 100,
									id : "contactPerson",
									name : "contactPerson",
									tabIndex : 2
								}, {
									xtype : "textfield",
									fieldLabel : "联系人全称",
									anchor : "100%",
									allowBlank : true,
									maxLength : 100,
									id : "contactPersonFull",
									name : "contactPersonFull",
									tabIndex : 5
								}, {
									xtype : "textfield",
									fieldLabel : "职位",
									anchor : "100%",
									allowBlank : true,
									maxLength : 100,
									id : "contactDuty",
									name : "contactDuty",
									tabIndex : 8
								}]
					}, {
						xtype : "panel",
						title : "",
						columnWidth : 0.34,
						layout : "form",
						baseCls : 'ex-panel',
						items : [{
									xtype : 'empbasecombo',
									name : "empsId.id",
									fieldLabel : "跟进人",
									tabIndex : 3,
									hiddenName : "empsId.id",
									allowBlank : false,
									ref : "../../emp",
									anchor : "100%",
									listeners : {
										'render' : function(com) {
											if(!modId)
												com.bindValue(GET_SESSION_EMPS_ID);
										}
									}
								}, {
									xtype : "textfield",
									fieldLabel : "X-LITE",
									anchor : "100%",
									tabIndex : 6,
									allowBlank : true,
									maxLength : 100,
									id : "xLite",
									name : "xLite"
								}, {
									xtype : "textfield",
									fieldLabel : "MSN",
									anchor : "100%",
									tabIndex : 9,
									allowBlank : true,
									maxLength : 100,
									id : "msn",
									name : "msn"
								}]
					}]
		}, {
			xtype : "panel",
			title : "",
			layout : "column",
			baseCls : 'ex-panel',
			items : [{
						xtype : "panel",
						title : "",
						columnWidth : .33,
						layout : "form",
						baseCls : 'ex-panel',
						items : [{
									xtype : "textfield",
									fieldLabel : "手机",
									anchor : "100%",
									allowBlank : true,
									maxLength : 100,
									tabIndex : 10,
									id : "contactMobile",
									name : "contactMobile"
								}]
					}, {
						xtype : "panel",
						title : "",
						columnWidth : .33,
						layout : "form",
						baseCls : 'ex-panel',
						labelWidth : 80,
						items : [{
									xtype : "textfield",
									fieldLabel : "邮箱",
									anchor : "100%",
									allowBlank : true,
									vtype : 'email',
									maxLength : 100,
									id : "contactEmail",
									name : "contactEmail",
									tabIndex : 11
								}]
					}, {
						xtype : "panel",
						title : "",
						columnWidth : .34,
						layout : "form",
						baseCls : 'ex-panel',
						items : [{
									xtype : "textfield",
									fieldLabel : "SKYPE",
									anchor : "100%",
									allowBlank : true,
									maxLength : 100,
									tabIndex : 12,
									id : "skype",
									name : "skype"
								}]
					}]
		}, {
			xtype : "panel",
			title : "",
			layout : "column",
			baseCls : 'ex-panel',
			items : [{
						xtype : "panel",
						title : "",
						columnWidth : .33,
						layout : "form",
						baseCls : 'ex-panel',
						items : [{
									xtype : "textfield",
									fieldLabel : "上级",
									anchor : "100%",
									tabIndex : 13,
									allowBlank : true,
									maxLength : 100,
									id : "upMan",
									name : "upMan"
								}]
					}, {
						xtype : "panel",
						columnWidth : .67,
						layout : "form",
						baseCls : 'ex-panel',
						labelWidth : 80,
						items : [{
									xtype : "textfield",
									fieldLabel : "备注",
									anchor : "100%",
									allowBlank : true,
									maxLength : 100,
									id : "remark",
									name : "remark",
									tabIndex : 14
								}]
					}]
		}, {
			xtype : 'hidden',
			name : 'id'
		}, {
			xtype : 'hidden',
			name : 'contactFlag',
			value : form.flag
		}];
		QH.contact.FormPanel.superclass.initComponent.call(this);
		this.on("beforesavedata", function(formPanel, obj) {
			var custId=obj.customerId.id;
			var contactPerson=obj.contactPerson;
			var flag=false;
			//查询这个客户下是否有相同 "联系人称呼"的联系人
			DWREngine.setAsync(false);
			cotContactService.checkIsExist(custId,contactPerson,obj.id,function(res){
				flag=res;
			})
			DWREngine.setAsync(true);
			if(!flag){
				return true;
			}else{
				alertMsg('该客户已经有一个联系人叫"<font color=red>'+contactPerson+'</font>",请更改联系人称呼!');
				return false;
			}
		});
		
		this.on("afterrender", function(formPanel, obj) {
					if (formPanel.fcId) {
						if (formPanel.flag == 'C')
							formPanel.customer.disable();
						else
							formPanel.factory.disable();
						if (!formPanel.modId) {
							if (formPanel.flag == 'C')
								formPanel.customer.bindValue(formPanel.fcId);
							else
								formPanel.factory.bindValue(formPanel.fcId);
						}
					}
					var form = formPanel.getForm();
					if (this.personName)
						form.findField('contactPerson')
								.setValue(this.personName);
					if (this.personEmail)
						form.findField('contactEmail')
								.setValue(this.personEmail);
				}, this);
	}
});
Ext.reg('contactform', QH.contact.FormPanel);