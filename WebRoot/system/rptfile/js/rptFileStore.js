/**
 * @author zhao
 * @class QH.rptFile.Store
 * @extends QH.data.Store
 */
QH.rptFile.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
		{name:'id'}, // 
		{name:'rptfilePath',type:'string'}, // 
		{name:'rptName',type:'string'}, // 
		{name:'defaultFlag',type:'string'}, // 
		{name:'remark',type:'string'}, // 
		{name:'rptTypeId'}
			],
			url : 'list_rptfile.do'
		});
		QH.rptFile.Store.superclass.constructor.call(this);
	}
});