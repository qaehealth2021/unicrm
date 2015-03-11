/**
 * @author zhao
 * @class QH.clause.Store
 * @extends QH.data.Store
 */
QH.clause.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
				{name:'id',type:'int'}, // 
				{name:'clauseName',type:'string'}, // 价格条款
				{name:'clauseRemark',type:'string'}, // 价格条款备注
				{name:'calId',type:'int'} // 
			],
			url : 'list_clause.do'
		});
		QH.clause.Store.superclass.constructor.call(this);
	}
});