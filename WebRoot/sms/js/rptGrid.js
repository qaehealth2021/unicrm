/**
 * @author zhao
 * @class QH.rpt.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.rpt.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel, {
			editorDisable : true,
			tbarCfg : {
				hidden:true,
				objName : 'RPTItem',
				tbarModel : 'all',
				hiddenSaveAllBtn : true,
				hiddenRetractBtn : true,
				hiddenRetractAllBtn : true,
				hiddenAddBtn : true,
				hiddenDelBtn : true
			},
			bbarCfg:{
				hidden:true
			},
			initComponent : function() {
				var grid = this;
				this.store = new QH.rpt.Store();
				this.columns = [{
							header : '',
							hidden : true,
							dataIndex : 'id'
						}, {
							header : "手机号码",
							dataIndex : "mobile",
							width : 110
						}, {
							header : "短信编号",
							dataIndex : "smID",
							width : 80
						}, {
							header : "回执时间",
							dataIndex : "rptTime",
							width : 80
						}, {
							header : '回执信息',
							dataIndex : 'desc',
							width : 80
						}];

				QH.rpt.GridPanel.superclass.initComponent.call(this);
			}
		});
Ext.reg('rptgrid', QH.rpt.GridPanel);
