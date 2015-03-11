/**
 * @author zhao
 * @class QH.boxMaterial.Store
 * @extends QH.data.Store
 */
QH.boxMaterial.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
		{name:'id'}, //
		{name:'value',type:'string'}, // 包材名称
		{name:'valueEn',type:'string'}, // 英文
		{name:'remark',type:'string'}, // 备注
		{name:'unit',type:'string'}, // 计价单位 
		{name:'materialPrice',type:'float'}, // 材料单价
		{name:'boxTypeId'}, // 包装类型
		{name:'formulaId'}, // 包材对应的公式
		{name:'factoryId'}, // 工厂
		{name:'identityId'} // 
			],
			url : 'list_boxmaterial.do'
		});
		QH.boxMaterial.Store.superclass.constructor.call(this);
	}
});