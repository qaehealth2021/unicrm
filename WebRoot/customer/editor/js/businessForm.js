/**
 * 客户编辑页面表单
 * 
 * @class QH.customer.FormPanel
 * @extends QH.form.FormPanel
 */
QH.customer.BusinessForm = Ext.extend(QH.form.FormPanel, {
	isAddFbar : false,
	initComponent : function() {
		this.layout = "column";
		this.labelWidth = 60;
		this.labelAlign = "right";
		
		var areaBo=new QH.controls.AreaBaseCombo({
											tabIndex : 1,
											anchor : "96%",
											name : 'areaId',
											hiddenName : "areaId"
										});
		var nationBo=new QH.controls.NationBaseCombo({
											tabIndex : 1,
											anchor : "96%",
											name : 'nationId',
											hiddenName : "nationId",
											parentCombo : areaBo,
											parentComboWith:'areaId.id'
										});
		
		this.items = [{
					xtype : "panel",
					columnWidth : 1,
					layout : "column",
					hideBorders : false,
					items : [{
								xtype : "panel",
								title : "",
								columnWidth : 0.25,
								layout : "form",
								items : [areaBo]
							}, {
								xtype : "panel",
								title : "",
								columnWidth : 0.25,
								layout : "form",
								items : [nationBo]
							}, {
								xtype : "panel",
								title : "",
								columnWidth : 0.25,
								layout : "form",
								items : [{
											xtype : 'provicebasecombo',
											name : "proviceId",
											hiddenName : "proviceId",
											anchor : "96%",
											parentCombo : nationBo,
											parentComboWith:'nationId.id'
										}]
							}]
				}, {
					xtype : "panel",
					columnWidth : 1,
					layout : "column",
					hideBorders : false,
					items : [{
								xtype : "panel",
								title : "",
								columnWidth : 0.3,
								layout : "form",
								items : [{
											xtype : "commontypebasecombo",
											name : 'custTypeId',
											hiddenName : "custTypeId",
											fieldLabel : "客户类型",
											anchor : '100%',
											queryParams : {
												flag : "khlx"
											}
										}]
							}, {
								xtype : "panel",
								title : "",
								columnWidth : 0.3,
								layout : "form",
								items : [{
											xtype : "commontypebasecombo",
											name : 'custLvId',
											hiddenName : "custLvId",
											fieldLabel : "客户等级",
											anchor : '100%',
											queryParams : {
												flag : "khdj"
											}
										}]
							}]
				}, {}];
		QH.customer.BusinessForm.superclass.initComponent.call(this);
	}
});
Ext.reg('businessform', QH.customer.BusinessForm);