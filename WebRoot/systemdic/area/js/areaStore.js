/**
 * @author zhao
 * @class QH.area.Store
 * @extends QH.data.Store
 */
QH.area.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
				{name:'id',type:'int'}, // 
				{name:'areaName',type:'string'}, // 地区名称
				{name:'areaCode',type:'string'}, // 邮编
				{name:'remark',type:'string'} // 备注
			],
			url : 'list_area.do'
		});
		QH.area.Store.superclass.constructor.call(this);
	}
});