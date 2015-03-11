/**
 * 客户下拉框
 * @class QH.controls.CustomerBaseCombo
 * @extends QH.ux.form.BaseComboxField
 */
QH.controls.CustomerBaseCombo = Ext.extend(QH.ux.form.BaseComboxField,{
	dataUrl : "commonpopedomcombo.do",
	objName:'CotCustomer',
	editable : true,
	hideTrigger2:true,
	isSearchField:true,
	searchName:'customerId',
	name:'customerId',
	emptyText:'请选择',
	fieldLabel:'客户',
	valueField : "id",
	displayField : "customerShortName",
	pageSize : QH_COMBO_PAGE_SIZE,
	anchor : "100%",
	selectOnFocus : true,
	sendMethod : "post",
	listWidth:350,
	getListParent : function() {
		return this.el.up('.x-menu');
	},
	queryParams:{
		popedomUrl:"customer.do",
		popedomQueryId:"id"
	}
});

Ext.reg('customerbasecombo',QH.controls.CustomerBaseCombo);
