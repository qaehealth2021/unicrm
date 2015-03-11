
$import('mail/index/js/mailTreeFn.js');
$import('mail/index/js/mailTreeRightMenu.js');
$import('mail/index/js/mailTreeToolbar.js');

/**
 * 邮件树
 * @class QH.mail.MailTreePanel
 * @extends QH.tree.TreePanel
 */
QH.mail.MailTreePanel = Ext.extend(QH.tree.TreePanel,{
	autoScroll:true,
	containerScroll : true,
	rootVisible:false,
	useArrows : true,// 文件夹前显示的图标改变了不在是+号了
	
	enableDD : true,// 是否可以拖拽
	enableDrop : true,
	ddGroup : 'GridDD',
	dropConfig : {
		ddGroup : 'GridDD',
		// override
		getDropPoint : function(e, n, dd) {
			var tn = n.node;
			if(dd.grid){
				return QH.mail.TreeGridDataMoveFn(tn) ? "append" : false;
			}else{
				return QH.mail.TreeNodeMailMoveFn(tn) ? "append" : false;
			}
		},
		appendOnly : true
	},
	nodesMap : {},  // 存放树节点Map Key树节点ID , value树节点
	initComponent:function(){
		var treePanel = this;
		// 根节点
		this.initRoot();
		// 给树节点排序
		this.initTreeSort();
		// 树面板上面工具栏
		this.tbar = new QH.mail.MailTreeTopToolbar({treePanel:this});
		// 树loader
		this.initTreeLoad();
		// 初始化右键菜单
		this.rightMenu = new QH.mail.TreeRightMenu();
		
		QH.mail.MailTreePanel.superclass.initComponent.call(this);
		
	},
	initTreeLoad : function(){
		this.loader = this.loader || new QH.mail.TreeLoader({
			treePanel:this,
			listeners:{
				'load' : {
					scope : this,
					fn : this.onLoad
				}
			}
		});
	},
	/**
	 * 初始化事件
	 */
	initEvents : function(){
        QH.mail.MailTreePanel.superclass.initEvents.call(this);
        this.on({
			'click':{
				fn : this.onClick,
				scope : this
			},
			'enddrag':{
				fn : this.onEndDrag,
				buffer:100,
				scope : this
			},
			'beforenodedrop' : {
				fn : function(e) {
					if(e.data.grid)
						this.moveMailToNodeFn(e.target,e.data.grid);
					else
						this.moveToNodeFn(e);
				},
				scope : this
			},
			'contextmenu' : {
				fn : this.onRightMenu,
				scope : this
			}
		});
	},
	/**
	 * 创建根节点
	 */
	initRoot : function(){
		this.root = new Ext.tree.AsyncTreeNode({
			text : '员工邮箱',
			expanded : true,
			draggable : false,
			id : "root_fac"
		});
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
	},
	/**
	 * 树加载完成事件
	 * @param {} treeLoader
	 * @param {} node
	 * @param {} response
	 */
	onLoad : function(treeLoader, node, response) {
		// 将账号节点加入查找节点combo
		var findField = this.getTopToolbar().findField;
		if (node.hasChildNodes()) {
			var datas = [];
			Ext.each(node.childNodes, function(childNode) {
				datas.push([
					childNode.attributes.id,
					childNode.text,
					childNode.attributes
				]);
			});
			findField.getStore().loadData(datas,true);
		}
	},
	/**
	 * 显示右菜单事件
	 */
	onRightMenu : function(node, e){
		var treeData = node.attributes;
		if(treeData.nodeType == MAIL_NODE_TYPE.P)
			return ;
		node.getUI().addClass('mail_node_rightmenu_select');
		var rightMenu = this.rightMenu;
		// 为不可修改节点时，重命名与删除菜单不可用
		if(treeData.nodeTag && treeData.nodeTag.indexOf('N') != -1){
			rightMenu.delBtn.disable();
			rightMenu.reNameBtn.disable();
		}else{
			rightMenu.delBtn.enable();
			rightMenu.reNameBtn.enable();
		}
		// 不为查询节点时，属性菜单不可用
		if(treeData.nodeType == MAIL_NODE_TYPE.Q){
			rightMenu.propBtn.enable();
		}else{
			rightMenu.propBtn.disable();
		}
		
		rightMenu.selNode = node;
		rightMenu.showAt(e.getXY());
	},
	/**
	 * 获得基本固定节点
	 * @param {} nodeType 节点类型
	 * @param {} node 如果node不存在，则取选中节点
	 */
	getBaseNode : function(nodeType,node){
		node = node || QH_VIEWPORT.getMainView().mailTree.getSelectionModel().getSelectedNode(); // 初选中的节点
		var accountNode = this.getAccountNode(node);
		var attr;
		if(accountNode.hasChildNodes() && !accountNode["nodeType_"+nodeType]){
			Ext.each(accountNode.childNodes, function(childNode) {
				attr = childNode.attributes;
				if( attr.nodeTag && attr.nodeTag.indexOf(MAIL_NODE_TAG.N) != -1 && attr.nodeType == nodeType){
					accountNode["nodeType_"+nodeType] = childNode;
					return false;
				}
					
			},this);
		}
		return accountNode["nodeType_"+nodeType];
	},
	/**
	 * 获得节点所在的账号节点
	 * @param {} node
	 */
	getAccountNode : function(node){
		if(node.attributes.nodeType == MAIL_NODE_TYPE.A){
			return node;
		}else{
			return this.getAccountNode(node.parentNode);
		}
	},
	/**
	 * 移动邮件
	 * @param {} target
	 */
	moveMailToNodeFn : function(target,grid){
		var records = grid.getSelectionModel().getSelections();
		var mailIds = [];
		Ext.each(records, function(record) {
			mailIds.push(record.id);
		});
		mailTreeService.moveMailToNode(target.id, mailIds, function(result) {
			grid.getStore().reload();
		});
	},
	/**
	 * 移动树节点
	 * @param {} e
	 */
	moveToNodeFn : function(e){
		var target = e.target;
		var ddNode = e.data.node;
		QH_LOADMASK = new Ext.LoadMask(QH_VIEWPORT.getMainView().getEl(),{msg:'节点移动中。。。'});
		QH_LOADMASK.show();
		mailTreeService.moveToNode(ddNode.id,target.id,function(){
			QH_LOADMASK.hide();
		});
	},
	// 拖放后事件
	onEndDrag : function(tree,node,e){
		tree.getSelectionModel().select(node);
		tree.fireEvent('click',node);
	},
	/**
	 * 树单击事件
	 * @param {} node
	 * @param {} e
	 * @return {Boolean}
	 */
	onClick : function(node, e) {
		// 节点类型
		var nodeType = node.attributes.nodeType;
		if(nodeType == MAIL_NODE_TYPE.A){// 点击到账号节点上，则选中收件箱，并展开账号节点
			node.expand();
			node.firstChild.fireEvent('click',node.firstChild,e);
			this.getSelectionModel().select(node.firstChild);
			return false;
		}
		// 邮件菜单栏按钮控制
		QH_VIEWPORT.getMainView().mailMenuToolbar.itemControlByTree();
		// 邮件工具栏按钮控制
		QH_VIEWPORT.getMainView().mailToolbar.itemControlByTree();
		// 对Grid操作
		var mailGrid = QH_VIEWPORT.getMainView().mailGrid;
		
		mailGrid.setGridType(nodeType);
		
		var store = mailGrid.getStore();
		// 清空原有基本参数
		store.setBaseParam('mail.mailType','');
		store.setBaseParam('mail.nodeId.id','');
		store.setBaseParam('nodeSearchStr','');
		store.setBaseParam('mail.nodeId.accountCfgId.id','');
		
		if(nodeType == MAIL_NODE_TYPE.Q){
			var searchWhere = Ext.decode(node.attributes.searchWhere);
			var wheres = [];
			var mailFields; // 可能存在|来分割属性，用于不同属性共同判断一样的值
			var mailWhere; // 条件
			Ext.each(searchWhere.wheres,function(data){
				mailFields = data.mailField.split('|'); 
				for(var i = 0; i< mailFields.length; i++){
					mailWhere = data.mailWhere;
					if(mailWhere.indexOf('{value}')!=-1 || mailWhere.indexOf('{field}')!=-1){
						while(mailWhere.indexOf('{value}')!=-1){
							mailWhere = mailWhere.replace('{value}',data.mailValue);
						}
						if(mailWhere.indexOf('{field}')!=-1){
							while(mailWhere.indexOf('{field}')!=-1){
								mailWhere = mailWhere.replace('{field}',mailFields[i]);
								mailFields[i] = mailWhere;
							}
						}else{
							mailFields[i] = mailFields[i] + " " + mailWhere;
						}
						
					}else
						mailFields[i] = mailFields[i] + " " + mailWhere + " '" + (Ext.isDate(data.mailValue)?Ext.util.Format.date(data.mailValue,'Y-m-d'):data.mailValue) + "'";
				}
				if(mailFields.length >1) // 存在用|来分割属性，用( or )包括起来
					wheres.push("("+mailFields.join(" or ")+")");
				else
					wheres.push(mailFields[0]);
			},this);
			store.setBaseParam('mail.nodeId.accountCfgId.id',node.attributes.accountCfgId.id);
			store.setBaseParam('nodeSearchStr',wheres.join(searchWhere.andOr));
		}else{
			if(Ext.isNumber(node.id)){
//				if(node.attributes.nodeType == MAIL_NODE_TYPE.R){
//					//点击收件箱节点，查所有往来邮件
//					store.setBaseParam('mail.nodeId.accountCfgId.id',node.attributes.accountCfgId.id);
//					store.setBaseParam('mailTypes', [MAIL_TYPE.RECIVE,MAIL_TYPE.SEND]);
//				}else{
//					store.setBaseParam('mail.nodeId.id',node.id);
//				}
				store.setBaseParam('mail.nodeId.id',node.id);
			}else{
				store.setBaseParam('mail.mailType',node.attributes.nodeType == MAIL_NODE_TYPE.R ? MAIL_TYPE.RECIVE : MAIL_TYPE.SEND);
			}
		}
		var statisticsTree = QH_VIEWPORT.getMainView().statisticsTree;
		var statNode = statisticsTree.getSelectionModel().getSelectedNode();
		if(statNode){
			var json = Ext.decode(statNode.attributes.treeLvId);
			store.setBaseParam("mail.belongEmpId.id",json.emps);
			store.setBaseParam("mail.orderNo",json.orderno);
			store.setBaseParam("mail.custId.id",json.cust);
		}
		if($('modId')){
			//客户页面过滤
			store.setBaseParam("mail.custId.id",$('modId').value);
		}
		store.setBaseParam(QH_PAGE_START_NAME, QH_PAGE_START);
		store.load();
	}
});

