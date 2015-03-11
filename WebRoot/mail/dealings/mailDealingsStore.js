/**
 * 往来邮件Store
 * @class QH.mail.DealingsMailStore
 * @extends QH.data.Store
 */
QH.mail.DealingsMailStore = Ext.extend(QH.data.Store,{
	autoLoad:false,
	constructor : function(config){
		Ext.apply(this,config,{
			record:[
				{name:'id',type:'int'},
				{name:"subject",type:'string'},
				{name:'sendTime',type:'jsondate'},
				{name:'isContainAttach',type:'boolean'},
				{name:'mailType',type:'string'}
			],
			url : 'dealingsmail_mail.do'
		});
		QH.mail.DealingsMailStore.superclass.constructor.call(this);
	}
});
/**
 * 往来附件Store
 * @class QH.mail.DealingsAttachStore
 * @extends QH.data.Store
 */
QH.mail.DealingsAttachStore = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{
			record:[
				{name:'id',type:'int'},
				{name:"mailId",mapping:'cotMail.id',type:'int'},
				{name:"name",type:'string'},
				{name:"size",type:'int'},
				{name:"url",type:'string'},
				{name:'sendTime',mapping:'cotMail.sendTime',type:'jsondate'}
			],
			url : 'dealingsattach_mail.do'
		});
		QH.mail.DealingsAttachStore.superclass.constructor.call(this);
	}
});
