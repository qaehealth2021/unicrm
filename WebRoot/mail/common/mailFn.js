
/**
 * 获得节点所属的账号节点
 * 
 * @param {} node
 */
QH.mail.getAccountNode = function(node) {
	if (node.attributes.nodeType == MAIL_NODE_TYPE.A){
		return node;
	}
	return QH.mail.getAccountNode(node.parentNode);
}
/**
 * 将数字类型转成对应的字节
 * @param {int} size
 * @return {}
 */
QH.mail.sizeFn = function(size){
	if(size == null){
		return "";
	}
	if(size<1024){
		return '('+size+'&nbsp;B'+')';
	}else if(size<(1024*1024)){
		return '('+(size/1024).toFixed(2) + '&nbsp;KB'+')';
	}else{
		return '('+(size/1024/1024).toFixed(2) + '&nbsp;MB'+')';			
	}	
}
/**
 * 打开邮件
 * @param {} mail
 * @param {} grid
 */
QH.mail.openMailFn = function(mail,grid){
	var mailType = mail.mailType;
	var params = {mailId:mail.id};
	if(grid)
		params.gridId = grid.id;
	// 发件或草稿类型，则打开发送界面编辑
	if(mailType == MAIL_TYPE.SENDING || mailType == MAIL_TYPE.DRAFT){
		Ext.apply(params,{
			sendTypeStatus:MAIL_SEND_TYPE_STATUS.MODIFY,
			accountId:mail.nodeId.accountCfgId.id
		});
//		openFullWindow('query_mailsend.do?'+Ext.urlEncode(params))
		openDeskWin('撰写邮件','query_mailsend.do?'+Ext.urlEncode(params))
	}else{ // 打开邮件信息界面
		if(MAIL_OPEN_SHOW_TAB)	// 以页签方式打开邮件
			QH_VIEWPORT.getMainTab().openMail(mail.id,mail.subject);
		else	// 以窗口方式打开邮件
//			openWindow('queryinfo_mail.do?'+Ext.urlEncode(params));
			openDeskWin(mail.subject,'queryinfo_mail.do?'+Ext.urlEncode(params),"mail_"+mail.id);
	}
	
}
/**
 * 打开附件
 * @param {} attach
 */
QH.mail.openAttachFn = function(attach){
	var params = {
		name:attach.name,
		path:attach.url,
		t:'open'
	}
	var url = MAIL_DOWNLOAD_MAIL_FILE + '?' + Ext.urlEncode(params);
	openWindow(url);
}
/**
 * 下载附件
 * @param {} attachs
 */
QH.mail.downAttachFn = function(attachs){
	var params;
	if(Ext.isObject(attachs) ||　attachs.length == 1){	
		params = {
			name:attachs[0].name,
			path:attachs[0].url,
			t:'down'
		}
	}else{
		params = {
			attachs:Ext.encode(attachs)
		}
	}
	
	var url = MAIL_DOWNLOAD_MAIL_FILE + '?' + Ext.urlEncode(params);
	downRpt(url);
}
/**
 * 提取附件的后缀名
 * @param {} name
 * @return {String}
 */
QH.mail.attachExtNameFn = function(name){
	if(!name)
		return "default";
	return name.lastIndexOf('.')==-1 ? 
		'default':name.substring(name.lastIndexOf('.')+1).toLowerCase();
}
/**
 * 显示联系人名
 * @param {} name
 * @param {} emailUrl
 * @return {}
 */
QH.mail.showPersonName = function(name,emailUrl){
	return name || emailUrl.substring(0,emailUrl.indexOf('@'));
}
/**
 * 发送邮件函数
 * @param {} sendTypeStatus 发送
 * @param {} accountId
 * @param {} mailId
 */
QH.mail.openSendMailFn = function(btn){
	var node = QH_VIEWPORT.getMainView().mailTree.getSelectionModel().getSelectedNode();
	if(node == null){
		node = this.statisticsTreeNode;
	}
	var sendTypeStatus = btn.sendType;
	var params = {
		sendTypeStatus:sendTypeStatus
	}
	if(sendTypeStatus == MAIL_SEND_TYPE_STATUS.NEW){
		params.accountId = node.attributes.accountCfgId.id;
	}else{
		var grid = QH_VIEWPORT.getMainView().mailGrid; // 被击活的grid
		var record = grid.getSelectionModel().getSelected() // 获得被选中的数据
		var trackStatus = record.data.trackStatus ? record.data.trackStatus.id : null;
		var custId = record.data.custId ? record.data.custId.id : null;
		var consignCustId = record.data.consignCustId ? record.data.consignCustId.id : null;
		Ext.apply(params,{
			mailId:record.id,
			accountId:record.data.nodeId.accountCfgId.id,
			custId:custId,
			consignCustId:consignCustId,
			orderNo:record.data.orderNo,
			trackStatus:trackStatus,
			orderRemark:record.data.orderRemark,
			orderAirRemark:record.data.orderAirRemark,
			orderPol:record.data.orderPol,
			orderPod:record.data.orderPod
		});
	}
//	openFullWindow('query_mailsend.do?'+Ext.urlEncode(params))
	openDeskWin('撰写邮件','query_mailsend.do?'+Ext.urlEncode(params))
}
