
QH.tree.SignatureTreePanel = Ext.extend(QH.mail.TemplateTreePanel,{
	templateName:'签名',
	dataUrl:'list_mailsignature.do',
	templateType:MAIL_TEMPLATE_TYPE.SIGNATURE,
	getBaseNode : function(){
		return [{
			text : '我的签名',
			isBase:true,
			iconCls:'mail_sign_system'
		}]
	}
});

Ext.reg('mailsignaturetree',QH.tree.SignatureTreePanel);