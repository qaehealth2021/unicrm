/**
 * ext动态加载js
 * 使用：
 * ScriptMgr.load({
	  scripts: ['/js/other-prerequisite.js', '/js/other.js'],
	  callback: function() {
	    var other = new OtherObject();
	    alert(other); //just loaded
	  }
	});
 */
ScriptLoader = function() {
	this.timeout = 30;
	this.scripts = [];
	this.disableCaching = false;
	this.loadMask = null;
};

ScriptLoader.prototype = {
//	showMask : function() {
//		if (!this.loadMask) {
//			this.loadMask = new Ext.LoadMask(Ext.getBody());
//			this.loadMask.show();
//		}
//	},
//
//	hideMask : function() {
//		if (this.loadMask) {
//			this.loadMask.hide();
//			this.loadMask = null;
//		}
//	},

	processSuccess : function(response) {
		this.scripts[response.argument.url] = true;
		window.execScript ? window.execScript(response.responseText) : window
				.eval(response.responseText);
		if (response.argument.options.scripts.length == 0) {
//			this.hideMask();
		}
		if (typeof response.argument.callback == 'function') {
			response.argument.callback.call(response.argument.scope);
		}
	},

	processFailure : function(response) {
//		this.hideMask();
		Ext.MessageBox.show({
					title : '错误',
					msg : '未能导入所需的脚本文本',
					closable : true,
					icon : Ext.MessageBox.ERROR,
					minWidth : 200
				});
		setTimeout(function() {
					Ext.MessageBox.hide();
				}, 3000);
	},

	load : function(url, callback) {
		var cfg, callerScope;
		if (typeof url == 'object') { // must be config object
			cfg = url;
			url = cfg.url;
			callback = callback || cfg.callback;
			callerScope = cfg.scope;
			if (typeof cfg.timeout != 'undefined') {
				this.timeout = cfg.timeout;
			}
			if (typeof cfg.disableCaching != 'undefined') {
				this.disableCaching = cfg.disableCaching;
			}
		}

		if (this.scripts[url]) {
			if (typeof callback == 'function') {
				callback.call(callerScope || window);
			}
			return null;
		}

//		this.showMask();

		Ext.Ajax.request({
					url : url,
					success : this.processSuccess,
					failure : this.processFailure,
					scope : this,
					timeout : (this.timeout * 1000),
					disableCaching : this.disableCaching,
					argument : {
						'url' : url,
						'scope' : callerScope || window,
						'callback' : callback,
						'options' : cfg
					}
				});
	}
};

ScriptLoaderMgr = function() {
	this.loader = new ScriptLoader();
	this.loadNameSpace=function(names){
		for (var i = 0; i < names.length; i++) {
			Ext.namespace(names[i]);
		}
	}

	this.load = function(o) {
		if (!Ext.isArray(o.scripts)) {
			o.scripts = [o.scripts];
		}
		var newScripts=[];
		//如果scripts的元素也是数组的话,要把改元素里面的数组值一个一个添加进scripts
		for (var i = 0; i < o.scripts.length; i++)
			newScripts=newScripts.concat(o.scripts[i]);
		o.scripts=newScripts;
		o.url = o.scripts.shift();

		if (o.scripts.length == 0) {
			this.loader.load(o);
		} else {
			o.scope = this;
			this.loader.load(o, function() {
						this.load(o);
					});
		}
	};
};

ScriptMgr = new ScriptLoaderMgr();
