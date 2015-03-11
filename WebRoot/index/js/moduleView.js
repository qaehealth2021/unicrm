/**
 * 
 * @class QH.module.IconView
 * @extends Ext.DataView
 */
QH.module.IconView = Ext.extend(Ext.DataView,{
	multiSelect : true,
	autoScroll : true,
	bodyStyle : "overflow-x:hidden;",
	loadingText : '加载...',
	cls:'pic-view',
    overClass:'x-view-over',
	itemSelector : 'div.thumb-wrap-b',
	headerId:'',
	emptyText : '<div style="padding:10px;">没有记录</div>',
	enableDrag:false, // 是否可拖
	enableDrog:false, // 是否可放
	enableClickAddTab:false, // 单击按钮时否生成页签
	rightMenu:true,
	bigSize:0,
	/**
	 * 默认不自动加载
	 * @type Boolean
	 */
	autoLoad:true,
	initComponent:function(){
		this.store = new QH.module.Store({
			autoLoad:this.autoLoad	
		});
		
		if(!this.tpl){
			var bigClass=this.bigSize>0?'thumb-wrap-big':'thumb-wrap';
			var centerStartDiv=this.bigSize>0?'<div class="main-center-div"><div class="main-center">':'';
			var centerEndDiv=this.bigSize>0?'</div></div>':'';
			this.itemSelector='div.'+bigClass;
			this.tpl = new Ext.XTemplate(
			centerStartDiv+'<tpl for=".">',
					'<div class="'+bigClass+'">',
						'<div class="thumb" style="position:relative;">',
						'<img src="{imgUrl}" height='+(this.bigSize+48)+' width='+(this.bigSize+48)+' alt="{text}" />',
						'</div>',
//						'<span style="font-weight:bold;font:7px tahoma,arial,helvetica,sans-serif;color:white">{text}</span>',
						'<span><a class="icon-text" href="javascript: void(0)"><span>{text}</span></a></span>',
					'</div>', 
				'</tpl>'+centerEndDiv
			);
			this.tpl.compile();
		}
		if(this.enableDrag){
			this.on('render',this.initializePatientDragZone,this);
		}
		if(this.enableDrog){
			this.on('render',this.initializeHospitalDropZone,this);
		}
		if(this.enableClickAddTab){
			this.on('click',this.clickAddTab,this);
		}
		if(this.rightMenu){
			var _self = this;
			var menu = new Ext.menu.Menu({
				items:[{
					text:"删除",
					iconCls:"page_del",
					handler:_self.delShortcut.createDelegate(_self,[_self])
				}]
			});
			this.on('render',function(){
				 Ext.getBody().on("contextmenu", Ext.emptyFn,null, {preventDefault: true});
			})
			this.on('contextmenu',function(obj, index, node, event){
				x = event.browserEvent.clientX;
                y = event.browserEvent.clientY;
                menu.showAt([x, y]);
                _self.select(index);
			})
		}
		QH.module.IconView.superclass.initComponent.call(this);
	},
	/**
	 * 单击图标时，添加面板
	 * @param {} view
	 * @param {} number
	 * @param {} element
	 * @param {} e
	 */
	clickAddTab : function(view,number,element,e){
		var record = view.store.getAt(number);
		var name = record.get('text');
		var imgUrl = record.get('imgUrl');
		
		QH_VIEWPORT.tabPanel.addPanel(record.get("id"),name,record.get("url"),imgUrl);
		QH_VIEWPORT.tabPanel.menuView.tip.hide();
	},
	/**
	 * 初始化可拖
	 * @param {} v
	 */
	initializePatientDragZone : function(v){
		v.dragZone = new Ext.dd.DragZone(v.getEl(), {
	        getDragData: function(e) {
	            var sourceEl = e.getTarget(v.itemSelector, 10);
	            if (sourceEl) {
	                d = sourceEl.cloneNode(true);
	                d.id = Ext.id();
	                return v.dragData = {
	                    sourceEl: sourceEl,
	                    repairXY: Ext.fly(sourceEl).getXY(),
	                    ddel: d,
	                    patientData: v.getRecord(sourceEl).data
	                }
	            }
	        },
	        getRepairXY: function() {
	            return this.dragData.repairXY;
	        }
	    });
	},
	/**
	 * 初始化可放
	 * @param {} v
	 */
	initializeHospitalDropZone: function (v) {
	    v.dropZone = new Ext.dd.DropZone(v.getEl(), {
	        getTargetFromEvent: function(e) {
	            return e.getTarget('.pic-view');
	        },
	        onNodeEnter : function(target, dd, e, data){ 
	            Ext.fly(target).addClass('hospital-target-hover');
	        },
	        onNodeOut : function(target, dd, e, data){ 
	            Ext.fly(target).removeClass('hospital-target-hover');
	        },
	        onNodeOver : function(target, dd, e, data){ 
	            return Ext.dd.DropZone.prototype.dropAllowed;
	        },
	        onNodeDrop : function(target, dd, e, data){
	        	var store = v.getStore();
	        	var p = new store.recordType(data.patientData,data.patientData.id);
	        	var record = store.getById(p.get('id'));
	        	if(store.getCount() > 10){
	        		alertMsg("最多只能10个快捷菜单");
	        		return true;
	        	}
	        	if(!record){
	        		store.add([p]);
	        		//TODO:添加快捷操作
		        	cotModuleService.addShortcut(p.get('id'),function(res){
		        	});
	        	}
	            return true;
	        }
	    });
	},
	delShortcut:function(panel){
		var recored = panel.getSelectedRecords()[0];
		cotModuleService.deleteShortcut(recored.get('id'),function(res){
	    });
	    panel.getStore().remove(recored);
	}
});

