
$import('mail/info/js/mailAttachView.js');
$import('mail/send/js/sendAttachView.js');

/**
 * 邮件发送面板
 * @class QH.mail.SendPanel
 * @extends Ext.FormPanel
 */
QH.mail.SendPanel = Ext.extend(Ext.FormPanel,{
	/**
	 * @cfg {Ext.Toolbar} sendToolbar
	 * 发送工具栏
	 */
	/**
	 * @cfg {Ext.Panel} sendBasePanel
	 * 发送基本信息面板
	 */
	/**
	 * 
	 * @type Boolean
	 */
	bodyBorder:false,
	border:false,
	bodyStyle:{
		backgroundColor: '#DFE8F6'
	},
	layout:'border',
	/**
	 * 是否群发，默认不群发
	 * @type Boolean
	 */
	partingShow:false,
	/**
	 * 是否抄送，默认不抄送
	 * @type Boolean
	 */
	ccShow:true,
	/**
	 * 是否暗送，默认不暗送
	 * @type Boolean
	 */
	bccShow:false,
	/**
	 * 是否回复，默认不回复
	 * @type Boolean
	 */
	replyToShow:false,
	/**
	 * 发送类型状态
	 */
	sendTypeStatus:'',
	/**
	 * 目标邮件ID
	 */
	mailId:'',
	/**
	 * 邮件对象
	 */
	mailObj:null,
	/**
	 * 签名对象
	 */
	signObj:null,
	/**
	 * 原始邮件内容
	 */
	orginHtml:null,
	initComponent:function(){
		this.items = [{
			region:'north',
			xtype:'mailsendtoolbar',
			ref:'sendToolbar',
			sendPanel:this,
			height:40
		},{
			region:'center',
			margins:'5 0 5 5',
			border:false,
			layout:'border',
			items:[{
				region:'north',
				xtype:'mailsendbaespanel',
				ref:'../sendBasePanel',
				split:true,
				sendPanel:this,
				collapseMode:'mini',
				height:220
			},{
				region:'center',
				xtype:'mailhtmleditor',
				name:'bodyHtml',
				listeners:{
					'push':{
						fn:function(htmlEditor,html){
							this.getForm().findField('subject').focus();
							htmlEditor.focusByChildElement("span[tage='mouseFocus']");
						},
						scope:this
					}
				}
			}]
		},{
			region:'east',
			xtype:'mailcontacttab',
			ref:'contactTab',
			collapseMode:'mini',
			split:true,
			margins:'5 5 5 0',
			width:390,
			maxSize:450,
			minSize:150
		}];
		
		QH.mail.SendPanel.superclass.initComponent.call(this);
		
	},
	/**
	 * 根据数据初始化面板
	 * @param {} panel
	 */
	initPanel : function(){
		var sendToolbar = this.sendToolbar;
		if(this.partingShow)
			sendToolbar.setMailParting(this.partingShow);
		sendToolbar.setMailPersion('cc',this.ccShow);
		sendToolbar.setMailPersion('bcc',this.bccShow);
		sendToolbar.setMailPersion('replyTo',this.replyToShow);
		
		var form = this.getForm();
		form.findField('quartzSendTime').hide();
	},
	renderTemplate : function(mail,template,sign){
		var base = '<img src="[^"]*common/ext/resources/images/mail/MACRO/([^.]+).gif"[^>]*>';
		var reg = new RegExp(base,'gi');
		mail.bodyHtml = template.replace(reg,function(sMatch,p1){
			return QH.mail.renderTemplateFn(p1,mail,sign);
		});
		//s.replace(/(\r\n)/mg,   "<br/>"); 
	},
	/**
	 * 初始化数据
	 */
	initSendMailData : function(){
		var sendPanel = this;
		var sendTypeStatus = this.sendTypeStatus;	// 发送类型
		
		var templateTag;	// 模板标识
		var showAttach = false; // 是否显示附件
		if(sendTypeStatus == MAIL_SEND_TYPE_STATUS.NEW){	// 撰写新邮件
			templateTag = MAIL_TEMPLATE_TAG.NEW;
		}else if(sendTypeStatus == MAIL_SEND_TYPE_STATUS.FORWARD){	// 转发
			showAttach = true;
			templateTag = MAIL_TEMPLATE_TAG.FORWARD;
		}else if(sendTypeStatus == MAIL_SEND_TYPE_STATUS.REPLY
				||sendTypeStatus == MAIL_SEND_TYPE_STATUS.REPLYALL){	// 回复
			templateTag = MAIL_TEMPLATE_TAG.REPLY;
		}else if(sendTypeStatus == MAIL_SEND_TYPE_STATUS.ATTACHREPLY){	// 带附件回复
			templateTag = MAIL_TEMPLATE_TAG.REPLY;
			showAttach = true;
		}else if(sendTypeStatus == MAIL_SEND_TYPE_STATUS.ATTACHEML){ //作为附件转发
			showAttach = true;
			templateTag = MAIL_TEMPLATE_TAG.NEW;//用新建模板
		}else{	// 转发
			showAttach = true;
		}
		sendPanel.templateTagObj = templateTag;
		if(templateTag){
			
			DWREngine.setAsync(false);
			var template,sign;
			mailTemplateService.getEmpsTemplate(GET_SESSION_EMPS_ID,MAIL_TEMPLATE_TYPE.TEMPLATE,templateTag,function(res){
				template = res;
			});
			mailTemplateService.getEmpsTemplate(GET_SESSION_EMPS_ID,MAIL_TEMPLATE_TYPE.SIGNATURE,null,function(res){
				sign = res;
			});
			this.signObj = sign;
			DWREngine.setAsync(true);
		}
		
		if(sendTypeStatus != MAIL_SEND_TYPE_STATUS.NEW){
			var sendEmail = this.sendEmail;
			// 获得邮件信息
			mailReadService.getSendMailInfo(this.mailId,showAttach,function(mail){
				// 已不存在
				if(!mail)
					return;
				sendPanel.mailObj = mail;//获取邮件对象，用于切换模板使用
				sendPanel.orginHtml = mail.bodyHtml;
				//alert(sendPanel.mailObj.bodyHtml);
				// 解析模板
				if(template)
					sendPanel.renderTemplate(mail,template,sign);
				else
					mail.bodyHtml = mail.bodyHtml || mail.bodyText;
				// 设置原相对邮件，如果为回复、回复全部、转发
				if(sendTypeStatus == MAIL_SEND_TYPE_STATUS.REPLY
					|| sendTypeStatus == MAIL_SEND_TYPE_STATUS.REPLYALL
					|| sendTypeStatus == MAIL_SEND_TYPE_STATUS.ATTACHEML
					|| sendTypeStatus == MAIL_SEND_TYPE_STATUS.FORWARD){
					mail.oldMailId = mail.id;
					if(sendTypeStatus == MAIL_SEND_TYPE_STATUS.FORWARD || MAIL_SEND_TYPE_STATUS.ATTACHEML)
						mail.mailTag = MAIL_TAG.FORWARD
					else
						mail.mailTag = MAIL_TAG.REPLY
				}
				// 去除ID，如果为回复、回复全部、转发、再次发送
				if(sendTypeStatus == MAIL_SEND_TYPE_STATUS.REPLY
					|| sendTypeStatus == MAIL_SEND_TYPE_STATUS.REPLYALL
					|| sendTypeStatus == MAIL_SEND_TYPE_STATUS.FORWARD
					|| sendTypeStatus == MAIL_SEND_TYPE_STATUS.ATTACHEML
					|| sendTypeStatus == MAIL_SEND_TYPE_STATUS.AGAIN){
					mail.id = '';
				}
				
				var mailTag = mail.mailTag;
				// 状态，为草稿修改、再次发送
				if(mailTag &&(sendTypeStatus == MAIL_SEND_TYPE_STATUS.MODIFY
					|| sendTypeStatus == MAIL_SEND_TYPE_STATUS.AGAIN)){
						if(mail.priority == MAIL_PRIORITY.HIGE){// 紧急重要
							mail.isHige = true;
						}
						if(mailTag.indexOf(MAIL_TAG.PROMPTLY) != -1){// 立即发送
							mail.promptlySend = true;
						}
						if(sendTypeStatus == MAIL_SEND_TYPE_STATUS.MODIFY && mailTag.indexOf(MAIL_TAG.QUARTZ) != -1){// 定时发送
							mail.quartzSend = true;
							mail.quartzSendTime = mail.sendTime;
						}
						
						// 重新设置,清除之前邮件标识
						if(mailTag.indexOf(MAIL_TAG.REPLY) != -1)// 回复标识
							mail.mailTag = MAIL_TAG.REPLY;
						else if(mailTag.indexOf(MAIL_TAG.FORWARD) != -1)// 转发标识
							mail.mailTag = MAIL_TAG.FORWARD;
						else
							mail.mailTag = '';
				}
				sendPanel.getForm().setValues(mail);
				var urlsStr = '';
				// 设置接收人，回复只设置发送人，回复全部设置所有人，转发，不设置
				var tos = [];
				if(sendTypeStatus == MAIL_SEND_TYPE_STATUS.REPLY){ // 回复
					if(!Ext.isEmpty(mail.replyTo))	// 存在回复地址，取回复地址
						tos = tos.concat(mail.replyTo);
					else	// 取发件人
						tos.push(mail.sender)
					//不显示抄送
					var field = sendPanel.getForm().findField('cc');
					field.setValue('');
					this.ccShow = false;
					//暗送也不显示
					var field = sendPanel.getForm().findField('bcc');
					field.setValue('');
					this.bccShow = false;
					
				}else if(sendTypeStatus == MAIL_SEND_TYPE_STATUS.REPLYALL){ // 回复所有
					if(!Ext.isEmpty(mail.replyTo))	// 存在回复地址
						tos = tos.concat(mail.replyTo);
					else if (mail.sender && mail.sender.emailUrl != sendEmail) // 发件
						tos.push(mail.sender);
					Ext.each(mail.to,function(person){
						if(person.emailUrl != sendEmail)
							tos.push(person)
					});
				}else if(sendTypeStatus == MAIL_SEND_TYPE_STATUS.FORWARD
						||sendTypeStatus == MAIL_SEND_TYPE_STATUS.ATTACHEML){// 转发，不做处理
					//如果有抄送，则不显示
					var field = sendPanel.getForm().findField('cc');
					field.setValue('');
					this.ccShow = false;
					//暗送也不显示
					var field = sendPanel.getForm().findField('bcc');
					field.setValue('');
					this.bccShow = false;
					
				}else if(sendTypeStatus == MAIL_SEND_TYPE_STATUS.PARTINGERROR){ // 群发失败处理
					tos =  tos.concat(mail.to.slice(mail.toIndex));
					sendPanel.partingShow = true; // 显示为群发
				}else if(mail.to){ // 再次发送或草稿
					tos = tos.concat(mail.to);
					if(mailTag && mailTag.indexOf(MAIL_TAG.PARTING) != -1)
						sendPanel.partingShow = true; // 显示为群发
				}
				// 设置收件人值
				sendPanel.setPersonFieldValue('to',tos);
				// 设置抄送，为草稿修改、再次发送、回复全部
				if(!Ext.isEmpty(mail.cc)
					&&(sendTypeStatus == MAIL_SEND_TYPE_STATUS.MODIFY
					|| sendTypeStatus == MAIL_SEND_TYPE_STATUS.AGAIN
					//|| sendTypeStatus == MAIL_SEND_TYPE_STATUS.REPLY
					|| sendTypeStatus == MAIL_SEND_TYPE_STATUS.REPLYALL)){
					sendPanel.setPersonFieldValue('cc',mail.cc);
				}
				// 设置暗送，为草稿修改、再次发送
				if(!Ext.isEmpty(mail.bcc)
					&&(sendTypeStatus == MAIL_SEND_TYPE_STATUS.MODIFY
					|| sendTypeStatus == MAIL_SEND_TYPE_STATUS.AGAIN)){
					sendPanel.setPersonFieldValue('bcc',mail.bcc);
				}
				// 设置回复，为草稿修改、再次发送
				if(!Ext.isEmpty(mail.replyTo)
					&&(sendTypeStatus == MAIL_SEND_TYPE_STATUS.MODIFY
					|| sendTypeStatus == MAIL_SEND_TYPE_STATUS.AGAIN)){
					sendPanel.setPersonFieldValue('replyTo',mail.replyTo);
				}
				if(sendTypeStatus == MAIL_SEND_TYPE_STATUS.ATTACHEML){ //作为附件转发
					var attach = {};
					attach.name = mail.subject+'.eml';
					attach.url = mail.emlPath;
					attach.size = null;
					sendPanel.sendBasePanel.attachPanel.addAttachs([attach]);
				}// 设置附件
				else if(!Ext.isEmpty(mail.attachs)){
					sendPanel.sendBasePanel.attachPanel.addAttachs(mail.attachs);
				}
				//设置关联订单
				sendPanel.setRelateOrder();
				// 根据数据，初始化面板
				sendPanel.initPanel();
			});
		}else{
			// 解析模板
			if(template){
				var mail = {bodyHtml:""};
				sendPanel.mailObj = mail;//获取邮件对象，用于切换模板使用
				sendPanel.renderTemplate(mail,template,sign);
				sendPanel.getForm().setValues({
					bodyHtml:mail.bodyHtml
				});
			}
			if($('contactEmail').value && $('contactEmail').value != 'null'){
				var person = new QH.mail.MailPerson();
				person.name = $('contactPerson').value;
				person.emailUrl = $('contactEmail').value;
				sendPanel.setPersonFieldValue('to',[person]);
				sendPanel.setRelateOrder();
			}
			if($('attachPath').value && $('attachPath').value != 'null'){
				showAttach = true;
				//printObject($('attachPath').value)
				var attach = Ext.decode($('attachPath').value);
				sendPanel.sendBasePanel.attachPanel.addAttachs([attach]);
			}
			// 根据数据，初始化面板
			sendPanel.initPanel();
		}
	},
	/**
	 * 设置表单值
	 * @param {} fieldName 表单名
	 * @param {} persons 邮件地址对象
	 */
	setPersonFieldValue : function(fieldName,persons){
		var field = this.getForm().findField(fieldName);
		var urls = '';
		Ext.each(persons, function(person) {
			var mailPerson = new QH.mail.MailPerson();
			mailPerson.setUrl(person.emailUrl);
			mailPerson.setName(person.name);
			urls += mailPerson.toString() + ";";
		});
		field.urlRange.saveValue(urls);
		field.setValue(urls);
		this[fieldName+"Show"] = true;
	},
	setRelateOrder:function(){
		var basePanel = this.sendBasePanel;
		if($('custId').vaule && $('custId').vaule != 'null')
			basePanel.customerId.bindValue($('custId').value);
		if($('consignCustId').value && $('consignCustId').value != 'null')
			basePanel.consignCustId.bindValue($('consignCustId').value);
		if($('orderNo').value && $('orderNo').value != 'null'){
			basePanel.orderNo.setRawValue($('orderNo').value);
			basePanel.orderNo.setValue($('orderNo').value);
		}
		if($('orderRemark').value && $('orderRemark').value != 'null')
			basePanel.orderRemark.setValue($('orderRemark').value);
		if($('orderAirRemark').value && $('orderAirRemark').value != 'null')
			basePanel.orderAirRemark.setValue($('orderAirRemark').value);
		if($('orderPol').value && $('orderPol').value != 'null')
			basePanel.orderPol.setValue($('orderPol').value);
		if($('orderPod').value && $('orderPod').value != 'null'){
			basePanel.orderPod.setValue($('orderPod').value);
		}
		if($('orderStatus').value && $('orderStatus').value != 'null')
			basePanel.trackStatus.bindValue($('orderStatus').value);
	}
});

