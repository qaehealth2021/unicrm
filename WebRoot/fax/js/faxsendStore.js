/**
 * @author zhao
 * @class QH.faxsend.Store
 * @extends QH.data.Store
 */
QH.faxsend.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
				{name:'id'}, // 
				{name:'customerId'}, // 客户编号
				{name:'contactId'}, // 联系人编号
				{name:'orderNo',type:'string'}, // 订单号
				{name:'remark',type:'string'}, // 订单备注
				{name:'airRemark',type:'string'}, // 备注
				{name:'orderPol',type:'string'}, // 备注
				{name:'orderPod',type:'string'}, // 备注
				{name:'empsId'}, // 业务员
				{name:'statusId'}, // 数据字典(wlzt)--物流状态
				{name:'telNum'}, // 电话号码
				{name:'flag',type:'int'}, // 状态：1接收/2发送
				{name:'ic',type:'int'}, // 国际区号
				{name:'ldc',type:'int'}, // 长途区号
				{name:'fax',type:'string'}, // 传真号码
				{name:'title',type:'string'}, // 传真主题
				{name:'sendFile',type:'string'}, // 传真主题
				{name:'status',type:'int'}, // 传真状态
				{name:'retCode',type:'int'} // 结果码
			],
			url : 'listsend_fax.do'
		});
		QH.faxsend.Store.superclass.constructor.call(this);
	}
});