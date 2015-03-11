/**
 * 工厂编辑表单
 * @class QH.bank.FormPanel
 * @extends QH.form.FormPanel
 */
QH.rptfile.FormPanel = Ext.extend(QH.form.FormPanel,{
	
	/*
	 * private 内部私有变量，不要修改
	 * 是否选择标识，如果通过空间选择了文件，就只改变了为true
	 */
	selectFlag:false,
	isAddFbar : false,
	frame : false,
	baseCls : 'ex-panel',
	padding:5,
	bodyStyle : {
				backgroundColor : '#DFE8F6'
			},
	identityId:getIdentityId(),
	initComponent:function(){
		var formPanel = this;
		this.fileUpload = true;
		this.layout = "form";
		this.labelWidth = 70;
		this.tbar = {
			items : ['->',{
						text : '保存',
						scale : 'large',
						iconCls : 'page_table_save',
						handler : formPanel.saveData.createDelegate(formPanel)
					}]
		};
		this.items=[{
  			xtype:'rpttypebasecombo',
			emptyText:'请选择',
			fieldLabel : "报表类型",
			maxLength:200,
			allowBlank : false,
			anchor : "95%",
			hiddenName:"rptTypeId.id",
			ref:"rpttype"
 		},{
			xtype : "findexistfield",
			fieldLabel : "报表名称",
			allowBlank : false,
			blankText : "请输入报表名称",
			name : "rptName",
			id : "rptName",
			domain:"CotRptFile",
			domainId:this.modId,
			params:{
				identityId:this.identityId
			},
			anchor : "95%"
		},{
			xtype : 'fileuploadfield',
			emptyText : '上传jrxml的报表文件',
			anchor : '95%',
			allowBlank : false,
			blankText : "请选择报表文件",
			fieldLabel : '上传文件',
			id : 'rptfilePath',
			name : 'rptfilePath',
			buttonText : '',
			buttonCfg : {
				iconCls : 'upload-icon'
			},
			listeners:{
				"fileselected":function(field,value){				
					formPanel.selectFlag = true;
				}
			}
		},{
			xtype : 'checkbox',
			id : 'flag',
			name : 'flag',
			fieldLabel : "",
			checked:true,
			boxLabel : "是否默认模板",
			listeners:{
				"check":function(checkbox,checked){
					if(checked){
						DWRUtil.setValue("defaultFlag","Y")
					}else{
						DWRUtil.setValue("defaultFlag","N")
					}
				}
			}
		},{
			xtype:"hidden",
			id:"defaultFlag",
			value:"Y"
		},{
			xtype : "textfield",
			fieldLabel : "报表说明",
			name : "remark",
			id : "remark",
			anchor : "95%"
		}];
		QH.rptfile.FormPanel.superclass.initComponent.call(this);
		this.on("afterloaddata",function(formPanel,obj){
			formPanel.rpttype.bindValue(obj.rptTypeId.id);
			if(obj.defaultFlag == 'N'){
				var checkbox = Ext.getCmp("flag");
				checkbox.setValue(false);
			}
//			formPanel.area.bindValue(obj.areaId);
//			factoryScaleField.setValue(obj.factoryScale);
//			cooperateLvField.setValue(obj.cooperateLv);
//			cotSeqService.getFactoryNo(obj,function(res){
//				alert(res);
//			});
		})
	},
	saveData:function(){
		DWREngine.setAsync(false);
		//新增的时候，直接提交
		var formPanel = this;
		var valueMap = {
			defaultFlag:"N"
		}
		var identityId = this.identityId
		var selectRptType = this.rpttype.getValue();
		var whereMap ={
			"identityId":identityId,
			"rptTypeId.id":selectRptType
		}
		var whereJson = Ext.encode(whereMap);
		if(DWRUtil.getValue('defaultFlag') == 'Y'){
			baseSerivce.updateTable("CotRptFile",valueMap,whereJson,function(res){})
		}
		if(this.modId == "" || this.modId == "null"){
			this.getForm().submit({
				url : './servlet/UploadServlet',
				method : 'post',
				params:{
					tbName : "CotRptFile",
					uploadPath:"reportfile",
					bGenDate:false,
					beanName:"BaseService"
				},
				waitTitle : '请等待',
				waitMsg : '上传报表中...',
				success : function(fp, o) {
					var filePath = Ext.util.Format.htmlDecode(o.result.filePath);
					DWRUtil.setValue("rptfilePath",filePath);
					//调用父对象的保存方法
					QH.rptfile.FormPanel.superclass.saveData.call(formPanel)
				},
				failure : function(fp, o) {
					alertMsg(o.result.msg);
				}
			})
		}else{
			//修改时，需要判断是否有新上传的文件
			if(this.selectFlag == true){
				//重新选择了问价，需要上传在提交
				this.getForm().submit({
					url : './servlet/UploadServlet',
					method : 'post',
					params:{
						tbName : "CotRptFile",
						category : "reportfile",
						bGenDate:false,
						uploadPath:"reportfile"
					},
					waitTitle : '请等待',
					waitMsg : '上传报表中...',
					success : function(fp, o) {
						var filePath = Ext.util.Format.htmlDecode(o.result.filePath);
						DWRUtil.setValue("rptfilePath",filePath);
						//调用父对象的保存方法
						QH.rptfile.FormPanel.superclass.saveData.call(formPanel);
					},
					failure : function(fp, o) {
						alertMsg(o.result.msg);
					}
				})
			}else{
				QH.rptfile.FormPanel.superclass.saveData.call(formPanel);
			}
		}
		DWREngine.setAsync(true);
	}
});
Ext.reg('rptfileform',QH.rptfile.FormPanel);