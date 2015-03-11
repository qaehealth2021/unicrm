/**
 * 客户批量共享
 * @class QH.customer.ShareToWin
 * @extends Ext.Window
 */
QH.customer.ShareToWin = Ext.extend(Ext.Window,{
	custIds:[],
	initComponent:function(){
		this.items = [{
			xtype:'empbasecombo',
			emptyText:'业务员',
			region:'center',
			id:'sharetowin_empcombo'
		}]
		this.layout='form';
		this.closeAction='close';
		this.height = 100;
		this.width = 300;
		this.buttonAlign='center';
		this.fbar = [{
			text:'共享',
			handler:this.shareTo.createDelegate(this)
		}];
		QH.customer.ShareToWin.superclass.initComponent.call(this);
	},
	shareTo:function(){
		var empcombo = Ext.getCmp('sharetowin_empcombo');
		var empId = empcombo.getValue();
		cotCustomerService.shareToEmps(this.custIds,[empId],GET_SESSION_EMPS_ID,function(){
			window.alertMsg('共享成功');
		})
	}
})