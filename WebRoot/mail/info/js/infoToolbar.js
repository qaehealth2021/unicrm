
/**
 * 
 * @class QH.mail.InfoToolbar
 * @extends Ext.Toolbar
 */
QH.mail.InfoToolbar = Ext.extend(Ext.Toolbar,{
	enableOverflow:true,
	gridId:'',
	initComponent:function(){
		this.defaults = {
			scale:'large'
		}
		this.items = [{
			text:'回复',
			tooltip:'回复发件人',
			iconCls:'mail_reply',
			ref:'replyMailBtn',
			handler:this.sendMail.createDelegate(this,[MAIL_SEND_TYPE_STATUS.REPLY])
		},{
			text:'全部回复',
			tooltip:'回复所有人',
			iconCls:'mail_reply_all',
			ref:'replyAllMailBtn',
			handler:this.sendMail.createDelegate(this,[MAIL_SEND_TYPE_STATUS.REPLYALL])
		},{
			text:'转发',
			tooltip:'转发邮件',
			iconCls:'mail_forward',
			scope:this,
			ref:'forwardMailBtn',
			handler:this.sendMail.createDelegate(this,[MAIL_SEND_TYPE_STATUS.FORWARD])
		},{
			text:'再次发送',
			tooltip:'再次发送邮件',
			iconCls:'mail_go',
			ref:'againSendMailBtn',
			handler:this.sendMail.createDelegate(this,[MAIL_SEND_TYPE_STATUS.AGAIN])
//		},'-',{
//			text:'移到废件箱',
//			tooltip:'将邮件移到废件箱',
//			iconCls:'mail_delete',
//			ref:'delMailBtn',
//			scope:this,
//			handler:this.delMail
//		},{
//			text:'彻底删除',
//			cls:"SYSOP_DEL",
//			tooltip:'将邮件彻底删除,将无法恢复!',
//			iconCls:'page_del',
//			scope:this,
//			ref:'delMailAllBtn',
//			handler:this.delAllMail
		}
		,'->',{
			text:'上一封',
			iconCls:'mail_page_up',
			hidden:this.gridId == '',
			handler:this.loadMailData.createDelegate(this,[-1])
		},{
			text:'下一封',
			iconCls:'mail_page_down',
			hidden:this.gridId == '',
			handler:this.loadMailData.createDelegate(this,[1])
		}
		];
		
		QH.mail.InfoToolbar.superclass.initComponent.call(this);
	},
	loadMailData:function(num){
		QH_VIEWPORT.infoPanel.loadMailData(num);
	},
	/**
	 * 删除邮件
	 */
	delMail : function(){
		var mailToolbar = this;
		var mail = QH_VIEWPORT.infoPanel.detailPanel.mail;
		QH_LOADMASK = new Ext.LoadMask(grid.getEl(),{msg:'正在删除邮件。。。'});
		QH_LOADMASK.show();
		mailTreeService.moveMailToDel(mail.nodeId.accountCfgId.id,[mail.id],function(result){
			QH_LOADMASK.hide();
			detailPanel
			grid.getStore().reload();
		});
		
	},
	/**
	 * 彻底删除邮件
	 */
	delAllMail : function(){
		var mailToolbar = this;
		var grid = QH_VIEWPORT.mailGrid; // 主grid
		// 获得选中ID
		var ids = grid.getSelectionIds();
		// 获得删除节点
		var delNode = QH_VIEWPORT.mailTree.getBaseNode(MAIL_NODE_TYPE.D);
		var isSending = false; // 判断是否正在发送
		var records = grid.getSelectionModel().getSelections();
		var mailStatus;
		Ext.each(records,function(record){
			mailStatus = record.get('mailStatus');
			if(record.get('mailType') == MAIL_NODE_TYPE.SENDING){
				isSending = true;
				return false;
			}
		});
		Ext.Msg.show({buttons:Ext.Msg.YESNO,icon:isSending?Ext.Msg.WARNING:Ext.Msg.INFO,title:'系统提示',msg:isSending?'可能存在正在发送的邮件，如果彻底删除，则不发送':'确认彻底删除?',
			fn:function(btnId){
				if(btnId == 'yes'){
					QH_LOADMASK = new Ext.LoadMask(grid.getEl(),{msg:'正在彻底删除邮件。。。'});
					QH_LOADMASK.show();
					mailUpdateService.deleteMails(ids,function(){
						QH_LOADMASK.hide();
						// 删除成功则重新加载
						Ext.example.msg('系统提示', "彻底删除成功",grid.getEl());
						grid.store.reload();
					});
				}
			}
		});
	},
	/**
	 * 撰写邮件
	 */
	sendMail:function(sendTypeStatus){
		var selMail = QH_VIEWPORT.infoPanel.detailPanel.selMail;
		var trackStatus = selMail.trackStatus ? selMail.trackStatus.id : null;
		var custId = selMail.custId ? selMail.custId.id : null;
		var params = {
			sendTypeStatus:sendTypeStatus,
			mailId:selMail.id,
			accountId:selMail.nodeId.accountCfgId.id,
			custId:custId,
			orderNo:selMail.orderNo,
			trackStatus:trackStatus,
			orderRemark:selMail.orderRemark
		}
//		openFullWindow('query_mailsend.do?'+Ext.urlEncode(params));
		openDeskWin('发送邮件','query_mailsend.do?'+Ext.urlEncode(params));
//		window.opener = null;
//		window.close();
	}
});

Ext.reg('mailinfotoolbar',QH.mail.InfoToolbar);