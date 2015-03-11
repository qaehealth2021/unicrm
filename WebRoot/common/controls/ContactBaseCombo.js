/**
 * 价格条款下拉框
 * @class QH.controls.ClauseBaseCombo
 * @extends QH.ux.form.BaseComboxField
 */
QH.controls.ContactBaseCombo = Ext.extend(QH.ux.form.BaseComboxField,{
	dataUrl : "commoncombo.do",
	objName:'CotContact',
	editable : true,
	hideTrigger2:true,
	name:'contactId',
	emptyText:'请选择',
	fieldLabel:'联系人',
	valueField : "id",
	displayField : "contactPerson",
	pageSize : QH_COMBO_PAGE_SIZE,
	anchor : "100%",
	selectOnFocus : true,
	sendMethod : "post",
	listWidth : 350
});

Ext.reg('contactbasecombo',QH.controls.ContactBaseCombo);
