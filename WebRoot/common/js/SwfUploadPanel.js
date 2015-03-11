/**
 * Makes a Panel to provide the ability to upload multiple files using the SwfUpload flash script.
 *
 * @author Michael Giddens
 * @website http://www.silverbiology.com
 * @created 2008-03-06
 * @version 0.4
 *
 * @known_issues 
 *		- Progress bar used hardcoded width. Not sure how to make 100% in bbar
 *		- Panel requires width / height to be set.  Not sure why it will not fit
 *		- when panel is nested sometimes the column model is not always shown to fit until a file is added. Render order issue.
*/

// Create user extension namespace
Ext.namespace('Ext.ux');

Ext.ux.SwfUploadPanel = function(config){
	config = config || {};
    if(config.initialConfig){
        if(config.isAction){           // actions
            this.baseAction = config;
        }
        config = config.initialConfig; // component cloning / action set up
    }else if(config.tagName || config.dom || Ext.isString(config)){ // element object
        config = {applyTo: config, id: config.id || config};
    }

    this.initialConfig = config;

    Ext.apply(this, config);
    
	// Default Params for SwfUploader
//	if (!config.title) config.title = 'File Upload';
	if (!config.single_select) config.single_select = false;
	if (!config.file_types) config.file_types = "*.*";
	if (!config.file_types_description) config.file_types_description = "All Files";
	if (!config.file_size_limit) config.file_size_limit = "102400"; //100MB
	if (!config.file_upload_limit) config.file_upload_limit = "0";
	if (!config.file_post_name) config.file_post_name = "Filedata"; // This is the "name" of the file item that the server-side script will receive. Setting this doesn't work in the Linux Flash Player
	if (!config.flash_url) config.flash_url = "swfupload_f10.swf"; // Relative to this file
	if (!config.debug) config.debug = false;
		
	this.rec = Ext.data.Record.create([
				 {name: 'name'},
				 {name: 'size'},
				 {name: 'id'},
				 {name: 'type'},
				 {name: 'creationdate', type: 'date', dateFormat: 'm/d/Y'},
				 {name: 'status'}
			]);
		
	var store = new Ext.data.Store({
			reader: new Ext.data.JsonReader({
					  id: 'id'
				 }, this.rec)
	});
	this.reloadUrl = config.reloadUrl;
	this.reloadFn = config.reloadFn;
	
	// IE与Chrome
	var upload_url = config.upload_url;
	if(upload_url.indexOf("http:") == -1){
		// 去除地址前面的./
		upload_url = upload_url.substring(upload_url.lastIndexOf('./')+2);	// IE浏览器，不能加./
		if(Ext.isChrome)// 谷歌浏览器需要加../../
			upload_url = "../../" + upload_url;
	}
	this.suo = new SWFUpload({
		upload_url: upload_url,
		post_params: config.post_params,
		file_post_name: config.file_post_name,	
		file_size_limit : config.file_size_limit,
		file_types : config.file_types,
		file_types_description : config.file_types_description,
		file_upload_limit : config.file_upload_limit,
		flash_url : config.flash_url,	

		button_image_url : config.button_image_url,
		button_width : config.button_width,
		button_height : config.button_height,
		button_action : config.button_action,
		button_placeholder_id : config.button_placeholder_id,
		button_text_style : config.button_text_style,
		button_text_top_padding : config.button_text_top_padding,
		button_text_left_padding : config.button_text_left_padding,
		// Event Handler Settings
		
		
		file_queued_handler : this.fileQueue.createDelegate(this),
		file_queue_error_handler : this.fileQueueError.createDelegate(this),
		file_dialog_complete_handler : this.fileDialogComplete.createDelegate(this),
		
		upload_start_handler:this.uploadStart.createDelegate(this),
		upload_error_handler : this.uploadError.createDelegate(this), 
		upload_progress_handler : this.uploadProgress.createDelegate(this),
		upload_complete_handler : this.uploadComplete.createDelegate(this),

		upload_success_handler : this.fileComplete.createDelegate(this),
		upload_error_handler : this.fileCancelled.createDelegate(this),

		swfupload_loaded_handler : this.swfUploadLoaded.createDelegate(this),

		debug: config.debug

	});

	this.progress_bar = new Ext.ProgressBar({
			text:'上传进度'
//			, width: config.width - 7
  }); 

	var cm = new Ext.grid.ColumnModel([{id:'name', header: "文件名称", dataIndex: 'name'}
				,	{id:'size', header: "大小", width: 80, dataIndex: 'size', renderer: this.formatBytes }
				,	{id:'status', header: "状态", width: 80, dataIndex: 'status', renderer: this.formatStatus }
			]);
																		 
	config = config || {};
	config = Ext.apply(config || {}, {

			store: store
		,	cm: cm
		, autoExpandColumn: 'name'
		, enableColumnResize: false
		, enableColumnMove: false
		, id:"uploadGrid"		
		,	sm: new Ext.grid.RowSelectionModel({singleSelect: config.single_select})
		,	tbar: [
						 '->', {
							  text: '移除文件'
							, id: 'remove'
							, iconCls: 'page_remove'
							, handler: this.removeRows.createDelegate(this)
							, hidden: true
						},{
							  text: '取消上传'
							, id: 'cancel'
							, iconCls: 'cancel'
							, handler: this.stopUpload.createDelegate(this)
							, hidden: true
						}, {
							  text: '上传文件'
							, iconCls: 'page_upload'
							, handler: this.uploadFiles.createDelegate(this)
							, hidden: true
						}
			]

		, bbar: [ this.progress_bar ]

  });

	cm.defaultSortable = false;

	Ext.ux.SwfUploadPanel.superclass.constructor.apply(this, arguments);
	
	try {
			this.progress_bar.setWidth(this.bbar.getWidth() - 5);
			Ext.fly(this.progress_bar.el.dom.firstChild.firstChild).applyStyles("height: 16px");
	}	catch (ex1) {
	}
	
	this.on({
		'keypress': {
			fn:function(e) {
				// Delete Row										
				function removeRows(grid) {
					var selRecords = grid.getSelectionModel().getSelections();
					for (var i=0; i < selRecords.length; i++) {
						if (selRecords[i].data.status != 1 && selRecords[i].data.status != 2) {
							grid.suo.cancelUpload(selRecords[i].id);
							grid.getStore().remove(selRecords[i]);
						}
					}
					
					if (grid.suo.getStats().files_queued == 0) {
						grid.getTopToolbar().items.get(3).setVisible(false);
						this.doLayout();
					}
	
				}
				if (config.confirm_delete) {
					if(e.getKey() == e.DELETE) {
						Ext.MessageBox.confirm('删除所选','确定从上传队列中删除所选文件？', function(e) {
							if (e == 'yes') {
								removeRows(this);
							}
						});
					}	
				} else {
					removeRows(this);
				}
			}
		}, 'contextmenu': {
			fn:function(e) {
				e.stopEvent();
			}	
		}
	
	})
	
	this.on('resize', function() { 
		this.progress_bar.setWidth(this.bbar.getWidth() - 5);	
		Ext.fly(this.progress_bar.el.dom.firstChild.firstChild).applyStyles("height: 16px");
	});
	
};