Ext.reg('mailtreepanel',QH.mail.MailTreePanel);

QH.mail.TreeLoader = Ext.extend(Ext.tree.TreeLoader,{
	/**
	 * @cfg {QH.mail.MailTreePanel} treePanel
	 */
	/**
	 * 
	 * @type Boolean
	 */
	dataIsList:true,
	dataUrl:"list_mailtree.do",
	processResponse : function(response, node, callback, scope){
		var allMailNode = this.createNode({
			nodeName:'所有往来邮件',
			nodeTag:'N',
			nodeType:MAIL_NODE_TYPE.A,
			children:[{
				nodeTag:'N',
				nodeType:MAIL_NODE_TYPE.R
			},{
				nodeTag:'N',
				nodeType:MAIL_NODE_TYPE.S
			}]
		});
		Ext.tree.TreeNode.prototype.childrenRendered
		node.appendChild(allMailNode);
		QH.mail.TreeLoader.superclass.processResponse.call(this,response, node, callback, scope);
		if(node.childNodes.length <=1){
			node.removeAll();
		}
		this.setNodesMap(this.treeDataObj);
    },
    /**
     * 将所有树节点数据存放到nodesMap中
     */
    setNodesMap:function(nodeDatas,parentData){
    	if(Ext.isArray(nodeDatas)){
    		Ext.each(nodeDatas,function(data){
    			data.parentData = parentData;
		    	this.treePanel.nodesMap[data.id] = data;
		    	this.setNodesMap(data.children,data);
    		},this);
    	}
    }
});
