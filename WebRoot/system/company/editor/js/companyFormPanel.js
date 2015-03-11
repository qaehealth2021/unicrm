
/**
 * @author zhao
 * @class QH.company.FormPanel
 * @extends QH.form.FormPanel
 */
QH.company.FormPanel = Ext.extend(QH.form.FormPanel,{
	isAddFbar : false,
	frame : false,
	baseCls : 'ex-panel',
	padding:5,
	bodyStyle : {
				backgroundColor : '#DFE8F6'
			},
	initComponent:function(){
		var form = this;
		var defaultStore = new Ext.data.SimpleStore({
			fields : ["id", "name"],
			data : [[1, '是'], [0, '否']]
		});
	
//		var defaultField = new Ext.form.ComboBox({
//			name : 'companyIsdefault',
//			fieldLabel : '默认公司',
//			editable : false,
//			store : defaultStore,
//			valueField : "id",
//			displayField : "name",
//			mode : 'local',
//			value : 0,
//			validateOnBlur : true,
//			triggerAction : 'all',
//			anchor : "95%",
//			tabIndex : 3,
//			emptyText : '请选择',
//			selectOnFocus : true
//		});
			
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
			padding : "5",
			border : false,
			baseCls : 'ex-panel',
			items:[{
				xtype : "panel",
				columnWidth : 1,
				layout : "column",
				baseCls : 'ex-panel',
				items:[{
					xtype : "panel",
					columnWidth : 0.33,
					layout : "form",
					baseCls : 'ex-panel',
					items:[
						{
						xtype : "findexistfield",
						name : "companyShortName",
						domain:'CotCompany',
						domainId:this.modId,
						fieldLabel : "<font color='red'>公司简称</font>",
						anchor : "95%",
						blankText : "请输入公司简称",
						maxLength:100,
						maxLengthText:'公司简称长度最大不能超过{0}',
						tabIndex : 1,
						allowBlank : false
					},
						{
						xtype : "textfield",
						fieldLabel : "公司电话",
						anchor : "95%",
						name : "companyNbr",
						tabIndex : 4,
						maxLength : 100
					}]
				},{
					xtype : "panel",
					columnWidth : 0.33,
					layout : "form",
					baseCls : 'ex-panel',
					items:[{
						xtype : "textfield",
						fieldLabel : "公司法人",
						anchor : "95%",
						name : "companyCorporation",
						tabIndex : 2,
						maxLength : 100,
						maxLengthText:'公司法人长度最大不能超过{0}'
					},{
						xtype : "textfield",
						fieldLabel : "公司传真",
						anchor : "95%",
						name : "companyFax",
						tabIndex : 5,
						maxLength : 100
					}]
				},{
					xtype : "panel",
					columnWidth : 0.33,
					layout : "form",
					baseCls : 'ex-panel',
					items:[{
						xtype : "textfield",
						fieldLabel : "邮政编码",
						anchor : "95%",
						name : "companyPost",
						tabIndex : 6,
						vtype:'postcodeMask',
						vtypeText:Ext.form.VTypes.postcodeText,
						maxLength : 8
					}]
				},{
					xtype : "panel",
					columnWidth : 1,
					layout : "form",
					baseCls : 'ex-panel',
					items : [{
						xtype : "textfield",
						fieldLabel : "公司全称",
						anchor : "97%",
						blankText : "请输入公司全称！",
						name : "companyName",
						tabIndex : 7,
						maxLength : 100
					}, {
						xtype : "textfield",
						fieldLabel : "英文全称",
						anchor : "97%",
						allowBlank : true,
						name : "companyNameEn",
						tabIndex : 8,
						maxLength : 100
					}, {
						xtype : "textfield",
						fieldLabel : "公司地址",
						anchor : "97%",
						allowBlank : true,
						name : "comapanyAddr",
						tabIndex : 9,
						maxLength : 100
					}, {
						xtype : "textfield",
						fieldLabel : "英文地址",
						name : "companyAddrEn",
						anchor : "97%",
						tabIndex : 10,
						allowBlank : true,
						maxLength : 200
					}]
				},{
					xtype : "panel",
					columnWidth : 0.5,
					layout : "form",
					baseCls : 'ex-panel',
					items : [{
						xtype : "textfield",
						fieldLabel : "公司网址",
						anchor : "95%",
						allowBlank : true,
						name : "companyWebSite",
						tabIndex : 11,
						maxLength : 100
					}]
				}, {
					xtype : "panel",
					columnWidth : 0.5,
					layout : "form",
					baseCls : 'ex-panel',
					items : [{
						xtype : "textfield",
						fieldLabel : "公司邮箱",
						anchor : "94.2%",
						tabIndex : 12,
						maxLength : 100,
						name : "companyMail"
					}]
				}]
			}
//			,{
//				xtype : "fieldset",
//				title : "图片信息",
//				region : "east",
//				width : 230,
//				items : [{
//					xtype:"imagetoolbar",
//					scaleHeight:150,
//					scaleWidth:150,
//					queryId:this.modId,
//					tbName:"CotCompany",
//					uploadPath:"company",
//					field:"companyLogo"
//				}]
//			}
			]
		},{
			xtype : "panel",
			columnWidth : 1,
			baseCls : 'ex-panel',
			labelWidth:65,
			layout : "form",
			items : [{
				xtype : "htmleditor",
				fieldLabel : "备注",
				enableSourceEdit:true,
				anchor : "99.5%",
				name : "remark",
				defaultFont : '宋体',
				height : 180,
				maxLength : 250,
				tabIndex : 13
			}]
		}];
		QH.company.FormPanel.superclass.initComponent.call(this);
	}
});

Ext.reg('companyform',QH.company.FormPanel);