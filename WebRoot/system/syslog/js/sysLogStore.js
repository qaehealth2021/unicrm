/**
 * @author zhao
 * @class QH.sysLog.Store
 * @extends QH.data.Store
 */
QH.sysLog.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
				{name:'id'}, // $commonUtil.renderComment($obj.comment)
				{name:'opMessage',type:'string'}, // 操作日志
				{name:'opTime',type:'jsondate'}, // 操作时间
				{name:'opType',type:'int'}, // 操作类型:0:登录，9：登出
				{name:'opModule',type:'string'}, // 操作模块,login,logout
				{name:'empsId'} // $commonUtil.renderComment($obj.comment)
			],
			url : 'list_syslog.do'
		});
		QH.sysLog.Store.superclass.constructor.call(this);
	}
});