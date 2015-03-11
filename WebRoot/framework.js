Ext.ns('QH.module');
$import("dwr/interface/cotModuleService.js");
$import('index/js/TabPanel.js');
$importCss('index/css/picview.css');
$import('index/js/moduleStore.js');
$import('index/js/moduleView.js');
$import('index/js/TabPanel.js');

/**
 * 系统主界面
 * 
 * @class QH.Viewport
 * @extends Ext.Viewport
 */
QH.Viewport = Ext.extend(Ext.Viewport, {
	layout : 'border',
	initComponent : function() {

		this.items = [{
					region : 'center',
					xtype : 'qhtabpanel',
					ref : 'tabPanel'
				}, {
					region : 'south',
					height : 25,
					xtype : "toolbar",
					items : [{
								text : '菜单',
								tip : '系统菜单',
								scope : this
//								handler : this.quickMenu
							},"->", {
								text : "你好:" + $('empId').value
							},'-',  {
								text : "重登",
								handler : function() {
									if (Ext.isSafari) {
										(window.close()).defer(500);
									} else
										document.location.href = "logoutLogin.do";
								}
							},'-',  {
								text : "帮助"
							},'-',  {
								text : "关于",
								scope : this,
								handler : this.aboutSystem
							}]
				}];
		QH.Viewport.superclass.initComponent.call(this);
	},
	/**
	 * 显示本软件相关信息
	 * 
	 * @param {Ext.Toolbar.Button}
	 *            btn
	 */
	aboutSystem : function(btn) {
		if (!this.aboutSystemWin) {
			this.aboutSystemWin = new Ext.Window({
				title : "关于软件",
				autoHeight : true,
				html : "软件名称：旗航外贸管理软件V8.0</br></br>版权：厦门市旗航软件有限公司</br></br>地址：厦门火炬高新区火炬园新丰二路8号第7层X单元</br></br>邮政编码：361006	传真：0592-3335667</br></br>网址：<a href='http://www.xmqh.net'>http://www.xmqh.net</a></br></br>"
			});
		}
		if (this.aboutSystemWin.hidden)
			this.aboutSystemWin.show(btn.el);
		else
			this.aboutSystemWin.hide();
	},
	/**
	 * 快捷菜单窗体显示隐藏
	 * 
	 * @param {Ext.Toolbar.Button}
	 *            btn
	 */
	quickMenu : function(btn) {
		if (!this.quickMenuWin) {
			this.quickMenuWin = new Ext.Window({
				title : '快捷按钮',
				closeAction : 'hide',
				layout : 'fit',
				items : [{
							xtype : 'moduleiconview',
							enableDrog : true,
							parentId : 1,
							enableClickAddTab : true,
							width : 300,
							height : 150,
							id : "shortview"
						}],
				listeners : {
					"afterrender" : function(win) {
						DWREngine.setAsync(false);
						var records = [];
						var shortview = Ext.getCmp('shortview');
						cotModuleService.getCurrentShortcutList(function(res) {
							Ext.each(res, function(record) {
										var rec = new shortview.store.recordType(
												record, record.id);
										records.push(rec);
									})
						});
						shortview.store.add(records);
						DWREngine.setAsync(true);
					}
				}
			});
		}
		if (this.quickMenuWin.hidden)
			this.quickMenuWin.show(btn.el);
		else
			this.quickMenuWin.hide();
	}
});

Ext.onReady(function() {
			QH_VIEWPORT = new QH.Viewport();
		})
window.onbeforeunload = function() {
	// 用户点击浏览器右上角关闭按钮
	if (Ext.isIE) {
		if (document.body.clientWidth - event.clientX < 170
				&& event.clientY < 0 || event.altKey) {
			return "退出旗航软件吗?";
		} else if (event.clientY > document.body.clientHeight || event.altKey) { // 用户点击任务栏，右键关闭
			return "退出旗航软件吗?";
		} else { // 其他情况为刷新
		}
	} else if (Ext.isChrome || Ext.isOpera) {
		return "退出旗航软件吗?";
	} else if (Ext.isGecko) {
		window.open("http://www.g.cn")
		var o = window.open("logoutLogin.do");
	}
}
window.onunload = function() {
	if (Ext.isIE) {
		window.location.reload("logoutLogin.do");
	} else if (Ext.isChrome) {
		cotLoginService.logOut(function() {
					window.close();
				});

	} else if (Ext.isSafari) {
		window.open("logoutLogin.do");
	} else if (Ext.isGecko) {
		window.open("logoutLogin.do");
	}
};