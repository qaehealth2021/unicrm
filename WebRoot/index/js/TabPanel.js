
QH.ux.TabPanel = Ext.extend(Ext.TabPanel,{
	activeTab: 0, // 被激活的标签号，从0起,
	enableTabScroll: true, // 当标签数量超过面板宽度时，出现滚动条
	scrollIncrement: 50, // 滚动增量，默认100
	tabWidth: 120, // 默认标签宽度
	tabPosition: 'top', // 'bottom'不能滚动
	resizeTabs: true,  // 所有标签充斥着面板
	minTabWidth: 80,   // 当resizeTabs=true时，当到达该数时出现滚动条, 默认30		
	plugins: new Ext.ux.TabCloseMenu({
		closeTabText : '关闭当前页',
		closeOtherTabsText : '关闭其他页',
		closeAllTabsText : '关闭所有页'
	}),
	initComponent:function(){
		this.items = [{
			title:'首页',
			layout:'fit',
//			html:'<iframe frameborder="0" src="http://www.baidu.com" width="100%" height="100%"></iframe>'
			items:[{
//				bodyStyle:'background-image:url(/unicrm/index/wallpapers/desk.jpg)',
				xtype:'modulepicview',
				bigSize:100,
				ref:'../menuView'
			}]
		}]
		QH.ux.TabPanel.superclass.initComponent.call(this);
	},
	addPanel : function(id,nodeName,url,imgUrl){
		var iframe = this.getItem("tab"+id);
		if(iframe != null){
			this.setActiveTab("tab"+id);
			document.getElementById("tabIframe"+id).src=url;
		}else{
			//如果不是为"没有图片"的路径,即当这个imgUrl!="common/images/zwtp.png"时
			if(imgUrl.charAt(0)!='c'){
				imgUrl='..'+imgUrl;
			}
			var newpanel = this.add({
				closable : true,
				id : "tab" + id,
				title : '<span style="height:16px;width:16px;float:left;"><img src="'+imgUrl+'" height=16 width=16/></span>&nbsp;&nbsp;'+nodeName,
				html:'<iframe frameborder="0" id="tabIframe'+id+'" src="'+url+'" width="100%" height="100%"></iframe>'
			});
			this.setActiveTab(newpanel);
		}
	}
});

Ext.reg('qhtabpanel',QH.ux.TabPanel);