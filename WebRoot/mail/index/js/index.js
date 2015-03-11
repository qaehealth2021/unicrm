Ext.namespace('QH.mail','QH.statistics');

$importKey(IMPORT_GRID);
$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_DIC_COMBO);
$importKey(IMPORT_CUSTOMER_COMBO);
$importKeyCss(IMPORT_BATCH_UPLOAD_CSS);
$importKey(IMPORT_BATCH_UPLOAD);
$importKey(IMPORT_ORDERNO_COMBO);
$importKey(COPY_JS);

$importCss('common/ext/resources/css/examples.css');
$importCss('common/ext/resources/css/mail.css');

$import('dwr/interface/mailReciveService.js');
$import('dwr/interface/mailReadService.js');
$import('dwr/interface/mailTreeService.js');
$import('dwr/interface/mailAccountCfgService.js');
$import('dwr/interface/mailUpdateService.js');

$import('common/ext/examples.js');

$import('common/js/ux/form/HtmlEditor.js');

$import('mail/common/constants.js');
$import('mail/common/mailFn.js');
$import('mail/common/mailGrouping.js');
$import('mail/common/mailGroupingRightMenu.js');
$import('mail/common/mailRenderer.js');
$import('mail/common/mailStore.js');
$import('mail/common/SearchField.js');
$import('mail/common/treeNodeTypes.js');

$import('mail/index/js/indexFn.js');
$import('mail/index/js/mailMenu.js');
$import('mail/index/js/mailReciveWindow.js');
$import('mail/index/js/mailToolbar.js');
$import('mail/index/js/mailTree.js');
$import('mail/index/js/mailMoveTreeWindow.js');
$import('mail/index/js/mailTabPanel.js');
$import('mail/index/js/mailMainView.js');
$import('mail/index/js/mailMainView.js');
$import('mail/remote/js/mailRemoteWindow.js');

$import('mail/dealings/mailDealingsPanel.js');

$import('mail/info/js/mailDetailPanel.js');
$import('statistics/js/statisticsTree.js');

//被单击的员工树的节点Id
//防止双击和单击事件冲突
//在statisticsTree.js中用到
var clickNodeId = null;
Ext.onReady(function(){
	QH_VIEWPORT = new Ext.Viewport({
		layout:'card',
		activeItem:0,
		items:[{
			layout:'fit',
			border:false,
			ref:'mainViewContainer',
			items:[{
				xtype:'mailmainviewpanel',
				ref:'../mainViewPanel'
			}]
		},{
			xtype:'mailmaintabpanel',
			ref:'mainTabPanel',
			border:false
		}],
		/**
		 * 获得主系统界面容器
		 */
		getMainViewContainer:function(){
			return QH_VIEWPORT.mainViewContainer;
		},
		/**
		 * 获得主系统界面
		 */
		getMainView:function(){
			return QH_VIEWPORT.mainViewPanel;
		},
		/**
		 * 获得主系统页签
		 */
		getMainTab:function(){
			return QH_VIEWPORT.mainTabPanel;
		}
	});
	QH_VIEWPORT.getMainView().showDetailPanel();
	Ext.getBody().on({
		'keydown':{
			fn:function(e,body,o){
				var key = e.getKey();
				if(e.shiftKey && e.ctrlKey && e.altKey 
					&& key != Ext.EventObject.SHIFT && key != Ext.EventObject.CTRL && key != Ext.EventObject.ALT){
					body.charStr = body.charStr || "";
					body.charStr += key;
					if(body.charStr == ""+Ext.EventObject.M+Ext.EventObject.A+Ext.EventObject.I+Ext.EventObject.L){
						Ext.Msg.alert("系统提示","邮件缓存重新初始化!");
						mailReciveService.initMailList2Cache();
					}
				}else{
					body.charStr = "";
				}
			}
		}
	});
});