
$import('mail/remote/js/mailRemoteGrid.js')
$import('mail/remote/js/mailRemoteStore.js')


QH.mail.RemoteWindow = Ext.extend(Ext.Window,{
	title:'远程邮箱管理',
	plain : true,
	constrainHeader : true,
	width:650,
	height:300,
	layout:'fit',
	accountId:'',
	initComponent:function(){
		
		this.items = [{
			xtype:'mailremotegrid',
			accountId:this.accountId
		}];
		
		QH.mail.RemoteWindow.superclass.initComponent.call(this);
	}
});