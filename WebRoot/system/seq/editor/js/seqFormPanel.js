/**
 * 
 * @class QH.seq.FormPanel
 * @extends QH.form.FormPanel
 */
QH.seq.FormPanel = Ext.extend(QH.form.FormPanel,{

	initComponent:function(){
		var typeStore = new Ext.data.SimpleStore({
			fields : ["tp", "name"],
			data : SEQ_TYPE_DATA
		});
		var typeBox = new Ext.form.ComboBox({
			name : 'type',
			tabIndex : 21,
			fieldLabel : '单号类型',
			editable : false,
			emptyText : '请选择',
			store : typeStore,
			valueField : "tp",
			displayField : "name",
			mode : 'local',
			allowBlank : false,
			blankText : '请选择单号类型',
			validateOnBlur : true,
			triggerAction : 'all',
			anchor : "100%",
			hiddenName : 'type',
			selectOnFocus : true,
			ref:"../typeBox",
			listeners:{
				'select':function(combo,row,index){
					var store = QHERP_VIEWPORT.gridPanel.getStore();
					store.setBaseParam("belongType",row.get("tp"));
					store.reload();
				}
			}
		});
		// 归0方式
		var guiStore = new Ext.data.SimpleStore({
					fields : ["tp", "name"],
					data : ZERO_TYPE_DATA
				});
		var guiBox = new Ext.form.ComboBox({
					name : 'zeroType',
					tabIndex : 21,
					emptyText : '请选择',
					fieldLabel : '归零方式',
					editable : false,
					store : guiStore,
					value : 1,
					valueField : "tp",
					displayField : "name",
					mode : 'local',
					validateOnBlur : true,
					triggerAction : 'all',
					anchor : "100%",
					hiddenName : 'zeroType',
					selectOnFocus : true
				});
		this.items = [{
						xtype : "panel",
						layout : "form",
						labelWidth : 70,
						items : [typeBox, {
									xtype : "textfield",
									fieldLabel : "表达式",
									anchor : "100%",
									tabIndex : 3,
									id : "seqCfg",
									name : "seqCfg",
									allowBlank : false,
									maxLength : 200
								}, guiBox, {
									xtype : "numberfield",
									fieldLabel : "当前序列号",
									anchor : "100%",
									allowDecimals : false,
									allowNegative : false,
									nanText : '请输入有效的整数',
									tabIndex : 3,
									value : 0,
									id : "currentSeq",
									name : "currentSeq",
									maxLength : 200
								}
	
						]
					}, {
						xtype : 'hidden',
						name : 'id'
					},{
						xtype:'hidden',
						name:'name'
					},{
						xtype:"hidden",
						name:"hisDay",
						value:new Date(),
						ref:"hisDay"
					}];
			QH.seq.FormPanel.superclass.initComponent.call(this);
			this.on('afterloaddata',function(formpanel,obj){
				typeBox.setValue(obj.type);
				guiBox.setValue(obj.zeroType);
				formpanel.hisDay.setValue(obj.hisDay);
				var store = QHERP_VIEWPORT.gridPanel.getStore();
				store.setBaseParam("belongType",obj.type);
				store.reload();
			})
	},
	saveData:function(){
		var formPanel = this;
		var form = this.getForm();
		if (!form.isValid()){
			return;
		};
		var data = new CotSeq();
		var obj = DWRUtil.getValues(data);
		var date = new Date();
		//Ext.apply(obj, data);
		obj['hisDay'] = getDateTypeExt(obj['hisDay'],'Y-m-d');
		obj['name'] = formPanel.typeBox.getRawValue();
		QH_LOADMASK = new Ext.LoadMask(this.getEl(), {
					msg : '数据保存中'
				});
		QH_LOADMASK.show();
		
		var saveObj = this.saveObjIsArray ? [obj] : obj;
		baseSerivce.saveOrUpdateObjRId(saveObj, function(res) {
			QH_LOADMASK.hide();
			formPanel.fireEvent('aftersavedata', formPanel, res,obj);
			if (!formPanel.isSaveClose) {
				reflashParent(formPanel.gridId);
			} else {
				closeandreflashEC(true, formPanel.gridId, false);
			}
		});
	}
});
Ext.reg('seqformpanel',QH.seq.FormPanel);