Ext.reg('mailsendpanel',QH.mail.SendPanel);
/**
 * 发送基本信息面板
 * @class QH.mail.SendBaseFormPanel
 * @extends Ext.form.FormPanel
 */
QH.mail.SendBasePanel = Ext.extend(Ext.Panel,{
	/**
	 * @cfg {QH.mail.SendPanel} sendPanel
	 * 发送面板
	 */
	/**
	 * 
	 * @type Number
	 */
	labelWidth:50,
	labelAlign:"right",
	frame:true,
	layout:'form',
	initComponent : function(){
		var sendStore = new QH.mail.SendStore();
		var sendCombo = new Ext.form.ComboBox({
			fieldLabel:"发件人",
			anchor:"100%",
			name:"sender",
		    triggerAction: 'all',
		    editable:false,
			forceSelection:true,
		    mode: 'local',
		    store: sendStore,
		    valueField: 'id',
		    displayField: 'mailAccount',
		    tpl : '<tpl for=".">' +
		    		'<div class="x-combo-list-item">{mailSendName}' +
		    			'&lt;{mailAccount}&gt;' +
		    			'<font color=#858585>(' +
		    				'<tpl if="empId">' +
	    					'个人邮箱：<tpl for="empId">{empsId}</tpl>' +
	    					'</tpl>' +
	    					'<tpl if="empId==\'\'">' +
	    					'公共邮箱' +
	    					'</tpl>' +
		    				'<tpl if="mailNickname">，账号别名：{mailNickname}</tpl>' +
		    			')</font>' +
				  	'</div>' +
				  '</tpl>',
		    setValue : function(v){
		        var text = v;
	            var r = this.findRecord(this.valueField, v);
	            if(r){
	            	var data = r.data;
	                text = data[this.displayField];
	                if(Ext.isEmpty(data.mailSendName)){
		                text = GET_SESSION_EMPSID + '<'+ text + '>';
	                }else{
		                text = data.mailSendName + '<'+ text + '>';
	                }
	            }
		        this.lastSelectionText = text;
		        if(this.hiddenField){
		            this.hiddenField.value = Ext.value(v, '');
		        }
		        Ext.form.ComboBox.superclass.setValue.call(this, text);
		        this.value = v;
		        return this;
		    }
		});
		sendStore.on('load',function(store,records,options){
			sendCombo.setValue(Ext.getDom('accountId').value);
		},this);
		this.items = [sendCombo,{
			layout:'form',
			ref:'personPanel',
			items:[{
				xtype:'personfield',
				textLabel:'收件人',
				name:'to',
				showParting:true,
				isChecked:false,
				listeners:{
					'fieldchange':{
						fn:this.toFieldChange,
						scope:this
					},
					'checkedchange':{
						fn:this.checkedchange,
						scope:this
					}
				}
			},{
				xtype:'personfield',
				textLabel:'抄　送',
				hidden:true,
				name:'cc'
			},{
				xtype:'personfield',
				textLabel:'密　送',
				hidden:true,
				name:'bcc'
			}]
		},{
			xtype:'personfield',
			textLabel:'群　发',
			hidden:true,
			name:'parting',
			showParting:true,
			isChecked:true,
			listeners:{
				'fieldchange':{
					fn:this.toFieldChange,
					scope:this
				},
				'checkedchange':{
					fn:this.checkedchange,
					scope:this
				}
			}
		},{
			xtype:'personfield',
			textLabel:'回　复',
			hidden:true,
			name:'replyTo'
		},{
			xtype:"textfield",
			fieldLabel:"主　题",
			anchor:"100%",
			name:"subject"
		},{
			layout:'form',
			hidden:true,
			items:[{
				xtype:'mailsendattachdataview',
				fieldLabel:'附　件',
				sendPanel:this.sendPanel,
				ref:'../attachPanel'
			}]
		},{
			xtype:'fieldset',
			title:'关联订单',
			layout:'column',
			items:[{
				layout:'form',
				width:160,
				labelWidth:60,
				items:[{
					xtype:'customerbasecombo',
					name:"customerId.id",
					id:'relate_custcombo',
					hiddenName:"customerId.id",
					ref:"../../customerId",
					width:100,
					fieldLabel:"客户"
				}]
			},{
				layout:'form',
				width:160,
				items:[{
					xtype:'ordernocombo',
					fieldLabel:'单号',
					width:100,
					parentCombo : 'relate_custcombo',
					parentComboWith:'custId',
					allowBlank : true,
					needReset : false,
					ref:"../../orderNo",
					listeners:{
						'select':function(combo, record, index ){
							var basePanel = this.sendPanel.sendBasePanel;
							basePanel.orderPol.setValue(record.get('pol'));
							basePanel.orderPod.setValue(record.get('pod'));
							basePanel.orderRemark.setValue(record.get('remark'));
							basePanel.orderAirRemark.setValue(record.get('airRemark'));
							basePanel.trackStatus.bindValue(record.get('trackStatus'));
						},
						scope:this
					}
				}]
			},{
				layout:'form',
				width:160,
				items:[{
					xtype:'textfield',
					fieldLabel:'海运',
					width:100,
					ref:"../../orderRemark"
				}]
			},{
				layout:'form',
				width:160,
				items:[{
					xtype:'textfield',
					fieldLabel:'空运',
					width:100,
					ref:"../../orderAirRemark"
				}]
			},{
				layout:'form',
				width:160,
				items:[{
					xtype : 'commontypebasecombo',
					queryParams : {
						flag : 'wlzt'
					},
					width:100,
					fieldLabel : '状态',
					noBlankColor : true,
					hiddenName : 'trackStatus',
					ref:"../../trackStatus"
				}]
			},{
				layout:'form',
				width:160,
				items:[{
					xtype:'textfield',
					fieldLabel:'起运港',
					width:100,
					ref:"../../orderPol"
				}]
			},{
				layout:'form',
				width:160,
				labelWidth:60,
				items:[{
					xtype:'customerbasecombo',
					dataUrl : "commoncombo.do",
					name:"consignCustId.id",
					ref:"../../consignCustId",
					hiddenName:"consignCustId.id",
					width:100,
					fieldLabel:"委托客户"
				}]
			},{
				layout:'form',
				width:160,
				items:[{
					xtype:'textfield',
					fieldLabel:'目的港',
					width:100,
					ref:"../../orderPod"
				}]
			}]
		}
//		,{
//			layout:'column',
//			style:'padding-left:55;',
//			items:[{
//				xtype:'checkbox',
//				name:'isHige',
//				width:90,
//				style:'height:12;',
//				boxLabel:'重要邮件'
//			},{
//				xtype:'checkbox',
//				name:'isNotification',
//				width:90,
//				style:'height:12;',
//				boxLabel:'需要回执'
//			},{
//				xtype:'checkbox',
//				name:'promptlySend',
//				width:90,
//				style:'height:12;',
//				boxLabel:'立即发送'
//			},{
//				xtype:'checkbox',
//				name:'quartzSend',
//				style:'height:12;',
//				width:70,
//				boxLabel:'定时发送',
//				listeners:{
//					'check':function(box,checked){
//						var quartzSendTime = this.sendPanel.getForm().findField('quartzSendTime');
//						quartzSendTime.setDisabled(!checked);
//						if(checked)
//							quartzSendTime.show();
//						else
//							quartzSendTime.hide();
//					},
//					scope:this
//				}
//			},{
//				xtype:'datetimefield',
//				allowBlank:false,
//				disabled:true,
//				name:'quartzSendTime',
//				fieldLabel:'发送时间'
//			}
//			]
//		}
		,{
			xtype:'hidden',
			name:'id'
		},{
			xtype:'hidden',
			name:'oldMailId'
		},{
			xtype:'hidden',
			name:'mailTag'
		}];
		
		QH.mail.SendBasePanel.superclass.initComponent.call(this);
	},
	toFieldChange : function(field,newValue){
		var bodyField = this.sendPanel.getForm().findField('bodyHtml');
		var sendMailToNameSpan = Ext.DomQuery.selectNode("span[tage='sendMailToName']",bodyField.getEditorBody());
		if(sendMailToNameSpan){
			var reg = /([^<@]+)/;
			reg.test(newValue);
			sendMailToNameSpan.innerHTML = RegExp.$1;
		}
	},
	checkedchange :function(personfield){
		//触发sendToolbar的partingBtn单击事件
		var partingBtn = QH_VIEWPORT.sendPanel.sendToolbar.contactBtn.menu.partingBtn;
		partingBtn.fireEvent('click');
//		if(personfield.name == 'to'){
//			personfield.personBtn.setText("群发");
//		}else if(personfield.name == 'parting'){
//			personfield.personBtn.setText("单发");
//		}
//		alert(personfield.name)

	}
});
Ext.reg('mailsendbaespanel',QH.mail.SendBasePanel);
