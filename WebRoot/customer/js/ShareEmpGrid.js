
QH.customer.ShareEmpGrid = Ext.extend(QH.ux.grid.BaseGridPanel,{
	customerId:0,
	editorDisable : true,
	initComponent:function(){
		var empsMap = [];
		baseDataUtil.getBaseDicDataMap("CotEmps", "id", "empsId", null,function(res) {
			empsMap = res;
		});
		var me = this;
		this.store = new QH.data.Store({
			record:[
				{name:'id',type:'int'},
				{name:'empId',type:'int'}
			],
			url : 'listShareEmp_customer.do?customer.id='+me.customerId
		});
		this.columns = [{
			header : "ID",
			dataIndex : "id",
			width : 50,
			hidden : true
		},{
			header:'业务员',
			dataIndex:'empId',
			width:100,
			renderer:function(value){
				return empsMap[value];
			}
		}]
		this.tbar = {
			xtype:'basetoolbar',
			grid:this,
			editorDisable:this.editorDisable,
			hiddenAddBtn:true,
			objName:'CotCustomerTrackemps'
		};
		QH.customer.ShareEmpGrid.superclass.initComponent.call(this);
	}
});
Ext.reg('shareempgrid',QH.customer.ShareEmpGrid);