Ext.reg('moduleiconview',QH.module.IconView);

QH.module.PicView = Ext.extend(QH.module.IconView,{
	autoLoad:true,
	rightMenu:false,
	initComponent:function(){
		QH.module.PicView.superclass.initComponent.call(this);
		this.initMouseOver();
	},
	
	initMouseOver:function(){
		// 鼠标移到节点，可以显示相应的信息
		this.on('render', function(view) {
			this.tip = new Ext.ToolTip({
//				title:'aa',
		        anchor: 'top',
		        width:334,
		        showDelay:200,
		        autoHide: false,
//		        closable:true,
				target : this.getEl(), // 需要显示信息的组件
				delegate : '.x-view-over', // 一个domquery的selector，用来控制触发需要在哪里显示，通过CSS识别
//				mouseOffset : [-14, 4],
//				mouseOffset:[0,5],
//				trackMouse : true, // Moving within the row
				renderTo : document.body, // Render
				items:[{
					xtype:'moduleiconview',
					ref:'iconView',
					style:'background:#CEDCF0;position: static;',
					width: 320,
		        	height:160,
					enableClickAddTab:true,
					enableDrag:true,
					rightMenu:false
				}],
				initTarget : function(target){
			        var t;
			        if((t = Ext.get(target))){
			            if(this.target){
			                var tg = Ext.get(this.target);
			                this.mun(tg, 'click', this.onTargetClick, this);
			            }
			            this.mon(t, {
			                click: this.onTargetClick,
			                scope: this
			            });
			            this.target = t;
			        }
			        if(this.anchor){
			            this.anchorTarget = this.target;
			        }
			    },
			    onTargetClick:function(e){
			    	if(this.disabled || e.within(this.target.dom, true)){
			            return;
			        }
			        var t = e.getTarget(this.delegate);
			        if (t && t != this.triggerElement) {
			        	this.hide();
			            this.triggerElement = t;
			            this.clearTimer('hide');
			            this.targetXY = e.getXY();
			            this.delayShow();
			        }else{
			        	this.hide();
			        	this.triggerElement = '';
			        }
			    },
				listeners : { 
					beforeshow : {
						fn:function(tip) {
							var moduleRecord = this.getRecord(tip.triggerElement);
							if(moduleRecord.data.children)
								tip.iconView.store.loadData({data:moduleRecord.data.children,totalCount:moduleRecord.data.children.length},false);
//							tip.setTitle(moduleRecord.data.text);
						},
						scope:this
					}
				}
			});
		});
	}
});

Ext.reg('modulepicview',QH.module.PicView);