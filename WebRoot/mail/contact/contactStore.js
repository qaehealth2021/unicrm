/**
 * @author zhao
 * @class QH.mail.ContactStore
 * @extends QH.data.Store
 */
QH.mail.ContactStore = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
				{name:'id',type:'int'}, // 
				{name:'contactPerson',type:'string'}, // 联系人
				{name:'contactNbr',type:'string'}, // 联系电话
				{name:'contactEmail',type:'string'}, // 邮箱
				{name:'contactDuty',type:'string'}, // 职务
				{name:'contactFax',type:'string'}, // 传真
				{name:'contactFlag',type:'string'}, // F:厂家,C:客户,S:陌生人
				{name:'contactMobile',type:'string'}, // 
				{name:'remark',type:'string'}, // 
				{name:'factoryId'}, // 
				{name:'customerId'}, // 
				{name:'empsId',type:'int'} // 
			]
			//url : 'list_contact.do'
		});
		QH.mail.ContactStore.superclass.constructor.call(this);
	}
});