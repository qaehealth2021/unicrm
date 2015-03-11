/**
 * @author zhao
 * @class QH.sms.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.sms.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel, {
			editorDisable : true,
			forceFit:false,
			mo:false,
			tbarCfg : {
				objName : 'CotSms',
				tbarModel : 'all',
				hiddenSaveAllBtn : true,
				hiddenRetractBtn : true,
				hiddenRetractAllBtn : true,
				listeners : {
					'beforeadddata' : {
						fn : function(tbar, defaultData) {
							var win = new QH.sms.SmsSendWin({
										smsId : 0,
										gridId : tbar.grid.getId()
									});
							win.show();
							return false;
						}
					}
				}
			},
			initComponent : function() {
				var grid = this;
				//如果是陌生人短信
				var url='list_sms.do';
				if(this.mo){
					url='listmo_sms.do';
				}
				this.store = new QH.sms.Store({url:url});
				var custId = $('custId').value == 'null'?'':$('custId').value;
				if(custId){
					this.store.setBaseParam('sms.customerId.id',custId);
				}
				this.columns = [{
							header : '',
							hidden : true,
							dataIndex : 'id'
						}, {
							header : "客户名称",
							hidden:this.mo,
							dataIndex : "customerId.id",
							renderIndex : "customerId.customerShortName",
							width : 110
						}, {
							header : "联系人",
							hidden:this.mo,
							dataIndex : "contactId.id",
							renderIndex : "contactId.contactPerson",
							width : 80
						}, {
							header : "跟进人",
							hidden:this.mo,
							dataIndex : "contactId.empsId.id",
							renderIndex : "contactId.empsId.empsName",
							width : 80
						}, {
							header : '手机',
							dataIndex : 'mobiles',
							width : 80
						}, {
							header : "发送人",
							dataIndex : "empId.id",
							renderIndex : "empId.empsName",
							width : 80
						}, {
							header : '短信内容',
							dataIndex : 'content',
							width : 220
						}, {
							header : '订单号',
							dataIndex : 'orderNo',
							width : 120
						}, {
							header : '海运备注',
							dataIndex : 'remark',
							width : 120
						}, {
							header : '空运备注',
							dataIndex : 'airRemark',
							width : 120
						}, {
							header : "订单状态",
							dataIndex : "statusId.id",
							renderIndex : "statusId.content",
							width : 60
						}, {
							header : '发送时间',
							dataIndex : 'saveTime',
							width : 140,
							renderer : Ext.util.Format
									.dateRenderer(QH_DATE_FORMAT + ' '
											+ QH_TIME_FORMAT)
						}];

				this.tbar = {
					xtype : 'smstoolbar',
					grid : this
				}

				QH.sms.GridPanel.superclass.initComponent.call(this);
				this.on("rowdblclick", function(grid, rowIndex, e) {
//							this.updateData();
						}, this);
//				this.on("selectionchange", function(grid,sm) {
//							var rec=sm.getSelected();
//							var store = QHERP_VIEWPORT.rptGridPanel
//											.getStore();
//							store.setBaseParam("smId", rec.data.smId);
//							store.setBaseParam("mobile", rec.data.mobiles);
//							store.load();
//						}, this);
			}
//			updateData : function() {
//				var grid = this;
//				var record = grid.getSelectionModel().getSelected();
//				openWindowBase(268, 710, 'modify_sms.do?gridId=' + grid.getId()
//								+ '&id=' + record.get('id'));
//			}
		});
Ext.reg('smsgrid', QH.sms.GridPanel);
