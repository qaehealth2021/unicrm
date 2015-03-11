/**
 * 客户编辑页面的tabpanel
 * 
 * @class QH.customer.CustomerTab
 * @extends QH.ux.tab.DynamicTabPanel
 */
QH.customer.CustomerTab = Ext.extend(QH.ux.tab.DynamicTabPanel, {
	border:true,
	modId : '',
	first : '',
	initComponent : function() {
		this.activeTab=this.first?0:1,
		this.items = [{
			xtype:'contactgrid',
			customerId:this.modId,
			title : "联系人",
			flag : 'C'
		},{
			title:'往来邮件',
			xtype:'mailmainviewpanel',
			ref:'mainViewPanel'
		},{
			title:'短信',
			html:'<iframe frameborder="0" padding="0" margin="0" height="100%" width="100%" src="query_sms.do?custId='+this.modId+'"></iframe>'
		},{
			title:'传真',
			html:'<iframe frameborder="0" padding="0" margin="0" height="100%" width="100%" src="query_fax.do?custId='+this.modId+'"></iframe>'
		},{
			title:'共享业务员',
			xtype:'shareempgrid',
			customerId:this.modId
		}];
		//console.log(this.modId);
		QH.customer.CustomerTab.superclass.initComponent.call(this);
	}
});
Ext.reg('customertab', QH.customer.CustomerTab);