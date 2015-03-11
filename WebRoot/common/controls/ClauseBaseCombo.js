/**
 * 价格条款下拉框
 * @class QH.controls.ClauseBaseCombo
 * @extends QH.ux.form.BaseComboxField
 */
QH.controls.ClauseBaseCombo = Ext.extend(QH.ux.form.BaseComboxField,{
	dataUrl : "commoncombo.do",
	objName:'CotClause',
	editable : true,
	hideTrigger2:true,
	name:'clauseId',
	emptyText:'请选择',
	fieldLabel:'价格条款',
	valueField : "id",
	displayField : "clauseName",
	pageSize : QH_COMBO_PAGE_SIZE,
	anchor : "100%",
	selectOnFocus : true,
	sendMethod : "post",
	listWidth : 350
});

Ext.reg('clausebasecombo',QH.controls.ClauseBaseCombo);
