$import('common/js/ux/report/printPanel.js');
$importKey(IMPORT_RPTFILE_COMBO);
/**
 * ireport和excel打印面板 azan
 * 
 * @class QH.ux.PrintPanel
 * @extends Ext.Panel
 */
QH.ux.win.PrintWin = Ext.extend(QH.Window, {
/**
	 * 报表类型
	 * @type String
	 */
	reportType : '',
	/**
	 * 需要进行报表处理的表格
	 * @type String
	 */
	grid:null,
	/**
	 * 需要查询的表
	 * @type String
	 */
	tableName:"",
	formPnlId:'',
	/**
	 * 审核通过的单显示打印按钮
	 * @type Number
	 */
	printFlag:1,
	/**
	 * 导出的报表文件名
	 * @type String
	 */
	exportFileName:"",
	/**
	 * 报名类型的ID，如标签报表类型是10，等等
	 * @type Number
	 */
	reportTypeId:0,
	/**
	 * 查询参数对象
	 * @type 
	 */
	queryParams:{},	
	/**
	 * 查询前缀，可能查询的对象中含有前缀，在后台查询的时候，需要把这些前缀去掉
	 * 如：fittings.fitNo 查询前缀就是fittings，即点的前面就是前缀
	 * @type String
	 */
	queryPrefix:"",
	
	formPnlId:'',//传递到打印面板
	/**
	 * 打印按钮 根据他来显示窗口位置
	 * @type String
	 */
	fromBtn:'',
	/**
	 * 是否需要对Id进行限制，一般单据报表的时候，需要限制，传递到后台，会有一个ID参数作为查询条件
	 * @type Boolean
	 */
	needQueryId:true,
	/**
	 * 在打印按钮上方还是下方显示
	 * @type String
	 */
	position:'bottom',
	title : "打印及导出",
	layout:'fit',
	width : 330,
	height : 220,
	modal:false,
	closeAction : 'hide',
	initComponent : function() {
		var win = this;
//		var flag=false;
//		var pwId = win.gridId;
//		if(win.formPnlId){
//			pwId = win.formPnlId;
//		}
//		if(!window.printWin){
//			flag=true;
//			window.printWin=[];
//		}else{
//			var k;
//			for (var i = 0; i < window.printWin.length; i++) {
//				var p = window.printWin[i];
//				if(p.id==pwId){
//					k=p.win;
//					break;
//				}
//			}
//			if(!k){
//				flag=true;
//			}else{
//				win=k;
//			}
//		}
		if(true){
			this.items=[{
				xtype:'printpanel',
				grid:win.grid,
				queryParams:win.queryParams,
				formPnlId:win.formPnlId,
				reportTypeId:win.reportTypeId,
				printFlag:win.printFlag,
				tableName:win.tableName,
				exportFileName:win.exportFileName,
				needQueryId:win.needQueryId,
				queryPrefix:win.queryPrefix
			}];
			QH.ux.win.PrintWin.superclass.initComponent.call(this);
			
//			var obj={};
//			obj.id=pwId;
//			obj.win=win;
//			window.printWin.push(obj);
		}
		win.showOrHide();
	},
	showOrHide:function(){
		var po;
		//如果是右键点击的打印
		if(this.fromBtn.parentMenu){
			po=this.fromBtn.parentMenu.getPosition();
		}else{
			po = this.fromBtn.getPosition();
		}
		var x =po[0]-this.width+50;
		var y =po[1]+25;
		if(this.position=='top'){
			y=po[1]-this.height;
		}
		this.setPosition(x, y);
		
		if (!this.isVisible()) {
			this.show();
		} else {
			this.hide();
		}
	}
});
