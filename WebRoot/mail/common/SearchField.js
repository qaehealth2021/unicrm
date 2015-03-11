/**
 * 往来邮件附件查询控件
 * @class QH.ux.form.SearchTriggerField
 * @extends Ext.form.TriggerField
 */
QH.ux.form.SearchTriggerField = Ext.extend(Ext.form.TriggerField,{
	triggerClass:'x-form-clear-trigger',
	hideTrigger:true,
	enableKeyEvents:true,
	seachStore:'', // 要被查询Store
	searchName:'searchName',
	onTriggerClick:function(){
		this.setValue('');
		this.setHideTrigger(true);
		this.seachStore.setBaseParam(this.searchName,this.getValue());
		this.seachStore.load({
			params:{
				start:QH_PAGE_START,
				limit:10
			}
		});
	},
	listeners:{
		keyup:{
			fn:function(field,e){
				if(Ext.isEmpty(field.getValue())){
					field.setHideTrigger(true);
				}else{
					field.setHideTrigger(false);
				}
				this.seachStore.setBaseParam(this.searchName,this.getValue());
				this.seachStore.load({
					params:{
						start:QH_PAGE_START,
						limit:10
					}
				});
			},
			buffer:500
		}
	}
});

Ext.reg('searchTrigger',QH.ux.form.SearchTriggerField);