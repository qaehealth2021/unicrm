/**
 * @author zhao
 * @class QH.city.Store
 * @extends QH.data.Store
 */
QH.city.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
				{name:'id',type:'int'}, // 
				{name:'cityName',type:'string'} // 省份名称
			],
			url : 'list_city.do'
		});
		QH.city.Store.superclass.constructor.call(this);
	}
});