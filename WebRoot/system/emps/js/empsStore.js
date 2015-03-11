/**
 * @author zhao
 * @class QH.emps.Store
 * @extends QH.data.Store
 */
QH.emps.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
		{name:'id'}, // 
		{name:'deptId'}, // 
		{name:'empsName',type:'string'}, // 英文名
		{name:'empNameCn',type:'string'}, // 中文名
		{name:'empsId'}, // 登陆账号
		{name:'empsStatus',type:'int'}, // 状态：1在职，9离职
		{name:'empsRemark',type:'string'}, // 
		{name:'empsPhone',type:'string'}, // 联系电话
		{name:'empsMobile',type:'string'}, // 移动电话
		{name:'companyId'} // 
			],
			url : 'list_emps.do'
		});
		QH.emps.Store.superclass.constructor.call(this);
	}
});