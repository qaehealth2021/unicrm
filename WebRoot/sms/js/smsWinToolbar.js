/**
 * 发送工具栏
 * @class QH.sms.SmsWinToolbar
 * @extends Ext.Toolbar
 */
QH.sms.SmsWinToolbar = Ext.extend(Ext.Toolbar,{
	/**
	 * @cfg {QH.mail.SendPanel} sendPanel
	 * 发送面板
	 */
	/**
	 * 
	 */
	contactId : '',
	initComponent : function(){
		this.items = [{
			xtype:'label',
			hidden:this.contactNbr?true:false,
			text:'请先选择左边联系人或直接输入手机号码'
		},'->',{
			text:"发送",
			iconCls:'mail_go',
			tooltip:'发送短信',
			scale:'large',
			scope:this,
			ref:'sendBtn',
			handler:this.sendSms.createDelegate(this)
			
//			form.saveData();
//			form.ownerCt.close();
//			reloadGrid(form.gridId);
		},{
			text:"存草稿",
			scale:'large',
			hidden:true,
			tooltip:'保存到草稿',
			iconCls:'mail_save',
			ref:'draftBtn',
			scope:this,
			handler:this.saveWait
		}];
		QH.sms.SmsWinToolbar.superclass.initComponent.call(this);
	},
	//如果手机号码第一位是0则需要去掉(现在的手机号码他们为了打x-lite前面有加0，在发送短信的时候需要把0去掉)
	removeZero:function(nbr){
		if(nbr.indexOf('0')==0){
			nbr=nbr.substring(1);
		}
		return nbr;
	},
	/**
	 * 发送按钮点击方法
	 */
	sendSms:function(){
		var tbar=this;
		var form = Ext.getCmp('smsSendForm').getForm();
		if (!form.isValid()) {
			return;
		}
		var idAry=new Array();
		var nbrs="";
		//如果是发送单条
		if(tbar.contactNbr){
			//不是给员工发短信
			if(tbar.contactId!=0){
				idAry.push(tbar.contactId);
				nbrs+=tbar.removeZero(tbar.contactNbr)+",";
			}
		}else{
			var st =Ext.getCmp('choseGrid').getStore();
			st.each(function(record){
				idAry.push(record.data.id);
				nbrs+=tbar.removeZero(record.data.contactMobile)+",";
			})
		}
		var telephones = Ext.getCmp('telephones').getValue();
		if(idAry.length==0){
			//表单中的手机号码是否有填
			if(!telephones){
				alertMsg('请先选择左边联系人或直接输入手机号码!');
			}else{
				var moStr="";
				var tels=telephones.split(',');
				for (var i = 0; i < tels.length; i++) {
					if(tels[i]){
						var tel=tbar.removeZero(tels[i]);
						moStr+=tel+",";
					}
				}
				tbar.realSend(null,moStr,moStr);
			}
		}else{
			var moStr="";
			if(telephones!=""){
				//如果陌生号码中有和左边勾选的联系号码重复时,过滤掉
				var tels=telephones.split(',');
				for (var i = 0; i < tels.length; i++) {
					if(tels[i]){
						var tel=tbar.removeZero(tels[i]);
						if(nbrs.indexOf(tel)==-1){
							nbrs+=tel+",";
							moStr+=tel+",";
						}
					}
				}
			}
			tbar.realSend(idAry,nbrs,moStr);
		}
	},
	sendSmsTo:function(ary,moStr){
		var tbar=this;
		var orderNo=Ext.getCmp('orderNoCom').getValue();
		var statusId=Ext.getCmp('statusIdCom').getValue();
		var remark=Ext.getCmp('remark').getValue();
		var airRemark=Ext.getCmp('airRemark').getValue();
		var content=Ext.getCmp('content').getValue();
		cotSmsService.saveOtherSms(ary,moStr,orderNo,statusId,remark,airRemark,content,function(res){
			if(res){
				Ext.getCmp('smsSendWin').close();
				if(!tbar.contactNbr){
					QHERP_VIEWPORT.gridPanel.getStore().reload();
					QHERP_VIEWPORT.mogridPanel.getStore().reload();
				}
				unmask();
				alertMsg('提交发送成功!');
			}else{
				unmask();
				alertMsg('提交发送失败!请联系管理员');
			}
		})
	},
	realSend:function(idAry,nbrs,moStr){
		var _self=this;
		nbrs=nbrs.substring(0,nbrs.length-1);
		var content=Ext.getCmp('content').getValue();
		mask();
//		Ext.Ajax.request({
//			url : './servlet/ProxyServlet?isSms=1&mobile='+nbrs+"&msg="+content,
//			success : function(response) {
//				var json = Ext.decode(response.responseText);
//				if(json.success){
//					_self.sendSmsTo(idAry);
//				}else{
//					alertMsg(json.msg);
//					unmask();
//				}
//			}
//		});
		cotSmsService.sendSms(nbrs,content,function(res){
			if(!res){
				_self.sendSmsTo(idAry,moStr);
			}else{
				alertMsg(res);
					unmask();
			}
		})
	}
});
Ext.reg('smswintoolbar',QH.sms.SmsWinToolbar);