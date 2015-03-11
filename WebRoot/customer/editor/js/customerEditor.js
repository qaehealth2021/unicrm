Ext.namespace('QH.customer','QH.contact','QH.mail','QH.statistics','QH.contactGroup','QH.faxsend','QH.sms');
//显示loading
mask();
$importKey(IMPORT_PIC);
$importKeyCss(IMPORT_UPLOAD_CSS);
$importKey(IMPORT_NO_REPEAT);
$importKey(IMPORT_EMP_COMBO);
$importKey(IMPORT_NATION_COMBO);
$importKey(IMPORT_PROVICE_COMBO);
$importKey(IMPORT_DNCTAB);
$importKey(IMPORT_CLAUSE_COMBO);
$importKey(IMPORT_DIC_COMBO);
$importKey(IMPORT_AERA_COMBO);
$importKey(IMPORT_ORDERNO_COMBO);

$importKeyCss(IMPORT_BATCH_UPLOAD_CSS);
$importKey(IMPORT_BATCH_UPLOAD);

//－－－联系人－－开始
$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_GRID);
$importKey(IMPORT_CUSTOMER_COMBO);
$import('contact/js/contactStore.js');
$import('contact/js/contactGrid.js');
$import('contact/js/contactToolbar.js');
//－－－联系人－－结束

//--联系人分组模块--//
$import('dwr/interface/cotContactService.js');
$import('contactgroup/js/contactGroupStore.js');
$import('contactgroup/js/contactGroupGrid.js');
$import('contactgroup/js/contactGroupToolbar.js');
//---------------------
$import('customer/editor/js/customerForm.js');
$import('customer/editor/js/customerTab.js');
$import('customer/editor/js/businessForm.js');
$import('customer/js/ShareEmpGrid.js');

//------------------邮件模块------------------//
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
$import('mail/remote/js/mailRemoteWindow.js');
$import('common/js/ZeroClipboard.js');

$import('mail/dealings/mailDealingsPanel.js');

$import('mail/info/js/mailDetailPanel.js');
$import('statistics/js/statisticsTree.js');


//联系人传真短信模块
$import("dwr/interface/cotFaxService.js");
$import("dwr/interface/cotSmsService.js");
$import('fax/js/faxsendSendWin.js');
$import('sms/js/smsWinToolbar.js');
$import('sms/js/smsSendOneWin.js');



//------------------end---------------------------
Ext.onReady(function(){
	var modeId = $('modId').value == 'null'?'':$('modId').value;
	var personName = $('personName').value == 'null'?'':decodeURI($('personName').value);
	var personEmail = $('personEmail').value == 'null'?'':$('personEmail').value;
	var first = $('first').value == 'null'?'':$('first').value;
	QH_VIEWPORT = new Ext.Viewport({
		layout:'border',
		items:[{
			xtype:'customerform',
			margins:'0 5 0 0',
			personName:personName,
			personEmail:personEmail,
			ref:'customerform',
			gridId : $('gridId').value,
			isSaveClose:true,
			modId: modeId,
			objName:'CotCustomer',
			region :'west',
			width:300
		},{
			xtype:'customertab',
			ref:'customertab',
			modId: modeId,
			first: first,
			hidden:modeId == ''?true:false,
			region :'center'
		}],
		/**
		 * 获得主系统界面容器
		 */
		getMainViewContainer:function(){
			return QH_VIEWPORT.customertab.mainViewContainer;
		},
		/**
		 * 获得主系统界面
		 */
		getMainView:function(){
			return QH_VIEWPORT.customertab.mainViewPanel;
		}
	});
	//隐藏loading
	QH_VIEWPORT.getMainView().showDetailPanel();
	unmask();
});
