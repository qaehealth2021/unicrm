
Ext.util.JSON.encodeDate = function(o){
	var pad = function(n) {
            return n < 10 ? "0" + n : n;
        }
	return '"' + o.getFullYear() + "-" +
                pad(o.getMonth() + 1) + "-" +
                pad(o.getDate()) + " " +
                pad(o.getHours()) + ":" +
                pad(o.getMinutes()) + ":" +
                pad(o.getSeconds()) + '"';
}
// EXTJS BUG
Ext.data.Record.prototype.set = function(name, value, dirty){
    var encode = Ext.isPrimitive(value) ? String : Ext.encode;
    if(encode(this.data[name]) == encode(value)) {
        return;
    }
    if(dirty  === false){	// 不存入脏数据
    	this.data[name] = value;
    	this.store.fireEvent('update', this.store, this, Ext.data.Record.COMMIT);
    	return;
    }
    if(this.modified&&this.modified[name]==value){
		this.modified.length--;
		this.data[name] = value;
		delete this.modified[name];
		if(this.modified.length==0){
			this.dirty=false;
		}
		this.afterReject();
	}
	else{
		if(!this.modified){
			this.modified = {length:0};
		}
		this.modified.length++;
	    this.dirty = true;
	     if(this.modified[name] === undefined){
			this.modified[name] = this.data[name];
	     }
		this.data[name] = value;
		if(!this.editing){
	        this.afterEdit();
	    }
	}
}
/**
 * 修改默认传向后台参数名
 * 可传入struts2中pageData参数
 * @type 
 */
Ext.data.Store.prototype.defaultParamNames = {
    start : QH_PAGE_START_NAME,
    limit : QH_PAGE_LIMIT_NAME,
    sort : QH_PAGE_SORT_NAME,
    dir : QH_PAGE_DIR_NAME
}
Ext.apply(Ext.util.Format,{
	/**
	 * 带颜色状态
	 * @return {}
	 */
	statusRenderer : function(status){
		var sObj = {},s;
		for(var i=0; i<status.length; i++){
			s = status[i];
			sObj[s[0]] = [s[1],s[2]];
		}
		var obj;
		return function(v){
			obj = sObj[v];
			if(obj)
		 		return "<font color='"+obj[1]+"'>"+obj[0]+"</font>";
		}
	},
	/**
	 * 验证状态
	 * @return {}
	 */
	checkRenderer : function(){
		return this.statusRenderer(CHECK_STATUS);
	},
	/**
	 * 是否状态
	 * @param {} yesNoStatus
	 * @return {}
	 */
	yesNoRenderer : function(yesNoStatus){
		var ynObj = {},yn;
		yesNoStatus = yesNoStatus || YES_NO_STATUS;
		for(var i=0; i<yesNoStatus.length; i++){
			yn = yesNoStatus[i];
			ynObj[yn[0]] = yn[1];
		}
		return function(v){
			return ynObj[v];
		}
	},
	/**
	 * 普通KEY VALUE
	 * @param {} keyValues
	 * @return {}
	 */
	keyValueRenderer:function(keyValues){
		var kvObj = {},kv;
		for(var i=0; i<keyValues.length; i++){
			kv = keyValues[i];
			kvObj[kv[0]] = kv[1];
		}
		return function(v){
			return kvObj[v];
		}
	}
})
Ext.apply(Ext.data.Types,{
	INT: {
        convert: function(v){
            return v !== undefined && v !== null && v !== '' ?
                parseInt(String(v).replace(Ext.data.Types.stripRe, ''), 10) : '';
        },
        sortType: Ext.data.SortTypes.none,
        type: 'int'
    },
	/**
	 * 将时间为JSON类型的对象转为Date
	 * 对象属性为year,month,day,hours,minutes,seconds,milliseconds
	 * @type 
	 */
	JSONDATE : {
	    convert: function(v){
	        if(!v){
	            return null;
	        }
	        if(Ext.isDate(v)){
	            return v;
	        }
	        if(v.time != null){
	        	return new Date(v.time);
	        }
	        return new Date(v.year,v.month,v.day,v.hours,v.minutes,v.seconds,v.milliseconds);
	    },
	    sortType: Ext.data.SortTypes.asDate,
	    type: 'jsondate'
	}
});
Ext.grid.CheckboxSelectionModel.prototype.onMouseDown = function(e,t){
	if(e.button === 0 && t.className == 'x-grid3-row-checker'){ // Only fire if left-click
        e.stopEvent();
        var row = e.getTarget('.x-grid3-row');
        if(row){
            var index = row.rowIndex;
            if(this.isSelected(index)){
                this.deselectRow(index);
            }else{
                this.selectRow(index, true);
                this.grid.getView().focusRow(index);
            }
        }
    }	
}
/**
 * 因为ext grid的列渲染后会把含有连续空格的内容变成只有一个空格,需要格式化下,把空格变成&nbsp;并且不能影响一些html标签
 * 把<div id="aaa" style="color:red">AAA   BBB</div><a id="sss" href="www.sina.com.cn"> ggg  ss</a>替换成
 * <div id="aaa" style="color:red">AAA&nbsp;&nbsp;&nbsp;BBB</div><a id="sss" href="www.sina.com.cn">&nbsp;ggg&nbsp;&nbsp;ss</a>
 * @param {} str
 * @return {}
 */
