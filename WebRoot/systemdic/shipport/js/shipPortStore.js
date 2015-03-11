/**
 * @author zhao
 * @class QH.shipPort.Store
 * @extends QH.data.Store
 */
QH.shipPort.Store = Ext.extend(QH.data.Store,{
	constructor : function(config){
		Ext.apply(this,config,{ 
			record :[
				{name:'id',type:'int'}, // 
				{name:'shipPortName',type:'string'}, // 起运港中文名称
				{name:'shipPortNameEn',type:'string'}, // 起运港英文名称
				{name:'shipPortRemark',type:'string'} // 起运港备注
			],
			url : 'list_shipport.do'
		});
		QH.shipPort.Store.superclass.constructor.call(this);
	}
});