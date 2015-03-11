/**
 * 菜单图标管理
 * 
 * @class QH.ux.icon.IconPanel
 * @extends Ext.Panel
 */
QH.ux.icon.IconPanel = Ext.extend(Ext.Panel, {
	id : 'img-chooser-dlg',
	layout : 'fit',
	minWidth : 500,
	minHeight : 300,
	border : false,
	/**
	 * 是否更改桌面背景
	 * @type Boolean
	 */
	desktop : false,
	/**
	 * 是否被别的模块引用,如果有则显示"导入"按钮
	 * @type Boolean
	 */
	noUse:true,
	/**
	 * 引用该面板的对象
	 * @type String
	 */
	mainPnl:'',
	initComponent : function() {
		var pnl = this;
		var thumbTemplate = new Ext.XTemplate(
				'<tpl for=".">',
				'<div class="thumb-wrap" style="width:100px;height:120px" id="{picName}" onclick="chkChoose(\'{picName}\')"><div style="position:relative;width:100px;height:120px;text-align:center;">',
				'<div class="thumb"><img id="qc_img_{picName}" src="{picPath}" onload="DrawImage(this,85,85)"></div>',
				'<span style="white-space: nowrap;text-overflow:ellipsis;overflow:hidden;">{picName}</span>'
						+ '<input id="check_pic_{picName}" type="checkbox" onclick="stopEvent(event)" style="position:absolute;bottom:0px;left:0px;"/>'
						+ '<img title="放大图标" style="position:absolute;bottom:0px;right:0px;" '
						+ 'onclick="zoomPic(event,document.getElementById(\'qc_img_{picName}\'))" '
						+ 'src="common/ext/resources/images/extend/magnifier_zoom_in.png">'
						+ '</div></div>', '</tpl>');
		thumbTemplate.compile();

		this.store = new QH.ux.icon.IconStore();
		this.store.on('load', function() {
					if (pnl.view.dragSelector != '') {
						pnl.view.dragSelector.proxy = null;
					}
				});
		this.view = new Ext.DataView({
					tpl : thumbTemplate,
					itemSelector : 'div.thumb-wrap',
					multiSelect : true,
					dragSelector : '',
					plugins : new Ext.DataView.DragSelector({
								dragSafe : true
							}),
					emptyText : '<div style="padding:10px;">没有图标</div>',
					store : this.store
					// prepareData : pnl.formatData.createDelegate(this),
				});

		var bbar = {
			xtype : 'paging',
			pageSize : QH_PAGE_LIMIT,
			store : this.store,
			displaySize : QH_PAGE_DISPLAY_SIZE,
			displayInfo : true,
			listeners : {
				beforechange : {
					fn : function(pTbar, params) {
//						if (this.store.getModifiedRecords().length > 0) {
//							Ext.Msg.show({
//										title : '系统提示',
//										msg : '修改的数据未保存',
//										icon : Ext.Msg.WARNING,
//										buttons : Ext.Msg.OK
//									});
//							return false;
//						}
						this.store.setBaseParam(QH_PAGE_START_NAME,
								params[QH_PAGE_START_NAME]);
						this.store.setBaseParam(QH_PAGE_LIMIT_NAME,
								params[QH_PAGE_LIMIT_NAME]);
					},
					scope : this
				}
			}
		}
		Ext.apply(bbar, this.bbarCfg);
		Ext.applyIf(this, {
					bbar : bbar
				});

		this.items = [{
					id : 'img-chooser-view',
					autoScroll : true,
					layout : 'fit',
					items : this.view,
					tbar : [{
								text : "上传",
								scale:'large',
								iconCls : "page_file_upload",
								handler : pnl.showUpload.createDelegate(this)
							}, "-", {
								text : "删除",
								scale:'large',
								iconCls : "page_del",
								handler : pnl.deleteImages.createDelegate(this)
							}, "-", {
								text : "全选／反选",
								scale:'large',
								iconCls : "gird_save",
								handler : pnl.selectAllPic.createDelegate(this)
							},"-", {
								text : "导入",
								scale:'large',
								iconCls : "page_add",
								handler : pnl.insetOneIcon.createDelegate(this),
								hidden:pnl.noUse
							}]
				}]
		QH.ux.icon.IconPanel.superclass.initComponent.call(this);
	},
	formatData : function(data) {
		data.name = data.name.ellipse(15);
		return data;
	},
	showUpload : function(item, pressed) {
		var pnl = this;
		this.uploadWin = new QH.ux.win.UploadWindow({
					swfUploadCfg : {
						file_types : "*.jpg;*.png;*.gif;*.jpeg;*.ico",
						file_types_description : "图标",
						file_upload_limit : 300, // 上传数量
						file_size_limit : 10 * 1024,
						post_params : {
							beanName : "BaseService",
							uploadPath : "icon",
							bGenDate:false,
							doDbOp : false
						}
						// uploadStart:function(file){
						// this.addPostParam("paramJson",Ext.encode({
						// elementsId:panel.elementsId,
						// picName:file.name,
						// eleName:panel.eleName
						// }));
						// }
					},
					reloadFn : function() {
						pnl.store.reload();
					}
				});
		this.uploadWin.show();
	},
	selectAllPic : function() {
		var nodes = this.view.getNodes();
		for (var i = 0; i < nodes.length; i++) {
			chkChoose(nodes[i].id);
			var flag = $("check_pic_" + nodes[i].id).checked;
			if (flag) {
				this.view.select(i, true);
			} else {
				this.view.deselect(i);
			}
		}
	},
	deleteImages : function() {
		var pnl = this;
		var oSel = document.getElementsByTagName('input');
		var list=new Array();
        for( i = 0; i< oSel.length; i++ ){
        	if(oSel[i].id){
        		var flag=oSel[i].id.indexOf("check_pic_");
             	if(flag!=-1 && oSel[i].checked){
             		var id = oSel[i].id.substring(flag+10);
             		list.push(id);
             	}
        	}
        }

		if (list.length == 0) {
			alertMsg('对不起，您还没有勾选图标！');
			return;
		}
		
		Ext.MessageBox.confirm('提示信息', '确定删除选择的图标吗?', function(btn) {
					if (btn == 'yes') {
						DWREngine.setAsync(false);
						mask("正在删除中... ...");
						DWREngine.setAsync(true);
						iconManager.deleteIcons(list, {
									callback : function(res) {
										unmask();
										pnl.store.reload();
									},
									errorHandler : function(message, ex) {
										unmask();
										alertMsg('删除失败!');
									}
								});
					}
				});
	},
	insetOneIcon:function(){
		var selNode = this.view.getSelectedRecords();
		if (!selNode || selNode.length == 0) {
			alertMsg("对不起，您还没有选择图标！");
			return;
		}
		if (selNode.length >1) {
			alertMsg("一次只能导入一张图标！");
			return;
		}
		if(!this.desktop)
			this.mainPnl.insetOneIcon(selNode[0].data.picPath);
		else{
			var _sel=this;
			//更新当前登录员工里面的desk_url字段
			var url="/"+DEFAULT_UPLOAD_PROJ+ "/" +ICON + "/"+selNode[0].id;
			GET_SESSION_EMPS.deskUrl=url;
			baseSerivce.saveOrUpdateList([GET_SESSION_EMPS],function(){
				 Ext.DomHelper.applyStyles(Ext.getCmp('myDeskPnl').body,{
				 	background:"transparent url("+url+")"
				 });
				 _sel.ownerCt.close();
			})
		}
	}
});
Ext.reg('iconpanel', QH.ux.icon.IconPanel);
String.prototype.ellipse = function(maxLength) {
	if (this.length > maxLength) {
		return this.substr(0, maxLength - 3) + '...';
	}
	return this;
};
// 阻止事件向父类蔓延
function stopEvent(e) {
	e.stopPropagation();
}
// 放大图片
function zoomPic(e, obj) {
	e.stopPropagation();
	showBigPicDiv(obj);
}