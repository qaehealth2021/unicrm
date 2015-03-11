
/**
 * 增，删，改 基本操作通用树表格
 * @author zhao
 * @class QH.ux.tree.BaseTreeGrid
 * @extends Ext.ux.tree.TreeGrid
 */
QH.ux.tree.BaseTreeGrid = Ext.extend(Ext.ux.tree.TreeGrid,{
	/**
	 * 默认可编辑，如果为true则不可编辑
	 * @type Boolean
	 */
	editorDisable:false,
	/**
	 * @cfg {int} defaultColumnWidth
	 * 列默认宽度
	 */
	defaultColumnWidth:120,
	storeAutoLoad:true,
	storeLimit:QH_PAGE_LIMIT,
	enableSort:false,
	initComponent : function(){
		var treeGrid = this;
		Ext.applyIf(this,{root:new Ext.tree.AsyncTreeNode({text: 'Root'})});
		
		this.root.id = ''; 
		
		var loader = new QH.ux.tree.TreeStoreLoader({
			dataUrl:this.dataUrl
		})
		
		this.store = new QH.ux.tree.TreeLoaderStore({   
	        rootNode:this.root,   
	        loader:loader   
	    });
	    if(this.storeAutoLoad)
	    	this.store.load({params:{start:0,limit:this.storeLimit}});
		
		if(this.editorDisable)
			this.editor = false;
		else
			this.editor = new QH.ux.tree.BaseRowEditor(this.editorCfg);
		if(Ext.isArray(this.plugins)){
			this.plugins.push(this.editor);
		}
		Ext.applyIf(this,{
			plugins : this.editor
		});
		var bbar = {
			xtype:'paging',
			pageSize:this.storeLimit,
        	store:this.store,
        	displaySize:QH_PAGE_DISPLAY_SIZE,
        	displayInfo:true
		}
		Ext.apply(bbar,this.bbarCfg);
		Ext.applyIf(this,{bbar:bbar});
		
		QH.ux.tree.BaseTreeGrid.superclass.initComponent.call(this);
	},
	initColumns : function() {
        var cs = this.columns,
            len = cs.length, 
            columns = [],
            i, c;

        this.defaults = Ext.apply({
            width: this.defaultColumnWidth
        }, this.defaults);
            
            
        for(i = 0; i < len; i++){
            c = Ext.applyIf(cs[i], this.defaults);
            if(!c.isColumn) {
                c.xtype = c.xtype ? (/^tg/.test(c.xtype) ? c.xtype : 'tg' + c.xtype) : 'tgcolumn';
                c = Ext.create(c);
            }
            c.init(this);
            columns.push(c);
            
            if(this.enableSort !== false && c.sortable !== false) {
                c.sortable = true;
                this.enableSort = true;
            }
        }

        this.columns = columns;
    },
    getStore : function(){
    	return this.store;	
    }
});
Ext.reg('basetreegrid',QH.ux.tree.BaseTreeGrid);