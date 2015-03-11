QH.ux.icon.IconStore = Ext.extend(QH.data.Store,{
//	autoLoad : false,
	constructor : function(config){
		Ext.apply(this,config,{
			record : [{
					name : "picName",
					type : "string"
				},{
					name : "picPath",
					type : "string"
				}, {
					name : "use",
					type : "boolean"
				}],
			url : 'query_Icon.do'
		});
		QH.ux.icon.IconStore.superclass.constructor.call(this);
	}
});