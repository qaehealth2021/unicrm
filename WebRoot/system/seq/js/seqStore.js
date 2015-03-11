/**
 * @author zhao
 * @class QH.seq.Store
 * @extends QH.data.Store
 */
QH.seq.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
		{name:'id'}, // 
		{name:'seqCfg',type:'string'}, // 单号配置
		{name:'currentSeq',type:'int'}, // 当前序列号
		{name:'zeroType',type:'int'}, // 归零方式
		{name:'hisDay',type:'jsondate'}, // 历史时间
		{name:'type',type:'string'}, // 单号类型
		{name:'name',type:'string'} // 单号说明
			],
			url : 'list_seq.do'
		});
		QH.seq.Store.superclass.constructor.call(this);
	}
});