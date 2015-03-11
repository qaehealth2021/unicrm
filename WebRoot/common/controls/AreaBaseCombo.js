/**
 * 国家下拉框
 * @class QH.controls.CityBaseCombo
 * @extends QH.ux.form.BaseComboxField
 */
QH.controls.AreaBaseCombo = Ext.extend(QH.ux.form.BaseComboxField,{
	dataUrl : "commoncombo.do",
	objName:'CotArea',
	editable : true,
	hideTrigger2:true,
	isSearchField:true,
	searchName:'areaId',
	name:'areaId',
	emptyText:'请选择',
	fieldLabel:'洲',
	valueField : "id",
	displayField : "areaName",
	pageSize : QH_COMBO_PAGE_SIZE,
	anchor : "100%",
	selectOnFocus : true,
	sendMethod : "post"
});

Ext.reg('areabasecombo',QH.controls.AreaBaseCombo);
