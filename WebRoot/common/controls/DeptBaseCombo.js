/**
 * 部门下拉框
 * @class QH.ux.form.CompanyBaseCombo
 * @extends QH.ux.form.BaseComboxField
 */
QH.ux.form.DeptBaseCombo = Ext.extend(QH.ux.form.BaseComboxField,{
	dataUrl : "commoncombo.do",
	objName:'CotDept',
	editable : true,
	hideTrigger2:true,
	name:'deptId',
	emptyText:'请选择',
	fieldLabel:'部门',
	valueField : "id",
	displayField : "deptName",
	displayLabel:'部门名称',
	otherFields:[{
		name:'remark',type:'string'
	}],
	pageSize : QH_COMBO_PAGE_SIZE,
	anchor : "100%",
	selectOnFocus : true,
	sendMethod : "post",
	listWidth : 350
});

Ext.reg('deptbasecombo',QH.ux.form.DeptBaseCombo);