function formatStr(str) {
	if(str){
		var reg = /(<[^>]+>)?[^<]+/gi;
		var fk;
		return str.replace(reg,function(res){
			fk = res.indexOf('>');
			if(fk == -1)
				return res.replace(/\s/g,'&nbsp;');
			else
				return res.substring(0,fk + 1)
					+res.substring(fk + 1).replace(/\s/g,'&nbsp;');
		});
	}
	return '';
}
Ext.grid.GridView.prototype.doRender = function(columns, records, store, startRow, colCount, stripe) {
    var templates    = this.templates,
        cellTemplate = templates.cell,
        rowTemplate  = templates.row,
        last         = colCount - 1;

    var tstyle = 'width:' + this.getTotalWidth() + ';';

    // buffers
    var rowBuffer = [],
        colBuffer = [],
        rowParams = {tstyle: tstyle},
        meta      = {},
        data,
        column,
        record;

    //build up each row's HTML
    for (var j = 0, len = records.length; j < len; j++) {
        record    = records[j];
        colBuffer = [];

        var rowIndex = j + startRow;

        //build up each column's HTML
        for (var i = 0; i < colCount; i++) {
            column = columns[i];

            meta.id    = column.id;
            meta.css   = i === 0 ? 'x-grid3-cell-first ' : (i == last ? 'x-grid3-cell-last ' : '');
            meta.attr  = meta.cellAttr = '';
            meta.style = column.style;
            //----
            data = getObjValue(record.data,column.renderName || column.name);
            //----
            meta.value = column.renderer.call(column.scope, data, meta, record, rowIndex, i, store);

            if (Ext.isEmpty(meta.value)) {
                meta.value = '&#160;';
            }

            if (this.markDirty && record.dirty && Ext.isDefined(record.modified[column.name])) {
                meta.css += ' x-grid3-dirty-cell';
            }
            if (isNaN(meta.value) && meta.value.indexOf(' ') > -1)
            	meta.value=formatStr(meta.value);
            colBuffer[colBuffer.length] = cellTemplate.apply(meta);
        }

        //set up row striping and row dirtiness CSS classes
        var alt = [];

        if (stripe && ((rowIndex + 1) % 2 === 0)) {
            alt[0] = 'x-grid3-row-alt';
        }

        if (record.dirty) {
            alt[1] = ' x-grid3-dirty-row';
        }

        rowParams.cols = colCount;

        if (this.getRowClass) {
            alt[2] = this.getRowClass(record, rowIndex, rowParams, store);
        }

        rowParams.alt   = alt.join(' ');
        rowParams.cells = colBuffer.join('');

        rowBuffer[rowBuffer.length] = rowTemplate.apply(rowParams);
    }

    return rowBuffer.join('');
}

