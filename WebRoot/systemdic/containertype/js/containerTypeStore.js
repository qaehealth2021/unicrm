/**
 * @author zhao
 * @class QH.containerType.Store
 * @extends QH.data.Store
 */
QH.containerType.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
				{name:'id'}, // 
				{name:'containerName',type:'string'}, // 集装箱类型
				{name:'containerCube',type:'float'}, // 柜体积
				{name:'containerRemark',type:'string'}, // 备注 
				{name:'containerWeigh',type:'float'} // 集装箱可载重
			],
			url : 'list_containertype.do'
		});
		QH.containerType.Store.superclass.constructor.call(this);
	}
});