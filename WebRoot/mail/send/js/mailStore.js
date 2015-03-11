Ext.namespace('Ext.mail');


QH.mail.SendStore = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
				{name:'id'}, // 
				{name:'mailAccount',type:'string'}, // 邮箱账号
				{name:'mailPwd',type:'string'}, // 邮箱密码
				{name:'mailBackDay',type:'int'}, // 备份服务器上邮件时间，NULL或0为都备份，-1为接收时直接删除，大于0为N天后接收时删除
				{name:'autoReceiveTime',type:'int'}, // 邮件自动接收间隔时间
				{name:'mailNickname',type:'string'}, // 账号别名
				{name:'mailSendName',type:'string'}, // 发件人名
				{name:'mailBoxType',type:'string'}, // G:公共邮箱，E：个人邮箱
				{name:'empId'}, // 员工账号
				{name:'pop3Cfg'}, // POP3
				{name:'smtpCfg'}, // SMTP
				{name:'imapCfg'}, // imap
				{name:'identityId'} // 
			],
			url : 'list_mailaccountcfg.do'
		});
		QH.mail.SendStore.superclass.constructor.call(this);
	}
});
