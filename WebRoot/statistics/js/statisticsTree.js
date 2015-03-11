
QH.statistics.Tree = Ext.extend(Ext.tree.TreePanel,{
	autoScroll:true,
	width : 200,
	border : true,
	rootVisible :true,
	queryFlag:'MAIL',
	dataUrl:'listEmps_statistics.do',
	//rightMenu:null,
	initComponent:function(){
		var treePanel = this;
		var _self = this;
		//初始化根节点
		this.initRoot();
		//this.createRightMenu();
		this.listeners = {
			'contextmenu' : {
				fn : this.onRightMenu,
				scope : this
			}
		}
		
		var custId = 0;
		if($('modId')){
			//是否从客户模块进入,显示邮件
			custId =  $('modId').value;
		}else if(parent.$('modId')){
			//短信，传真，是用ifram嵌入，需要用parent获取
			custId =  parent.$('modId').value;
		}
		var data;
		if(custId!=0){
			data=[[1, '跟进人']];
		}else{
			data=[[1, '跟进人'],[2, '洲'],[3, '国家'], [4, '客户']];
		}
		this.findChkBox =new Ext.form.ComboBox({
								name : 'findChkSa',
								hiddenName : 'findChkSa',
								editable : false,
								width:60,
								store : new Ext.data.SimpleStore({
											fields : ["id", "name"],
											data : data
										}),
								valueField : "id",
								displayField : "name",
								mode : 'local',
								value:1,
								validateOnBlur : true,
								triggerAction : 'all',
								selectOnFocus : true,
								listeners:{
									'select':function(com,record){
										mask('查询中,请稍候...');
										treePanel.findByKeyWordPath.defer(100,treePanel,[false]);
									}
								}
							});
			this.areaKey =	new Ext.form.TextField({
								width : 60,
								emptyText : '关键字',
								name : 'areaKeySa',
								enableKeyEvents : true,
								listeners : {
									'keydown' : function(txt, e) {
										if (e.getKey() == Ext.EventObject.ENTER) {
											mask('查询中,请稍候...');
											treePanel.findByKeyWordPath.defer(100,treePanel,[false]);
										}
									}
								}
							});
				this.resultAreaNum=new Ext.form.Label({
					text : "0/0"
				});
		this.tbar = new Ext.Toolbar({
			enableOverflow : true,
			items : [this.findChkBox,this.areaKey, {
						iconCls : "page_sel",
						tooltip : '查询',
						handler :function(){
							mask('查询中,请稍候...');
							treePanel.findByKeyWordPath.defer(100,treePanel,[false]);
						} 
					}, {
						tooltip : '重置',
						iconCls : "page_del_small",
						handler : function() {
							treePanel.areaKey.setValue('');
							treePanel.resetNum();
						}
					},this.resultAreaNum]
		});

		this.loader = new Ext.tree.TreeLoader({
			dataUrl:this.dataUrl,
			listeners:{
				'beforeload':{
					fn:function(loader,node){
						var treeLv = node.attributes.treeLv;
						if(treeLv == 1){
							if($('modId') || parent.$('modId')){
								//在客户界面，业务员下面直接显示客户
								loader.dataUrl = "listCust_statistics.do"
							}else{
								//通过业务获取州
								loader.dataUrl = "listArea_statistics.do"
							}
						}else if(treeLv == 2){
							//通过客户获取订单
							if($('flag'))
								loader.dataUrl = "listOrder_statistics.do?flag="+_self.queryFlag
							else
								loader.dataUrl = "listOrder_statistics.do";
						}else if(treeLv == 4){
							//通过州获取国家
							loader.dataUrl = "listNation_statistics.do"
						}else if(treeLv == 5){
							//通过国家获取省
							loader.dataUrl = "listCust_statistics.do"
						}
//						else if(treeLv == 6){
//							//通过省获取客户
//							loader.dataUrl = "listCust_statistics.do"
//						}
						else if(treeLv == 8){
							//获取没有州，国家，省的客户
							loader.dataUrl = "listUnknow_statistics.do"
						}
						
						var custId = 0;
						if($('modId')){
							//是否从客户模块进入,显示邮件
							custId =  $('modId').value;
						}else if(parent.$('modId')){
							//短信，传真，是用ifram嵌入，需要用parent获取
							custId =  parent.$('modId').value;
						}
						//alert($('custId').value);
						loader.baseParams = {
							treeLvId:node.attributes.treeLvId,
							custId:custId
						}
					},
					scope:this
				},
				'load':{
					fn:function(loader,  node,  response){
						var treeLv = node.attributes.treeLv;
						var treeLvId = Ext.decode(node.attributes.treeLvId);
						if($('modId') == null && parent.$('modId') == null){//在客户界面不显示未知节点
							if(treeLv == 1 || treeLv >= 4 && treeLv <=5 ){
								if(treeLv == 1){
									treeLvId.area = -1
									treeLvId.country = -1 
									treeLvId.province = -1
								}else if(treeLv == 4){
									treeLvId.country = -1 
									treeLvId.province = -1
								}else if(treeLv == 5){
									treeLvId.province = -1
								}
								
								var allMailNode = loader.createNode({
								text:'未知',
								treeLv:8,//处理所有未知
								treeLvId:Ext.encode(treeLvId)
							});
								node.appendChild(allMailNode);
							}
						}
						//如果是在客户页面，默认点击第一个节点
						if($('modId') && node.firstChild && node.firstChild.attributes.treeLv == 1){
							node.firstChild.fireEvent('beforeclick',node.firstChild);
						}
					},
					scope:this
				}
			}
		});
		QH.statistics.Tree.superclass.initComponent.call(this);
//		this.on({
//			'click':{
//				scope:this,
//				fn:this.onClick
//			}
//		})
		this.on("beforeclick", this.onBeforeClick, this);
		
		this.addEvents(
			/**
			 * 传真模块点击该树节点后触发
			 * @argument treeNodeId
			 */
			'refreshfax',
			/**
			 * 短信模块点击该树节点后触发
			 * @argument treeNodeId
			 */
			'refreshsms')
	},
	initRoot : function(){
		this.root = new Ext.tree.AsyncTreeNode({
			text : "全部",
			expanded : true,
			draggable : false,
			id : "root_fac"
		});
	},
	resetNum : function() {
		this.selectOnline = 0;
		this.totalOnline = 0;
		this.nationOnline = '';
		this.keyOnline = '';
		this.resultOnline = null;
		this.resultAreaNum.setText("0/0");
	},
	// flag==true是查找上一条
	findByKeyWordPath : function(flag) {
		var tree = this;
		var findChk = tree.findChkBox.getValue();
		var text =tree.areaKey.getValue();
		if (!text){
			unmask(); 
			return;
		}
		if (findChk != tree.nationOnline || text != tree.keyOnline) {
			var custId = 0;
			if($('modId')){
				//是否从客户模块进入,显示邮件
				custId =  $('modId').value;
			}else if(parent.$('modId')){
				//短信，传真，是用ifram嵌入，需要用parent获取
				custId =  parent.$('modId').value;
			}
			// dwr查询员工的树路径
			DWREngine.setAsync(false);
			cotLoginService.findTreePathBySaArea(custId,findChk,text, function(res) {
						tree.resultOnline = res;
						tree.selectOnline = 0;
					})
			DWREngine.setAsync(true);
		}
		if (tree.resultOnline == null || tree.resultOnline.length == 0) {
			tree.resetNum();
			alertMsg('没找到任何记录!');
			unmask(); 
			return;
		}
		tree.nationOnline = findChk;
		tree.keyOnline = text;
		tree.totalOnline = tree.resultOnline.length;

		if (flag) {
			tree.selectOnline--;
		} else {
			tree.selectOnline++;
		}
		// empfind里面的值不变,一直按回车时,要跳到下一条
		if (tree.selectOnline > tree.totalOnline) {
			tree.selectOnline = 1;
		}
		if (tree.selectOnline <= 0) {
			tree.selectOnline = tree.totalOnline;
		}
		tree.selectPath(tree.resultOnline[tree.selectOnline - 1], 'text',
				function(bSuccess, node) {
					if(bSuccess){
						tree.fireEvent('beforeclick',node);
						tree.resultAreaNum.setText(tree.selectOnline + "/"
								+ tree.totalOnline);
						tree.areaKey.focus();
					}
					unmask(); 
				});
	},
	onBeforeClick:function(node,e){
		if(Ext.isFunction(QH_VIEWPORT.getMainView)){
			//节点没有点击，直接返回
			if(!node.attributes.treeLvId) return false;
			//过滤邮件列表
			this.onReladMailGrid.defer(500,this,[node]);
			//根据业务员过滤邮件树
			this.onReladMailTree.defer(500,this,[node]);
			
		}else{
			if(this.isFax){
				this.fireEvent('refreshfax',node.attributes.treeLvId);
			}else if(this.isSms){
				this.fireEvent('refreshsms',node.attributes.treeLvId);
			}else{
				var grid = QH_VIEWPORT.gridPanel;
				var store = grid.getStore();
				store.setBaseParam("treeLvId",node.attributes.treeLvId);
				store.load();
			}
		}
		node.select();
		return false;
	},
	onRightMenu:function(node,e){
		node.select();
		node.getUI().addClass('mail_node_rightmenu_select');
		var _self = this;
		treeMenu = new Ext.menu.Menu( {
        id : 'treeMenu',
        items : [new Ext.menu.Item( {
                text : '刷新',
                //iconCls : 'delete',
                handler :function(){
                	_self.getLoader().load(node);
                }
            })]
	    });
		
	    treeMenu.showAt(e.getXY());
		
	},
	onReladMailTree:function(node){
		var json = Ext.decode(node.attributes.treeLvId);
		var mailTree = QH_VIEWPORT.getMainView().mailTree;
		if(node.attributes.treeLv == 1 && clickNodeId != node.id){
			clickNodeId = node.id;
			mailTree.getLoader().baseParams = {
				empId:json.emps
			}
			mailTree.getLoader().load(mailTree.getRootNode(),function(node){
				var childNode = node.firstChild;
				if(childNode.text != "所有往来邮件"){
					if($('modId')){//客户页面过来
						//发件时，取第一个账户进行发件
						QH_VIEWPORT.getMainView().mailToolbar.statisticsTreeNode = childNode;
						QH_VIEWPORT.getMainView().mailToolbar.sendMailBtn.setDisabled(false);
						QH_VIEWPORT.getMainView().mailToolbar.reciveMailBtn.hidden = true;
					}
				}
			});
		}
	},
	onReladMailGrid:function(node){
		var mailGrid = QH_VIEWPORT.getMainView().mailGrid;
		// 邮件菜单栏按钮控制
		QH_VIEWPORT.getMainView().mailMenuToolbar.itemControlByTree();
		// 邮件工具栏按钮控制
		QH_VIEWPORT.getMainView().mailToolbar.itemControlByTree();
		// 对Grid操作
		var store = mailGrid.getStore();
		// 清空原有基本参数
		store.setBaseParam('mail.mailType','');
		store.setBaseParam('mail.nodeId.id','');
		store.setBaseParam('nodeSearchStr','');
		store.setBaseParam('mail.nodeId.accountCfgId.id','');
		var json = Ext.decode(node.attributes.treeLvId);
		store.setBaseParam("mail.belongEmpId.id",json.emps);
		store.setBaseParam("mail.orderNo",json.orderno);
		store.setBaseParam("mail.custId.id",json.cust);
		store.setBaseParam("treeLvId",node.attributes.treeLvId);
		if($('modId')){
			//如果是从客户界面显示，需要外加客户过滤条件
			store.setBaseParam("mail.custId.id",$('modId').value);
		}
		store.load();
	}
})
Ext.reg("statisticstree",QH.statistics.Tree);