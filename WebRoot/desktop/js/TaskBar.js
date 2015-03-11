/**
 * 任务栏 (构造任务面板和开始菜单)
 * 
 * @param {}
 *            app
 */
Ext.ux.TaskBar = function(app) {
	this.app = app;
	this.init();
}

// 显示在线人数树
var winLogin = null;
function showLoginTree() {
	if (winLogin == null) {
		// 先把所有窗口最小化
		var tbPanel = Ext.getCmp('TaskBarButtons')
		var btns = tbPanel.items;
		for (var i = 0; i < btns.length; i++) {
			btns[i].win.minimize();
		}
		winLogin = new Ext.Window({
					title : "&nbsp;&nbsp;所有员工",
					iconCls:'user',
					width : 250,
					height : 470,
					layout : "fit",
					items : [{
								xtype : 'qhtabpanel',
								activeTab : 0,
								items:[{
									title:'在线员工',
									xtype : 'onlinelogintree',
									ref : '../onlinetree'
								},{
									title:'所有员工',
									xtype : 'logintree',
									ref : '../tree'
								}]
							}]
				});
		var w = Ext.getBody().getWidth();
		winLogin.setPosition(w - 250, 110);
		winLogin.show();
		// 展开
//		winLogin.tree.root.expand(true);
	} else {
		winLogin.close();
		winLogin = null;
	}
	cotLoginService.findLoginNum(function(res) {
				$('loginNum').innerText = '(' + res + ')';
			});
}
var pwdWin = null;
// 修改密码
function updatePwd() {
	if (pwdWin == null) {
		pwdWin = new Ext.Window({
				title : "修改密码",
				width : 400,
				height : 180,
				layout : "form",
				closeAction:'hide',
				plain : true,
				padding : "5px",
				labelAlign : "right",
				hideBorders : false,
				labelWidth : 70,
				monitorValid : true,
				buttonAlign : "center",
				modal : true,
				fbar : [{
							text : "修改密码",
							iconCls : "key",
							handler : changePwd
						}],
				items : [{
							xtype : "textfield",
							fieldLabel : "旧密码",
							id : "oldpwd",
							name : "oldpwd",
							inputType : "password",
							allowBlank : false,
							blankText : "请输入旧密码",
							anchor : "100%"
						}, {
							xtype : "textfield",
							fieldLabel : "新密码",
							id : "newpwd",
							name : "newpwd",
							inputType : "password",
							allowBlank : false,
							blankText : "请输入新密码",
							anchor : "100%"
						}, {
							xtype : "textfield",
							fieldLabel : "确认新密码",
							id : "confirmpwd",
							name : "confirmpwd",
							inputType : "password",
							allowBlank : false,
							blankText : "请重新输入新密码",
							anchor : "100%",
							vtype : 'password',
							initialPassField : 'newpwd'
						}]
			});
	}
	pwdWin.show();
}
//更改密码方法
function changePwd() {
	var oldPwd = document.getElementById("oldpwd").value;
	var newpwd = document.getElementById("newpwd").value;
	var confirmpwd = document.getElementById("confirmpwd").value;
	if (newpwd != confirmpwd) {
		Ext.Msg.alert("提示信息", "新密码和确认密码不一致!请重新确认");
		document.getElementById("confirmpwd").value = "";
		document.getElementById("confirmpwd").onfocus();
		return;
	}
	cotLoginService.modifyPwdByEmpId(oldPwd, newpwd, function(res) {
				if (res == 1) {
					Ext.Msg.alert("提示信息", "旧密码有误,请重新输入");
				} else {
					Ext.Msg.alert("提示信息", "修改成功,请重新登陆!");
//					parent.document.location.href = "index.do?method=logoutAction";
				}
			});
}

