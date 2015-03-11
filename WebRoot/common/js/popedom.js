

/**
 * 
 * @type 
 */
var mapPopedom = null;
/**
 * 初始化员工的权限Map,在framework.js中调用，只要调用一次
 */
function initPopedomMap(url){
//	//HTML5，就纯在本地，在
//	var localStorage = supports_local_storage();
//	if(localStorage && localStorage[url]){
//		return localStorage[url]
//	}
	DWREngine.setAsync(false);
	cotPopedomService.getFunPopedomMap(url,true, function (res) {
		mapPopedom = res;
	});
//	if(localStorage){
//		localStorage[url]=mapPopedom;
//	}
	DWREngine.setAsync(true);
	return mapPopedom;
}
/**
 * 
 * @param {} url
 * @param {} opType
 * @param {} bReloadMap
 * @return {Number}
 */
function getPopedomByOpType(url, opType,bReloadMap) {
	if (window.GET_SESSION_EMPSID == 'admin') {//admin用户不做权限判断
		return 1;
	}
	DWREngine.setAsync(false);
	var result = 1;
	if (mapPopedom == null) {
		cotPopedomService.getFunPopedomMap(url,false, function (res) {
			mapPopedom = res;
		});
	}
	if(bReloadMap){
		cotPopedomService.getFunPopedomMap(url,true, function (res) {
			mapPopedom = res;
		});
	}
	try{
		var res = mapPopedom[opType];
		if (typeof (res) == "undefined") {
			result = 0;
		}
	}catch(e){
		return 0;
	}
	DWREngine.setAsync(true);
	return result;
}
/**
 * 
 * @param {} map
 */
function judgePopedom(map) {
	if (typeof (map.SEL) == "undefined") {
		//alert("sss");
		Ext.MessageBox.alert('提示消息',"您没有权限查看该页面");
		window.location.href = "/CotSystemV8/common/home.jsp";
		return;
	}
	
	//获取需要进行权限判断的按钮，因为Ext的Button封装在table，故用该表达式获取
	//SYSOP，是系统规定的标识符，查询包含这个标识符的所有按钮
	// 右击菜单权限判断
	var eles = Ext.query("a[class*=SYSOP]");
	var parentNode;
	elementPopedomHandle(eles,map,function(btn){
		parentNode = btn.parentNode;
		if(parentNode && parentNode.nodeName == "LI"){
			parentNode.style.display = "none";
		}
	});
}
/**
 * 判断按钮是否有权限显示，针对工具栏
 * @param {} btn：Ext中的button按钮
 */
function popedomHanlder_tbar(btn){
	if(window.GET_SESSION_EMPSID == 'admin') return;
	var cls = btn.cls;
	if(cls == null) return;
	var index = cls.indexOf("SYSOP_");
	//获取功能点
	if(index == -1) return;
	var fun = cls.replace("SYSOP_","");
	//TODO:权限map的获取
	//var localStorage = supports_local_storage();
	//if(localStorage){
		//mapPopedom = localStorage[vaildUrl];
	//}else{
		mapPopedom = initPopedomMap(vaildUrl);
	//}
	if(mapPopedom == null) mapPopedom = {};
	if(mapPopedom[fun] == null){
		//没有改功能点，就隐藏该按钮
		btn.hide();
	}
}
/**
 * 验证页面的权限，用于修改页面按钮的判断
 * @param {} url
 */
function popedomHanlder_page(){
	var btns = Ext.query('table[class*=SYSOP]');
	Ext.each(btns,function(btn){
		var id = btn.id;
		var op = btn.className.replace('x-btn','').replace('x-btn-text-icon','').replace('x-item-disabled','').trim();
		var btnCmp = Ext.getCmp(id);
		if(btnCmp.isVisible()){
			btnCmp.cls = op;
			popedomHanlder_tbar(btnCmp);
		}
	});
}
function getLoginEmpid() {
//	DWREngine.setAsync(false);
//	cotPopedomService.getLoginEmp(function (res) {
//		loginEmpId = res.empsId;
//	});
//	if (loginEmpId == null) {
//		Ext.MessageBox.alert('提示消息',"登陆超时，请重新登陆");
//		DWREngine.setAsync(true);
//		var url = document.location.href;
//		var idx = url.indexOf("/");
//		url = url.substring(0,idx);
//		window.location.href = url+"/index.do?method=logoutAction"
//		return;
//	}
//	DWREngine.setAsync(true);
	return window.GET_SESSION_EMPSID;
}
/**
 * 
 * @type String
 */
var vaildUrl = "";
/**
 * 当前登录员工账号
 * @type String
 */
var loginEmpId = "";
/**
 * 
 */
getLoginEmpid();
/**
 * 
 * @type 
 */
var soft_ver = -1;

function oninitpageload() {
	vaildUrl = document.location.href;
	var endindex = vaildUrl.indexOf("?");
	var beginindex = vaildUrl.lastIndexOf("/");
	if(endindex == -1)
		vaildUrl = vaildUrl.substring(beginindex + 1);
	else{
		//统计分析的权限控制,?后面传递的参数含有"/"
		if(beginindex>endindex){
			 beginindex = vaildUrl.lastIndexOf("/",endindex);
		}
		vaildUrl = vaildUrl.substring(beginindex + 1, endindex);
	}
	if(vaildUrl.indexOf("_") > -1){
		var index = vaildUrl.indexOf("_");
		vaildUrl = vaildUrl.substring(index+1);
	}
	if(window.GET_SESSION_EMPSID == 'admin') return;
	//过滤菜单模块和通用控件查询模块
	if (vaildUrl == "cotmodule.do" || vaildUrl=="previewrpt.do" || vaildUrl=="base.do") {
		return;
	}
	//getSoftVer();//邮件权限判断
	
	popedomHanlder_page();
}
Ext.onReady(function(){
	//初始化
	oninitpageload();
});