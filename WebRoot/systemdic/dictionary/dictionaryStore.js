
/**
 * 
 * @class QH.dictionary.Store
 * @extends QH.data.Store
 */
QH.dictionary.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{
			record : [
				{name:'id',type:'string'}, // 
				{name:'type',type:'string'}, // 类型
				{name:'typeEn',type:'string'}, // 英文类型
				{name:'content',type:'string'}, // 内容
				{name:'remark',type:'string'}, // 备注
				{name:'flag',type:'string'}, // 数据字典类型标识位
				{name :'orderSeq',type :'int'}, //是否可以删除 N:否
				{name :'deleteFlag',type :'string'} //是否可以删除 N:否
			],
			url : 'list_dictionary.do'
		});
		QH.dictionary.Store.superclass.constructor.call(this);
	}
});
