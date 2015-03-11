
QH.mail.TreeRightMenu = Ext.extend(Ext.menu.Menu,{
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
			text : '新建文件夹',
			scope:this,
			handler : this.addBaseTreeNode,
			menu : {
				layout : 'hbox',
				layoutConfig : {
					align : 'middle'
				},
				width : 235,
				items : [{
					xtype : 'textfield',
					id : 'mailTreeNodeNewName',
					maxLength : 100,
					width:100,
					selectOnFocus : true,
					value : '新邮箱',
					listeners:{
						'focus':{
							fn:function(field){
								field.selectText();
							}
						}
					}
				}, {
					xtype:'combo',
					id : 'mailTreeNodeNewType',
		        	width:65,
				    triggerAction: 'all',
				    editable:false,
					forceSelection:true,
				    mode: 'local',
				    value:MAIL_NODE_TYPE.B,
				    store: new Ext.data.ArrayStore({
				        fields: ['id','name'],
				        data: MAIL_NODE_TYPE_NAME
				    }),
				    getListParent :  function() {	 // 下拉框选择不隐藏菜单
			            return this.el.up('.x-menu');
			        },
				    valueField: 'id',
				    displayField: 'name'
				}, {
					xtype : 'button',
					text : "添加",
					id : 'addMailBtn',
					flex : 1,
					iconCls : 'page_add_small',
					scope:this,
					handler : this.addBaseTreeNode
				}]
			}
		},{
			text : '新建搜索文件夹',
			ref:'addSearchBtn',
			handler : this.showSearchNodeWindow.createDelegate(this,[true])
		},{
			text : '重命名',
			ref:'reNameBtn',
			scope: this,
			handler : this.reNameTreeNode
		},{
			text : '删除',
			ref:'delBtn',
			scope: this,
			handler : this.delTreeNode
		},'-',{
			text:'属性',
			ref:'propBtn',
			handler : this.showSearchNodeWindow.createDelegate(this,[false])
		}];
		
		this.addSearchWin = new QH.mail.TreeSearchNodeWindow({
			rightMenu:this
		});
		
		QH.mail.TreeRightMenu.superclass.initComponent.call(this);
		
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
	/**
	 * 添加树节点
	 * private
	 */
	addBaseTreeNode : function(){
		this.hide();
		// 保存到后台
		var nodeNewName = Ext.getCmp('mailTreeNodeNewName').getValue();
		var nodeNewType = Ext.getCmp('mailTreeNodeNewType').getValue();
		if (nodeNewName == '') {
			nodeNewName = '新邮箱';
		}
		this.saveTreeNode({
			nodeName:nodeNewName,
			nodeTypeByDwr:nodeNewType
		},true);
	},
	saveTreeNode : function(config,isAdd){
		var selNode = this.selNode;
		var mailTree;
		var	treeData = selNode.attributes;
		if(isAdd){
			mailTree = {
				parentId : selNode.id,
				accountCfgId : {
					id : treeData.accountCfgId.id
				}
			};
		}else{
			mailTree = {
				id : treeData.id,
				nodeName : treeData.nodeName,
				nodeTag : treeData.nodeTag,
				parentId : treeData.parentId,
				accountCfgId : {
					id : treeData.accountCfgId.id
				},
				searchWhere : treeData.searchWhere
			}
		}
		Ext.apply(mailTree,config);
		
		mailTreeService.saveMailTree(mailTree,function(res){
			if(res){
				if(isAdd){
					Ext.apply(mailTree,{
						id:res,
						nodeType:mailTree.nodeTypeByDwr
					});
					var newNode = new Ext.tree.TreePanel.nodeTypes[mailTree.nodeType](mailTree);
					selNode.appendChild(newNode);
					selNode.expand();
				}else{
					Ext.apply(selNode.attributes,mailTree);
					selNode.setText(mailTree.nodeName);
					selNode.fireEvent('click',selNode);
				}
			}
		})
	},
	/**
	 * 添加查询文件夹	
	 */
	showSearchNodeWindow : function(isAdd){
		if(!isAdd){
			this.addSearchWin.loadSearchNode(this.selNode.attributes);
		}
		this.addSearchWin.isAdd = isAdd;
		this.addSearchWin.show();
	},
	/**
	 * 重命名树节点
	 * private
	 */
	reNameTreeNode : function(){
		var selNode = this.selNode;
		Ext.MessageBox.prompt('邮箱重命名', '将"' + selNode.text + '" 修改为:', function(btn, text) {
			if (btn == 'ok') {
				if (text == '') {
					Ext.MessageBox.alert('提示消息', '节点名称不能为空');
					return false;
				}
				// 保存到后台
				mailTreeService.updateTreeNodeName(selNode.id, text,function(res) {
					selNode.setText(text);// 更新节点内容
				});
			}
		});
	},
	delTreeNode : function(){
		Ext.MessageBox.confirm("提示消息", "真的要删除这个的邮箱？", function(button, text) {
			if (button == "yes") {
				var selNode = this.selNode;
				mailTreeService.delTreeNode(selNode.id, function(res) {
					if (res) {
						var parentNode = selNode.parentNode;
						parentNode.removeChild(selNode);
						parentNode.fireEvent('click',parentNode);
						if (!parentNode.hasChildNodes()) {
							// 替换样式
	//							Ext.fly(tempNode.ui.elNode)
	//									.replaceClass(
	//											"x-tree-node-collapsed",
	//											"x-tree-node-leaf");
						}
						
					}else{
						Ext.Msg.show({
							title : '系统提示',
							msg : '节点下存在邮件，不能删除！',
							icon : Ext.Msg.WARNING,
							buttons : Ext.Msg.OK
						});
					}
				});
			}
		},this);
	}
});
function MailTreeSearchWhereObj(){
	this.mailField = null;
	this.mailWhere = null;
	this.mailValue = null;
	this.mailFieldShow = null;
	this.mailWhereShow = null;
	this.mailValueShow = null;
}
/**
 * 搜索文件夹属性框
 * @class QH.mail.TreeSearchNodeWindow
 * @extends QH.Window
 */
