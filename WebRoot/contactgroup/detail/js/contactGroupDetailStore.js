/**
 * @author zhao
 * @class QH.contactGroupDetail.Store
 * @extends QH.data.Store
 */
QH.contactGroupDetail.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
				{name:'id'}, // $commonUtil.renderComment($obj.comment)
				{name:'groupId'}, // 联系人所属组的ID
				{name:'contactId'} // 联系人ID
			],
			autoLoad:false,
			url : 'listdetail_contactgroup.do'
		});
		QH.contactGroupDetail.Store.superclass.constructor.call(this);
	}
});