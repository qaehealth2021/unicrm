
QH.mail.ShareAttachGrid = Ext.extend(QH.ux.grid.BaseGridPanel,{
	editorDisable:true,
	showRightMenu:false,
	quickpanel:null,//父亲面板
	initComponent:function(){
		var _self = this;
		this.store = new QH.data.Store({
			autoLoad:true,
			url:'list_shareattach.do',
			record:[{
				name:'fileName',type:'string'
			},{
				name:'filePath',type:'string'
			},{
				name:'fileSize',type:'int'
			},{
				name:'fileAbsoutePath',type:'string'
			}]
		});
		this.columns = [{
			header:'文件名',
			dataIndex : 'fileName'
		}];
		this.tbar = {
			xtype:'basetoolbar',
			grid:this,
			editorDisable:this.editorDisable,
			hiddenAddBtn:true,
			hiddenDelBtn:true,
			items:[{
				xtype:'label',
				html:'<font color=red>注:双击快速插入</font>'
			},'->',{
				text:'上传',
				iconCls:'page_file_upload',
				hidden:window.GET_SESSION_EMPSID == 'admin'?false:true,
				handler:this.uploadShareFile.createDelegate(_self,[])
			},{
				text:'删除',
				iconCls:'page_del',
				hidden:true,
				//hidden:window.GET_SESSION_EMPSID == 'admin'?false:true,
				handler:this.deleteShareFile.createDelegate(_self,[])
			}]
		}
		this.bbar = {
			xtype : 'paging',
			pageSize : 500,
			store : this.store,
			displaySize : "NONE",
			displayInfo : true
		}
		QH.mail.ShareAttachGrid.superclass.initComponent.call(this);
		this.on('rowdblclick',function(grid,rowIndex,e){
			var record = grid.getStore().getAt(rowIndex);
			var attach = {};
			attach.name = record.get('fileName');
			attach.size = record.get('fileSize');
			attach.url = record.get('filePath');
			QH_VIEWPORT.sendPanel.sendBasePanel.attachPanel.addAttachs([attach]);
			
		},this)
	},
	uploadShareFile:function(){
		var grid = this;
		var attachUploadWin = new QH.ux.win.UploadWindow({
			swfUploadCfg : {
				file_upload_limit : 20, // 上传数量
				file_size_limit : 100 * 1024,
				post_params : {
					beanName : "ShareFileService",
					uploadPath : "share",
					isRName : true,
					doDbOp : false
				},
				listeners:{
					'fileUploadComplete':{
						fn:function(swfUpload,file,result){
							grid.getStore().reload();
							attachUploadWin.close();
						},
						scope:this
					}
				}
			}
		});
		attachUploadWin.show();
	},
	deleteShareFile:function(){
		var grid =  this;
		var records = grid.getSelectionModel().getSelections();
		Ext.each(records,function(rec){
			baseSerivce.deleteUploadFile(rec.get('fileAbsoutePath'),function(res){});
		});
		grid.getStore().reload();
	}
});
Ext.reg('shareattachgrid',QH.mail.ShareAttachGrid);
