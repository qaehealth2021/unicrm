/**
 * @author zhao
 * @class QH.customer.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.customer.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel, {
			editorDisable : true,
			forceFit : false,
			tbarCfg : {
				objName : 'CotCustomer',
				tbarModel : 'all',
				hiddenSaveAllBtn : true,
				hiddenRetractBtn : true,
				hiddenRetractAllBtn : true,
				listeners : {
					'beforeadddata' : {
						fn : function(tbar, defaultData) {
							// openFullWindow('modify_customer.do?gridId='+tbar.grid.getId());
							openDeskWin('新增客户', 'modify_customer.do?gridId='
											+ tbar.grid.getId());
							return false;
						}
					}
				}
			},
			initComponent : function() {
				var grid = this;
				this.store = new QH.customer.Store();
				this.columns = [{
							header : "ID",
							dataIndex : "id",
							width : 50,
							hidden : true
						}
						// , {
						// dataIndex : "id",
						// width : 50,
						// renderer : grid.opRenderer.createDelegate(grid)
						// }
						, {
							header : "公司代码",
							dataIndex : "customerNo",
							width : 100
						}, {
							header : "客户简称",
							dataIndex : "customerShortName",
							width : 100
						}, {
							header : "客户全称",
							dataIndex : "fullNameCn",
							width : 100 
						},{
							header : "英文全称",
							dataIndex : "fullNameEn",
							width : 160
						}, {
							header : "公司地址",
							dataIndex : "customerAddress",
							width : 160
						}, {
							header : "网址",
							dataIndex : "custWeb",
							width : 100
						}, {
							header : "洲",
							width : 80,
							renderIndex : 'areaId.areaName',
							dataIndex : 'areaId.id'
						}, {
							header : "国家",
							width : 80,
							renderIndex : 'nationId.nationShort',
							dataIndex : 'nationId.id'
						}, {
							header : "省份",
							width : 80,
							renderIndex : 'proviceId.provinceName',
							dataIndex : 'proviceId.id'
						}, {
							header : "客户来源",
							dataIndex : "custLvId",
							width : 80,
							renderer : function(value) {
								if (value != 0) {
									return custFromMap[value];
								}
							}
						}, {
							header : "指定货代名称",
							dataIndex : "customerZm",
							width : 100
						}, {
							header : "介绍客户名称",
							dataIndex : "customerCm",
							width : 100
						}, {
							header : "组织名称",
							dataIndex : "customerNm",
							width : 80
						}, {
							header : "展会名称",
							dataIndex : "customerZhm",
							width : 80
						}, {
							header : "展会时间",
							dataIndex : "zhanTime",
							width : 100
						}, {
							header : "客户类型",
							dataIndex : "custTypeId",
							width : 70,
							renderer : function(value) {
								if (value != 0) {
									return custMap[value];
								}
							}
						}];

				this.tbar = {
					xtype : 'customertoolbar',
					grid : this
				}

				QH.customer.GridPanel.superclass.initComponent.call(this);
				this.on("rowdblclick", function(grid, rowIndex, e) {
							this.updateData();
						}, this);
			},
			updateData : function() {
				var grid = this;
				var record = grid.getSelectionModel().getSelected();
				// openFullWindow('modify_customer.do?gridId='+grid.getId()+'&id='+record.get('id'),
				// CACHE_DEFAULT_CUSTOMER
				// + record.get('id'));
				var tabName = '客户' + record.get('customerNo');
				var tabId = CACHE_DEFAULT_CUSTOMER + record.get('id');
				openDeskWin(tabName, 'modify_customer.do?gridId='
								+ grid.getId() + '&id=' + record.get('id'),
						tabId);
			}
		});
Ext.reg('customergrid', QH.customer.GridPanel);
