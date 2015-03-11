/**
 * @author zhao
 * @class QH.rptFile.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.rptFile.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	initComponent:function(){
		var grid = this;
		this.editorDisable = true;
		this.store = new QH.rptFile.Store();
		this.columns = [{
			header:'ID',
			editor:{
				maxLength:10,
				maxLengthText:'长度最大不能超过{0}'
			},
			hidden:true,
			dataIndex:'id'
		},{
			header:'类别',
			editor:{
				maxLength:10,
				maxLengthText:'长度最大不能超过{0}'
			},
			dataIndex:'rptTypeId.rptName'
		},{
			header:'报表名称',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'长度最大不能超过{0}'
			},
			dataIndex:'rptName'
		},{
			header:'是否默认',
			editor:{
				xtype:'textfield',
				maxLength:1,
				maxLengthText:'长度最大不能超过{0}'
			},
			renderer:function(value){
				if(value == 'Y'){
					return "是";
				}else
					return "否";
			},
			dataIndex:'defaultFlag'
		},{
			header:'备注',
			editor:{
				xtype:'textfield',
				maxLength:500,
				maxLengthText:'长度最大不能超过{0}'
			},
			dataIndex:'remark'
		},{
			header:'操作',
			dataIndex:"rptfilePath",
			renderer:function(value){
				var re = /\\/g
				var url = './servlet/DownloadServlet?type=COMMON_FILE&filepath='+value.replace(re,"%2F");
//				var params = {
//					filepath:value.replace("\\","%2F")
//				}
//				
//				var url = Ext.urlEncode(params,"./servlet/DownloadServlet?type=COMMON_FILE");
				return '<a href="javascript:downRpt(\''+url+'\')">下载文件</a>';
			}
		}];
		
		this.tbar = {
			xtype:'rptfiletoolbar',
			grid:this
		}
		
		QH.rptFile.GridPanel.superclass.initComponent.call(this);
		this.on("rowdblclick",function(grid,rowIndex,e){
			this.updateData();
		},this);
	},
	updateData:function(){
		var grid = this;
		var record = grid.getSelectionModel().getSelected();
//		openFullWindow('modify_rptfile.do?gridId='+grid.getId()+'&id='+record.get('id'));
		openDeskWin('编辑报表','modify_rptfile.do?gridId='+grid.getId()+'&id='+record.get('id'),"report_"+record.get('id'));
	}
});
Ext.reg('rptfilegrid',QH.rptFile.GridPanel);
