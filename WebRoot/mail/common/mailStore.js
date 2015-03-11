/**
 * @author zhao
 * @class QH.mail.Store
 * @extends QH.data.Store
 */
QH.mail.Store = Ext.extend(QH.data.GroupingStore,{
	autoDestroy: true,
	remoteSort:true,
	groupOnSort:true,
	groupDir:'DESC',
	autoLoad:false,
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
				{name:'priority',type:'int'}, // 邮件优先级
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
				{name:'identityId'},
				{name:'orderNo',type:'string'},
				{name:'orderRemark',type:'string'},
				{name:'orderAirRemark',type:'string'},
				{name:'orderPol',type:'string'},
				{name:'orderPod',type:'string'},
				{name:'trackStatus'},
				{name:'custId'},
				{name:'consignCustId'}
			],
			url : 'list_mail.do'
		});
		
		QH.mail.Store.superclass.constructor.call(this);
		this.on('beforeload',function(store,options){
			// 设置加载时，是否显示子节点邮件
			this.setBaseParam('showChildMail',MAIL_NODE_SHOW_CHILD_MAIL);
		});
	},
	// 默认排序为ASC，重写该方法，使默认排序为DESC
    sort : function(fieldName, dir){
    	if (!dir) {
            if (this.sortInfo.field == fieldName) { // toggle sort dir
//            	var tmpFieldName = fieldName;
//				if(fieldName.indexOf('.') > -1){
//					tmpFieldName = fieldName.substring(0,fieldName.indexOf('.'));
//				}
                dir = this.sortToggle[tmpFieldName].toggle('ASC', 'DESC');
            } else {
                dir = 'DESC';
            }
        }
    	return QH.mail.Store.superclass.sort.call(this,fieldName,dir);
    }
});