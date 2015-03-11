/**
 * 默认增加分页工具条，数据加载出现遮罩层/增加表格操作列
 * 
 * @class QH.grid.GridPanel
 * @extends Ext.grid.GridPanel
 */
QH.grid.GridPanel = Ext.extend(Ext.grid.GridPanel, {
	loadMask : true,
	stripeRows : true,
	/**
	 * 默认不显示操作列
	 * 
	 * @type Boolean
	 */
	showOpColumn : false,
	/**
	 * 如果有操作列,默认不隐藏删除按钮
	 * 
	 * @type Boolean
	 */
	hiddenDelColumn : false,
	/**
	 * 如果有操作列,默认不隐藏修改按钮
	 * 
	 * @type Boolean
	 */
	hiddenModColumn : false,
	/**
	 * 如果有操作列,默认不隐藏下载按钮
	 * 
	 * @type Boolean
	 */
	hiddenDownColumn : false,
	initComponent : function() {
		var grid = this;

		/**
		 * @event delonerecord 当点击表格操作列里面的"删除"图标时,触发该事件
		 * @param {Record}
		 *            record
		 */
		this.addEvents('delonerecord');
		/**
		 * @event modonerecord 当点击表格操作列里面的"修改"图标时,触发该事件
		 * @param {Record}
		 *            record
		 */
		this.addEvents('modonerecord');
		/**
		 * @event downonerecord 当点击表格操作列里面的"下载"图标时,触发该事件
		 * @param {Record}
		 *            record
		 */
		this.addEvents('downonerecord');

		if (!this.bbar) {
			var bbar = {
				xtype : 'paging',
				pageSize : QH_PAGE_LIMIT,
				store : this.store,
				displaySize : QH_PAGE_DISPLAY_SIZE,
				displayInfo : true,
				listeners : {
					beforechange : {
						fn : function(pTbar, params) {
							if (this.store.getModifiedRecords().length > 0) {
								Ext.Msg.show({
											title : '系统提示',
											msg : '修改的数据未保存',
											icon : Ext.Msg.WARNING,
											buttons : Ext.Msg.OK
										});
								return false;
							}
							this.store.setBaseParam(QH_PAGE_START_NAME,
									params[QH_PAGE_START_NAME]);
							this.store.setBaseParam(QH_PAGE_LIMIT_NAME,
									params[QH_PAGE_LIMIT_NAME]);
						},
						scope : this
					}
				}
			}
			Ext.apply(bbar, this.bbarCfg);
			Ext.applyIf(this, {
						bbar : bbar
					});
		}
		// 创建css
		if (grid.showOpColumn)
			Ext.DomHelper.append(document.body, {
						html : '<style type="text/css">.' + grid.getId()
								+ 'controlBtn img {cursor: pointer;}</style>'
					}, true);
		QH.grid.GridPanel.superclass.initComponent.call(this);
		/**
		 * 当点击操作列中的按钮时
		 */
		grid.on('cellclick', function(grid, rowIndex, colIndex, e) {
					var btn = e.getTarget('.' + grid.getId() + 'controlBtn');
					if (btn) {
						var t = e.getTarget();
						var record = this.getStore().getAt(rowIndex);
						// 截取样式后面3位关键字判断点击的是哪个按钮
						var control = t.className.substring(t.className.length
								- 3);
						switch (control) {
							case 'del' :
								if (grid.fireEvent('delonerecord', record) !== false) {
									grid.getTopToolbar().delData();
								}
								break;
							case 'mod' :
								if (grid.fireEvent('modonerecord', record) !== false) {
									grid.fireEvent('rowdblclick', grid,
											rowIndex, e);
								}
								break;
							case 'dow' :
								if (grid.fireEvent('downonerecord', record) !== false) {
									grid.downOneRecord(record);
								}
								break;
							case 'ots' :
								alert('其他按钮待定义')
								break;
						}
					}
				}, this);
	},
	/**
	 * 表格的操作列
	 * 
	 * @param {}
	 *            value
	 * @param {}
	 *            metaData
	 * @param {}
	 *            record
	 * @param {}
	 *            rowIndex
	 * @param {}
	 *            colIndex
	 * @param {}
	 *            store
	 * @return {}
	 */
	opRenderer : function(value, metaData, record, rowIndex, colIndex, store) {
		var grid = this;
		var str = '<div class="' + grid.getId() + 'controlBtn"> ';
		if (!grid.hiddenModColumn) {
			var modImg = '<img style="cursor:hand;" title="修改" src="./common/ext/resources/images/extend/page_edit.png"'
					+ 'width="16" height="16"'
					+ 'class="'
					+ grid.getId()
					+ 'control_mod">';
			str += modImg + "&nbsp;";
		}
		if (!grid.hiddenDelColumn) {
			var delImg = '<img style="cursor:hand;" title="删除" src="./common/ext/resources/images/extend/delete.png"'
					+ 'width="16" height="16"'
					+ 'class="'
					+ grid.getId()
					+ 'control_del">';
			str += delImg + "&nbsp;";
		}
		if (!grid.hiddenDownColumn) {
			var delImg = '<img style="cursor:hand;" title="下载" src="./common/ext/resources/images/extend/arrow_down.png"'
					+ 'width="16" height="16"'
					+ 'class="'
					+ grid.getId()
					+ 'control_dow">';
			str += delImg + "&nbsp;";
		}
		str = str.substring(0, str.length - 6);
		str += '</div>';
		return str;
	}
});
Ext.reg('qhgrid', QH.grid.GridPanel);
/**
 * 默认增加分页工具条，数据加载出现遮罩层
 * 
 * @class QH.grid.EditorGridPanel
 * @extends Ext.grid.EditorGridPanel
 */
