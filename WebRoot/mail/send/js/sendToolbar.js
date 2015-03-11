/**
 * 发送工具栏
 * @class QH.mail.SendToolbar
 * @extends Ext.Toolbar
 */
QH.mail.SendToolbar = Ext.extend(Ext.Toolbar,{
	/**
	 * @cfg {QH.mail.SendPanel} sendPanel
	 * 发送面板
	 */
	/**
	 * 
	 */
	initComponent : function(){
		this.defaults = {
			scale:'large'
		}
		this.items = [{
			text:"发送",
			iconCls:'mail_go',
			tooltip:'发送邮件',
			scope:this,
			ref:'sendBtn',
			handler:this.mailSend
		},{
			text:"存草稿",
			iconCls:'mail_save',
			ref:'draftBtn',
			scope:this,
			handler:this.mailSaveDraft
		},{
			text:"地址栏",
			iconCls:'mail_contact',
			tooltip:'地址栏的显示与隐藏',
			scope:this,
			ref:'contactBtn',
			menu:[{
				text:"添加抄送",
				ref:'ccBtn',
				baseText:'抄送',
				iconCls:'mail_contact_add',
				handler:this.setMailPersion.createDelegate(this,['cc'])
			},{
				text:"添加暗送",
				ref:'bccBtn',
				baseText:'暗送',
				iconCls:'mail_contact_add',
				handler:this.setMailPersion.createDelegate(this,['bcc'])
			},{
				text:"添加回复",
				ref:'replyToBtn',
				baseText:'回复',
				iconCls:'mail_contact_add',
				handler:this.setMailPersion.createDelegate(this,['replyTo'])
			},{
				text:'使用群发',
				ref:'partingBtn',
				iconCls:'mail_contact_add',
				handler:this.setMailParting.createDelegate(this,[])
			}]
			
		},{
			text:"附件",
			iconCls:'mail_attach',
			ref:'attachBtn',
			scope:this,
			handler:this.addAttach
		},{
			text:"替换签名",
			iconCls:'mail_add',
			ref:'switchBtn',
			scope:this,
			handler:this.switchSignature
		},'-',{
				xtype:'checkbox',
				name:'isHige',
				width:90,
				style:'height:12;',
				boxLabel:'重要邮件'
			},{
				xtype:'checkbox',
				name:'isNotification',
				width:90,
				style:'height:12;',
				boxLabel:'需要回执'
			},{
				xtype:'checkbox',
				name:'promptlySend',
				width:90,
				style:'height:12;',
				boxLabel:'立即发送'
			},{
				xtype:'checkbox',
				name:'quartzSend',
				style:'height:12;',
				width:70,
				boxLabel:'定时发送',
				listeners:{
					'check':function(box,checked){
						var quartzSendTime = this.sendPanel.getForm().findField('quartzSendTime');
						quartzSendTime.setDisabled(!checked);
						if(checked)
							quartzSendTime.show();
						else
							quartzSendTime.hide();
					},
					scope:this
				}
			},{
				xtype:'datetimefield',
				allowBlank:false,
				disabled:true,
				name:'quartzSendTime',
				fieldLabel:'发送时间'
			}];
		QH.mail.SendToolbar.superclass.initComponent.call(this);
	},
	addAttach : function(btn){
		this.sendPanel.sendBasePanel.attachPanel.uploadAttachs(btn);
	},
	/**
	 * 邮件发送
	 */
	mailSend : function(){
		this.anysMail(MAIL_TYPE.SENDING);
	},
	/**
	 * 邮件保存到草稿箱
	 */
	mailSaveDraft : function(){
		this.anysMail(MAIL_TYPE.DRAFT);
	},
	/**
	 * 分析邮件
	 */
	anysMail : function(type){
		var sendPanel = this.sendPanel;
		var form = sendPanel.getForm();
		if(!form.isValid()){
			Ext.Msg.show({
				title:'系统提示',
				msg:'请正确填写邮件格式',
				icon:Ext.Msg.WARNING,
				buttons:Ext.Msg.OK
			});
			return ;
		}
		var data = form.getFieldValues(); // 获得数据
		
		var sendTypeText = type == MAIL_TYPE.SENDING ? '邮件发送':'邮件存草稿';
		var to = [],cc = [],bcc = [],replyTo = [];
		
		var mailTag = data.mailTag ||　''; // 邮件标识
		
		if(sendPanel.partingShow){ // 群发
			to = this.sendPersonTo(form.findField('parting'));
			mailTag += MAIL_TAG.PARTING;
		}else{ 
			to = this.sendPersonTo(form.findField('to')); 
			if(sendPanel.ccShow)
				cc = this.sendPersonTo(form.findField('cc')); 
			if(sendPanel.bccShow)
				bcc = this.sendPersonTo(form.findField('bcc')); 
		}
		// 回复人
		if(sendPanel.replyToShow)
			replyTo = this.sendPersonTo(form.findField('replyTo')); 
			
		var sendCombox = form.findField('sender');
		var cfgId = sendCombox.getValue();
		var cfgRecord = sendCombox.store.getById(cfgId);
		if(!cfgRecord){
			Ext.Msg.show({
				title:'系统提示',
				msg:'请选择发件人',
				icon:Ext.Msg.WARNING,
				buttons:Ext.Msg.OK
			});
			return;
		}
		if(type == MAIL_TYPE.SENDING && to.length == 0){
			Ext.Msg.show({
				title:'系统提示',
				msg:'请正确填写收件人',
				icon:Ext.Msg.WARNING,
				buttons:Ext.Msg.OK
			});
			return;
		}
		// 立即或等待发送
		mailTag += data.promptlySend ? MAIL_TAG.PROMPTLY : MAIL_TAG.WAIT;
		
		var sendTime = '';
		
		if(data.quartzSend){// 定时发送
			mailTag += MAIL_TAG.QUARTZ;
			sendTime = data.quartzSendTime.getTime();
		}
		//alert(sendPanel.sendBasePanel.orderNo.getValue());
		var trackStatus = sendPanel.sendBasePanel.trackStatus.getValue()
		if(trackStatus != '' && trackStatus != null){
			trackStatus = {
				id:trackStatus
			}
		}else{
			trackStatus = null;
		}
		var customer = sendPanel.sendBasePanel.customerId.getValue()
		if(customer != '' && customer != null){
			customer = {
				id:customer
			}
		}else{
			customer = null;
		}
		var consigCust = sendPanel.sendBasePanel.consignCustId.getValue()
		if(consigCust != '' && consigCust != null){
			consigCust = {
				id:consigCust
			}
		}else{
			consigCust = null;
		}
		var mail = {
			sender:{
				name:cfgRecord.get('mailSendName') || GET_SESSION_EMPSID,
				emailUrl:cfgRecord.get('mailAccount')
			},
			nodeId:{
				accountCfgId:{
					id:cfgId
				}
			},
			isRead:true,
			mailTag:mailTag,
			mailType:type,
			sendTime:sendTime,
			priority:data.isHige ? MAIL_PRIORITY.HIGE : MAIL_PRIORITY.NORMAL,
			to:to,
			cc:cc,
			bcc:bcc,
			replyTo:replyTo,
			orderNo:sendPanel.sendBasePanel.orderNo.getValue(),
			orderRemark:sendPanel.sendBasePanel.orderRemark.getValue(),
			trackStatus:trackStatus,
			cfgId:cfgId,
			custId:customer,
			consignCustId:consigCust,
			belongEmpId:{
				id:GET_SESSION_EMPS_ID
			}
		}
		var attachPanel = sendPanel.sendBasePanel.attachPanel;
		if(attachPanel.getStore().getCount() > 0){
			mail.isContainAttach = true;
			mail.attachs = attachPanel.getAttachs();
		}else{
			mail.isContainAttach = false;
		}
		data.bodyHtml = form.findField('bodyHtml').getHTMLValue();
		
		Ext.applyIf(mail,data);
		
		var method = type == MAIL_TYPE.SENDING ? mailSendService.addSendout : mailSendService.saveDraft;
		QH_LOADMASK = new Ext.LoadMask(sendPanel.getEl(),{msg:sendTypeText+'中。。。'});
		QH_LOADMASK.show();
		method(mail,function(id){
			QH_LOADMASK.hide();
			
			if(type == MAIL_TYPE.SENDING){// 发送类型
				var sendMsg = '';
				if(data.quartzSend)	// 定时发送
					sendMsg = "邮件定时发送于 "+Ext.util.Format.date(new Date(sendTime),'Y年m月d日 H时i分s秒');
				else if(data.promptlySend)	// 立即发送
					sendMsg = '邮件立即发送成功';
				else
					sendMsg = '邮件等待发送'
//				Ext.Msg.show({
//					title:'系统提示',
//					msg:sendMsg,
//					buttons:Ext.Msg.OK,
//					icon:Ext.Msg.INFO
//				});
				setTimeout(function(){closeandreflashEC(true, sendPanel.gridId, false);},1000);
			}else{
				Ext.example.msg('系统提示', "保存草稿成功",sendPanel.getEl());
				form.findField('id').setValue(id);
				try{
					reflashParent(sendPanel.gridId);
				}catch(e){}
			}
		});
	},
	sendPersonTo : function(field){
		var tos = [];
		if(field.hidden)
			return [];
		var person = new QH.mail.MailPerson();
		var value = ""+field.getRawValue();
		var emails = value.split(';');
		Ext.each(emails,function(email){
			if(person.setObj(email)){
				tos.push(person.toObj());
			}
		});
		return tos;
	},
	/**
	 * 设置群发
	 */
	setMailParting : function(isShow){
		var sendPanel = this.sendPanel;	// 获得主面板
		var form = sendPanel.getForm();	// 获得表单
		var contactMenu = this.contactBtn.menu;  // 获得联系人菜单
		var partingBtn =  contactMenu.partingBtn;	// 获得控制按钮
		var partingField =  form.findField('parting');	// 获得群发控件
		var toField =  form.findField('to');	// 获得收件人控件
		sendPanel.partingShow = isShow !== undefined ? isShow : !sendPanel.partingShow;
		if(sendPanel.partingShow){
			partingBtn.setText('取消群发');
			partingBtn.setIconClass('mail_contact_delete');
	        sendPanel.sendBasePanel.personPanel.hide();   
	       	partingField.personField.show();   
	       	partingField.fireEvent('focus',partingField);
	        partingField.setValue(toField.getValue());
		}else{
			partingBtn.setText('使用群发');
			partingBtn.setIconClass('mail_contact_add');
	       	sendPanel.sendBasePanel.personPanel.show();   
	        partingField.personField.hide();   
	        toField.fireEvent('focus',toField);
	       	toField.setValue(partingField.getValue());
		}
		contactMenu.ccBtn.setDisabled(sendPanel.partingShow);
		contactMenu.bccBtn.setDisabled(sendPanel.partingShow);
		
		sendPanel.doLayout();
	},
	/**
	 * 设置是否显示邮件联系人地址，及相关按钮切换
	 * @param {} person　联系人关键名
	 * @param {} isShow　是否显示，可为空
	 */
	setMailPersion : function(person,isShow){
		var sendPanel = this.sendPanel;	// 获得主面板
		var form = sendPanel.getForm();	// 获得表单
		var contactMenu = this.contactBtn.menu;  // 获得联系人菜单
		var field =  form.findField(person);	// 获得地址控件
		var btn =  contactMenu[person+"Btn"];	// 获得控制按钮
		// 切换显示
		sendPanel[person + "Show"] = isShow !== undefined ? isShow : !sendPanel[person + "Show"];
		if(sendPanel[person + "Show"]){
			btn.setText('取消'+btn.baseText);
			btn.setIconClass('mail_contact_delete');
	        field.personField.show();   
		}else{
			btn.setText('添加'+btn.baseText);
			btn.setIconClass('mail_contact_add');
	        field.personField.hide();   
		}
		sendPanel.doLayout();
	},
	switchSignature:function(){
		var win = new Ext.Window({
			title:'替换签名',
			layout:'fit',
			width:400,
			height:250,
			closeAction:'close',
			items:[{
				xtype:'switchsignature'
			}]
		});
		win.show();
	}
});
Ext.reg('mailsendtoolbar',QH.mail.SendToolbar);