QH.statistics.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	editorDisable:true,
	initComponent:function(){
		//var excludeCol = ['empsId','orderNo','custId'];
		this.store = new QH.statistics.Store();
		this.columns = [];
		var _self = this;
		DWREngine.setAsync(false);
		statisticsService.getReportColumnDef("cot_temp_report",function(res){
			Ext.each(res,function(coldef){
				var col = {
					header:coldef.colName,
					dataIndex:coldef.colName
				};
				if(coldef.colName == 'empsId'){
					col.header = "业务员"
				}else if(coldef.colName == 'customerShortName'){
					col.header = "客户"
				}else if(coldef.colName == 'orderNo'){
					col.header = "订单"
				}else if(coldef.colName == 'custId'){
					col.header = "custId"
					col.hidden = true
				}else if(coldef.colName == 'belongEmpId'){
					col.header = "belongEmpId"
					col.hidden = true
				}
//				else{
//					col.renderer = function(value){
//						//return "<a href='gotoReport_sms.do' target='_blank'>"+value+"</a>"
//					}
//				}
				_self.columns.push(col);
			})
		});
		DWREngine.setAsync(true);
		this.tbar = {
			xtype : 'statisticstoolbar',
			grid : this
		}

		
		
		QH.statistics.GridPanel.superclass.initComponent.call(this);
		this.on("rowclick", function(grid, rowIndex, e) {
			var mailGrid = QH_VIEWPORT.mailgrid;
			var rec = grid.getStore().getAt(rowIndex);
			var mailStore = mailGrid.getStore();
			// 清空原有基本参数
			mailStore.setBaseParam('mail.mailType','');
			mailStore.setBaseParam('mail.nodeId.id','');
			mailStore.setBaseParam('nodeSearchStr','');
			mailStore.setBaseParam('mail.nodeId.accountCfgId.id','');
			mailStore.setBaseParam("mail.belongEmpId.id",rec.data.belongEmpId);
			mailStore.setBaseParam("mail.orderNo",rec.data.orderNo);
			mailStore.setBaseParam("mail.custId.id",rec.data.custId);
			mailStore.reload();
		}, this);
	}
})
Ext.reg('statisticsgrid',QH.statistics.GridPanel);