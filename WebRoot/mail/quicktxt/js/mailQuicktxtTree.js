
QH.tree.QuicktxtTreePanel = Ext.extend(QH.mail.TemplateTreePanel,{
	templateName:'快速文本',
	dataUrl:'list_mailquicktxt.do',
	templateType:MAIL_TEMPLATE_TYPE.QUICKTXT,
	getBaseNode : function(){
		return [{
			text : '快速文本',
			isBase:true,
			iconCls:'mail_sign_system'
		}]
	}
});

Ext.reg('mailquicktxttree',QH.tree.QuicktxtTreePanel);