QH.grid.EditorGridPanel = Ext.extend(Ext.grid.EditorGridPanel, {
	loadMask : true,
	initComponent : function() {
		Ext.applyIf(this, {
					bbar : {
						xtype : 'paging',
						pageSize : QH_PAGE_LIMIT,
						store : this.store,
						displaySize : QH_PAGE_DISPLAY_SIZE,
						displayInfo : true,
						listeners : {
							beforechange : {
								fn : function(pTbar, params) {
									if (this.store.getModifiedRecords().length > 0) {
										Ext.Msg.show({
													title : '系统提示',
													msg : '修改的数据未保存',
													icon : Ext.Msg.WARNING,
													buttons : Ext.Msg.OK
												});
										return false;
									}
									this.store.setBaseParam('limit',
											params.limit);
								},
								scope : this
							}
						}
					}
				});
		QH.grid.EditorGridPanel.superclass.initComponent.call(this);
	}
});
Ext.reg('editorqhgrid', QH.grid.EditorGridPanel);
/**
 * 
 * @class QH.data.Store
 * @extends Ext.data.Store
 */
QH.data.Store = Ext.extend(Ext.data.Store, {
			root : 'data',
			totalProperty : 'totalCount',
			idProperty : 'id',
			pruneModifiedRecords : true,
			autoLoad : true,
			autoSave : false,
			/**
			 * action里面的属性对象名
			 * 
			 * @type String
			 */
			actionParam : '',
			constructor : function(config) {
				Ext.apply(this, config, {
							reader : new Ext.data.JsonReader({
										root : this.root,
										totalProperty : this.totalProperty,
										idProperty : this.id
									}, Ext.data.Record.create(this.record
											|| config.record)),
							writer : new Ext.data.JsonWriter({
										encode : true,
										writeAllFields : true
									})
						});
				QH.data.Store.superclass.constructor.call(this);
				this.setBaseParam(QH_PAGE_START_NAME, QH_PAGE_START);
				this.setBaseParam(QH_PAGE_LIMIT_NAME, QH_PAGE_LIMIT);
			},
			clearActionParamInBaseParam : function() {
				var newParams = {};
				for (var p in this.baseParams) {
					var i = p.indexOf(this.actionParam);
					if (i != -1) {
						var t = p.substring(i + this.actionParam.length + 1)
						newParams[t] = this.baseParams[p];
					}
				}
				return newParams;
			}
		});
