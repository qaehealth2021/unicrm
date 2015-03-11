/**
 * @author zhao
 * @class QH.customer.Store
 * @extends QH.data.Store
 */
QH.customer.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
				{name:'id',type:'int'}, // 
				{name:'customerNo',type:'string'}, // 公司代码
				{name:'customerShortName',type:'string'}, // 客户简称
				{name:'fullNameCn',type:'string'}, // 客户全称
				{name:'fullNameEn',type:'string'}, // 客户英文全称
				{name:'customerAddress',type:'string'}, // 公司地址
				{name:'custWeb',type:'string'}, // 网址
				{name:'areaId'}, // 洲
				{name:'nationId'}, // 国别
				{name:'proviceId'}, // 省州
				{name:'custLvId',type:'int'}, // 客户来源
				
				{name:'customerZm',type:'string'}, // 指定货代名称
				{name:'customerCm',type:'string'}, // 介绍客户名称
				{name:'customerNm',type:'string'}, // 组织名称
				{name:'customerZhm',type:'string'}, // 展会名称
				{name:'zhanTime',type:'string'}, // 展会时间
				{name:'custTypeId',type:'int'}, // 客户类型
				
				{name:'addTime',type:'jsondate'}, // 添加时间
				{name:'addPerson',type:'string'} // 添加人
			],
			url : 'list_customer.do'
		});
		QH.customer.Store.superclass.constructor.call(this);
	}
});