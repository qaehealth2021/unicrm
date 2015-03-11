/**
 * 省州下拉框
 * @class QH.controls.NationBaseCombo
 * @extends QH.ux.form.BaseComboxField
 */
QH.controls.NationBaseCombo = Ext.extend(QH.ux.form.BaseComboxField,{
	dataUrl : "commoncombo.do",
	objName:'CotNation',
	editable : true,
	hideTrigger2:true,
	isSearchField:true,
	searchName:'provice.nationId',
	name:'nationId',
	emptyText:'请选择',
	fieldLabel:'国家',
	valueField : "id",
	displayField : "nationShort",
	pageSize : QH_COMBO_PAGE_SIZE,
	anchor : "100%",
	selectOnFocus : true,
	sendMethod : "post",
	listWidth : 350
});

Ext.reg('nationbasecombo',QH.controls.NationBaseCombo);
