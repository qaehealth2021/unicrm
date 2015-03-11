/**
 * win桌面(构造任务栏和桌面图标)
 * @param {} app
 */
Ext.Desktop = function(app){
    this.taskbar = new Ext.ux.TaskBar(app);
    this.xTickSize = this.yTickSize = 1;
    var taskbar = this.taskbar;

    var logoEl = Ext.get('ux-logo');
    var desktopEl = Ext.get('x-desktop');
    var taskbarEl = Ext.get('ux-taskbar');
    var shortcuts = Ext.get('x-shortcuts');

    var windows = new Ext.WindowGroup();
    var activeWindow;

    function minimizeWin(win){
        win.minimized = true;
        win.hide();
    }

    function markActive(win){
        if(activeWindow && activeWindow != win){
            markInactive(activeWindow);
        }
        taskbar.setActiveButton(win.taskButton);
        activeWindow = win;
        Ext.fly(win.taskButton.el).addClass('active-win');
        win.minimized = false;
    }

    function markInactive(win){
        if(win == activeWindow){
            activeWindow = null;
            Ext.fly(win.taskButton.el).removeClass('active-win');
        }
    }

    function removeWin(win){
        taskbar.removeTaskButton(win.taskButton);
//        layout();
    }

    function layout(){
        desktopEl.setHeight(Ext.lib.Dom.getViewHeight()-taskbarEl.getHeight()-80);
    }
//    Ext.EventManager.onWindowResize(layout);

    this.layout = layout;

    this.createWindow = function(config, cls){
        var win = new (cls||Ext.Window)(
//        var win = new (cls||Ext.Panel)(
            Ext.applyIf(config||{}, {
                renderTo: desktopEl,
                manager: windows,
                minimizable: true,
                maximizable: true
            })
        );
        win.dd.xTickSize = this.xTickSize;
        win.dd.yTickSize = this.yTickSize;
        win.resizer.widthIncrement = this.xTickSize;
        win.resizer.heightIncrement = this.yTickSize;
        win.render(desktopEl);
        win.taskButton = taskbar.addTaskButton(win);

        win.cmenu = new Ext.menu.Menu({
            items: [

            ]
        });

        win.animateTarget = win.taskButton.el;

        win.on({
            'activate': {
                fn: markActive
            },
            'beforeshow': {
                fn: markActive
            },
            'deactivate': {
                fn: markInactive
            },
            'minimize': {
                fn: minimizeWin
            },
            'close': {
                fn: removeWin
            }
        });

//        layout();
        return win;
    };

    this.getManager = function(){
        return windows;
    };

    this.getWindow = function(id){
        return windows.get(id);
    }

    this.getWinWidth = function(){
        var width = Ext.lib.Dom.getViewWidth();
        return width < 200 ? 200 : width;
    }

    this.getWinHeight = function(){
        var height = (Ext.lib.Dom.getViewHeight()-taskbarEl.getHeight()-80);
        return height < 100 ? 100 : height;
    }

    this.getWinX = function(width){
        return (Ext.lib.Dom.getViewWidth() - width) / 2
    }

    this.getWinY = function(height){
        return (Ext.lib.Dom.getViewHeight()-taskbarEl.getHeight()-80- height) / 2;
    }

    this.setTickSize = function(xTickSize, yTickSize) {
        this.xTickSize = xTickSize;
        if (arguments.length == 1) {
            this.yTickSize = xTickSize;
        } else {
            this.yTickSize = yTickSize;
        }
        windows.each(function(win) {
            win.dd.xTickSize = this.xTickSize;
            win.dd.yTickSize = this.yTickSize;
            win.resizer.widthIncrement = this.xTickSize;
            win.resizer.heightIncrement = this.yTickSize;
        }, this);
    };

    this.cascade = function() {
        var x = 0, y = 0;
        windows.each(function(win) {
            if (win.isVisible() && !win.maximized) {
                win.setPosition(x, y);
                x += 20;
                y += 20;
            }
        }, this);
    };

    this.tile = function() {
		var form=this;
		var win = new QH.Window({
			title:'图标库',
			layout:'fit',
			width:700,
			height:500,
//			closeAction:'close',
			id:'iconWin',
			items:[{
				xtype:'iconpanel',
				noUse:false,
				desktop:true,
				mainPnl:form
			}]
		});
		win.show();
    };

    this.contextMenu = new Ext.menu.Menu({
        items: [{
            text: '更改桌面',
            handler: this.tile,
            scope: this
        }, {
            text: '窗口层叠',
            handler: this.cascade,
            scope: this
        }]
    });
    
    /**
     * 管理整个桌面的右键
     */
    desktopEl.on('contextmenu', function(e) {
        e.stopEvent();
//        this.contextMenu.showAt(e.getXY());
    }, this);
    
    taskbarEl.on('contextmenu', function(e) {
        e.stopEvent();
    }, this);
    
    logoEl.on('contextmenu', function(e) {
        e.stopEvent();
    }, this);

    layout();
};
