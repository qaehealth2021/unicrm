Ext.namespace('QH.statistics', 'QH.report', 'QH.mail');

//$importKeyCss(IMPORT_GRID_CSS);
//$importKey(IMPORT_GRID);
$importKey(IMPORT_DIC_COMBO);
$importKey(IMPORT_COMPANY_COMBO);
$importKey(IMPORT_DEPT_COMBO);
$importKey(IMPORT_CUSTOMER_COMBO);
$importKey(IMPORT_EMP_COMBO);
$importKey(IMPORT_ORDERNO_COMBO);
//$importKeyCss(IMPORT_BATCH_UPLOAD_CSS);
//$importKey(IMPORT_BATCH_UPLOAD);
// $import('sms/js/mail/mailStore.js');
// $import('sms/js/mail/mailGrid.js');
// $import('sms/js/mail/mailToolbar.js');
//
// $importCss('common/ext/resources/css/examples.css');
// $importCss('common/ext/resources/css/mail.css');
//
// $import('dwr/interface/mailReciveService.js');
// $import('dwr/interface/mailReadService.js');
// $import('dwr/interface/mailTreeService.js');
// $import('dwr/interface/mailAccountCfgService.js');
// $import('dwr/interface/mailUpdateService.js');
//
// $import('common/ext/examples.js');
//
// $import('common/js/ux/form/HtmlEditor.js');
//
// $import('mail/common/constants.js');
// $import('mail/common/mailFn.js');
// $import('mail/common/mailGrouping.js');
// $import('mail/common/mailGroupingRightMenu.js');
// $import('mail/common/mailRenderer.js');
// $import('mail/common/mailStore.js');
// $import('mail/common/SearchField.js');
// $import('mail/common/treeNodeTypes.js');

//$import('statistics/js/statisticsStore.js');
//$import('statistics/js/statisticsGrid.js');
//$import('statistics/js/statisticsTree.js');
//$import('statistics/js/statisticsToolbar.js');

