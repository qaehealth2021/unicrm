
$import('mail/send/js/sendAttachMenu.js');
/**
 * 
 * @class QH.mail.SendAttachDataView
 * @extends Ext.DataView
 */
QH.mail.SendAttachDataView = Ext.extend(QH.mail.AttachDataView,{
    multiSelect: true,
    cls:'attach-view',
    overClass:'x-view-over',
    itemSelector:'div.thumb-wrap',
    emptyText: '没有附件',
    autoScroll:true,
    boxMaxHeight:64,
    style:'border:1px solid #B5B8C8;padding:2px 3px;',
    sendPanel:this,
    append:true,
	initPlugins : function(){
		this.labelEditor = new Ext.DataView.LabelEditor({
			disableMouseDown:true,
			selectOnFocus:false,
			dataIndex:'name'
		});
		this.plugins = [
			this.labelEditor,
			new QH.mail.SendAttachRightMenu()
		];
		QH.mail.SendAttachDataView.superclass.initPlugins.call(this);
	},
	startEditLabel : function(){
		this.labelEditor.startEditLabel();
	},
	hide : function(){
		this.ownerCt.hide();
		this.sendPanel.doLayout();
	},
	show : function(){
		this.ownerCt.show();
		this.sendPanel.doLayout();
	},
	getAttachs : function(){
		var records = this.getStore().getRange();
		var attachs = [],mailAttach;
		Ext.each(records,function(record){
			mailAttach = new CotMailAttach();
			Ext.apply(mailAttach,record.data);
			attachs.push(mailAttach);
		});
		return attachs;
	},
	doLayoutView:function(){
		try{
			this.setHeight('auto');
			this.setHeight(this.getHeight());
		}catch(e){
		}
		this.sendPanel.doLayout();
	},
	uploadAttachs : function(item){
		var attachUploadWin = new QH.ux.win.UploadWindow({
			swfUploadCfg : {
				file_upload_limit : 300, // 上传数量
				file_size_limit : 100 * 1024,
				post_params : {
					beanName : "MailSendService",
					uploadPath : "attach",
					isRName : true,
					doDbOp : false
				},
				listeners:{
					'fileUploadComplete':{
						fn:function(swfUpload,file,result){
							var attach = {
								name:file.name,
								size:file.size,
								url:result.filePath
							};
							this.addAttachs([attach]);
						},
						scope:this
					}
				}
			},
			reloadFn:function(result){
		
			}
		});
		attachUploadWin.show(item?item.el:undefined);
	}
});

Ext.reg('mailsendattachdataview',QH.mail.SendAttachDataView);