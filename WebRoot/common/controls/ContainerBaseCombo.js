/**
 * 集装箱
 * @class QH.controls.ContainerBaseCombo
 * @extends QH.ux.form.BaseComboxField
 */
QH.controls.ContainerBaseCombo = Ext.extend(QH.ux.form.BaseComboxField,{
	dataUrl : "commoncombo.do",
	objName:'CotContainerType',
	editable : true,
	hideTrigger2:true,
	isSearchField:true,
	searchName:'containerTypeId',
	name:'containerTypeId',
	emptyText:'请选择',
	fieldLabel:'集装箱',
	valueField : "id",
	displayField : "containerName",
	pageSize : QH_COMBO_PAGE_SIZE,
	anchor : "100%",
	selectOnFocus : true,
	sendMethod : "post"
});

Ext.reg('containerbasecombo',QH.controls.ContainerBaseCombo);