Ext.grid.GridView.prototype.getColumnData = function(){
    // build a map for all the columns
    var cs       = [],
        cm       = this.cm,
        colCount = cm.getColumnCount();

    for (var i = 0; i < colCount; i++) {
        var name = cm.getDataIndex(i);

        cs[i] = {
            name    : (!Ext.isDefined(name) ? this.ds.fields.get(i).name : name),
            renderName : cm.config[i].renderIndex,
            renderer: cm.getRenderer(i),
            scope   : cm.getRendererScope(i),
            id      : cm.getColumnId(i),
            style   : this.getColumnStyle(i)
        };
    }

    return cs;
}
Ext.form.BasicForm.prototype.getFieldValues = function(dirtyOnly){
    var o = {},
        n,
        key,
        val;
    this.items.each(function(f) {
        if (dirtyOnly !== true || f.isDirty()) {
            n = f.getName();
            key = o[n];
            val = f.getValue();

            if(Ext.isDefined(key)){
                if(Ext.isArray(key)){
                    o[n].push(val);
                }else{
                    o[n] = [key, val];
                }
            }else{
            	setObjValue(o,n,val);
            }
        }
    });
    return o;
}
Ext.form.BasicForm.prototype.setValues = function(values,objName){
	if(Ext.isArray(values)){ // array of objects
        for(var i = 0, len = values.length; i < len; i++){
            var v = values[i];
            var f = this.findField(v.id);
            if(f){
                f.setValue(v.value);
                if(this.trackResetOnLoad){
                    f.originalValue = f.getValue();
                }
            }
        }
    }else{ // object hash
        var field, id, value;
        for(id in values){
        	value = values[id];
            if(!Ext.isFunction(value)){
            	if(Ext.isObject(value)){
            		this.setValues(value,objName ? (objName+"."+id) : id);
            	}else if(field = this.findField(objName ? (objName+"."+id) : id)){
	                field.setValue(values[id]);
	                if(this.trackResetOnLoad){
	                    field.originalValue = field.getValue();
	                }
            	}
            }
        }
    }
    return this;
}

Ext.override(Ext.tree.TreeLoader,{
	dataIsList:false, // 数据类型是否为LIST，如果是则转为tree结构
	listId:'id',		 // 自身ID属性名
	listParentId:'parentId', // 父节点ID属性名
	listTopId:0,	// 默认顶点ID 为0
	treeDataObj:'', // 树数据对象
	/**
	 * 将list结构解析成树结构
	 * @param {} list
	 * @return {}
	 */
	anysListToTree : function(list){
		// 缓存节点，用ID，来记录已出现过的数据
		var map = {};
		// 用于存放顶点节点
		var data = [];
		
		var listId = this.listId, listParentId = this.listParentId,listTopId = this.listTopId;
		var id,parentId; // 自身ID，父节点ID
		var mailTree,i;
		for(i = 0; i < list.length; i++){
			
			
			mailTree = list[i];
			id = mailTree[listId];
			parentId = mailTree[listParentId];
			if(id == 11 || parentId == 11){
				var aa=1;
				var bb =aa;
			}
			if(parentId == listTopId)// 已知的顶点ID，当前顶点为0或null，将属于顶点节点放到data中
				data.push(mailTree);
			if(map[id]){// 之前已存代替的，将子节点复制过来
				mailTree.children = map[id].children;
			}
			// 将当前数据记录在缓存中
			map[id] = mailTree;
			
			if(!map[parentId]){// map中不存在父节点，先new一个代替
				map[parentId] = {children:[]};
			}else if(!map[parentId].children){
				map[parentId].children = [];
			}
			// 将子节点放到父节点中
			map[parentId].children.push(mailTree);
		}
		return data;
	},
	processResponse : function(response, node, callback, scope){
        var json = response.responseText;
        try{
            var o = response.responseData || Ext.decode(json);
            if(this.dataIsList && o){
	            o = this.anysListToTree(o);
            }
            node.beginUpdate();
            for(var i = 0, len = o.length; i < len; i++){
                var n = this.createNode(o[i]);
                if(n){
                    node.appendChild(n);
                }
            }
            node.endUpdate();
            this.treeDataObj = o;
            this.runCallback(callback, scope || node, [node]);
       	}catch(e){
            this.handleFailure(response);
        }
    }
});
/**
 * 获得grid选中的record ID集合
 */