QH.data.GroupingStore = Ext.extend(Ext.data.GroupingStore, {
			root : 'data',
			totalProperty : 'totalCount',
			idProperty : 'id',
			pruneModifiedRecords : true,
			autoLoad : true,
			autoSave : false,
			constructor : function(config) {
				Ext.apply(this, config, {
							reader : new Ext.data.JsonReader({
										root : this.root,
										totalProperty : this.totalProperty,
										idProperty : this.id
									}, Ext.data.Record.create(this.record
											|| config.record)),
							writer : new Ext.data.JsonWriter({
										encode : true,
										writeAllFields : true
									})
						});
				QH.data.GroupingStore.superclass.constructor.call(this);
				this.setBaseParam(QH_PAGE_START_NAME, QH_PAGE_START);
				this.setBaseParam(QH_PAGE_LIMIT_NAME, QH_PAGE_LIMIT);
			}
		});

QH.form.FormPanel = Ext.extend(Ext.form.FormPanel, {
	/**
	 * @cfg {DwrMethod} saveMethod DWR保存方法，只有一个保存数据的参数
	 * @param {Array}
	 * @type String
	 */
	/**
	 * @cfg {String} objName (必须) 要操作的domain名,或数组对象
	 */
	/**
	 * @cfg {String} systemCfgType 如果存在该值则在新增时，读取系统默认配置类型
	 */
	/**
	 * @cfg {Boolean} isSystemCfg 如果true，标识是系统默认配置的表单
	 */
	/**
	 * @cfg {Boolean} initSystemCfg 需要初始化的默认配置
	 */
	/**
	 * initObj：缓存初始化的时候，系统从数据库中获取的对象
	 * 
	 * @type Object
	 */
	gridId : '',
	modId : '',
	frame : true,
	labelWidth : 60,
	labelAlign : "right",
	autoScroll : true,
	border : false,
	buttonAlign : 'center',
	/**
	 * @cfg {String} dateFormat 传到后台时，对时间进行转换格式，如果为空或false则不转换，默认为false
	 */
	dateFormat : false,
	/**
	 * 是否保存后关闭窗体
	 * 
	 * @type Boolean
	 */
	isSaveClose : false,
	/**
	 * 是否隐藏取消按钮
	 * 
	 * @type Boolean
	 */
	hiddenCancelBtn : true,
	/**
	 * 是否增加fbar
	 * 
	 * @type Boolean
	 */
	isAddFbar : true,
	saveObjIsArray : true,
	/**
	 * 更新表单时是否先查询出旧Bean,再把新数据填充进去
	 * 
	 * @type Boolean
	 */
	findBeanBeforeUpdate : false,
	/**
	 * @cfg {String} fbarOtherItem 当不存在fbar 默认保存取消按钮，再加额外按钮
	 */
	fbarOtherItem : [],
	/**
	 * 表单中是日期类型的数据集合，用于做日期格式化之用 ["orderDate","priceDate"]
	 * 
	 * @type array
	 */
	dateFormatItems : [],
	/**
	 * 是否根据组件id加载表单
	 * 
	 * @type Boolean
	 */
	isLoadById : true,
	/**
	 * 是否隐藏重置按钮
	 * 
	 * @type Boolean
	 */
	hiddenResetBtn : true,
	initComponent : function() {
		var formPanel = this;
		if (this.isAddFbar && !this.fbar) {
			var fbarItems = [{
						text : "保存",
						scale:'large',
						handler : this.saveData.createDelegate(this),
						iconCls : "page_table_save",
						cls : formPanel.modId ? 'SYSOP_MOD' : 'SYSOP_ADD'
					}, {
						text : "取消",
						hidden : this.hiddenCancelBtn,
						handler : this.cancleEditor.createDelegate(this),
						iconCls : "page_cancel"
					}, {
						text : "重置",
						iconCls : "page_reset",
						hidden : this.hiddenResetBtn,
						handler : function() {
							clearFormAndSet(formPanel);
						}
					}];
			fbarItems = fbarItems.concat(this.fbarOtherItem);
			this.fbar = fbarItems;
		}

		QH.form.FormPanel.superclass.initComponent.call(this);
		// 给不能为空的fieldLabel的颜色改成统一的颜色
		function eachItem(item, index, length) {
			if (item.allowBlank === false && !item.noBlankColor) {
				item.fieldLabel = "<font color=" + NOT_NULL_COLOR + ">"
						+ item.fieldLabel + "</font>";
			}
			if (item.items && item.items.getCount && item.items.getCount() > 0) {
				item.items.each(eachItem, this);
			}
		}
		formPanel.getForm().items.each(eachItem, this);
		this.addEvents(
				/**
				 * 加载数据前
				 * 
				 * @event beforeloaddata
				 * @param {Ext.form.FormPanel}
				 *            this
				 */
				'beforeloaddata',
				/**
				 * 加载数据后
				 * 
				 * @event afterloaddata
				 * @param {Ext.form.FormPanel}
				 *            this
				 * @param {Object}
				 *            obj
				 */
				'afterloaddata',
				/**
				 * 保存表单前
				 * 
				 * @event beforesavedata
				 * @param {Ext.form.FormPanel}
				 *            this
				 * @param {Object}
				 *            obj
				 */
				'beforesavedata',
				/**
				 * 保存表单后
				 * 
				 * @event afterloaddata
				 * @param {Ext.form.FormPanel}
				 *            this
				 * @param {int}
				 *            保存成功后返回的结果
				 * @param {Object}
				 *            obj
				 */
				'aftersavedata');
	},
	render : function(container, position) {
		var formPanel = this;
		QH.form.FormPanel.superclass.render.call(this, container, position);
		// 碰到在"业务配置"模块加载数据比渲染还快,所以延时一下
		var task = new Ext.util.DelayedTask(function() {
					formPanel.loadValue();
				});
		task.delay(500);
	},
	/**
	 * 修改的时候，把初始化的对象缓存起来，是一个数据库返回的对象
	 */
	getInitObj : function() {
		if (modId != '') {
			return this.initObj;
		} else
			return null;
	},
	/**
	 * 给表单中的日期/图片/下拉框赋值
	 * 
	 * @param {}
	 *            obj
	 */
	loadSpForm : function(obj) {
		var formPanel = this;
		// 给日期赋值
		if (formPanel.dateFormatItems && formPanel.dateFormatItems.length > 0) {
			for (var i = 0; i < formPanel.dateFormatItems.length; i++) {
				var timeName = formPanel.dateFormatItems[i];
				try {
					if (obj[timeName]) {
						var time = Ext.getCmp(timeName);
						// 如果没有设置id,需要设置ref属性,并且指向formPanel这层
						if (!time)
							time = formPanel[timeName];
						time.setValue(obj[timeName]);
					}
				} catch (err) {
				}
			}
		}
		// 给图片赋值
		var imagetoolbars = formPanel.findByType("imagetoolbar");
		for (var i = 0; i < imagetoolbars.length; i++) {
			var image = imagetoolbars[i];
			try {
				if (obj[image.field]) {
					var path = './servlet/ShowPicServlet?picPath='
							+ obj[image.field] + '&tmp=' + Math.random()
					image.setImageSrc(path);
					// Ext.getCmp(image.field).setValue(obj[image.field]);
					formPanel.getForm().findField(image.field)
							.setValue(obj[image.field]);
				} else {
					image.setImageSrc("common/images/zwtp.png");
				}
			} catch (err) {
			}
		}
		// 给下拉框赋值
		var combos = formPanel.findByType("basecombo");
		var commomCombos = formPanel.findByType('combo');
		combos = combos.concat(commomCombos);
		for (var i = 0; i < combos.length; i++) {
			var combo = combos[i];
			// 如果combo.hiddenName=customerId.id,如果obj.customerId=null,则会报id
			// of'null'
			try {
				// 在系统默认配置数据库是直接存key"boxIbTypeId.id",需要obj[combo.hiddenName]才能取到值
				var val = obj[combo.hiddenName]
						|| eval("obj." + combo.hiddenName);
				if (val) {
					if (combo.xtype != 'combo') {
						combo.bindValue(val);
					} else {
						combo.setValue(val);
					}
				}
			} catch (err) {
			}
		}
	},
	loadValue : function(modId) {
		var formPanel = this;
		if (formPanel.fireEvent('beforeloaddata', formPanel) !== false) {
			var modId = modId || this.modId;
			var initSystemCfg = null;
			// 对于不是属于默认配置模块的表单,加载他的默认配置的表单值
			if (!formPanel.isSystemCfg && formPanel.systemCfgType) {
				DWREngine.setAsync(false);
				cotSystemCfgService.getCotSystemCfgByType(
						formPanel.systemCfgType, COOKIE_IDENTITY, function(
								systemCfg) {
							if (systemCfg != null) {
								initSystemCfg = Ext.decode(systemCfg.cfgJson);
								formPanel.initSystemCfg = initSystemCfg;
							}
						});
				DWREngine.setAsync(true);
			}

			// 给表单赋初始值
			if (!modId) {
				if (initSystemCfg) {
					formPanel.getForm().setValues(initSystemCfg);
					formPanel.loadSpForm(initSystemCfg);
					formPanel.fireEvent('afterloaddata', formPanel,
							initSystemCfg);
				}
				return;
			}
			this.modId = modId;
			var obj;

			if (!formPanel.isSystemCfg) {
				baseSerivce.getObjByIntegerId(modId, formPanel.objName,
						function(res) {
							obj = res;
							formPanel.initObj = obj;
							if (formPanel.isLoadById)
								DWRUtil.setValues(res);
							formPanel.getForm().setValues(obj);
							formPanel.loadSpForm(obj);
							formPanel
									.fireEvent('afterloaddata', formPanel, obj);
						});
			} else {
				obj = Ext.decode(formPanel.cfgJson);
				formPanel.getForm().setValues(obj);
				formPanel.loadSpForm(obj);
				formPanel.fireEvent('afterloaddata', formPanel, obj);
			}
		}
	},
	loadValueByGridRec : function(record) {
		if (record) {
			var formPanel = this;
			if (formPanel.fireEvent('beforeloaddata', formPanel) !== false) {
				formPanel.getForm().setValues(record);
				var imagetoolbars = formPanel.findByType("imagetoolbar");
				for (var i = 0; i < imagetoolbars.length; i++) {
					var image = imagetoolbars[i];
					if (image.queryId != null) {
						var path = './servlet/ShowPicServlet?id='
								+ image.queryId + '&tbName=' + image.tbName
								+ '&field=' + image.field + '&tmp='
								+ Math.random()
						image.setImageSrc(path);
						Ext.getCmp(image.field).setValue(record[image.field]);
					}
				}
				formPanel.fireEvent('afterloaddata', formPanel, record);
			}
		}
	},
	/**
	 * 表单取值,并组建成domain对象
	 * 
	 * @return {}
	 */
	getBeanValue : function() {
		eval('var obj = new ' + this.objName + '();');
		var data;
		if (this.isLoadById)
			data = DWRUtil.getValues(obj);
		else
			data = getFormValues(this);
		if (this.modId) {
			if (this.findBeanBeforeUpdate) {
				DWREngine.setAsync(false);
				baseSerivce.getObjByIntegerId(this.modId, this.objName,
						function(oldBean) {
							obj = oldBean;
						});
				DWREngine.setAsync(true);
			}
			obj.id = this.modId;
		}
		Ext.apply(obj, data);

		// 如果为空，就设置为null，防止外键属性报外键约束
		for (var p in obj) {
			obj[p] = obj[p] || null;
			if (this.dateFormatItems.indexOf(p) > -1) {
				// 格式化日期
				if (obj[p] != null) {
					if (this.dateFormat) {
						obj[p] = window.getDateTypeExt(obj[p], this.dateFormat);
					} else {
						obj[p] = window.getSimpleDateTypeExt(obj[p]);
					}
				}
			} else if (Ext.isObject(obj[p])) {
				// 如果是Hibernate配置的ManyToOne类型，如果ID为空，则无法保存到数据库，需要将该对象置为Null
				// 如果没有ID或者ID为空字符串，说明该ManyToOne对象没有复制，不用更新
				if (!Ext.isDefined(obj[p].id) || Ext.isEmpty(obj[p].id)) {
					obj[p] = null;
				}
			}
		}
		return obj;
	},
	/**
	 * 保存数据
	 */
	saveData : function() {
		var formPanel = this;
		var form = this.getForm();
		if (!form.isValid()) {
			return;
		}
		var saveMethod = this.saveMethod || baseSerivce.saveOrUpdateObjRId;
		var obj;
		if (formPanel.isSystemCfg) {
			// 系统默认配置的表单保存时取值不同
			eval('obj = new ' + this.objName + '();');
			obj.cfgJson = Ext.encode(form.getValues());
			obj.cfgModule = formPanel.cfgModule;
			if (this.modId)
				obj.id = this.modId;
		} else
			obj = this.getBeanValue();

		if (formPanel.fireEvent('beforesavedata', formPanel, obj) !== false) {
			QH_LOADMASK = new Ext.LoadMask(this.getEl(), {
						msg : '数据保存中'
					});
			QH_LOADMASK.show();
			var saveObj = this.saveObjIsArray ? [obj] : obj;
			saveMethod(saveObj, function(res) {
						if (formPanel.fireEvent('aftersavedata', formPanel, res,
								obj)!== false) {
							if (!formPanel.isSaveClose) {
								if (formPanel.gridId)
									reflashParent(formPanel.gridId);
								formPanel.modId = res;
								QH_LOADMASK.hide();
								mask("保存成功!");
								var task = new Ext.util.DelayedTask(function() {
											unmask();
										});
								task.delay(600);
							} else {
								QH_LOADMASK.hide();
								closeandreflashEC(true, formPanel.gridId, false);
							}
						}
					});
		}

	},
	/**
	 * 取消编辑
	 */
	cancleEditor : function() {
		closeandreflashEC(true, this.gridId, false);
	}
});

