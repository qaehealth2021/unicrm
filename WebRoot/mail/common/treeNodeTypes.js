//节点类型
//A：账号节点
//B：普通节点
//R：收件箱
//S：已发送
//C：草稿箱
//D：废件箱
//P：待审核
/**
 * 账号节点
 * @param {} config
 * @return {}
 */
Ext.tree.TreePanel.nodeTypes.A = function(config){
	if(config.accountCfgId)
		config.nodeName = config.accountCfgId.empId.empsId + "("+(
			config.accountCfgId.mailNickname || config.accountCfgId.mailAccount
		)+")";
	return Ext.tree.TreePanel.nodeTypes.mailNode(config);
}
/**
 * 普通节点
 * @param {} config
 * @return {}
 */
Ext.tree.TreePanel.nodeTypes.B = function(config){
	return Ext.tree.TreePanel.nodeTypes.mailNode(config,{
		iconCls:'mail_node_b'
	});
}
/**
 * 收件箱
 * @param {} config
 * @return {}
 */
Ext.tree.TreePanel.nodeTypes.R = function(config){
	return Ext.tree.TreePanel.nodeTypes.mailNode(config,{
		name:'收件箱',
		iconCls:'mail_node_r'
	});
}
/**
 * 已发送
 * @param {} config
 * @return {}
 */
Ext.tree.TreePanel.nodeTypes.S = function(config){
	return Ext.tree.TreePanel.nodeTypes.mailNode(config,{
		name:'已发送',
		iconCls:'mail_node_s'
	});
}
/**
 * 草稿箱
 * @param {} config
 * @return {}
 */
Ext.tree.TreePanel.nodeTypes.C = function(config){
	return Ext.tree.TreePanel.nodeTypes.mailNode(config,{
		name:'草稿箱',
		iconCls:'mail_node_c'
	});
}
/**
 * 废件箱
 * @param {} config
 * @return {}
 */
Ext.tree.TreePanel.nodeTypes.D = function(config){
	return Ext.tree.TreePanel.nodeTypes.mailNode(config,{
		name:'废件箱',
		iconCls:'mail_node_d'
	});
}
/**
 * 待审核
 * @param {} config
 * @return {}
 */
Ext.tree.TreePanel.nodeTypes.P = function(config){
	return Ext.tree.TreePanel.nodeTypes.mailNode(config,{
		name:'待发送',
		iconCls:'mail_node_p'
	});
}
/**
 * 查询箱
 * @param {} config
 * @return {}
 */
Ext.tree.TreePanel.nodeTypes.Q = function(config){
	return Ext.tree.TreePanel.nodeTypes.mailNode(config,{
		iconCls:'mail_node_q'
	});
}
/**
 * 根据配置，设置节点所要显示的名字
 * @param {} config
 * @param {} typeConfig
 * @return {}
 */
Ext.tree.TreePanel.nodeTypes.mailNode = function(config,typeConfig){
	Ext.apply(config,{
		text:config.nodeTag == 'N' && typeConfig? (typeConfig.name || config.nodeName): config.nodeName
	},typeConfig);
	return new Ext.tree.TreePanel.nodeTypes[Ext.isEmpty(config.children)?'node':'async'](config);
}