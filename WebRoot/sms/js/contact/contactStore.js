/**
 * @author azan
 * @class QH.sms.ContactStore
 * @extends QH.data.Store
 */
QH.sms.ContactStore = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
				{name:'id',type:'int'}, // 
				{name:'contactPerson',type:'string'}, // 联系人
				{name:'contactMobile',type:'string'}, // 手机
				{name:'contactFax',type:'string'}, // 传真
				{name:'customerId'}
			]
			//url : 'list_customercontact.do'
		});
		QH.sms.ContactStore.superclass.constructor.call(this);
	}
});