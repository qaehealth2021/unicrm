
/**
 * 
 * @class QH.mail.Toolbar
 * @extends Ext.Toolbar
 */
QH.mail.Toolbar = Ext.extend(Ext.Toolbar,{
	enableOverflow:true,
	statisticsTreeNode:null,//statisticsTree选择的的节点
	initComponent:function(){
		this.defaults = {
			scale:'large'
		}
		this.items = [{
			text:'接收',
	       	tooltip:'手动接收新邮件',
        	iconCls:'mail_recive',
        	ref:'reciveMailBtn',
        	disabled:true,
        	//hidden:$('modId')?true:false,//客户界面隐藏
        	scope:this,
        	handler:QH.mail.ReciveMailFn
		},'-',{
			text:'撰写',
			tooltip:'以当前登录者的邮箱发送',
        	iconCls:'mail_add',
        	ref:'sendMailBtn',
        	disabled:true,
			scope:this,
        	sendType:MAIL_SEND_TYPE_STATUS.NEW,
			handler:QH.mail.openSendMailFn
		},{
			text:'回复',
			tooltip:'回复发件人',
			iconCls:'mail_reply',
			ref:'replyMailBtn',
			disabled:true,
			scope:this,
			sendType:MAIL_SEND_TYPE_STATUS.REPLY,
			handler:QH.mail.openSendMailFn
		},{
			text:'全部回复',
			tooltip:'回复所有人',
			iconCls:'mail_reply_all',
			ref:'replyAllMailBtn',
			disabled:true,
			scope:this,
        	sendType:MAIL_SEND_TYPE_STATUS.REPLYALL,
			handler:QH.mail.openSendMailFn
		},{
			text:'转发',
			tooltip:'转发邮件',
			iconCls:'mail_forward',
			scope:this,
			ref:'forwardMailBtn',
			disabled:true,
			scope:this,
        	sendType:MAIL_SEND_TYPE_STATUS.FORWARD,
			handler:QH.mail.openSendMailFn
		},{
			text:'再次发送',
			tooltip:'再次编辑发送邮件',
			iconCls:'mail_go',
			ref:'againSendMailBtn',
			disabled:true,
			scope:this,
        	sendType:MAIL_SEND_TYPE_STATUS.AGAIN,
			handler:QH.mail.openSendMailFn
		},'-',{
			text:'移到废件箱',
			tooltip:'将邮件移到废件箱',
			iconCls:'mail_delete',
			ref:'delMailBtn',
			scope:this,
			disabled:true,
			handler:QH.mail.MoveMailToDelFn
		},{
			text:'彻底删除',
			cls:"SYSOP_DEL",
			tooltip:'将邮件彻底删除,将无法恢复!',
			iconCls:'mail_complete_delete',
			scope:this,
			hidden:true,
			disabled:true,
			ref:'delMailAllBtn',
			handler:QH.mail.DeleteMailFn
		},{
			text:'关联订单',
			tooltip:'将邮件与客户订单关联',
			disabled:true,
			iconCls:'mail_relate_order',
			ref:'relateOrder',
			handler:QH.mail.doRelateFn
		},{
			text:'黑名单',
			tooltip:'接收时根据黑名单过滤邮件',
			disabled:true,
			iconCls:'mail_black',
			ref:'blackRuleBtn',
			handler:QH.mail.showBlackMail
		},{
			text:'往来邮件',
			iconCls:'mail_forward',
			handler:QH.mail.showDealingMail
		},{
			text:'左右显示',
			iconCls:'mail_left_right',
			handler:function(){
				QH_VIEWPORT.getMainView().showDetailPanel(MAIL_DETAIL_PANEL_POSITION.RIGHT);
				QH_VIEWPORT.getMainView().doLayout();
			}
		},{
			text:'上下显示',
			iconCls:'mail_up_down',
			handler:function(){
				QH_VIEWPORT.getMainView().showDetailPanel(MAIL_DETAIL_PANEL_POSITION.BOTTOM);
				QH_VIEWPORT.getMainView().doLayout();
			}
		}];
		QH.mail.Toolbar.superclass.initComponent.call(this);
	},
	/**
	 * 与邮件树操作相对应
	 */
	itemControlByTree:function(){
		var node = QH_VIEWPORT.getMainView().mailTree.getSelectionModel().getSelectedNode(); // 初选中的节点
		this.reciveMailBtn.setDisabled(!node);
		this.sendMailBtn.setDisabled(!node);
		this.blackRuleBtn.setDisabled(!node);
	},
	/**
	 * 与邮件GRID操作相对应
	 */
	itemControlByGird:function(){
		var selModel = QH_VIEWPORT.getMainView().mailGrid.getSelectionModel();
		var selMailCount = selModel.getCount();
		var selMail = selModel.getSelected(); // 获得单个选中的邮件
		// 对回复、全部回复按钮操作
		this.replyMailBtn.setDisabled(selMailCount != 1);
		this.replyAllMailBtn.setDisabled(selMailCount != 1);
		// 对转发按钮操作
		this.forwardMailBtn.setDisabled(selMailCount != 1);
		// 对再次发送按钮操作
		this.againSendMailBtn.setDisabled(selMailCount != 1);
		// 对删除按钮操作
		this.delMailBtn.setDisabled(selMailCount == 0);
		this.delMailAllBtn.setDisabled(selMailCount == 0);
		this.relateOrder.setDisabled(selMailCount == 0);
	}
});

Ext.reg('mailtoolbar',QH.mail.Toolbar);