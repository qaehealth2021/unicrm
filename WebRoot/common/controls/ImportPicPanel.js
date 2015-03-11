/**
 * 通用的图片导入控件
 * @class QH.controls.ImportPicPanel
 * @extends Ext.Panel
 */
QH.controls.ImportPicPanel = Ext.extend(Ext.Panel,{
	/**
	 * 上传面板对象
	 * @type 
	 * @private
	 */
	uploader:null,
	/**
	 * 上传文件的URL
	 * @type String
	 */
	defaultUrl:'../../servlet/UploadServlet',
	/**
	 * 传递到后台的参数
	 * @type 
	 */
	postParams:{},
	/**
	 * 上传的文件夹
	 */
	uploadFileFolder:"",
	/**
	 * 需要处理的表
	 * @type String
	 */
	tbName:"",
	/**
	 * 需要用来查询是否覆盖更新的字段
	 * @type String
	 */
	queryAttr:"",
	initComponent:function(){
		var panel = this;
		var sm = new Ext.grid.CheckboxSelectionModel();
		this.layout = "border";
		this.padding = 0;
		this.frame = true;
		this.items = [{
			title:"图片信息",
			xtype : "grid",
			region : 'west',
			margins : '0 5 0 0',
			border:false,
			width:400,
			sm:sm,
			tbar: new Ext.Toolbar({
				items:['->', {
					text : "删除",
					handler : panel.delPics.createDelegate(this,[]),
					iconCls : "page_del"
					//cls : "SYSOP_DEL"
				}]
			}),
			id : "unImportPicName",
			height : 500,
			store : {
				xtype : "arraystore",
				fields : [{
							name : "filename",
							type : "string"
						},{
							name:"filePath",
							type:"string"
						}]
			},
			columns : [sm,
			{
				header : "图片名称",
				sortable : false,
				resizable : true,
				dataIndex : "filename",
				width : 230
			}],
			listeners:{
				'afterrender':function(grid){
					//数据绑定
					panel.loadData();
				}
			},
			viewConfig:{
				forceFit:true
			}
							
		},{
			xtype:"panel",
			layout:'border',
			region:'center',
			items:[{
					xtype : "form",
					region:'north',
					height:150,
					border:false,
					title:"操作",
					//ctCls:'x-panel-mc',
					buttonAlign : "center",
					fbar : [{
								text : "上传图片",
								handler : panel.showUploadPanel.createDelegate(this,[])
							}, {
								text : "导入图片",
								handler : panel.importPicture.createDelegate(this,[])
							}],
					items : [{
								xtype : "checkbox",
								width : 300,
								id : "isCover",
								checked : true,
								inputValue : "1",
								boxLabel : "图片名与配件号一致时，是否覆盖原有图片",
								anchor : "100%",
								hideLabel : true
							}, {
								xtype : "checkbox",
								id : "isAdd",
								inputValue : "2",
								checked : true,
								boxLabel : "图片名与配件号不一致时，做为新配件号导入",
								anchor : "100%",
								hideLabel : true
							}, {
								xtype : "label",
								style : "color:red",
								text : "提示:导入图片中，可能页面会卡一会，请耐心等待！"
							}]
				},{
					xtype : "panel",
					title : "操作结果",
					region:'center',
					margins : '0 5 0 0',
					border:false,
					//ctCls:'x-panel-mc',
					id : "result"
	
				}]
		}]
		QH.controls.ImportPicPanel.superclass.initComponent.call(this);
	},
	showUploadPanel:function(){
		var panel = this;
		if($('spanButtonPlaceholder') == null){
		var c={tag: 'div',html: '<div id="spanButtonPlaceholder">'};
			if($('tempBrn')==null){
				Ext.DomHelper.append(document.body, {
					html : '<div id="tempBrn" style="background-color: #AADBF0;"></div>'
				}, true);
				var el= Ext.get('tempBrn');
				el.createChild(c); 
			}else{
				var el= Ext.get('tempBrn');
				Ext.DomHelper.overwrite(el.dom.firstChild,c,true);
			}
		}
		var params = {
			beanName:"BaseService",
			tbName:this.tbName,
			bGenDate:false,
			uploadPath:this.uploadFileFolder
		};
		Ext.apply(params,this.postParams);
		//上传面板
		var pnl = {
				xtype:"swfuploadpanel",
				width : 480,
				height : 400,
				upload_url : this.defaultUrl, // 上传文件的URL
				flash_url : "./common/js/swfupload_10f.swf", // 需要调用的flash插件
				button_image_url : "./common/images/AttachButtonUploadText_61x22.png",// 添加文件按钮
				button_width : 80,
				button_height : 22,
				button_action : SWFUpload.BUTTON_ACTION.SELECT_FILES,// 定义是否可以多选文件（flash10的版本修改了改功能用改属性实现多选，而flash9的版本可以通过调用函数来实现）
				button_placeholder_id : "spanButtonPlaceholder",// swfupload_10f.swf会去渲染这个Id，使之变成一个按钮，
				button_text_top_padding : 3,
				button_text_left_padding : 0,
				confirm_delete : true,// 删除时，是否需要提示确认
				file_types : "*.jpg;*.bmp;*.png;*.gif;",
				file_types_description : "图片文件",
				file_upload_limit : 300, // 上传数量
				file_size_limit : 6144,
				reloadUrl : window.location.href,
				reloadFn : panel.loadData.createDelegate(panel,[]),
				post_params:params,
				debug:true
		}
		var tb = new Ext.Toolbar({
			items : [{
						text : "上传配置",
						id:'cfgBtn',
						handler :panel.showCfgWin.createDelegate(this,[]),
						iconCls : "page_config",
						cls : "SYSOP_ADD"
					},'-',{
						xtype:'panel',
						contentEl:'tempBrn'
					}]
		});
		this.uploader = new Ext.Window({
				title : '批量上传图片',
				layout:'fit',
				modal:true,
				width:500,
				height:380,
				tbar : tb,
				closeAction:'hide',
				items:[pnl]
			});
		this.uploader.show();
	},
	/**
	 * 显示上传面板的设置信息
	 */
	showCfgWin:function(){
		var panel = this;
		var uploadSeting = new Ext.Window({
				title : "上传配置",
				width : 350,
				height : 280,
				layout : "form",
				padding : "10",
				closeAction : "hide",
				buttonAlign : "center",
				modal:true,
				plain : false,
				listeners : {
					'show' : function(win) {
						Ext.getCmp('upLab').setText('');
					}
				},
				fbar : [{
							text : "设置",
							handler : panel.setupUploadConfig.createDelegate(this,[])
						}],
				items : [{
							xtype : "numberfield",
							fieldLabel : "每次上传图片数",
							id : "uploadLimit",
							allowDecimals : false,
							allowNegative : false,
							value : 300,
							maxValue : 1000,
							anchor : "100%"
						}, {
							xtype : "numberfield",
							fieldLabel : "每张图片大小(K)",
							allowDecimals : false,
							allowNegative : false,
							maxValue : 6144,
							value : 6144,
							id : "sizeLimit",
							anchor : "100%"
						}, { xtype:'panel',
						    baseCls : 'x-plain',
							items:[{
								xtype:'checkbox',
								width :300,
								style:"margin-left:13px",
								id:'compressionBox',
							    boxLabel :'转成PNG格式(供Excel2000用户使用)'
							}]
							
						},{
							xtype : "fieldset",
							title : '图片压缩',
							layout : 'form',
							collapsed : true,
							checkboxToggle : true,
							id : "suoChk",
							labelWidth : 55,
							labelAlign : 'right',
							items : [{
										xtype : "numberfield",
										fieldLabel : "压缩比",
										maxValue : 0.5,
										id:'scale',
										name:'scale',
										decimalPrecision : 2,
										value : 0.5,
										anchor : "100%"
									}, {
										xtype : "panel",
										layout : 'column',
										baseCls : 'x-plain',
										items : [{
													columnWidth : .5,
													layout : 'form',
													baseCls : 'x-plain',
													labelWidth : 55,
													items : [{
																xtype : "numberfield",
																fieldLabel : "按比例长",
																id:'heightAfter',
																name:'heightAfter',
																maxValue : 2000,
																decimalPrecision : 2,
																value : 400,
																anchor : "100%"
															}]
												}, {
													columnWidth : .5,
													layout : 'form',
													baseCls : 'x-plain',
													labelWidth : 30,
													items : [{
																xtype : "numberfield",
																fieldLabel : "宽",
																id:'widthAfter',
																name:'widthAfter',
																maxValue : 2000,
																decimalPrecision : 2,
																value : 400,
																anchor : "100%"
															}]
												}]
									}]
						}, {
							xtype : "label",
							id : "upLab",
							style : "color:red;padding:10px;",
							text : ""
						}]
			});
		uploadSeting.show();
	},
	/**
	 * 设置配置的值
	 */
	setupUploadConfig:function(){
		var swfu = this.uploader.items.items[0].suo;
		var file_upload_limit = parseInt($("uploadLimit").value);
		if (isNaN(file_upload_limit) || file_upload_limit == 0) {
			$("uploadLimit").value = "300";
			file_upload_limit = 300;
		}
		if (file_upload_limit > 1000) {
			Ext.getCmp('upLab').setText('上传图片数过多，最多1000张');
			file_upload_limit = 1000;
			$("uploadLimit").value = "1000";
		}
		swfu.setFileUploadLimit(file_upload_limit);
		// 判断输入的内容是否违规
		var file_size_limit = parseInt($("sizeLimit").value);
		if (isNaN(file_upload_limit) || file_size_limit == 0) {
			$("sizeLimit").value = "6144";
			file_size_limit = 6144;
		}
		if (file_size_limit > 6144) {
			Ext.Msg.alert('提示消息', "每张最大不能大于6144KB（6MB），最多6M")
			file_size_limit = 6144;
			$("sizeLimit").value = "6144";
		}
		swfu.setFileSizeLimit(file_size_limit);
		//勾选转PNG
		var ckbox=Ext.getCmp('compressionBox');
		var flag=false;
		if(ckbox.checked){
			flag=true;
		}else{
		}
		//是否压缩,如果有更改上传路径
		var chk = Ext.getCmp('suoChk').checkbox;
		if(chk){
			if(chk.dom.checked){
				var scale = Ext.getCmp('scale').getValue();
				if(height==''){
					scale=0.5;//默认0.5
				}
				var height = Ext.getCmp('heightAfter').getValue();
				if(height==''){
					height=400;//默认400
				}
				var width = Ext.getCmp('widthAfter').getValue();
				if(width==''){
					width=400;//默认400
				}
				var url=this.defaultUrl+"&scale="+scale+"&height="+height+"&width="+width+"&checked="+flag;
				swfu.setUploadURL(url);
			}else{
				var url=this.defaultUrl+"&checked="+flag;
			    swfu.setUploadURL(url);
			}
		}
		
		Ext.getCmp('upLab').setText('设置成功!');
		// uploadSeting.hide();
	},
	/**
	 * 数据绑定
	 */
	loadData:function(){
		var panel = this;
			importImageService.getImportPicList(panel.uploadFileFolder,function(res) {
					var store = Ext.getCmp("unImportPicName").getStore();
					if(res != null){
						store.removeAll();
						for(var p in res){
							var u = new store.recordType({
												filename : p,
												filePath:res[p]
											})
							store.add(u);
						}
					}
			})
	},
	/**
	 * 导入操作
	 */
	importPicture:function(){
		var store = Ext.getCmp("unImportPicName").getStore();
		if(store.getCount() == 0){
			window.alertMsg("请先导入图片");
			return;
		}
		var panel = this;
		var result = Ext.getCmp("result").body;
		DWRUtil.useLoadingMessage("正在导入数据，请等待...........");
		DWREngine.setAsync(false);
		// 获得导入策略
		var isCover = $('isCover').checked;
		var isAdd = $('isAdd').checked;
		var jsonParam = "{" +
				"isCover:" +isCover+
				","+
				"isAdd:" +isAdd+
				"}"
		importImageService.importPic(jsonParam,panel.uploadFileFolder,panel.tbName,panel.queryAttr,function(res){
			var html = "<div style='margin-left:20px'>" +
					"图片信息" +
						"<div>" +
						res +
						"</div>"+
					"</div>"
			result.dom.innerHTML = "";
			result.insertHtml("beforeEnd", html);
			QHERP_VIEWPORT.gridPanel.getStore().reload();
		})
		panel.loadData();
		DWREngine.setAsync(true);
	},
	delPics:function(){
		var records = Ext.getCmp("unImportPicName").getSelectionModel().getSelections();
		var store = Ext.getCmp("unImportPicName").getStore();
		Ext.each(records,function(record){
			importImageService.deletePic(record.get("filePath"),function(res){})
			store.remove(record);
		});
		//this.loadData();
	}
});

Ext.reg("importpicpanel",QH.controls.ImportPicPanel);