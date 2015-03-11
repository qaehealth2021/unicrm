
/**
 * 邮件Grouping右击菜单插件
 * @class QH.mail.GroupingRightMenu
 * @extends Ext.menu.Menu
 */
QH.mail.GroupingRightMenu = Ext.extend(Ext.menu.Menu,{
	/**
	 * @cfg {QH.mail.GridPanel} gridPanel
	 */
	/**
	 * 插件初始化
	 * @param {} gridPanel
	 */
	init:function(gridPanel){
		this.gridPanel = gridPanel;
		this.gridPanel.on('cellcontextmenu',this.cellContextMenu,this);
	},
	initComponent:function(){
		var _self = this;
		this.items = [{
			text:'标记为未读',
			ref:'noReadItem',
			iconCls:'mail',
			handler:this.setMailRead.createDelegate(this,[false])
		},{
			text:'标记为已读',
			ref:'readItem',
			iconCls:'mail_open',
			handler:this.setMailRead.createDelegate(this,[true])
		},'-',{
			text:'浏览HTML内容',// 该菜单功能作用，是为了能在新的
			ref:'readHtmlItem',
			scope:this,
			handler:this.openMailBodyHtml
		},'-',{
			text:'加入黑名单',
			ref:'garbageItem',
			scope:this,
			handler:this.doGarbage
		},'-',{
			text:'作为附件发送',
			ref:'sendAsEml',
			sendType:MAIL_SEND_TYPE_STATUS.ATTACHEML,
			scope:this,
			handler:QH.mail.openSendMailFn
		}];
		
		QH.mail.GroupingRightMenu.superclass.initComponent.call(this);
	},
	/**
	 * 鼠标右击事件
	 * @param {} grid
	 * @param {} rowIndex
	 * @param {} cellIndex
	 * @param {} e
	 */
	cellContextMenu:function(grid, rowIndex,cellIndex, e){
		var records = grid.getSelectionModel().getSelections();
		if(!grid.getSelectionModel().isSelected(rowIndex)){ // 右击时，当该行不被选中，则只选中该行
			grid.getSelectionModel().selectRow(rowIndex);
			grid.fireEvent('rowclick',grid,rowIndex,e);
			records = [grid.store.getAt(rowIndex)];
		}
		// 判断是否存在已读未读
		var isRead = false;
		var isNoRead = false;
		Ext.each(records,function(record){
			if(record.get('isRead')){
				isRead = true;
			}else{
				isNoRead = true;
			}
		}) 	
		this.noReadItem.setDisabled(!isRead);// 存在已读，则设置未读菜单项为可用
		this.readItem.setDisabled(!isNoRead);// 存在未读，则设置已读菜单项为不可用
		this.readHtmlItem.setDisabled(records.length != 1);// 当选中一封时，可浏览HTML内容
//		DWREngine.setAsync(false);
//		var contactList = [];
//		var _self = this;
//		//生成跟踪业务员信息
//		var custId = records[0].get("custId");
//		var subMenu = Ext.getCmp("trackerEmps");
//		if(custId != null && custId != ""){
//			baseSerivce.getListByCondition("CotContact",{customerId:custId.id},function(res){
//				contactList = res;
//			});
//			if(!subMenu){
//				subMenu = this.addMenuItem({
//					id:"trackerEmps",
//					text:"跟踪业务员"
//				});
//				subMenu.menu = new Ext.menu.Menu();;
//			}else{
//				subMenu.menu.removeAll();
//			}
//			Ext.each(contactList,function(contact){
//				subMenu.menu.addMenuItem({text:contact.empsId.empsId});
//			});
//		}else{
//			if(subMenu){
//				this.remove(subMenu);
//			}
//		}
		e.preventDefault();
		this.showAt(e.getXY());
		//DWREngine.setAsync(true);
	},
	/**
	 * 浏览HTML页面
	 */
	openMailBodyHtml:function(){
		var grid = this.gridPanel;
		var record = grid.getSelectionModel().getSelected();
		var params = {
			'mail.id':record.id,
			'mail.bodyType':record.data.bodyType
		};
		var url = "body_mail.do?" + Ext.urlEncode(params);
		openWindow(url);
	},
	/**
	 * 设置邮件已读未读
	 * @param {} selIds
	 * @param {} isRead
	 * @param {} isReload
	 */
	setMailRead:function(isRead){
		var grid = this.gridPanel;
		var selIds = grid.getSelectionIds();
		QH_LOADMASK = new Ext.LoadMask(grid.getEl(),{msg:'正在标记邮件。。。'});
		QH_LOADMASK.show();
		mailUpdateService.updateMailRead(selIds,isRead,function(){
			QH_LOADMASK.hide();
			grid.getStore().reload();
		});
	},
	doGarbage:function(){
		var node = QH_VIEWPORT.getMainView().mailTree.getSelectionModel().getSelectedNode();
		if(node == null){
			window.alertMsg("请选择一个账号");
			return;
		}
		var accountId = node.attributes.accountCfgId.id;
		var mailAccount = node.attributes.accountCfgId.mailAccount;
		var grid = this.gridPanel;
		var records = grid.getSelectionModel().getSelections();
		var garbageCfg = new CotMailGarbageCfg();
		DWREngine.setAsync(false);
		// 查找该账户的黑名单信息
		mailUpdateService.findCotMailGarbageCfgByAccountId(accountId,function(res){
			if (res != null) {
				garbageCfg = res;
			}else{
				garbageCfg.accountId=accountId;
			}
		});
		var obj = {};
		obj.ACCOUNT = "";
		obj.ACCOUNT_SERVER="";
		if(garbageCfg.filter != null){
			obj = Ext.decode(garbageCfg.filter);
		}
		if(records == null || records.length==0) return ;
		Ext.each(records,function(record){
			var sendUrl = record.data.sender.emailUrl;
			if(obj.ACCOUNT.indexOf(sendUrl) == -1){
				obj.ACCOUNT +=sendUrl+";";
			}
		});
		garbageCfg.filter = Ext.encode(obj);
		QH_LOADMASK = new Ext.LoadMask(grid.getEl(),{msg:'正在进行黑名单操作。。。'});
		QH_LOADMASK.show();
		baseSerivce.saveOrUpdateObjRId([garbageCfg],function(){
			window.alertMsg("操作完成");
			QH_LOADMASK.hide();
		});
		DWREngine.setAsync(true);
	}
});