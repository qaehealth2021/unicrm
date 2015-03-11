Ext.namespace('Ext.ux.form');
/**
 * 限制日期起始与结束范围
 * 必填id,startDateField,endDateField
 * @class Ext.form.DateRangeField
 * @extends Ext.form.DateField
 */
Ext.ux.form.DateRangeField = Ext.extend(Ext.form.DateField,{
	width:120,
//	emptyText:'请选择时间',
	allowBlank:true,
	maxText:'起始时间必须在 {0} 之前',
	minText:'结束日期必须在 {0} 之后',
	blankText:'时间不能为空',
//	regex: /((^\d{4})-(\d{2})-(\d{2}$))|((^\d{4})年(\d{2})月(\d{2})日$)/,
//	regexText: '格式为(年-月-日)例:2009-02-17或2009年02月17日',
	vtype:'daterange'
});
Ext.reg('daterangefield',Ext.ux.form.DateRangeField);