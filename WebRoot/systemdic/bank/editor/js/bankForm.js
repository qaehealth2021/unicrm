/**
 * @class QH.bank.Form
 * @extends QH.form.FormPanel
 */
QH.bank.FormPanel = Ext.extend(QH.form.FormPanel,{
	initComponent:function(){
		this.layout = "column";
		this.labelAlign="right";
		this.labelWidth = 80;
		this.items = [
			{
				xtype:"panel",
				columnWidth:0.5,
				layout:"form",
				items:[
					{
						xtype:"textfield",
						fieldLabel:"银行全称",
						name:'bankName',
						tabIndex:1,
						allowBlank:false,
						blankText:"请输入银行全称",
						anchor:"100%"
					},
					{
						xtype:"textfield",
						fieldLabel:"银行帐号",
						name:'bankAccount',
						tabIndex:4,
						anchor:"100%"
					},
					{
						xtype:"textfield",
						fieldLabel:"银行地址",
						name:'bankAddress',
						tabIndex:7,
						anchor:"100%"
					}
				]
			},
			{
				xtype:"panel",
				columnWidth:0.5,
				layout:"column",
				items:[
					{
						xtype:"panel",
						layout:"form",
						columnWidth:0.5,
						items:[
							{
								xtype:"textfield",
								fieldLabel:"银行简称",
								name:'bankShortName',
								tabIndex:2,
								allowBlank:false,
								blankText:"请输入银行简称",
								anchor:"100%"
							},
							{
								xtype:"textfield",
								fieldLabel:"联系电话",
								name:'bankPhone',
								tabIndex:5,
								anchor:"100%"
							},
							{
								xtype:"commontypebasecombo",
								fieldLabel:"付款方式",
								name:'payType',
								tabIndex:8,
								anchor:"100%",
								ref:"../../payType",
								queryParams:{
									flag:"fkfs"
								}
							}
						]
					},
					{
						xtype:"panel",
						layout:"form",
						columnWidth:0.5,
						items:[
							{
								xtype:"textfield",
								fieldLabel:"联系人",
								name:'bankContact',
								tabIndex:3,
								anchor:"100%"
							},
							{
								xtype:"textfield",
								fieldLabel:"传真",
								name:'bankFax',
								tabIndex:6,
								anchor:"100%"
							},
							{
								xtype:"currencybasecombo",
								name:'currencyId.id',
								hiddenName:"currencyId.id",
								tabIndex:5,
								anchor:"100%",
								ref:"../../currencyId",
								allowBlank:false
							}
							
						]
					}
				]
			},
			{
				xtype:"panel",
				title:"",
				columnWidth:1,
				layout:"column",
				items:[
					{
						xtype:"panel",
						layout:"form",
						columnWidth:0.5,
						items:[
							{
								xtype:"textfield",
								fieldLabel:"受益人",
								name:'bankBeneficiary',
								tabIndex:10,
								anchor:"100%"
							},
							{
								xtype:"textfield",
								fieldLabel:"受益人地址",
								name:'beneficiaryAddress',
								tabIndex:12,
								anchor:"100%"
							},
							{
								xtype:"textfield",
								fieldLabel:"SWIFT",
								name:'bankSwift',
								tabIndex:14,
								anchor:"100%"
							},
							{
								xtype:"textfield",
								fieldLabel:"中间行",
								name:'intermediaryBank',
								tabIndex:16,
								anchor:"100%"
							}
						]
					},
					{
						xtype:"panel",
						layout:"form",
						columnWidth:0.5,
						items:[
							{
								xtype:"textfield",
								fieldLabel:"通知行",
								name:'advisingBank',
								tabIndex:11,
								anchor:"100%"
							},
							{
								xtype:"textfield",
								fieldLabel:"电报挂号",
								name:'cableAddress',
								tabIndex:13,
								anchor:"100%"
							},
							{
								xtype:"textfield",
								fieldLabel:"TELEX",
								name:'bankTelex',
								tabIndex:15,
								anchor:"100%"
							},
							{
								xtype:"textfield",
								fieldLabel:"中间行SWIFT",
								name:'intermediarySwift',
								tabIndex:17,
								anchor:"100%"
							}
						]
					}
				]
			},
			{
				xtype:"panel",
				columnWidth:1,
				layout:"form",
				items:[
					{
						xtype:"textarea",
						fieldLabel:"备注",
						name:'bankRemark',
						tabIndex:18,
						anchor:"100%"
					}
				]
			}, {
				xtype : 'hidden',
				name : 'id'
			}
		];
		QH.bank.FormPanel.superclass.initComponent.call(this);
//		this.on("afterloaddata",function(formPanel,obj){
//			//币种绑定
//			formPanel.currencyId.setValue(obj.currencyId.id);
//			formPanel.currencyId.setRawValue(obj.currencyId.curNameEn);
//			formPanel.payType.setValue(obj.payType);
//			formPanel.payType.setRawValue(obj.payType);
//		})
	}
});
Ext.reg('bankform',QH.bank.FormPanel);