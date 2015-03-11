/**
 * 邮件HTML编辑器
 * @class QH.mail.HtmlEditor
 * @extends QH.ux.form.HtmlEditor
 */
QH.mail.HtmlEditor = Ext.extend(QH.ux.form.HtmlEditor, {
	enableSourceEdit:true,
	initComponent:function(){
		// 设置上传附件访问参数
		var post_params = {
			beanName : "MailSendService",
			uploadPath : "attach",
			isRName : true,
			doDbOp : false,
			paramJson:Ext.encode({
				isCidImage:true
			})
		};
		this.uploadBackPicParams = post_params;
		// 图片配置
		this.picUploadCfg = {
			swfUploadCfg : {
				file_upload_limit : 100, // 上传数量
				file_size_limit : 100 * 1024,
				file_types : "*.jpg;*.png;*.bmp;*.gif;",
				post_params : post_params
			}
		}
		
		QH.mail.HtmlEditor.superclass.initComponent.call(this);
	}
});

Ext.reg('mailhtmleditor',QH.mail.HtmlEditor);