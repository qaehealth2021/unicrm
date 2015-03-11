/**
 * @author zhao
 * @class QH.price.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.price.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar, {
			objName : 'CotPrice',
			tbarModel : 'all',
			initComponent : function() {
				var tbar = this;
				this.items = [{
							xtype : 'panel',
							html : '<font color=blue><b>ETD</b></font>'
						}, '-', {
							xtype : 'label',
							text : 'Mon:'
						}, {
							xtype : 'checkbox',
							ref:"mon",
							width : 50,
							style : 'margin-top:-10px'
						}, {
							xtype : 'label',
							text : 'Tue:'
						}, {
							xtype : 'checkbox',
							ref:"tue",
							width : 50,
							style : 'margin-top:-10px'
						}, {
							xtype : 'label',
							text : 'Wed:'
						}, {
							xtype : 'checkbox',
							ref:"wed",
							width : 50,
							style : 'margin-top:-10px'
						}, {
							xtype : 'label',
							text : 'Thu:'
						}, {
							xtype : 'checkbox',
							ref:"thu",
							width : 50,
							style : 'margin-top:-10px'
						}, {
							xtype : 'label',
							text : 'Fri:'
						}, {
							xtype : 'checkbox',
							ref:"fri",
							width : 50,
							style : 'margin-top:-10px'
						}, {
							xtype : 'label',
							text : 'Sat:'
						}, {
							xtype : 'checkbox',
							ref:"sat",
							width : 50,
							style : 'margin-top:-10px'
						}, {
							xtype : 'label',
							text : 'Sun:'
						}, {
							xtype : 'checkbox',
							ref:"sun",
							width : 50,
							style : 'margin-top:-10px'
						}, '->', {
							text : "打印",
							iconCls : "page_print",
							ref:"printBtn",
							handler : tbar.showPrintPanel.createDelegate(this,
									[])
						}];
				QH.price.GridToolbar.superclass.initComponent.call(this);
			},
			/**
			 * 显示打印面板
			 */
			showPrintPanel : function() {
//				var queryParam = this.searchField.paramFn();
				var toolbar = this;
				var ids=toolbar.grid.getChoseRecs();
				if(ids==""){
					Ext.MessageBox.alert('提示消息','请先勾选要打印导出的记录!');
					return;
				}
				var reportTypeId=1;
				var typeId=toolbar.grid.typeId;
				if(typeId=='Zheng'){
					reportTypeId=3;
				}else if(typeId=='Pin'){
					reportTypeId=2;
				}
				ids=ids.substring(0,ids.length-1);
				var win = new QH.ux.win.PrintWin({
							grid : toolbar.grid,
							fromBtn : toolbar.printBtn,
							reportTypeId : reportTypeId,
							printFlag : 1,
							tableName : "CotPrice",
							exportFileName : typeId,
							needQueryId : false,
							queryParams : {
								ids:ids
							},
							queryPrefix : "price"
						})
				win.show();
			}
		});
Ext.reg('pricetoolbar', QH.price.GridToolbar);
