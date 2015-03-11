/**
 * @author zhao
 * @class QH.popedomRecord.Store
 * @extends QH.data.Store
 */
QH.popedomRecord.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
		{name:'id'}, // 
		{name:'module',type:'string'}, // 数据的来源模块(用.do来表示)
		{name:'primaryId'}, // 
		{name:'empsId'} // 
			],
			url : 'list_popedomrecord.do'
		});
		QH.popedomRecord.Store.superclass.constructor.call(this);
	}
});