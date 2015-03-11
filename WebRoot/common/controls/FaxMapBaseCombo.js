/**
 * 国家下拉框
 * @class QH.controls.CityBaseCombo
 * @extends QH.ux.form.BaseComboxField
 */
QH.controls.FaxMapBaseCombo = Ext.extend(QH.ux.form.BaseComboxField,{
	dataUrl : "commoncombo.do",
	objName:'CotFaxdeviceMap',
	editable : true,
	hideTrigger2:true,
	isSearchField:true,
	name:'faxMapId',
	emptyText:'请选择',
	fieldLabel:'传真号',
	valueField : "id",
	displayField : "faxNbr",
	pageSize : QH_COMBO_PAGE_SIZE,
	anchor : "100%",
	selectOnFocus : true,
	sendMethod : "post"
});

Ext.reg('faxmapbasecombo',QH.controls.FaxMapBaseCombo);
