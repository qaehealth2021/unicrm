QH.customer.Tree = Ext.extend(Ext.tree.TreePanel, {
	autoScroll : true,
	width : 200,
	border : true,
	rootVisible : true,
	dataUrl : 'listArea_customer.do',
	selectOnline : 0,
	totalOnline : 0,
	nationOnline : '',
	keyOnline : '',
	resultOnline : null,
	initComponent : function() {
		var treePanel = this;
		// 初始化根节点
		this.initRoot();
		this.tbar = new Ext.Toolbar({
			enableOverflow : true,
			items : [new Ext.form.ComboBox({
								id : 'findChkBox',
								name : 'findChk',
								hiddenName : 'findChk',
								editable : false,
								width:50,
								store : new Ext.data.SimpleStore({
											fields : ["id", "name"],
											data : [[1, '国家'], [2, '省份']]
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
										treePanel.findByKeyWordPath(false);
									}
								}
							}), new Ext.form.TextField({
								width : 60,
								emptyText : '关键字',
								id : 'areaKey',
								name : 'areaKey',
								enableKeyEvents : true,
								listeners : {
									'keydown' : function(txt, e) {
										if (e.getKey() == Ext.EventObject.ENTER) {
											treePanel.findByKeyWordPath(false);
										}
									}
								}
							}), {
						iconCls : "page_sel",
						tooltip : '查询',
						handler : this.findByKeyWordPath.createDelegate(this,
								[false])
					}, {
						tooltip : '重置',
						iconCls : "page_del_small",
						handler : function() {
							Ext.getCmp('areaKey').setValue('');
							treePanel.resetNum();
						}
					}, {
						xtype : 'label',
						id : 'resultAreaNum',
						text : "0/0"
					}]
		});

		this.loader = new Ext.tree.TreeLoader({
					dataUrl : this.dataUrl,
					listeners : {
						'beforeload' : {
							fn : function(loader, node) {
								var treeLv = node.attributes.treeLv;
								if (treeLv == 1) {
									loader.dataUrl = "listCountry_customer.do"
								} else if (treeLv == 2) {
									loader.dataUrl = "listProvince_customer.do"
								}
								loader.baseParams = {
									treeLvId : node.attributes.treeLvId
								}
							},
							scope : this
						}
					}
				});
		QH.customer.Tree.superclass.initComponent.call(this);
		// this.on({
		// 'click':{
		// scope:this,
		// fn:this.onClick
		// }
		// })
		this.on("beforeclick", this.onBeforeClick, this);
	},
	initRoot : function() {
		this.root = new Ext.tree.AsyncTreeNode({
					text : "所有区域",
					treeLvId : '{area:null,country:null,province:null}',
					expanded : true,
					draggable : false,
					id : "root_region"
				});
	},
	onBeforeClick : function(node, e) {
		var grid = QH_VIEWPORT.gridPanel;
		var store = grid.getStore();
		var json = Ext.decode(node.attributes.treeLvId);
		store.setBaseParam("customer.areaId.id", json.area);
		store.setBaseParam("customer.nationId.id", json.country);
		store.setBaseParam("customer.proviceId.id", json.province);
		store.load();
		node.select();
		return false;
	},
	resetNum : function() {
		this.selectOnline = 0;
		this.totalOnline = 0;
		this.nationOnline = '';
		this.keyOnline = '';
		this.resultOnline = null;
		Ext.getCmp('resultAreaNum').setText("0/0");
	},
	// flag==true是查找上一条
	findByKeyWordPath : function(flag) {
		var tree = this;
		var findChk = Ext.getCmp('findChkBox').getValue();
		var text = Ext.getCmp('areaKey').getValue();
		if (!text)
			return;
		if (findChk != tree.nationOnline || text != tree.keyOnline) {
			// dwr查询员工的树路径
			DWREngine.setAsync(false);
			cotLoginService.findTreePathByArea(findChk,text, function(res) {
						tree.resultOnline = res;
						tree.selectOnline = 0;
					})
			DWREngine.setAsync(true);
		}
		if (tree.resultOnline == null || tree.resultOnline.length == 0) {
			tree.resetNum();
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
					var grid = QH_VIEWPORT.gridPanel;
					var store = grid.getStore();
					var json = Ext.decode(node.attributes.treeLvId);
					store.setBaseParam("customer.areaId.id", json.area);
					store.setBaseParam("customer.nationId.id", json.country);
					store.setBaseParam("customer.proviceId.id", json.province);
					store.load();
					Ext.getCmp('resultAreaNum').setText(tree.selectOnline + "/"
							+ tree.totalOnline);
					Ext.getCmp('areaKey').focus();
				});
	}
})
Ext.reg("customertree", QH.customer.Tree);