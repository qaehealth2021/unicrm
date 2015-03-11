
QH.mail.TemplateTreePanel = Ext.extend(Ext.tree.TreePanel,{
	autoScroll:true,
	templateName:'模板',
	width : 200,
	border : true,
	rootVisible :false,
	dataUrl:'list_mailtemplate.do',
	templateType:MAIL_TEMPLATE_TYPE.TEMPLATE,
	initComponent:function(){
		this.title = this.templateName;
		// 根节点
		this.initRoot();
		// 排序
		this.initTreeSort();
		
		this.plugins = [new QH.mail.TemplateTreeRightMenu({
			templateName:this.templateName,
			templateType:this.templateType
		})];
		
		this.loader = new Ext.tree.TreeLoader({
			dataUrl:this.dataUrl,
			listeners:{
				'beforeload':{
					fn:function(loader,node){
						loader.baseParams = {
							type:this.templateType,
							tag : node.attributes.tag
						}
					},
					scope:this
				}
			}
		});
		
		QH.mail.TemplateTreePanel.superclass.initComponent.call(this);
		
		this.on({
			'click':{
				scope:this,
				fn:this.onClick
			}
		})
	},
	onClick: function(node,e){
		
		if(QH_VIEWPORT.mailTemplateGridPanel){
			var store = QH_VIEWPORT.mailTemplateGridPanel.getStore();
			store.loadDataByTag(node.attributes.tag);
		}
		
		var htmlText = QH_VIEWPORT.mailTemplateFormPanel.getForm().findField('htmlText');
		var isBase = node.attributes.isBase;
		
		QH_VIEWPORT.mailTemplateFormPanel.buttons[0].setDisabled(isBase);
		htmlText.setReadOnly(isBase);
		
		if(isBase){// 系统默认节点
			if(!node.expanded)
				node.expand();
			mailTemplateService.getSystemTemplate(node.attributes.tag,function(res){
				htmlText.setValue(res);
				htmlText.focus();
			})
		}else{ // 自定义模板
			baseSerivce.getObjByIntegerId(node.id, 'CotMailTemplate',function(mailTemplate){
				htmlText.setValue(mailTemplate.htmlText);
				htmlText.focus();
			});
		}
		
		
	},
	initRoot : function(){
		this.root = new Ext.tree.AsyncTreeNode({
			text : '邮件'+this.templateName,
			expanded : true,
			draggable : false,
			id : "root_fac",
			children:this.getBaseNode()
		});
	},
	initTreeSort : function(){
		this.treeSorter = new Ext.tree.TreeSorter(this,{
    		sortType : function(node){
    			var treeData = node.attributes;
    			var tag = treeData.tag;
    			// 按新邮件，回复，转发 排序
    			if(treeData.isBase && tag){
    				switch(tag){
    					case MAIL_TEMPLATE_TAG.NEW: return "!1";
    					case MAIL_TEMPLATE_TAG.REPLY: return "!2";
    					case MAIL_TEMPLATE_TAG.FORWARD: return "!3";
    				}
    			}
				return node.text.toUpperCase();
    		}
		});
	},
	getBaseNode : function(){
		return [{
			text : '新邮件信纸',
			isBase:true,
			tag:MAIL_TEMPLATE_TAG.NEW,
			iconCls:'mail_sign_system'
		},{
			text : '回复邮件信纸',
			isBase:true,
			tag:MAIL_TEMPLATE_TAG.REPLY,
			iconCls:'mail_sign_system'
		},{
			text : '转发邮件信纸',
			isBase:true,
			tag:MAIL_TEMPLATE_TAG.FORWARD,
			iconCls:'mail_sign_system'
		}]
	}
});

Ext.reg('mailtemplatetree',QH.mail.TemplateTreePanel);

Ext.tree.TreePanel.nodeTypes.T = function(config){
	Ext.apply(config,{
		iconCls:config.isDefault ? 'mail_sign_default' : 'mail_sign_node'
	});
	return new Ext.tree.TreeNode(config);
}