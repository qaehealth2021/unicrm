
/**
 * 邮件发送附件右击菜单
 * @class QH.mail.MailAttachRightMenu
 * @extends Ext.menu.Menu
 */
QH.mail.MailAttachRightMenu = Ext.extend(Ext.menu.Menu,{
	/**
	 * @cfg {Ext.DataView} attachView
	 */
	/**
	 * @cfg {attach} currentAttach
	 */
	initComponent:function(){
		this.items = [{
			text:'全选',
			ref:'selectAllMenu',
			scope:this,
			handler:this.selectAllAttach
		},{
			text:'打开',
			ref:'openMenu',
			scope:this,
			handler:this.openAttach
		},{
			text:'下载',
			ref:'downMenu',
			scope:this,
			handler:this.downAttach
		}];
		
		QH.mail.MailAttachRightMenu.superclass.initComponent.call(this);
	},
	init:function(attachView){
		this.attachView = attachView;
		attachView.on('contextmenu',this.onAttachRightMenu,this);
		attachView.on('containercontextmenu',this.onViewRightMenu,this);
	},
	onViewRightMenu : function(attachView,e){
		e.preventDefault();
		this.menuControl();
		this.showAt(e.getXY());
	},
	onAttachRightMenu : function(attachView,index,node,e){
		e.preventDefault();
		if(!attachView.isSelected(index)){ // 如果不被选中，则选中
			attachView.select(index);
		}
		this.menuControl();
		this.showAt(e.getXY());
	},
	openAttach : function(){
		var records = this.attachView.getSelectedRecords();
		QH.mail.openAttachFn(records[0].data);
	},
	selectAllAttach : function(){
		this.attachView.selectRange();
	},
	downAttach : function(){
		var records = this.attachView.getSelectedRecords();
		var datas = [];
		Ext.each(records,function(record){
			datas.push(record.data);
		});
		QH.mail.downAttachFn(datas);
	},
	menuControl:function(){
		var count = this.attachView.getSelectionCount();
		this.openMenu.setDisabled(count != 1);
		this.downMenu.setDisabled(count == 0);
	}
});