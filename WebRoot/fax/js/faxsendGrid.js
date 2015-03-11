/**
 * @author zhao
 * @class QH.faxsend.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.faxsend.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel, {
	editorDisable : true,
	forceFit : false,
	tbarCfg : {
		objName : 'CotFaxSend',
		tbarModel : 'all',
		hiddenSaveAllBtn : true,
		hiddenRetractBtn : true,
		hiddenRetractAllBtn : true,
		listeners : {
			'beforeadddata' : {
				fn : function(tbar, defaultData) {
					//判断该登录人是否有配置传真号,没有就不让发送
					if(!GET_SESSION_EMPS.faxMapId){
						alertMsg('您还没有配置传真号,请到员工编辑页面配置!');
						return false;
					}
					var win = new QH.faxsend.FaxSendSendWin({
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
		this.store = new QH.faxsend.Store();
		var custId = $('custId').value == 'null'?'':$('custId').value;
		if(custId){
			this.store.setBaseParam('faxSend.customerId.id',custId);
		}
		this.viewConfig = {
			getRowClass : function(record, index) {
				// 失败
				if (record.get("status") == 3)
					return "x-grid-record-green";
			}
		};
		this.columns = [{
					header : '',
					hidden : true,
					dataIndex : 'id'
				}, {
					header : "客户",
					dataIndex : "customerId.id",
					renderIndex : "customerId.customerShortName",
					width : 110
				}, {
					header : "联系人",
					dataIndex : "contactId.id",
					renderIndex : "contactId.contactPerson",
					width : 110
				}, {
					header : "跟进人",
					dataIndex : "contactId.empsId.id",
					renderIndex : "contactId.empsId.empsName",
					width : 80
				},{
					header : "发送标识",
					dataIndex : "empsId.faxMapId.id",
					renderIndex : 'empsId.faxMapId.faxNbr',
					width : 100
				}, {
					header : '传真主题',
					dataIndex : 'title',
					width : 120
				}, {
					header : '传真文件',
					dataIndex : 'sendFile',
					width : 120,
					renderer : function(value, metaData, record, rowIndex,
							colIndex, store) {
						var re = /\\/g;
						var url = './servlet/DownloadServlet?type=FAX_FILE&filepath='
								+ value.replace(re, "%2F");
						var index = value.lastIndexOf('\\');
						return '<a href="javascript:downRpt(\'' + url + '\')">'
								+ value.substring(index + 1) + '</a>';
					}
				}, {
					header : "传真号码",
					dataIndex : "fax",
					renderIndex : "contactId.contactPerson",
					width : 110,
					renderer : function(value, metaData, record, rowIndex,
							colIndex, store) {
						var guo = record.data.ic;
						var chang = record.data.ldc;
						var fax = record.data.fax;
						return guo + "-" + chang + "-" + fax;
					}
				}, {
					header : "传真状态",
					dataIndex : "status",
					width : 60,
					renderer : function(value, metaData, record, rowIndex,
							colIndex, store) {
						if (value == 0) {
							return '提交';
						} else if (value == 1) {
							return '发送';
						} else if (value == 2) {
							return '成功';
						} else if (value == 3) {
							return '失败';
						} else if (value == 4) {
							return '取消';
						}
					}
				}, {
					header : "结果",
					dataIndex : "retCode",
					width : 100,
					renderer : function(value, metaData, record, rowIndex,
							colIndex, store) {
						if (value == 0) {
							return '';
						} else if (value == 1) {
							return '忙';
						} else if (value == 2) {
							return '无拨号音';
						} else if (value == 3) {
							return '无应答';
						} else if (value == 4) {
							return '文件格式错';
						} else if (value == 5) {
							return '发送页前信号中断';
						} else if (value == 6) {
							return '线路训练失败 ';
						} else if (value == 7) {
							return '发送页后信号中断 ';
						} else if (value == 8) {
							return '用户取消';
						} else if (value == 9) {
							return '超时无应答 ';
						} else if (value == 20) {
							return '待发送文件错误 ';
						} else if (value == 21) {
							return '系统读写错误';
						} else if (value == 22) {
							return '打印转换错误';
						}
					}
				}, {
					header : "订单状态",
					dataIndex : "statusId.id",
					renderIndex : 'statusId.content',
					width : 60
				}, {
					header : '订单号',
					dataIndex : 'orderNo',
					width : 110
				}, {
					header : "发送人",
					dataIndex : "empsId.id",
					renderIndex : "empsId.empsName",
					width : 80
				}, {
					header : '海运备注',
					dataIndex : 'remark',
					width : 120
				}, {
					header : '空运备注',
					dataIndex : 'airRemark',
					width : 120
				}];

		this.tbar = {
			xtype : 'faxsendtoolbar',
			grid : this
		}

		QH.faxsend.GridPanel.superclass.initComponent.call(this);
		this.on("rowdblclick", function(grid, rowIndex, e) {
					var record = grid.getStore().getAt(rowIndex);
					this.updateData(record);
				}, this);
	},
	updateData : function(record) {
		var grid = this;
		var win = new QH.faxsend.FaxSendSendWin({
					gridId : grid.getId(),
					sendId : record.data.id
				});
		win.show();
	}
});
Ext.reg('faxsendgrid', QH.faxsend.GridPanel);
