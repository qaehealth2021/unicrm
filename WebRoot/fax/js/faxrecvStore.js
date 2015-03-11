/**
 * @author zhao
 * @class QH.faxrecv.Store
 * @extends QH.data.Store
 */
QH.faxrecv.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
				{name:'id'}, // 
				{name:'title',type:'string'}, // 传真主题
				{name:'customerId'}, // 客户编号
				{name:'orderNo',type:'string'}, // 订单号
				{name:'remark',type:'string'}, // 订单备注
				{name:'airRemark',type:'string'}, // 备注
				{name:'orderPol',type:'string'}, // 起运港
				{name:'orderPod',type:'string'}, // 目的港
				{name:'empsId'}, // 业务员
				{name:'statusId'}, // 数据字典(wlzt)--物流状态
				{name:'ic',type:'int'}, // 国际区号
				{name:'ldc',type:'int'}, // 长途区号
				{name:'page',type:'int'}, // 页数
				{name:'recvtime',type:'int'}, // 接收时间
				{name:'fax',type:'string'},// 传真号码
				{name:'faxfile',type:'string'},// 传真文件
				{name:'deviceid',type:'string'},// 传真机SN码
				{name:'readflag',type:'int'}// 已读标识：0：未读1：已读
			],
			url : 'listrecv_fax.do'
		});
		QH.faxrecv.Store.superclass.constructor.call(this);
	}
});