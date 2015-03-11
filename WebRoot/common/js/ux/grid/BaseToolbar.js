/**
 * 可进行增，删，改 操作
 * 按钮Item属性配置说明：
 * isQueryItem : 是否是查询项，true则加入到查询控制
 * noShow：true为不受查询模式显示隐藏控制属性
 * isRightMenuItem ： 是否是右击菜单项，true则加入到右击菜单项
 * key：快捷键设置 为Ext.EventObject属性的字符串，例Ext.EventObject.A，则key为'A'
 * keyText：默认为key值，可自定义显示，如Ext.EventObject.DELETE的DELETE太长，修改keyText为'Del',
 * batchUpdateCfg例子
 * batchUpdateCfg:[{
			xtype : 'textfield',
			fieldLabel:'英文名',
			name:'empsNameEn',
			anchor : "100%",
			maxLength : 50,
			maxLengthText : '英文名长度最大不能超过{0}'
		},{
			xtype : "textfield",
			fieldLabel : "电话号码",
			anchor : "100%",
			name : "empsPhone",
			maxLength : 100
		},{
			xtype:'numberfield',
			fieldLabel:'状态',
			anchor : "100%",
			name : "empsStatus",
			maxValue:1,
			minValue:0
		}]
		
 * @author zhao
 * @class QH.ux.grid.BaseToolbar
 * @extends Ext.ux.SearchComboxToolbar
 */
