/**
 * @author zhao
 * @class QH.bank.Store
 * @extends QH.data.Store
 */
QH.bank.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
				{name:'id',type:'int'}, // 
				{name:'bankName',type:'string'}, // 银行名称
				{name:'bankShortName',type:'string'}, // 银行简称
//				{name:'bankAccount',type:'string'}, // 银行账号
				{name:'bankPhone',type:'string'}, // 银行电话
				{name:'bankFax',type:'string'}, // 银行传真
				{name:'bankContact',type:'string'}, // 联系人
				{name:'bankSwift',type:'string'}, // 银行swif
				{name:'bankTelex',type:'string'}, // 银行telex
//				{name:'bankAddress',type:'string'}, // 银行地址
//				{name:'bankRemark',type:'string'}, // 银行备注
				{name:'bankBeneficiary',type:'string'} // 银行受益人
//				{name:'advisingBank',type:'string'}, // 通知行
//				{name:'cableAddress',type:'string'}, // 电报挂号
//				{name:'currencyId',type:'int'}, // 
//				{name:'payType',type:'string'}, // 
//				{name:'intermediaryBank',type:'string'}, // 中间行
//				{name:'intermediarySwft',type:'string'}, // 中间行swft
//				{name:'beneficiaryAddress',type:'string'} // 受益人地址
			],
			url : 'list_bank.do'
		});
		QH.bank.Store.superclass.constructor.call(this);
	}
});