QH.mail.QuicktemplateGrid = Ext.extend(QH.ux.grid.BaseGridPanel,{
	editorDisable:true,
	showRightMenu:false,
	quickpanel:null,//父亲面板
	initComponent:function(){
		this.store = new QH.data.Store({
			autoLoad:true,
			url:'listquicktemplate_mailsend.do?flag='+$('sendTypeStatus').value,
			record:[{
				name:'name',type:'string'
			},{
				name:'tag',type:'string'
			},{
				name:'htmlText',type:'string'
			}]
		})
		this.columns = [{
			header:'信纸名称',
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
		QH.mail.QuicktemplateGrid.superclass.initComponent.call(this);
		this.on('rowdblclick',function(grid,rowIndex,e){
			var record = grid.getStore().getAt(rowIndex);
			var sendPanel = QH_VIEWPORT.sendPanel;
			//sendPanel.mailObj.bodyHtml = "";
			sendPanel.mailObj.bodyHtml = sendPanel.orginHtml;
			//alert(sendPanel.mailObj.bodyHtml);
			sendPanel.renderTemplate(sendPanel.mailObj,record.get('htmlText'),sendPanel.signObj);
			sendPanel.getForm().setValues({
				bodyHtml:sendPanel.mailObj.bodyHtml
			});
		},this)
	}
});
Ext.reg('quicktemplategrid',QH.mail.QuicktemplateGrid);
