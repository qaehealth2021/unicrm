/**
 * 国家下拉框
 * @class QH.controls.CityBaseCombo
 * @extends QH.ux.form.BaseComboxField
 */
QH.controls.CityBaseCombo = Ext.extend(QH.ux.form.BaseComboxField,{
	dataUrl : "commoncombo.do",
	objName:'CotCity',
	editable : true,
	hideTrigger2:true,
	isSearchField:true,
	searchName:'area.cityId',
	name:'cityId',
	emptyText:'请选择',
	fieldLabel:'省份',
	valueField : "id",
	displayField : "cityName",
	pageSize : QH_COMBO_PAGE_SIZE,
	anchor : "100%",
	selectOnFocus : true,
	sendMethod : "post"
});

Ext.reg('citybasecombo',QH.controls.CityBaseCombo);
