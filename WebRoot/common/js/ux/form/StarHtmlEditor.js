$importCss('common/ext/resources/css/file-upload.css')
$import('common/ext/ux/FileUploadField.js')
$import('common/js/uploadpanel.js')

/**
 * 扩展文本编辑器
 * azan
 * @class HTMLEditor
 * @extends QH.ux.form.HtmlEditor
 */
QH.ux.form.HTMLEditor = Ext.extend(Ext.form.HtmlEditor, {
	defaultFont : '宋体',
	noUploadPic : false,// 默认可以上传图片
	uploadPicUrl : './upload.action',
	fontFamilies : ['Arial', '微软雅黑', '华文彩云', '幼圆', '华文琥珀', '楷体_GB2312', '新宋体',
			'仿宋_GB2312', '宋体', '华文新魏', '黑体', '华文行楷', '隶书', 'Arial Black',
			'Book Antiqua', 'Calibri', 'Candara', 'Cambria', 'Century',
			'Century Gothic', 'Comic Sans MS', 'Consolas', 'Constantia',
			'Courier New', 'Franklin Gothic Medium', 'Garamond', 'Georgia',
			'Impact', 'Lucida Console', 'Microsoft Sans Serif', 'Segoe Print',
			'Segoe Script', 'Segoe UI', 'Tahoma', 'Times New Roman',
			'Trebuchet MS', 'Verdana'],
	backGrounpPic : true,//默认不可以插入背景图片和清楚背景
	//clearBackGrounpPic:true,
	// 默认字体都转成小写
	initComponent : function() {
		this.defaultFont = this.defaultFont.toLowerCase();
	},
	// 修改字体大小时
	adjustFont : function(btn) {
		var adjust = btn.getItemId() == 'increasefontsize' ? 1 : -1, doc = this
				.getDoc(), v = parseInt(doc.queryCommandValue('FontSize') || 2,
				10);
		if ((Ext.isSafari && !Ext.isSafari2) || Ext.isChrome || Ext.isAir) {
			// Safari 3 values
			// 1 = 10px, 2 = 13px, 3 = 16px, 4 = 18px, 5 = 24px, 6 =
			// 32px
			if (v == 1) {
				v = 10;
			}
			if (v == 2) {
				v = 13;
			}
			if (v == 3) {
				v = 16;
			}
			if (v == 4) {
				v = 18;
			}
			if (v == 5) {
				v = 24;
			}
			if (v == 6) {
				v = 32;
			}

			if (v <= 10) {
				v = 1 + adjust;
			} else if (v <= 13) {
				v = 2 + adjust;
			} else if (v <= 16) {
				v = 3 + adjust;
			} else if (v <= 18) {
				v = 4 + adjust;
			} else if (v <= 24) {
				v = 5 + adjust;
			} else {
				v = 6 + adjust;
			}
			v = v.constrain(1, 6);
		} else {
			if (Ext.isSafari) { // safari
				adjust *= 2;
			}
			v = Math.max(1, v + adjust) + (Ext.isSafari ? 'px' : 0);
		}
		this.execCmd('FontSize', v);
	},
	// 编辑时,使用下拉字体
	onEditorEvent : function(e) {
		this.updateToolbar();
		if (Ext.isWebKit) {
			var font = this.fontSelect.dom.value;
			this.relayCmd('fontname', font);
		}
	},
	// 在初始化时,使用默认字体
	onFirstFocus : function() {
		this.activated = true;
		this.disableItems(this.readOnly);
		if (Ext.isGecko) { // prevent silly gecko errors
			this.win.focus();
			var s = this.win.getSelection();
			if (!s.focusNode || s.focusNode.nodeType != 3) {
				var r = s.getRangeAt(0);
				r.selectNodeContents(this.getEditorBody());
				r.collapse(true);
				this.deferFocus();
			}
			try {
				this.execCmd('useCSS', true);
				this.execCmd('styleWithCSS', false);
			} catch (e) {
			}
		}
		if (Ext.isWebKit) {
			var font = this.fontSelect.dom.value;
			this.relayCmd('fontname', font);
		}
		this.fireEvent('activate', this);
	},
	// 点击上传图片按钮
	addImage : function() {
		var editor = this;
		this.focus();
		var win = new UploadWin({
					waitMsg : "图片上传中......",
					opAction : 'editor',
					editor : editor,
					uploadType : "image",
					uploadUrl : editor.uploadPicUrl,
					validType : "jpg|png|bmp|gif"
				})
		win.show();
	},
	// 插入本地图片作为背景
	insertLocalBackPic : function(url) {
		var editor = this;
		var width;
		var height;
		var image = new Image();
		image.src = url;
		image.onload = function() {
			width = image.width;
			height = image.height;
			var txt = editor.getEditorBody().innerHTML;
			if (!Ext.isEmpty(txt.trim())) {
				var startStyle = txt
						.indexOf('<style type="text/css">.label_preview_tableId{');
				if (startStyle > 0) {
					// var bb='<style type="text/css">.label_preview_tableId{';
					var endStyle = txt
							.indexOf('background-repeat:no-repeat;margin:0;padding:0;}</style>');
					var remain = txt.substring(startStyle + 46, endStyle);//截取要被替换的字符串

					var newStr = 'background-image:url(' + url + ');height:'
							+ height + 'px;width:' + width + 'px;';//替换的字符
					txt = txt.replace(remain, newStr);
					editor.setValue(txt);
				}
			} else {
				//默认获取txt.html内容
				mailTemplateService.getHtmFile('txt', 'New', function(res) {
					if (res) {
						var txtStr = res;
						var startStyle = txtStr
								.indexOf('<style type="text/css">.label_preview_tableId{');
						var endStyle = txtStr
								.indexOf('background-repeat:no-repeat;margin:0;padding:0;}</style>');
						var remain = txtStr
								.substring(startStyle + 46, endStyle);//截取要被替换的字符串

						var newStr = 'background-image:url(' + url
								+ ');height:' + height + 'px;width:' + width
								+ 'px;';//替换的字符
						txtStr = txtStr.replace(remain, newStr);
						editor.setValue(txtStr);
					}
				});
			}
		}
	},
	previewImage : function() {
		var editor = this;
		var localPicPanel = new Ext.FormPanel({
			title : '本地图片',
			labelWidth : 60,
			labelAlign : "right",
			fileUpload : true,
			frame : true,
			bodyStyle : 'padding:20px',
			items : [{
				xtype : 'panel',
				layout : 'column',
				items : [{
							xtype : 'panel',
							labelWidth : 60,
							labelAlign : "right",
							layout : 'form',
							columnWidth : 0.8,
							items : [{
										xtype : 'fileuploadfield',
										emptyText : '选择本地图片作为背景',
										anchor : '100%',
										allowBlank : false,
										blankText : "请本地图片",
										fieldLabel : '上传图片',
										id : 'statFile',
										name : 'statFile',
										buttonText : '',
										buttonCfg : {
											iconCls : 'upload-icon'
										}
									}]
						}, {
							xtype : 'panel',
							columnWidth : 0.2,
							items : [{
								xtype : 'button',
								width : 60,
								text : "确定",
								iconCls : "page_table_save",
								handler : function() {
									if (localPicPanel.getForm().isValid()) {
										localPicPanel.getForm().submit({
											url : './uploadMailFile.action?m=uploadFile&isTemplate=true&isBackground=true&date='
													+ new Date(),
											method : 'get',
											waitTitle : '请等待',
											waitMsg : '上传中...',
											success : function(fp, o) {
												var fileName = o.result.fileName;
												editor
														.insertLocalBackPic(fileName);
											},
											failure : function(fp, o) {
												Ext.MessageBox.alert("提示信息",
														o.result.msg);
											}
										});
									}
								}
							}]
						}]
			}]
		});
		var internetPanel = new Ext.Panel({
			title : '网络图片',
			height : 500,
			frame : true,
			items : [{
				xtype : 'panel',
				layout : 'form',
				labelAlign : "right",
				labelWidth : 60,
				padding : 5,
				buttonAlign : "center",
				fbar : [{
					text : "预览",
					handler : function() {
						var url = imageWin.urlPanelId.getValue();
						var reg = /(((^https?)|(^ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i;
						if (reg.test(url) == true) {
							imageWin.showPicPanelId.body.dom.innerHTML = '<img src="'
									+ url + '"/>';
						}
					},
					scope : editor
				}, {
					text : "清除",
					handler : function() {
						imageWin.urlPanelId.setValue('http://');
					}
				}],
				items : [{
							xtype : 'textfield',
							fieldLabel : "来源",
							ref : '../../../urlPanelId',
							anchor : "95%",
							value : 'http://'
						}]
			}, {
				xtype : 'panel',
				//						layout :'form',
				//baseCls:'x-plain',
				labelAlign : "left",
				labelWidth : 40,
				padding : 0,
				buttonAlign : "center",
				fbar : [{
					text : "确定",
					handler : function() {
						var url = imageWin.urlPanelId.getValue();
						var reg = /(((^https?)|(^ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i;
						if (reg.test(url) == true) {
							var width;
							var height;
							var image = new Image();
							image.src = url;
							image.onload = function() {
								width = image.width;
								height = image.height;
								var txt = editor.getEditorBody().innerHTML;
								if (!Ext.isEmpty(txt.trim())) {
									var startStyle = txt
											.indexOf('<style type="text/css">.label_preview_tableId{');
									if (startStyle > 0) {
										var bb = '<style type="text/css">.label_preview_tableId{';
										var endStyle = txt
												.indexOf('background-repeat:no-repeat;margin:0;padding:0;}</style>');
										var remain = txt.substring(startStyle
														+ 46, endStyle);//截取要被替换的字符串

										var newStr = 'background-image:url('
												+ url + ');height:' + height
												+ 'px;width:' + width + 'px;';//替换的字符
										txt = txt.replace(remain, newStr);
										editor.setValue(txt);
									}
								} else {
									//默认获取txt.html内容
									mailTemplateService.getHtmFile('txt',
											'New', function(res) {
												if (res) {
													var txtStr = res;
													var startStyle = txtStr
															.indexOf('<style type="text/css">.label_preview_tableId{');
													var endStyle = txtStr
															.indexOf('background-repeat:no-repeat;margin:0;padding:0;}</style>');
													var remain = txtStr
															.substring(
																	startStyle
																			+ 46,
																	endStyle);//截取要被替换的字符串

													var newStr = 'background-image:url('
															+ url
															+ ');height:'
															+ height
															+ 'px;width:'
															+ width + 'px;';//替换的字符
													txtStr = txtStr.replace(
															remain, newStr);
													editor.setValue(txtStr);
												}
											});
								}
							}
						}
					},
					scope : editor
				}],
				items : [{
					height : 250,
					ref : '../../../showPicPanelId',
					style : "margin-left:30px;background: white;border-color:#99BBE8;border:1px sold;",
					autoScroll : true,
					width : '90%',
					html : ''
				}]
			}]
		});
		var tabPanel = new Ext.TabPanel({
					margins : "0 5 0 0",
					activeTab : 0,
					items : [internetPanel, localPicPanel]
				});

		var imageWin = new Ext.Window({
					title : '选择图片',
					height : 450,
					width : 600,
					layout : 'fit',
					items : [tabPanel]
				});
		imageWin.show();
	},
	clearPic : function() {
		//清除背景
		var editor = this;
		var txt = editor.getEditorBody().innerHTML;
		var startStyle = txt
				.indexOf('<style type="text/css">.label_preview_tableId{');
		if (startStyle > 0) {
			var endStyle = txt
					.indexOf('background-repeat:no-repeat;margin:0;padding:0;}</style>');
			var remain = txt.substring(startStyle + 46, endStyle);//截取要被替换的字符串

			var newStr = 'background-image:url();height:345px;width:680px;background-repeat:no-repeat';//替换的字符
			txt = txt.replace(remain, newStr);
			editor.setValue(txt);
		}
	},
	inserPic : function(url) {
		var editor = this;
		unmask();
		var reg = /(((^https?)|(^ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i;
		if (reg.test(url) == true) {
			var width;
			var height;
			var image = new Image();
			image.src = url;
			image.onload = function() {
				width = image.width;
				height = image.height;
				var txt = editor.getEditorBody().innerHTML;
				var startStyle = txt
						.indexOf('<style type="text/css">.label_preview_tableId{');
				if (startStyle > 0) {
					var bb = '<style type="text/css">.label_preview_tableId{';
					var endStyle = txt
							.indexOf('background-repeat:no-repeat;margin:0;padding:0;}</style>');
					var remain = txt.substring(startStyle + 46, endStyle);//截取要被替换的字符串

					var newStr = 'background-image:url(' + url + ');height:'
							+ height + 'px;width:' + width + 'px;';//替换的字符
					txt = txt.replace(remain, newStr);
					editor.setValue(txt);
				}
			}
		}
	},
	fixKeys : function() { // load time branching for fastest keydown
		// performance
		if (Ext.isIE) {
			return function(e) {
				var k = e.getKey(), doc = this.getDoc(), r;
				if (k == e.TAB) {
					e.stopEvent();
					r = doc.selection.createRange();
					if (r) {
						r.collapse(true);
						r.pasteHTML('&nbsp;&nbsp;&nbsp;&nbsp;');
						this.deferFocus();
					}
				} else if (k == e.ENTER) {
					r = doc.selection.createRange();
					if (r) {
						var target = r.parentElement();
						if (!target || target.tagName.toLowerCase() != 'li') {
							e.stopEvent();
							r.pasteHTML('<br />');
							r.collapse(false);
							r.select();
						}
					}
				}
			};
		} else if (Ext.isOpera) {
			return function(e) {
				var k = e.getKey();
				if (k == e.TAB) {
					e.stopEvent();
					this.win.focus();
					this.execCmd('InsertHTML', '&nbsp;&nbsp;&nbsp;&nbsp;');
					this.deferFocus();
				}
			};
		} else if (Ext.isWebKit) {
			return function(e) {
				var k = e.getKey();
				if (k == e.TAB) {
					e.stopEvent();
					this.execCmd('InsertText', '\t');
					this.deferFocus();
				} else if (k == e.ENTER) {
					e.stopEvent();
					// ----回车后不改变字体
					var font = this.fontSelect.dom.value;
					this.relayCmd('fontname', font);
					// ----------------------
					// 先判断未回车之前的文本末尾是否有<br>
					var txtOld = this.getEditorBody().innerText;
					var ppOld = txtOld.charAt(txtOld.length - 1);
					// 加<br>
					var selection = this.win.getSelection();
					var rg = selection.getRangeAt(0);
					var fragment = rg.createContextualFragment("<br/>");
					var oLastNode = fragment.lastChild;
					rg.insertNode(fragment);
					rg.setEndAfter(oLastNode);// 设置末尾位置
					rg.collapse(false);// 合并范围至末尾
					selection.removeAllRanges();// 清除range
					selection.addRange(rg);// 设置range

					// 回车后的文本末尾是否有<br>
					var txt = this.getEditorBody().innerText;
					var ppNew = txt.charAt(txt.length - 1);
					// 旧文本末尾没<br>,回车后变成有,则说明当时光标在文本末尾
					if (ppOld != '\n' && ppNew == '\n') {
						// 如果是文本末尾还要再加一次<br>
						var rg2 = selection.getRangeAt(0);
						var fragment = rg2.createContextualFragment("<br/>");
						var oLastNode = fragment.lastChild;
						rg2.insertNode(fragment);
						rg2.setEndAfter(oLastNode);// 设置末尾位置
						rg2.collapse(false);// 合并范围至末尾
						selection.removeAllRanges();// 清除range
						selection.addRange(rg2);// 设置range
					}
				}
			};
		}
	}(),
	// 插入上传图片按钮
	createToolbar : function(editor) {
		QH.ux.form.HTMLEditor.superclass.createToolbar.call(this, editor);
		this.tb.insertButton(16, {
					iconCls : "upload-icon",
					handler : this.addImage,
					tooltip : '上传图片',
					hidden : this.noUploadPic,
					scope : this
				});
		this.tb.insertButton(17, {
					iconCls : "page_img",
					handler : this.previewImage,
					//handler:this.insertBackGrounpPic,
					tooltip : '插入网络背景图片',
					hidden : this.backGrounpPic,
					scope : this
				});
		this.tb.insertButton(18, {
					iconCls : "upload-icon-del",
					handler : this.clearPic,
					tooltip : '清除背景图片',
					hidden : this.backGrounpPic,
					scope : this
				});
	},
	initEditor : function() {
		//Destroying the component during/before initEditor can cause issues.
		try {
			var dbody = this.getEditorBody(),
			// ss = this.el.getStyles('font-size', 'font-family', 'background-image', 'background-repeat', 'background-color', 'color'),
			ss = this.el.getStyles('font-size', 'font-family',
					'background-color', 'color'), doc, fn;

			ss['background-attachment'] = 'fixed'; // w3c
			dbody.bgProperties = 'fixed'; // ie

			Ext.DomHelper.applyStyles(dbody, ss);

			doc = this.getDoc();

			if (doc) {
				try {
					Ext.EventManager.removeAll(doc);
				} catch (e) {
				}
			}

			/*
			 * We need to use createDelegate here, because when using buffer, the delayed task is added
			 * as a property to the function. When the listener is removed, the task is deleted from the function.
			 * Since onEditorEvent is shared on the prototype, if we have multiple html editors, the first time one of the editors
			 * is destroyed, it causes the fn to be deleted from the prototype, which causes errors. Essentially, we're just anonymizing the function.
			 */
			fn = this.onEditorEvent.createDelegate(this);
			Ext.EventManager.on(doc, {
						mousedown : fn,
						dblclick : fn,
						click : fn,
						keyup : fn,
						buffer : 100
					});

			if (Ext.isGecko) {
				Ext.EventManager.on(doc, 'keypress', this.applyCommand, this);
			}
			if (Ext.isIE || Ext.isWebKit || Ext.isOpera) {
				Ext.EventManager.on(doc, 'keydown', this.fixKeys, this);
			}
			doc.editorInitialized = true;
			this.initialized = true;
			this.pushValue();
			this.setReadOnly(this.readOnly);
			this.fireEvent('initialize', this);
		} catch (e) {
		}
	}
});

Ext.reg('starHtmleditor', QH.ux.form.HTMLEditor);