Ext.extend(Ext.ux.SwfUploadPanel, Ext.grid.GridPanel, {
	
	initComponent:function(){
			Ext.ux.SwfUploadPanel.superclass.initComponent.call(this);
			this.addEvents('fileUploadComplete');
	},

	/**
	 * Formats file status
	 * @param {Integer} status
	 * @return {String}
	 */
	formatStatus: function(status) {
		switch(status) {
			case 0: return("就绪");
			case 1: return("上传中...");
			case 2: return("完成");
			case 3: return("错误");
			case 4: return("取消");
		}
	}
	
	/**
	 * Formats raw bytes into kB/mB/GB/TB
	 * @param {Integer} bytes
	 * @return {String}
	 */
	,	formatBytes: function(bytes) {
			if(isNaN(bytes)) {	return (''); }
	
			var unit, val;
	
			if(bytes < 1024)	{
				unit = 'B';
				val = (!bytes && this.progressRequestCount >= 1) ? '~' : bytes;
			}	else if(bytes < 1024*1024)	{
				unit = 'kB';
				val = Math.round(bytes/1024);
			}	else if(bytes < 1024*1024*1024)	{
				unit = 'MB';
				val = Math.round(bytes/(1024*1024));
			}	else if(bytes < 1024*1024*1024*1024)	{
				unit = 'GB';
				val = Math.round(bytes/(1024*1024*1024));
			}	else	{
				unit = 'TB';
				val = Math.round(bytes/(1024*1024*1024*1024));
			}
	
			return (val + ' ' + unit);
		}

	/**
	 * Show notice when error occurs
	 * @param {Object, Integer, Integer}
	 * @return {}
	 */
	, uploadError: function(file, errorCode, message) {
			switch (error) {
//				case -200: 	Ext.MessageBox.alert('Error','File not found 404.');
//										break;
//				case -230: 	Ext.MessageBox.alert('Error','Security Error. Not allowed to post to different url.');
//										break;
				
				case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
					//progress.setStatus("Upload Error: " + message);
					alert("上传错误: HTTP 错误, 文件名: " + file.name + ", 错误信息: " + message);
					break;
				case SWFUpload.UPLOAD_ERROR.MISSING_UPLOAD_URL:
					//progress.setStatus("Configuration Error");
					alert("上传错误: 无效上传地址, 文件名: " + file.name + ", 错误信息: " + message);
					break;
				case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
					//progress.setStatus("Upload Failed.");alertdebug("Error Code: Upload Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
					break;
				case SWFUpload.UPLOAD_ERROR.IO_ERROR:
					//progress.setStatus("Server (IO) Error");
					alert("上传错误: 发生IO错误, 文件名: " + file.name + ", 错误信息: " + message);
					break;
				case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
					//progress.setStatus("Security Error");
					alert("上传错误: 发生安全性错误, 文件名: " + file.name + ", 错误信息: " + message);
					break;
				case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
					//progress.setStatus("Upload limit exceeded.");
					alert("上传错误: 超过上传文件数限制, 文件名: " + file.name + ", 文件大小: " + file.size + ", 错误信息: " + message);
					break;
				case SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND:
					//progress.setStatus("File not found.");
					alert("上传错误: 找不到对应文件, 文件名: " + file.name + ", 文件大小: " + file.size + ", 错误信息: " + message);
					break;
				case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
					//progress.setStatus("Failed Validation.  Upload skipped.");
					alert("Error Code: File Validation Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
					break;
				case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
				/*
					if (this.getStats().files_queued === 0) {
						document.getElementById(this.customSettings.cancelButtonId).disabled = true;
					}
					progress.setStatus("Cancelled");
					progress.setCancelled();
				*/
				//uploadFileCancelled(file);
					break;
				case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
					//progress.setStatus("Stopped");
					break;
				default:
					//progress.setStatus("Unhandled Error: " + error_code);
					alert("上传错误: 错误代码：" + errorCode + ", 文件名: " + file.name + ", 文件大小: " + file.size + ", 错误信息: " + message);
					break;
			}
		}


	/**
	 * Add file to store / grid
	 * @param {file}
	 * @return {}
	 */
	, fileQueue: function(file) {
			file.status = 0;
			r = new this.rec(file);
			r.id = file.id;
			this.store.add(r);
			this.fireEvent('fileQueued', this, file);			
		}

	/**
	 * Error when file queue error occurs
	 */
	, fileQueueError: function(file, errorCode, message) {
//			switch (code) {
//				case -100: 	Ext.MessageBox.alert('Error','The selected files you wish to add exceedes the remaining allowed files in the queue. There are ' + queue_remaining + ' remaining slots.');
//										break;
//			}
			try {
	
				if (errorCode === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
					alert("一次性上传文件数太多.\n" + (message == 0 ? "已经达到文件数上传上限." : "您还可以选择 " + (message > 1 ? "上传 " + message + " 个文件." : "一个文件.")));
					return;
				}
				switch (errorCode) {
				case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
					//progress.setStatus("File is too big.");
					alert("上传错误: 上传文件太大, 文件名: " + file.name + ", 文件大小: " + file.size + ", 错误信息: " + message);
					break;
				case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
					//progress.setStatus("Cannot upload Zero Byte files.");
					alert("上传错误: 存在0字节文件, 文件名: " + file.name + ", 文件大小: " + file.size + ", 错误信息: " + message);
					break;
				case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
					//progress.setStatus("Invalid File Type.");
					alert("上传错误: 无效文件类型, 文件名: " + file.name + ", 文件大小: " + file.size + ", 错误信息: " + message);
					break;
				case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
					alert("上传错误：上传总文件数超过队列限制.  " +  (message > 1 ? "只能再添加 " +  message + " 个文件" : "上传队列已满，无法继续添加."));
					break;
				default:
					if (file !== null) {
						progress.setStatus("Unhandled Error");
					}
					alert("上传错误: 错误代码：" + errorCode + ", 文件名: " + file.name + ", 文件大小: " + file.size + ", 错误信息: " + message);
					break;
				}
			} catch (ex) {
		        this.debug(ex);
		    }
		}
	,uploadStart:function(file){
			
	}
	, fileComplete: function(file,server_data) {
			var o = Ext.decode(server_data);	
			this.fireEvent('fileUploadComplete', this, file, o);
			if (this.suo.getStats().files_queued > 0) {
				this.uploadFiles();
			} else {
				this.getTopToolbar().items.get(1).setVisible(false);
				this.getTopToolbar().items.get(2).setVisible(false);		
				this.getTopToolbar().items.get(3).setVisible(false);
				this.doLayout();
				//this.fireEvent('queueUploadComplete', this);
				this.reloadFn(server_data);
//				alert(server_data);
//				if(this.reloadUrl != null && this.reloadUrl != '')
//					window.location.href = this.reloadUrl;
			}
	
		}

	, fileDialogComplete: function(file_count) {
			if (file_count > 0)
			{
				//显示删除按钮
				this.getTopToolbar().items.get(1).setVisible(true);
				//显示上传按钮
				this.getTopToolbar().items.get(3).setVisible(true);
				this.doLayout();
			}
		}

	, uploadProgress: function(file, current_size, total_size) {
			this.store.getById(file.id).set('status', 1);		
			this.store.getById(file.id).commit();
			this.progress_bar.updateProgress(current_size/total_size, (current_size == total_size?'上传文件完成,处理中:':'上传文件中: ') + file.name + ' (' + this.formatBytes(current_size) + ' of ' + this.formatBytes(total_size) + ')');
		}

	, uploadComplete: function(file, result) {
			if (this.cancelled) {
				this.cancelled = false;
			} else {
				var o = Ext.decode(result);	
	
				this.store.getById(file.id).set('status', 2);
				this.store.getById(file.id).commit();
				this.progress_bar.reset();
				this.progress_bar.updateText('上传进度');
				
				if (this.remove_completed) {
					this.store.remove(this.store.getById(file.id));
				}
				
			}
		}

	, uploadFiles: function() {
			this.getTopToolbar().items.get(2).setVisible(true);	
			this.doLayout();
			this.suo.startUpload();
		}
	
	, addPostParam: function( name, value ) {
			this.suo.settings.post_params[name] = value;
			this.suo.setPostParams( this.suo.settings.post_params );
		}
		
	, stopUpload: function( cancel_btn ) {
			this.suo.stopUpload();
			this.getStore().each(function() {
				if (this.data.status == 1) {
					this.set('status', 0);
					this.commit();
				}
			});

			this.getTopToolbar().items.get(2).setVisible(false);	
			this.doLayout();
			this.progress_bar.reset();
			this.progress_bar.updateText('上传进度');
			
		}
	
	, fileCancelled: function(file, code, b, c, d) {
			if (code == -280) return;
			
			this.store.getById(file.id).set('status', 4);
			this.store.getById(file.id).commit();
			this.progress_bar.reset();
			this.progress_bar.updateText('上传进度');

			if (this.suo.getStats().files_queued > 0) {
				this.getTopToolbar().items.get(2).setVisible(false);		
			} else {
				this.getTopToolbar().items.get(1).setVisible(false);
				this.getTopToolbar().items.get(2).setVisible(false);		
				this.getTopToolbar().items.get(3).setVisible(false);		
			}
			this.doLayout();

			this.cancelled = true;
		}
		
	, swfUploadLoaded: function() {
			this.fireEvent('swfUploadLoaded', this);
		}
	,removeRows:function (grid) {
			var selRecords = this.getSelectionModel().getSelections();
			for (var i=0; i < selRecords.length; i++) {
				if (selRecords[i].data.status != 1 && selRecords[i].data.status != 2) {
					this.suo.cancelUpload(selRecords[i].id);
					this.getStore().remove(selRecords[i]);
				}
			}
									
			if (this.suo.getStats().files_queued == 0) {
				this.getTopToolbar().items.get(1).setVisible(false);
				this.getTopToolbar().items.get(3).setVisible(false);
				this.getTopToolbar().items.get(2).setVisible(false);
				this.doLayout();
			}

		}
		
});