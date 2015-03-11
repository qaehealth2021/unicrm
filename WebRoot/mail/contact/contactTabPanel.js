
$import('mail/contact/contactGrid.js');
$import('mail/contact/contactStore.js');
$import('mail/contact/contactToolbar.js');
/**
 * 
 * @class QH.mail.ContactTabPanel
 * @extends Ext.TabPanel
 */
QH.mail.ContactTabPanel = Ext.extend(Ext.TabPanel,{
	activeTab:0,
	width:150,
	personField:'',
	hiddenName:false,
	limit:'',
	initComponent:function(){
		this.items = [{
			xtype:'mailcontactgrid',
			title:'客户',
			ref:'customerGrid',
			flag:MAIL_CONTACT_FLAG.CUSTOMER
		},{
			title:'快速文本',
			xtype:'quicktxtpanel',
			ref:'quicktxtpanel'
		},{
			title:'信纸',
			xtype:'quicktemplategrid',
			ref:'templatepanel'
		},{
			xtype:'panel',
			title:'分组群发',
			ref:'groupcontact',
			layout:'border',
			items:[{
				xtype:'contactgroupgrid',
				ref:'../grouppanel',
				region:'north',
				height:300
			},{
				xtype:'contactgroupdetailgrid',
				region:'center',
				ref:'../detailpanel'
			}]
		},{
			title:'共享附件',
			xtype:'shareattachgrid',
			ref:'sharegrid'
		}]
		QH.mail.ContactTabPanel.superclass.initComponent.call(this);
	},
	loadSelectionMail:function(personField){
		this.personField = personField || this.personField;
		this.customerGrid.loadSelectionMail.defer(100,this.customerGrid);
	}
});

Ext.reg('mailcontacttab',QH.mail.ContactTabPanel);