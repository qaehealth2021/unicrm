Ext.ns('QH.module', 'QH.ux.icon');
$import("dwr/interface/cotModuleService.js");
$import("dwr/interface/cotLoginService.js");

// 导入图标库
$importKeyCss(IMPORT_PIC_CSS);
$importKeyCss(IMPORT_BATCH_UPLOAD_CSS);
$importKey(IMPORT_DRAG);
$importKey(IMPORT_BATCH_UPLOAD);
$import('dwr/interface/iconManager.js');
$import('module/icon/js/iconstore.js');
$import('module/icon/js/iconpanel.js');
$import('common/js/ux/tree/onLineloginTree.js');
$import('common/js/ux/tree/loginTree.js');
$import('common/js/comet4j-0.1.1-debug.js');

$importCss("desktop/css/desktop.css");
$importCss('desktop/css/picview.css');
$import('desktop/js/moduleStore.js');
$import('desktop/js/moduleView.js');

$import("desktop/js/StartMenu.js");
$import("desktop/js/TaskBar.js");
$import("desktop/js/Desktop.js");
$import("desktop/js/App.js");

Ext.onReady(function() {
	/**
	 * 第一级菜单模块集合
	 * 
	 * @type
	 */
	var firstModules = [];
(function getFirstModules() {
		DWREngine.setAsync(false);
		cotModuleService.getFirstModules(function(list) {
					firstModules = list;
				})
		DWREngine.setAsync(true);
	})();
	/**
	 * 入口,初始化win界面
	 */
	MyApp = new Ext.app.App({
		id : "myapp",
		init : function() {
			// 更新登录信息
			var loginInfo = {
				run : function() {
					document.loginaction.location.href = "./servlet/OnlineServlet?rdm="+GET_RDM;
				},
				interval : 30 * 1000 // 1 second
			}
			Ext.TaskMgr.start(loginInfo);
			Ext.QuickTips.init();
		},
		/**
		 * 开始菜单标题和右侧的按钮构造
		 * 
		 * @return {}
		 */
		getStartConfig : function() {
			var _self = this;
			var logo = new Ext.Panel({
				renderTo : 'ux-logo',
				id : 'logoPnl',
				height : 80,
				bodyCssClass : 'logo_pg',
				layout : 'border',
				items : [{
							xtype : 'panel',
							region : "center",
							baseCls : 'ex-panel',
							html : ''
						}, {
							xtype : 'panel',
							region : "east",
							width : 360,
							baseCls : 'ex-panel',
							layout : 'border',
							bodyCssClass : 'logo_pg2',
							items : [{
										xtype : 'panel',
										region : "west",
										width : 120,
										baseCls : 'ex-panel',
										padding : 5,
										items : [{
													anchor : '100%',
													xtype : 'panel',
													baseCls : 'ex-panel',
													padding : 2,
													html : '<div id="onlineMsg"></div>'
												}]
									}, {
										xtype : 'panel',
										region : "center",
										// region : "west",
										// width : 90,
										baseCls : 'ex-panel',
										padding : 5,
										items : [{
											anchor : '100%',
											xtype : 'panel',
											baseCls : 'ex-panel',
											padding : 2,
											html : '<span class="right_login">'
													+ GET_SESSION_EMPS.companyId.companyShortName
													+ '</span>'
										}, {
											anchor : '100%',
											xtype : 'panel',
											baseCls : 'ex-panel',
											padding : 2,
											html : '<span class="right_login">'
													+ GET_SESSION_EMPS.deptId.deptName
													+ '</span>'
										}, {
											anchor : '100%',
											xtype : 'panel',
											baseCls : 'ex-panel',
											padding : 2,
											html : '<span class="right_login">'
													+ GET_SESSION_EMPSID
													+ '</span>'
										}]
									}
									// ,{
									// xtype : 'panel',
									// region : "center",
									// baseCls : 'ex-panel',
									// padding:5,
									// items : [{
									// anchor : '100%',
									// xtype : 'panel',
									// baseCls : 'ex-panel',
									// padding:2,
									// html : '<span
									// id="right_area"></span><span
									// id="right_wt_pic"></span>'
									// }, {
									// anchor : '100%',
									// xtype : 'panel',
									// baseCls : 'ex-panel',
									// padding:2,
									// html : '<div id="right_state"></div>'
									// }, {
									// anchor : '100%',
									// xtype : 'panel',
									// baseCls : 'ex-panel',
									// padding:2,
									// html : '<div id="right_du"></div>'
									// }]
									// }
									, {
										xtype : 'panel',
										region : "east",
										baseCls : 'ex-panel',
										width : 130,
										padding : 5,
										items : [{
											anchor : '100%',
											xtype : 'panel',
											baseCls : 'ex-panel',
											padding : 2,
											html : '<div id="right_time"></div>'
										}, {
											anchor : '100%',
											xtype : 'panel',
											baseCls : 'ex-panel',
											padding : 2,
											html : '<div id="right_date"></div>'
										}, {
											anchor : '100%',
											xtype : 'panel',
											baseCls : 'ex-panel',
											padding : 2,
											html : '<div id="right_nong_date"></div>'
										}]
									}],
							listeners : {
								'afterrender' : function(pnl) {
									// _self.getWheater();
									_self.getRealTime();
//									_self.showOnlineMsg();
								}
							}

						}]
			})
			var desk = new Ext.Panel({
				layout : 'fit',
				id : 'myDeskPnl',
				height : Ext.lib.Dom.getViewHeight()
						- Ext.get('ux-taskbar').getHeight() - 80,
				autoWidth : true,
				renderTo : 'shortcuts',
				bodyStyle : 'width: 100%;height: 100%;background: transparent url('
						+ GET_SESSION_EMPS.deskUrl
						+ ') no-repeat right bottom;',
//				bbar : new Ext.Toolbar({
//					items : ['->', {
//								xtype : 'panel',
//								baseCls : 'ex-panel',
//								html : '<div id="onlineMsgContent">即时消息(无)</div>'
//							}]
//				}),
				items : [{
							xtype : 'moduleiconview',
							app : this,
							autoLoad : true,
							bigSize : 8,
							id : 'shortCuts'
						}]
			});

			return {
				title : '&nbsp;&nbsp;&nbsp;' + GET_SESSION_EMPSID
						+ '<font color=green>(' + GET_SESSION_EMPS.empsName
						+ ')</font>',// 开始菜单的标题
				iconCls : 'user',
				toolItems : [{
					text : '注销',
					iconCls : 'logout',
					scope : this,
					handler : function() {
						// 先把所有窗口最小化
						var tbPanel = Ext.getCmp('TaskBarButtons')
						var btns = tbPanel.items;
						for (var i = 0; i < btns.length; i++) {
							btns[i].win.minimize();
						}
						Ext.Msg.confirm('系统提示', '注销旗航软件吗?', function(btn) {
							if (btn == 'yes') {
								if (Ext.isSafari) {
									(window.close()).defer(500);
								} else
									document.location.replace("logoutLogin.do");
							}
						}, this);
					}
				}, '-', {
					text : '帮助',
					iconCls : 'help',
					scope : this
				}, '-', {
					text : '关于',
					iconCls : 'settings',
					scope : this,
					handler : function() {
						var desktop = this.getDesktop();
						var win = desktop.getWindow('module_about');
						if (!win) {
							win = desktop.createWindow({
								id : 'module_about',
								title : "关于",
								width : 640,
								height : 480,
								maximized : false,
								iconCls : 'bogus',
								shim : false,
								animCollapse : false,
								constrainHeader : true,
								layout : 'fit',
								items : [{
									xtype : 'panel',
									border : false,
									html : '<div class="soft-about">'
											+ '<p style="margin-top:80px;font-size:21px;">厦门市旗航软件有限公司</p>'
											+ '<br/>'
											+ '<p>地址:厦门火炬高新区</p>'
											+ '<p>火炬园新丰二路8号第7层</p>'
											+ '<br/>'
											+ '<p>电话:0592-3335666</p>'
											+ '<p>传真:0592-3335667</p>'
											+ '<br/>'
											+ '<p>网址:<a href=#>www.xmqh.net</a></p>'
											+ '</div>'
								}]
							});
						}
						win.show();
					}
				}]
			};
		},
		getRealTime : function() {
			var cal = CalConv();
			var task = {
				run : function() {
					$('right_time').innerHTML = new Date().format('H:i:s');
					$('right_date').innerHTML = new Date().format('n月d日星期l');
					$('right_nong_date').innerHTML = cal;
				},
				interval : 1000
			}
			Ext.TaskMgr.start(task);
		},
		showOnlineMsg : function() {
			var _self = this;
			JS.Engine.on({
						unicrm : function(kb) {// 显示即时信息
							if (kb.person) {
								var msg = "<b>[" + kb.time
										+ "]&nbsp;&nbsp;<font color=blue>"
										+ kb.person.empsName
										+ "</b></font>&nbsp;说:&nbsp;" + kb.msg;
								$('onlineMsgContent').innerHTML = msg;
							} else {
								// 显示上下线信息
								$('onlineMsg').innerHTML = kb.msg;
								_self.updateLoginNum.defer(100);
								_self.clearOnlineMsg.defer(2000);
							}
						}
					});
			JS.Engine.start('conn');
		},
		clearOnlineMsg : function() {
			$('onlineMsg').innerHTML = "";
		},
		updateLoginNum : function() {
			// 刷新在线人数
			cotLoginService.findLoginNum(function(res) {
						$('loginNum').innerText = '(' + res + ')';
					});
			// 如果树面板有打开就刷新面板
			if (winLogin != null) {
				var tree = winLogin.onlinetree;
				tree.loader.dataUrl = "listOnlineCompanyLogin.do";
				tree.loader.load(tree.root, function() {
							tree.expandAll();
						});
			}
		},
		/* 获取天气信息 */
		getWheater : function() {
			var taskWeather = {
				run : function() {
					if (AREAID != null) {
						Ext.Ajax.request({
							url : './servlet/ProxyServlet?servletName=www.weather.com.cn/data/sk/'
									+ AREAID + '.html',
							success : function(response) {
								var json = Ext.decode(response.responseText);
								var realInfo = json.weatherinfo;
								// 地区
								$('right_area').innerHTML = realInfo.city;
							}
						});
						Ext.Ajax.request({
							url : './servlet/ProxyServlet?servletName=m.weather.com.cn/data/'
									+ AREAID + '.html',
							success : function(response) {
								var json = Ext.decode(response.responseText);
								var realInfo = json.weatherinfo;

								// 状态
								$('right_state').innerHTML = realInfo.weather1;
								// 温度
								$('right_du').innerHTML = realInfo.temp1;
								// 图标
								$('right_wt_pic').innerHTML = "<img width=18 height=18 src='http://m.weather.com.cn/img/b"
										+ realInfo.img1
										+ ".gif' alt='"
										+ realInfo.img_title1 + "'></img>";
							}
						});
					}
				},
				interval : 1000 * 60 * 30
			}
			Ext.TaskMgr.start(taskWeather);
		},
		/**
		 * 开始菜单左侧的功能列表
		 * 
		 * @return {}
		 */
		getModules : function() {
			var myApp = this;
			var arr = [];
			if (firstModules) {
				for (var i = 0; i < firstModules.length; i++) {
					arr = arr.concat(myApp.createModule(firstModules[i]));
				}
			}
			return arr;
		},
		createModule : function(moduleData) {
			var myApp = this;
			var menu = {
				text : moduleData.moduleName,
				iconCls : 'bogus'
			};
			var array = [];
			// 创建2级菜单
			DWREngine.setAsync(false);
			cotModuleService.getModulesByParentId(moduleData.id, function(
							childList) {
						var childItems = [];
						for (var j = 0; j < childList.length; j++) {
							var childMenu = {
								text : childList[j].moduleName,
								iconCls : 'bogus',
								handler : myApp.createWindow.createDelegate(
										myApp, [null, childList[j].id,
												childList[j].moduleName,
												childList[j].moduleUrl,
												childList[j].moduleImgurl]),
								scope : myApp
							};
							childItems.push(childMenu);
							childList[j].launcher = childMenu;
							childList[j].isParent = false;
							childList[j].createWindow = myApp.createWindow
									.createDelegate(myApp, [null,
													childList[j].id,
													childList[j].moduleName,
													childList[j].moduleUrl,
													childList[j].moduleImgurl]);
							array.push(childList[j]);
						}
						menu.menu = childItems;
						moduleData.isParent = true;
						moduleData.launcher = menu;
						array.push(moduleData);
					})
			DWREngine.setAsync(true);
			return array;
		},
		/**
		 * 第2级菜单点击后的处理
		 * 
		 * @param {}
		 *            childId
		 * @param {}
		 *            childName
		 */
		createWindow : function(pId, childId, childName, childUrl, imgUrl) {
			var desktop = this.getDesktop();
			var win = desktop.getWindow('module' + childId);
			if (!win) {
				var title = Ext.util.Format.ellipsis(childName, 12);
				if (imgUrl) {
					title = '<span style="height:20px;width:20px;float:left;margin-top:-3px;"><img src="'
							+ imgUrl
							+ '" height=20 width=20/></span>&nbsp;'
							+ title;
				}
				var iframeId = "tabIframe" + childId;
				// 判断childUrl是否含有"?"有的话参数前不使用"?",而使用"&"
				var index = childUrl.indexOf("?");
				var cha = "?";
				if (index > -1)
					cha = "&";
				childUrl += cha + QH_IFRAME_ID + '=' + iframeId;
				// 如果有父iframe的id则
				if (pId) {
					childUrl += "&" + QH_P_IFRAME_ID + '=' + pId;
				}
				win = desktop.createWindow({
							id : 'module' + childId,
							title : title,
							width : 640,
							height : 480,
							maximized : true,
							// iconCls : 'bogus',
							shim : false,
							animCollapse : false,
							constrainHeader : true,
							layout : 'fit',
							items : [{
								xtype : 'panel',
								border : false,
								listeners : {
									'activate' : function() {
										alert(22)
									}
								},
								html : '<iframe frameborder="0" id="'
										+ iframeId
										+ '" src="'
										+ childUrl
										+ '" width="100%" height="100%"></iframe>'
							}]
						});
			}
			win.show();
		}

	});
});
// 因为一关闭页面弹出关闭提示时,comet就自己调用LogoutListener
// window.onbeforeunload = function() {
// // 用户点击浏览器右上角关闭按钮
// if (Ext.isIE) {
// if (document.body.clientWidth - event.clientX < 170
// && event.clientY < 0 || event.altKey) {
// return "退出CRM邮件管理系统吗?";
// } else if (event.clientY > document.body.clientHeight || event.altKey) { //
// 用户点击任务栏，右键关闭
// return "退出CRM邮件管理系统吗?";
// } else { // 其他情况为刷新
// }
// } else if (Ext.isChrome || Ext.isOpera) {
// return "退出CRM邮件管理系统吗?";
// } else if (Ext.isGecko) {
// window.open("http://www.g.cn")
// var o = window.open("logoutLogin.do");
// }
// }
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

window.onresize = function() {
	var logoPnl = Ext.getCmp('logoPnl');
	var desktopEl = Ext.get('x-desktop');
	var shortcuts = Ext.get('shortcuts');
	var myDeskPnl = Ext.getCmp('myDeskPnl');
	var nowBodyW = Ext.lib.Dom.getViewWidth();
	var nowBodyH = Ext.lib.Dom.getViewHeight();

	desktopEl.setWidth(nowBodyW);
	myDeskPnl.setWidth(nowBodyW);
	shortcuts.setWidth(nowBodyW);
	logoPnl.setWidth(nowBodyW);
	var hg = nowBodyH - Ext.get('ux-taskbar').getHeight();
	if (!logoPnl.hidden) {
		hg = hg - 80;
	}
	shortcuts.setHeight(hg);
	myDeskPnl.setHeight(hg);
	desktopEl.setHeight(hg);
	// 刷新下已打开的窗口的高度
	var btns = Ext.getCmp('TaskBarButtons').items;
	for (var i = 0; i < btns.length; i++) {
		if (btns[i].win.maximized) {
			btns[i].win.setHeight(hg);
		}
	}

}