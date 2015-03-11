
/**
 * 添加编辑联系人菜单
 * @class QH.mail.PersonLabelMenu
 * @extends Ext.menu.Menu
 */
QH.mail.PersonMenu = Ext.extend(Ext.menu.Menu,{
	personView:'',
	person:'',
	contact:'',
	initComponent:function(){
		this.items = [
			{
			text:'添加为客户',
			ref:'addCustomer',
			scope:this,
			handler:function(){
				var url = "modify_customer.do?personName={0}&personEmail={1}";
				url = String.format(url,encodeURI(encodeURI(this.person.name)),this.person.emailUrl);
//				openFullWindow(url);
				openDeskWin('新增客户',url);
			}
		},
//		{
//			text:'添加为厂家',
//			ref:'addFactory',
//			scope:this,
//			handler:function(){
//				var url = "modify_factory.do?personName={0}&personEmail={1}";
//				url = String.format(url,encodeURI(encodeURI(this.person.name)),this.person.emailUrl);
//				openWindowBase(300,800,url);
//			}
//		},
		{
			text:'添加为客户联系人',
			ref:'addCustContact',
			scope:this,
			handler:function(){
				var url = "modify_customercontact.do?personName={0}&personEmail={1}&flag={2}";
				url = String.format(url,encodeURI(encodeURI(this.person.name)),this.person.emailUrl,MAIL_CONTACT_FLAG.CUSTOMER);
				openDeskWin("添加为客户联系人",url);
			}
		},
//		{
//			text:'添加为厂家联系人',
//			ref:'addFactoryContact',
//			scope:this,
//			handler:function(){
//				var url = "modify_customercontact.do?personName={0}&personEmail={1}&flag={2}";
//				url = String.format(url,encodeURI(encodeURI(this.person.name)),this.person.emailUrl,MAIL_CONTACT_FLAG.FACTORY);
//				openWindowBase(300,800,url);
//			}
//		},
		{
			text:'编辑客户',
			ref:'editCustomer',
			scope:this,
			handler:function(){
				var url = "modify_customer.do?id={0}";
				url = String.format(url,this.contact.customerId.id);
//				openFullWindow(url);
				openDeskWin('客户'+this.contact.customerId.customerShortName,url,CACHE_DEFAULT_CUSTOMER+this.contact.customerId.id);
			}
		},
//		{
//			text:'编辑厂家',
//			ref:'editFactory',
//			scope:this,
//			handler:function(){
//				var url = "modify_factory.do?id={0}";
//				url = String.format(url,this.contact.factoryId.id);
//				openFullWindow(url);
//			}
//		},
		{
			text:'编辑客户联系人',
			ref:'editCustContact',
			scope:this,
			handler:function(){
				var url = "modify_customercontact.do?id={0}&flag={1}";
				url = String.format(url,this.contact.id,MAIL_CONTACT_FLAG.CUSTOMER);
				openDeskWin("编辑客户联系人",url);
			}
		}
//		,{
//			text:'编辑厂家联系人',
//			ref:'editFactoryContact',
//			scope:this,
//			handler:function(){
//				var url = "modify_customercontact.do?id={0}&flag={1}";
//				url = String.format(url,this.contact.id,MAIL_CONTACT_FLAG.FACTORY);
//				openWindowBase(300,800,url);
//			}
//		}
		];
		QH.mail.PersonMenu.superclass.initComponent.call(this);
	},
	init : function(personView){
		this.personView = personView;
		personView.on('click',this.onPersonRightMenu,this);
		personView.on('contextmenu',this.onPersonRightMenu,this);
		personView.on('containercontextmenu',this.onViewRightMenu,this);
		personView.on('mouseenter',this.onMouseEnter,this);
	},
	onViewRightMenu : function(personView,e){
		e.preventDefault();
	},
	onMouseEnter : function(personView,index,node,e){
//		if(!this.tip){
//			this.tip = new Ext.ToolTip({
//				title:'name',
//				html:'E-mail',
//				listeners:{
//					'beforeshow':function(tip){
//						var record = this.personView.getStore().getAt(index);
//						tip.setTitle(this.showName(record.get('name'),record.get('emailUrl')));
////						tip.body.dom.innerHTML = record.get('emailUrl'); 
//					},
//					scope:this
//				}
//			});
//		}
//		this.tip.showAt(e.getXY());
	},
	showName : function(name,emailUrl){
		return name || emailUrl.substring(0,emailUrl.indexOf('@'));
	},
	onPersonRightMenu : function(personView,index,node,e){
		e.preventDefault();
		if(!personView.isSelected(index)){ // 如果不被选中，则选中
			personView.select(index);
		}
		this.menuControl();
	},
	menuControl:function(){
		var records = this.personView.getSelectedRecords();
		if(records.length == 0)
			return;
		this.person = records[0].data;
		var menu = this;
		menu.addCustomer.hide();
		//menu.addFactory.hide();
		menu.addCustContact.hide();
		//menu.addFactoryContact.hide();
		menu.editCustomer.hide();
		//menu.editFactory.hide();
		menu.editCustContact.hide();
		//menu.editFactoryContact.hide();
		mailReadService.findExistByEMail(this.person.emailUrl,function(contact){
			if(contact){
				menu.contact = contact;
				if(contact.customerId){
					menu.editCustomer.show();
					menu.editCustContact.show();
				}else if(contact.factoryId){
					//menu.editFactory.show();
					//menu.editFactoryContact.show();
				}
			}else{
				menu.addCustomer.show();
				//menu.addFactory.show();
				menu.addCustContact.show();
				//menu.addFactoryContact.show();
			}
			menu.showAt(Ext.EventObject.getXY());
		});
	}
	
});
Ext.reg('mailpersonmenu',QH.mail.PersonMenu);
