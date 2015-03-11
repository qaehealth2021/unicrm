Ext.namespace('QH.fittings');

QH.ux.OtherEleFittingToolbar = Ext.extend(QH.ux.grid.BaseToolbar, {
			objName : 'CotEleFittings',
			initComponent : function() {
				var tbar = this;
				this.items = [{
							xtype : 'textfield',
							searchName : 'eleFitting.eleId',
							isSearchField : true,
							emptyText : '货号',
							width : 90
						},{
							xtype : 'textfield',
							searchName : 'eleFitting.fitName',
							isSearchField : true,
							emptyText : '配件名称',
							width : 90
						}, {
							xtype : 'searchcombo',
							searchName : 'eleFitting.fitNo',
							store : this.grid.store,
							checkModified : true,
							emptyText : '配件编号'
						}, '->', '-', {
							text : '导入',
							iconCls : "page_add",
							handler : function() {
							}
						}];
				QH.ux.OtherEleFittingToolbar.superclass.initComponent
						.call(this);
			}
		});
Ext.reg('otherelefittingtoolbar', QH.ux.OtherEleFittingToolbar);

QH.ux.OtherEleFittingStore = Ext.extend(QH.data.Store, {
			constructor : function(config) {
				Ext.apply(this, config, {
							record : [{
										name : 'id',
										type : 'int'
									}, // 
									{
										name : 'fitNo',
										type : 'string'
									}, // 配件编号
									{
										name : 'fitName',
										type : 'string'
									}, // 配件名称
									{
										name : 'factoryId'
									}, // 工厂
									{
										name : 'fitDesc',
										type : 'string'
									}, // 规格描述
									{
										name : 'fitUsedCount',
										type : 'float'
									}, // 用量
									{
										name : 'fitCount',
										type : 'float'
									}, // 数量
									{
										name : 'fitUseUnit',
										type : 'string'
									}, // 单位
									{
										name : 'fitPrice',
										type : 'float'
									}, // 单价
									{
										name : 'fitTotalPrice',
										type : 'float'
									}, // 总金额
									{
										name : 'elementsNewId',
										type : 'int'
									}, // 产品id
									{
										name : 'fittingsId'
									}, // 配件id
									{
										name : 'fitRemark',
										type : 'string'
									}, // 备注
									{
										name : 'eleId',
										type : 'string'
									} // 产品货号
							],
							url : 'listother_elefittings.do'
						});
				QH.ux.OtherEleFittingStore.superclass.constructor.call(this);
			}
		});

QH.ux.OtherEleFittingGrid = Ext.extend(QH.ux.grid.BaseGridPanel, {
			tbarCfg : {
				objName : 'CotEleFittings',
				hiddenSaveAllBtn : true,
				hiddenRetractBtn : true,
				hiddenRetractAllBtn : true,
				hiddenAddBtn : true,
				hiddenDelBtn : true,
				tbarShowQuery : false
			},
			initComponent : function() {
				var grid = this;
				this.store = new QH.ux.OtherEleFittingStore();
				this.columns = [{
							header : '货号',
							dataIndex : 'eleId',
							width : 130
						}, {
							header : '配件编号',
							dataIndex : 'fitNo',
							width : 80,
							summaryRenderer : function(v, params, data) {
								params.css = 'fg';
								return "合计：";
							}
						}, {
							header : '配件名称',
							dataIndex : 'fitName',
							width : 80
						}, {
							header : '厂家',
							width : 50,
							dataIndex : 'factoryId.id',
							renderIndex : 'factoryId.shortName'
						}, {
							header : '规格描述',
							dataIndex : 'fitDesc',
							width : 80
						}, {
							header : '用量',
							dataIndex : 'fitUsedCount',
							width : 50,
							summaryType : 'sum'
						}, {
							header : '数量',
							dataIndex : 'fitCount',
							width : 50,
							summaryType : 'sum'
						}, {
							header : '单位',
							dataIndex : 'fitUseUnit',
							width : 40
						}, {
							header : '单价',
							dataIndex : 'fitPrice',
							width : 50
						}, {
							header : '总金额',
							dataIndex : 'fitTotalPrice',
							width : 65,
							summaryType : 'sum'
						}, {
							header : '备注',
							dataIndex : 'fitRemark'
						}];
				this.tbar = {
					xtype : 'otherelefittingtoolbar',
					grid : this
				}

				QH.ux.OtherEleFittingGrid.superclass.initComponent.call(this);
				//不显示当前的货号配件
				this.store.on({
					'beforeload':function(store,option){
						store.setBaseParam('eleFitting.elementsNewId',grid.parentId);
						store.setBaseParam('showChild',grid.showChild);
					}
				});
			}
		});
Ext.reg('otherelefittinggrid', QH.ux.OtherEleFittingGrid);

/**
 * 产品配件查询窗口
 */
QH.ux.win.EleFittingWin = Ext.extend(Ext.Window, {
			title : '产品配件查询',
			layout : 'fit',
			modal : true,
			constrainHeader : true,
			width : 800,
			height : 500,
			parentId:'',
			showChild:false,
			initComponent : function() {
				var win = this;
				this.items = [{
							xtype : 'otherelefittinggrid',
							parentId:win.parentId,
							showChild:win.showChild,
							ref : 'gridPanel'
						}];
				QH.ux.win.EleFittingWin.superclass.initComponent.call(this);
				this.addEvents(
						/**
						 * @event importselection
						 * 点击表格导入时
						 * @param {Grid} this
						 * @param {SelectionModel} selModel
						 */
						'importselection');
			}
		});
Ext.reg("elefittingquerywin", QH.ux.win.EleFittingWin)