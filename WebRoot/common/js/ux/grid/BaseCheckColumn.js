/**
 * 重写锁定列插件,让它支持全选反选,和tooltip提示
 * azan
 * @class QH.ux.grid.BaseCheckColumn
 * @extends Ext.ux.grid.CheckColumn
 */
QH.ux.grid.BaseCheckColumn = Ext.extend(Ext.ux.grid.CheckColumn, {
	constructor : function(config) {
		Ext.apply(this, config);
		if (!this.id) {
			this.id = Ext.id();
		}
		this.header='<input type="checkbox" id="box_' + this.id + '">'+(this.header || ""),
		this.renderer = this.renderer.createDelegate(this);
		
//		var gd = this.gridPl;
//		if(Ext.isArray(gd.plugins)){
//			gd.plugins.push(this);
//		}else{
//			var ary = new Array();
//			if(Ext.isObject(gd.plugins)){
//				ary.push(gd.plugins);
//			}
//			ary.push(this);
//			gd.plugins=ary;
//		}
	},
	menuDisabled : true,
	align : 'center',
	sortable : false,
	width : 30,
	editor:{
		xtype:'checkbox'	
	},
	init : function(grid) {
		var _self = this;
		this.grid = grid;
		this.grid.on('render', function() {
			var view = this.grid.getView();
			view.mainBody.on('mousedown', this.onMouseDown, this);
			view.mainBody.on('mouseover', this.onMouseOver, this);
			}, this);
		this.grid.on('afterrender', function(pnl) {
			var el = Ext.fly("box_" + _self.id).dom;
			if (window.addEventListener) {
				el.addEventListener('click', function() {
							_self.grid.store.each(function(record) {
										record.set(_self.dataIndex, el.checked);
									});
							var toolbar=_self.grid.getOperateTbar();
				            if(toolbar&&!toolbar.disabledControl)
							toolbar.itemsControl();
						}, false);
			} else {
				el.attachEvent('onclick', function() {
							_self.grid.store.each(function(record) {
										record.set(_self.dataIndex, el.checked);
									});
							var toolbar=_self.grid.getOperateTbar();
				            if(toolbar&&!toolbar.disabledControl)
							toolbar.itemsControl();
						});
			}
		}, this);
	},
	onMouseDown : function(e, t){
        if(Ext.fly(t).hasClass(this.createId())){
            e.stopEvent();
            var index = this.grid.getView().findRowIndex(t);
            var record = this.grid.store.getAt(index);
            record.set(this.dataIndex, !record.data[this.dataIndex]);
            var toolbar=this.grid.getOperateTbar();
            if(toolbar&&!toolbar.disabledControl)
			toolbar.itemsControl();
        }
    },
	onMouseOver : function(e, t) {
		if (Ext.fly(t).hasClass(this.createId())) {
			e.stopEvent();
			if (!t.tip) {
				var tip = new Ext.ToolTip({
							target : t,
							anchor : 'top',
							maxWidth : 90,
							minWidth : 90,
							html : this.tooltip
						});
				t.tip = tip;
				tip.show();
			}
		}
	}
});