Ext.grid.GridPanel.prototype.getSelectionIds = function(){
	var records = this.getSelectionModel().getSelections();
	var ids = [];
	Ext.each(records,function(record){
		ids.push(record.id);
	});
	return ids;
}

Ext.Component.prototype.onShow = function(){
	var el = this.getVisibilityEl();
	el.removeClass('x-hide-' + this.hideMode);
	if(el.dom)
		el.dom.style.display = 'block';
}

Ext.override(Ext.grid.ColumnModel,{
	setColumnWidth : function(col, width, suppressEvent){
		if(this.config[col].minWidth)
			width = Math.max(this.config[col].minWidth,width);
        this.config[col].width = width;
        this.totalWidth = null;
        if(!suppressEvent){
             this.fireEvent("widthchange", this, col, width);
        }
    } 
});

 Ext.override(Ext.layout.BorderLayout.Region,{
    getCollapsedEl:function(){
        if(!this.collapsedEl){
            if(!this.toolTemplate){
                var tt = new Ext.Template(
                     '<div class="x-tool x-tool-{id}">&#160;</div>'
                );
                tt.disableFormats = true;
                tt.compile();
                Ext.layout.BorderLayout.Region.prototype.toolTemplate = tt;
            }
            this.collapsedEl = this.targetEl.createChild({
                cls: "x-layout-collapsed x-layout-collapsedText x-layout-collapsed-"+this.position,
                id: this.panel.id + '-xcollapsed'
            });
            this.collapsedEl.enableDisplayMode('block');

            if(this.collapseMode == 'mini'){
                this.collapsedEl.addClass('x-layout-cmini-'+this.position);
                this.miniCollapsedEl = this.collapsedEl.createChild({
                    cls: "x-layout-mini x-layout-mini-"+this.position, html: "&#160;"
                });
                this.miniCollapsedEl.addClassOnOver('x-layout-mini-over');
                this.collapsedEl.addClassOnOver("x-layout-collapsed-over");
                this.collapsedEl.on('click', this.onExpandClick, this, {stopEvent:true});
            }else {
                var t = this.toolTemplate.append(
                        this.collapsedEl.dom,
                        {id:'expand-'+this.position}, true);
                 
                 this.panel.collapsedText=this.panel.collapsedText||this.panel.title||"";
                 var ct=(this.position=="west"||this.position=="east")?new Ext.Template("<table valign='middle'   width='100%' height='100%'><tr><td>{collapsedText}<td></tr></table>"):new Ext.Template("<span id='CRM_collapsedText'>{collapsedText}</span>");
                 ct.append(
                        this.collapsedEl.dom,
                        {collapsedText:this.panel.collapsedText},true); 
                          
                t.addClassOnOver('x-tool-expand-'+this.position+'-over');
                t.on('click', this.onExpandClick, this, {stopEvent:true});
                
                if(this.floatable !== false){
                   this.collapsedEl.addClassOnOver("x-layout-collapsed-over");
                   this.collapsedEl.on("click", this.collapseClick, this);
                }
            }
        }
        return this.collapsedEl;
    }
});
Ext.override(Ext.form.ComboBox,{
	getParams : function(q){
    	var pn = this.paramNames || this.store.paramNames;
        var p = {};
        if(this.pageSize){
            p[pn.start] = 0;
            p[pn.limit] = this.pageSize;
        }
        return p;
    }
});
/*重写Store的排序规则*/
//Ext.override(Ext.data.Store,{
//	singleSort: function(fieldName, dir) {
//		var tmpFieldName = fieldName;
//		if(fieldName.indexOf('.') > -1){
//			tmpFieldName = fieldName.substring(0,fieldName.indexOf('.'));
//		}
//        var field = this.fields.get(tmpFieldName);
//        if (!field) return false;
//
//        var name       = field.name,
//            sortInfo   = this.sortInfo || null,
//            sortToggle = this.sortToggle ? this.sortToggle[name] : null;
//
//        if (!dir) {
//            if (sortInfo && sortInfo.field == name) { // toggle sort dir
//                dir = (this.sortToggle[name] || 'ASC').toggle('ASC', 'DESC');
//            } else {
//                dir = field.sortDir;
//            }
//        }
//
//        this.sortToggle[name] = dir;
//        this.sortInfo = {field: fieldName, direction: dir};
//        this.hasMultiSort = false;
//
//        if (this.remoteSort) {
//            if (!this.load(this.lastOptions)) {
//                if (sortToggle) {
//                    this.sortToggle[name] = sortToggle;
//                }
//                if (sortInfo) {
//                    this.sortInfo = sortInfo;
//                }
//            }
//        } else {
//            this.applySort();
//            this.fireEvent('datachanged', this);
//        }
//    }
//});
/**
 * 跨域请求
 * @param {} u
 * @return {Boolean}
 */
