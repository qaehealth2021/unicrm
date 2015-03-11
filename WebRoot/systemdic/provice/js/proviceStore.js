/**
 * @author zhao
 * @class QH.provice.Store
 * @extends QH.data.Store
 */
QH.provice.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
				{name:'id',type:'int'}, // 
				{name:'provinceName',type:'string'}, // 
				{name:'provinceRemark',type:'string'}, // 
				{name:'nationId'} // 
			],
			url : 'list_provice.do'
		});
		QH.provice.Store.superclass.constructor.call(this);
	}
});