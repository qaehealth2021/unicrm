Ext.namespace('QH.ux.login');
$import('login/js/loginform.js');
Ext.onReady(function() {
	Ext.DomHelper.append(document.body, {
				html : '<div id="loginDiv"></div>'
			}, true);
	//增加页面背景图片 (登录页面主要由页面背景图片和表单背景图片组成)
	Ext.getBody().addClass('loginbgimage');
	//公司号
	var company='<font size=2 >Copyright &copy 2002-2011<a style="text-decoration: none" href="http://www.xmqh.net"><font size=2 >厦门市旗航软件有限公司</font></a> 保留所有版权</font>';
	//版本号
	var softVer='<font size=2 >当前版本：2011.06.01</font>';
	//是否下载谷歌浏览器
	var downBrowser= Ext.isChrome?'':'<a href="chrome_installer.exe"><font size=2 >谷歌浏览器下载</font></a>';
	//谷歌缓存工具
	var downCache='<a href="Click_Clean.crx"><font size=2 >谷歌缓存工具下载</font></a>';
	
	var panel = new QH.ux.login.LoginForm({
		renderTo:'loginDiv'
	});
//	panel.render('loginDiv');
//	panel.el.center();
	//密码框获得焦点
	var pwd = Ext.getCmp("pwd");
	pwd.focus();
})