// 隐藏和显示顶部panel
function hideLogoPnl() {
	var logoPnl = Ext.getCmp('logoPnl');
	var desktopEl = Ext.get('x-desktop');
	var shortcuts = Ext.get('shortcuts');
	var myDeskPnl = Ext.getCmp('myDeskPnl');
	logoPnl.setWidth(Ext.lib.Dom.getViewWidth());
	var hg = Ext.lib.Dom.getViewHeight() - Ext.get('ux-taskbar').getHeight();
	if (!logoPnl.hidden) {
		logoPnl.hide();
	} else {
		logoPnl.show();
		hg=hg - 80;
	}
	desktopEl.setHeight(hg);
	shortcuts.setHeight(hg);
	myDeskPnl.setHeight(hg);
	// 刷新下已打开的窗口的高度
	var btns = Ext.getCmp('TaskBarButtons').items;
	for (var i = 0; i < btns.length; i++) {
		if (btns[i].win.maximized) {
			btns[i].win.setHeight(hg);
		}
	}
	Ext.get('hide_topbar').toggleClass('up');
}
// 注销
function logout() {
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
// 关闭任务栏
function closeTab(img) {
	var tabId = img.className.substring(6);
	Ext.getCmp(tabId).close();
}

Ext.extend(Ext.ux.TaskBar, Ext.util.Observable, {
	init : function() {
		var _self = this;
		this.startMenu = new Ext.ux.StartMenu(Ext.apply({
					iconCls : 'user',
					height : 300,
					shadow : true,
					title : 'Jack Slocum',
					width : 300
				}, this.app.startConfig));

		this.startBtn = new Ext.Button({
			text : '<font style="font-size:13px;">菜单</font>',
			id : 'ux-startbutton',
			iconCls : 'start',
			menu : this.startMenu,
			// menuAlign : 'bl-tl',
			renderTo : 'ux-taskbar-start',
			clickEvent : 'mousedown',
			template : new Ext.Template(
					'<table cellspacing="0" class="x-btn"><tbody class="{1}"><tr>',
					'<td class="ux-startbutton-left"><i>&#160;</i></td>',
					'<td class="ux-startbutton-center"><em class="{2} unselectable="on">',
					'<button class="x-btn-text" type="{0}" style="height:30px;"></button>',
					'</em></td>',
					'<td class="ux-startbutton-right"><i>&#160;</i></td>',
					'</tr></tbody></table>')
		});

		this.homeBtn = new Ext.Button({
			id : 'ux-homebutton',
			iconCls : 'bogus',
			clickEvent : 'mousedown',
			listeners : {
				'click' : function(btn, e) {
					var btns = _self.tbPanel.items;
					for (var i = 0; i < btns.length; i++) {
						btns[i].win.minimize();
					}
				}
			},
			text : '<font style="font-size:13px;">工作台</font>',
			template : new Ext.Template(
					'<table cellspacing="0" class="x-btn {3}"><tbody><tr>',
					'<td class="ux-taskbutton-left"><i>&#160;</i></td>',
					'<td class="ux-taskbutton-center"><em class="{5} unselectable="on">',
					'<button class="x-btn-text {2}" type="{1}" style="height:30px;">{0}</button>',
					'</em></td>',
					'<td class="ux-taskbutton-right"><i>&#160;</i></td>',
					"</tr></tbody></table>")
		});

		var width = this.startBtn.getEl().getWidth() + 95;

		var sbBox = new Ext.BoxComponent({
					el : 'ux-taskbar-start',
					id : 'TaskBarStart',
					// minWidth : this.startBtn.getEl().getWidth() + 10,
					region : 'west',
					// split : true,
					width : this.startBtn.getEl().getWidth() + 10
				});

		// 菜单按钮和工作台按钮放在一起
		var sbAndHomeBtn = new Ext.Panel({
					layout : "border",
					region : 'west',
					baseCls : 'ex-panel',
					bodyStyle : 'background:black;',
					// minWidth : width,
					width : width,
					border : false,
					// split : true,
					items : [sbBox, {
								xtype : "panel",
								region : 'center',
								baseCls : 'ex-panel',
								border : false,
								layout : "fit",
								bodyStyle : 'background:black;',
								items : [this.homeBtn]
							}]
				})

		this.tbPanel = new Ext.ux.TaskButtonsPanel({
					el : 'ux-taskbuttons-panel',
					id : 'TaskBarButtons',
					autoScroll : false,
					region : 'center'
				});

		var timeBox = new Ext.BoxComponent({
			el : 'ux-taskbar-time',
			id : 'TaskBarTime',
			minWidth : 120,
			region : 'east',
			width : 165,
			html : '<div id="taskbar_right">'
					+ '<a id="portal" href="javascript:showLoginTree();" hidefocus="hidefocus" title="在线人"></a><font id="loginNum">(1)</font>'
					+ '<a id="person_info" href="javascript:updatePwd();" hidefocus="hidefocus" title="修改密码"></a>'
					+ '<a id="logout" href="javascript:logout();" title="注销登录"></a>'
					+ '<a id="hide_topbar" href="javascript:hideLogoPnl();" title="隐藏顶部" class=""></a></div>',
			listeners : {
				'render' : function(btn) {
					cotLoginService.findLoginNum(function(res) {
								$('loginNum').innerText = '(' + res + ')';
							});
				}
			}
		});

		var container = new Ext.ux.TaskBarContainer({
					el : 'ux-taskbar',
					layout : 'border',
					items : [sbAndHomeBtn, this.tbPanel, timeBox]
				});

		return this;
	},

	addTaskButton : function(win) {
		return this.tbPanel.addButton(win, 'ux-taskbuttons-panel');
	},

	removeTaskButton : function(btn) {
		this.tbPanel.removeButton(btn);
	},

	setActiveButton : function(btn) {
		this.tbPanel.setActiveButton(btn);
	}
});

/**
 * @class Ext.ux.TaskBarContainer
 * @extends Ext.Container
 */
Ext.ux.TaskBarContainer = Ext.extend(Ext.Container, {
			initComponent : function() {
				Ext.ux.TaskBarContainer.superclass.initComponent.call(this);

				this.el = Ext.get(this.el) || Ext.getBody();
				this.el.setHeight = Ext.emptyFn;
				this.el.setWidth = Ext.emptyFn;
				this.el.setSize = Ext.emptyFn;
				this.el.setStyle({
							overflow : 'hidden',
							margin : '0',
							border : '0 none'
						});
				this.el.dom.scroll = 'no';
				this.allowDomMove = false;
				this.autoWidth = true;
				this.autoHeight = true;
				Ext.EventManager.onWindowResize(this.fireResize, this);
				this.renderTo = this.el;
			},

			fireResize : function(w, h) {
				this.onResize(w, h, w, h);
				this.fireEvent('resize', this, w, h, w, h);
			}
		});

/**
 * @class Ext.ux.TaskButtonsPanel
 * @extends Ext.BoxComponent
 */
Ext.ux.TaskButtonsPanel = Ext.extend(Ext.BoxComponent, {
	activeButton : null,
	enableScroll : true,
	scrollIncrement : 0,
	scrollRepeatInterval : 400,
	scrollDuration : .35,
	animScroll : true,
	resizeButtons : true,
	buttonWidth : 168,
	minButtonWidth : 118,
	buttonMargin : 2,
	buttonWidthSet : false,

	initComponent : function() {
		Ext.ux.TaskButtonsPanel.superclass.initComponent.call(this);
		this.on('resize', this.delegateUpdates);
		this.items = [];

		this.stripWrap = Ext.get(this.el).createChild({
					cls : 'ux-taskbuttons-strip-wrap',
					cn : {
						tag : 'ul',
						cls : 'ux-taskbuttons-strip'
					}
				});
		this.stripSpacer = Ext.get(this.el).createChild({
					cls : 'ux-taskbuttons-strip-spacer'
				});
		this.strip = new Ext.Element(this.stripWrap.dom.firstChild);

		this.edge = this.strip.createChild({
					tag : 'li',
					cls : 'ux-taskbuttons-edge'
				});
		this.strip.createChild({
					cls : 'x-clear'
				});
	},

	addButton : function(win) {
		var li = this.strip.createChild({
					tag : 'li'
				}, this.edge); // insert before the edge
		var btn = new Ext.ux.TaskBar.TaskButton(win, li);

		this.items.push(btn);

		if (!this.buttonWidthSet) {
			this.lastButtonWidth = btn.container.getWidth();
		}

		this.setActiveButton(btn);
		return btn;
	},

	removeButton : function(btn) {
		var li = document.getElementById(btn.container.id);
		btn.destroy();
		li.parentNode.removeChild(li);

		var s = [];
		for (var i = 0, len = this.items.length; i < len; i++) {
			if (this.items[i] != btn) {
				s.push(this.items[i]);
			}
		}
		this.items = s;

		this.delegateUpdates();
	},

	setActiveButton : function(btn) {
		this.activeButton = btn;
		this.delegateUpdates();
	},

	delegateUpdates : function() {
		/*
		 * if(this.suspendUpdates){ return; }
		 */
		if (this.resizeButtons && this.rendered) {
			this.autoSize();
		}
		if (this.enableScroll && this.rendered) {
			this.autoScrollTo();
		}
	},

	autoSize : function() {
		var count = this.items.length;
		var ow = this.el.dom.offsetWidth;
		var aw = this.el.dom.clientWidth;

		if (!this.resizeButtons || count < 1 || !aw) { // !aw for display:none
			return;
		}

		var each = Math.max(Math.min(Math.floor((aw - 4) / count)
								- this.buttonMargin, this.buttonWidth),
				this.minButtonWidth); // -4 for float errors in IE
		var btns = this.stripWrap.dom.getElementsByTagName('button');

		this.lastButtonWidth = Ext.get(btns[0].id).findParent('li').offsetWidth;

		for (var i = 0, len = btns.length; i < len; i++) {
			var btn = btns[i];

			var tw = Ext.get(btns[i].id).findParent('li').offsetWidth;
			var iw = btn.offsetWidth;

			btn.style.width = (each - (tw - iw)) + 'px';
		}
	},

	autoScrollTo : function() {
		var count = this.items.length;
		var ow = this.el.dom.offsetWidth;
		var tw = this.el.dom.clientWidth;

		var wrap = this.stripWrap;
		var cw = wrap.dom.offsetWidth;
		var pos = this.getScrollPos();
		var l = this.edge.getOffsetsTo(this.stripWrap)[0] + pos;

		if (!this.enableScroll || count < 1 || cw < 20) { // 20 to prevent
			// display:none
			// issues
			return;
		}
		wrap.setWidth(tw); // moved to here because of problem in Safari

		if (l <= tw) {
			wrap.dom.scrollLeft = 0;
			// wrap.setWidth(tw); moved from here because of problem in Safari
			if (this.scrolling) {
				this.scrolling = false;
				this.el.removeClass('x-taskbuttons-scrolling');
				this.scrollLeft.hide();
				this.scrollRight.hide();
			}
		} else {
			if (!this.scrolling) {
				this.el.addClass('x-taskbuttons-scrolling');
			}
			tw -= wrap.getMargins('lr');
			wrap.setWidth(tw > 20 ? tw : 20);
			if (!this.scrolling) {
				if (!this.scrollLeft) {
					this.createScrollers();
				} else {
					this.scrollLeft.show();
					this.scrollRight.show();
				}
			}
			this.scrolling = true;
			if (pos > (l - tw)) { // ensure it stays within bounds
				wrap.dom.scrollLeft = l - tw;
			} else { // otherwise, make sure the active button is still
				// visible
				this.scrollToButton(this.activeButton, true); // true to
				// animate
			}
			this.updateScrollButtons();
		}
	},

	createScrollers : function() {
		var h = this.el.dom.offsetHeight; // var h =
		// this.stripWrap.dom.offsetHeight;

		// left
		var sl = this.el.insertFirst({
					cls : 'ux-taskbuttons-scroller-left'
				});
		sl.setHeight(h);
		sl.addClassOnOver('ux-taskbuttons-scroller-left-over');
		this.leftRepeater = new Ext.util.ClickRepeater(sl, {
					interval : this.scrollRepeatInterval,
					handler : this.onScrollLeft,
					scope : this
				});
		this.scrollLeft = sl;

		// right
		var sr = this.el.insertFirst({
					cls : 'ux-taskbuttons-scroller-right'
				});
		sr.setHeight(h);
		sr.addClassOnOver('ux-taskbuttons-scroller-right-over');
		this.rightRepeater = new Ext.util.ClickRepeater(sr, {
					interval : this.scrollRepeatInterval,
					handler : this.onScrollRight,
					scope : this
				});
		this.scrollRight = sr;
	},

	getScrollWidth : function() {
		return this.edge.getOffsetsTo(this.stripWrap)[0] + this.getScrollPos();
	},

	getScrollPos : function() {
		return parseInt(this.stripWrap.dom.scrollLeft, 10) || 0;
	},

	getScrollArea : function() {
		return parseInt(this.stripWrap.dom.clientWidth, 10) || 0;
	},

	getScrollAnim : function() {
		return {
			duration : this.scrollDuration,
			callback : this.updateScrollButtons,
			scope : this
		};
	},

	getScrollIncrement : function() {
		return (this.scrollIncrement || this.lastButtonWidth + 2);
	},

	/*
	 * getBtnEl : function(item){ return document.getElementById(item.id); },
	 */

	scrollToButton : function(item, animate) {
		item = item.el.dom.parentNode; // li
		if (!item) {
			return;
		}
		var el = item; // this.getBtnEl(item);
		var pos = this.getScrollPos(), area = this.getScrollArea();
		var left = Ext.fly(el).getOffsetsTo(this.stripWrap)[0] + pos;
		var right = left + el.offsetWidth;
		if (left < pos) {
			this.scrollTo(left, animate);
		} else if (right > (pos + area)) {
			this.scrollTo(right - area, animate);
		}
	},

	scrollTo : function(pos, animate) {
		this.stripWrap.scrollTo('left', pos, animate
						? this.getScrollAnim()
						: false);
		if (!animate) {
			this.updateScrollButtons();
		}
	},

	onScrollRight : function() {
		var sw = this.getScrollWidth() - this.getScrollArea();
		var pos = this.getScrollPos();
		var s = Math.min(sw, pos + this.getScrollIncrement());
		if (s != pos) {
			this.scrollTo(s, this.animScroll);
		}
	},

	onScrollLeft : function() {
		var pos = this.getScrollPos();
		var s = Math.max(0, pos - this.getScrollIncrement());
		if (s != pos) {
			this.scrollTo(s, this.animScroll);
		}
	},

	updateScrollButtons : function() {
		var pos = this.getScrollPos();
		this.scrollLeft[pos == 0 ? 'addClass' : 'removeClass']('ux-taskbuttons-scroller-left-disabled');
		this.scrollRight[pos >= (this.getScrollWidth() - this.getScrollArea())
				? 'addClass'
				: 'removeClass']('ux-taskbuttons-scroller-right-disabled');
	}
});

/**
 * @class Ext.ux.TaskBar.TaskButton
 * @extends Ext.Button
 */
Ext.ux.TaskBar.TaskButton = function(win, el) {
	this.win = win;
	var winId = win.getId();
	Ext.ux.TaskBar.TaskButton.superclass.constructor.call(this, {
		text : '<font style="font-size:13px;">'+win.title+'</font>',
		renderTo : el,
		handler : function() {
			if (win.minimized || win.hidden) {
				win.show();
			} else if (win == win.manager.getActive()) {
				win.minimize();
			} else {
				win.toFront();
			}
		},
		// clickEvent : 'mousedown',
		template : new Ext.Template(
				'<table cellspacing="0" class="x-btn {3}"><tbody><tr>',
				'<td class="ux-taskbutton-left"><i>&#160;</i></td>',
				'<td class="ux-taskbutton-center"><em class="{5} unselectable="on">',
				'<button class="x-btn-text {2}" type="{1}" style="height:28px;">{0}</button><img onclick="closeTab(this)" class="winId_'
						+ winId
						+ '" src="./common/ext/resources/images/extend/cross.png"/>',
				'</em></td>',
				'<td class="ux-taskbutton-right"><i>&#160;</i></td>',
				"</tr></tbody></table>")
	});
};

Ext.extend(Ext.ux.TaskBar.TaskButton, Ext.Button, {
			onRender : function() {
				Ext.ux.TaskBar.TaskButton.superclass.onRender.apply(this,
						arguments);

				this.cmenu = new Ext.menu.Menu({
							items : [{
										text : '恢复',
										handler : function() {
											if (!this.win.isVisible()) {
												this.win.show();
											} else {
												this.win.restore();
											}
										},
										scope : this
									}, {
										text : '最小化',
										handler : this.win.minimize,
										scope : this.win
									}, {
										text : '最大化',
										handler : this.win.maximize,
										scope : this.win
									}, '-', {
										text : '关闭',
										handler : this.closeWin.createDelegate(
												this, this.win, true),
										scope : this.win
									}, '-', {
										text : '关闭其他',
										handler : this.closeWinOther
												.createDelegate(this, this.win,
														true),
										scope : this.win
									}, '-', {
										text : '关闭所有',
										handler : this.closeWinAll
												.createDelegate(this)
									}]
						});

				this.cmenu.on('beforeshow', function() {
							var items = this.cmenu.items.items;
							var w = this.win;
							items[0].setDisabled(w.maximized !== true
									&& w.hidden !== true);
							items[1].setDisabled(w.minimized === true);
							items[2].setDisabled(w.maximized === true
									|| w.hidden === true);
						}, this);

				this.el.on('contextmenu', function(e) {
							e.stopEvent();
							if (!this.cmenu.el) {
								this.cmenu.render();
							}
							var xy = e.getXY();
							// xy[1] += this.cmenu.el.getHeight();
							this.cmenu.showAt(xy);
						}, this);
			},

			closeWin : function(cMenu, e, win) {
				if (!win.isVisible()) {
					win.show();
				} else {
					win.restore();
				}
				win.close();
			},
			closeWinOther : function(cMenu, e, win) {
				var btns = Ext.getCmp('TaskBarButtons').items;
				for (var i = 0; i < btns.length; i++) {
					if (btns[i].win.id != win.id)
						btns[i].win.close();
				}
			},
			closeWinAll : function() {
				var btns = Ext.getCmp('TaskBarButtons').items;
				for (var i = 0; i < btns.length; i++) {
					btns[i].win.close();
				}
			}
		});