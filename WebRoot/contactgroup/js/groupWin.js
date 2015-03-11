QH.contactGroup.GroupWin = Ext.extend(Ext.Window,{
	grid:null,
	contactGroup:null,
	initComponent:function(){
		var _self = this;
		this.title = '分组明细';
		this.closeAction = 'close';
		this.items = [{
			xtype:'form',
			frame:true,
			labelWidth:60,
			width:250,
			buttonAlign:'center',
			ref:'groupdetailform',
			listeners:{
				'afterrender':{
					fn:function(){
						if(_self.contactGroup){
							_self.groupdetailform.getForm().setValues(_self.contactGroup)
						}
					},
					scope:_self
				}			
			},
			fbar:[{
				text:'保存',
				handler:_self.doConatactGroup.createDelegate(_self,[])
			}],
			items:[{
				xtype:'textfield',
				fieldLabel:'组名',
				allowBlank:false,
				name:'groupName',
				ref:'groupName',
				width:180
			},{
				xtype:'hidden',
				name:'id'
			},{
				xtype:'hidden',
				name:'empsId'
			}]
		}]
		QH.contactGroup.GroupWin.superclass.initComponent.call(this);
	},
	doConatactGroup:function(){
		var form = this.groupdetailform.getForm().getValues();
		if(!this.groupdetailform.getForm().isValid()) return;
		var gridPanel = this.grid;
		var group = new CotContactGroup();
		if(this.contactGroup){
			group = this.contactGroup;
			group.groupName = form.groupName;
		}else{
			group.empsId = GET_SESSION_EMPS_ID;
			group.groupName = form.groupName;
		}
		cotContactService.addToContactGroup(group,function(res){
			//刷新表格
			gridPanel.getStore().reload();
			
		});
		this.close();
	}
})