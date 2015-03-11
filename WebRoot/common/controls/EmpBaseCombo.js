/**
 * 业务员下拉框
 * @class QH.controls.FactoryBaseCombo
 * @extends QH.ux.form.BaseComboxField
 */
QH.controls.EmpBaseCombo = Ext.extend(QH.ux.form.BaseComboxField,{
	/**
	 * dataUrl:commonpopedomcombo.do----带权限判断URL，需要指定queryParams:{popedomUrl:url}
	 * 		  ：commoncombo.do ----不带权限判读URL
	 * @type String
	 */
	dataUrl : "commonpopedomcombo.do",
	objName:'CotEmps',
	editable : true,
	isSearchField:true,
	hideTrigger2:true,
	searchName:'empId',
	name:'empId',
	emptyText:'请选择',
	fieldLabel:'业务员',
	valueField : "id",
	displayField : "empsId",
	pageSize : QH_COMBO_PAGE_SIZE,
	anchor : "100%",
	selectOnFocus : true,
	sendMethod : "post",
	listWidth : 350,
	queryParams:{
		popedomUrl:"emps.do",
		popedomQueryId:"id"
	}
});

Ext.reg('empbasecombo',QH.controls.EmpBaseCombo);
