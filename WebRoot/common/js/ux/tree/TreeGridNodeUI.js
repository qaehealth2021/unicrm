
/**
 * @author zhao
 * @class QH.ux.tree.TreeGridNodeUI
 * @extends Ext.tree.TreeNodeUI
 */
QH.ux.tree.TreeGridNodeUI = Ext.extend(Ext.tree.TreeNodeUI, {
    isTreeGridNodeUI: true,

    renderElements : function(n, a, targetNode, bulkRender){
        var t = n.getOwnerTree(),
            cols = t.columns,
            c = cols[0],
            i, buf, len;
        this.indentMarkup = n.parentNode ? n.parentNode.ui.getChildIndent() : '';
        buf = [
             '<tbody class="x-tree-node">',
                '<tr ext:tree-node-id="', n.id ,'" class="x-tree-node-el x-tree-node-leaf ', a.cls, '">',
                    '<td class="x-treegrid-col">',
                        '<span class="x-tree-node-indent">', this.indentMarkup, "</span>",
                        '<img src="', this.emptyIcon, '" class="x-tree-ec-icon x-tree-elbow">',
                        '<img src="', a.icon || this.emptyIcon, '" class="x-tree-node-icon', (a.icon ? " x-tree-node-inline-icon" : ""), (a.iconCls ? " "+a.iconCls : ""), '" unselectable="on">',
                        '<input class="x-tree-node-cb" type="checkbox" />',
                        '<a hidefocus="on" class="x-tree-node-anchor" href="', a.href ? a.href : '#', '" tabIndex="1" ',
                            a.hrefTarget ? ' target="'+a.hrefTarget+'"' : '', '>',
                        '<span unselectable="on">', (c.tpl ? c.tpl.apply(a) : a[c.dataIndex] || c.text), '</span></a>',
                    '</td>'
        ];
        for(i = 1, len = cols.length; i < len; i++){
            c = cols[i];
            buf.push(
                    '<td class="x-treegrid-col ', (c.cls ? c.cls : ''), '">',
                        '<div unselectable="on" class="x-treegrid-text"', (c.align ? ' style="text-align: ' + c.align + ';"' : ''), '>',
                            (c.tpl ? c.tpl.apply(a) : a[c.dataIndex]),
                        '</div>',
                    '</td>'
            );
        }

        buf.push(
            '</tr><tr class="x-tree-node-ct"><td colspan="', cols.length, '">',
            '<table class="x-treegrid-node-ct-table" cellpadding="0" cellspacing="0" style="table-layout: fixed; display: none; width: ', t.innerCt.getWidth() ,'px;"><colgroup>'
        );
        for(i = 0, len = cols.length; i<len; i++) {
            buf.push('<col style="width: ', (cols[i].hidden ? 0 : cols[i].width) ,'px;" />');
        }
        buf.push('</colgroup></table></td></tr></tbody>');

        if(bulkRender !== true && n.nextSibling && n.nextSibling.ui.getEl()){
            this.wrap = Ext.DomHelper.insertHtml("beforeBegin", n.nextSibling.ui.getEl(), buf.join(''));
        }else{
            this.wrap = Ext.DomHelper.insertHtml("beforeEnd", targetNode, buf.join(''));
        }

        this.elNode = this.wrap.childNodes[0];
        this.ctNode = this.wrap.childNodes[1].firstChild.firstChild;
        var cs = this.elNode.firstChild.childNodes;
        this.indentNode = cs[0];
        this.ecNode = cs[1];
        this.iconNode = cs[2];
        this.checkbox = cs[3];
        this.anchor = cs[4];
        this.textNode = cs[4].firstChild;
        
        this.colNodes = [];
        this.colNodeObj = {};
        c = cols[0];
        this.colNodes.push(this.updateNodePro(this.textNode,c,a));
        this.colNodeObj[c.dataIndex] = this.colNodes[0];
        
        var childNodes = this.elNode.childNodes;
        var childNode;
        for(i = 1, len = cols.length; i < len; i++){
            c = cols[i];
            childNode = childNodes[i].firstChild;
            this.colNodes.push(this.updateNodePro(childNode,c,a));
            this.colNodeObj[c.dataIndex] = this.colNodes[i];
        }
    },
	// private 设置节点属性
	// node　节点，col　列，a　数据
	updateNodePro : function(node,col,data){
        node.value = data[col.dataIndex];
        node.tpl = col.tpl || new Ext.XTemplate('{'+col.dataIndex+'}');
        return node;
	},
    // private
    animExpand : function(cb){
        this.ctNode.style.display = "";
        QH.ux.tree.TreeGridNodeUI.superclass.animExpand.call(this, cb);
    },
    /**
	 * 更新对应的列值
	 * @param {} index
	 */
	updateColNode : function(dataIndex,data){
		var node = this.colNodeObj[dataIndex];
		if(node){
			node.innerHTML = node.tpl.apply(data);
			node.value = data[dataIndex];
		}
	},
	getColNodeValue : function(dataIndex){
		var node = this.colNodeObj[dataIndex];
		if(node)
			return node.value;
	},
	/**
     * 更新树grid行值
     * @param {} changes
     * @param {} node
     */
	updateRowData:function(changes){
		for(var p in changes){
			this.updateColNode(p,changes);
		}
	},
	getColNodes: function(){
		return this.colNodes;
	},
	getColNodeObj:function(){
		return this.colNodeObj;
	},
	updateExpandIcon : function(){
        if(this.rendered){
            var n = this.node,
                c1,
                c2,
                cls = n.isLast() ? "x-tree-elbow-end" : "x-tree-elbow",
                hasChild = n.hasChildNodes();
            if(hasChild || n.attributes.expandable){
                if(n.expanded){
                    cls += "-minus";
                    c1 = "x-tree-node-collapsed";
                    c2 = "x-tree-node-expanded";
                }else{
                    cls += "-plus";
                    c1 = "x-tree-node-expanded";
                    c2 = "x-tree-node-collapsed";
                }
                if(this.wasLeaf){
                    this.removeClass("x-tree-node-leaf");
                    this.wasLeaf = false;
                }
                if(this.c1 != c1 || this.c2 != c2){
                    Ext.fly(this.elNode).replaceClass(c1, c2);
                    this.c1 = c1; this.c2 = c2;
                }
            }else{
                if(!this.wasLeaf){
                    Ext.fly(this.elNode).replaceClass("x-tree-node-collapsed", "x-tree-node-leaf");
                    delete this.c1;
                    delete this.c2;
                    this.wasLeaf = true;
                }
            }
            var ecc = "x-tree-ec-icon "+cls;
            if(this.ecc != ecc){
                this.ecNode.className = ecc;
                this.ecc = ecc;
            }
        }
    }
});
Ext.ux.tree.TreeGridNodeUI =  QH.ux.tree.TreeGridNodeUI;