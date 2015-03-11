QH.dictionary.TabPanel = Ext.extend(Ext.TabPanel,{
	activeTab:1,
	enableTabScroll: true, // 当标签数量超过面板宽度时，出现滚动条
	initComponent:function(){
		this.plugins = new Ext.ux.TabCloseMenu({
			closeTabText : '关闭当前页',
			closeOtherTabsText : '关闭其他页',
			closeAllTabsText : '关闭所有页'
		});
		QH.dictionary.TabPanel.superclass.initComponent.call(this);
	},
	addTabItem:function(node){
		if(!node.tabItem || node.tabItem.isDestroyed){
			var url = node.attributes.url;
			var flag = Ext.urlDecode(url.substring(url.indexOf("?")+1)).flag;
			if(flag){
				var headCfg = Ext.decode(dataFlagMap[flag]);
				var grid = new QH.dictionary.GridPanel({
					title:node.text,
					headCfg:headCfg,
					flag:flag,
					closable:true
				});
				node.tabItem = grid;
			}else{
				var panel = new Ext.Panel({
					title:node.text,
					closable:true,
					html:'<iframe frameborder="0" padding="0" margin="0" height="100%" width="100%" src="'+url+'"></iframe>'
				});
				node.tabItem = panel;
			}
			this.add(node.tabItem);
		}
		this.setActiveTab(node.tabItem);
	}
});
Ext.reg('dictionarytabpanel',QH.dictionary.TabPanel);

//xtype:'tabpanel',
//	    		plugins:new Ext.ux.TabCloseMenu(),
//	    		activeTab:1,
//	    		enableTabScroll: true, // 当标签数量超过面板宽度时，出现滚动条
//	//					scrollIncrement: 50, // 滚动增量，默认100
//	    		itemCount:0, // card里面加入的Item数,在树点击时加入
//	    		listeners:{
//	    			'tabchange':function(tab,grid){
//	    				EXT_VIEWPORT.mailGrid = grid;
//	    				if(!grid)
//	    					return;
//	    				EXT_VIEWPORT.mailTree.getSelectionModel().select(grid.node);
//	    				
//	    				grid.store.reload();
//						// 更新邮件信息面板
//						mailInfoRefreshFn();
//	    			}
//	    		}