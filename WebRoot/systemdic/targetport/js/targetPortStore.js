/**
 * @author zhao
 * @class QH.targetPort.Store
 * @extends QH.data.Store
 */
QH.targetPort.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
				{name:'id',type:'int'}, // 
				{name:'targetPortName',type:'string'}, // 目的港中文名称
				{name:'targetPortNameEn',type:'string'}, // 目的港英文名称
				{name:'targetPortNation',type:'string'}, // 目的港国别
				{name:'shipingLine',type:'string'}, // 航线
				{name:'targetPortRemark',type:'string'} // 目的港备注
			],
			url : 'list_targetport.do'
		});
		QH.targetPort.Store.superclass.constructor.call(this);
	}
});