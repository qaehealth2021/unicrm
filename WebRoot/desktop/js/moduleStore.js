/**
 * @author zhao
 * @class QH.module.Store
 * @extends QH.data.Store
 */
QH.module.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
//				{name:'id',type:'int'}, // 
//				{name:'text',type:'string'}, // 菜单名称
//				{name:'url',type:'string'}, // 菜单连接地址 
//				{name:'imgUrl',type:'string'}, // 图片路径
//				{name:'href',type:'string'}, // 菜单层数
//				{name:'leaf',type:'boolean'}, // 功能类型
//				{name:'children'}
				{name:'id',type:'int'}, // 
				{name:'moduleName',type:'string'}, // 菜单名称
				{name:'moduleUrl',type:'string'}, // 菜单连接地址 
				{name:'moduleImgurl',type:'string'} // 图片路径
			],
			url : 'querymodule.do'
		});
		QH.module.Store.superclass.constructor.call(this);
	}
});