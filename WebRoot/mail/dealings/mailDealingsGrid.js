
$import('mail/dealings/mailDealingsStore.js');
$import('mail/dealings/mailDealingsRightMenu.js');

/**
 * 往来邮件
 * @class QH.mail.DealingsMailGrid
 * @extends QH.grid.GridPanel
 */
QH.mail.DealingsMailGrid = Ext.extend(QH.grid.GridPanel,{
	loadMask:{msg:'往来邮件加载中。。。'},
	autoExpandColumn:'subject',
	title:'往来邮件',
	initComponent:function(){
		
		this.store = new QH.mail.DealingsMailStore();
		this.store.on('beforeload',function(store){
			// 如果不存在地址，则不加载
			if(!store.baseParams || !store.baseParams['mail.toUrl'])
				return false;
		},this);
		this.store.on('load',function(store){
			// 加载完成后，设置标题显示有几封
			this.setTitle('往来邮件('+store.getTotalCount()+')');		
		},this);
		this.tbar = {
       		layout:'fit',
       		items:[{
	       		xtype:'searchTrigger',
	       		emptyText:'主题',
	       		ref:'../searchField',
	       		searchName:'mail.subject',
	       		disabled:true,
	       		seachStore:this.store
       		}]
       	};
       	this.cm = new Ext.grid.ColumnModel({
			columns:[
				{header: '', width: 15, dataIndex: 'mailType',renderer:QH.mail.dealingsMailTypeRenderer},
				{id:'subject',header: "主题-时间",renderer:QH.mail.subTimeRenderer},
				{header: '<span class="mail_grouping_attach">&nbsp;</span>',renderer:QH.mail.attachRenderer, width: 17, dataIndex: 'isContainAttach'}
	    	],
	    	defaults:{
	            menuDisabled: true,
	            resizable:false
        	}
		});
		QH.mail.DealingsMailGrid.superclass.initComponent.call(this);
		this.on('rowdblclick',function(grid,rowIndex,e){
			var record = grid.getStore().getAt(rowIndex);
			// 打开邮件
			QH.mail.openMailFn(record.data,grid);
		},this);
	}
});
Ext.reg('maildealingsgrid',QH.mail.DealingsMailGrid);
/**
 * 往来附件
 * @class QH.mail.DealingsAttachGrid
 * @extends QH.grid.GridPanel
 */
QH.mail.DealingsAttachGrid = Ext.extend(QH.grid.GridPanel,{
	loadMask:{msg:'往来附件加载中。。。'},
	autoExpandColumn:'name',
	title:'往来附件',
	initComponent:function(){
		this.store = new QH.mail.DealingsAttachStore();
		this.store.on('beforeload',function(store){
			// 如果不存在地址，则不加载
			if(!store.baseParams || !store.baseParams['mail.toUrl'])
				return false;
		},this);
		this.store.on('load',function(store){
			this.setTitle('往来附件('+store.getTotalCount()+')');		
		},this);
		this.tbar = {
       		layout:'fit',
       		items:[{
	       		xtype:'searchTrigger',
	       		emptyText:'附件名',
	       		ref:'../searchField',
	       		searchName:'attachName',
	       		disabled:true,
	       		seachStore:this.store
       		}]
       	};
       	this.cm = new Ext.grid.ColumnModel({
			columns:[
				{id:'name',header: "附件-时间",dataIndex: 'name',renderer:QH.mail.nameTimeRenderer},
				{header: "大小", width: 70, align:'right', renderer: QH.mail.sizeRenderer, dataIndex: 'size'}
	    	],
	    	defaults:{
	            menuDisabled: true,
	            resizable:false
        	}
		});
		
		this.plugins = [new QH.mail.DealingsAttachRightMenu()];
		
		QH.mail.DealingsAttachGrid.superclass.initComponent.call(this);
	}
});
Ext.reg('maildealingsattachgrid',QH.mail.DealingsAttachGrid);


