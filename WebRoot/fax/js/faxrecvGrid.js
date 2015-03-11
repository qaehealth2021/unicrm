/**
 * @author zhao
 * @class QH.faxrecv.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.faxrecv.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel, {
	editorDisable : true,
	forceFit : false,
	tbarCfg : {
		objName : 'CotFaxRecv',
		tbarModel : 'all',
		hiddenSaveAllBtn : true,
		hiddenAddBtn : true,
//		hiddenDelBtn : true,
		hiddenRetractBtn : true,
		hiddenRetractAllBtn : true,
		listeners : {
			'beforeadddata' : {
				fn : function(tbar, defaultData) {
					//							var win = new QH.faxrecv.FaxSendSendWin({
					//										gridId : tbar.grid.getId()
					//									});
					//							win.show();
					//							return false;
				}
			}
		}
	},
	initComponent : function() {
		var grid = this;
		this.store = new QH.faxrecv.Store();
		var custId = $('custId').value == 'null'?'':$('custId').value;
		if(custId){
			this.store.setBaseParam('faxRecv.customerId.id',custId);
		}
		this.columns = [{
					header : '',
					hidden : true,
					dataIndex : 'id'
				},{
					header : '接收标识',
					dataIndex : 'deviceid',
					width : 120,
					renderer : function(value) {
						if (value != 0) {
							return faxMap[value];
						}
					}
				}, {
					header : '状态',
					dataIndex : 'readflag',
					width : 110,
					renderer : function(value, metaData, record, rowIndex,
							colIndex, store) {
						if(value==0){
							return "未读";
						}else{
							return "已读";
						}
					}
				}, {
					header : "客户",
					dataIndex : "customerId.id",
					renderIndex : "customerId.customerShortName",
					width : 110
				}, {
					header : '传真文件',
					dataIndex : 'title',
					width : 180,
					renderer : function(value, metaData, record, rowIndex,
							colIndex, store) {
						var str=record.data.faxfile;
						if(str){
							var re = /\\/g;
							var url = './servlet/DownloadServlet?type=FAX_FILE&filepath='
									+ str.replace(re, "%2F");
							return '<a href="javascript:downRpt(\'' + url + '\')">'
									+ value + '</a>';
						}else{
							return "";
						}
					}
				}, {
					header : '接收时间',
					renderIndex : 'recvtime',
					dataIndex : 'recvtime',
					width : 140,
					renderer : function(value, metaData, record, rowIndex,
							colIndex, store) {
						return Ext.util.Format.date(new Date(value * 1000),
								QH_DATE_FORMAT + ' ' + QH_TIME_FORMAT);
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
					header : "订单状态",
					dataIndex : "statusId.id",
					renderIndex : 'statusId.content',
					width : 60
				}, {
					header : '订单号',
					dataIndex : 'orderNo',
					width : 110
				}, {
					header : "业务员",
					dataIndex : "empsId.id",
					renderIndex : "empsId.empsName",
					width : 80
				}];
		this.viewConfig = {
					getRowClass : function(record, index) {
						if (record.get("readflag") == 0)// 未读时字体加粗
							return "x-grid-no-read";
					}
				},
		this.tbar = {
			xtype : 'faxrecvtoolbar',
			grid : this
		}

		QH.faxrecv.GridPanel.superclass.initComponent.call(this);
		//点击一行时标识成已读
		this.on("rowclick", function(grid, rowIndex, e) {
					var record = grid.getStore().getAt(rowIndex);
					if(record.data.readflag==0){
						this.updateData(record);
					}
				}, this);
		this.on("afterrender", function(grid) {
					popedomHanlder_page();
				}, this);
	},
	updateData : function(record) {
		var grid = this;
		cotFaxService.updateFaxRecvFlag(record.data.id,1,function(res){
			if(res){
				grid.getStore().reload();
			}
		})
	}
});
Ext.reg('faxrecvgrid', QH.faxrecv.GridPanel);
