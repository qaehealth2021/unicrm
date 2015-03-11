/**
 * @author zhao
 * @class QH.moduleFun.Store
 * @extends QH.data.Store
 */
QH.moduleFun.Store = Ext.extend(QH.data.Store,{
	autoLoad:false,
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
				{name:'id',type:'int'}, // 
				{name:'moduleId',type:'int'}, // 
				{name:'funName',type:'string'}, // 功能名
				{name:'funValidurl',type:'string'}, // 功能权限判断
				{name:'funType',type:'string'}, // 功能
				{name:'funIcon',type:'string'} // 图标
			],
			url : 'listmodulefun.do'
		});
		QH.moduleFun.Store.superclass.constructor.call(this);
	}
});