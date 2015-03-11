/**
 * @author zhao
 * @class QH.eleOther.Store
 * @extends QH.data.Store
 */
QH.eleOther.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
		{name:'id'}, // 
		{name:'cnName',type:'string'}, // 报关中文名称
		{name:'enName',type:'string'}, // 报关英文名称
		{name:'hscode',type:'string'}, // 海关编码
		{name:'taxRate',type:'float'}, // 退税率
		{name:'remark',type:'string'} // 备注
			],
			url : 'list_eleother.do'
		});
		QH.eleOther.Store.superclass.constructor.call(this);
	}
});