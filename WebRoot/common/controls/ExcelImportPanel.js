/**
 * Excel导入面板主键
 * 
 * @class QH.controls.ExcelImportPanel
 * @extends Ext.Panel
 */
QH.controls.ExcelImportPanel = Ext.extend(Ext.Panel, {

	/**
	 * 上传路径
	 * 
	 * @type String
	 */
	uploadFileFolder : "",
	/**
	 * 默认的上传路径
	 */
	defaultUrl : './servlet/UploadServlet',
	/**
	 * 所属表（暂时不用）
	 */
	tbName : "",
	/**
	 * 指定要读取的Excel配置文件，
	 * 
	 * @type String
	 */
	excelCfgFileType : "",
	/**
	 * 覆盖原有记录默认是否选择
	 */
	isConvert:false,
	/**
	 * 是否显示覆盖选项
	 * @type Boolean
	 */
	hiddenConvert:false,
	/**
	 * 是否添加
	 * @type Boolean
	 */
	isAdd:true,
	/**
	 * 是否显示不存在记录是添加选项
	 * @type Boolean
	 */
	hiddenAdd:true,
	initComponent : function() {
		var panel = this;
		//导入提示
		var tipPnl=new Ext.Panel({
			title : "友情提醒",
			region : 'north',
			height : 140,
			border : false,
			buttonAlign : "center",
			fbar : [{
						text : "下载模板",
						width:120,
						iconCls : "page_excel",
						handler : function() {
							if(panel.tbName=='CotCustomer'){
								var url='./servlet/DownServlet?header=customer';
								downRpt(url);
							}
							if(panel.tbName=='CotContact'){
								var url='./servlet/DownServlet?header=contact';
								downRpt(url);
							}
						}
					}, {
						text : "自定义导入模板",
						width:120,
						hidden:true,
						iconCls : "page_resort",
						handler : function() {
							var win=new QH.ux.win.ExcelDesignWin();
							win.show();
						}
					}],
			html : '<div style="margin-top: 10px;color:red">'
					+ '<li style="margin-left: 10px;"> 1、导入数据的第一列必须为编号或货号！ </li>'
					+ '<li style="margin-left: 10px;"> 2、导入的数据文件必须是Excel（.xls），大小不超过100M！</li>'
					+ '<li style="margin-left: 10px;"> 3、导入的文件名只能是数字和英文！</li>'
					+ '<li style="margin-left: 10px;"> 4、一次最多能导2000条数据，只取Excel文件的第一个工作表数据！</li>'
					+ '</ul>' + '</div>'
		});
		var uploadWin = new UploadWin({
					uploadType : "file",
					id:"uploadWin",
					validType : "xls",
					uploadUrl : panel.defaultUrl,
					labelName : "上传文件",
					params : {
						tbName : panel.tbName,
						beanName : "BaseService",
						bGenDate : false,
						uploadPath : panel.uploadFileFolder,
						doDbOp : false,
						excelCfgFileType : panel.excelCfgFileType,
						callBack:"importAction"
					},
					successFn : panel.doImportAction.createDelegate(panel)
				});
				
		var uploadForm = new Ext.Panel({
			region : 'center',
			labelWidth : 90,
			layout:'form',
			defaults : {
				allowBlank : false,
				labelAlign : "right",
				msgTarget : 'side'
			},
			style : 'padding-left: 10',
			items : [{
					xtype : 'checkbox',
					anchor : '80%',
					boxLabel : '覆盖原有记录',
					id : 'isCover',
					labelSeparator : " ",
					hideLabel : true,
					hidden:this.hiddenConvert,
					checked:this.isConvert
				},	{
					xtype:"checkbox",
					id:"isAdd",
					boxLabel:"不存在时新增",
					anchor:"100%",
					hidden:this.hiddenAdd,
					checked:this.isAdd
				}, uploadWin.form]
		});

				
		this.layout='border';
		this.items = [{
			xtype:'panel',
			layout:"border",
			width : 400,
			split:true,
			region : 'west',
			ctCls:'x-panel-mc',
			cls:'leftBorder rightBorder',
			items:[tipPnl,uploadForm]
		},{
			xtype:'panel',
			region : 'center',
			autoScroll:true,
			id:'result',
			border:false,
			ctCls:'x-panel-mc',
			cls:'leftBorder',
			title : '上传结果'
		}];
		QH.controls.ExcelImportPanel.superclass.initComponent.call(this);
		this.addEvents(
			/**
			 * 上传结束后触发的事件，参数ExcelImportPanel对象
			 */
			'afterimport'
		)
	},
	doImportAction : function(uploadPanel, filePath) {
		var panel = this;
		var excelCfgFileType =  this.excelCfgFileType;
		var isCover = $('isCover').checked;
		var isAddNew = $('isAdd').checked;
		var jsonParam = "{" +
				"isCover:" +isCover+
				","+
				"isAdd:" +isAddNew+
				"}"
		var result = Ext.getCmp("result").body;
		mask();
		importImageService.importExcelFile(jsonParam,filePath,excelCfgFileType,function(res){
			result.dom.innerHTML = "";
			Ext.each(res,function(msg){
				result.insertHtml("beforeEnd", msg+"</br></br>");
			})
			panel.fireEvent('afterimport',panel);
			unmask();
		})
	}
});

Ext.reg("importexcelpanel", QH.controls.ExcelImportPanel);