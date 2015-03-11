/**
 * 客户编辑页面表单
 * 
 * @class QH.customer.FormPanel
 * @extends QH.form.FormPanel
 */
QH.customer.CustomerForm = Ext.extend(QH.form.FormPanel, {
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
			dateFormatItems : ["zhanTime"],
			frame : false,
			baseCls : 'ex-panel',
			border : true,
			isAddFbar : false,
			initComponent : function() {
				var form = this;
				var areaBo = new QH.controls.AreaBaseCombo({
							tabIndex : 1,
							anchor : "100%",
							name : 'areaId.id',
							tabIndex : 6,
							hiddenName : "areaId.id"
						});
				var nationBo = new QH.controls.NationBaseCombo({
							tabIndex : 1,
							anchor : "100%",
							name : 'nationId.id',
							hiddenName : "nationId.id",
							parentCombo : areaBo,
							tabIndex : 7,
							parentComboWith : 'areaId.id'
						});
				this.layout = "form";
				this.labelWidth = 85;
				this.labelAlign = "right";
				this.tbar = {
							height : 42,
							items : ['->',{
										text : '保存',
										scale:'large',
										iconCls : 'page_table_save',
										handler : form.saveData
												.createDelegate(form)
									}]
						};
				this.items = [{
							xtype : "findexistfield",
							fieldLabel : "公司代码",
							anchor : "100%",
							domain : 'CotCustomer',
							domainId : this.modId,
							disabled:true,
							allowBlank : false,
							maxLength : 20,
							id : "customerNo",
							name : "customerNo",
							tabIndex : 1
						}, {
							xtype : 'findexistfield',
							domain : 'CotCustomer',
							domainId : this.modId,
							allowBlank : false,
							name : 'customerShortName',
							fieldLabel : '客户简称',
							blankText : "请输入客户简称",
							anchor : "100%",
							tabIndex : 2
						}, {
							xtype : 'findexistfield',
							domain : 'CotCustomer',
							domainId : this.modId,
							name : 'fullNameCn',
							hiddenName : 'fullNameCn',
							fieldLabel : "客户全称",
							editable : true,
							anchor : "100%",
							tabIndex : 3
						},{
							xtype : "textfield",
							fieldLabel : "英文全称",
							anchor : "100%",
							allowBlank : true,
							maxLength : 100,
							id : "fullNameEn",
							name : "fullNameEn",
							tabIndex : 4
						}, {
							xtype : "textfield",
							fieldLabel : "公司地址",
							anchor : "100%",
							allowBlank : true,
							maxLength : 100,
							id : "customerAddress",
							name : "customerAddress",
							tabIndex : 5
						}, {
							xtype : "textfield",
							fieldLabel : "网址",
							anchor : "100%",
							allowBlank : true,
							maxLength : 100,
							id : "custWeb",
							name : "custWeb",
							tabIndex : 6
						}, areaBo, nationBo, {
							xtype : 'provicebasecombo',
							name : "proviceId.id",
							hiddenName : "proviceId.id",
							anchor : "100%",
							tabIndex : 7,
							parentCombo : nationBo,
							parentComboWith : 'nationId.id'
						}, {
							xtype : "commontypebasecombo",
							name : 'custLvId',
							hiddenName : "custLvId",
							fieldLabel : "客户来源",
							anchor : '100%',
							tabIndex : 8,
							queryParams : {
								flag : "khly"
							}
						}, {
							xtype : "textfield",
							fieldLabel : "指定货代名称",
							anchor : "100%",
							vtype:'numstr',
							allowBlank : true,
							maxLength : 7,
							id : "customerZm",
							name : "customerZm",
							tabIndex : 9
						}, {
							xtype : "textfield",
							fieldLabel : "介绍客户名称",
							anchor : "100%",
							vtype:'numstr',
							allowBlank : true,
							maxLength : 100,
							id : "customerCm",
							name : "customerCm",
							tabIndex : 10
						}, {
							xtype : "textfield",
							fieldLabel : "组织名称",
							anchor : "100%",
							allowBlank : true,
							maxLength : 100,
							id : "customerNm",
							name : "customerNm",
							tabIndex : 11
						}, {
							xtype : "textfield",
							fieldLabel : "展会名称",
							anchor : "100%",
							allowBlank : true,
							maxLength : 100,
							id : "customerZhm",
							name : "customerZhm",
							tabIndex : 12
						}, {
							xtype : "textfield",
							fieldLabel : "展会时间",
							anchor : "100%",
							allowBlank : true,
							maxLength : 100,
							id : "zhanTime",
							name : "zhanTime",
							tabIndex : 13
						}, {
							xtype : "commontypebasecombo",
							name : 'custTypeId',
							hiddenName : "custTypeId",
							fieldLabel : "客户类型",
							anchor : '100%',
							tabIndex : 14,
							queryParams : {
								flag : "khlx"
							}
						}, {
							xtype : "hidden",
							id : "id"
						}, {
							xtype : "hidden",
							name : 'empsId',
							value : window.GET_SESSION_EMPS_ID
						}];
				QH.customer.CustomerForm.superclass.initComponent.call(this);
				this.on('aftersavedata', function(formPanel, res, obj) {
							// 保存单号
							// cotSeqService.saveSeq('cust',function(res){});
							// 保存业务信息
							// QH_VIEWPORT.customertab.businessform.modId=res;
							// QH_VIEWPORT.customertab.businessform.saveData();
							//如果是新增客户,保存后跳转到客户联系人tab
							if(!formPanel.modId){
								var tabName = '客户' + obj.customerNo;
								var tabId = CACHE_DEFAULT_CUSTOMER + res;
								openDeskWin(tabName, 'modify_customer.do?gridId='
												+ form.gridId + '&id=' +res+'&first=1',
										tabId);
							}
						});
				this.on("afterrender", function(formPanel, obj) {
							var form = formPanel.getForm();
							var cust = form.getValues();
							if(!cust.id){
								//新增，自动生成客户编号
								cotSeqService.getCustNo(function(res){
									form.setValues({
										customerNo:res
									})
								})
							}
//							if (this.personName)
//								form.findField('priContact')
//										.setValue(this.personName);
//							if (this.personEmail)
//								form.findField('customerPost')
//										.setValue(this.personEmail);
						}, this);
			}
		});
Ext.reg('customerform', QH.customer.CustomerForm);