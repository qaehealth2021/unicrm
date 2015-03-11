/**
 * 包装材质编辑表单js
 * @class QH.boxMaterial.FormPanel
 * @extends QH.form.FormPanel
 */
QH.boxMaterial.FormPanel = Ext.extend(QH.form.FormPanel, {
	initComponent : function() {
		this.items = [{
					xtype : "panel",
					layout : "column",
					items : [{
							xtype : "panel",
							columnWidth : 0.4,
							layout : "form",
							border : false,
							labelWidth : 100,
							items : [{
										xtype : "textfield",
										id : "value",
										name : "value",
										fieldLabel : "包材名称(中文)",
										anchor : "92%",
										allowBlank : false,
										tabIndex : 1,
										blankText : "名称不能为空"
									}, {
										xtype : "textfield",
										id : "valueEn",
										name : "valueEn",
										fieldLabel : "包材名称(英文)",
										tabIndex : 4,
										anchor : "92%"
									}]
						}, {
							xtype : "panel",
							columnWidth : 0.6,
							border : false,
							layout : "column",
							labelWidth : 100,
							items : [{
										xtype : "panel",
										columnWidth : 0.5,
										padding : "0",
										layout : "form",
										labelWidth : 60,
										border : false,
										items : [{
											xtype:"factorybasecombo",
											name:'factoryId.id',
											hiddenName:'factoryId.id',
											tabIndex : 2
										}, {
													xtype : "numberfield",
													id : "materialPrice",
													name : "materialPrice",
													fieldLabel : "材料单价",
													tabIndex : 5,
													anchor : "100%",
													maxValue : 9999999.999,
													decimalPrecision : 3,
													xtype : "numberfield",
													validateOnBlur : false
												}]
									}, {
										xtype : "panel",
										columnWidth : 0.5,
										padding : "0",
										layout : "form",
										labelWidth : 60,
										border : false,
										items : [{
											xtype:"boxtypebasecombo",
											name:'boxTypeId.id',
											hiddenName:'boxTypeId.id'
										}, {
													xtype : "textfield",
													id : "unit",
													name : "unit",
													fieldLabel : "计价单位",
													tabIndex : 6,
													anchor : "100%"
												}]
									}]
						}, {
							xtype : "panel",
							columnWidth : 1,
							layout : "form",
							labelWidth : 100,
							items : [{
								xtype : "textarea",
								id : "formulaOut",
								name : "formulaOut",
								fieldLabel : "普通包材公式",
								tabIndex : 7,
								height : 55,
								listeners : {
									'focus' : function(t) {
										var po = t.getPosition();
										pl
												.setPosition(po[0]+30, po[1]+20);
										pl.show();
									}
								},
								anchor : "100%"
							},{
								xtype : "textarea",
								id : "formulaOutOther",
								name : "formulaOutOther",
								fieldLabel : "其他包材公式",
								tabIndex : 7,
								height : 55,
								listeners : {
									'focus' : function(t) {
										var po = t.getPosition();
										p2p
												.setPosition(po[0]+30, po[1]+20);
										p2p.show();
									}
								},
								anchor : "100%"
							}, {
								xtype : "textarea",
								id : "remark",
								name : "remark",
								height : 120,
								fieldLabel : "备注",
								tabIndex : 8,
								anchor : "100%"
							}]
						}, {
							xtype : 'hidden',
							name : 'id',
							id : 'id'
						}, {
							xtype : 'hidden',
							name : 'formulaIn',
							id : "formulaIn"
						}, {
							xtype : 'hidden',
							name : 'formulaInOther',
							id : "formulaInOther"
						}, {
							xtype : 'hidden',
							name : 'checkCalculation',
							id : 'checkCalculation'
						}, {
							xtype : 'hidden',
							name : 'checkCalculation2',
							id : 'checkCalculation2'
						}]
				}];
		QH.boxMaterial.FormPanel.superclass.initComponent.call(this);
	}
});

Ext.reg('boxmaterialform', QH.boxMaterial.FormPanel);