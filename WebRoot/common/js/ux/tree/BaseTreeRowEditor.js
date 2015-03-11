/**
 * @author zhao
 * @class QH.ux.tree.BaseTreeGridRowEditor
 * @extends Ext.Panel
 * @ptype treegridroweditor
 */
QH.ux.tree.BaseTreeGridRowEditor = Ext.extend(Ext.Panel, {
    floating: true,
    shadow: false,
    layout: 'hbox',
    cls: 'x-small-editor',
    buttonAlign: 'center',
    baseCls: 'x-row-editor',
    elements: 'header,footer,body',
    frameWidth: 5,
    buttonPad: 3,
    clicksToEdit: 'auto',
    monitorValid: true,
    focusDelay: 250,
    errorSummary: true,

    saveText: 'Save',
    cancelText: 'Cancel',
    commitChangesText: 'You need to commit or cancel your changes',
    errorText: 'Errors',

    defaults: {
        normalWidth: true
    },

    initComponent: function(){
        QH.ux.tree.BaseTreeGridRowEditor.superclass.initComponent.call(this);
        this.addEvents(
            /**
             * @event beforeedit
             * Fired before the row editor is activated.
             * If the listener returns <tt>false</tt> the editor will not be activated.
             * @param {Ext.ux.grid.RowEditor} roweditor This object
             * @param {Number} rowIndex The rowIndex of the row just edited
             */
            'beforeedit',
            /**
             * @event canceledit
             * Fired when the editor is cancelled.
             * @param {Ext.ux.grid.RowEditor} roweditor This object
             * @param {Boolean} forced True if the cancel button is pressed, false is the editor was invalid.
             */
            'canceledit',
            /**
             * @event validateedit
             * Fired after a row is edited and passes validation.
             * If the listener returns <tt>false</tt> changes to the record will not be set.
             * @param {Ext.ux.grid.RowEditor} roweditor This object
             * @param {Object} changes Object with changes made to the record.
             * @param {Ext.data.Record} r The Record that was edited.
             * @param {Number} rowIndex The rowIndex of the row just edited
             */
            'validateedit',
            /**
             * @event afteredit
             * Fired after a row is edited and passes validation.  This event is fired
             * after the store's update event is fired with this edit.
             * @param {Ext.ux.grid.RowEditor} roweditor This object
             * @param {Object} changes Object with changes made to the record.
             * @param {Ext.data.Record} r The Record that was edited.
             * @param {Number} rowIndex The rowIndex of the row just edited
             */
            'afteredit'
        );
    },

    init: function(grid){
        this.grid = grid;
        this.ownerCt = grid;
        if(this.clicksToEdit === 2){
            grid.on('dblclick', this.onRowDblClick, this);
        }else{
            grid.on('click', this.onRowClick, this);
            if(Ext.isIE){
                grid.on('dblclick', this.onRowDblClick, this);
            }
        }
        // TODO:
        // stopEditing without saving when a record is removed from Store.
//        grid.getStore().on('remove', function() {
//            this.stopEditing(false);
//        },this);

//        grid.on({
//            scope: this,
//            keydown: this.onGridKey,
//            columnresize: this.verifyLayout,
//            columnmove: this.refreshFields,
//            reconfigure: this.refreshFields,
//            beforedestroy : this.beforedestroy,
//            destroy : this.destroy,
//            bodyscroll: {
//                buffer: 250,
//                fn: this.positionButtons
//            }
//        });
//        grid.getColumnModel().on('hiddenchange', this.verifyLayout, this, {delay:1});
//        grid.getView().on('refresh', this.stopEditing.createDelegate(this, []));
    },

    beforedestroy: function() {
        this.stopMonitoring();
        this.grid.getStore().un('remove', this.onStoreRemove, this);
        this.stopEditing(false);
        Ext.destroy(this.btns, this.tooltip);
    },

    refreshFields: function(){
        this.initFields();
        this.verifyLayout();
    },

    isDirty: function(){
        var dirty;
        this.items.each(function(f){
            if(String(this.values[f.id]) !== String(f.getValue())){
                dirty = true;
                return false;
            }
        }, this);
        return dirty;
    },
	getAbsPoint : function (e){   
	     var x = e.offsetLeft,y = e.offsetTop;   
	     while(e=e.offsetParent) 
	     { 
	        x += e.offsetLeft;   
	        y += e.offsetTop;
	     } 
	     return [x,y];
	},
    startEditing: function(node, e, doFocus){
        if(this.editing && this.isDirty()){
            this.showTooltip(this.commitChangesText);
            return;
        }
        if(this.fireEvent('beforeedit', this, node) !== false){
            this.editing = true;
//            var g = this.grid, view = g.getView(),
//                row = view.getRow(rowIndex),
//                record = g.store.getAt(rowIndex);
            var g = this.grid;

            this.node = node;
//            this.rowIndex = rowIndex;
            this.values = {};
            if(!this.rendered){
                this.render(node.getUI().getEl());
            }
//            var w = Ext.fly(row).getWidth();
            var w = g.getTotalColumnWidth();
            this.setSize(w);
            if(!this.initialized){
                this.initFields();
            }
            var cm = g.getVisibleColumns(), fields = this.items.items, f, val;
            for(var i = 0, len = cm.length; i < len; i++){
                val = this.preEditValue(node, cm[i].dataIndex);
                f = fields[i];
                f.setValue(val);
                this.values[f.id] = Ext.isEmpty(val) ? '' : val;
            }
            this.verifyLayout(true);
            
            // TODO:
            var showXY = e.getXY();
            var nodeEl = node.getUI().getEl();
            
            showXY[0] = this.grid.getTreeEl().getXY()[0];
            showXY = this.getAbsPoint(nodeEl);
            if(!this.isVisible()){
                this.setPagePosition(showXY);
            } else{
                this.el.setXY(showXY, {duration:0.15});
            }
            if(!this.isVisible()){
                this.show().doLayout();
            }
            if(doFocus !== false){
                this.doFocus.defer(this.focusDelay, this);
            }
        }
    },

    stopEditing : function(saveChanges){
        this.editing = false;
        if(!this.isVisible()){
            return;
        }
        if(saveChanges === false || !this.isValid()){
            this.hide();
            this.fireEvent('canceledit', this, saveChanges === false);
            return;
        }
        var changes = {},
            node = this.node,
            hasChange = false,
            cm = this.grid.getVisibleColumns(),
            fields = this.items.items;
            // TODO:
        for(var i = 0, len = cm.length; i < len; i++){
            var dindex = cm[i].dataIndex;
            if(!Ext.isEmpty(dindex)){
                var oldValue = node.ui.getColNodeValue(dindex),
                    value = this.postEditValue(fields[i].getValue(), oldValue, node, dindex);
                if(String(oldValue) !== String(value)){
                    changes[dindex] = value;
                    hasChange = true;
                }
            }
        }
        if(hasChange && this.fireEvent('validateedit', this, changes, node, this.rowIndex) !== false){
//            r.beginEdit();
//            Ext.iterate(changes, function(name, value){
//                r.set(name, value);
//            });
//            r.endEdit();
        	node.ui.updateRowData(changes);
            this.fireEvent('afteredit', this, changes, node, this.rowIndex);
        }
        this.hide();
    },
	getColumnNodeValue : function(index){
		var ui = this.node.ui;
		if(index == 0){
			return ui.textNode.innerHTML;
		}else if(index != -1){
			return ui.elNode.childNodes[index].firstChild.innerHTML;
		}
	},
	/**
	 * 获得列位置
	 * @param {} key
	 * @return {}
	 */
	getColumnIndex : function(key){
		var cm = this.grid.getVisibleColumns();
		for(var i = 0, len = cm.length; i < len; i++){
			if(cm[i].dataIndex == key){
				return i;	
			}
		}
		return -1;
	},
	/**
	 * 获得列
	 * @param {} index
	 * @return {}
	 */
	getColumn : function(index){
		 return this.grid.getVisibleColumns()[index];
	},
    verifyLayout: function(force){
        if(this.el && (this.isVisible() || force === true)){
//            var row = this.grid.getView().getRow(this.rowIndex);
//            this.setSize(Ext.fly(row).getWidth(), Ext.isIE ? Ext.fly(row).getHeight() + 9 : undefined);
        	this.setSize(this.grid.getTotalColumnWidth()+2,60);
            var cm = this.grid.getVisibleColumns(), fields = this.items.items;
            for(var i = 0, len = cm.length; i < len; i++){
//                if(!cm.isHidden(i)){
                    var adjust = 0;
                    if(i === (len - 1)){
                        adjust += 3; // outer padding
                    } else{
                        adjust += 1;
                    }
                    fields[i].show();
                    fields[i].setWidth(cm.width - adjust);
//                } else{
//                    fields[i].hide();
//                }
            }
            this.doLayout();
            this.positionButtons();
        }
    },

    slideHide : function(){
        this.hide();
    },

    initFields: function(){
        var cm = this.grid.getVisibleColumns(), pm = Ext.layout.ContainerLayout.prototype.parseMargins;
        this.removeAll(false);
        for(var i = 0, len = cm.length; i < len; i++){
            var c = cm[i],
                ed = c.editor;
            if(!ed){
                ed = c.displayEditor || new Ext.form.DisplayField();
            }
            if(i == 0){
                ed.margins = pm('0 1 2 1');
            } else if(i == len - 1){
                ed.margins = pm('0 0 2 1');
            } else{
                ed.margins = pm('0 1 2');
            }
            ed.setWidth(cm[i].width);
            ed.column = c;
            if(ed.ownerCt !== this){
                ed.on('focus', this.ensureVisible, this);
                ed.on('specialkey', this.onKey, this);
            }
            this.insert(i, ed);
        }
        this.initialized = true;
    },

    onKey: function(f, e){
        if(e.getKey() === e.ENTER){
            this.stopEditing(true);
            e.stopPropagation();
        }
    },

//    onGridKey: function(e){
//        if(e.getKey() === e.ENTER && !this.isVisible()){
//            var r = this.grid.getSelectionModel().getSelected();
//            if(r){
//                var index = this.grid.store.indexOf(r);
//                this.startEditing(index);
//                e.stopPropagation();
//            }
//        }
//    },

    ensureVisible: function(editor){
        if(this.isVisible()){
//             this.grid.getView().ensureVisible(this.rowIndex, this.grid.colModel.getIndexById(editor.column.id), true);
        }
    },

    onRowClick: function(node, e){
//        if(this.clicksToEdit == 'auto'){
//            var li = this.lastClickIndex;
//            this.lastClickIndex = rowIndex;
//            if(li != rowIndex && !this.isVisible()){
//                return;
//            }
//        }
//        this.startEditing(rowIndex, false);
//        this.doFocus.defer(this.focusDelay, this, [e.getPoint()]);
    },

    onRowDblClick: function(node, e){
        this.startEditing(node, e, false);
        this.doFocus.defer(this.focusDelay, this, [e]);
    },

    onRender: function(){
        Ext.ux.grid.RowEditor.superclass.onRender.apply(this, arguments);
        this.el.swallowEvent(['keydown', 'keyup', 'keypress']);
        this.btns = new Ext.Panel({
            baseCls: 'x-plain',
            cls: 'x-btns',
            elements:'body',
            layout: 'table',
            width: (this.minButtonWidth * 2) + (this.frameWidth * 2) + (this.buttonPad * 4), // width must be specified for IE
            items: [{
                ref: 'saveBtn',
                itemId: 'saveBtn',
                xtype: 'button',
                text: this.saveText,
                width: this.minButtonWidth,
                handler: this.stopEditing.createDelegate(this, [true])
            }, {
                xtype: 'button',
                text: this.cancelText,
                width: this.minButtonWidth,
                handler: this.stopEditing.createDelegate(this, [false])
            }]
        });
        this.btns.render(this.bwrap);
    },

    afterRender: function(){
        Ext.ux.grid.RowEditor.superclass.afterRender.apply(this, arguments);
        this.positionButtons();
        if(this.monitorValid){
            this.startMonitoring();
        }
    },

    onShow: function(){
        if(this.monitorValid){
            this.startMonitoring();
        }
        Ext.ux.grid.RowEditor.superclass.onShow.apply(this, arguments);
    },

    onHide: function(){
        Ext.ux.grid.RowEditor.superclass.onHide.apply(this, arguments);
        this.stopMonitoring();
//        this.grid.getView().focusRow(this.rowIndex);//TODO:
    },

    positionButtons: function(){
        if(this.btns){
        	Ext.tree.TreePanel.prototype.getTreeEl()
            var g = this.grid,
                h = this.el.dom.clientHeight,
                // TODO:
//                view = g.getView(),
//                scroll = view.scroller.dom.scrollLeft,
                scroll =10;
                bw = this.btns.getWidth(),
                width = Math.min(g.getWidth(), g.getTotalColumnWidth());

            this.btns.el.shift({left: (width/2)-(bw/2)+scroll, top: h - 2, stopFx: true, duration:0.2});
        }
    },

    // private
    preEditValue : function(node, field, index){
        var value = node.ui.getColNodeValue(field);
        return value;
//        return this.autoEncode && typeof value === 'string' ? Ext.util.Format.htmlDecode(value) : value;
    },

    // private
    postEditValue : function(value, originalValue, node, field){
        return this.autoEncode && typeof value == 'string' ? Ext.util.Format.htmlEncode(value) : value;
    },

    doFocus: function(e){
        if(this.isVisible()){
            var index = 0,
                cm = this.grid.getVisibleColumns(),
                c;
            if(e){
                index = this.getTargetColumnIndex(e);
            }
            for(var i = index||0, len = cm.length; i < len; i++){
                c = cm[i];
                if(!c.hidden && c.editor){
                    c.editor.focus();
                    break;
                }
            }
        }
    },

    getTargetColumnIndex: function(e){
        var grid = this.grid,
            x = e.xy[0],
            colNodes = this.node.ui.getColNodes();
            i = 0,
            match = false;
        for(var len = colNodes.length, n; n = colNodes[i]; i++){
        	var nodeXY = this.getAbsPoint(n);
            if(nodeXY[0] > x){
                match = i-1;
                break;
            }else{
            	match = i;	
            }
        }
        return match;
    },

    startMonitoring : function(){
        if(!this.bound && this.monitorValid){
            this.bound = true;
            Ext.TaskMgr.start({
                run : this.bindHandler,
                interval : this.monitorPoll || 200,
                scope: this
            });
        }
    },

    stopMonitoring : function(){
        this.bound = false;
        if(this.tooltip){
            this.tooltip.hide();
        }
    },

    isValid: function(){
        var valid = true;
        this.items.each(function(f){
            if(!f.isValid(true)){
                valid = false;
                return false;
            }
        });
        return valid;
    },

    // private
    bindHandler : function(){
        if(!this.bound){
            return false; // stops binding
        }
        var valid = this.isValid();
        if(!valid && this.errorSummary){
            this.showTooltip(this.getErrorText().join(''));
        }
        this.btns.saveBtn.setDisabled(!valid);
        this.fireEvent('validation', this, valid);
    },

    showTooltip: function(msg){
        var t = this.tooltip;
        if(!t){
            t = this.tooltip = new Ext.ToolTip({
                maxWidth: 600,
                cls: 'errorTip',
                width: 300,
                title: this.errorText,
                autoHide: false,
                anchor: 'left',
                anchorToTarget: true,
                mouseOffset: [40,0]
            });
        }
        var v = this.grid.getView(),
            top = parseInt(this.el.dom.style.top, 10),
            scroll = v.scroller.dom.scrollTop,
            h = this.el.getHeight();

        if(top + h >= scroll){
            t.initTarget(this.items.last().getEl());
            if(!t.rendered){
                t.show();
                t.hide();
            }
            t.body.update(msg);
            t.doAutoWidth(20);
            t.show();
        }else if(t.rendered){
            t.hide();
        }
    },

    getErrorText: function(){
        var data = ['<ul>'];
        this.items.each(function(f){
            if(!f.isValid(true)){
                data.push('<li>', f.getActiveError(), '</li>');
            }
        });
        data.push('</ul>');
        return data;
    }
});
Ext.preg('treegridroweditor', QH.ux.tree.BaseTreeGridRowEditor);
