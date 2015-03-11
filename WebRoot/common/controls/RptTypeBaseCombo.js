/**
 * 报表类型
 * @class QH.controls.CityBaseCombo
 * @extends QH.ux.form.BaseComboxField
 */
QH.controls.RptTypeBaseCombo = Ext.extend(QH.ux.form.BaseComboxField,{
	dataUrl : "commoncombo.do",
	objName:'CotRptType',
	editable : true,
	hideTrigger2:true,
	isSearchField:true,
	searchName:'rptTypeId',
	name:'rptTypeId',
	emptyText:'报表类型',
	fieldLabel:'报表类型',
	valueField : "id",
	displayField : "rptName",
	//pageSize : 0,
	anchor : "100%",
	selectOnFocus : true,
	sendMethod : "post"
});

Ext.reg('rpttypebasecombo',QH.controls.RptTypeBaseCombo);
