
/**
 * @author zhao
 * @class QH.moduleFun.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.moduleFun.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar,{
	initComponent:function(){
		this.items = []; 
		QH.moduleFun.GridToolbar.superclass.initComponent.call(this);
	}
});

Ext.reg('modulefuntoolbar',QH.moduleFun.GridToolbar);