//Ext.lib.Ajax.isCrossDomain = function(u) {
//    var match = /(?:(\w*:)\/\/)?([\w\.]*(?::\d*)?)/.exec(u);
//    if (!match[1]) return false; // No protocol, not cross-domain
//    return (match[1] != location.protocol) || (match[2] != location.host);
//};
//
//Ext.override(Ext.data.Connection, {
//
//    request : function(o){
//            var me = this;
//            if(me.fireEvent("beforerequest", me, o)){
//                if (o.el) {
//                    if(!Ext.isEmpty(o.indicatorText)){
//                        me.indicatorText = '<div class="loading-indicator">'+o.indicatorText+"</div>";
//                    }
//                    if(me.indicatorText) {
//                        Ext.getDom(o.el).innerHTML = me.indicatorText;
//                    }
//                    o.success = (Ext.isFunction(o.success) ? o.success : function(){}).createInterceptor(function(response) {
//                        Ext.getDom(o.el).innerHTML = response.responseText;
//                    });
//                }
//
//                var p = o.params,
//                    url = o.url || me.url,
//                    method,
//                    cb = {success: me.handleResponse,
//                          failure: me.handleFailure,
//                          scope: me,
//                          argument: {options: o},
//                          timeout : Ext.num(o.timeout, me.timeout)
//                    },
//                    form,
//                    serForm;
//
//
//                if (Ext.isFunction(p)) {
//                    p = p.call(o.scope||WINDOW, o);
//                }
//
//                p = Ext.urlEncode(me.extraParams, Ext.isObject(p) ? Ext.urlEncode(p) : p);
//
//                if (Ext.isFunction(url)) {
//                    url = url.call(o.scope || WINDOW, o);
//                }
//
//                if((form = Ext.getDom(o.form))){
//                    url = url || form.action;
//                     if(o.isUpload || (/multipart\/form-data/i.test(form.getAttribute("enctype")))) {
//                         return me.doFormUpload.call(me, o, p, url);
//                     }
//                    serForm = Ext.lib.Ajax.serializeForm(form);
//                    p = p ? (p + '&' + serForm) : serForm;
//                }
//
//                method = o.method || me.method || ((p || o.xmlData || o.jsonData) ? 'POST' : 'GET');
//
//                if(method === 'GET' && (me.disableCaching && o.disableCaching !== false) || o.disableCaching === true){
//                    var dcp = o.disableCachingParam || me.disableCachingParam;
//                    url = Ext.urlAppend(url, dcp + '=' + (new Date().getTime()));
//                }
//
//                o.headers = Ext.apply(o.headers || {}, me.defaultHeaders || {});
//
//                if(o.autoAbort === true || me.autoAbort) {
//                    me.abort();
//                }
//
//                if((method == 'GET' || o.xmlData || o.jsonData) && p){
//                    url = Ext.urlAppend(url, p);
//                    p = '';
//                }
//                
//                if (o.scriptTag || this.scriptTag || Ext.lib.Ajax.isCrossDomain(url)) {
//                   me.transId = this.scriptRequest(method, url, cb, p, o);
//                } else {
//                   me.transId = Ext.lib.Ajax.request(method, url, cb, p, o)
//                }
//                return me.transId;
//            }else{
//                return o.callback ? o.callback.apply(o.scope, [o,undefined,undefined]) : null;
//            }
//    },
//    
//    scriptRequest : function(method, url, cb, data, options) {
//        var transId = ++Ext.data.ScriptTagProxy.TRANS_ID;
//        var trans = {
//            id : transId,
//            cb : options.callbackName || "stcCallback"+transId,
//            scriptId : "stcScript"+transId,
//            options : options
//        };
//
//        if (!Ext.isEmpty(data))
//            url = Ext.urlAppend(url, data)
//        url = Ext.urlAppend(url, String.format("{0}={1}", options.callbackParam || this.callbackParam || 'callback', trans.cb));
//        
//        var conn = this;
//        window[trans.cb] = function(o){
//            conn.handleScriptResponse(o, trans);
//        };
//
//        // Set up the timeout handler
//        trans.timeoutId = this.handleScriptFailure.defer(cb.timeout, this, [trans]);
//
//        var script = document.createElement("script");
//        script.setAttribute("src", url);
//        script.setAttribute("type", "text/javascript");
//        script.setAttribute("id", trans.scriptId);
//        document.getElementsByTagName("head")[0].appendChild(script);
//
//        return trans;
//    },
//
//    handleScriptResponse : function(o, trans){
//        this.transId = false;
//        this.destroyScriptTrans(trans, true);
//        var options = trans.options;
//        
//        // Attempt to parse a string parameter as XML.
//        var doc;
//        if (typeof o == 'string') {
//            if (window.ActiveXObject) {
//                doc = new ActiveXObject("Microsoft.XMLDOM");
//                doc.async = "false";
//                doc.loadXML(o);
//            } else {
//                doc = new DOMParser().parseFromString(o,"text/xml");
//            }
//        }
//
//        // Create the bogus XHR
//        response = {
//            responseObject: o,
//            responseText: (typeof o == "object") ? Ext.util.JSON.encode(o) : String(o),
//            responseXML: doc,
//            argument: options.argument
//        }
//        this.fireEvent("requestcomplete", this, response, options);
//        Ext.callback(options.success, options.scope, [response, options]);
//        Ext.callback(options.callback, options.scope, [options, true, response]);
//    },
//    
//    handleScriptFailure: function(trans) {
//        this.transId = false;
//        this.destroyScriptTrans(trans, false);
//        var options = trans.options;
//        response = {
//            argument:  options.argument,
//            status: 500,
//            statusText: 'Server failed to respond',
//            responseText: ''
//        };
//        this.fireEvent("requestexception", this, response, options, {
//            status: -1,
//            statusText: 'communication failure'
//        });
//        Ext.callback(options.failure, options.scope, [response, options]);
//        Ext.callback(options.callback, options.scope, [options, false, response]);
//    },
//    
//    // private
//    destroyScriptTrans : function(trans, isLoaded){
//        document.getElementsByTagName("head")[0].removeChild(document.getElementById(trans.scriptId));
//        clearTimeout(trans.timeoutId);
//        if(isLoaded){
//            window[trans.cb] = undefined;
//            try{
//                delete window[trans.cb];
//            }catch(e){}
//        }else{
//            // if hasn't been loaded, wait for load to remove it to prevent script error
//            window[trans.cb] = function(){
//                window[trans.cb] = undefined;
//                try{
//                    delete window[trans.cb];
//                }catch(e){}
//            };
//        }
//    }
//});