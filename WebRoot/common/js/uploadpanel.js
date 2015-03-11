/**1、该类需要引入ext/ux/FileUploadField.js与ext/resources/css/file-upload.css
 * cfg支持的值
 * params：需要提交到后台的参数，是一个Object对象
 * waitMsg：上传等待时提示的信息
 * opAction:insert或者modify,操作类型，用于识别是否需要显示图片
 * imgObj:页面上的图片对象,
 * imgUrl:通过流显示图片的Url，
 * uploadType:上传文件的类型 file：普通文件，image:图片
 * loadImgStream:true,false,是否需要以流的方式加载图片，必须配合imgUrl，和imgObj
 * uploadUrl:上传路径
 * validType: *|jpg|doc //文件验证类型，其中*代表所有文件，多个用|符号隔开
 * --------------- 2011-03-11 modify by achui ---------------------------------------------------
 * gridId:需要刷新的表格
 * successFn：上传成功后的回调函数，由用户自己定义(传递的参数为formpanel)
 * --------------- 2011-02-10 modify by achui ---------------------------------------------------
 * 
 * */
UploadWin = function(cfg) {
	var _self = this;
	if (!cfg)
		cfg = {};
	var validType = cfg.validType == null ? "*" : cfg.validType;
	//触发上传事件		
	var uploadAction = function() {
		if (_self.form.getForm().isValid()) {
			var uploadField = Ext.getCmp("fileUpload");
			var file = uploadField.getValue();
			var idx = file.lastIndexOf(".");
			var suffix = file.substring(idx + 1, file.length);
			//上传类型验证
			if ("*" != validType
					&& validType.indexOf(suffix.toLowerCase()) == -1) {
				Ext.Msg.show({
							title : "类型不正确",
							msg : "只能上传" + validType + " 的文件类型",
							minWidth : 200,
							modal : true,
							icon : Ext.Msg.INFO,
							buttons : Ext.Msg.OK
						});
				return;
			}
			//默认调用服务为BaseService
			if(!cfg.params.beanName) cfg.params.beanName = "BaseSerivce";
			
			var obj = _self.form.getForm().getFieldValues();
			// 如果为空，就删除，防止外键属性报外键约束
			for (var p in obj) {
				if(Ext.isEmpty(obj[p])){
					delete obj[p];
				}
			}
			
			delete obj["photo-path"];
			
			if(obj){
				Ext.apply(cfg.params,{
					paramJson:Ext.encode(obj)
				});
			}
			
			//文件上传操作
			_self.form.getForm().submit({
				url : cfg.uploadUrl,
				params : cfg.params || {},
				waitTitle : "请等待",
				waitMsg : cfg.waitMsg || '文件上传中.....',
				success : function(fp, o) {
					//上传成功后是否返回标识
					if(cfg.returnFlag){
						$('uploadSuc').value="1";
					}
					
					var uploadType = (cfg.uploadType == null
							? "image"
							: cfg.uploadType);
					if (uploadType == "file") {
						var back = cfg.back || function() {
							if (cfg.gridId)
								reloadGrid(cfg.gridId);
							if ($('filePath'))
								$('filePath').value = o.result.filePath
							alertMsg('文件上传成功！');
//							Ext.Msg.show({
//									title : "上传成功",
//									msg : "文件上传成功！",
//									minWidth : 200,
//									modal : true,
//									icon : Ext.Msg.INFO,
//									buttons : Ext.Msg.OK,
//									fn : function(){
//										if (cfg.gridId)
//											reloadGrid(cfg.gridId);
//										if ($('filePath'))
//											$('filePath').value = o.result.filePath
//									}
//								});
						}
						back();
						if(Ext.isFunction(cfg.successFn))
							cfg.successFn(_self,o.result.filePath); // 自定义文件上传后处理方法
						
					} else if (uploadType == "image") {
						if (cfg.opAction == "editor") {
							var element = cfg.editor.win.document.createElement("img");
                            element.src = 'upload\\'+o.result.fileName;
                            if (Ext.isIE) {
                                cfg.editor.insertAtCursor(element.outerHTML);
                            } else {
                                var selection = cfg.editor.win.getSelection();
                                if (!selection.isCollapsed) {
                                    selection.deleteFromDocument();
                                }
                                selection.getRangeAt(0).insertNode(element);
                            }
						}else{
							//直接加载上传完后的路径
							cfg.imgObj.el.dom.src = o.result.fileName;
//							Ext.getCmp(cfg.params.field).setValue(o.result.filePath);
							cfg.imgObj.ownerCt.items.items[0].setValue(o.result.filePath);
							if(Ext.isFunction(cfg.successFn))
								cfg.successFn(o.result.filePath);
						}
					}
					_self.close();
				},
				failure : function(fp, o) {
					Ext.Msg.show({
								title : "上传失败",
								minWidth : 200,
								modal : true,
								width :900,
								icon:Ext.Msg.ERROR,
								buttons:Ext.Msg.OK,
								prompt:true,
								multiline:450,
								value:o.result.msg,
								maxWidth:900
							});
				}
			})
		}
	}
	if (!cfg.labelName) {
		cfg.labelName = "图片";
	}
	var items = [{
		xtype : 'fileuploadfield',
		allowBlank : false,
		blankText : "请选择",
		id : 'fileUpload',
		emptyText : '请选择',
		fieldLabel : cfg.labelName,
		name : 'photo-path',
		buttonText : '',
		buttonCfg : {
			iconCls : 'upload-icon'
		},
		anchor : "100%"
	}];
	if(cfg.fieldItems){
		if(Ext.isArray(cfg.fieldItems)){
			Ext.each(cfg.fieldItems,function(fieldItem){
				items.push(fieldItem);
			});
		}else
			items.push(cfg.fieldItems);
	}
	this.form = new Ext.form.FormPanel({
				labelWidth : 60,
				//frame:true,
				bodyBorder:false,
				border:false,
				fileUpload : true,
				labelAlign : "right",
				id : "uploadForm",
				autoWidth : true,
				autoHeight : true,
				padding : "10px",
				buttonAlign : "center",
				fbar : [{
							text : "上传",
							iconCls : "page_upload",
							handler : uploadAction
						}, {
							text : "关闭",
							iconCls : "page_remove",
							handler : function() {
								_self.close();
							}
						}],
				items : items
			})

	//生成上传表单
	var loadImgStream = cfg.loadImgStream == null ? true : cfg.loadImgStream;

	this.getFileName = function() {
		var uploadField = Ext.getCmp("fileUpload");
		var file = uploadField.getValue();
		var idx = file.lastIndexOf("\\");
		var filename = file.substring(idx + 1, file.length);
		return filename;
	}
	this.getFileExtension = function(){
		var uploadField = Ext.getCmp("fileUpload");
		var file = uploadField.getValue();
		var idx = file.lastIndexOf(".");
		if(idx == -1)
			return '';
		
		var filename = file.substring(idx + 1, file.length);
		return filename.toLowerCase();
	}
	this.getFileSize = function(){
		
	}
	var con = {
		width : 300,
		title : "上传",
		modal : true,
		constrainHeader:true,
		id : "uploadWin",
		items : [this.form]
	}
	Ext.apply(con, cfg);
	UploadWin.superclass.constructor.call(this, con);
};

Ext.extend(UploadWin, Ext.Window, {});
Ext.reg("uploadpanel",UploadWin);