
/**
 * 
 * @class QH.fileSystem.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.fileSystem.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel, {
	autoExpandColumn : 'fileDesc',
	autoExpandMin : 200,
	editorDisable : true,
	hiddenModColumn : true,
	hiddenDelColumn : true,
	initComponent : function() {
		var grid = this;
		this.store = new QH.fileSystem.Store();
		this.columns = [{
					header : "ID",
					dataIndex : "id",
					width : 50,
					hidden : true
				}, {
					header : "下载",
					dataIndex : "id",
					width : 40,
					renderer : grid.opRenderer.createDelegate(grid)
				}, {
					header : '状态',
					width : 100,
					dataIndex : 'fileFlag',
					renderer : function(fileFlag) {
						if(fileFlag=='MS'){
							return '<font color=green>共享他人</font>';
						}else if(fileFlag=='PS'){
							return '<font color=blue>公共文档</font>';
						}else{
							return '未共享';
						}
					}
				}, {
					header : '上传人',
					width : 100,
					dataIndex : 'updateEmpsId.id',
					renderIndex : "updateEmpsId.empsName"
				}, {
					header : '文件名称',
					width : 100,
					dataIndex : 'fileName'
				}, {
					header : '上传时间',
					width : 130,
					dataIndex : 'addTime',
					renderer : Ext.util.Format.dateRenderer(QH_DATE_FORMAT
							+ ' ' + QH_TIME_FORMAT)
				}, {
					header : '文件大小',
					width : 100,
					dataIndex : 'fileSize',
					renderer : function(size) {
						return Ext.util.Format.fileSize(size);
					}
				}, {
					id : 'fileDesc',
					header : '文件描述',
					width : 180,
					dataIndex : 'fileDesc'
				}];
		this.tbar = {
			xtype : 'filesystemtoolbar',
			grid : this,
			store : this.store
		};
		this.bbar = {
			xtype : 'paging',
			pageSize : 20,
			store : this.store,
			displaySize : '5|10|15|20|30|50|100',
			displayInfo : true,
			listeners : {
				beforechange : {
					fn : function(pTbar, params) {
						this.store.setBaseParam('limit', params.limit);
					},
					scope : this
				}
			}
		}
		QH.fileSystem.GridPanel.superclass.initComponent.call(this);
	},
	/**
	 * 下载文件
	 * @param {} record
	 */
	downOneRecord:function(record){
		var encordUrl = Ext.urlEncode({
									name : record.get('fileName'),
									path : record.get('filePath')
								});
		downRpt('./downLoadMailFile.down?'
								+ encordUrl
								+ '&isFile=true&t=down&isFileSystem=true');
	}
});
Ext.reg('filesystemgrid', QH.fileSystem.GridPanel);
