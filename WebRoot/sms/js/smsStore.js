/**
 * @author zhao
 * @class QH.sms.Store
 * @extends QH.data.Store
 */
QH.sms.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
				{name:'id'}, // 
				{name:'smId',type:'string'}, // 短信编号
				{name:'content',type:'string'}, // 短信内容
				{name:'mobiles'}, // 电话号码
				{name:'saveTime',type:'jsondate'},//添加时间
				{name:'customerId'}, // 客户编号
				{name:'contactId'}, // 联系人编号
				{name:'orderNo'}, // 订单号
				{name:'remark'}, // 订单备注
				{name:'airRemark'}, // 空运备注
				{name:'empId'}, // 业务员
				{name:'statusId'} // 数据字典(wlzt)--物流状态
			],
			url : 'list_sms.do'
		});
		QH.sms.Store.superclass.constructor.call(this);
	}
});