/**
 * @author zhao
 * @class QH.mail.Store
 * @extends QH.data.Store
 */
QH.mail.RemoteStore = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
				{name:'id'}, // 
				{name:'msgId'}, // 邮件消息ID
				{name:'subject',type:'string'}, // 邮件主题
				{name:'toIndex',type:'int'}, // 群发时，记录群发位置
				{name:'sendTime',type:'jsondate'}, // 发送时间
				{name:'size',type:'int'}, // 邮件大小
				{name:'isNotification',type:'boolean'}, // 是否需要回执
				{name:'isContainAttach',type:'boolean'}, // 是否包含附件
				{name:'mailType',type:'string'}, // 邮件类型 
				{name:'isRead',type:'boolean'}, // 邮件状态 
				{name:'mailTag',type:'string'}, // 邮件标示 
				{name:'emlPath',type:'string'}, // 原邮件地址
				{name:'addTime',type:'jsondate'}, // 添加时间
				{name:'sendPriv',type:'string'}, // 
				{name:'errorMsg',type:'string'}, // 错误信息
				{name:'remark',type:'string'}, // 备注
				{name:'bodyType',type:'string'}, // 内容类型 
				{name:'sender'}, // 发件人 
				{name:'to'}, // 收件人 
				{name:'cc'}, // 抄送人 
				{name:'bcc'}, // 暗送人 
				{name:'replyTo'}, // 回复人 
				{name:'sendEmpId'}, // 发送这封邮件的业务员
				{name:'execEmpId'}, // 执行
				{name:'checkEmpId'}, // 审核人
				{name:'mailFlagId'}, // 邮件旗积
				{name:'nodeId'}, // 所属节点ID
				{name:'contactId'}, // 联系人
				{name:'identityId'}
			],
			url : 'remote_mail.do'
		});
		
		QH.mail.RemoteStore.superclass.constructor.call(this);
	}
});