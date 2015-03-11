
QH.mail.TemplateTreeRightMenu = Ext.extend(Ext.menu.Menu,{
	templateName:'模板',
	treePanel:'',
	templateType:'',
	/**
	 * @cfg {Ext.tree.TreeNode} selNode
	 * 被右击选中的节点
	 */
	/**
	 * 是否是修改节点属性
	 * @type Boolean
	 */
	initComponent:function(){
		this.items = [{
			text : '新增'+this.templateName,
			ref:'addBtn',
			scope: this,
			handler:this.addTemplate
		},{
			text : '重命名'+this.templateName,
			ref:'reNameBtn',
			scope: this,
			handler:this.reNameTemplate
		},{
			text : '删除'+this.templateName,
			ref:'delBtn',
			scope: this,
			handler:this.delTemplate
		},{
			text:'设为默认',
			ref:'defaultBtn',
			scope: this,
			hidden:this.templateType != MAIL_TEMPLATE_TYPE.QUICKTXT ? false:true,
			handler:this.defaultTemplate
		},{
			text:'设为共享',
			ref:'shareBtn',
			hidden:this.templateType == MAIL_TEMPLATE_TYPE.QUICKTXT ? false:true,
			scope: this,
			handler:this.shareTemplate.createDelegate(this,[true])
		},{
			text:'取消共享',
			ref:'cancelShareBtn',
			hidden:this.templateType == MAIL_TEMPLATE_TYPE.QUICKTXT ? false:true,
			scope: this,
			handler:this.shareTemplate.createDelegate(this,[false])
		}];
		
		this.templateWindow = new QH.mail.TemplateWindow({
			templateName:this.templateName,
			rightMenu:this
		});
		
		QH.mail.TemplateTreeRightMenu.superclass.initComponent.call(this);
		
		this.on({
			'hide':{
				fn:function(rightMenu){
					if(rightMenu.selNode)
						rightMenu.selNode.getUI().removeClass('mail_node_rightmenu_select');
				},
				scope:this
			}
		})
	},
	init:function(treePanel){
		this.treePanel = treePanel;
		this.templateWindow.templateType = treePanel.templateType
		treePanel.on('contextmenu',this.onRightMenu,this);
	},
	onRightMenu : function(node,e){
		node.getUI().addClass('mail_node_rightmenu_select');
		this.selNode = node;
		
		var isBase = node.attributes.isBase;
		
		this.reNameBtn.setDisabled(isBase);
		this.delBtn.setDisabled(isBase);
		
		this.showAt(e.getXY());
	},
	addTemplate : function(btn){
		this.templateWindow.setTitle('新增'+this.templateName);
		this.templateWindow.isAdd = true;
		this.templateWindow.show(btn.el);
	},
	reNameTemplate : function(btn){
		this.templateWindow.setTitle('重命名'+this.templateName);
		this.templateWindow.isAdd = false;
		var form = this.templateWindow.formPanel.getForm();
		form.findField('text').setValue(this.selNode.text);
		this.templateWindow.show(btn.el);
	},
	delTemplate : function(){
		Ext.Msg.confirm('系统提示','确定删除所选'+this.templateName+'？',function(btn){
			if(btn=='yes'){
				var node = this.selNode;
				var treePanel =  this.treePanel;
				baseSerivce.deleteIntListReturnIds([node.id],'CotMailTemplate',function(){
					var parentNode = node.parentNode;
					if(node.isSelected()){
						treePanel.fireEvent('click',parentNode);
					}
					parentNode.removeChild(node);
				});
			}
		},this);
	},
	defaultTemplate : function(){
		var node = this.selNode;
		var treePanel = this.treePanel;
		// 获得ID，如果为基础节点，则为0
		var isBase = node.attributes.isBase;
		var id = isBase ? 0 : node.id;
		mailTemplateService.updateTemplateDefault(id,this.treePanel.templateType,node.attributes.tag,function(){
//			node.getUI().removeClass()
			var childs = isBase ? node.childNodes : node.parentNode.childNodes;
			Ext.each(childs,function(child){
				Ext.fly(child.getUI().getIconEl()).replaceClass("mail_sign_default", "mail_sign_node");
			});
			if(!isBase){
				Ext.fly(node.getUI().getIconEl()).replaceClass("mail_sign_node", "mail_sign_default");
			}
			treePanel.fireEvent('click',node);
		});
	},
	shareTemplate : function(isShare){
		var node = this.selNode;
		var treePanel = this.treePanel;
		// 获得ID，如果为基础节点，则为0
		var isBase = node.attributes.isBase;
		var id = isBase ? 0 : node.id;
		//var isShare = node.attributes.isDefault ? true:false
		mailTemplateService.updateTemplateShare(id,isShare,function(){
//			node.getUI().removeClass()
			//var childs = isBase ? node.childNodes : node.parentNode.childNodes;
			if(!isBase){
				if(isShare)
					Ext.fly(node.getUI().getIconEl()).replaceClass("mail_sign_node", "mail_sign_default");
				else
					Ext.fly(node.getUI().getIconEl()).replaceClass("mail_sign_default", "mail_sign_node");
			}
			treePanel.fireEvent('click',node);
		});
	}
});


QH.mail.TemplateWindow = Ext.extend(QH.Window,{
	width:300,
	height:130,
	closeAction :'hide',
	layout:'fit',
	isAdd:true,
	templateName:'',
	templateType:'',
	initComponent:function(){
		this.title = this.templateName;
		
		this.items = [{
			xtype:'form',
			ref:'formPanel',
			padding :5,
			labelWidth : 60,
			frame:true,
			items :[{
				xtype : "textfield",
				name : 'text',
				fieldLabel : this.templateName + "名称",
				anchor : "95%",
				maxLength : 100,
				allowBlank : false,
				blankText : this.templateName + "名称不能为空"
			}]
		}];
		this.buttons = [{
			text : "保存",
			cls : "SYSOP_ADD",
			width : 65,
			iconCls : "page_add_small",
			scope:this,
			handler : this.saveTemplateNode
		}, {
			text : "取消",
			width : 65,
			iconCls : "page_reset",
			scope:this,
			handler : function() {
				this.hide();
			}
		}];
		QH.mail.TemplateWindow.superclass.initComponent.call(this);
	},
	/**
	 * 新增修改邮件模板
	 */
	saveTemplateNode : function(){
		var win = this;
		var form = this.formPanel.getForm();
		if(!form.isValid())
			return;
		var node = this.rightMenu.selNode;
		
		var text = form.findField('text').getValue();
		
		if(this.isAdd){ // 新增
			if(!node.attributes.isBase)
				node = node.parentNode;
			if(!node.expanded){
				node.expand();
			}else{
				QH_LOADMASK = new Ext.LoadMask(win.getEl(),{msg:'保存中。。。'});
				QH_LOADMASK.show();
				mailTemplateService.addTemplate(text,this.templateType,node.attributes.tag,function(mailTemplate){
					QH_LOADMASK.hide();
					win.hide();
					var newNode = new Ext.tree.TreePanel.nodeTypes[mailTemplate.nodeType](mailTemplate);
					node.appendChild(newNode);
				});
			}
		}else{ // 修改名称
			mailTemplateService.updateTemplateName(node.id,text,function(){
				win.hide();
				node.setText(text);
			});
		}
		
	}
});