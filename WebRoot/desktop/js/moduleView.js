/**
 * 
 * @class QH.module.IconView
 * @extends Ext.DataView
 */
QH.module.IconView = Ext.extend(Ext.DataView, {
	multiSelect : true,
	autoScroll : true,
	bodyStyle : "overflow-x:hidden;",
	// loadingText : '加载...',
	cls : 'pic-view',
	overClass : 'x-view-over',
	itemSelector : 'div.thumb-wrap-b',
	headerId : '',
	emptyText : '<div style="padding:10px;">您还没有权限查看任何模块!</div>',
	enableDrag : false, // 是否可拖
	enableDrog : false, // 是否可放
	bigSize : 0,
	autoLoad : false,
	initComponent : function() {
		this.store = new QH.module.Store({
					autoLoad : this.autoLoad
				});

		if (!this.tpl) {
			var bigClass = this.bigSize > 0 ? 'thumb-wrap-big' : 'thumb-wrap';
			var centerStartDiv = this.bigSize > 0
					? '<div class="main-center-div"><div class="main-center">'
					: '';
			var centerEndDiv = this.bigSize > 0 ? '</div></div>' : '';
			this.itemSelector = 'div.' + bigClass;
			this.tpl = new Ext.XTemplate(
					centerStartDiv + '<tpl for=".">',
					'<div class="' + bigClass + '">',
					'<div class="thumb" style="position:relative;">',
					'<img src="{moduleImgurl}" height=' + (this.bigSize + 78)
							+ ' width=' + (this.bigSize + 78)
							+ ' alt="{moduleName}" />',
					'</div>',
					'<span class="icon-text-span"><a class="icon-text" href="javascript: void(0)"><span>{moduleName}</span></a></span>',
					'</div>', '</tpl>' + centerEndDiv);
			this.tpl.compile();
		}
		QH.module.IconView.superclass.initComponent.call(this);
		this.on('click', this.clickAddTab, this);
	},
	//单击图标时，添加面板
	clickAddTab : function(view, number, element, e) {
		var record = view.store.getAt(number);
		var module = view.app.getModule(record.get("id"));
		if (module.createWindow) {
			module.createWindow(null,module.id, module.moduleName, module.moduleUrl, module.moduleImgurl);
//			Ext.getCmp('shortCuts').tip.hide();
			if(window.lastTip)
				window.lastTip.hide();
		} else {
			// 显示子面板
			if(!element.tip){
				var tip = new Ext.ToolTip({
					target : element,
					anchor : 'top',
					width : 334,
					showDelay : 200,
					hideDelay:5000,
					items : [{
						xtype : 'moduleiconview',
						ref : 'iconView',
						style : 'background:transparent url(./desktop/wallpapers/bc.jpg);position: static;-webkit-border-radius: 10px;',
						width : 320,
						height : 220,
						app : view.app
					}],
					listeners : {
						afterrender : {
							fn : function(tip) {
								if (record.data.children){
									tip.iconView.store.loadData({
										data : record.data.children,
										totalCount : record.data.children.length
									}, false);
								}
							},
							scope : this
						},
						beforeshow:function(p){
							if(window.lastTip)
								window.lastTip.hide();
						},
						show:function(p){
							window.lastTip=p;
						}
					}
				});
				element.tip=tip;
			}
			element.tip.show();
		}
	}
});
Ext.reg('moduleiconview', QH.module.IconView);
