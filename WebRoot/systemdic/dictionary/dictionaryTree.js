
/**
 * 
 * @class QH.dictionary.TreePanel
 * @extends Ext.tree.TreePanel
 */
QH.dictionary.TreePanel = Ext.extend(Ext.tree.TreePanel,{      
    autoScroll:true,   
    animate:true,   
    enableDD:true,   
    containerScroll: true,   
    initComponent:function(){
    	this.root = new Ext.tree.AsyncTreeNode({   
	         text: '数据字典', 
	         expanded :true,
	         rootVisible : false,// 隐藏根节点
	         draggable:false,   
	         id:"1" 
	      }); 
    	this.loader = new Ext.tree.TreeLoader({    
			dataUrl:"listdictreemodule.do" ,
			processResponse : function(response, node, callback, scope){
		        var json = response.responseText;
		        try {
		            var o = response.responseData || Ext.decode(json);
		            
		            node.beginUpdate();
		            for(var i = 0, len = o.length; i < len; i++){
		            	delete o[i].href; // 删除链接属性，防止跳转
		            	
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
       	});
       	QH.dictionary.TreePanel.superclass.initComponent.call(this);
       	this.on('click',function(node,e){
       		QH_VIEWPORT.tabPanel.addTabItem(node);
       	});
    }
});
    
Ext.reg('dictionarytreepanel',QH.dictionary.TreePanel);