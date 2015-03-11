$import('common/ext/ux/TabCloseMenu.js');


QH.mail.MainTabPanel = Ext.extend(Ext.TabPanel,{
	activeTab: 0, // 被激活的标签号，从0起,
	enableTabScroll: true, // 当标签数量超过面板宽度时，出现滚动条
	scrollIncrement: 50, // 滚动增量，默认100
	tabWidth: 120, // 默认标签宽度
	tabPosition: 'top', // 'bottom'不能滚动
	resizeTabs: true,  // 所有标签充斥着面板
	minTabWidth: 80,   // 当resizeTabs=true时，当到达该数时出现滚动条, 默认30		
	initComponent:function(){
		this.plugins = {
			ptype:'tabclosemenu',
			closeTabText : '关闭当前页',
			closeOtherTabsText : '关闭其他页',
			closeAllTabsText : '关闭所有页'
		}
		QH.mail.MainTabPanel.superclass.initComponent.call(this);
	},
	openMail : function(id,subject){
		var params = {
			mailId:id
		};
		var url = 'queryinfo_mail.do?' + Ext.urlEncode(params);
		var iframe = this.getItem("mailtab"+id);
		if(iframe != null){
			this.setActiveTab("mailtab"+id);
		}else{
			var newpanel = this.add({
				closable : true,
				id : "mailtab" + id,
				title :subject,
				html:'<iframe frameborder="0" id="mailtabIframe'+id+'" src="'+url+'" width="100%" height="100%"></iframe>'
			});
			this.setActiveTab(newpanel);
		}
	}
});

Ext.reg('mailmaintabpanel',QH.mail.MainTabPanel);