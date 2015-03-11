/**
 * @author zhao
 * @class QH.boxType.Store
 * @extends QH.data.Store
 */
QH.boxType.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
		{name:'id'}, // 
		{name:'typeName',type:'string'}, // 名称
		{name:'typeRemark',type:'string'}, // 备注
		{name:'identityId'} // 
			],
			url : 'list_boxtype.do'
		});
		QH.boxType.Store.superclass.constructor.call(this);
	}
});