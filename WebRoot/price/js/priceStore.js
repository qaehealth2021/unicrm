/**
 * @author azan
 * @class QH.price.Store
 * @extends QH.data.Store
 */
QH.price.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
//				{name:'podCode',type:'int'}, // 状态：1接收/2发送
//				{name:'smsDate',type:'jsondate'},//收发时间
				{name:'id'}, // 
				{name:'carrier'}, // 船公司/航空公司
				{name:'polCode'}, // 起运港
				{name:'podCode'}, // 目的港
				{name:'twenTygp',type:'float'}, // 20尺平柜
				{name:'forTygp',type:'float'}, // 40尺平柜
				{name:'fortyHq',type:'float'}, // 40尺高柜
				{name:'fortyFiveHc',type:'float'}, // 45尺柜
				{name:'fortyNor',type:'float'}, // 40冻代平
				{name:'onets'}, // 中转港
				{name:'twots'}, // 中转港
				{name:'threets'}, //中转港
				{name:'lcl',type:'float'}, // 拼箱费用
				{name:'min',type:'float'}, // 最低收费
				{name:'fortyFive',type:'float'}, // 45公斤以上
				{name:'hundRed',type:'float'}, // 100公斤以上
				{name:'threeHundRed',type:'float'}, // 300公斤以上
				{name:'fiveHundRed',type:'float'}, // 500公斤以上
				{name:'thouSand',type:'float'}, // 1000公斤以上
				{name:'threeThousand',type:'float'}, // 3000公斤以上
				{name:'fsc',type:'float'}, // 燃油附加费
				{name:'ssc',type:'float'}, // 战险
				{name:'thc',type:'float'}, // 码头费用/地面处理费
				{name:'validity',type:'jsondate'}, // 报价有效期
				{name:'remarks'}, // 备注
				{name:'vender'}, // 报价供应商
				{name:'inputPeople'}, // 报价录入人
				{name:'iputDate',type:'jsondate'}, // 录入报价的日期
				{name:'quoteType',type:'int'}, // 报价类型数字分别代表什么意思需要告知---（0:整柜，1:拼箱，2:空运）
				{name:'mon',type:'int'}, // ETD 开航日期选择
				{name:'tue',type:'int'}, // ETD 开航日期选择
				{name:'wed',type:'int'}, // ETD 开航日期选择
				{name:'thu',type:'int'}, // ETD 开航日期选择
				{name:'fri',type:'int'}, //ETD 开航日期选择
				{name:'sat',type:'int'}, //ETD 开航日期选择
				{name:'sun',type:'int'}, // ETD 开航日期选择
				{name:'nprice',type:'float'}, // N级价
				{name:'currency'}, // 币种
				{name:'fre'}, // 空运部开航日期
				{name:'days'}, // 天数
				{name:'destinationCharges'}, // 目的港收费
				{name:'destinationAgent'}, // 目的港代理
				{name:'modifiedDateTime',type:'jsondate'}, // 
				{name:'modifiedBy'}, //
				{name:'createdDateTime',type:'jsondate'}, // 
				{name:'createdBy'}, // 
				{name:'dataAreaId'}, // 
				{name:'recversion',type:'int'} //
			],
			url : 'list_price'+$('typeId').value+'.do'
		});
		QH.price.Store.superclass.constructor.call(this);
	}
});