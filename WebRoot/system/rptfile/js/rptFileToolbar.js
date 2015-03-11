/**
 * @author zhao
 * @class QH.rptFile.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.rptFile.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar,{
	objName:'CotRptFile',
	tbarModel:'all',
	listeners:{
		"beforeadddata":function(tbar){
//			openFullWindow("modify_rptfile.do?&gridId="+tbar.grid.getId());
			openDeskWin('新增报表',"modify_rptfile.do?&gridId="+tbar.grid.getId());
			return false;
		}
	},
	initComponent:function(){
		var toolbar = this;
		this.items = [{
  			xtype:'rpttypebasecombo',
			searchName:'rptFile.rptTypeId',
			isSearchField:true,
			emptyText:'报表类型',
			width:120,
			maxLength:200,
			maxLengthText:'长度最大不能超过{0}'
 		},{
			xtype:'searchcombo',
			searchName:'rptFile.rptName',
			store:this.grid.store,
			checkModified:true,
			emptyText:'报表名称'
		},"->",{
			text:"上传子报表",
			hidden:true,
			handler : toolbar.showUploadPanel,
			iconCls : "page_upload"
		}];
		QH.rptFile.GridToolbar.superclass.initComponent.call(this);
	},
	
	showUploadPanel:function(){
		var uploadForm = new UploadWin({
			uploadType:"file",
			validType:"jrxml,jasper",
			uploadUrl:"./servlet/UploadServlet",
			labelName:"子报表",
			params:{
				tbName:"CotRptFile",
				beanName:"BaseService",
				bGenDate:false,
				uploadPath:"reportfile"
			}
		})
			var win = new Ext.Window({
				width: 500,
				title:"上传",
				modal :true,
				id:"uploadWin",
				items:[uploadForm.form]
			})
		win.show();
	}
});
Ext.reg('rptfiletoolbar',QH.rptFile.GridToolbar);
