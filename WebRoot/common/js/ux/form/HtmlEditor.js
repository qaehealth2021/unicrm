$importCss('common/ext/resources/css/file-upload.css')
$import('common/ext/ux/FileUploadField.js')
$import('common/js/uploadpanel.js')

/**
 * 扩展上传图片的功能
 * @class QH.ux.form.HtmlEditor
 * @extends Ext.form.HtmlEditor
 */
QH.ux.form.HtmlEditor = Ext.extend(Ext.form.HtmlEditor, {
	/**
	 * @cfg {Array} historyCodes 历史输入的代码
	 */
	historyCodes : [],
	historyCursor : [],
	historyIndex : -1, // 历史索引，用来后退前进
	maxHIndex : -1, // 历史最后输入保存的索引
	defaultFont : 'arial',
	defaultFontSize : 12,
	enableSourceEdit : false,
	defaultBackgroundRepeat : 'no-repeat',
	fontSizeFamilies : [['1', 8], ['2', 10], ['3', 12], ['4', 14], ['5', 16],
			['6', 24], ['7', 36]],
	backGroundRepeatFamilies : [['repeat repeat', '横纵平铺'],
			['no-repeat no-repeat', '不平铺'], ['repeat no-repeat', '横向平铺'],
			['no-repeat repeat', '纵向平铺']],
	fontFamilies : ['Arial', '微软雅黑', '华文彩云', '幼圆', '华文琥珀', '楷体_GB2312', '新宋体',
			'仿宋_GB2312', '宋体', '华文新魏', '黑体', '华文行楷', '隶书', 'Arial Black',
			'Book Antiqua', 'Calibri', 'Candara', 'Cambria', 'Century',
			'Century Gothic', 'Comic Sans MS', 'Consolas', 'Constantia',
			'Courier New', 'Franklin Gothic Medium', 'Garamond', 'Georgia',
			'Impact', 'Lucida Console', 'Microsoft Sans Serif', 'Segoe Print',
			'Segoe Script', 'Segoe UI', 'Tahoma', 'Times New Roman',
			'Trebuchet MS', 'Verdana'],
	uploadBackPicUrl : './servlet/UploadServlet', // 上传背景图片地址
	uploadBackPicParams : {}, // 上传背景图片参数 
	/**
	 * @cfg {Object} picUploadCfg
	 * 上传图片SWF配置
	 */
	/**
	 * 
	 * @type String
	 */
	enableUploadPic : true,// 默认可以上传图片
	enableBackgroundImage : true,// 默认不可以插入背景图片和清楚背景
	// 默认字体都转成小写
	initComponent : function() {
		this.defaultFont = this.defaultFont.toLowerCase();
		this.task = new Ext.util.DelayedTask();
		QH.ux.form.HtmlEditor.superclass.initComponent.call(this);
		this.on('push', function(editor) { // 主要是给HTML设置值后，更新工具栏状态
					editor.onEditorEvent();
				});

		//		this.on('sync',function(editor,html){
		//			if(!html){
		//				this.applyBodyStyles({
		//					'font-family':this.defaultFont,
		//					'font-size':this.defaultFontSize + 'pt'
		//				});
		////				html = String.format('<font face="{0}" size="{1}"></font>',this.defaultFont,3)
		////				this.setValue(html);
		//			}
		//		});
	},
	initEditor : function() {
		//Destroying the component during/before initEditor can cause issues.
		try {

			this.applyBodyStyles();

			var doc, fn;

			doc = this.getDoc();

			if (doc) {
				try {
					Ext.EventManager.removeAll(doc);
				} catch (e) {
				}
			}

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
			Ext.Error(e)
		}
	},
	// 设置默认字体
	getDocMarkup : function() {
		var h = Ext.fly(this.iframe).getHeight() - this.iframePad * 2;
		return String
				.format(
						'<html><head><style type="text/css">body{border: 0; margin: 0; padding: {0}px; height: {1}px; '
								+ 'font-family:{2}; font-size:{3}pt; '
								+ '}</style></head><body></body></html>',
						this.iframePad, h, this.defaultFont,
						this.defaultFontSize);
	},
	/**
	 * 获得主体内容及主体字体
	 */
	getBodyValueAndFont : function() {
		var bodyValue = QH.ux.form.HtmlEditor.superclass.getValue.call(this);
		return String.format(
				'<span style="font-family:{0}; font-size:{1}pt;">{2}</span>',
				this.defaultFont, this.defaultFontSize, bodyValue);
	},
	/**
	 * 获得HTML代码
	 * @return {}
	 */
	getHTMLValue : function() {
		var doc = this.getDoc();
		var html = doc.documentElement.outerHTML;
		return this.clearBaseURI(html);
	},
	getValue : function() {
		var html = QH.ux.form.HtmlEditor.superclass.getValue.call(this);
		if (html == null)
			return "";
		return this.clearBaseURI(html);
	},
	/**
	 * 去除图片背景带有的基本地址
	 * @param {} html
	 * @return {}
	 */
	clearBaseURI : function(html) {
		var baseURI = parent.document.baseURI;
		eval('var urlReg = new RegExp("<[^>]*' + baseURI + '[^>]*>","gi")'); // 查找标签内含有基本地址的正则
		//prompt('before',html);
		html = html.replace(urlReg, function(sMatch, p1) {
					return sMatch.replace(baseURI, ""); // 除去找到标签的基本地址
				});
		return html;
	},
	setValue : function(v) {
		if (Ext.isEmpty(this.historyCodes)) {
			this.historyCodes = [v];
			this.historyIndex = 0;
		}
		// 获得head,body内容
		var body = v ? v.replace(/\n/g, "") : '';
		var bodyReg = new RegExp('<body[^>]*>(.*)</body>', 'gi');
		//console.log("before:"+body);
		//		if(bodyReg.test(body)){
		//			body = RegExp.$1;
		//			//console.log("after:"+body);
		//			this.getEditorBody().innerHTML = v;
		//			//this.getDoc().documentElement.innerHTML = v;
		//		}
		QH.ux.form.HtmlEditor.superclass.setValue.call(this, body);

		this.addImgMouseWheel.defer(1000, this);

		return this;
	},
	addImgMouseWheel : function() {
		var readOnly = this.readOnly;
		var imgs = this.getDoc().getElementsByTagName('img');
		Ext.each(imgs, function(img) {
					img.onmousewheel = function(event) {
						if (readOnly)
							return false;
						var zoom = parseInt(this.style.zoom, 10) || 100;
						zoom += event.wheelDelta / 12;
						if (zoom > 0)
							this.style.zoom = zoom + '%';
						return false;
					}
				});
	},

	// 点击上传图片按钮
	addImage : function() {
		var editor = this;
		this.focus();

		var uploadCfg = Ext.apply({
					title : '批量上传图片',
					swfUploadCfg : {
						file_upload_limit : 300, // 上传数量
						file_size_limit : 100 * 1024,
						file_types : "*.jpg;*.png;*.bmp;*.gif;",
						post_params : {
							uploadPath : "attach",
							isRName : true,
							doDbOp : false
						}
					}
				}, this.picUploadCfg)

		var win = new QH.ux.win.UploadWindow(uploadCfg);
		win.pnl.on('fileUploadComplete', function(swfUpload, file, result) {
					var readOnly = this.readOnly;
					var img = this.win.document.createElement("img");
					img.onmousewheel = function(event) {
						if (readOnly)
							return false;
						var zoom = parseInt(this.style.zoom, 10) || 100;
						zoom += event.wheelDelta / 12;
						if (zoom > 0)
							this.style.zoom = zoom + '%';
						return false;
					}
					img.src = result.fileName;
					if (Ext.isIE) {
						this.insertAtCursor(img.outerHTML);
					} else {
						var selection = this.win.getSelection();
						if (!selection.isCollapsed) {
							selection.deleteFromDocument();
						}
						selection.getRangeAt(0).insertNode(img);
					}
				}, this)
		win.show();
	},
	selectText : function(start, end) {
		var v = this.getValue();
		var doFocus = false;
		if (v.length > 0) {
			start = start === undefined ? 0 : start;
			end = end === undefined ? v.length : end;
			var d = this.el.dom;
			if (d.setSelectionRange) {
				d.setSelectionRange(start, end);
			} else if (d.createTextRange) {
				var range = d.createTextRange();
				range.moveStart('character', start);
				range.moveEnd('character', end - v.length);
				range.select();
			}
			doFocus = Ext.isGecko || Ext.isOpera;
		} else {
			doFocus = true;
		}
		if (doFocus) {
			this.focus();
		}
	},
	/**
	 * 获得BODY样式
	 * @param {} key 为 backgroundImage格式,不为background-image
	 */
	getBodyStyle : function(key) {
		var dbody = this.getEditorBody();
		var style = dbody.style;
		return style[key];
	},
	/**
	 * 修改BODY样式
	 */
	applyBodyStyles : function(styObj) {
		var dbody = this.getEditorBody();
		//		ss = this.el.getStyles('font-size', 'font-family', 'background-image', 'background-repeat', 'background-color', 'color'),
		var style = dbody.style, ss = {};
		ss['background-attachment'] = 'fixed'; // w3c
		dbody.bgProperties = 'fixed'; // ie

		ss['background-image'] = style.backgroundImage;
		ss['background-repeat'] = style.backgroundRepeat
				|| this.defaultBackgroundRepeat;

		Ext.apply(ss, styObj);

		Ext.DomHelper.applyStyles(dbody, ss);
	},
	focus : function() {
		if (this.win && !this.sourceEditMode) {
			this.win.focus();
		} else {
			this.el.focus();
		}
		this.onEditorEvent();
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
								scope : this,
								handler : function() {
									if (localPicPanel.getForm().isValid()) {
										localPicPanel.getForm().submit({
											url : this.uploadBackPicUrl,
											params : this.uploadBackPicParams,
											waitTitle : '请等待',
											waitMsg : '上传中...',
											success : function(fp, o) {
												var fileName = o.result.fileName;
												editor.applyBodyStyles({
															'background-image' : 'url('
																	+ fileName
																	+ ')'
														});
												imageWin.close();
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
				// layout :'form',
				// baseCls:'x-plain',
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
							editor.applyBodyStyles({
										'background-image' : 'url(' + url + ')'
									});
							imageWin.close();
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

		var imageWin = new QH.Window({
					title : '选择图片',
					height : 450,
					width : 600,
					layout : 'fit',
					items : [tabPanel],
					listeners : {
						'close' : function() {
							editor.focus();
						}
					}
				});
		imageWin.show();
	},
	/**
	 * 使可编辑的div层获得焦点
	 * 如果为页面初使化，会存在setValue('html')，要使用push监听触发后再调用该方法，才可获得焦点
	 * @param {} path Ext.DomQuery.selectNode中的path参数
	 */
	focusByChildElement : function(path) {
		var element = Ext.DomQuery.selectNode(path, this.getEditorBody());
		if (element) {
			this.setReadOnly(true);
			element.contentEditable = true;
			element.focus();
			this.setReadOnly(false);
		}
	},
	clearBodyBackgroundImage : function() {
		// 清除背景
		this.applyBodyStyles({
					'background-image' : ''
				});
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
				if (e.ctrlKey && k == Ext.EventObject.Z) {
					this.task.delay(1, this.saveHistoryCode, this,
							[this.historyIndex - 1])
				} else if (e.ctrlKey && k == Ext.EventObject.Y) {
					this.task.delay(1, this.saveHistoryCode, this,
							[this.historyIndex + 1])
				} else if (k != Ext.EventObject.CTRL) {
					this.task.delay(1000, this.saveHistoryCode, this,
							[this.historyIndex])
				}
			};
		}
	}(),
	saveHistoryCode : function(hIndex) {
		if (hIndex == this.historyIndex) { // 保存输入记录
			this.historyCodes[hIndex + 1] = this.getValue();
			this.maxHIndex = ++this.historyIndex;
		} else if (hIndex != this.historyIndex && hIndex > -1
				&& hIndex <= this.maxHIndex) {
			this.setValue(this.historyCodes[hIndex]);
			this.historyIndex = hIndex;
		}
	},
	createToolbar : function(editor) {
		var items = [];
		var tipsEnabled = Ext.QuickTips && Ext.QuickTips.isEnabled();

		function btn(id, toggle, handler) {
			return {
				itemId : id,
				cls : 'x-btn-icon',
				iconCls : 'x-edit-' + id,
				enableToggle : toggle !== false,
				scope : editor,
				handler : handler || editor.relayBtnCmd,
				clickEvent : 'mousedown',
				tooltip : tipsEnabled
						? editor.buttonTips[id] || undefined
						: undefined,
				overflowText : editor.buttonTips[id].title || undefined,
				tabIndex : -1
			};
		}

		if (this.enableFont && !Ext.isSafari2) {
			var fontSelectItem = new Ext.Toolbar.Item({
						autoEl : {
							tag : 'select',
							cls : 'x-font-select',
							html : this.createFontOptions()
						}
					});
			items.push(fontSelectItem);
		}

		if (this.enableFontSize) {
			var fontSizeSelectItem = new Ext.Toolbar.Item({
						autoEl : {
							tag : 'select',
							cls : 'x-font-select',
							html : this.createFontSizeOptions()
						}
					});
			items.push(fontSizeSelectItem);
		}
		if (this.enableFont && !Ext.isSafari2 || this.enableFontSize) {
			items.push('-');
		}

		if (this.enableFormat) {
			items.push(btn('bold'), btn('italic'), btn('underline'));
		}

		if (this.enableColors) {
			items.push('-', {
						itemId : 'forecolor',
						cls : 'x-btn-icon',
						iconCls : 'x-edit-forecolor',
						clickEvent : 'mousedown',
						tooltip : tipsEnabled ? editor.buttonTips.forecolor
								|| undefined : undefined,
						tabIndex : -1,
						menu : new Ext.menu.ColorMenu({
									allowReselect : true,
									focus : Ext.emptyFn,
									value : '000000',
									plain : true,
									listeners : {
										scope : this,
										select : function(cp, color) {
											this.execCmd('forecolor',
													Ext.isWebKit || Ext.isIE
															? '#' + color
															: color);
											this.deferFocus();
										}
									},
									clickEvent : 'mousedown'
								})
					}, {
						itemId : 'backcolor',
						cls : 'x-btn-icon',
						iconCls : 'x-edit-backcolor',
						clickEvent : 'mousedown',
						tooltip : tipsEnabled ? editor.buttonTips.backcolor
								|| undefined : undefined,
						tabIndex : -1,
						menu : new Ext.menu.ColorMenu({
									focus : Ext.emptyFn,
									value : 'FFFFFF',
									plain : true,
									allowReselect : true,
									listeners : {
										scope : this,
										select : function(cp, color) {
											if (Ext.isGecko) {
												this.execCmd('useCSS', false);
												this.execCmd('hilitecolor',
														color);
												this.execCmd('useCSS', true);
												this.deferFocus();
											} else {
												this.execCmd(Ext.isOpera
																? 'hilitecolor'
																: 'backcolor',
														Ext.isWebKit
																|| Ext.isIE
																? '#' + color
																: color);
												this.deferFocus();
											}
										}
									},
									clickEvent : 'mousedown'
								})
					});
		}

		if (this.enableAlignments) {
			items.push('-', btn('justifyleft'), btn('justifycenter'),
					btn('justifyright'));
		}

		if (!Ext.isSafari2) {
			if (this.enableLinks) {
				items.push('-', btn('createlink', false, this.createLink));
			}
			if (this.enableUploadPic) {
				items.push('-', {
							itemId : 'uploadimg',
							cls : 'x-btn-icon',
							iconCls : "gird_upload",
							clickEvent : 'mousedown',
							tooltip : '上传图片',
							overflowText : '上传图片',
							handler : this.addImage,
							scope : this
						});
			}
			if (this.enableBackgroundImage) {
				items.push('-', {
							iconCls : "page_img",
							clickEvent : 'mousedown',
							tooltip : '插入网络或本地背景图片',
							overflowText : '插入背景图片',
							handler : this.previewImage,
							scope : this
						}, {
							cls : 'x-btn-icon',
							iconCls : "upload-icon-del",
							clickEvent : 'mousedown',
							tooltip : '清除背景图片',
							overflowText : '清除背景',
							handler : this.clearBodyBackgroundImage,
							scope : this
						});
				var backgroundRepeatSelectItem = new Ext.Toolbar.Item({
							autoEl : {
								tag : 'select',
								cls : 'x-font-select',
								tooltip : '背景图像如何铺排',
								overflowText : '背景铺排',
								html : this.createBackgroundRepeatOptions()
							}
						});
				items.push(backgroundRepeatSelectItem);

			}
			if (this.enableLists) {
				items.push('-', btn('insertorderedlist'),
						btn('insertunorderedlist'));
			}
			if (this.enableSourceEdit) {
				items.push('-', btn('sourceedit', true, function(btn) {
									this.toggleSourceEdit(!this.sourceEditMode);
								}));
			}
		}

		//        items.push({// 测试用
		//            cls : 'x-btn-icon',
		//            scope: editor,
		//            itemId:'test',
		//            handler:function(){
		//            	var doc = this.getDoc();
		//				doc.designMode = doc.designMode == "on" ? "off":"on";
		//            	selectionStart(doc," ");
		//            	alert(val)
		//            	function selectionStart(element,nbsp){
		//            		if(!element.nodeName)
		//            			return ;
		//        			val += nbsp + element.nodeName;
		//            		if(element.selectionStart !== undefined){
		//            			val += " yes ";
		//            		}
		//            		val += "\n";
		//            		if(element.childNodes){
		//            			for(var p in element.childNodes){
		//            				selectionStart(element.childNodes[p],nbsp+" ");
		//            			}
		//            		}
		//            	}
		//            },
		//            clickEvent:'mousedown'
		//        });

		// build the toolbar
		var tb = new Ext.Toolbar({
					enableOverflow : true,
					renderTo : this.wrap.dom.firstChild,
					items : items
				});

		if (fontSelectItem) {
			this.fontSelect = fontSelectItem.el;

			this.mon(this.fontSelect, 'change', function() {
						var font = this.fontSelect.dom.value;
						this.relayCmd('fontname', font);
						this.deferFocus();
					}, this);
		}

		if (fontSizeSelectItem) {
			this.fontSizeSelect = fontSizeSelectItem.el;

			this.mon(this.fontSizeSelect, 'change', function() {
						var fontSize = this.fontSizeSelect.dom.value;
						this.relayCmd('fontsize', fontSize);
						this.deferFocus();
					}, this);
		}

		if (backgroundRepeatSelectItem) {
			this.backgroundRepeatSelect = backgroundRepeatSelectItem.el;

			this.mon(this.backgroundRepeatSelect, 'change', function() {
						var repeat = this.backgroundRepeatSelect.dom.value;
						this.applyBodyStyles({
									'background-repeat' : repeat
								});
						this.deferFocus();
					}, this);
		}

		// stop form submits
		this.mon(tb.el, 'click', function(e) {
					e.preventDefault();
				});

		this.tb = tb;
		this.tb.doLayout();
	},
	disableItems : function(disabled) {
		if (this.fontSelect) {
			this.fontSelect.dom.disabled = disabled;
		}
		if (this.fontSizeSelect) {
			this.fontSizeSelect.dom.disabled = disabled;
		}
		if (this.backgroundRepeatSelect) {
			this.backgroundRepeatSelect.dom.disabled = disabled;
		}
		this.tb.items.each(function(item) {
			if (item.getItemId() != 'sourceedit' && item.getItemId() != 'test') {
				item.setDisabled(disabled);
			}
		});
	},
	createFontSizeOptions : function() {
		var buf = [], fs = this.fontSizeFamilies, ff, lc;
		for (var i = 0, len = fs.length; i < len; i++) {
			ff = fs[i][1];
			lc = fs[i][0];
			buf.push('<option value="', lc, '" style="font-family:', ff, ';"',
					(this.defaultFontSize == ff ? ' selected="true">' : '>'),
					ff, '</option>');
		}
		return buf.join('');
	},
	createBackgroundRepeatOptions : function() {
		var buf = [], fs = this.backGroundRepeatFamilies, ff, lc;
		for (var i = 0, len = fs.length; i < len; i++) {
			ff = fs[i][1];
			lc = fs[i][0];
			buf.push('<option value="', lc, '" style="font-family:', ff, ';"',
					(this.defaultBackgroundRepeat == lc
							? ' selected="true">'
							: '>'), ff, '</option>');
		}
		return buf.join('');
	},
	updateToolbar : function() {

		if (this.readOnly) {
			return;
		}

		if (!this.activated) {
			this.onFirstFocus();
			return;
		}

		var btns = this.tb.items.map, doc = this.getDoc();
		if (this.enableFont && !Ext.isSafari2) {
			var name = (doc.queryCommandValue('FontName') || this.defaultFont)
					.toLowerCase();
			if (name && name.indexOf("'") != -1) {
				while (name.indexOf("'") != -1) {
					name = name.replace("'", "");
				}
			}
			if (name != this.fontSelect.dom.value) {
				this.fontSelect.dom.value = name;
			}
		}
		if (this.enableFontSize) {
			var fontSize = parseInt(doc.queryCommandValue('FontSize')
							|| this.defaultFontSize, 10);
			if (fontSize != this.fontSizeSelect.dom.value) {
				this.fontSizeSelect.dom.value = fontSize;
			}
		}
		if (this.enableFormat) {
			btns.bold.toggle(doc.queryCommandState('bold'));
			btns.italic.toggle(doc.queryCommandState('italic'));
			btns.underline.toggle(doc.queryCommandState('underline'));
		}
		if (this.enableAlignments) {
			btns.justifyleft.toggle(doc.queryCommandState('justifyleft'));
			btns.justifycenter.toggle(doc.queryCommandState('justifycenter'));
			btns.justifyright.toggle(doc.queryCommandState('justifyright'));
		}
		if (this.enableBackgroundImage) {
			var repeat = this.getBodyStyle('backgroundRepeat')
					|| this.defaultBackgroundRepeat;
			if (repeat != this.backgroundRepeatSelect.dom.value) {
				this.backgroundRepeatSelect.dom.value = repeat;
			}
		}
		if (!Ext.isSafari2 && this.enableLists) {
			btns.insertorderedlist.toggle(doc
					.queryCommandState('insertorderedlist'));
			btns.insertunorderedlist.toggle(doc
					.queryCommandState('insertunorderedlist'));
		}

		Ext.menu.MenuMgr.hideAll();

		this.syncValue();
	}
});

Ext.reg('qhhtmleditor', QH.ux.form.HtmlEditor);