Ext.reg('qhform', QH.form.FormPanel);

/**
 * 树分页
 * 
 * @class QH.tree.TreePanel
 * @extends Ext.tree.TreePanel
 */
QH.tree.TreePanel = Ext.extend(Ext.tree.TreePanel, {
			loadMask : true,
			isPage : false,
			initComponent : function() {
				if (this.isPage) {
					var bbar = {
						xtype : 'paging',
						pageSize : QH_PAGE_LIMIT,
						store : this.store,
						displaySize : QH_PAGE_DISPLAY_SIZE,
						displayInfo : true,
						listeners : {
							beforechange : {
								fn : function(pTbar, params) {
									this.store.setBaseParam('limit',
											params.limit);
								},
								scope : this
							}
						}
					}
					Ext.apply(bbar, this.bbarCfg);
					Ext.applyIf(this, {
								bbar : bbar
							});
				}
				QH.tree.TreePanel.superclass.initComponent.call(this);
			}
		});
Ext.reg('qhtree', QH.tree.TreePanel);

QH.TabPanel = Ext.extend(Ext.TabPanel, {

});
Ext.reg('qhtabpanel', QH.TabPanel);

QH.Window = Ext.extend(Ext.Window, {
			plain : true,
			constrainHeader : true,
			resizable : false,
			modal : true
		});
Ext.reg('qhwindow', QH.Window);
