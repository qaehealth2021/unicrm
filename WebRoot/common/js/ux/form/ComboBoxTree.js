/**
 * 下拉树
 * @class ComboBoxTree
 * @extends Ext.form.ComboBox
 */
ComboBoxTree = Ext.extend(Ext.form.ComboBox, {   
    passName : 'id',   
   	//是否允许非叶子结点的单击事件  
    allowUnLeafClick : true,   
    //树显示的高度，默认为180 
    treeHeight : 150,   
    store : new Ext.data.SimpleStore({   
        fields : ['value', 'text'],   
        data : [[]]   
    }),   
    editable : false, // 禁止手写及联想功能   
    mode : 'local',   
    triggerAction : 'all',   
    maxHeight : 500,   
    selectedClass : '',   
    onSelect : Ext.emptyFn,   
    emptyText : '请选择',
     //初始化
    initComponent : function() {   
    	
        ComboBoxTree.superclass.initComponent.call(this);   
        this.tree.autoScroll = true;   
        this.tree.height = this.treeHeight;   
        //this.tree.containerScroll = false;   
        this.tplId = Ext.id();
        this.tpl = '<tpl><div style="height:'+this.treeHeight+'px;overflow:auto;"><div id="'+this.tplId+'"></div></div></tpl>';
        this.on({
	        	'expand' : {   
	            fn : function() {  
	                if (!this.tree.rendered && this.tplId) {   
	                    this.tree.render(this.tplId);   
	                }   
	//                this.tree.expandAll();
	//                var _self=this;
	//                //延时
	//				var task = new Ext.util.DelayedTask(function(){
	//	                if(_self.passField.value!=''){
	//	                	var node=_self.tree.getNodeById(_self.passField.value);
	//		                node.select();
	//	                }
	//				});
	//				task.delay(1000); 
	            },
	            single : true  
	        },   
	        'render' : {   
	            fn : function() {   
	                this.tree.on('click', this.treeClk, this);   
	               //创建隐藏输入域并将其dom传给passField
	                if (this.passName) {   
	                    this.passField = this.getEl().insertSibling({   
	                        tag : 'input',   
	                        type : 'hidden',   
	                        name : this.passName,   
	                        id : this.passId || Ext.id()   
	                    }, 'before', true)   
	                }   
	                this.passField.value = this.passValue !== undefined   
	                        ? this.passValue   
	                        : (this.value !== undefined ? this.value : '');   
	  
	                this.el.dom.removeAttribute('name');   
	            }   
	        },   
	        'beforedestroy' : {   
	            fn : function(cmp) {   
	                this.purgeListeners();   
	                this.tree.purgeListeners();   
	            }   
	        }
        });
    },
    onViewClick : function(doFocus){
        if(doFocus !== false){
            this.el.focus();
        }
    },
    //设置传值
    setPassValue: function(id,text){
    	ComboBoxTree.superclass.setValue.call(this, text);
        if (this.passField)   
            this.passField.value = id;   
    },
    setValue : function(v){
        ComboBoxTree.superclass.setValue.call(this, v);
        if (this.passField)   
            this.passField.value = v;   
        return this;
    },
     //取值
    getValue: function(){
        return this.passField.value || this.value;
    },
    //树的单击事件处理 
    treeClk : function(node, e) { 
        if (!node.isLeaf() && !this.allowUnLeafClick) {   
            e.stopEvent();// 非叶子节点则不触发   
            return;   
        }
        this.selNode = node;
        this.setPassValue(node.id,node.getPath('text').substring(2));// 设置option值 
        this.collapse();// 隐藏option列表   
//  	
        this.fireEvent('select',this,this.tree,node);
    },
    //传入参数,并刷新树
    reload:function(baseParams){
    	this.passField.value='';
    	this.tree.getLoader().baseParams=baseParams;
    	this.tree.loader.load(this.tree.root);
    },
    /**
     * 刷新数据
     */
    doRefresh:function(){
    	this.tree.loader.load(this.tree.root);
    }
  
});   
Ext.reg('combotree', ComboBoxTree);  
