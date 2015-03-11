/**
 * 树分页数据源加载器，只对最顶层根节点进行分页，这意味着，子节点的节点数目不能太多，否则会有性能问题
 * @class Ext.tree.TreeLoaderStore
 * @extends Ext.data.Store
 */
Ext.tree.TreeLoaderStore = Ext.extend(Ext.data.Store,{
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
	 	Ext.tree.TreeLoaderStore.superclass.constructor.call(this);
	 	this.loader = config.loader;
	 	this.rootNode = config.rootNode;
	 },
	 load:function(options){
	 	var _self = this;
	 	if(!this.loader || !this.rootNode){
	 		Ext.MessageBox.alert("错误","必须指定loader或者rootNode");
	 		return false;
	 	}
	 	Ext.apply(this.loader.baseParams,{start:options.params.start,limit:options.params.limit}),
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

/**
 * @class Ext.tree.TreePagingLoader
 * @extends Ext.ux.tree.TreeGridLoader
 * 一定要引用TreeGridLoader.js
 */
Ext.tree.TreePagingLoader = Ext.extend(Ext.ux.tree.TreeGridLoader,{
    processResponse : function(response, node, callback, scope){
        var json = response.responseText;
        try {
            var o = response.responseData || Ext.decode(json);
            //TODO:暂时从后台获取当前页的记录数，通过currentCount属性获取
            //最佳做法是效仿pagingToolbar的做法，在客户端获取
            //目前的障碍是，loader还没读取完，翻页的工具栏已经初始化了，导致当前页记录数无法获取
            //有空再继续修改，思路是把loader当store来用
            this.totalCount = o.totalCount;
            this.currentCount = o.data.length;
            var o = o.data;
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
//    getCount:function(){
//    	return this.currentCount || 0;
//    },
//    getTotalCount:function(){
//    	return this.totalCount || 0;
//    }
})

//Ext.tree.PagingToolbar = Ext.extend(Ext.PagingToolbar,{
//	rootNode:null,
//	constructor : function(config){
//	 	Ext.tree.TreeLoaderStore.superclass.constructor.call(this);
//	 	this.rootNode = config.rootNode;
//	 },
//	doLoad : function(start){
//        var o = {}, pn = this.getParams();
//        o[pn.start] = start;
//        o[pn.limit] = this.pageSize;
//        Ext.apply(this.store.baseParams,o);
//        if(this.fireEvent('beforechange', this, o) !== false){
//            this.store.load(this.rootNode)
//        }
//    }
//})