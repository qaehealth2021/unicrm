
$import('mail/info/js/mailPersonMenu.js');
$import('common/ext/ux/DataView-more.js');
$importCss('common/css/mailpersonview.css');

/**
 * 
 * @class QH.mail.PersonDataView
 * @extends Ext.DataView
 */
QH.mail.PersonDataView = Ext.extend(Ext.DataView,{
    multiSelect: true,
    cls:'person-view',
    overClass:'x-view-over',
    itemSelector:'div.thumb-wrap',
    emptyText: '没有联系人',
    autoScroll:true,
    boxMaxHeight:60,
    detailPanel:'',
    singleSelect:true,
	initComponent:function(){
		this.initStore();
		
		this.initTemplate();
		
		this.initPlugins();
		
		QH.mail.PersonDataView.superclass.initComponent.call(this);
		
		this.on('')
	},
	initPlugins : function(){
		this.plugins = [
			new QH.mail.PersonMenu()
		];
	},
	initTemplate : function(){
		this.tpl = new Ext.XTemplate(
		    '<tpl for=".">',
		        '<div class="thumb-wrap">',
		        '<div class="thumb">',
		        	'<span>{[this.showName(values.name,values.emailUrl)]}',
		        		'<span style="color:#888;">&lt;{emailUrl}&gt;',
		        		'<tpl if="xindex != xcount">;</tpl>',
		        		'</span>',
		        	'</span>',
		        '</div>',
		        '</div>',
		    '</tpl>',
		    {
		    	showName : function(name,emailUrl){
		    		return QH.mail.showPersonName(name,emailUrl);
		    	}
		    }
		);
	},
	initStore : function(){
		this.store = new Ext.data.ArrayStore({
			data : [],
		    fields: [
		        'name','emailUrl'
		    ]
		});
	},
	loadData : function(persons){
		var datas = [];
		Ext.each(persons,function(person){
			datas.push([
				person.name,
				person.emailUrl
			]);
		})
		this.store.loadData(datas);
		try{
			this.setHeight('auto');
			if(this.getHeight() > 0)
				this.setHeight(this.getHeight());
		}catch(e){
		}
		this.detailPanel.doLayout();
	}
});

Ext.reg('mailpersondataview',QH.mail.PersonDataView);