/**
 * @author zhao
 * @class QH.contactGroup.Store
 * @extends QH.data.Store
 */
QH.contactGroup.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
				{name:'id'}, // 对用户的需要群发的地址进行分组
				{name:'groupName',type:'string'}, // $commonUtil.renderComment($obj.comment)
				{name:'empsId'} // $commonUtil.renderComment($obj.comment)
			],
			url : 'list_contactgroup.do?contactGroup.empsId='+parseInt(window.GET_SESSION_EMPS_ID)
		});
		QH.contactGroup.Store.superclass.constructor.call(this);
	}
});