QH.ux.grid.BaseToolbar = Ext.extend(Ext.ux.SearchComboxToolbar,{
	/**
	 * @cfg {grid} grid
	 * (必须) 要操作的GRID
	 */
	/**
	 * @cfg {String} objName
	 * (必须) 要操作的domain名,或对象格式为{name:'domain名',params:[属性数组配置]}
	 * 属性配置{name:后台要保存的属性名,type:对象类型,mapping:'与store对应的属性名',
	 * copyParams:不存在，则直接为属性，当为all时，则copy所有属性,否则只copy部份属性，['属性1','属性2']}
	 * 
	 * 例1：objName:'CotEmps'
	 * 例2：objName:{
	 * 			name:'CotEmps',// CotEmps对象中有个类型为CotDept的dept属性
	 * 			params:[{
	 * 				name:'dept',type:'CotDept'
	 * 			}]
	 * 		}
	 */
	/**
	 * @cfg {String} updateObjName
	 * 要操作domain，
	 * 如果存在该属性，则保存，删除，会根据这对象保存
	 */
	/**
	 * @cfg {String} delObjName
	 * 要操作domain，
	 * 如果存在该属性，则删除，会根据这对象保存
	 */
	/**
	 * @cfg {json} defaultData
	 * 添加数据时，要生成的默认数据
	 */
	/**
	 * @cfg {Component} loadMaskCom
	 * 当进行操作时，所要遮住的控件
	 */
	/**
	 * @cfg {DwrMethod} saveMethod
	 * DWR保存方法，只有一个保存数据的参数
	 * @param {Array}
	 * @type String
	 */
	/**
	 * @cfg {DwrMethod} DWRParams
	 * DWR保存方法的参数，是一个数组，与saveMethod一同出现
	 * @type array
	 */
	/**
	 * @cfg {DwrMethod} delDWRParams
	 * DWR保存方法的参数，是一个数组，与delMethod一同出现,调用时后再追加一个参数(勾选记录的id集合)
	 * @type array
	 */
	/**
	 * @cfg {DwrMethod} delMethod
	 * DWR删除方法
	 * @param {Array} 删除的IDS 
	 * @param {String} domain
	 */
	/**
	 * @cfg {Array/Object} batchUpdateCfg
	 * 批量更新配置，如果存在，则显示批量更新按钮
	 */
	/**
	 * @cfg {String} btnItems
	 * 工具栏按钮，如果存在，则取替换原本的增删改撤销按钮
	 */
	/**
	 * @cfg {String} dateFormat
	 * 传到后台时，对时间进行转换格式，如果为空或false则不转换，默认为false
	 */
	dateFormat:false,
	/**
	 * @cfg {Boolean} disabledControl
	 * 是否需要禁用控制工具条按键方法，默认false，不禁用
	 */
	disabledControl:false,
	/**
	 * @cfg {Boolean} hiddenAddBtn
	 * true为隐藏添加按钮，默认为false
	 */
	hiddenAddBtn:false,
	/**
	 * @cfg {Boolean} hiddenDelBtn
	 * true为隐藏删除按钮，默认为false
	 */
	hiddenDelBtn:false,
	/**
	 * @cfg {Boolean} hiddenSaveAllBtn
	 * true为隐藏保存所有按钮，默认为false
	 */
	hiddenSaveAllBtn:this.editorDisable?true:false,
	/**
	 * @cfg {Boolean} hiddenRetractBtn
	 * true为隐藏撤销按钮，默认为false
	 */
	hiddenRetractBtn:this.editorDisable?true:false,
	/**
	 * @cfg {Boolean} hiddenRetractAllBtn
	 * true为隐藏撤销所有按钮，默认为false
	 */
	hiddenRetractAllBtn:this.editorDisable?true:false,
	/**
	 * @cfg {Boolean} hiddenQueryBtn
	 * true为隐藏模式按钮，默认为false
	 */
	hiddenQueryBtn:false,
	/**
	 * @cfg {Boolean} isRightMenuAddBtn
	 * true为添加按钮是右击菜单，默认为true
	 */
	isRightMenuAddBtn:true,
	/**
	 * @cfg {Boolean} isRightMenuDelBtn
	 * true为删除按钮是右击菜单，默认为true
	 */
	isRightMenuDelBtn:true,
	/**
	 * @cfg {Boolean} isRightMenuSaveAllBtn
	 * true为保存按钮是右击菜单，默认为true
	 */
	isRightMenuSaveAllBtn:this.editorDisable?true:false,
	/**
	 * @cfg {Boolean} isRightMenuRetractBtn
	 * true为撤销按钮是右击菜单，默认为true
	 */
	isRightMenuRetractBtn:this.editorDisable?true:false,
	/**
	 * @cfg {Boolean} isRightMenuRetractAllBtn
	 * true为撤销所有按钮是右击菜单，默认为true
	 */
	isRightMenuRetractAllBtn:this.editorDisable?true:false,
	/**
	 * @cfg {Boolean} isRightMenuBatchBtn
	 * true为批量更新按钮是菜单，默认为true
	 */
	isRightMenuBatchBtn:true,
	/**
	 * @cfg {Boolean} enableText
	 * 是否显示文本
	 */
	enableText:true,
	/**
	 * @cfg {Boolean} enableKeyText
	 * 是否显示提示快捷键
	 */
	enableKeyText:true,
	/**
	 * @cfg {Boolean} showQueryModel
	 * 默认为true,显示查询模式。false为显示操作模式
	 */
	showQueryModel:true,
	
	/**
	 * @cfg {string} tbarModel 工具条模式
	 * base为默认
	 * query将出现查询模式按钮，当Item中包含isSearchField或isQueryItem时，归为查询项，否则为操作项
	 * queryMenu 将查询项显示到菜单中，不用切换模式
	 * all 将查询项与操作项一起显示，不用切换模式
	 */
	tbarModel:'base',
	/**
	 * 当tbarModel为query时，tbarShowQuery　true为查询模式，false为操作模式
	 * @type Boolean
	 */
	tbarShowQuery:true,
	enableOverflow: true,
	/**
	 * @cfg {Number} addDataIndex
	 * 新增数据时，要插入的位置,负数则表示插入最后几行，默认-1，即最后一行
	 */
	addDataIndex:-1,
	/**
	 * @cfg {Boolean} editorDisable
	 * 默认可编辑，如果为true则不可编辑，则保存，撤销按钮不可用
	 */
	editorDisable:false,
	// private 
	// store id 类型，在删除时判断调用后台方法
	idType:'int',
	
	delCls:'SYSOP_DEL',
	
	/**
	 * 给按钮加selectShow,当表格有选择行是该按钮可用,否则禁用,一般用于勾选行后导入
	 */
	
	initComponent:function(){
		var toolbar = this;
		this.defaults = {
			scale:'large'
		}
		this.height = 42
		toolbar.loadMaskCom = toolbar.loadMaskCom || toolbar.grid;
		var items = [];
		// 如果存在btnItems，基本按钮不存在，则不进行添加基本按钮
		if(!this.btnItems){
			// 如果为不可编辑，则不显示保存所有，和撤销按钮
			if(!this.editorDisable){
				items.push({
//					text:this.enableText?'保存所有':'',
					text:this.enableText?'保存':'',
//					overflowText:'保存所有',
					overflowText:'保存',
					tooltip:'保存所有已修改的数据',
					ref:'saveAllBtn',
					disabled:true,
					hidden:this.hiddenSaveAllBtn,
					noShow:this.hiddenSaveAllBtn, // true为不受查询模式显示隐藏控制属性
					isQueryItem:false,
					isRightMenuItem:this.isRightMenuSaveAllBtn, // 是右击菜单项
					iconCls:'page_table_save',
					cls:'SYSOP_MOD',
//					key:'S',
					scope:this,
					handler:this.saveAllData
				});
				if(!this.hiddenSaveAllBtn)
					items.push({xtype:'tbseparator',cls:'SYSOP_MOD',isRightMenuItem:true});
				items.push({
					text:this.enableText?'撤消':'',
					hidden:true,
					overflowText:'撤消',
					tooltip:'撤消所选已修改数据',
					ref:'retractBtn',
					disabled:true,
//					hidden:this.hiddenRetractBtn,
					noShow:this.hiddenRetractBtn,
					isQueryItem:false,
					isRightMenuItem:this.isRightMenuRetractBtn, // 是右击菜单项
					iconCls:'page_retract',
					cls:'SYSOP_MOD',
					key:'R',
					scope:this,
					handler:this.retractData
				});
				items.push({
					text:this.enableText?'撤消所有':'',
					hidden:true,
					overflowText:'撤消所有',
					tooltip:'撤消所有已修改数据',
					ref:'retractAllBtn',
					disabled:true,
//					hidden:this.hiddenRetractAllBtn,
					noShow:this.hiddenRetractAllBtn,
					isQueryItem:false,
					isRightMenuItem:this.isRightMenuRetractAllBtn, // 是右击菜单项
					iconCls:'page_retract_all',
					cls:'SYSOP_MOD',
					key:'Z',
					scope:this,
					handler:this.retractAllData
				});
				if(!this.hiddenRetractAllBtn||!this.hiddenRetractBtn)
					items.push({xtype:'tbseparator',cls:'SYSOP_MOD',isRightMenuItem:true});
			}
			
			items.push({
				text:this.enableText?'新增':'',
				overflowText:'新增',
				tooltip:'新增数据',
				ref:'addBtn',
				hidden:this.hiddenAddBtn,
				noShow:this.hiddenAddBtn,
				isQueryItem:false,
				isRightMenuItem:this.isRightMenuAddBtn, // 是右击菜单项
				iconCls:'page_add',
				cls:'SYSOP_ADD',
				//key:'A',
				scope:this,
				handler:this.addData
			});
			items.push({
				text:this.enableText?'删除':'',
				overflowText:'删除',
				tooltip:'删除所选数据',
				ref:'delBtn',
				hidden:this.hiddenDelBtn,
				noShow:this.hiddenDelBtn,
				isQueryItem:false,
				isRightMenuItem:this.isRightMenuDelBtn, // 是右击菜单项
				disabled:true,
				iconCls:'page_del',
				cls:this.delCls,
				//key:'DELETE',
				//keyText:'Del',
				scope:this,
				handler:this.delData
			});
		}else{
			items = this.btnItems;
		}
		
		//this.initBatchUpdate(this.items); // 初始化批量更新
		
		this.items = this.items || [];
		
		
		this.initQueryItems();	// 初始化查询项
		
		var lastIndex = this.items.indexOf('->'); // 查询新增项是否包含->
		if(lastIndex!=-1){ // 包含，则将基础项放在->所在位置
			this.items = this.items.slice(0,lastIndex+1)
				.concat(items)
				.concat(this.items.slice(lastIndex+1,this.items.length));
		}else{ // 如果不存在则，直接将基础项放在新增项后面
			this.items.push('->');
			this.items = this.items.concat(items);
		}
		
		//初始化时,把有selectShow的按钮禁用
		Ext.each(this.items,function(btn){
			if(btn && (btn.selectShow || btn.selectOneShow)){
				btn.disabled=true;
			}
		});
		
		this.initRightMenuItems(); // 初始化grid右击菜单
		
		// 判断grid　store id 类型
		var store = this.grid.getStore();
//		var idProperty = store.reader.meta.idProperty;
//		Ext.each(store.record,function(config){
//			if(config.name == idProperty){
//				this.idType = config.type || this.idType;
//				return false;
//			}
//		},this);
		
		
		QH.ux.grid.BaseToolbar.superclass.initComponent.call(this);
		if(this.tbarModel=='query'){
			this.itemsToggleShow(this.tbarShowQuery);
		}
//		var array = this.findByType('button');
//		Ext.each(array,function(btn){
//			popedomHanlder_tbar(btn)
//		});
		this.initItemEvent(); // 初始化事件
		
		this.addEvents(
			/**
             * @event beforeadddata
             * 当点击添加按钮，在插入数据之前，触发该事件，当返回false则不默认插入数据
             * @param {Toolbar} this
             * @param {Object} defaultData
             */
			'beforeadddata',
			/**
			 * @event beforesaveallenable
			 * 当有修改数据时，保存所有按钮状态改变之前，触发该事件，当返回false则设置为不可用
			 * @param {Toolbar} this
			 * @param {Records} modRecords 被修改的modRecords
			 * @param {Records} selRecords 被选中的selRecords
			 * @param {Store} store
			 */
			'beforesaveallenable',
			/**
			 * @event beforesavedata
			 * 保存选中数据之前，触发该事件，当返回false则不执行默认保存操作
			 * @param {Toolbar} this
			 * @param {Datas} modDatas
			 * @param {Records} modRecords
			 */
			'beforesavealldata',
			/**
			 * @event beforedelrecord
			 * 删除选中数据之前，触发该事件，当返回false则不执行默认保存操作
			 * @param {Toolbar} this
			 * @param {Records} selRecords
			 * @param {Store} store
			 */
			'beforedelrecord',
			/**
			 * @event beforedeldata
			 * 删除选中数据之前，触发该事件，当返回false则不执行默认保存操作
			 * @param {Toolbar} this
			 * @param {Ids} ids
			 * @param {Ids} delName
			 */
			'beforedeldata',
			/**
			 * @event beforeretractdata
			 * 撤销选中数据之前，触发该事件，当返回false则不执行默认保存操作
			 * @param {Toolbar} this
			 * @param {Records} selRecords
			 * @param {Store} store
			 */
			'beforeretractdata',
			/**
			 * @event beforeretractdata
			 * 撤销所有数据之前，触发该事件，当返回false则不执行默认保存操作
			 * @param {Toolbar} this
			 * @param {Records} modRecords
			 * @param {Store} store
			 */
			'beforeretractalldata',
			/**
			 * @event afterdeldata
			 * 删除数据之后，触发该事件
			 * @param {Toolbar} this
			 * @param {Store} store
			 * @param {Array} delRecs
			 */
			'afterdeldata',
			/**
			 * @event aftersavealldata
			 * 保存所有数据之后，触发该事件
			 * @param {Toolbar} this
			 * @param {Store} store
			 * @param {[records]} modRecords
			 */
			'aftersavealldata',
			/**
			 * @event beforeretractdata
			 * 撤销所有数据之后，触发该事件
			 * @param {Toolbar} this
			 */
			'afterretractdata',
			/**
			 * @event afterretractalldata
			 * 撤销所有数据之后，触发该事件
			 * @param {Toolbar} this
			 */
			'afterretractalldata',
			/**
			 * @event aftercontrol
			 * 工具栏按钮状态改变后，触发该事件
			 * @param {Toolbar} this
			 * @param {Records} modRecords 被修改的modRecords
			 * @param {Records} selRecords 被选中的selRecords
			 */
			'aftercontrol'
		);
	},
	// private
	initQueryItems : function(){
		var toolbar = this;
		if((this.tbarModel == 'query' || this.tbarModel =='queryMenu' || this.tbarModel == 'all')&&!Ext.isEmpty(this.items)){
			var tbarItems=[],menuItems = [];
			Ext.each(this.items,function(item){
				if(item.isSearchField||item.isQueryItem||item.xtype=='searchcombo'){	// 是查询项
					
					if(this.tbarModel == 'queryMenu'){	// 该模式，只查询项显示到菜单中
						item.width = item.width || 120;	// 设置宽度
						if(item.setWidth){	// 统一宽度
							item.setWidth(120);
						}else
							item.width = 120;
						Ext.apply(item,{
							hidden:false, // 该模式都不隐藏
							getListParent :  function() {	 // 下拉框选择不隐藏菜单
					            return this.el.up('.x-menu');
					        }
						});
						// 时间控件在显示时，会把菜单给隐藏了，此处修改源码
						if(item.xtype == 'datefield' || Ext.isFunction(item.formatDate)){
							item.onTriggerClick = function(){
						        if(this.disabled){
						            return;
						        }
						        if(this.menu == null){
						            this.menu = new Ext.menu.DateMenu({
						                hideOnClick: false,
						                focusOnSelect: false,
						                show : function(el, pos, parentMenu){
									        if(this.floating){
									            this.parentMenu = parentMenu;
									            if(!this.el){
									                this.render();
									                this.doLayout(false, true);
									            }
									            this.showAt(this.el.getAlignToXY(el, pos || this.defaultAlign, this.defaultOffsets), parentMenu);
									        }else{
									            Ext.menu.Menu.superclass.show.call(this);
									        }
									    },
									    // 给源码加上显示监听，在显示后，再次把菜单给显示出来
									    listeners:{
									    	'show':{
									    		fn:function(menu){
									    			toolbar.queryMenu.showMenu();
									    		}
									    	}
									    }
						            });
						        }
						        this.onFocus();
						        Ext.apply(this.menu.picker,  {
						            minDate : this.minValue,
						            maxDate : this.maxValue,
						            disabledDatesRE : this.disabledDatesRE,
						            disabledDatesText : this.disabledDatesText,
						            disabledDays : this.disabledDays,
						            disabledDaysText : this.disabledDaysText,
						            format : this.format,
						            showToday : this.showToday,
						            minText : String.format(this.minText, this.formatDate(this.minValue)),
						            maxText : String.format(this.maxText, this.formatDate(this.maxValue))
						        });
						        this.menu.picker.setValue(this.getValue() || new Date());
						        this.menu.show(this.el, "tl-bl?");
						        this.menuEvents('on');
						    };
						}
						menuItems.push(item)
					}else{
						item.width = item.width || 90;	// 设置宽度
						item.queryHidden = item.hidden; // 默认是否隐藏
						item.isQueryItem =true;	// 是查询项
						tbarItems.push(item);
						tbarItems.push({xtype:'tbspacer',isQueryItem:true,queryHidden:item.hidden,hidden:item.hidden});
						menuItems.push({
							xtype:'menucheckitem',
							text:item.emptyText,
							checked:!item.hidden,
							hideOnClick:false,
							queryItemsIndex:tbarItems.length+(this.tbarModel == 'all'?-1:1), // 最终所在工具栏Items项位置
							listeners:{
								'checkchange':function(checkItem,checked){
									var item = toolbar.items.items[checkItem.queryItemsIndex]; // 查询项
									var itemS = toolbar.items.items[checkItem.queryItemsIndex+1];　// 查询项后面的空格
									if(checked){
										item.queryHidden = false;
										itemS.queryHidden = false;
										item.show();
										itemS.show();
									}else{
										item.queryHidden = true;
										itemS.queryHidden = true;
										item.hide();
										itemS.hide();
									}
								}
							}
						})
					}
					
				}else{
					if(item=='-' && this.tbarModel == 'query')
						tbarItems.push({xtype:'tbseparator',hidden:true});
					else{
						item.isQueryItem = false;
						tbarItems.push(item);
					}
						
				}
			},this);
			var action = new Ext.Action({
				text:this.tbarShowQuery?'查询模式':'操作模式',
				iconCls:this.tbarShowQuery?'page_sel':'page_no_sel',
				hidden:this.hiddenQueryBtn,
				handler:function(action){
					var isQueryModel = action.getText() == '查询模式';
					action.setText(isQueryModel ? '操作模式' : '查询模式');
					action.setIconClass(isQueryModel ? 'page_no_sel' : 'page_sel');
					toolbar.itemsToggleShow(!isQueryModel);
				}
			});
			
			var queryMenu = {
				text:'查询项',
				isQueryItem:true,
				iconCls:'page_add_sel',
				tipText:'钩选要显示的查询项',
				menu:menuItems
			}
			// 如果是查询菜单，则把对象作为tbar的queryMenu属性
			if(this.tbarModel == 'queryMenu'){
				this.queryMenu = queryMenu;
				queryMenu.ref = 'queryMenu';
			}
			
			if(this.tbarModel == 'query')
				tbarItems = [
					action,
					{xtype:'tbseparator',hidden:true},
					queryMenu
				].concat(tbarItems);
			else
				tbarItems = [queryMenu].concat(tbarItems);
			
			this.items = tbarItems;
		}
		this.initQueryItemsTip();
	},
	// private
	// 初始化所有查询项提示框
	initQueryItemsTip : function(){
		var items = this.queryMenu ? this.queryMenu.menu : this.items;
		Ext.each(items,function(item){
			if(item.isSearchField||item.isQueryItem||item.xtype=='searchcombo'){	// 是查询项
				if(Ext.isFunction(item.getEl)){	// 已是生成的对象
					new Ext.ToolTip({
						target : item.getEl(),
						anchor : 'top',
						html : item.tipText || item.emptyText
					});
				}else{
					// 未生成对象的JSON
					Ext.applyIf(item,{
						listeners : {	
							'render' : function(obj) {
								new Ext.ToolTip({
									target : obj.getEl(),
									anchor : 'top',
									html : item.tipText || item.emptyText
								});
							}
						}
					});
//					for(var p in item){
//						if(Ext.isFunction(item[p])){
//							item[p] = {
//								fn : item[p]
//							}
//						}
//					}
				}
			}
		});
	},
	// private
	// 初始化右击菜单项
	initRightMenuItems:function(){
		if(this.grid.showRightMenu){	// 显示右击菜单
			var menuItems = [];		// 菜单项
			Ext.each(this.items,function(item){
				if(item.isRightMenuItem){
					if(item.xtype=='tbseparator')	// 属于分割线，工具条与菜单项的分割线类型不一样，转成'-'
						menuItems.push('-');
					else
						menuItems.push(item);
				}
			});
			if(!Ext.isEmpty(this.grid.rightMenuItems)){ // 加入不是工具栏按钮的右击菜单项
				Ext.each(this.grid.rightMenuItems,function(rmItem){
					menuItems.push(rmItem);
				});
			}
			this.grid.rightMenu = new Ext.menu.Menu({	// grid右击菜单
				items:menuItems,
				renderTo:Ext.getBody(),  // 一开始就渲染，用于权限过滤找得到菜单项
				listeners:{
					'click':{
						fn:function(rightMenu){
							rightMenu.hide();
						}
					},
					'beforeshow':{
						fn:function(rightMenu){
							
						}
					}
				}
			});
			// 右击菜单事件
			this.grid.on({
				'rowcontextmenu':{
					fn:function(grid,rowIndex,e){
						e.preventDefault(); 
		  				var selModel = grid.getSelectionModel();
		  				// 如果不是单击在已选中的行上，则不保持之前所选，只选择所右击的行
		  				if(!selModel.isSelected(rowIndex))
		  					selModel.selectRow(rowIndex);
		  				grid.rightMenu.showAt(e.getXY());
					}
				},
				'containercontextmenu':{
					fn:function(grid,e){
						e.preventDefault(); 
						grid.rightMenu.showAt(e.getXY());
					}
				}
			});
		}
	},
	/**
	 * private
	 * 初始化工具栏按钮事件
	 * 目录只初始化disable,enable事件来控制相应右击菜单项
	 */
	initItemEvent:function(){
		var toolbar = this;
		var keyConfig = [];
		var showRightMenu = this.grid.showRightMenu;
		Ext.each(this.items.items,function(item){
			if(showRightMenu && item.isRightMenuItem)	{// 是右击菜单项
				item.on({
					'disable':{
						fn:function(item){
							toolbar.grid.rightMenu[item.ref].disable();
						}
					},
					'enable':{
						fn:function(item){
							toolbar.grid.rightMenu[item.ref].enable();
						}
					}
				});
			}
			if(item.key && !item.hidden){	// 存在快捷键并不为隐藏
				keyConfig.push({
					key:Ext.EventObject[item.key],
					scope:item.scope || this,
					alt:true,
					fn:function(){
						if(!item.disabled)
							item.handler.createDelegate(this,[item])();
					}
				});
				if(this.enableKeyText){
					item.overflowText = item.getText() + '<span style="color:#88A">('+(item.keyText || item.key)+')</span>';
					item.setText(item.overflowText);
				}
			}
		},this);
		this.keyMap = new Ext.KeyMap(Ext.getBody(),keyConfig);
	},
	/**
	 * 初始化批量更新
	 * @param {Array} btnItem 基本按钮
	 */
	// private
	initBatchUpdate : function(btnItem){
		if(this.batchUpdateCfg){
			btnItem.push('-');
			btnItem.push({
				text:this.enableText?'批量修改':'',
				overflowText:'批量修改',
				tooltip:'批量修改数据',
				ref:'batchBtn',
				isQueryItem:false,
				isRightMenuItem:this.isRightMenuBatchBtn, // 是右击菜单项
				iconCls:'page_mod',
				cls:'SYSOP_BATCH',
				scope:this,
				handler:this.batchData
			});
		}
	},
	/**
	 * 切换显示查询、操作项
	 * @param {} showQueryItem
	 */
	itemsToggleShow:function(showQueryItem){
		var items = this.items.items.slice(2); // 不控制模式按钮
		var hiddenItems = this.getLayout().hiddenItems || []; // 获得被Layout隐藏的操作按钮 
		Ext.each(items,function(item){
			// 当item本身不显示,或查询隐藏,或已被Layout隐藏的操作按钮
			// 不受显示隐藏控制
			if(item.noShow||item.queryHidden||hiddenItems.indexOf(item)!=-1)
				return ;
			if(item.isQueryItem){
				if(showQueryItem)
					item.show();
				else
					item.hide();
			}else{
				if(!showQueryItem)
					item.show();
				else
					item.hide();
			}
		});
		if(this.getLayout().more){ // ToolbarLayout的 >> 按钮
			if(showQueryItem){
				this.enableOverflow = false;
				this.getLayout().more.hide();
			}else{
				this.enableOverflow = true;
				this.getLayout().more.show();
			}
		}
		this.doLayout();
	},
	itemsControl : function(){
		var tbar = this;
		var selModel = tbar.grid.getSelectionModel();
		var store = tbar.grid.getStore();
		var selRecords = selModel.getSelections();
		var count = selModel.getCount();
		var modRecords = store.getModifiedRecords();
		
		 // 如果存在btnItems，基本按钮不存在，则不进行基本按钮控制
		if(!this.btnItems){
			// 保存按钮,撤消按钮
			// 如果为不可编辑，则不显示保存所有，和撤销按钮
			if(!this.editorDisable){
				// 有选中修改的数据时，显示保存按钮,撤消按钮
				if(modRecords.length>0&&!tbar.grid.getRowEditor().editing){
					Ext.each(modRecords,function(modRecord){
						if(selModel.isIdSelected(modRecord.id)){
							tbar.retractBtn.enable();
							return false;
						}
						else{
							tbar.retractBtn.disable();	
						}
					});
				}else{
					tbar.retractBtn.disable();
				}
				
				// 保存所有按钮,撤消所有按键,分页工具条
				// 有修改数据时，显示保存所有按钮,撤消所有按键
				if(modRecords.length>0&&!tbar.grid.getRowEditor().editing){
					if(this.fireEvent('beforesaveallenable',this,modRecords,selRecords) !== false)
						tbar.saveAllBtn.enable();
					else
						tbar.saveAllBtn.disable();
					tbar.retractAllBtn.enable();	
				}else{
					tbar.saveAllBtn.disable();
					tbar.retractAllBtn.disable();
				}
			}
			
			// 删除按钮
			// 有选中数据时，显示删除按钮
			if(count>0&&!tbar.grid.getRowEditor().editing){
				tbar.delBtn.enable();
			}else{
				tbar.delBtn.disable();
			}
			
		}
		this.fireEvent('aftercontrol',this,modRecords,selRecords);
	},
	/**
	 * 获得添加数据默认值
	 * @return {}
	 */
	getDefaultData:function(){
		return this.defaultData;	
	},
	/**
	 * 设置添加数据默认值
	 * @param {} dData
	 */
	setDefaultData:function(dData){
		if(Ext.isObject(dData)){
			this.defaultData = this.defaultData || {};
			Ext.apply(this.defaultData,dData);
		}
	},
	/**
	 * 创建一个新空对象
	 */
	getNewObj:function(){
		if(Ext.isString(this.objName)) // 是字符串，直接创建DWR对象
			eval('var obj = new '+this.objName+'();');
		else if(Ext.isObject(this.objName)){ // 数组配置
			eval('var obj = new '+this.objName.name+'();');
			Ext.each(this.objName.params,function(cfg){
				var typeObj = null;
				if(cfg.type){ // 存在类型属性则创建，否则默认创建为null
					eval('var typeObj = new '+cfg.type+'();');
				}
				if(cfg.copyParams){// COPY对象属性
					if(cfg.copyParams=='all'){// COPY所有属性
						Ext.apply(obj,typeObj);
					}else{// 只COPY对应属性
						Ext.each(cfg.copyParams,function(param){
							obj[param] = typeObj[param];
						});
					}
				}else{// 不COPY，则做为属性
					obj[cfg.mapping||cfg.name] = typeObj;
				}
			});
		}else
			throw Ext.Error('objName格式错误');
		return obj;
	},
	/**
	 * 获得要保存的对象
	 */
	getSaveObj:function(recordData){
		if(this.updateObjName||Ext.isString(this.objName)){ // 是字符串，直接创建DWR对象
			eval('var obj = new '+(this.updateObjName || this.objName)+'();');
			for(var p in obj){
				if(Ext.isObject(recordData[p])&&Ext.isDefined(recordData[p].id)&&!Ext.isEmpty(recordData[p].id)){
					//有外键关系，只需设置ID即可
					obj[p].id = recordData[p].id
				}else if(Ext.isObject(recordData[p])&&(!Ext.isDefined(obj[p].id) || Ext.isEmpty(obj[p].id))){
					// 如果是Hibernate配置的ManyToOne类型，如果ID为空，则无法保存到数据库，需要将该对象置为Null
					// 如果没有ID或者ID为空字符串，说明该ManyToOne对象没有复制，不用更新
					obj[p] = null;
				}else if(this.dateFormat&&Ext.isDate(recordData[p])){
					obj[p] = Ext.util.Format.date(recordData[p],this.dateFormat);
				}
				else{
					obj[p] = recordData[p] || null;
				}
	        }
		}
		else if(Ext.isObject(this.objName)){ // 数组配置
			eval('var obj = new '+(this.updateObjName || this.objName.name)+'();');
			for(var p in obj){
	            obj[p] = recordData[p] || null;
	            if(this.dateFormat&&Ext.isDate(recordData[p]))
	            	obj[p] = Ext.util.Format.date(recordData[p],this.dateFormat);
	        }
			Ext.each(this.objName.params,function(cfg){
				if(cfg.type){ // 存在类型属性则创建，否则默认创建为null
					eval('var typeObj = new '+cfg.type+'();');
				}
				if(cfg.copyParams){// COPY对象属性
					if(cfg.copyParams=='all'){// COPY所有属性
						for(var p in typeObj){
							typeObj[p] = recordData[p] || null;
							if(this.dateFormat&&Ext.isDate(recordData[p]))
			            		typeObj[p] = Ext.util.Format.date(recordData[p],this.dateFormat);
						}
					}else{// 只COPY对应属性
						Ext.each(cfg.copyParams,function(param){
							typObj[param] = recordData[param] || null;
							if(this.dateFormat&&Ext.isDate(recordData[param]))
			            		typeObj[param] = Ext.util.Format.date(recordData[param],this.dateFormat);
						});
					}
					obj[cfg.name] = typeObj || null;
				}else{// 不COPY，则做为属性
					var paramValue = recordData[cfg.mapping||cfg.name];
					if(paramValue){
						obj[cfg.name] = typeObj?Ext.apply(typeObj,paramValue):paramValue;
					}else
						obj[cfg.name] = null;
				}
			},this);
		}else
			throw new Ext.Error('objName格式错误');
		return obj;
	},
	/**
	 * 保存所有已修改数据
	 */
	saveAllData:function(){
		var toolbar = this;
		Ext.Msg.confirm('系统提示','确定保存所有已修改数据？',function(btn){
			if(btn=='yes'){
				var grid = toolbar.grid;
				var store = grid.getStore();
				var modRecords = store.getModifiedRecords();
				var modDatas = [];
				modDatas = toolbar.getModifyData(toolbar);
//				Ext.each(modRecords,function(modRecord){
//					var obj = toolbar.getSaveObj(modRecord.data);
//					modDatas.push(obj);
//				});
				if(toolbar.fireEvent('beforesavealldata',toolbar,modDatas,modRecords,store) !== false){
					QH_LOADMASK = new Ext.LoadMask(toolbar.loadMaskCom.getEl(),{msg:'保存所有数据中。。。'});
					QH_LOADMASK.show();
					var saveMethod = toolbar.saveMethod || baseSerivce.saveOrUpdateList;
					var args = [];
					if(toolbar.DWRParams) //没有带DWR参数
						args=args.concat(toolbar.DWRParams);
					else
						args.push(modDatas);
					args.push(toolbar.DWRCallbackFn);
					DWREngine.setAsync(false);
					saveMethod.apply(toolbar,args)
					QH_LOADMASK.hide();
					store.reload();
					toolbar.fireEvent('aftersavealldata',toolbar,store,modRecords);
					DWREngine.setAsync(true);
//					saveMethod(modDatas,function(){
//						QH_LOADMASK.hide();
//						store.reload();
//						toolbar.fireEvent('aftersavealldata',toolbar,store,modRecords);
//					});
				}
			}
		});
	},
	/**
	 * DWR的回调函数
	 * @param {} res
	 */
	DWRCallbackFn:function(res){
	},
	/**
	 * 获取表格修改过的数据，并返回相应的对象
	 * @param {} scope：作用范围
	 */
	getModifyData:function(scope){
		var _thisScope = null
		if(scope) _thisScope = scope;
		else	_thisScope = this;
		var grid = _thisScope.grid;
		var store = grid.getStore();
		var modRecords = store.getModifiedRecords();
		var modDatas = [];
		Ext.each(modRecords,function(modRecord){
			var obj = _thisScope.getSaveObj(modRecord.data);
			modDatas.push(obj);
		});
		return modDatas;
		
	},
	/**
	 * 撤销所选已修改数据
	 */
	retractData:function(){
		var toolbar = this;
		Ext.Msg.confirm('系统提示','确定撤消所选已修改数据？',function(btn){
			if(btn=='yes'){
				var grid = toolbar.grid;
				var selModel = grid.getSelectionModel();
				var store = grid.getStore();
				var selRecords = selModel.getSelections();
				if(toolbar.fireEvent('beforeretractdata',toolbar,selRecords,store) !== false){
					Ext.each(selRecords,function(selRecord){
						if(selRecord.dirty){
							if(Ext.isString(selRecord.id)&&selRecord.id.indexOf('ext-record')==0)
								store.remove(selRecord);
							else
								selRecord.reject();
						}
					})
				}
				toolbar.fireEvent('afterretractdata',toolbar);
				if(!toolbar.disabledControl)
						toolbar.itemsControl();
			}
		});
	},
	/**
	 * 撤销所有已修改数据
	 */
	retractAllData:function(){
		var toolbar = this;
		Ext.Msg.confirm('系统提示','确定撤消所有已修改数据？',function(btn){
			if(btn=='yes'){
				var grid = toolbar.grid;
				var store = grid.getStore();
				var modRecords = store.getModifiedRecords();
				var modRecord;
				var delRecords = [];
				if(toolbar.fireEvent('beforeretractalldata',toolbar,modRecords,store) !== false){
					for(var i=0;i<modRecords.length;i++){
						modRecord = modRecords[i];
						if(Ext.isString(modRecord.id)&&modRecord.id.indexOf('ext-record')==0)
							store.remove(modRecord);
						else{
							modRecord.reject();
						}
						i--;
					}
				}
				toolbar.fireEvent('afterretractalldata',toolbar);
				if(!toolbar.disabledControl)
						toolbar.itemsControl();
			}
		});
	},
	/**
	 * 添加一行数据
	 */
	addData:function(){
		var toolbar = this;
		if(toolbar.fireEvent('beforeadddata',toolbar,toolbar.defaultData) !== false){
			var grid = toolbar.grid;
			var rowEditor = grid.getRowEditor();
			// 已存在编辑 并且 未解析过或 验证成功
			if(rowEditor && (!rowEditor.isVisible() || rowEditor.isValid())){
				var selModel = grid.getSelectionModel();
				var store = grid.getStore();
				var obj = toolbar.getNewObj();
				var p = new store.recordType(obj);
				var addDataIndex = toolbar.addDataIndex;
				var count = store.getCount();
				if(addDataIndex<0){
					if(Math.abs(addDataIndex)-1 > count)
						addDataIndex = 0
					else
						addDataIndex = count + addDataIndex +1;
						
				}else if(addDataIndex > count){
					addDataIndex = count;
				}
				store.insert(addDataIndex,p);
				if(toolbar.defaultData)
					for(var p in toolbar.defaultData){
						store.getAt(addDataIndex).set(p,toolbar.defaultData[p]);
					}
				rowEditor.stopEditing();	// 先停止编辑
               	grid.getView().refresh();
                grid.getSelectionModel().selectRow(addDataIndex);
                rowEditor.startEditing(addDataIndex);
			}
		}
	},
	/**
	 * 删除所选数据
	 */
	delData:function(){
		var toolbar = this;
		Ext.Msg.confirm('系统提示','确定删除所选数据？',function(btn){
			if(btn=='yes'){
				var grid = toolbar.grid;
				var store = grid.getStore();
				var selModel = grid.getSelectionModel();
				var records = selModel.getSelections();
				if(toolbar.fireEvent('beforedelrecord',toolbar,records,store) !== false){
					var ids = [];
					Ext.each(records,function(record){
						if(Ext.isString(record.id)&&record.id.indexOf('ext-record')==0)
							store.remove(record);
						else{
							ids.push(record.id);
						}
					});
					if(ids.length>0&&toolbar.fireEvent('beforedeldata',toolbar,ids,toolbar.delObjName||toolbar.updateObjName||toolbar.objName) !== false){
						QH_LOADMASK = new Ext.LoadMask(toolbar.loadMaskCom.getEl(),{msg:'删除所选数据中。。。'});
						QH_LOADMASK.show();
						var delMethod = toolbar.delMethod || (toolbar.idType == 'int' ? baseSerivce.deleteIntListReturnIds : baseSerivce.deleteListReturnIds);
						var args = [];
						if(toolbar.delDWRParams) {
							args=args.concat(toolbar.delDWRParams);
							args.push(ids);
						}else{
							args = [ids,toolbar.delObjName||toolbar.updateObjName||toolbar.objName];
						}
						args.push(function(delIds){
							QH_LOADMASK.hide();
							var delRecs=[];
							Ext.each(delIds,function(id){
								delRecs.push(store.getById(id));
								store.remove(store.getById(id));
							});
							records = selModel.getSelections();
							if(records.length>0){
								Ext.Msg.show({
									title:'系统提示',
									msg:'存在关联数据，不能删除',
									icon:Ext.Msg.WARNING,
									buttons:Ext.Msg.OK
								});
							}
							if(delRecs.length>0){
								toolbar.fireEvent('afterdeldata',toolbar,store,delRecs);
							}
						});
						delMethod.apply(toolbar,args);
					}
				}
			}
		});
	},
	/**
	 * 批量修改方法
	 * @param {} btn
	 */
	batchData : function(btn){
		if (this.grid.store.getModifiedRecords().length > 0) {
			Ext.Msg.show({
				title : '系统提示',
				msg : '修改的数据未保存',
				icon : Ext.Msg.WARNING,
				buttons : Ext.Msg.OK
			});
			return false;
		}
		if(!this.batchWin){
			var toolbar = this;
			var height = 100;
			var batchLen = 1;
			var batchItems = [];
			if(Ext.isArray(this.batchUpdateCfg)){
				Ext.each(this.batchUpdateCfg,function(batchItem){
					batchItem.disabledClass = 'combo-disabled';
					if(batchItem.setDisabled)
						batchItem.setDisabled(true);
					else
						batchItem.disabled = true;
					batchItems.push({
						xtype:'checkbox',
						name:'check_'+batchItem.name,
						itemName:batchItem.name,
						listeners:{
							'check':function(checkbox,checked){
								if(!checkbox.fieldItem)
									checkbox.fieldItem = toolbar.batchWin.formPanel.getForm().findField(checkbox.itemName);
								checkbox.fieldItem.setDisabled(!checked);
							}
						}
					})
				});
				height += 25 * this.batchUpdateCfg.length;
			}else{
				batchItems.push({
					xtype:'checkbox',
					checked:true,
					itemName:this.batchUpdateCfg.name,
					listeners:{
						'check':function(checkbox,checked){
							if(!checkbox.fieldItem)
								checkbox.fieldItem = toolbar.batchWin.formPanel.getForm().findField(checkbox.itemName);
							if(checked)
								checkbox.fieldItem.show();
							else
								checkbox.fieldItem.hide();
						}
					}
				})
				height += 25;
			}
			
			this.batchWin = new QH.Window({
				title:'批量修改',
				closeAction:'hide',
				resizable:true,
				layout:'fit',
				width:300,
				height:height > 400 ? 400 : height,
				items:{
					xtype:'qhform',
					height:height,
					ref:'formPanel',
					objName:this.objName,
					items:[{
						layout:'column',
						items:[{
							columnWidth:1,
							layout:'form',
							items:this.batchUpdateCfg
						},{
							width:30,
							layout:'form',
							labelWidth:1,
							items:batchItems
						}]
					}],
					cancleEditor:function(){
						this.ownerCt.hide();	
					},
					saveData:function(){
						var win = this.ownerCt;
						var formPanel = this;
						var form = this.getForm();
						if (!form.isValid())
							return;
						var obj = form.getFieldValues();
						// 如果为空，就设置为null，防止外键属性报外键约束
						for (var p in obj) {
							if(Ext.isDate(obj[p])){
								if(this.dateFormat){
						    		obj[p] = Ext.util.Format.date(obj[p],this.dateFormat);
								}else{
									obj[p] = obj[p].getTime();
								}
							}
							if(p.indexOf('check_') == 0){
								if(!obj[p])
									delete obj[p.substring(6)];
								delete obj[p];
							}
						}
						if(Ext.encode(obj) == "{}"){
							return;
						}
						var store = toolbar.grid.getStore();
						var selModel = toolbar.grid.getSelectionModel();
						var records = selModel.getSelections();
						var ids = [];
						Ext.each(records,function(record){
							if(Ext.isString(record.id)&&record.id.indexOf('ext-record')==0)
								store.remove(record);
							else{
								ids.push(record.id);
							}
						});
						var whereParam;
						if(ids.length == 0){
							whereParam = toolbar.searchField.getQueryObj() || {};
						}else{
							whereParam = {
								id:ids
							}
						}

						QH_LOADMASK = new Ext.LoadMask(this.getEl(), {
							msg : '数据保存中'
						});
						QH_LOADMASK.show();
						baseSerivce.updateTable(this.objName,obj,Ext.encode(whereParam),function(result){
							QH_LOADMASK.hide();
							store.reload();
							Ext.Msg.alert('批量更新','更新了'+result+'条数据');
							win.hide();
						});
					}
				},
				listeners:{
					'beforeshow':{
						fn:function(win){
							win.formPanel.getForm().reset();
						}
					}
				}
			});
		}
		this.batchWin.show(btn.getEl());
	},
	/**
	 * 表格需要选择行,有属性selectShow的按钮才能被点击,默认该按钮不能用
	 */
	speBtnControl : function(){
		var tbar = this;
		var selModel = tbar.grid.getSelectionModel();
		var cord = selModel.getSelections();
		//获得勾选的已保存的行
		var num=0;
		Ext.each(cord, function(item) {
					if (item.data.id) {
						num++;
					}
				});
		var count = selModel.getCount();
		Ext.each(tbar.items.items,function(btn){
			if(btn && btn.selectShow){
				// 有选中数据时,才显示部分按钮
				if(count>0){
					if(btn.selectSaved && num==0){
						btn.disable();
					}else{
						btn.enable();
					}
				}else{
					btn.disable();
				}
			}
			if(btn && btn.selectOneShow){
				// 只选中1条数据时,才显示部分按钮
				if(count==1){
					if(btn.selectSaved && num==0){
						btn.disable();
					}else{
						btn.enable();
					}
				}else{
					btn.disable();
				}
			}
		});
	}
});
Ext.reg('basetoolbar',QH.ux.grid.BaseToolbar);