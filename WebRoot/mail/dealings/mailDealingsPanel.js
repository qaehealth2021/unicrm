
$import('mail/dealings/mailDealingsGrid.js');

/**
 * 往来历史面板
 * @class QH.mail.DealingsPanel
 * @extends Ext.Panel
 */
QH.mail.DealingsPanel = Ext.extend(Ext.Panel,{
	layout:'border',
	initComponent:function(){
		this.items = [{
			region:'center',
			ref:'mailGrid',
			xtype:'maildealingsgrid'
		},{
			region:'south',
			ref:'attachGrid',
			collapseMode:'mini',
			split:true,
			height:250,
			xtype:'maildealingsattachgrid'
		}];
		
		this.controlBuffer = new Ext.util.DelayedTask(this.dealingsControlBuffer,this); // 缓存控制
		QH.mail.DealingsPanel.superclass.initComponent.call(this);
		this.on({
			'expand':this.dealingsContorl,
			'collapse':this.dealingsContorl
		})
	},
	/**
	 * 缓存控制，减少加载次数
	 */
	dealingsContorl:function(){
		this.controlBuffer.delay(300);
	},
	dealingsControlBuffer:function(){
		var dealingsMailGrid = this.mailGrid;
		var dealingsAttachGrid = this.attachGrid;
		var dealingsMailStore = dealingsMailGrid.getStore();
		var dealingsAttachStore = dealingsAttachGrid.getStore();
		
		var searchField = dealingsMailGrid.searchField;
		var searchAttachField = dealingsAttachGrid.searchField;
		
		var grid = QH_VIEWPORT.getMainView().mailGrid; // 主Grid
		var record = grid.getSelectionModel().getSelected();
		if(!this.hidden && record){	// 如果不为隐藏，并且有选中邮件，则加载
			searchField.enable();
			searchAttachField.enable();
			var emailUrl = '';
			// 为收件类型邮件取发件人地址，其它属发件类型取收件人第一个地址
			if(record.get('mailType') == MAIL_TYPE.RECIVE){
				emailUrl = record.get('sender').emailUrl;
			}else{
				to = record.get('to');
				if(!Ext.isEmpty(to))
					emailUrl = to[0].emailUrl;
			}
			var baseParams = dealingsMailStore.baseParams;
			
			var accountId = record.get('nodeId').accountCfgId.id;
			
			if(baseParams && baseParams['mail.toUrl'] == emailUrl
				&& baseParams['accountId'] == record.get('nodeId').accountCfgId.id)
				return ; // 选中相同邮件地址与相同账号，则不再查询
			
			dealingsMailStore.setBaseParam('mail.toUrl',emailUrl);
			dealingsMailStore.setBaseParam('accountId',accountId);
			dealingsMailStore.load({
				params:{
					start:QH_PAGE_LIMIT,
					limit:MAIL_HISTORY_PAGE_LIMIT
				}
			});
			dealingsAttachStore.mailRecord = record; // 当前被选中邮件
			dealingsAttachStore.setBaseParam('mail.toUrl',emailUrl);
			dealingsAttachStore.setBaseParam('accountId',accountId);
			dealingsAttachStore.load({
				params:{
					start:QH_PAGE_LIMIT,
					limit:MAIL_HISTORY_PAGE_LIMIT
				}
			});
		}else{
			dealingsMailGrid.setTitle('往来邮件');
			dealingsAttachGrid.setTitle('往来附件');
			dealingsMailStore.setBaseParam('mail.toUrl','');
			dealingsAttachStore.setBaseParam('mail.toUrl','');
			dealingsMailStore.removeAll();
			dealingsAttachStore.removeAll();
			searchField.disable();
			searchAttachField.disable();
		}
		
	}
});

Ext.reg('maildealingspanel',QH.mail.DealingsPanel);