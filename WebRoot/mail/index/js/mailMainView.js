QH.mail.MainViewPanel = Ext.extend(Ext.Panel,{
	layout:'border',
	border:false,
	initComponent:function(){
		this.detailPanelPosition = this.detailPanelPosition || MAIL_DETAIL_PANEL_POSITION.RIGHT;
		this.items = [{
			region:'north',
			height:45,
			ref:'toolbar',
			layout:'border',
			border:false,
			items:[{
				region:'north',
				ref:'../mailMenuToolbar',
				xtype:'mailmenutoolbar',
				height:1
			},{
				region:'center',
				xtype:'mailtoolbar',
				ref:'../mailToolbar',
				height:40
			}]
		},{
			region:'west',
			layout:'border',
			items:[{
				xtype:'mailtreepanel',
				ref:'../mailTree',
				hidden:false,
				region:"center"
			},{
				xtype:'statisticstree',
				region:'west',
				ref:'../statisticsTree',
				margins:'0  0 0',
				width:200,
				collapseMode:'mini',
				split:true
			}],
			width:$('modId')?200:380,
    		minSize:130,
			margins:'5 0 5 5',
			collapseMode:'mini',
			split:true
		},{
			region:'center',
			border:false,
			layout:'border',
			ref:'infoPanel',
			margins:'5 0 5 0',
			items:[{
				region:'center',
				ref:'centerPanel',
				layout:'fit',
				items:[{
					xtype:'mailgrid',
					ref:'../../mailGrid',
					border:false
				}]
			},{
				region:'east',
				ref:'westPanel',
				split:true,
				collapseMode:'mini',
				layout:'fit',
				width:350,
				minSize:200,
				items:[{
					ref:'../../detailPanel',
					xtype:'maildetailpanel',
					hidden:true,
		    		border:false
				}]
			},{
				region:'south',
				ref:'southPanel',
				layout:'fit',
				height:$('modId')?1:200,//在客户模块中显示，这隐藏邮件详细信息,
				split:true,
				collapseMode:'mini',
				items:[]
			}]
		},{
			region:'east',
			xtype:'maildealingspanel',
			ref:'dealingsPanel',
			margins:'5 5 5 0',
			hidden:false,
			split:true,
			collapseMode:'mini',
			//collapsible:true,
			collapsed:true,
			width:240,
			border:false
		}];
		
		QH.mail.MainViewPanel.superclass.initComponent.call(this);
	},
	/**
	 * 控制邮件信息面板，显示位置
	 * 原理：分成中，西，南布局，各个面板都多一个容器
	 * 		只控制显示隐藏，其它关键面板切换放入这3个容器中
	 * 		中容器固定不能隐藏
	 * @param {} position
	 */
	showDetailPanel : function(position){
		this.detailPanelPosition = position || this.detailPanelPosition;
		var infoPanel = this.infoPanel;
		if(this.detailPanelPosition == MAIL_DETAIL_PANEL_POSITION.RIGHT){	// 信息面板显示在右边
			// 显示西容器，将mailGrid放入该面板，中间容器放入detailPanel，隐藏南容器
			infoPanel.westPanel.show();	
			infoPanel.westPanel.add(this.detailPanel);
			infoPanel.centerPanel.add(this.mailGrid);
			infoPanel.southPanel.hide();
		}else if(this.detailPanelPosition == MAIL_DETAIL_PANEL_POSITION.BOTTOM){// 信息面板显示在下面
			// 显示南容器，将detailPanel放入该面板，中间容器放入mailGrid，隐藏西容器
			infoPanel.southPanel.show();
			infoPanel.southPanel.add(this.detailPanel);
			infoPanel.centerPanel.add(this.mailGrid);
			infoPanel.westPanel.hide();
		}else{// 信息面板不显示
			// 隐藏西、南容器，将detailPanel暂时放入南容器，中间容器放入mailGrid
			infoPanel.southPanel.add(this.detailPanel);
			infoPanel.centerPanel.add(this.mailGrid);
			infoPanel.southPanel.hide();
			infoPanel.westPanel.hide();
		}
		this.detailPanelControl();
		this.doLayout();
	},
	/**
	 * 控制邮件信息数据加载
	 */
	detailPanelControl:function(){
		var detailPanel = this.detailPanel;
		var selModel = this.mailGrid.getSelectionModel();
		// 加载数据
		if(this.detailPanelPosition != MAIL_DETAIL_PANEL_POSITION.CLOSE){ // 不为关闭
			if(selModel.getCount() > 0){
				var record = selModel.getSelected();
				detailPanel.loadMailRecord(record);
				detailPanel.show();
			}else{
				detailPanel.hide();
			}
		}
	},
	/**
	 * 邮件选择改变后，控制所有面板
	 */
	recordAllControl:function(){
		// 邮件菜单栏按钮控制
		QH_VIEWPORT.getMainView().mailMenuToolbar.itemControlByGird();
		// 邮件工具栏按钮控制
		QH_VIEWPORT.getMainView().mailToolbar.itemControlByGird();
		// 详情面板
		QH_VIEWPORT.getMainView().detailPanelControl();
		// 历史
		QH_VIEWPORT.getMainView().dealingsPanel.dealingsContorl();
	}
});
Ext.reg('mailmainviewpanel',QH.mail.MainViewPanel);