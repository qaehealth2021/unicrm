/**
 * @author zhao
 * @class QH.seqCfg.Store
 * @extends QH.data.Store
 */
QH.seqCfg.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
		{name:'id'}, // 
		{name:'key',type:'string'}, // 界面显示的配置项
		{name:'sourceObj',type:'string'}, // 来源对象(传递的参数类型)
		{name:'relyAttr',type:'string'}, // 参数依赖属性
		{name:'obj',type:'string'}, // 取值对象
		{name:'attribute',type:'string'}, // 取值属性
		{name:'method',type:'string'}, // 调用方法
		{name:'args',type:'string'}, // 调用参数
		{name:'argstype',type:'string'}, // 参数类型
		{name:'express',type:'string'}, // 解析表达式
		{name:'type',type:'string'}, // 对象类型
		{name:'typeName',type:'string'}, // 对key的中文解释
		{name:'belongType',type:'string'} // 参数所属于哪个模块
			],
			url : 'listcfg_seq.do'
		});
		QH.seqCfg.Store.superclass.constructor.call(this);
	}
});