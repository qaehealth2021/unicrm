/**
 * 付款方式下拉框
 * @class QH.controls.PayTypeBaseCombo
 * @extends QH.ux.form.BaseComboxField
 */
QH.controls.CommonTypeBaseCombo = Ext.extend(QH.ux.form.BaseComboxField,{
	dataUrl : "commoncombo.do",
	objName:'CotDictionary',
	editable : true,
	hideTrigger2:true,
	isSearchField:true,
	name:'payType',
	emptyText:'请选择',
	fieldLabel:'付款方式',
	valueField : "id",
	displayField : "content",
	anchor : "100%",
	selectOnFocus : true,
	sendMethod : "post",
	listWidth : 200,
	getListParent : function() {
		return this.el.up('.x-menu');
	}
});

Ext.reg('commontypebasecombo',QH.controls.CommonTypeBaseCombo);
