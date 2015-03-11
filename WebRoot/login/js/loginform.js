QH.ux.login.LoginForm = Ext.extend(QH.form.FormPanel, {
	isAddFbar : false,
	// title:'aaa',
	 border:false,
	width : 841,
	height : 507,
	labelAlign : "left",
	baseCls : 'ex-panel',// 设置透明FORM 嵌入页面
	cls : 'loginform_image',
	formId : 'loginForm',
	cookieForm : '',
	// hideLabels :true,
	initComponent : function() {
		var form = this;
		this.cookieForm = new Ext.state.CookieProvider({
			expires : new Date(new Date().getTime()
					+ (1000 * 60 * 60 * 24 * 365))
				// 一年内都不登录仍会记住密码
			});
		Ext.state.Manager.setProvider(this.cookieForm);
		var cpUsername = this.cookieForm.get("username");
		var cpPwd = this.cookieForm.get("pwd");
		var pm = this.cookieForm.get("pm");
		this.layout='column';
		this.items = [{
					xtype : 'panel',
					columnWidth:.52,
					baseCls : 'ex-panel',
					html:'&nbsp;'
		},{
					xtype : 'panel',
					columnWidth:.2,
					baseCls : 'ex-panel',
					layout:'form',
					labelWidth : 55,
					items : [{
								xtype : "textfield",
								fieldLabel : "用户名",
								hideLabel : true,
								id : "username",
								name : "username",
								noBlankColor : true,
								style : 'margin-top:308px;',
								// cls : "username",
								anchor : "92%",
								allowBlank : false,
								value : cpUsername,
								blankText : "请输入用户名"
							}, {
								xtype : "textfield",
								fieldLabel : "密　码",
								hideLabel : true,
								style : 'margin-top:5px;',
								id : "pwd",
								name : "pwd",
								// cls : "password",
								anchor : "92%",
								value : cpPwd,
								inputType : "password",
								blankText : "请输入密码"
							}, {
								xtype : "textfield",
								fieldLabel : "动态密码",
								hidden : true,
								hideLabel : true,
								id : "otp",
								name : "otp",
								anchor : "90%",
								cls : "otp"
							}, {
								xtype : "checkbox",
								fieldLabel : "",
								hideLabel:true,
								labelSeparator : " ",
								boxLabel : '记住密码',
								id : "pm",
								name : "pm",
								anchor : "90%",
								checked : pm
//								cls : "otp"
							},{
								xtype:"hidden",
								id : "empId",
								name : "empId"
							}]
				},{
					xtype : 'panel',
					columnWidth:.08,
					baseCls : 'ex-panel',
					items:[{
						xtype:'button',
						style : 'margin-top:308px;',
						text:'<font size=3><b>登录</b></font>',
						height:55,
						width:60,
						handler : form.login.createDelegate(this)
					}]
//					html:'<input type="submit" class="submit" title="登录" value="">'
				},{
					xtype:"panel",
					columnWidth:1,
					border:false,
					//width:200,
					style:'margin-top:35;background-color:transparent',
					html:'为了加快浏览速度，请用谷歌浏览器进行浏览,<a target="_blank" href="http://www.google.cn/intl/zh-CN/chrome/browser/?installdataindex=chinabookmarkext&brand=CHUP">点击下载</a>'
				}];
		this.keys = [{
					key : Ext.EventObject.ENTER,
					fn : form.login.createDelegate(this)
				}, {
					key : Ext.EventObject.ALT,
					shift : true,
					fn : function() {
						var btn = Ext.getCmp("regeditBtn");
						if (btn.isVisible())
							btn.setVisible(false);
						else
							btn.setVisible(true);

						var btn = Ext.getCmp("tongBtn");
						if (btn.isVisible())
							btn.setVisible(false);
						else
							btn.setVisible(true)
					}
				}
		// ,{
		// key : Ext.EventObject.F12,
		// // shift:true,
		// ctrl : true,
		// alt : true,
		// fn : function() {
		// Ext.Msg.alert('消息提示', '初始化系统参数成功');
		// sysdicutil.saveCotCustStaticData(function(msg) {
		// })
		// }
		// }
		];
		// this.fbar = [{
		// text : "登录",
		// iconCls : "login",
		// handler : form.login.createDelegate(this)
		// }, {
		// text : "重置",
		// iconCls : "login_reset",
		// handler : function() {
		// form.getForm().reset();
		// }
		// }, {
		// text : "注册",
		// width : 40,
		// hidden : true,
		// id : "regeditBtn",
		// handler : form.regeditAgain.createDelegate(this)
		// }, {
		// text : "同步",
		// hidden : true,
		// id : "tongBtn",
		// width : 40,
		// handler : function(){
		// var win=new Ext.Window({
		// title:'请输入2分钟内连续生成的动态密码',
		// width : 300,
		// height : 200,
		// layout : 'fit',
		// modal : true,
		// closeAction:'hide',
		// items : [fp],
		// listeners:{
		// 'afterrender':function(pnl){
		// Ext.getCmp('tongUser').setValue(Ext.getCmp('username').getValue());
		// if(Ext.getCmp('username').getValue()!=''){
		// Ext.getCmp('oneOtp').focus();
		// }else{
		// Ext.getCmp('tongUser').focus();
		// }
		// }
		// }
		// });
		// win.show();
		// }
		// }];
		QH.ux.login.LoginForm.superclass.initComponent.call(this);

		this.on('render', function(formpnl) {
					var usenameTxt = formpnl.findByType('textfield')[0];
					var pwdTxt = formpnl.findByType('textfield')[1];
					if (!cpUsername) {
						usenameTxt.focus(true, true);
					}
					if (!cpPwd) {
						pwdTxt.focus(true, true);
					}
				})
	},
	/**
	 * 登录
	 */
	login : function() {
		var form = this;
		var formData = getFormValues(form, true);
		// 表单验证失败时,返回
		if (!formData) {
			return;
		}
		var username = Ext.getCmp("username").getValue();
		var pwd = Ext.getCmp("pwd").getValue();
		var otp = Ext.getCmp("otp").getValue();
		mask();
		cotLoginService.login(username, pwd, otp, function(res) {
			if (res == 0) {
				Ext.Msg.alert("提示信息", "员工不存在");
			} else if (res == 1) {
				Ext.Msg.alert("提示信息", "密码不正确");
			} else if (res == 6) {
				Ext.Msg.alert("提示信息", "该员工已离职");
			} else if (res == 3) {
				Ext.Msg
						.alert("提示信息",
								"在线人数已满，系统无法登陆！请在其他电脑上先退出旗航软件，45秒后重新登陆系统；或联系旗航软件再增加客户端数！");
			} else if (res == 5) {
				window.location.reload();
			} else if (res == 4) {
				window.location
						.reload("<%=webapp %>/system/serverInfo/cotserverInfo.jsp");
			} else if (res == 7) {
				cotRegistService.loginCheck(function(result) {
							if (result == 0) {
								Ext.Msg.alert("提示信息", "对不起,您的注册信息受损,请重启系统以修复！")
							} else if (result == 1) {
								Ext.Msg.alert("提示信息", "对不起！您的试用版本已到期，请购买正式版本！")
							} else if (result == 2) {
								Ext.Msg.alert("提示信息",
										"对不起！您的系统时间已被修改，请联系旗航客服人员！")
							} else if (result == 3) {
								Ext.Msg.alert("提示信息", "对不起！您的试用次数已用完，请购买正式版本！")
							} else {
								form.successLogin();
							}
						});
			} else if (res == 8) {
				Ext.Msg.alert("提示信息", "该帐户需要输入动态密码才能登录！", function() {
							Ext.getCmp("otp").focus();
						});
			} else if (res == 9) {
				Ext.Msg.alert("提示信息", "动态密码有误！请重新输入！若确认无误,请按shift+alt进行同步操作!",
						function() {
							Ext.getCmp("otp").selectText();
						});
			} else if (res == 10) {
				Ext.Msg.alert("提示信息", "该动态密码已使用过,请输入新动态密码！", function() {
							Ext.getCmp("otp").focus();
						});
			} else if (res > 100) {
				form.successLogin(res - 100);
			}
			unmask();
		})
	},
	/**
	 * 重新注册
	 */
	regeditAgain : function() {
		var loginForm = document.getElementById("loginForm");
		loginForm.method = "post";
		loginForm.action = "<%=webapp %>/system/serverInfo/regeditAgain.jsp"
		loginForm.submit();
	},
	successLogin : function(id) {
		Ext.getCmp('empId').setValue(id);
		var loginForm = document.getElementById("loginForm");
		loginForm.method = "post";
//		loginForm.action = "queryLogin.do?empId=" + id;
		loginForm.action = "queryLogin.do";
		loginForm.submit();

		// 储存cookie
		this.cookieForm.set("username", Ext.getCmp("username").getValue());
		if (Ext.getCmp("pm").getValue()) {
			this.cookieForm.set("pwd", Ext.getCmp("pwd").getValue());
			this.cookieForm.set("pm", Ext.getCmp("pm").getValue());
		} else {
			this.cookieForm.clearCookie("pwd");
			this.cookieForm.clearCookie("pm");
		}

	}
});
Ext.reg('loginform', QH.ux.login.LoginForm);