
QH.mail.MailReciveWindow = Ext.extend(Ext.Window,{
	width:380,
	autoHeight:true,
	bodyStyle:'background: #FBFBFB',
	minimizable: true,
	initComponent:function(){
		this.items = [{
			xtype:'panel',
			ref:'recivePanle',
			width:360,
			border:false,
			bodyStyle: 'padding: 5px 5px 5px 25px;font-size:11;background: no-repeat 5px 5px #FBFBFB;background-image: url(common/ext/resources/images/default/grid/loading.gif);',
			html:'正在接收邮件。。。',
			buttons:[{
				text:'取消接收',
				scope:this,
				handler:function(){
        			this.close();
				}
			}]
		}]
		QH.mail.MailReciveWindow.superclass.initComponent.call(this);	
	},
	listeners:{
		'beforeclose':{
			fn:function(win){
				mailReciveService.cancleReciveMail(win.reciveCfgId,function(){
					win.reciveIsStop =true;
					win.accountNode.setText(win.accountNode.oldText);
					win.close();
					win.reciveRunner.stop(win.reciveTask);
					QH_VIEWPORT['RECIVE_WINDOWS'+win.cfgId] = '';
					var node = QH_VIEWPORT.getMainView().mailTree.getSelectionModel().getSelectedNode();
					if(node.attributes.accountCfgId.id == win.reciveCfgId)
						QH_VIEWPORT.getMainView().mailGrid.getStore().load({params:{start:QH_PAGE_START,limit:QH_PAGE_LIMIT}});
				});
				if(!win.reciveIsStop)
					return false;
			}
		},
		'minimize':{
			fn:function(win){
				win.hide();
			}
		}
	}
});