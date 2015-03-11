
QH.ux.tree.TreeLoaderStore = Ext.extend(Ext.data.Store,{
	/**
	 * 加载数据源的数据对象，是树结构的loader
	 * @type  Ext.tree.TreePagingLoader
	 */
	loader:null,
	/**
	 * 树的根节点，最顶的节点
	 * @type Ext.tree.AsyncTreeNode
	 */
	rootNode:null,
	constructor : function(config){
	 	QH.ux.tree.TreeLoaderStore.superclass.constructor.call(this);
	 	this.loader = config.loader;
	 	this.rootNode = config.rootNode;
	 },
	 load:function(options){
	 	var _self = this;
	 	if(!this.loader || !this.rootNode){
	 		throw new Ext.Error('必须指定loader或者rootNode');
	 	}
	 	options = Ext.apply({}, options);
        this.storeOptions(options);
        if(this.sortInfo && this.remoteSort){
            var pn = this.paramNames;
            options.params = Ext.apply({}, options.params);
            options.params[pn.sort] = this.sortInfo.field;
            options.params[pn.dir] = this.sortInfo.direction;
        }
	 	Ext.apply(this.loader.baseParams,{start:options.params.start,limit:options.params.limit})
	 	this.loader.load(this.rootNode,function(node){
	 		_self.currentCount = _self.loader.currentCount;
	 		_self.totalLength = _self.loader.totalCount;
	 		node.expand();
	 		_self.fireEvent("load",_self,null,options);
	 		delete _self;
	 	});
	 	return true;
	 },
	 getCount : function(){
        return this.currentCount || 0;
     },
     getTotalCount : function(){
        return this.totalLength || 0;
     }
})


QH.ux.tree.TreeStoreLoader = Ext.extend(Ext.tree.TreeLoader,{
    constructor : function(config){
    	QH.ux.tree.TreeStoreLoader.superclass.constructor.call(this,config);
    },
	processResponse : function(response, node, callback, scope){
        var json = response.responseText;
        try {
            var o = response.responseData || Ext.decode(json);
            
            this.totalCount = o.totalCount;
            this.currentCount = o.data.length;
            var o = o.data;
            
            if(this.currentCount==0){
            	node.ui.wasLeaf = false;
            }
            this.data = o;
            node.beginUpdate();
            for(var i = 0, len = o.length; i < len; i++){
                var n = this.createNode(o[i]);
                if(n){
                    node.appendChild(n);
                }
            }
            node.endUpdate();
            this.runCallback(callback, scope || node, [node]);
        }catch(e){
            this.handleFailure(response);
        }
    }
})
