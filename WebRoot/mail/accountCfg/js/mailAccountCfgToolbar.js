/**
 * 账号配置工具栏
 * @author zhao
 * @class QH.mailAccountCfg.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.mailAccountCfg.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar,{
	objName:'CotMailAccountCfg',
	tbarModel:'all',
	initComponent:function(){
		this.items = [{
 			xtype:'textfield',
			searchName:'mailAccountCfg.mailNickname',
			isSearchField:true,
			emptyText:'账号别名',
			width:90,
			maxLength:100,
			maxLengthText:'账号别名长度最大不能超过{0}'
 		},{
 			hidden:true,
 			xtype:'textfield',
			searchName:'mailAccountCfg.mailSendName',
			isSearchField:true,
			emptyText:'发件人名',
			width:90,
			maxLength:50,
			maxLengthText:'发件人名长度最大不能超过{0}'
 		},{
			xtype:'searchcombo',
			searchName:'mailAccountCfg.mailAccount',
			store:this.grid.store,
			checkModified:true,
			emptyText:'邮箱账号'
		}];
		QH.mailAccountCfg.GridToolbar.superclass.initComponent.call(this);
	}
});
Ext.reg('mailaccountcfgtoolbar',QH.mailAccountCfg.GridToolbar);
