/**
 * 邮件树工具栏
 * @class QH.mail.MailTreeTopToolbar
 * @extends Ext.Toolbar
 */
QH.mail.MailTreeTopToolbar = Ext.extend(Ext.Toolbar,{
	/**
	 * @cfg {QH.mail.MailTreePanel} treePanel
	 */
	/**
	 * 
	 * @type Boolean
	 */
	enableOverflow : true,
	initComponent:function(){
		this.items = [{
			xtype:'combo',
			ref : 'findField',
			width : 100,
			emptyText : '查找节点',
			displayField : 'name',
			valueField : 'id',
			mode : 'local',
			triggerAction : 'all',
			// forceSelection:true,
			enableKeyEvents : true,
			store : new Ext.data.ArrayStore({
				fields : ['id', 'name','mailTree'],
				data : [['null','查找节点',{}]]
			}),
			listeners:{
				'focus':{
					fn : function(field) {
						field.selectText();
					}
				},
				'select':{
					fn : function(t){
						this.treePanel.root.collapse(true);
						t.fireEvent('keydown', t, '', t.getValue());
					},
					scope:this
				},
				'keydown':{
					fn : this.findFieldOnKeyDown,
					buffer : 350,
					scope : this
				}
			}
			
		}, '->', {
			iconCls : 'icon-expand-all',
			tooltip : '扩展所有节点',
			overflowText : '扩展所有节点',
			handler : function() {
				this.treePanel.root.expand(true); 
			},
			scope : this
		}, '-', {
			iconCls : 'icon-collapse-all',
			tooltip : '关闭所有节点',
			overflowText : '关闭所有节点',
			handler : function() {
				this.treePanel.root.collapse(true);
			},
			scope : this
		}]
		
		QH.mail.MailTreeTopToolbar.superclass.initComponent.call(this);
	},
	/**
	 * 查询框按键事件
	 * @param {} t
	 * @param {} e
	 * @param {} selectNodeId 临时的节点ID，用于查找后要展开的节点
	 */
	findFieldOnKeyDown : function(t, e,selectNodeId) {
		var text = t.getRawValue();
		Ext.each(this.hiddenPkgs, function(n) {
			n.ui.show();
		});
		var treePanel = this.treePanel;
		this.hiddenPkgs = [];
		var root = treePanel.root
		var reg = new RegExp(Ext.escapeRe(text), 'i');
		this.findNodeChild(root,reg);
		if (selectNodeId) {
			var node = treePanel.getNodeById(selectNodeId);
			if (node) {
				node.expand();
//				node.fireEvent('click', node);
			}
		}
	},
	// private 过滤查找子节点
	findNodeChild : function(node,reg){
		var isShow = false;
		if (reg.test(node.text))
			isShow = true;
		if (node.expanded) {
			Ext.each(node.childNodes, function(childNode) {
				var childIsShow = this.findNodeChild(childNode,reg);
				if (childIsShow)
					isShow = true;
			},this);
		}
		if (isShow)
			return true;
		else {
			node.ui.hide();
			this.hiddenPkgs.push(node);
			return false;
		}
	}
});
