/**
 * @author zhao
 * @class QH.dept.Store
 * @extends QH.data.Store
 */
QH.dept.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
		{name:'id'}, // 
		{name:'companyId'}, // 公司
		{name:'deptName',type:'string'}, // 部门名称
		{name:'remark',type:'string'} // 备注
			],
			url : 'list_dept.do'
		});
		QH.dept.Store.superclass.constructor.call(this);
	}
});