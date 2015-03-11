/**
 * 在相同账号下移动邮件，审核与查询节点不参与
 * @param {} target
 * @param {} tree
 * @return {Boolean}
 */
QH.mail.TreeGridDataMoveFn = function(target) {
	var tData = target.attributes;
	if (tData.nodeType == MAIL_NODE_TYPE.P || tData.nodeType == MAIL_NODE_TYPE.Q)	// 不能移动到审核节点
		return false;
	var node = QH_VIEWPORT.getMainView().mailTree.getSelectionModel().getSelectedNode(); // 初选中的节点
	var sData = node.attributes;
	if(tData.accountCfgId.id == sData.accountCfgId.id)// 在同账号下移动
		return true;
	else
		return false;
}
/**
 * 在相同账号下移动节点，系统节点不能移动，审核节点不参与
 * @param {} target
 * @param {} tree
 * @return {Boolean}
 */
QH.mail.TreeNodeMailMoveFn = function(target) {
	var tData = target.attributes;
	if (tData.nodeType == MAIL_NODE_TYPE.P)	// 不能移动到审核节点
		return false;
	var node = QH_VIEWPORT.getMainView().mailTree.getSelectionModel().getSelectedNode(); // 初选中的节点
	var sData = node.attributes;
	if(sData.nodeTag && sData.nodeTag.indexOf('N') != -1)// 系统节点不能移动
		return false;
	
	if(tData.accountCfgId.id == sData.accountCfgId.id)// 在同账号下移动
		return true;
	else
		return false;
}
