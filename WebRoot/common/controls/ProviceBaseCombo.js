/**
 * 省州下拉框
 * @class QH.controls.ProviceBaseCombo
 * @extends QH.ux.form.BaseComboxField
 */
QH.controls.ProviceBaseCombo = Ext.extend(QH.ux.form.BaseComboxField,{
	dataUrl : "commoncombo.do",
	objName:'CotProvice',
	editable : true,
	hideTrigger2:true,
	name:'proviceId',
	emptyText:'请选择',
	fieldLabel:'省份',
	valueField : "id",
	displayField : "provinceName",
	pageSize : QH_COMBO_PAGE_SIZE,
	anchor : "100%",
	selectOnFocus : true,
	sendMethod : "post",
	listWidth : 350
});

Ext.reg('provicebasecombo',QH.controls.ProviceBaseCombo);
