
$import('mail/info/js/mailAttachView.js');
$import('mail/info/js/mailPersonView.js');

/**
 * 邮件详细面板
 * @class QH.mail.DetailPanel
 * @extends Ext.Panel
 */
QH.mail.DetailPanel = Ext.extend(Ext.Panel,{
	layout:'border',
	selRecord:'',
	selMail:'',
	initComponent : function(){
		var fieldTpl = new Ext.Template(
		    '<div class="x-form-item {itemCls}" tabIndex="-1" style="margin-bottom:0;">',
		        '<label for="{id}" class="x-form-item-label" style="width:55px;color:#99A">{label}：</label>',
		        '<div class="x-form-element" id="x-form-el-{id}" style="padding-left:0;padding-top:3px;">',
		        '</div><div class="{clearCls}"></div>',
		    '</div>'
		);
		//Ext.layout.FormLayout
		this.items = [{
			region:'north',
			border:false,
			ref:'topPanel',
			//title:'achui',
			collapsed:false,
			collapsible:true,
			bodyStyle:'padding:10px;font:normal 11px tahoma,arial,helvetica,sans-serif;word-wrap:break-word;',
			autoHeight:true,
			defaults:{
				border:false
			},
			layout:'form',
			layoutConfig:{
				fieldTpl:fieldTpl,
				trackLabels:true
			},
			items:[{
				ref:'../headPanel',
				defaults:{
					border:false
				},
				layout:'form',
				layoutConfig:{
					fieldTpl:fieldTpl,
					trackLabels:true
				},
				items:[{
					style:'font-weight: bold;font-size:12px;',
					ref:'subjectPanel'
				},{
					xtype:'mailpersondataview',
					detailPanel:this,
					style:'padding:3px 0px 3px 0px',
					ref:'senderPanel'
				},{
					fieldLabel:'时　间',
					ref:'sendTimePanel'
				},{
					xtype:'mailpersondataview',
					fieldLabel:'收件人',
					detailPanel:this,
					ref:'toPanel'
				},{
					xtype:'mailpersondataview',
					fieldLabel:'抄送人',
					detailPanel:this,
					ref:'ccPanel'
				},{
					ref:'orderinfoPanel'
				},{
					ref:'trackerEmpsPanel'				
				}]
			},{
				fieldLabel:'附　件',
				xtype:'mailattachdataview',
				detailPanel:this,
				ref:'../attachPanel'
			},{
    			html:'<hr>'
			}]
		},{
			region:'center',
			border:false,
			ref:'bodyPanel',
			listeners:{
				'render':{
					fn:function(panel){
						this.createIFrame();
					},
					scope:this
				},
				'resize':{
					fn:function(panel, aw, ah, w, h){
						this.doLayout(); // 防止拖动时，面板高度不对
					},
					scope:this
				}
			}
		}];
		QH.mail.DetailPanel.superclass.initComponent.call(this);
		this.addEvents('iframerender');
	},
	createIFrame: function(){
		var panel = this;
		var iframe = document.createElement('iframe');
        iframe.name = Ext.id();
        iframe.frameBorder = '0';
        iframe.padding = '0';
        iframe.margin = '0';
        iframe.width = '100%';
        iframe.style.height = '100%';
        
        var iframeOnLoad = function() {
        	if(panel.mail && !panel.mail.body)
        		panel.mail.body = panel.getDoc().documentElement.outerHTML; 
        	try{
        		var anchors = panel.getDoc().getElementsByTagName("a");
        		for(var i=0; i<anchors.length; i++){
        			var anchor = anchors[i];
        			anchor.target = "_blank";
        		}
        	}catch(e){}
		};
        if (iframe.attachEvent)	// IE iframe onload事件
			iframe.attachEvent("onload", iframeOnLoad);
		else // 非IE
			iframe.onload = iframeOnLoad;
			
        this.bodyPanel.el.dom.firstChild.firstChild.appendChild(iframe);
        this.iframe = iframe;
        this.fireEvent('iframerender',this,iframe);
	},
	// private
	getDoc : function(){
        return Ext.isIE ? this.getWin().document : (this.iframe.contentDocument || this.getWin().document);
    },
    // private
    getWin : function(){
        return Ext.isIE ? this.iframe.contentWindow : window.frames[this.iframe.name];
    },
	/**
	 * @param {} mail
	 */
	setMailRead:function(mail){
		if(!mail.isRead){
			mailUpdateService.updateMailRead([mail.id],true,function(){
			});
		}
	},
	loadMailRecord : function(record){
//		if(this.selRecord && this.selRecord.id == record.id)
//			return;
		this.selRecord = record;
		this.loadMailData(record.data);
		if(!record.get('isRead')){
			record.set('isRead',true);
			record.commit();
		}
	},
    /**
     * 加载邮件
     * @param {} mail
     */
    loadMailData : function(mail){
    	this.loadMailHead(mail);
    	if(!this.collapsed && this.selMail.id != mail.id){
    		this.setMailRead(mail);
    		var panel = this;
    		this.selMail = mail;
    		// 加载邮件信息头
    		//this.loadMailHead(mail);
    		if(mail.isContainAttach){ // 如果存在附件并且未读取，则读取加载
    			if(!mail.attachs){
    				mailReadService.getMailAttach(mail.id,function(attachs){
    					panel.loadMailAttach(attachs);
    				});
    			}else{
    					panel.loadMailAttach(mail.attachs);
    			}
    		}else{
	    		panel.loadMailAttach([]); // 清空附件
    		}
    		
    		if(mail.body){ // 已读取过，直接写入数据
	    		var doc = this.getDoc();
	    		doc.open();
		        doc.write(mail.body);
		        doc.close();
	    	}else{
				var params = {
					'mail.id':mail.id,
					'mail.bodyType':mail.bodyType
				};
				this.iframe.src = "body_mail.do?" + Ext.urlEncode(params);
	    	}
    	} 
    },
    loadMailHead :function(mail){
    	var headPanel = this.headPanel;
    	// 主题
    	var subject = mail.subject || '<div style="color:#888888;font-weight: normal;">(无主题)</div>';
    	//headPanel.subjectPanel.el.dom.innerHTML = mail.subject || '<div style="color:#888888;font-weight: normal;">(无主题)</div>';
    	if($('CRM_collapsedText')){
    		$('CRM_collapsedText').innerHTML = subject;
    		this.topPanel.setTitle(subject);
    	}else{
    		this.topPanel.setTitle(subject);
    	}
    	//this.topPanel.setTitle(headPanel.subjectPanel.el.dom.innerHTML);
    	//this.topPanel.doLayout();
    	// 时间
		headPanel.sendTimePanel.el.dom.innerHTML = (mail.sendTime || mail.addTime).format('Y年m月d日 H:i(星期D)');
		// 发件人
		this.loadMailLabel(headPanel.senderPanel,[mail.sender]);
		// 收件人
		this.loadMailLabel(headPanel.toPanel,mail.to);
		// 抄送人
		this.loadMailLabel(headPanel.ccPanel,mail.cc);
		//订单状态
		var orderMsg = "<h3>单号：{0} | 海运备注：{1} | 空运备注：{2} | 状态：{3}</h3>";
		var orderNo = mail.orderNo == null?"无":mail.orderNo;
		var orderRemark = mail.orderRemark == null?"无":mail.orderRemark;
		var orderAirRemark = mail.orderAirRemark == null?"无":mail.orderAirRemark;
		var status = mail.trackStatus == null?"无":mail.trackStatus.content;
		headPanel.orderinfoPanel.el.dom.innerHTML = String.format(orderMsg,orderNo,orderRemark,orderAirRemark,status);
		//获取跟踪业务员和委托客户
		var custId = mail.custId;
		var consignCustId = mail.consignCustId;
		var subMenu = Ext.getCmp("trackerEmps");
		headPanel.trackerEmpsPanel.el.dom.innerHTML = "";
		var msg = "";
		DWREngine.setAsync(false);
		if(custId != null && custId != ""){
			var trackerEmps = "";
			baseSerivce.getListByCondition("CotContact",{customerId:custId.id},function(res){
				Ext.each(res,function(contact){
					if(contact.empsId == null) return false;
					var empsId = contact.empsId.empsId;
					if(trackerEmps.indexOf(empsId) > -1) return false;
					trackerEmps += empsId +",";
				});
				if(trackerEmps != "")
					msg += "跟踪业务员：<font color='red'>"+trackerEmps+"</font>";
			});
		} 
		if(consignCustId){
			msg += " | 委托客户:"+consignCustId.customerShortName;
		}
		headPanel.trackerEmpsPanel.el.dom.innerHTML = msg;
		DWREngine.setAsync(true);
    },
    loadMailAttach : function(attachs){
    	var attachPanel = this.attachPanel;
    	attachPanel.addAttachs(attachs);
    },
    /**
     * 加载数据为label标签，并加到相应面板上
     * @param {} panel 要添加标签的面板
     * @param {} labelXtype	标签xtype
     * @param {} datas 数据集
     */
    loadMailLabel : function(panel,datas){
    	if(Ext.isEmpty(datas)){ // 没有数据，则隐藏面板
    		panel.hide();
    	}else{
    		panel.show();
	    	panel.loadData(datas);
    	}
    },
    /**
     * 打印邮件
     */
    printMail:function(){
		$('printcontent').value = this.topPanel.el.dom.innerHTML
					+"<div style='margin-left:15px'>"
					+this.getDoc().body.innerHTML;
					+"</div>";
		$('printForm').action = "print_mail.do?rnd"+Math.random();
		$('printForm').method = "POST";
		$('printForm').target="_blank";
		$('printForm').submit();
    }
});

Ext.reg('maildetailpanel',QH.mail.DetailPanel);
