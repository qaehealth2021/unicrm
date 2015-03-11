
/**
 * 增，删，改 基本操作通用Grid
 * @author zhao
 * @class QH.ux.grid.BaseGridPanel
 * @extends Ext.grid.GridPanel
 */
QH.ux.grid.BaseGridPanel = Ext.extend(QH.grid.GridPanel,{
	/**
	 * @cfg {Array} tbarItems 基本工具条项
	 */
	/**
	 * @cfg {json} editorCfg 行编辑配置
	 */
	/**
	 * 
	 * @cfg {json} tbarOtherCfg 基本工具条项其它配置
	 * 主要用于Grid重复使用时，用该配置覆盖tbarCfg配置
	 */
	/**
	 * @cfg {json} columnCfg 列配置
	 */
	/**
	 * @cfg {Array} rightMenuItems 右击菜单项
	 */
	/**
	 * @cfg {Boolean} showRightMenu
	 * 是否显示右击菜单，默认true
	 */
	showRightMenu:false,
	/**
	 * @cfg {Boolean} editorDisable
	 * 默认可编辑，如果为true则不可编辑
	 */
	editorDisable:false,
	/**
	 * 列宽是否填满表格,默认为true
	 * @type Boolean
	 */
	forceFit : true,
	initComponent : function(){
		var grid = this;
		if(!grid.viewConfig){
			grid.viewConfig={};
			grid.viewConfig.forceFit=this.forceFit;
		}else{
			if(!grid.viewConfig.forceFit){
				grid.viewConfig.forceFit=this.forceFit;
			}
		}
		
		var sm = new Ext.grid.CheckboxSelectionModel({
			listeners:{
				selectionchange:{
					fn:function(selModel){
						grid.selChange(selModel);
					},
					buffer:100
				}
			}
		});
		if(this.columns){
			var columns = [];
			if(!this.sm)
				columns.push(sm);
			this.columns = columns.concat(this.columns);
			var columnCfg = {
				columns:this.columns,
		    	defaults:{
		            sortable: true
	        	}
			}
			Ext.apply(columnCfg,this.columnCfg);
			grid.colModel = new Ext.grid.ColumnModel(columnCfg);
		}
		if(this.editorDisable)
			this.editor = false;
		else
			this.editor = this.editor || new QH.ux.grid.BaseRowEditor(this.editorCfg);
		if(Ext.isArray(this.plugins)){
			this.plugins.push(this.editor);
		}else if(Ext.isObject(this.plugins) && !this.editorDisable){
			this.plugins = [this.plugins,this.editor];
		}
		Ext.applyIf(this,{
			sm:sm,
			plugins : this.editor
		});
		this.store.on({
			'load':function(store){
				grid.selChange.defer(100,grid,[grid.getSelectionModel()]);
			}
		});
		var tbar = {
			xtype:'basetoolbar',
			grid:this,
			editorDisable:this.editorDisable,
			items:this.tbarItems
		}
		Ext.applyIf(this,{tbar:tbar});
		Ext.apply(this.tbar,this.tbarOtherCfg,this.tbarCfg);
		this.tbar.editorDisable = this.editorDisable;
		QH.ux.grid.BaseGridPanel.superclass.initComponent.call(this);
//			this.add(operateTbar)
		this.addEvents(
			/**
             * @event selectionchange
             * Fires when the selection changes
             * @param {Grid} this
             * @param {SelectionModel} selModel
             */
			'selectionchange'
		);
	},
	/**
	 * 获得行编辑对象
	 * @return {QH.ux.grid.BaseRowEditor}
	 */
	getRowEditor:function(){
		return this.editor;
	},
	/**
	 * 获得操作数据工具栏
	 * @return {QH.ux.grid.BaseToolbar}
	 */
	getOperateTbar:function(){
		return this.getTopToolbar();
	},
	/**
	 * 获得查询工具栏
	 */
	getQueryTbar:function(){
//		return this.queryTbar; 
	},
	/**
	 * 选择改变
	 * @param {} selModel
	 */
	selChange:function(selModel){
		selModel = selModel || this.getSelectionModel();
		var toolbar = this.getOperateTbar();
		if(toolbar&&!toolbar.disabledControl){
			if(toolbar.speBtnControl)
				toolbar.speBtnControl();
			if(toolbar.itemsControl)
				toolbar.itemsControl();
		}
		this.fireEvent('selectionchange',this,selModel);
	}
});
Ext.reg('basegrid',QH.ux.grid.BaseGridPanel);