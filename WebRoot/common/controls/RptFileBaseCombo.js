/**
 * 国家下拉框
 * @class QH.controls.CityBaseCombo
 * @extends QH.ux.form.BaseComboxField
 */
QH.controls.RptFileBaseCombo = Ext.extend(QH.ux.form.BaseComboxField,{
	dataUrl : "commoncombo.do",
	objName:'CotRptFile',
	editable : true,
	hideTrigger2:true,
	name:'rptFile',
	emptyText:'请选择',
	fieldLabel:'省份',
	valueField : "rptfilePath",
	displayField : "rptName",
	//pageSize : QH_COMBO_PAGE_SIZE,
	anchor : "100%",
	selectOnFocus : true,
	sendMethod : "post"
});

Ext.reg('rptfilebasecombo',QH.controls.RptFileBaseCombo);