Ext.onReady(function() {
	var reportUrl = "http://azan-pc:7080/ReportServer/Pages/ReportViewer.aspx?%2fReports%2fmail_report&rs:Command=Render";

	QH_VIEWPORT = new Ext.Viewport({
		layout : 'border',
		items : [
				// {
				// xtype:'statisticsgrid',
				// ref:'gridPanel'
				// }

				// ,{
				// xtype:'statisticstree',
				// region:'west',
				// ref:'statisticsTree',
				// width:200
				// }
				// ,{
				// xtype:'mailgrid',
				// region:'east',
				// width:400,
				// ref:'mailgrid'
				// }
				{
			xtype : 'panel',
			layout : 'column',
			frame : true,
			region : 'north',
			height : 40,
			items : [{
						xtype : 'panel',
						layout : 'form',
						labelAlign : 'right',
						labelWidth : 60,
						columnWidth : .15,
						items : [{
									xtype : 'companybasecombo',
									id : 'queryCompanyId',
									name : 'queryCompanyId',
									anchor : '100%'
								}]
					}, {
						xtype : 'panel',
						layout : 'form',
						labelAlign : 'right',
						labelWidth : 60,
						columnWidth : .15,
						items : [{
									xtype : 'deptbasecombo',
									id : 'queryDeptId',
									name : 'queryDeptId',
									parentCombo : 'queryCompanyId',
									parentComboWith : 'companyId.id',
									anchor : '100%'
								}]
					}, {
						xtype : 'panel',
						layout : 'form',
						labelAlign : 'right',
						labelWidth : 60,
						columnWidth : .15,
						items : [{
							xtype : 'empbasecombo',
							id : 'queryEmpId',
							name : 'queryEmpId',
							parentCombo : 'queryDeptId',
							parentComboWith : 'deptId.id',
							width : 90,
							listeners : {
								'select' : function(com, record, index) {
									var cbx = Ext.getCmp('queryCustId');
									var ds=cbx.getStore();
									ds.removeAll();
//									cbx.reset();
//									cbx.setValue("");
//									cbx.setRawValue("");
									var u = new ds.recordType({id:0,customerShortName:'请选择'});
									ds.add(u);
									if (record.data.id) {
										cbx.disable();
										DWREngine.setAsync(false);
										statisticsService.findCustomerByEmpId(
												record.data.id, function(m) {
													for (var p in m) {
														var obj={};
														obj.id=p;
														obj.customerShortName=m[p];
														u = new ds.recordType(obj);
														ds.add(u);
													}
													cbx.enable();
												})
										DWREngine.setAsync(true);
									}
								}
							}
						}]
					}, {
						xtype : 'panel',
						layout : 'form',
						labelAlign : 'right',
						labelWidth : 60,
						columnWidth : .15,
						items : [{
//							xtype : 'combo',
//							id : 'queryCustId',
//							name : 'queryCustId',
//							fieldLabel : '客户',
//							anchor : '100%',
//							editable : false,
//							store : new Ext.data.SimpleStore({
//										fields : ["id", "customerShortName"],
//										data : []
//									}),
//							valueField : "id",
//							displayField : "customerShortName",
//							mode : 'local',
//							validateOnBlur : true,
//							triggerAction : 'all',
//							emptyText : '请选择',
//							selectOnFocus : true,
//							listWidth : 250
							xtype : 'customerbasecombo',
							id : 'queryCustId',
							name : 'queryCustId',
							anchor : '100%'
						}]
					}, {
						xtype : 'panel',
						layout : 'form',
						labelAlign : 'right',
						labelWidth : 60,
						columnWidth : .15,
						items : [{
								xtype : 'ordernocombo',
								fieldLabel : '单号',
								id : 'orderNo',
								name : 'orderNo',
								anchor : '100%',
								needReset : false,
								parentCombo : 'queryCustId',
								parentComboWith : 'custId',
								hideTrigger2:true
							}]
					},{
						xtype : 'panel',
						columnWidth : .05,
						html:"&nbsp;"
					}, {
						xtype : 'panel',
						layout : 'form',
						labelAlign : 'right',
						labelWidth : 60,
						columnWidth : .1,
						items : [{
							xtype : 'button',
							iconCls : 'page_sel',
							text : '查询',
							handler : function() {
								var queryCompanyId = Ext.getCmp('queryCompanyId')
										.getValue();
								var queryDeptId = Ext.getCmp('queryDeptId')
										.getValue();
								var queryCustId = Ext.getCmp('queryCustId')
										.getValue();
								var queryEmpId = Ext.getCmp('queryEmpId')
										.getValue();
								var orderNo = Ext.getCmp('orderNo').getValue();
								var str = '';
								if (queryCompanyId) {
									str += '&company_id=' + queryCompanyId
								}
								if (queryDeptId) {
									str += '&dept_id=' + queryDeptId
								}
								if (queryEmpId) {
									str += '&emp_id=' + queryEmpId
								}
								if (queryCustId) {
									str += '&cust_id=' + queryCustId
								}
								if (orderNo) {
									str += '&order_no=' + orderNo
								}
								var frame = window.frames["staticFrame"];
								loadIframe(frame, reportUrl + str, function() {
											mask();
										}, function() {
											unmask();
										});
							}
						}]
					},{
						xtype : 'panel',
						layout : 'form',
						labelAlign : 'right',
						labelWidth : 60,
						columnWidth : .1,
						items : [{
							xtype : 'button',
							iconCls : 'page_reset',
							text : '重置',
							handler : function() {
								Ext.getCmp('queryCompanyId').setValue('');
								Ext.getCmp('queryDeptId').setValue('');
								Ext.getCmp('queryCustId').setValue('');
								Ext.getCmp('queryEmpId').setValue('');
								Ext.getCmp('orderNo').setValue('');
								var frame = window.frames["staticFrame"];
								loadIframe(frame, reportUrl, function() {
											mask();
										}, function() {
											unmask();
										});
							}
						}]
					}]
		}, {
			xtype : 'panel',
			region : 'center',
			//							title:'报表',
			html : '<iframe id="staticFrame" frameborder="0" padding="0" margin="0" height="100%" width="100%" src="'
					+ reportUrl + '"></iframe>'
		}]
	});
});
