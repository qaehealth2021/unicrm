/**
 * 公司下拉框
 * @class QH.ux.form.CompanyBaseCombo
 * @extends QH.ux.form.BaseComboxField
 */
QH.ux.form.CompanyBaseCombo = Ext.extend(QH.ux.form.BaseComboxField,{
	dataUrl : "commoncombo.do",
	objName:'CotCompany',
	editable : true,
	hideTrigger2:true,
	name:'companyId',
	emptyText:'请选择',
	fieldLabel:'公司',
	valueField : "id",
	displayField : "companyShortName",
	otherFields:[{
		name:'companyNbr',type:'string'
	},{
		name:'companyMail',type:'string'
	}],
	pageSize : QH_COMBO_PAGE_SIZE,
	anchor : "100%",
	selectOnFocus : true,
	sendMethod : "post",
	listWidth : 350
});

Ext.reg('companybasecombo',QH.ux.form.CompanyBaseCombo);
