/**
 * @author zhao
 * @class QH.bank.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.bank.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar,{
	objName:'CotBank',
	tbarModel:'all',
	hiddenSaveAllBtn:true,
	hiddenRetractBtn:true,
	hiddenRetractAllBtn:true,
	listeners:{
		"beforeadddata":function(){
			openWindowBase(500,720,"modify_bank.do");
			return false;
		}
	},
	initComponent:function(){
		this.items = [{
  			xtype:'textfield',
			searchName:'bank.bankName',
			isSearchField:true,
			emptyText:'银行名称',
			width:90,
			maxLength:200,
			maxLengthText:'银行名称长度最大不能超过{0}'
 		},{
  			xtype:'textfield',
			searchName:'bank.bankShortName',
			isSearchField:true,
			emptyText:'银行简称',
			width:90,
			maxLength:100,
			maxLengthText:'银行简称长度最大不能超过{0}'
 		},
// 		{
//  			xtype:'textfield',
//			searchName:'bank.bankAccount',
//			isSearchField:true,
//			emptyText:'银行账号',
//			width:90,
//			maxLength:50,
//			maxLengthText:'银行账号长度最大不能超过{0}'
// 		},
 		{
 			hidden:true,
 			xtype:'textfield',
			searchName:'bank.bankPhone',
			isSearchField:true,
			emptyText:'银行电话',
			width:90,
			maxLength:100,
			maxLengthText:'银行电话长度最大不能超过{0}'
 		},{
 			hidden:true,
 			xtype:'textfield',
			searchName:'bank.bankFax',
			isSearchField:true,
			emptyText:'银行传真',
			width:90,
			maxLength:100,
			maxLengthText:'银行传真长度最大不能超过{0}'
 		},{
 			hidden:true,
 			xtype:'textfield',
			searchName:'bank.bankContact',
			isSearchField:true,
			emptyText:'联系人',
			width:90,
			maxLength:100,
			maxLengthText:'长度最大不能超过{0}'
 		},{
 			hidden:true,
 			xtype:'textfield',
			searchName:'bank.bankSwif',
			isSearchField:true,
			emptyText:'SWIFT',
			width:90,
			maxLength:100,
			maxLengthText:'银行swif长度最大不能超过{0}'
 		},{
 			hidden:true,
 			xtype:'textfield',
			searchName:'bank.bankTelex',
			isSearchField:true,
			emptyText:'TELEX',
			width:90,
			maxLength:100,
			maxLengthText:'银行telex长度最大不能超过{0}'
 		},
// 		{
// 			hidden:true,
// 			xtype:'textfield',
//			searchName:'bank.bankAddress',
//			isSearchField:true,
//			emptyText:'银行地址',
//			width:90,
//			maxLength:100,
//			maxLengthText:'银行地址长度最大不能超过{0}'
// 		},
// 		{
// 			hidden:true,
// 			xtype:'textfield',
//			searchName:'bank.bankRemark',
//			isSearchField:true,
//			emptyText:'银行备注',
//			width:90,
//			maxLength:100,
//			maxLengthText:'银行备注长度最大不能超过{0}'
// 		},
 		{
 			hidden:true,
 			xtype:'textfield',
			searchName:'bank.bankBeneficiary',
			isSearchField:true,
			emptyText:'银行受益人',
			width:90,
			maxLength:100,
			maxLengthText:'银行受益人长度最大不能超过{0}'
 		}
// 		,{
// 			hidden:true,
// 			xtype:'textfield',
//			searchName:'bank.advisingBank',
//			isSearchField:true,
//			emptyText:'通知行',
//			width:90,
//			maxLength:100,
//			maxLengthText:'通知行长度最大不能超过{0}'
// 		},{
// 			hidden:true,
// 			xtype:'textfield',
//			searchName:'bank.cableAddress',
//			isSearchField:true,
//			emptyText:'电报挂号',
//			width:90,
//			maxLength:100,
//			maxLengthText:'电报挂号长度最大不能超过{0}'
// 		},{
// 			hidden:true,
// 			xtype:'textfield',
//			searchName:'bank.intermediaryBank',
//			isSearchField:true,
//			emptyText:'中间行',
//			width:90,
//			maxLength:100,
//			maxLengthText:'中间行长度最大不能超过{0}'
// 		},{
// 			hidden:true,
// 			xtype:'textfield',
//			searchName:'bank.intermediarySwft',
//			isSearchField:true,
//			emptyText:'中间行swft',
//			width:90,
//			maxLength:100,
//			maxLengthText:'中间行swft长度最大不能超过{0}'
// 		},{
//			xtype:'searchcombo',
//			searchName:'bank.beneficiaryAddress',
//			store:this.grid.store,
//			checkModified:true,
//			emptyText:'受益人地址'
//		}
		];
		QH.bank.GridToolbar.superclass.initComponent.call(this);
	}
});
Ext.reg('banktoolbar',QH.bank.GridToolbar);
