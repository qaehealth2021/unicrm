QH.statistics.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		var records = [];
		DWREngine.setAsync(false);
		statisticsService.getReportColumnDef("cot_temp_report",function(res){
			Ext.each(res,function(coldef){
				records.push({
					name:coldef.colName,
					type:coldef.colType != 'int' ? 'string':'int'
				});
			})
		});
		DWREngine.setAsync(true);
		Ext.apply(this,config,{ 
			record :records,
			url : 'list_statistics.do'
		});
		QH.statistics.Store.superclass.constructor.call(this);
	}
})