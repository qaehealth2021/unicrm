$import('mail/info/js/mailDetailPanel.js');

QH.mail.InfoPanel = Ext.extend(Ext.Panel,{
	layout:'fit',
	gridId:'',
	mailId:'',
	initComponent:function(){
		
		this.items = [{
			xtype:'maildetailpanel',
			ref:'detailPanel',
			listeners:{
				'iframerender':{
					scope:this,
					fn:function(detailPanel,iframe){
						this.loadMailData();
					}
				}
			}
		}];
		
		QH.mail.InfoPanel.superclass.initComponent.call(this);
		
	},
	loadMailData:function(num){
		var infoPanel = this;
		if($(QH_P_IFRAME_ID)){
			var ecsideObj =parent.frames[$(QH_P_IFRAME_ID).value];
			if (typeof(ecsideObj) != 'undefined') {
				var grid = ecsideObj.Ext.getCmp(this.gridId);
				if (typeof(grid) != 'undefined') {
					var store = grid.getStore();
					var index = store.indexOfId(parseInt(this.mailId));
					var rowIndex = index + num;
					if(rowIndex >= 0 && rowIndex < store.getCount()){
						var record = store.getAt(rowIndex);
						if(!record.get('isRead')){
							record.set('isRead',true);
							record.commit();
						}
						this.mailId = record.id;
						grid.getSelectionModel().selectRow(rowIndex);
						grid.fireEvent('rowclick',grid,rowIndex);
						var taskBar_btn = getTaskButton();
						if(taskBar_btn){
							//var subject = Ext.util.Format.ellipsis()
							taskBar_btn.setText('<font style="font-size:13px;">'+record.get('subject')+'</font>');
							taskBar_btn.win.setTitle(record.get('subject'));
						}
					}else{
						if(rowIndex < 0){
							window.alertWarnMsg('已经是第一条记录了');
						}
						if(rowIndex >= store.getCount()){
							window.alertWarnMsg('已经是最后一条记录了');
						}
					}
				}
			}
		}
		mailReadService.getMail(this.mailId,function(mail){
			if(infoPanel.detailPanel.headPanel.body)
				infoPanel.detailPanel.loadMailData(mail);
			else // 面板未生成，延迟加载
				infoPanel.detailPanel.loadMailData.defer(300,infoPanel.detailPanel,[mail]);
		});
		
	}
});

Ext.reg('mailinfopanel',QH.mail.InfoPanel);