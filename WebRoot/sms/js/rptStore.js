/**
 * @author zhao
 * @class QH.rpt.Store
 * @extends QH.data.Store
 */
QH.rpt.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
				{name:'id'}, // 
				{name:'mobile',type:'string'}, // 手机号码
				{name:'smID',type:'int'}, // MT短信的短信编号
				{name:'rptTime',type:'string'},//回执时间
				{name:'desc',type:'string'}, // 回执的描述信息
				{name:'code',type:'int'} // 回执编码
			],
			url : 'listrpt_sms.do'
		});
		QH.rpt.Store.superclass.constructor.call(this);
	}
});