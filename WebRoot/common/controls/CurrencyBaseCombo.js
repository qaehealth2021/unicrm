/**
 * 币种下拉框
 * @class QH.controls.NationBaseCombo
 * @extends QH.ux.form.BaseComboxField
 */
QH.controls.CurrencyBaseCombo = Ext.extend(QH.ux.form.BaseComboxField,{
	dataUrl : "commoncombo.do",
	objName:'CotCurrency',
	editable : true,
	hideTrigger2:true,
	isSearchField:true,
	searchName:'currencyId',
	name:'currencyId',
	emptyText:'请选择',
	fieldLabel:'币种',
	valueField : "id",
	displayField : "curNameEn",
	otherFields:[{
		name:'curRate',type:'float'
	}],
	anchor : "100%",
	selectOnFocus : true,
	sendMethod : "post"
});

Ext.reg('currencybasecombo',QH.controls.CurrencyBaseCombo);
