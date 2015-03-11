
/**
 * 批量上传文件 
 * @class QH.ux.win.UploadWindow
 * @extends Ext.Window
 */
QH.ux.win.UploadWindow = Ext.extend(Ext.Window,{
	title : '批量上传文件',
	layout:'fit',
	modal:true,
	constrainHeader:true,
	width:500,
	height:380,
//	closeAction:'hide',
	swfUploadCfg:'',
	defaultUrl:TOMCAT_UPLOAD_SERVER == null ?'../../servlet/UploadServlet':TOMCAT_UPLOAD_SERVER,
	initComponent:function(){
		Ext.DomHelper.append(document.body, {
			html : '<div id="tempBrn" style="background-color: #AADBF0;"><div id="spanButtonPlaceholder"></div>'
		}, true);
		this.uploadSeting = new Ext.Window({
			title : "上传配置",
			width : 350,
			height : 150,
			layout : "form",
			padding : "10",
			closeAction : "hide",
			titleCollapse : false,
			buttonAlign : "center",
			plain : false,
			fbar : [{
				text : "设置",
				handler : this.setupUploadConfig,
				scope:this
			}],
			items : [{
				xtype : "numberfield",
				fieldLabel : "每次上传文件数",
				id : "uploadLimit",
				allowDecimals : false,
				allowNegative : false,
				value : 300,
				maxValue : 1000,
				anchor : "100%"
			}, {
				xtype : "numberfield",
				fieldLabel : "每个文件大小(K)",
				allowDecimals : false,
				allowNegative : false,
				//maxValue : 6144,
				value : 300,
				id : "sizeLimit",
				anchor : "100%"
			}]
		});
		
		this.tbar = [{
			text : "上传配置",
			handler : function(){
				this.uploadSeting.show();
			},
			scope:this,
			iconCls : "page_config",
			cls : "SYSOP_ADD"
		},'-',{
			xtype:'panel',
			contentEl:'tempBrn'
		}];
		var pnlCfg = Ext.apply({},this.swfUploadCfg,{
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
//			file_types : "*.txt;*.html;*.xls;*.xml;",
			file_types :'*.*',
			file_types_description : "文件",
			file_upload_limit : 300, // 上传数量
			file_size_limit : 300,
			reloadUrl : window.location.href,
			reloadFn : this.reloadFn.createDelegate(this),
			uploadStart : this.uploadStartFn.createDelegate(this)
		});
		this.pnl = new Ext.ux.SwfUploadPanel(pnlCfg);
		this.items = [this.pnl];
		QH.ux.win.UploadWindow.superclass.initComponent.call(this);
		this.on('show',function(win){
//			var swfu = win.items.items[0].suo;
////			swfu.store.clearData();
//			swfu.setUploadURL(win.defaultUrl);
		});
	},
	/**
	 * 上传完成后,调用的函数
	 */
	reloadFn:function(result){

	},
	/**
	 * 上传之前
	 */
	uploadStartFn:function(file){
	},
	setupUploadConfig : function() {
		var swfu = this.items.items[0].suo;
		var file_upload_limit = parseInt($("uploadLimit").value);
		if (isNaN(file_upload_limit) || file_upload_limit == 0) {
			$("uploadLimit").value = "300";
			file_upload_limit = 300;
		}
		if (file_upload_limit > 1000) {
			Ext.Msg.alert('提示消息', "上传图片数过多，最多1000张")
			file_upload_limit = 1000;
			$("uploadLimit").value = "1000";
		}
		swfu.setFileUploadLimit(file_upload_limit);
		// 判断输入的内容是否违规
		var file_size_limit = parseInt($("sizeLimit").value);
		if (isNaN(file_upload_limit) || file_size_limit == 0) {
			$("sizeLimit").value = "300";
			file_size_limit = 300;
		}
		if (file_size_limit > 6144) {
			Ext.Msg.alert('提示消息', "每张最大不能大于6144KB（6MB），最多6M")
			file_size_limit = 6144;
			$("sizeLimit").value = "6144";
		}
		swfu.setFileSizeLimit(file_size_limit);
		
		//是否压缩,如果有更改上传路径
//		var chk = Ext.getCmp('suoChk').checkbox;
//		if(chk){
//			if(chk.dom.checked){
//				var scale = Ext.getCmp('scale').getValue();
//				if(height==''){
//					scale=0.5;//默认0.5
//				}
//				var height = Ext.getCmp('heightAfter').getValue();
//				if(height==''){
//					height=400;//默认400
//				}
//				var width = Ext.getCmp('widthAfter').getValue();
//				if(width==''){
//					width=400;//默认400
//				}
//				var url=defaultUrl+"?scale="+scale+"&height="+height+"&width="+width+"&checked="+flag;
//				swfu.setUploadURL(url);
//			}else{
//				var url=defaultUrl+"?checked="+flag;
//				swfu.setUploadURL(url);
//		}
//		}
//		var url=defaultUrl;
//		swfu.setUploadURL(url);
		Ext.Msg.alert('提示消息', "设置成功");
		this.uploadSeting.hide();
	}
});