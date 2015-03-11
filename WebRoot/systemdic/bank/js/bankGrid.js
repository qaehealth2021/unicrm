/**
 * @author zhao
 * @class QH.bank.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.bank.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	initComponent:function(){
		var grid = this;
		this.editorDisable = true;
		this.store = new QH.bank.Store();
		this.columns = [{
			header:'',
			hidden:true,
			dataIndex:'id'
		},{
			header:'银行名称',
			dataIndex:'bankName'
		},{
			header:'银行简称',
			dataIndex:'bankShortName'
		},{
			header:'联系人',
			dataIndex:'bankContact'
		},{
			header:'银行电话',
			dataIndex:'bankPhone'
		},{
			header:'银行传真',
			dataIndex:'bankFax'
		},{
			header:'银行受益人',
			dataIndex:'bankBeneficiary'
		},{
			header:'SWIFT',
			dataIndex:'bankSwift'
		},{
			header:'TELEX',
			dataIndex:'bankTelex'
		}];
		
		this.tbar = {
			xtype:'banktoolbar',
			grid:this
		}
		
		QH.bank.GridPanel.superclass.initComponent.call(this);
		this.on("rowdblclick",function(grid,rowIndex,e){
			this.updateData();
		},this);
	},
	updateData:function(){
		var grid = this;
		var record = grid.getSelectionModel().getSelected();
		openWindowBase(450, 700,'modify_bank.do?gridId='+grid.getId()+'&id='+record.get('id'));
	}
});
Ext.reg('bankgrid',QH.bank.GridPanel);
