
QH.mail.TemplateGridPanel = Ext.extend(Ext.grid.GridPanel,{
	title:'配置参数',
	viewConfig:{
		forceFit : true
	},
	initComponent:function(){
		this.store = new QH.mail.TemplateStore();
		
		this.columns = [{
			id : 'paramImage', header: "配置参数", sortable: true, dataIndex: 'paramImage'
		}];
		
		this.selModel = new Ext.grid.RowSelectionModel({
			singleSelect : true
		});
		
		QH.mail.TemplateGridPanel.superclass.initComponent.call(this);
		
	}
	
});

Ext.reg('mailtemplategrid',QH.mail.TemplateGridPanel);