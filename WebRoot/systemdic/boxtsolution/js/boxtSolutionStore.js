/**
 * @author zhao
 * @class QH.boxtSolution.Store
 * @extends QH.data.Store
 */
QH.boxtSolution.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
		{name:'id'}, // 
		{name:'typeName',type:'string'}, // 中文名
		{name:'typeNameEn',type:'string'}, // 英文名
		{name:'iboxId'}, // 内盒包装类型
		{name:'mboxId'}, // 中盒包装类型
		{name:'oboxId'}, // 外箱包装类型
		{name:'pboxId'}, // 产品包装类型
		{name:'inputBoxId'}, // 插格包装类型
		{name:'identityId'} // 
			],
			url : 'list_boxtsolution.do'
		});
		QH.boxtSolution.Store.superclass.constructor.call(this);
	}
});