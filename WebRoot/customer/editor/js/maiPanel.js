/**
 * 客户唛标
 * 
 * @class QH.customer.MaiPanel
 * @extends Ext.Panel
 */
QH.customer.MaiPanel = Ext.extend(Ext.Panel, {
			initComponent : function() {
				this.layout = "column";
				this.labelWidth = 60;
				this.labelAlign = "right";
				this.items = [{
							xtype : "panel",
							title : "",
							columnWidth : 0.3,
							layout : "form",
							items : [{
										xtype : 'panel',
										title : '正唛',
										layout : 'form',
										items : [{
													xtype : "textarea",
													anchor : '100%',
													hideLabel : true,
													height : 170,
													allowBlank : true,
													maxLength : 200,
													id : "customerZm",
													name : "customerZm",
													tabIndex : 40
												}]
									}, {
										xtype : 'panel',
										title : '内盒唛',
										layout : 'form',
										items : [{
													xtype : "textarea",
													anchor : '100%',
													hideLabel : true,
													height : 170,
													allowBlank : true,
													maxLength : 200,
													id : "customerNm",
													name : "customerNm",
													tabIndex : 42
												}]
									}]
						}, {
							xtype : "panel",
							title : "",
							columnWidth : 0.3,
							layout : "form",
							items : [{
										xtype : 'panel',
										title : '侧唛',
										layout : 'form',
										items : [{
													xtype : "textarea",
													anchor : '100%',
													hideLabel : true,
													height : 170,
													allowBlank : true,
													maxLength : 200,
													id : "customerCm",
													name : "customerCm",
													tabIndex : 41
												}]
									}, {
										xtype : 'panel',
										title : '中盒唛',
										layout : 'form',
										items : [{
													xtype : "textarea",
													anchor : '100%',
													hideLabel : true,
													height : 170,
													allowBlank : true,
													maxLength : 200,
													id : "customerZhm",
													name : "customerZhm",
													tabIndex : 43
												}]
									}]
						}, {
							xtype : 'panel',
							title : '产品标',
							columnWidth : 0.15,
							layout : 'form',
							items : [{
										xtype : "textarea",
										anchor : '100%',
										height : 365,
										hideLabel : true,
										id : 'productArea',
										name : 'productArea',
										tabIndex : 50
									}]
						}, {
							xtype : "panel",
							title : "",
							layout : "form",
							columnWidth : 0.25,
							items : [{
										xtype : "fieldset",
										title : "产品标",
										layout : "form",
										columnWidth : 0.25,
										items : [{
													xtype : "imagetoolbar",
													scaleHeight : 150,
													scaleWidth : 150,
													queryId : this.modId,
													tbName : "CotCustomer",
													uploadPath : "productMb",
													field : "productMb"
												}]
									}, {
										xtype : "fieldset",
										title : "唛标",
										layout : "form",
										columnWidth : 0.25,
										items : [{
													xtype : "imagetoolbar",
													scaleHeight : 150,
													scaleWidth : 150,
													queryId : this.modId,
													tbName : "CotCustomer",
													uploadPath : "customerMb",
													field : "customerMb"
												}]
									}]
						}];
				QH.customer.MaiPanel.superclass.initComponent.call(this);
			}
		});
Ext.reg('maipanel', QH.customer.MaiPanel);