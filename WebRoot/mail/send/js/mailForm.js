Ext.namespace('QH.mail.Form');
/**
 * 收件人字段
 * @class QH.mail.Form.PersonField
 * @extends Ext.FormPanel
 */
QH.mail.Form.PersonField = Ext.extend(Ext.Panel,{
	layout:'column',
	name:'',
	textLabel:'',
	showParting:false,//是否显示群发的复选框
	isChecked:false,//群发复选框是否勾选
	initComponent:function(){
		var personField = this;
		personField.items = [{ 
			columnWidth:0.98,
			layout:'form',
			items:[{
				xtype:'combo',
				fieldLabel:personField.textLabel,
				personField:this,
				ref:'../personText',
				anchor:'100%',
				mode: 'remote',
	            triggerAction: 'all',
	            queryParam:'contactUrl',
	            minChars:0,
				forceSelection:false,
				valueField:'id',
				regex:/^((([^;<>])*<[\w\-+.]+@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}>;)|([\w\-+.]+@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6};))*([^;])*$/,
				regexText:'邮箱地址输入有误',
				displayField:'contactEmail',
				store:new QH.mail.ContactStore({url:'listcontact_mailsend.do'}),
				pageSize:20,
				mailPersons:[],// 保存符合条件的MailPerson对象
				urlRange:new QH.mail.UrlRange(), // 整个邮件地址
				name:this.name,
				initList : function(){
			        if(!this.list){
			            var cls = 'x-combo-list',
			                listParent = Ext.getDom(this.getListParent() || Ext.getBody()),
			                zindex = parseInt(Ext.fly(listParent).getStyle('z-index'), 10);
			
			            if (!zindex) {
			                zindex = this.getParentZIndex();
			            }
			
			            this.list = new Ext.Layer({
			                parentEl: listParent,
			                shadow: this.shadow,
			                cls: [cls, this.listClass].join(' '),
			                constrain:false,
			                zindex: (zindex || 12000) + 5
			            });
			
			            var lw = this.listWidth || Math.max(this.wrap.getWidth(), this.minListWidth);
			            this.list.setSize(lw, 0);
			            this.list.swallowEvent('mousewheel');
			            this.assetHeight = 0;
			            if(this.syncFont !== false){
			                this.list.setStyle('font-size', this.el.getStyle('font-size'));
			            }
			            if(this.title){
			                this.header = this.list.createChild({cls:cls+'-hd', html: this.title});
			                this.assetHeight += this.header.getHeight();
			            }
			
			            this.innerList = this.list.createChild({cls:cls+'-inner'});
			            this.mon(this.innerList, 'mouseover', this.onViewOver, this);
			            this.mon(this.innerList, 'mousemove', this.onViewMove, this);
			            this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));
			
			            if(this.pageSize){
			                this.footer = this.list.createChild({cls:cls+'-ft'});
			                this.pageTb = new Ext.PagingToolbar({
			                    store: this.store,
			                    pageSize: this.pageSize,
			                    renderTo:this.footer
			                });
			                this.assetHeight += this.footer.getHeight();
			            }
			
			            if(!this.tpl){
			                this.tpl = '<tpl for=".">' +
			                		'<div class="'+cls+'-item">{contactPerson}&lt;{' + this.displayField + '}&gt;</div></tpl>';
			            }
			
			            this.view = new Ext.DataView({
			                applyTo: this.innerList,
			                tpl: this.tpl,
			                singleSelect: true,
			                selectedClass: this.selectedClass,
			                itemSelector: this.itemSelector || '.' + cls + '-item',
			                emptyText: this.listEmptyText,
			                deferEmptyText: false
			            });
			
			            this.mon(this.view, {
			                containerclick : this.onViewClick,
			                click : this.onViewClick,
			                scope :this
			            });
			
			            this.bindStore(this.store, true);
			
			            if(this.resizable){
			                this.resizer = new Ext.Resizable(this.list,  {
			                   pinned:true, handles:'se'
			                });
			                this.mon(this.resizer, 'resize', function(r, w, h){
			                    this.maxHeight = h-this.handleHeight-this.list.getFrameWidth('tb')-this.assetHeight;
			                    this.listWidth = w;
			                    this.innerList.setWidth(w - this.list.getFrameWidth('lr'));
			                    this.restrictHeight();
			                }, this);
			
			                this[this.pageSize?'footer':'innerList'].setStyle('margin-bottom', this.handleHeight+'px');
			            }
			        }
			    },
				enableKeyEvents:true,
				listeners:{
					'beforeselect' : {
						fn:function(combo,record,index){
							var value = combo.getRawValue();
							var last = value.lastIndexOf(';');
							combo.setValue(value.substring(0,last+1)
								+record.get('contactPerson')+'<'+record.get('contactEmail')+'>;'); // 设置值
							combo.oldValue = combo.getValue();
							this.fireEvent('fieldchange',combo,combo.oldValue);
							combo.collapse();
							QH_VIEWPORT.sendPanel.contactTab.loadSelectionMail();
							//绑定所选的联系人对应的客户,只绑定选择的第一条
							if($('custId').value == 'null'){
								$('custId').value = record.get('customerId').id;
								QH_VIEWPORT.sendPanel.sendBasePanel.customerId.bindValue($('custId').value);
							}
							return false;
						},
						scope:this
					},
					'focus':{
						fn:function(combox){
							
							QH_VIEWPORT.sendPanel.contactTab.loadSelectionMail(this);
							
							combox.el.dom.onclick = function(){
								var value = combox.el.dom.value; // 获得下拉框值
								var selectionStart = combox.el.dom.selectionStart; //获得光标位置
								var selectionEnd = combox.el.dom.selectionEnd; //获得光标位置
								if(selectionStart == selectionEnd){
									var start = value.lastIndexOf(';',selectionStart-1)+1;
									var last = value.indexOf(';',selectionStart)+1;
									if(last>0)
										combox.selectText(start,last);
								}
							}
						},
						scope:this
					},
					'keyup':{
						fn:function(field,e){
							var selectionStart = field.el.dom.selectionStart; //获得光标位置
							var value = field.getRawValue();
							var regExp= /^((([^;<>])*<[\w\-+.]+@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}>;)|([\w\-+.]+@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6};))*([^;])*$/;
//							Ext.example.msg(regExp.test(value),value,Ext.getBody(),0.3)
							var eKey = e.getKey();
							if(eKey == Ext.EventObject.LEFT || eKey == Ext.EventObject.RIGHT 
								|| eKey == Ext.EventObject.UP || eKey == Ext.EventObject.SHIFT
								|| eKey == Ext.EventObject.CTRL || e.ctrlKey && eKey == Ext.EventObject.A){
							}else if(regExp.test(value)){
								regExp = /[\w\-+.]+@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6};/;
								var regIndex = value.search(regExp);
								while(regIndex!=-1){
									value = value.substring(0,regIndex)
										+'<'+value.substring(regIndex,value.indexOf(';',regIndex))
										+'>;'+value.substring(value.indexOf(';',regIndex)+1);
									regIndex = value.search(regExp);
									selectionStart = selectionStart+2;
								}
								field.oldValue = value;
								field.setValue(value);
								//field.selectText(selectionStart,selectionStart);
								this.fireEvent('fieldchange',field,value);
							}else{
								field.setValue(field.oldValue);
								//field.selectText(selectionStart,selectionStart+field.oldValue.length-value.length);
								this.fireEvent('fieldchange',field,field.oldValue);
							}
							QH_VIEWPORT.sendPanel.contactTab.loadSelectionMail();
							
						},
						scope:this
					},
					'change':{
						fn:function(field,newValue,oldValue){
							this.fireEvent('fieldchange',field,newValue);
						},
						scope:this
					}
				}
			}]
		},{
		    width:22,
		    items:[{
		        xtype:'button',
		        iconCls:'mail_contact',
		        style:'width:17px;height:19px;border:0;background:transparent no-repeat 0 0;',
		        ref:'../personBtn',
		        handler:function(btn,e){
		        	if(!btn.personWin){
		        		btn.personWin = new Ext.Window({
			        		title:personField.textLabel,
			        		width:680,
			        		height:550,
			        		shadow:true,
			        		constrain:true,
			        		closeAction:'hide',
			        		layout:'fit',
			        		resizable:true,
			        		modal:true,
			        		items:[{
			        			xtype:'mailcontacttab',
			        			border:false,
			        			ref:'contactTab',
			        			personField:personField
			        		}],
			        		listeners:{
			        			'hide':function(win){
			        				win.contactTab.personField.personText.focus();
			        			}
			        		}
			        	});
		        	}else{
			        	var factoryGrid =btn.personWin.contactTab.factoryGrid;
			        	var customerGrid =btn.personWin.contactTab.customerGrid;
			        	if(!factoryGrid.isReload){
				        	factoryGrid.isReload = true;
				        	factoryGrid.getSelectionModel().clearSelections();
				        	factoryGrid.getStore().reload();
			        	}
			        	if(!customerGrid.isReload){
				        	customerGrid.isReload = true;
				        	customerGrid.getSelectionModel().clearSelections();
				        	customerGrid.getStore().reload();
			        	}
		        	}
		        	btn.personWin.show();
		        }
		    }] 
		},{
			width:40,
			items:[{
				xtype:'button',
				text:this.name == 'to'?'群发':'单发',
				ref:'../personBtn',
				hidden:!this.showParting,
				listeners:{
					'click':{
						fn:function(btn){
							this.fireEvent('checkedchange',this);
						}
					},
					scope:this
				}
			}]
		}];
		QH.mail.Form.PersonField.superclass.initComponent.call(this);
		/**
		 * 邮件地址改变
		 */
		this.addEvents('fieldchange');
		/**
		 * 勾选群发复选框时触发
		 */
		this.addEvents('checkedchange');
	}
});
Ext.reg('personfield',QH.mail.Form.PersonField);