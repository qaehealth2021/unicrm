QH.module.FormPanel = Ext.extend(QH.form.FormPanel, {
	objName : 'CotModule',
	initComponent : function() {
		var form=this;
		this.items = [{
					xtype : 'textfield',
					name : 'moduleName',
					anchor : "100%",
					allowBlank : false,
					fieldLabel : '菜单名'
				}, {
					xtype : 'numberfield',
					name : 'parentId',
					anchor : "100%",
					allowBlank : false,
					fieldLabel : '父节点'
				}, {
					xtype : 'textfield',
					name : 'moduleType',
					anchor : "100%",
					fieldLabel : '类型'
				}, {
					xtype : 'textfield',
					id : 'moduleUrl',
					name : 'moduleUrl',
					anchor : "100%",
					fieldLabel : 'URL'
				}, {
					xtype : 'numberfield',
					name : 'moduleLv',
					anchor : "100%",
					allowBlank : false,
					fieldLabel : '菜单层数'
				}, {
					xtype : 'textfield',
					name : 'moduleValidurl',
					anchor : "100%",
					fieldLabel : '权限URL'
				}, {
					xtype : 'numberfield',
					name : 'moduleOrder',
					anchor : "100%",
					allowBlank : false,
					fieldLabel : '顺序'
				}, {
					xtype : "panel",
					layout : 'column',
					items : [{
								xtype : 'panel',
								columnWidth : 1,
								layout : 'form',
								items : [{
											xtype : 'textfield',
											id : 'moduleImgurl',
											name : 'moduleImgurl',
											anchor : "100%",
											fieldLabel : '图标'
										}]
							},{
								xtype : 'panel',
								width : 30,
								html:'<div><img id="iconImg" src="common/images/zwtp.png" onload="DrawImage(this,25,25)" onclick="showBigPicDiv(this)"/></div>'
							}, {
								xtype : "button",
								width : 20,
								cls : "SYSOP_ADD",
								iconCls : "cal",
								handler : form.showIconPanel.createDelegate(this),
								listeners : {
									"render" : function(obj) {
										var tip = new Ext.ToolTip({
													target : obj.getEl(),
													anchor : 'top',
													maxWidth : 160,
													minWidth : 160,
													html : '从图标库选择一张!'
												});
									}
								}
							}]
				}, {
					xtype : 'textfield',
					name : 'moduleFlag',
					anchor : "100%",
					fieldLabel : '版本标识'
				}, {
					xtype : 'hidden',
					name : 'id',
					anchor : "100%",
					fieldLabel : 'id'
				}];

		QH.module.FormPanel.superclass.initComponent.call(this);
	},
	saveData : function() {
		var formPanel = this;
		var form = this.getForm();
		if (!form.isValid())
			return;
		var data = form.getFieldValues();
		//如果图片为没填时,设为null
		if(!data.moduleImgurl)
			data.moduleImgurl=null;
		QH_LOADMASK = new Ext.LoadMask(QH_VIEWPORT.getEl(), {
					msg : '数据保存中'
				});
		cotModuleService.addModule(data, null, function(id) {
					QH_LOADMASK.hide();
					if (!data.id) {
						data.id = id;
						QH_VIEWPORT.moduleTree.addNode(data);
					} else {
						var node = QH_VIEWPORT.moduleTree.getSelectionModel().selNode;
						node.setText(data.moduleName + "(" + data.id + ")");
					}
				})
		QH_LOADMASK.show();
	},
	showIconPanel:function(){
		var form=this;
		var win = new QH.Window({
			title:'图标库',
			layout:'fit',
			width:700,
			height:500,
//			closeAction:'hide',
			id:'iconWin',
			items:[{
				xtype:'iconpanel',
				noUse:false,
				mainPnl:form
			}]
		});
		win.show();
	},
	/**
	 * 图标库面板导入时调用
	 */
	insetOneIcon:function(name){
		$('iconImg').src=name;
		//截取出末尾的文件名
		var tp=name.lastIndexOf("\\");
		Ext.getCmp('moduleImgurl').setValue(name.substring(tp+1));
		Ext.getCmp('iconWin').hide();
	},
	setIcon:function(name){
		if(!name)
			$('iconImg').src="common/images/zwtp.png";
		else{
			$('iconImg').src=name;
			//截取出末尾的文件名
			var tp=name.lastIndexOf("\\");
			Ext.getCmp('moduleImgurl').setValue(name.substring(tp+1));
		}
	}
});

Ext.reg('qhmoduleform', QH.module.FormPanel);