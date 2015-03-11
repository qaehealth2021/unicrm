
QH.mail.TemplateStore = Ext.extend(Ext.data.ArrayStore,{
	constructor : function(config){
		config = config || {};
		Ext.apply(config,{
			data:this.getNewData(),
			fields : ['paramImage','remark']
		});
		QH.mail.TemplateStore.superclass.constructor.call(this,config);
	},
	loadDataByTag : function(tag){
		if(tag == MAIL_TEMPLATE_TAG.NEW)
			this.loadData(this.getNewData());
		else if(tag == MAIL_TEMPLATE_TAG.REPLY)
			this.loadData(this.getReplyData());
		else if(tag == MAIL_TEMPLATE_TAG.FORWARD)
			this.loadData(this.getForwardData());
	},
	getNewData:function(){
		return [
			["<img src='" + MAIL_IMAGE_DIR + "MACRO/_FoxCURSOR.gif' />","光标位置" ],
			["<img src='" + MAIL_IMAGE_DIR + "MACRO/_FoxDATE.gif' />","当前日期" ],
			["<img src='" + MAIL_IMAGE_DIR + "MACRO/_FoxFROMNAME.gif' />","发信人签名" ],
			["<img src='" + MAIL_IMAGE_DIR + "MACRO/_FoxTONAME.gif' />","收件人名字" ]
		]
	},
	getReplyData:function(){
		return [
			["<img src='" + MAIL_IMAGE_DIR + "MACRO/_FoxCURSOR.gif' />","光标位置" ],
			["<img src='" + MAIL_IMAGE_DIR + "MACRO/_FoxDATE.gif' />","当前日期" ],
			["<img src='" + MAIL_IMAGE_DIR + "MACRO/_FoxODATE.gif' />","来信日期" ],
			["<img src='" + MAIL_IMAGE_DIR + "MACRO/_FoxOSUBJ.gif' />","来信主题" ],
			["<img src='" + MAIL_IMAGE_DIR + "MACRO/_FoxFROMNAME.gif' />","发信人签名" ],
			["<img src='" + MAIL_IMAGE_DIR + "MACRO/_FoxTONAME.gif' />","收件人名字" ],
			["<img src='" + MAIL_IMAGE_DIR + "MACRO/_FoxOFROMNAME.gif' />","来信人名字" ],
			["<img src='" + MAIL_IMAGE_DIR + "MACRO/_FoxTEXT.gif' />","原邮件内容" ],
			["<img src='" + MAIL_IMAGE_DIR + "MACRO/_FoxOCCNAME.gif' />","来信抄送人名字" ],
			["<img src='" + MAIL_IMAGE_DIR + "MACRO/_FoxOTONAME.gif' />","来信邮件的收件人" ]
		]
	},
	getForwardData:function(){
		return this.getReplyData();
	}
});