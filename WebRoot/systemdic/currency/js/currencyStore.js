/**
 * @author zhao
 * @class QH.currency.Store
 * @extends QH.data.Store
 */
QH.currency.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
				{name:'id',type:'int'}, // 
				{name:'curName',type:'string'}, // 币种中文名称
				{name:'curNameEn',type:'string'}, // 币种英文名称
				{name:'curUnit',type:'string'}, // 币种单位
				{name:'curRate',type:'float'} // 汇率
			],
			url : 'list_currency.do'
		});
		QH.currency.Store.superclass.constructor.call(this);
	}
});