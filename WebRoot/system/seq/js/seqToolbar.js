/**
 * @author zhao
 * @class QH.seq.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.seq.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar,{
	objName:'CotSeq',
	tbarModel:'all',
	listeners:{
		'beforeadddata':function(toolbar,data){
			openFullWindow("modify_seq.do");
			return false;
		}
	},
	initComponent:function(){
		this.items = [{
 			xtype:'combo',
			searchName:'seq.type',
			isSearchField:true,
			emptyText:'单号类型',
			mode : 'local',
			editable : false,
			store : new Ext.data.SimpleStore({
				fields : ["tp", "name"],
				data : SEQ_TYPE_DATA
			}),
			valueField : "tp",
			displayField : "name",
			mode : 'local',
			triggerAction : 'all',
			anchor : "100%",
			selectOnFocus : true,
			width:90,
			maxLength:30,
			maxLengthText:'单号类型长度最大不能超过{0}'
 		},{
			xtype:'searchcombo',
			searchName:'seq.seqCfg',
			store:this.grid.store,
			checkModified:true,
			emptyText:'单号配置'
		}];
		QH.seq.GridToolbar.superclass.initComponent.call(this);
	}
});
Ext.reg('seqtoolbar',QH.seq.GridToolbar);
