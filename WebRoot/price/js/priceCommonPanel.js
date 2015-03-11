
/**
 * @author azan
 * @class QH.price.CommonPanel
 * @extends QH.form.FormPanel
 */
QH.price.CommonPanel = Ext.extend(QH.form.FormPanel, {
			isAddFbar : false,
			border : false,
			frame : false,
			padding : 5,
			bodyStyle : {
				backgroundColor : '#DFE8F6'
			},
			layout : 'column',
			labelWidth : 50,
			initComponent : function() {
				var form = this;
				this.items = [{
							xtype : "panel",
							columnWidth : 0.25,
							border : false,
							bodyStyle : {
								backgroundColor : '#DFE8F6'
							},
							layout : "form",
							items : [{
										xtype : 'panel',
										title : '标识',
										border : false,
										layout : "form",
										bodyStyle : {
											backgroundColor : '#DFE8F6'
										},
										items : [{
													xtype : "textfield",
													fieldLabel : "Carrier",
													anchor : "100%",
													name : "carrier",
													tabIndex : 1,
													maxLength : 100
												}, {
													xtype : "textfield",
													fieldLabel : "Pol",
													anchor : "100%",
													name : "polCode",
													tabIndex : 2,
													maxLength : 100
												}, {
													xtype : "textfield",
													fieldLabel : "Pod",
													anchor : "100%",
													name : "podCode",
													tabIndex : 3,
													maxLength : 100
												}, {
													xtype : "textfield",
													fieldLabel : "Currency",
													anchor : "100%",
													name : "currency",
													tabIndex : 4,
													maxLength : 100
												}]
									}, {
										xtype : 'panel',
										title : '报价',
										border : false,
										layout : "form",
										bodyStyle : {
											backgroundColor : '#DFE8F6'
										},
										items : [{
													xtype : "numberfield",
													fieldLabel : "20GP",
													anchor : "100%",
													name : "twenTygp",
													tabIndex : 5,
													maxLength : 100
												}, {
													xtype : "numberfield",
													fieldLabel : "40GP",
													anchor : "100%",
													name : "forTygp",
													tabIndex : 6,
													maxLength : 100
												}, {
													xtype : "numberfield",
													fieldLabel : "40HQ",
													anchor : "100%",
													name : "fortyHq",
													tabIndex : 7,
													maxLength : 100
												}, {
													xtype : "numberfield",
													fieldLabel : "45HC",
													anchor : "100%",
													name : "fortyFiveHc",
													tabIndex : 8,
													maxLength : 100
												}, {
													xtype : "numberfield",
													fieldLabel : "45NOR",
													anchor : "100%",
													name : "fortyNor",
													tabIndex : 9,
													maxLength : 100
												}]
									}]
						}, {
							xtype : "panel",
							columnWidth : 0.25,
							title : '中转港口/日期',
							border : false,
							bodyStyle : {
								backgroundColor : '#DFE8F6'
							},
							layout : "form",
							labelWidth:100,
							items : [{
										xtype : "textfield",
										fieldLabel : "1 T/S",
										anchor : "100%",
										name : "onets",
										tabIndex : 10,
										maxLength : 100
									}, {
										xtype : "textfield",
										fieldLabel : "2 T/S",
										anchor : "100%",
										name : "twots",
										tabIndex : 11,
										maxLength : 100
									}, {
										xtype : "textfield",
										fieldLabel : "(T/T)Days",
										anchor : "100%",
										name : "days",
										tabIndex : 12,
										maxLength : 100
									}]
						}, {
							xtype : "panel",
							columnWidth : 0.1,
							title : 'ETD',
							border : false,
							bodyStyle : {
								backgroundColor : '#DFE8F6'
							},
							layout : "form",
							labelWidth : 70,
							items : [{
										xtype : "checkbox",
										fieldLabel : "Mon",
										anchor : "100%",
										name : "mon",
										tabIndex : 13
									}, {
										xtype : "checkbox",
										fieldLabel : "Tue",
										anchor : "100%",
										name : "tue",
										tabIndex : 14
									}, {
										xtype : "checkbox",
										fieldLabel : "Wed",
										anchor : "100%",
										name : "wed",
										tabIndex : 15
									}, {
										xtype : "checkbox",
										fieldLabel : "Thu",
										anchor : "100%",
										name : "thu",
										tabIndex : 16
									}, {
										xtype : "checkbox",
										fieldLabel : "Fri",
										anchor : "100%",
										name : "fri",
										tabIndex : 17
									}, {
										xtype : "checkbox",
										fieldLabel : "Sat",
										anchor : "100%",
										name : "sat",
										tabIndex :18
									}, {
										xtype : "checkbox",
										fieldLabel : "Sun",
										anchor : "100%",
										name : "sun",
										tabIndex : 19
									}]
						}, {
							xtype : "panel",
							columnWidth : 0.25,
							title : '	备注',
							border : false,
							bodyStyle : {
								backgroundColor : '#DFE8F6'
							},
							layout : "form",
							labelWidth : 100,
							items : [{
								xtype : "combo",
								name : 'quoteType',
								fieldLabel : '报价类型',
								editable : false,
								store : new Ext.data.SimpleStore({
											fields : ["id", "name"],
											data : [[0, '整柜'], [1, '拼箱'],
													[2, '空运']]
										}),
								value : 0,
								valueField : "id",
								displayField : "name",
								mode : 'local',
								validateOnBlur : true,
								triggerAction : 'all',
								anchor : "100%",
								tabIndex : 20,
								emptyText : '请选择',
								hiddenName : 'quoteType',
								selectOnFocus : true
							}, {
								xtype : "textfield",
								anchor : '100%',
								tabIndex : 21,
								name : 'vender',
								fieldLabel : "供应商"
							}, {
								xtype : "datefield",
								anchor : '100%',
								tabIndex : 22,
								name : 'validity',
								fieldLabel : "有效期"
							}, {
								xtype : "datefield",
								anchor : '100%',
								tabIndex : 23,
								name : 'iputDate',
								fieldLabel : "录入时间"
							}, {
								xtype : "textfield",
								anchor : '100%',
								tabIndex : 24,
								name : 'inputPeople',
								fieldLabel : "录入人"
							}, {
								xtype : "textarea",
								height : 90,
								anchor : '100%',
								tabIndex : 25,
								name : 'remarks',
								fieldLabel : "注释"
							}]
						}, {
							xtype : 'hidden',
							name : 'id'
						}];
				QH.price.CommonPanel.superclass.initComponent.call(this);
				this.on('render',function(){
					var grid = QHERP_VIEWPORT.gridPanel;
					var sm=grid.getSelectionModel();
					var rec = sm.getSelected();
					form.initRightForm(rec);
				})
			},
			initRightForm : function(rec) {
				if(rec){
					this.getForm().reset();
					this.loadValueByGridRec(rec.data);
				}
			}
		});

Ext.reg('commonform', QH.price.CommonPanel);