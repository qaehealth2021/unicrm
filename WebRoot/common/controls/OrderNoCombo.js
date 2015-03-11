/**
 * 国家下拉框
 * @class QH.controls.CityBaseCombo
 * @extends QH.ux.form.BaseComboxField
 */
QH.controls.OrderNoCombo = Ext.extend(QH.ux.form.BaseComboxField,{
	dataUrl : "commoncombo.do",
	objName:'CotOrderNo',
	editable : true,
	hideTrigger2:false,
	isSearchField:true,
	name:'orderNo',
	emptyText:'请选择',
	fieldLabel:'单号',
	valueField : "orderNo",
	displayField : "orderNo",
	pageSize : QH_COMBO_PAGE_SIZE,
	anchor : "100%",
	listWidth : 350,
	selectOnFocus : true,
	sendMethod : "post",
	otherFields:[{name:'custId'},{name:'remark'},{name:'pol'},{name:'pod'},{name:'trackStatus'},{name:'airRemark'}],
	onTrigger2Click:function(btn){
		var _self = this;
		cotSeqService.getOrderNo(function(res){
			_self.setRawValue(res);
		})
	}
});

Ext.reg('ordernocombo',QH.controls.OrderNoCombo);
