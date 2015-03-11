
/**
 * 
 * @class QH.nation.Store
 * @extends QH.data.Store
 */
QH.nation.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{
			record : [
				{name:'id',type:'int'}, // 
				{name:'nationShort',type:'string'}, // 国家缩写
				{name:'nationCn',type:'string'}, // 国家中文
				{name:'nationName',type:'string'}, // 国家英文
				{name:'nationCode',type:'string'}, // 国家代码
				{name:'nationRemark',type:'string'}, // 备注
				{name:'areaId'} // 洲
			],
			url : 'list_nation.do'
		});
		QH.nation.Store.superclass.constructor.call(this);
	}
});
