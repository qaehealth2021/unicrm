/**
 * 历史往来附件右击菜单
 * @class QH.mail.DealingsAttachRightMenu
 * @extends Ext.menu.Menu
 */
QH.mail.DealingsAttachRightMenu = Ext.extend(Ext.menu.Menu,{
	/**
	 * @cfg {QH.mail.GridPanel} gridPanel
	 */
	/**
	 * 插件初始化
	 * @param {} gridPanel
	 */
	init:function(gridPanel){
		this.gridPanel = gridPanel;
		
		this.gridPanel.on({
			'cellcontextmenu':{
				fn:function(grid, rowIndex,cellIndex, e){
					e.preventDefault();
					var selModel = grid.getSelectionModel();
					var records;
					if(!selModel.isSelected(rowIndex)){ // 选择小于等于1行时，右击哪一行则选择哪一行
		  				selModel.selectRow(rowIndex);
		  				grid.fireEvent('rowclick',grid,rowIndex,e);
		  				records = [grid.store.getAt(rowIndex)];
		  			}else{
		  				records = selModel.getSelections();
		  			}
					this.openAttachItem.setDisabled(records.length != 1);	// 只选择一封时，打开附件可用
					this.downAttachItem.setDisabled(records.length == 0);	// 当有选择时，下载附件可用
					this.openMailItem.setDisabled(records.length != 1);	// 只选择一封时，可打开所属邮件
					
		  			this.showAt(e.getXY());
				},
				scope:this
			},
			'rowdblclick':{
				fn:function(grid, rowIndex, e){
					var record = grid.getStore().getAt(rowIndex);
					QH.mail.openAttachFn(record.data);
				},
				scope:this
			}
		});
	},
	initComponent:function(){
		this.items = [{
			text:'打开附件',
			ref:'openAttachItem',
			scope:this,
			handler:function(){
				var record = this.gridPanel.getSelectionModel().getSelected();
				QH.mail.openAttachFn(record.data);
			}
		},{
			text:'下载附件',
			ref:'downAttachItem',
			scope:this,
			handler:function(){
				var records = this.gridPanel.getSelectionModel().getSelections();
				var datas = [];
				Ext.each(records,function(record){
					datas.push(record.data);
				});
				QH.mail.downAttachFn(datas);
			}
		},'-',{
			text:'打开邮件',
			ref:'openMailItem',
			scope:this,
			handler:function(){
				var record = this.gridPanel.getSelectionModel().getSelected();
				QH.mail.openMailFn({id:record.get('mailId')});
			}
		}];
		
		QH.mail.GroupingRightMenu.superclass.initComponent.call(this);
	}
});