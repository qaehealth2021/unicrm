
QH.mail.TemplateFormPanel = Ext.extend(Ext.form.FormPanel,{
	buttonAlign:'center',
	layout:'fit',
	border:false,
	enableBackgroundImage:true,// 默认显示上传背景图片按钮
	isHtmlType:true,	// 是否获得包含HTML标签，true为一整个HTML格式，false为只获得body中的内容
	initComponent : function(){
		this.items = [{
			xtype:'mailhtmleditor',
			readOnly:true,
			anchor:"99%",
			enableBackgroundImage:this.enableBackgroundImage,
			name:'htmlText'
		}];
		
		this.buttons = [{
			text:'保存',
			ref:'saveBtn',
			disabled:true,
			scope:this,
			handler:this.saveTemplate
		}];
		
		QH.mail.TemplateFormPanel.superclass.initComponent.call(this);
		
	},
	/**
	 * 保存模板
	 */
	saveTemplate : function(){
		
		var form =  this.getForm();
		var htmlTextField = form.findField('htmlText');
		var htmlText = this.isHtmlType ? htmlTextField.getHTMLValue() : htmlTextField.getValue();
		
		var selNode = QH_VIEWPORT.mailTemplateTreePanel.getSelectionModel().getSelectedNode();
		QH_LOADMASK = new Ext.LoadMask(QH_VIEWPORT.getEl(),{msg:'保存内容。。。'});
		QH_LOADMASK.show();
		mailTemplateService.updateTemplateHtml(selNode.id,htmlText,function(id){
			QH_LOADMASK.hide();
			htmlTextField.focus();
		});
	}
});

Ext.reg('mailtemplateform',QH.mail.TemplateFormPanel);