QH.mail.SwitchSignature = Ext.extend(QH.ux.grid.BaseGridPanel,{
	editorDisable:true,
	showRightMenu:false,
	quickpanel:null,//父亲面板
	initComponent:function(){
		this.store = new QH.data.Store({
			autoLoad:true,
			url:'listquicktemplate_mailsend.do?type=S',
			record:[{
				name:'name',type:'string'
			},{
				name:'tag',type:'string'
			},{
				name:'htmlText',type:'string'
			}]
		})
		this.columns = [{
			header:'我的签名',
			dataIndex : 'name'
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
		QH.mail.SwitchSignature.superclass.initComponent.call(this);
		this.on('rowdblclick',function(grid,rowIndex,e){
			var record = grid.getStore().getAt(rowIndex);
			var sendPanel = QH_VIEWPORT.sendPanel;
			var bodyField = sendPanel.getForm().findField('bodyHtml');
			var mailSpan = Ext.DomQuery.selectNode("span[id='mailSpan']",bodyField.getEditorBody());
			if(mailSpan){
				mailSpan.innerHTML = record.get('htmlText');
			}
		},this)
	}
});
Ext.reg('switchsignature',QH.mail.SwitchSignature);
