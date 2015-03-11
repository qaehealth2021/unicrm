
QH.mail.MailMoveTreeWindow = Ext.extend(QH.Window, {
	width : 300,
	height : 300,
	shadow : true,
	constrain : true,
	title : "移动邮件到",
	resizable : true,
	layout : 'fit',
	modal : true,
	cfgId : '',
	initComponent : function() {
		var treeWin = this;
		this.tree = new QH.mail.MailMoveTreePanel({
			cfgId : treeWin.cfgId
		});
		this.tree.on('click', function(node, e) {
			// 可移动时，确定按钮为可用
			this.okBtn.setDisabled(!QH.mail.TreeGridDataMoveFn(node));
		},this);
		this.items = [this.tree];
		this.buttons = [{
			text : '确定',
			ref : '../okBtn',
			disabled : true,
			scope : this,
			handler : this.moveMailToNodeFn
		}, {
			text : '取消',
			handler : function() {
				treeWin.close();
			}
		}]
		QH.mail.MailMoveTreeWindow.superclass.initComponent.call(this);
	},
	/**
	 * 移动邮件
	 * @param {} target
	 */
	moveMailToNodeFn : function(){
		var treeWin = this;
		var node = this.tree.getSelectionModel().getSelectedNode();
		var records = QH_VIEWPORT.getMainView().mailGrid.getSelectionModel().getSelections();
		var mailIds = [];
		Ext.each(records, function(record) {
			mailIds.push(record.id);
		});
		mailTreeService.moveMailToNode(node.id, mailIds, function(result) {
			QH_VIEWPORT.getMainView().mailGrid.getStore().reload();
			treeWin.close();
		});
	}
});
QH.mail.MailMoveTreePanel = Ext.extend(Ext.tree.TreePanel, {
	ref : 'mailTree',
	enableDD : false,// 是否可以拖拽
	border : true, // 边框
	useArrows : false,// 文件夹前显示的图标改变了不在是+号了
	animate : true,// 动画效果
	containerScroll : true,
	autoScroll : true,
	rootVisible : false,// 隐藏根节点
	cfgId : '',
	hiddenPkgs : [],
	initComponent : function() {
		this.root = new Ext.tree.AsyncTreeNode({
			text : '员工邮箱',
			expanded : true,
			draggable : false,
			id : "root_fac"
		});
		// 给树节点排序
		this.initTreeSort();
		
		this.loader = new Ext.tree.TreeLoader({
			dataIsList:true,
			dataUrl:"list_mailtree.do?mailTree.accountCfgId.id="+this.cfgId,
			listeners:{
				'load':{
					fn:function(loader,node){
						this.root.expandChildNodes();
					},
					scope:this
				}
			}
		});
		QH.mail.MailMoveTreePanel.superclass.initComponent.call(this);
	},
	/**
	 * 给树节点排序
	 */
	initTreeSort : function(){
		this.treeSorter = new Ext.tree.TreeSorter(this,{
    		sortType : function(node){
    			var treeData = node.attributes;
    			var type = treeData.nodeType;
    			// 将固定的节点排在前面
    			if(treeData.nodeTag == 'N'){
    				switch(type){
    					case MAIL_NODE_TYPE.R : return "!1";
    					case MAIL_NODE_TYPE.S : return "!2";
    					case MAIL_NODE_TYPE.C : return "!3";
    					case MAIL_NODE_TYPE.D : return "!4";
    					case MAIL_NODE_TYPE.P : return "!5";
    				}
    			}
				return node.text.toUpperCase();
    		}
		});
	}
});