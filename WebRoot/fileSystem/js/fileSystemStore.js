
/**
 * 
 * @class QH.fileSystem.Store
 * @extends QH.data.Store
 */
QH.fileSystem.Store = Ext.extend(QH.data.Store,{
	autoLoad:false,
	constructor : function(config){
		Ext.apply(this,config,{
			record : [
				{name:'id',type:'int'}, // 
				{name:'fileName',type:'string'}, // 文件名称
				{name:'filePath',type:'string'}, // 文件存放路径
				{name:'fileDesc',type:'string'}, // 文件描述
				{name:'addTime',type:'jsondate'}, // 添加时间
				{name:'fileExtension',type:'string'}, // 文件或节点标识
				{name:'updateEmpsId'}, // 
				{name:'moveSourceNode',type:'string'}, // 移动源,标识共享文件的源节点
				{name:'fileSize',type:'int'}, // 
				{name:'fileTreeId',type:'int'}, // 
				{name:'fileFlag',type:'string'} // MS:我的共享，PS:公共共享，MU:个人文档
			],
			url : 'list_filesystem.do'
		});
		QH.fileSystem.Store.superclass.constructor.call(this);
	}
});
