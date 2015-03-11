/**
 * @author zhao
 * @class QH.company.Store
 * @extends QH.data.Store
 */
QH.company.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
		{name:'id'}, // 
		{name:'companyName',type:'string'}, // 中文名称
		{name:'companyNameEn',type:'string'}, // 英文名称
		{name:'companyShortName',type:'string'}, // 简称
		{name:'companyCorporation',type:'string'}, // 公司法人
		{name:'comapanyAddr',type:'string'}, // 中文地址
		{name:'companyAddrEn',type:'string'}, // 英文地址
		{name:'companyNbr',type:'string'}, // 公司电话
		{name:'companyFax',type:'string'}, // 公司传真
		{name:'companyPost',type:'string'}, // 邮编
		{name:'companyWebSite',type:'string'}, // 公司网址
		{name:'companyMail',type:'string'}, // 邮箱
		{name:'remark',type:'string'}, // 备注
		{name:'companyLogo',type:'string'}, // Logo
		{name:'identityId'} // 序列号
			],
			url : 'list_company.do'
		});
		QH.company.Store.superclass.constructor.call(this);
	}
});