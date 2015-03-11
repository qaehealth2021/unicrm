
/**
 * @author zhao
 * @Date Apr 1, 2011
 * @class QH.ux.tab.DynamicTabPanel
 * @extends Ext.TabPanel
 * @reg dynamictabpanel
 * @description: 
 * 	用于页面加载时，先不加载item项，以提高页面加载速度
 * 	若item中有jsPath属性，则在点击item项时，才加载所属JS并创建该项
 */
QH.ux.tab.DynamicTabPanel = Ext.extend(Ext.TabPanel,{
	/**
	 * @cfg {Object} defaultItemCfg
	 * 初始化加载项默认配置
	 */
	defaultItemCfg:{},
	enableTabScroll:true,
	initComponent:function(){
		var items = [],tabItem;
		Ext.each(this.items,function(item){
			if(item.jsPath){
				tabItem = {
					title:item.title,
					jsPath:item.jsPath,
					cfg:item
				}
				items.push(tabItem);
				delete item.jsPath;
			}else{
				items.push(item);
			}
		});
		this.items = items;
		QH.ux.tab.DynamicTabPanel.superclass.initComponent.call(this);
		
		this.addEvents(
			/**
			 * 
			 */
			'afterimport'
		);
		
		this.on('tabchange',function(tabPanel,item){
			tabPanel.initLoadTabItem(item)
		});
	},
	/**
	 * private
	 * 初始化加载Item项
	 * @param {} tab
	 */
	initLoadTabItem : function(item){
		// 已经加载过了
		if(!item.jsPath){
			if(item.tabChange){	// 如果存在该函数，则运行
				item.tabChange(this);
			}
			return ;
		}
		if(Ext.isArray(item.jsPath)){
			this.importDynamic(item,item.jsPath,0);
		}else{
			this.importDynamic(item,item.jsPath,'');
		}
	},
	// private
	importDynamic : function(item,jsPath,i){
		var tabPanel = this;
		$importDynamic(i!==''?jsPath[i]:jsPath,"SCRIPT_" + item.getId() + i,function(){
			if(i!=='' && i < jsPath.length - 1){
				tabPanel.importDynamic(item,jsPath,i+1);
			}else if(item.cfg){
				var indexOf = tabPanel.items.indexOf(item);
				Ext.applyIf(item.cfg,tabPanel.defaultItemCfg);
				tabPanel.insert(indexOf,item.cfg);
				tabPanel.setActiveTab(indexOf);
				tabPanel.remove(item,true);
				tabPanel.fireEvent('afterimport',tabPanel,tabPanel.activeTab);
				unmask();
			}
		});
	}
});

Ext.reg('dynamictabpanel',QH.ux.tab.DynamicTabPanel);
