/**
 * @author zhao
 * @class QH.customer.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.customer.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar,{
	objName:'CotCustomer',
	tbarModel:'all',
	initComponent:function(){
		this.items = [{
  			xtype:'textfield',
			searchName:'customer.customerShortName',
			isSearchField:true,
			emptyText:'客户简称',
			width:90,
			maxLength:100,
			maxLengthText:'客户简称长度最大不能超过{0}'
 		},{
 			xtype:'textfield',
			searchName:'customer.fullNameCn',
			isSearchField:true,
			emptyText:'客户全称',
			width:90,
			maxLength:100,
			maxLengthText:'客户全称长度最大不能超过{0}'
 		},{
 			xtype:'textfield',
			searchName:'customer.customerAddress',
			isSearchField:true,
			emptyText:'公司地址',
			width:90,
			maxLength:100,
			maxLengthText:'公司地址长度最大不能超过{0}'
 		},{
			xtype:'searchcombo',
			searchName:'customer.customerNo',
			store:this.grid.store,
			checkModified:true,
			emptyText:'公司代码'
		},'->',{
			text:'导出',
			cls:'SYSOP_EXCEL',
			iconCls:'excel_out',
			handler:this.exportSelectCust.createDelegate(this)
		},{
			text:'共享给',
			//cls:'SYSOP_EXCEL',
			iconCls:'excel_out',
			handler:this.shareTo.createDelegate(this)
		}];
		QH.customer.GridToolbar.superclass.initComponent.call(this);
	},
	exportSelectCust:function() {
		var list = this.grid.getSelectionIds();
		if (list.length == 0) {
			Ext.Msg.alert("提示信息", "请先选择要导出的客户!");
			return;
		}
		var str = "";
		for (var i = 0; i < list.length; i++) {
			var rec = list[i];
			str += rec;
			if (i < list.length - 1)
				str += ","
		}
		
		downRpt("./servlet/DownCustServlet?ids=" + str);
	},
	shareTo:function(){
		var list = this.grid.getSelectionIds();
		if (list.length == 0) {
			Ext.Msg.alert("提示信息", "请先选择要共享的客户!");
			return;
		}
		//批量共享客户
		var win = new QH.customer.ShareToWin({
			title:'批量共享',
			custIds:list
		});
		win.show();
	}
});
Ext.reg('customertoolbar',QH.customer.GridToolbar);
