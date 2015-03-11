
/**
 * @author azan
 * @class QH.price.FormPanel
 * @extends QH.form.FormPanel
 */
QH.price.FormPanel = Ext.extend(QH.form.FormPanel, {
			isAddFbar : false,
			border : false,
			frame : false,
			title : '筛选',
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
							columnWidth : 0.16,
							border : false,
							bodyStyle : {
								backgroundColor : '#DFE8F6'
							},
							layout : "form",
							items : [{
										xtype : "textfield",
										fieldLabel : "Carrier",
										anchor : "100%",
										name : "price.carrier",
										tabIndex : 1,
										maxLength : 100
									}, {
										xtype : "textfield",
										fieldLabel : "Pol",
										anchor : "100%",
										name : "price.polCode",
										tabIndex : 2,
										maxLength : 100
									}, {
										xtype : "textfield",
										fieldLabel : "Pod",
										anchor : "100%",
										name : "price.podCode",
										tabIndex : 3,
										maxLength : 100
									}]
						}, {
							xtype : "panel",
							columnWidth : 0.16,
							border : false,
							bodyStyle : {
								backgroundColor : '#DFE8F6'
							},
							layout : "form",
							items : [{
										xtype : "textfield",
										fieldLabel : "1 T/S",
										anchor : "100%",
										name : "price.onets",
										tabIndex : 4,
										maxLength : 100
									}, {
										xtype : "textfield",
										fieldLabel : "2 T/S",
										anchor : "100%",
										name : "price.twots",
										tabIndex : 5,
										maxLength : 100
									}, {
										xtype : "textfield",
										fieldLabel : "3 T/S",
										anchor : "100%",
										name : "price.threets",
										tabIndex : 6,
										maxLength : 100
									}]
						}, {
							xtype : "panel",
							columnWidth : 0.16,
							border : false,
							bodyStyle : {
								backgroundColor : '#DFE8F6'
							},
							layout : "form",
							labelWidth : 70,
							items : [{
										xtype : "textfield",
										fieldLabel : "录入人",
										anchor : "100%",
										name : "price.inputPeople",
										tabIndex : 7,
										maxLength : 100
									}, {
										xtype : "daterangefield",
										fieldLabel : "有效期从",
										anchor : "100%",
										id : 'startTime',
										name : "startTime",
										endDateId : 'endTime',
										tabIndex : 8
									}, {
										xtype : "daterangefield",
										fieldLabel : "到",
										anchor : "100%",
										id : "endTime",
										name : "endTime",
										startDateId : 'startTime',
										tabIndex : 9
									}]
						}, {
							xtype : "panel",
							columnWidth : 0.1,
							border : false,
							bodyStyle : {
								backgroundColor : '#DFE8F6'
							},
							layout : "form",
							items : [{
								xtype : "button",
								iconCls : "page_sel",
								width : 70,
								style : 'margin-left:15px;margin-top:5px',
								text : "查找",
								handler : form.queryMethod.createDelegate(this,
										[form])
							}, {
								xtype : "button",
								iconCls : "page_reset",
								width : 70,
								style : 'margin-left:15px;margin-top:5px',
								text : "清空",
								handler : function() {
									form.getForm().reset();
								}
							}]
						}, {
							xtype : 'hidden',
							name : 'id'
						}];
				QH.price.FormPanel.superclass.initComponent.call(this);
			},
			queryMethod : function(form) {
				var actPanel = QHERP_VIEWPORT.gridPanel;
				var ds = actPanel.getStore();
				Ext.apply(ds.baseParams, getFormValues(form, false));
				ds.reload();
			}
		});

Ext.reg('queryform', QH.price.FormPanel);