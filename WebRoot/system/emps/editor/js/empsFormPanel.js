
/**
 * @author zhao
 * @class QH.emps.FormPanel
 * @extends QH.form.FormPanel
 */
QH.emps.FormPanel = Ext.extend(QH.form.FormPanel, {
	isAddFbar : false,
	frame : false,
	baseCls : 'ex-panel',
	padding:5,
	bodyStyle : {
				backgroundColor : '#DFE8F6'
			},
	initComponent : function() {
		var form = this;
		var companyBo=new QH.ux.form.CompanyBaseCombo({
											tabIndex : 4,
											allowBlank : false,
											blankText : "请选择公司",
											anchor : "92%",
											ref : '../../companyId',
											name : 'companyId.id',
											hiddenName : "companyId.id"
										});
		this.tbar = {
			items : ['->',{
						text : '保存',
						scale : 'large',
						iconCls : 'page_table_save',
						handler : form.saveData.createDelegate(form)
					}]
		};
		this.items = [{
					xtype : "panel",
					layout : "column",
					baseCls : 'ex-panel',
					items : [{
								xtype : "panel",
								layout : "form",
								baseCls : 'ex-panel',
								labelWidth : 70,
								columnWidth : 0.34,
								autoWidth : false,
								items : [{
											xtype : "findexistfield",
											name : "empsId",
											domain : 'CotEmps',
											domainId : this.modId,
											fieldLabel : "登录名",
											anchor : "92%",
											blankText : "请输入登录名",
											regex : /^[A-Za-z0-9_-]+$/,
											regexText : "只能是由数字、26个英文字母或者下划线,横线组成的字符串",
											maxLength : 20,
											tabIndex : 1,
											allowBlank : false
										},companyBo, 
											{
											xtype : "textfield",
											fieldLabel : "电话号码",
											anchor : "92%",
											name : "empsPhone",
											tabIndex : 7,
											maxLength : 100
										},{
											xtype : "textfield",
											fieldLabel : "XLITE",
											anchor : "92%",
											name : "xlite",
											tabIndex : 10,
											maxLength : 50
										}]
							}, {
								xtype : "panel",
								layout : "form",
								baseCls : 'ex-panel',
								labelWidth : 60,
								columnWidth : 0.33,
								items : [{
											xtype : "findexistfield",
											name : "empsName",
											domain : 'CotEmps',
											domainId : this.modId,
											fieldLabel : "英文名",
											anchor : "92%",
											maxLength : 50,
											tabIndex : 2,
											allowBlank : false,
											blankText : "请输入英文名"
										},
										{
											xtype : "deptbasecombo",
											tabIndex : 5,
											anchor : "92%",
											parentCombo : companyBo,
											parentComboWith:'companyId.id',
											allowBlank : false,
											blankText : "请选择部门",
											ref : '../../deptId',
											name : 'deptId.id',
											hiddenName : "deptId.id"
										},
										{
											xtype : "textfield",
											fieldLabel : "手机号码",
											anchor : "92%",
											name : "empsMobile",
											tabIndex : 8,
											maxLength : 100
										},{
											xtype : "faxmapbasecombo",
											fieldLabel : "传真号",
											anchor : "92%",
											name : "faxMapId.id",
											hiddenName : "faxMapId.id",
											tabIndex : 8,
											maxLength : 100
										}]
							}, {
								xtype : "panel",
								layout : "form",
								baseCls : 'ex-panel',
								labelWidth : 60,
								columnWidth : 0.33,
								items : [{
											xtype : "textfield",
											name : "empNameCn",
											fieldLabel : "中文名",
											tabIndex : 3,
											anchor : "92%",
											maxLength : 10
										}, {
											xtype : "combo",
											name : 'empsStatus',
											fieldLabel : '员工状态',
											editable : false,
											store : new Ext.data.SimpleStore({
														fields : ["id", "name"],
														data : [[0, '离职'],
																[1, '在职']]
													}),
											value : 1,
											valueField : "id",
											displayField : "name",
											mode : 'local',
											validateOnBlur : true,
											triggerAction : 'all',
											anchor : "92%",
											tabIndex : 6,
											emptyText : '请选择',
											hiddenName : 'empsStatus',
											selectOnFocus : true
										},{
											xtype : "numberfield",
											fieldLabel : "每月短信",
											anchor : "92%",
											allowDecimals :false,
											allowNegative :false,
											name : "monthSms",
											tabIndex : 9,
											maxLength : 100
										},{
											xtype:'panel',
											baseCls : 'ex-panel',
											html:'<font color=blue>(注意:没有配置传真号将不能发送传真!)</font>'
										}]
							}, {
								xtype : 'hidden',
								name : 'empsPwd',
								value : '123456'
							}, {
								xtype : 'hidden',
								name : 'deskUrl'
							}, {
								xtype : 'hidden',
								name : 'id'
							}]
				}];
		QH.emps.FormPanel.superclass.initComponent.call(this);
	}
});

Ext.reg('empsform', QH.emps.FormPanel);