QH.mail.TreeSearchNodeWindow = Ext.extend(QH.Window,{
	title:'新建搜索文件夹',
	width:400,
	height:305,
	resizable:true,
	closeAction:'hide',
	layout:'form',
	buttonAlign:'right',
	
	initComponent:function(){
		this.whereStore = new Ext.data.ArrayStore({
			fields : ['mailField','mailWhere','mailValue',
					  'mailFieldShow','mailWhereShow','mailValueShow'],
			data :[]
		});
		this.operatData = {
			'textfield' : [['LIKE \'%{value}%\'','包含'],['LIKE \'{value}\'','等于'],['LIKE \'{value}%\'','以...开头'],['LIKE \'%{value}\'','以...结尾']],
			'nameurl' : [['LIKE \'%{value}%\'','包含'],['LIKE \'{value}\'','等于'],['LIKE \'{value}%\'','以...开头'],['LIKE \'%{value}\'','以...结尾']],
			'datefield' : [['<','早于'],['>','晚于']],
			'numberfield' : [['>','大于'],['<','小于']],
			'combo':[['=','为']]
			
		};
		this.operatStore = new Ext.data.ArrayStore({
			fields : ['id', 'name'],
			data : this.operatData.textfield
		});
		this.fieldType = {
			'obj.subject':'textfield',
			'obj.sender':'textfield',
			'obj.sendTime':'datefield',
			'obj.sendName|obj.sendUrl':'textfield',
			'obj.toName|obj.toUrl':{xtype:'textfield',operat:'nameurl'},
			'obj.ccName|obj.ccUrl':{xtype:'textfield',operat:'nameurl'},
			'obj.size':'numberfield',
			'obj.isContainAttach':{
				xtype:'combo',
				displayField : 'name',
				valueField : 'id',
				mode : 'local',
				triggerAction : 'all',
				editable:false,
				allowBlank:false,
				store : new Ext.data.ArrayStore({
					fields : ['id', 'name'],
					data : [[1,'存在'],[0,'不存在']]
				})
			}
		};
		this.fieldStore = new Ext.data.ArrayStore({
			fields : ['id', 'name'],
			data : [['obj.subject','主题'],['obj.sendName|obj.sendUrl','发件人'],['obj.toName|obj.toUrl','收件人'],['obj.ccName|obj.ccUrl','抄送人']
			,['obj.sendTime','发送时间'],['obj.isContainAttach','附件'],['obj.size','大小(B)']]
		});
		
		this.items = [{
			xtype:'form',
			frame:true,
			border:false,
			ref:'formPanel',
			items:[{
				xtype:'textfield',
				fieldLabel:'搜索文件夹名',
				anchor:"100%",
				allowBlank:false,
				name:'nodeName',
				listeners:{
					'focus':{
						fn:function(field){
							field.selectText();
						}
					}
				}
			},{
				xtype: 'radiogroup',
	            fieldLabel: '关系',
	            name:'andOrGroup',
	            items: [
	                {boxLabel: '满足以下所有条件', name: 'andOr', inputValue: ' and ', checked: true},
	                {boxLabel: '满足以下任一条件', name: 'andOr', inputValue: ' or '}
	            ]
			}]
		},{
			xtype:'basegrid',
			ref:'whereGrid',
			height:200,
			showRightMenu:false,
			tbarCfg:{
				objName:'MailTreeSearchWhereObj',
				defaultData:{// 默认为主题 包含
					mailField:'obj.subject',
					mailWhere:'LIKE \'%{value}%\'',
					mailFieldShow:'主题',
					mailWhereShow:'包含'
				},
				hiddenSaveAllBtn:true,
				hiddenRetractBtn:true,
				hiddenRetractAllBtn:true,
				enableText:false,
				enableKeyText:false
			},
			store:this.whereStore,
			columns:[{
				header : '字段',
				dataIndex : 'mailField',
				renderIndex : 'mailFieldShow',
				editor:{
					xtype:'combo',
					displayField : 'name',
					valueField : 'id',
					mode : 'local',
					triggerAction : 'all',
					editable:false,
					allowBlank:false,
					value:'subject',
					store : this.fieldStore,
					listeners:{
						'select':{
							fn:function(combo,record,index){
								this.replayCfgField(record.get('id'));
							},
							scope:this
						}
					}
				}
			},{
				header : '条件',
				dataIndex : 'mailWhere',
				renderIndex : 'mailWhereShow',
				editor:{
					xtype:'combo',
					displayField : 'name',
					valueField : 'id',
					mode : 'local',
					triggerAction : 'all',
					editable:false,
					allowBlank:false,
					store : this.operatStore
				}
			},{
				header : '值',
				dataIndex : 'mailValue',
				renderIndex : 'mailValueShow',
				editor : {
					allowBlank:false,
					xtype:'textfield'
				}
			}],
			editorCfg : {
				listeners:{
					'beforeedit' : {
						fn : function(rowEditor,rowIndex){
				            var record = rowEditor.grid.store.getAt(rowIndex);
							if(!rowEditor.rendered){ // 第一次显示时，再重新执行一次替换控件
					            rowEditor.startEditing.defer(100,rowEditor,[rowIndex]);
				                return;
							}else{	// 可直接替换控件
					            this.replayCfgField(record.get('mailField'));
							}
						},
						scope:this
					}	
				}
			}
		}];
		
		this.buttons = [{
			text:'确定',
			scope:this,
			handler:this.saveSearchNode
		},{
			text:'取消',
			scope:this,
			handler:function(){
				this.hide();
			}
		}];
		
		QH.mail.TreeSearchNodeWindow.superclass.initComponent.call(this);
		
		this.on({
			'show':{
				fn:function(win){
					win.rightMenu.selNode.getUI().addClass('mail_node_rightmenu_select');
				},
				buffer:100
			},
			'hide':{
				fn:function(win){
					win.rightMenu.selNode.getUI().removeClass('mail_node_rightmenu_select');
					var form = win.formPanel.getForm();
					form.reset();
					form.findField('nodeName').setValue('');// reset有时清除不了，直接调用setValue
					form.findField('nodeName').clearInvalid();
					win.whereStore.removeAll();
				}
			}
		});
		
	},
	loadSearchNode : function(data){
		QH.ux.grid.BaseToolbar
		var form =  this.formPanel.getForm();
		form.findField('nodeName').setValue(data.nodeName);
		
		var searchWhere = Ext.decode(data.searchWhere);
		form.findField('andOrGroup').setValueForItem(searchWhere.andOr);
		
		var whereDatas = [];
		Ext.each(searchWhere.wheres,function(whereData){
			whereDatas.push([whereData.mailField,whereData.mailWhere,whereData.mailValue,
			whereData.mailFieldShow,whereData.mailWhereShow,whereData.mailValueShow]);
		});
		this.whereStore.loadData(whereDatas);
	},
	/**
	 * 保存配置
	 */
	saveSearchNode : function(){
		var form =  this.formPanel.getForm();
		if(!form.isValid())
			return ;
		var valueObj = form.getValues();
		var whereDatas = this.whereStore.getRange();
		var wheres = [],data;
		Ext.each(whereDatas,function(record){
			data = record.data;
			if(Ext.isDate(data.mailValue)) // 如果值为时间类型则取为'Y-m-d'字符格式
				data.mailValue = data.mailValueShow;
			wheres.push(data);
		},this);
		// 保存节点
		this.rightMenu.saveTreeNode({
			nodeName:valueObj.nodeName,
			nodeTypeByDwr:'Q',
			searchWhere:Ext.encode({
				wheres:wheres,
				andOr:valueObj.andOr
			})
		},this.isAdd);
		this.hide();
	},
	/**
	 * 替换编辑控件
	 * @param {} key 属性字段
	 */
	replayCfgField : function(key){
		var rowEditor = this.whereGrid.getRowEditor();
		if(!key)
			return ;
		var field = this.fieldType[key];
		
		var operatData;
		if(Ext.isString(field)){
			operatData = this.operatData[field];
			this.operatStore.loadData(operatData);
			rowEditor.replayField('mailValue',{
				xtype:field,
				allowBlank:false
			});
		}else{
			operatData = this.operatData[field.operat || field.xtype];
			this.operatStore.loadData(operatData);
			rowEditor.replayField('mailValue',field);
		}
		var mailWhereField = rowEditor.getField('mailWhere');
		if(mailWhereField)
			mailWhereField.setValue(operatData[0][0]);
	}
});