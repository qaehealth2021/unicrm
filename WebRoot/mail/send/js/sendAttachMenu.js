
/**
 * 邮件发送附件右击菜单
 * @class QH.mail.SendAttachRightMenu
 * @extends Ext.menu.Menu
 */
QH.mail.SendAttachRightMenu = Ext.extend(Ext.menu.Menu,{
	/**
	 * @cfg {Ext.DataView} attachView
	 */
	/**
	 * @cfg {attach} currentAttach
	 */
	initComponent:function(){
		this.items = [{
			text:'添加',
			ref:'addMenu',
			scope:this,
			handler:this.uploadAttach
		},{
			text:'删除',
			ref:'delMenu',
			scope:this,
			handler:this.delAttach
		},{
			text:'重命名',
			ref:'renameMenu',
			scope:this,
			handler:this.renameAttach
		},'-',{
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
		
		QH.mail.SendAttachRightMenu.superclass.initComponent.call(this);
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
	renameAttach : function(){
		this.attachView.startEditLabel();
	},
	uploadAttach : function(menu){
		this.attachView.uploadAttachs(menu);
	},
	openAttach : function(){
		var records = this.attachView.getSelectedRecords();
		QH.mail.openAttachFn(records[0].data);
	},
	selectAllAttach : function(){
		this.attachView.selectRange();
	},
	delAttach : function(){
		var attachView = this.attachView;
		var records = this.attachView.getSelectedRecords();
		var store = this.attachView.getStore();
		Ext.each(records,function(record){
			mailSendService.delAttachByUrl(record.data.url,function(){
				store.remove(record);
				try{
					attachView.setHeight('auto');
					attachView.setHeight(attachView.getHeight());
				}catch(e){
				}
				if(store.getCount() == 0)
					attachView.hide();
				else{
					attachView.sendPanel.doLayout();
				}
			});
		});
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
		this.delMenu.setDisabled(count == 0);
		this.renameMenu.setDisabled(count != 1);
		this.openMenu.setDisabled(count != 1);
		this.downMenu.setDisabled(count == 0);
	}
});