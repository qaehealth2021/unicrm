
/**
 * @author zhao
 * @class QH.emps.Store
 * @extends QH.data.Store
 */
QH.emps.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{
			record : [
				{name:'id',type:'string'}, // 
				{name:'empsName',type:'string'}, // 中文名
				{name:'empsNameEn',type:'string'}, // 英文名
				{name:'empsId',type:'string'}, // 登录名
				{name:'empsStatus',type:'string'}, // 状态: 0:离职 1:在职
				{name:'empsRemark',type:'string'}, // 备注
				{name:'empsMail',type:'string'}, // 
				{name:'empsMailpwd',type:'string'}, // 
				{name:'empsMailhost',type:'string'}, // 
				{name:'empsPop3port',type:'string'}, // 
				{name:'empsIssspop3',type:'string'}, // 
				{name:'empsMailhostSmtp',type:'string'}, // 
				{name:'empsIssslsmtp',type:'string'}, // 
				{name:'empsSmtpport',type:'string'}, // 
				{name:'epmsMintues',type:'string'}, // 
				{name:'empsPhones',type:'string'}, // 电话
				{name:'empsMobile',type:'string'}, // 手机
				{name:'empsSign',type:'string'}, // 
				{name:'empsMailTemplate',type:'string'}, // 
				{name:'empsMailTemplateReply',type:'string'}, // 
				{name:'empsMailTemplateTransmit',type:'string'}, // 
				{name:'empsQq',type:'string'}, // QQ
				{name:'empsMsn',type:'string'}, // MSN
				{name:'empsPwd',type:'string'}, // 密码
				{name:'cotDeptId',type:'string'}, // 所属部门
				{name:'cotCompanyId',type:'string'} // 所属公司
			],
			url : 'list_Emps.do'
		});
		QH.emps.Store.superclass.constructor.call(this);
	}
});
