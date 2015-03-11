
QH.mail.QuicktxtGrid = Ext.extend(QH.ux.grid.BaseGridPanel,{
	editorDisable:true,
	showRightMenu:false,
	quickpanel:null,//父亲面板
	initComponent:function(){
		this.store = new QH.data.Store({
			autoLoad:true,
			url:'listquicktxt_mailquicktxt.do',
			record:[{
				name:'name',type:'string'
			},{
				name:'isDefault',type:'bool'
			},{
				name:'htmlText',type:'string'
			}]
		})
		this.columns = [{
			header:'文本名称',
			dataIndex : 'name'
		},{
			header:'是否共享',
			dataIndex:'isDefault',
			renderer:function(value){
				return value?'是':'否'
			}
			
		}];
		this.tbar = {
			xtype:'basetoolbar',
			grid:this,
			editorDisable:this.editorDisable,
			hiddenAddBtn:true,
			hiddenDelBtn:true,
			items:[{
				xtype:'label',
				html:'<font color=red>注:双击快速插入</font>'
			}]
		}
		QH.mail.QuicktxtGrid.superclass.initComponent.call(this);
		this.on('rowclick',function(grid,rowIndex,e){
			var record = grid.getStore().getAt(rowIndex);
			this.showTxt(record);
		},this)
		this.on('rowdblclick',function(grid,rowIndex,e){
			var bodyHtmlPanel = QH_VIEWPORT.sendPanel.getForm().findField('bodyHtml');
			var record = grid.getStore().getAt(rowIndex);
			bodyHtmlPanel.insertAtCursor(record.get('htmlText'));
			
		},this)
	},
	showTxt:function(record){
		var htmlText = this.quickpanel.htmlText;
		htmlText.setValue(record.get('htmlText'));
	}
});
Ext.reg('quicktxtgrid',QH.mail.QuicktxtGrid);

QH.mail.QuicktxtPanel = Ext.extend(Ext.Panel,{
	initComponent:function(){
		this.layout = 'border';
		this.items = [{
			xtype:'quicktxtgrid',
			ref:'quicktxtgrid',
			quickpanel:this,
			region:'center'
		},{
			xtype:'mailhtmleditor',
			readOnly:true,
			anchor:"99%",
			enableBackgroundImage:false,
			ref:'htmlText',
			region:'south',
			//collapseMode:'mini',
			split:true,
			height:100
		}]
		QH.mail.QuicktxtPanel.superclass.initComponent.call(this);
	}
})
Ext.reg('quicktxtpanel',QH.mail.QuicktxtPanel);