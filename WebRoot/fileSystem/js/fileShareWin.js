QH.fileSystem.FileShareWin = Ext.extend(QH.Window,{
	width:700,
	height:500,
	title:'共享文档给其他员工',
	layout:'border',
	ids:'',
	initComponent : function() {
		this.items=[{
			xtype:"choseemptree",
			ids:this.ids,
			region:'center'
		},{
			xtype:"alreadychoseemptree",
			ref:'alreadyTree',
			width:350,
			ids:this.ids,
			margins:'0 0 0 5',
			split:true,
			collapseMode:'mini',
			region:'east'
		}];
		QH.fileSystem.FileShareWin.superclass.initComponent.call(this);
	}
});
Ext.reg('filesharewin',QH.fileSystem.FileShareWin);