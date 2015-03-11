/**
 * @author zhao
 * @class QH.contact.Store
 * @extends QH.data.Store
 */
QH.contact.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
				{name:'id',type:'int'}, // 
				{name:'contactPerson',type:'string'}, // 联系人
				{name:'contactNbr',type:'string'}, // 电话
				{name:'contactEmail',type:'string'}, // 邮箱
				{name:'contactDuty',type:'string'}, // 职务
				{name:'contactFax',type:'string'}, // 传真
				{name:'contactFlag',type:'string'}, // F:厂家,C:客户,S:陌生人
				{name:'contactMobile',type:'string'}, // 手机
				{name:'xLite',type:'string'}, // xLite
				{name:'msn',type:'string'}, // msn
				{name:'skype',type:'string'}, // skype
				{name:'upMan',type:'string'}, // 上级
				{name:'customerId'}, // 客户
				{name:'empsId'} // 跟进人
			]
			//url : 'list_contact.do'
		});
		QH.contact.Store.superclass.constructor.call(this);
	}
});