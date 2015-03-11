QH.fileSystem.Toolbar = Ext.extend(QH.ux.grid.BaseToolbar, {
	objName : 'CotFileSystem',
	tbarModel : 'all',
	hiddenAddBtn:true,
	hiddenDelBtn:true,
	/**
	 * 是否做数据库操作，true：做数据库操作，false：不做数据库操作
	 * 
	 * @type Boolean
	 */
	doDbOp : true,
	uploadUrl : './servlet/UploadServlet',
	uploadType : "file",
	/**
	 * 调用上传时，需要存放的文件夹（必须），如”cust“
	 */
	uploadPath : "filesystem",
	initComponent : function() {
		this.defaults = {
			scale : 'large'
		}
		this.height = 42;
		this.items = [{
					emptyText : '文件名称',
					searchName : 'fileSystem.fileName',
					isSearchField : true,
					width : 70,
					xtype : 'textfield',
					maxLength : 100,
					maxLengthText : '文件名称长度最大不能超过{0}'
				}, {
					xtype : 'datefield',
					id : 'startOrderTimeId',
					endDateId : 'endOrderTimeId',
					searchName : 'startTime',
					isSearchField : true,
					vtype : 'daterange',
					emptyText : '上传起始',
					width : 90
				}, {
					xtype : 'datefield',
					vtype : 'daterange',
					id : 'endOrderTimeId',
					startDateId : 'startOrderTimeId',
					searchName : 'endTime',
					isSearchField : true,
					emptyText : '上传结束',
					width : 90
				}, {
					xtype : 'searchcombo',
					width : 70,
					store : this.store,
					checkModified : true,
					searchName : 'fileSystem.fileDesc',
					emptyText : '文件描述',
					isJsonType : false
				}, '->', {
					text : '转载',
					iconCls : 'page_zhuan',
					ref : 'moveBtn',
					hidden : true,
					handler : this.moveFile.createDelegate(this)
				}, {
					text : '批量下载',
					tooltip : '批量下载，压缩成ZIP格式',
					iconCls : 'page_download',
					scope : this,
					ref : 'downAllBtn',
					selectShow : true,
					handler : this.downAllFile.createDelegate(this)
				},{
					text:"上传",
					iconCls : "page_file_upload",
					ref:"uploadBtn",
					menu:{
						xtype:'menu',
						items:[{
							text : '批量上传',
							handler : this.batchUploadFile.createDelegate(this)
						},{
							text : '单个上传',
							handler : this.uploadFile.createDelegate(this)
						}]
					}
				},{
					text:"共享",
					iconCls : "page_allocated",
					ref:"shareBtn",
					selectShow : true,
					menu:{
						xtype:'menu',
						items:[{
							text : '共享他人',
							cls:'SYSOP_OTHER',
							handler : this.shareFile.createDelegate(this)
						},{
							text : '共享公共',
							cls:'SYSOP_ALL',
							handler : this.shareCommon.createDelegate(this)
						},{
							text : '取消共享',
							cls:'SYSOP_ALL',
							handler : this.outShare.createDelegate(this)
						}]
					}
				}, {
					text : '修改',
					selectOneShow:true,
					iconCls : 'page_table_save',
					ref : 'modBtn',
					handler : this.updateFile.createDelegate(this)
				},  {
					text : '删除',
					disabled : true,
					ref : 'delBtn',
					cls : "SYSOP_DEL",
					iconCls : 'page_del',
					handler : this.delFile.createDelegate(this)
				}];
		QH.fileSystem.Toolbar.superclass.initComponent.call(this);
		this.grid.on('rowdblclick', function(grid, rowIndex, e) {
					// var record = grid.getStore().getAt(rowIndex);
					// if(QH_VIEWPORT.popedomGrid.hidden &&
					// record.popedom.indexOf("M") == -1)
					// return ;
					this.updateFile();
				}, this);
	},
	batchUploadFile : function() {
			this.batchUploadWin = new QH.ux.win.UploadWindow({
			closeAction:'close',
			swfUploadCfg : {
				file_upload_limit : 300, // 上传数量
				file_size_limit : 1024 * 1024,
				post_params : {
					beanName : "BaseService",
					tbName : 'CotFileSystem',
					uploadPath : "filesystem",
					isRName : true,
					doDbOp : true,
					field : 'filePath',
					fieldSize : 'fileSize'
					
				}
			},
			uploadStartFn:function(file){
				var fileSystem = {};
				//设置fileSystem表中需要设置的一些参数
				var selectNode = QH_VIEWPORT.treePanel.getSelectionModel().getSelectedNode();
				fileSystem.fileTreeId = selectNode.id;//关联节点
				fileSystem.updateEmpsId_CotEmps = window.GET_SESSION_EMPS_ID;//上传人;
				fileSystem.fileName = file.name;
				fileSystem.fileFlag = 'MU';
				fileSystem.addTime = window.getCurrentFormateDate('yyyy-MM-dd hh:mm:ss');
				fileSystem.fileExtension = file.type ? file.type.substring(1, file.type.length) : '',
				this.pnl.addPostParam("paramJson", Ext.encode(fileSystem));
			},
			reloadFn:function(result){
				QH_VIEWPORT.gridPanel.getStore().reload();
			}
		});
		this.batchUploadWin.show();
	},
	/**
	 * 共享文件
	 */
	shareFile : function() {
		var mapPopedom = initPopedomMap(vaildUrl);
		if(mapPopedom["OTHER"] == null){
			alertMsg('对不起,您没有共享他人的权限!');
			return;
		}
		var ids=this.grid.getSelectionIds();
		var win=new QH.fileSystem.FileShareWin({ids:ids});
		win.show();
	},
	/**
	 * 共享成公共
	 */
	shareCommon:function(){
		var mapPopedom = initPopedomMap(vaildUrl);
		if(mapPopedom["ALL"] == null){
			alertMsg('对不起,您没有共享公共的权限!');
			return;
		}
		var ids=this.grid.getSelectionIds();
		Ext.Msg.confirm('系统提示', '确定把所选的文档共享成公共？', function(btn) {
					if (btn == 'yes') {
						QH_LOADMASK = new Ext.LoadMask(QH_VIEWPORT.getEl(), {
									msg : '保存中...'
								});
						QH_LOADMASK.show();
						cotFileSystemService.saveShareCommon(ids,false, function(res) {
									QH_LOADMASK.hide();
									//刷新文件主面板
									QH_VIEWPORT.gridPanel.getStore().reload();
								});
					}
				}, this);
	},
	/**
	 * 取消共享
	 */
	outShare:function(){
		var mapPopedom = initPopedomMap(vaildUrl);
		if(mapPopedom["OUT"] == null){
			alertMsg('对不起,您没有取消共享的权限!');
			return;
		}
		//判断所选的文档是否有共享的
		var records = this.grid.getSelectionModel().getSelections();
		var ids = [];
		Ext.each(records,function(record){
			if(record.data.fileFlag!='MU'){
				ids.push(record.id);
			}
		});
		if(ids.length==0){
			alertMsg('您选择的文档都是"未共享"的!不能取消共享!');
			return;
		}
		Ext.Msg.confirm('系统提示', '确定把所选的文档取消共享吗？', function(btn) {
					if (btn == 'yes') {
						QH_LOADMASK = new Ext.LoadMask(QH_VIEWPORT.getEl(), {
									msg : '保存中...'
								});
						QH_LOADMASK.show();
						cotFileSystemService.saveShareCommon(ids,true, function(res) {
									QH_LOADMASK.hide();
									//刷新文件主面板
									QH_VIEWPORT.gridPanel.getStore().reload();
								});
					}
				}, this);
	},
	uploadFile : function() {
		var selectNode = QH_VIEWPORT.treePanel.getSelectionModel()
				.getSelectedNode();
		var treeNodeId = selectNode.attributes.updateFlag === false
				? null
				: selectNode.attributes.id;

		var win = new UploadWin({
			hiddenCompression : true,
			gridId : this.grid.getId(),
			labelName : '文件',
			params : {
				beanName : "BaseService",
				uploadPath : this.uploadPath,
				field : 'filePath',
				tbName : 'CotFileSystem',
				fieldSize : 'fileSize',
				maxFileSize : 100 * 1024 * 1024,
				isRName : true,
				doDbOp : true
			},
			fieldItems : [{
						xtype : 'textarea',
						fieldLabel : '文件描述',
						name : 'fileDesc',
						anchor : "100%"
					}, {
						xtype : 'hidden',
						name : 'fileTreeId',
						value : treeNodeId
					},{
						xtype : 'hidden',
						name : 'updateEmpsId_CotEmps',
						value : GET_SESSION_EMPS_ID
					}, {
						xtype : 'hidden',
						name : 'fileFlag',
						value : selectNode.attributes.fileFlag
					}, {
						xtype : 'hidden',
						name : 'fileName',
						getValue : function() {
							return win.getFileName();
						}
					}, {
						xtype : 'hidden',
						name : 'fileExtension',
						getValue : function() {
							return win.getFileExtension();
						}
					}, {
						xtype : 'hidden',
						name : 'addTime',
						getValue : function() {
							if (!this.value) {
								this.value = getCurrentFormateDate('yyyy-MM-dd hh:mm:ss');
							}
							return this.value;
						}
					}],
			uploadType : this.uploadType,
			uploadUrl : this.uploadUrl,
			validType : this.validType
		});
		win.show();
	},
	moveFile : function() {
		var treeWin = new QH.fileSystem.MoveTreeWindow({});
		treeWin.show();
	},
	downAllFile : function() {
		var records = this.grid.getSelectionModel().getSelections();
		var fileIds = [];
		Ext.each(records, function(record) {
					fileIds.push(record.get('id'));
				});
		downRpt('./servlet/DownFileSystemAllFileServlet?' + Ext.urlEncode({
					fileIds : fileIds.join(',')
				}));
	},
	updateFile : function() {
		if (!this.win) {
			this.formPanel = new Ext.form.FormPanel({
						autoWidth : true,
						autoHeight : true,
						padding : "10px",
						buttonAlign : "center",
						frame : true,
						labelAlign : "right",
						labelWidth : 60,
						items : [{
									xtype : 'textfield',
									fieldLabel : '文件名',
									name : 'fileName',
									anchor : "100%"
								}, {
									xtype : 'textarea',
									fieldLabel : '文件描述',
									name : 'fileDesc',
									anchor : "100%"
								}],
						fbar : [{
							text : "保存",
							scale : 'large',
							iconCls : "page_table_save",
							scope : this,
							handler : function() {
								var obj = this.formPanel.getForm()
										.getFieldValues();
								var fs = new CotFileSystem();
								var record = this.win.record;
								Ext.apply(fs, obj, record.data);
								for (var p in fs) {
									fs[p] = fs[p] || null;
								}
								var win = this.win;
								QH_LOADMASK = new Ext.LoadMask(this.formPanel
												.getEl(), {
											msg : '保存中...'
										});
								QH_LOADMASK.show();
								baseSerivce.saveOrUpdateObjRId([fs], function() {
											QH_LOADMASK.hide();
											record
													.set('fileName',
															obj.fileName);
											record
													.set('fileDesc',
															obj.fileDesc);
											record.commit();
											win.hide();
										})
							}
						}, {
							text : "关闭",
							scale : 'large',
							iconCls : "page_cancel",
							handler : function() {
								this.win.hide();
							},
							scope : this
						}]
					});
			this.win = new Ext.Window({
						width : 300,
						closeAction : 'hide',
						title : "修改",
						modal : true,
						items : [this.formPanel],
						listeners : {
							'show' : {
								fn : function(win) {
									var record = this.grid.getSelectionModel()
											.getSelected();
									this.formPanel.getForm().loadRecord(record);
									win.record = record;
								},
								scope : this
							}
						}
					});
		}
		this.win.show();
	},
	delFile : function() {
		var records = this.grid.getSelectionModel().getSelections();
		var ids = [];
		Ext.each(records, function(record) {
					ids.push(record.id);
				});
		var toolbar = this
		Ext.Msg.confirm('系统提示', '确定删除所选数据？', function(btn) {
					if (btn == 'yes') {
						QH_LOADMASK = new Ext.LoadMask(QH_VIEWPORT.getEl(), {
									msg : '保存中...'
								});
						QH_LOADMASK.show();
						cotFileSystemService.deleteFile(ids, function(res) {
									QH_LOADMASK.hide();
									toolbar.store.reload();
								});
					}
				}, this);
	}
});
Ext.reg('filesystemtoolbar', QH.fileSystem.Toolbar);