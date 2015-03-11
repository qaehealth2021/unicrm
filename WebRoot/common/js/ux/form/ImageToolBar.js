Ext.namespace('Ext.ux');
/*
 * 该来引用到ImageField.js和uploadpanel.js,需要将其对应的js引入
 */
Ext.ux.ImageToolBar = Ext.extend(Ext.Panel,{
	/**
	 * 上传处理函数
	 */
	uploadHanlder : null,
	/**
	 * 图片删除处理函数
	 */
	delHandler:null,
	/**
	 * 图片成比例缩放函数
	 */
	imageScaleHanlder:null,
	/**
	 * 图片单独显示函数
	 */
	imageShowHander:null,
	/**
	 * 图片按比例缩放高
	 */
	scaleHeight:130,
	
	/**
	 * 图片按比例缩放宽
	 */
	scaleWidth:130,
	
	/**
	 * 调用上传时调用传递的ID主键（必须）
	 */
	queryId:"",
	
	/**
	 * 调用上传时，需要传递的对象名（必须），如”CotCompany“
	 */
	tbName:null,
	
	/**
	 * 调用上传时，需要存放的文件夹（必须），如”cust“
	 */
	uploadPath:null,
	/**
	 * 是否做数据库操作，true：做数据库操作，false：不做数据库操作
	 * @type Boolean
	 */
	doDbOp:false,
	
	/**
	 * 调用上传时，数据库更新需要的字段（必须），如”companyLogo“
	 */
	field:null,
	style:{
		textAlign:"center"
	},
	/**
	 * 调用上传时，需要调用的服务名，默认为BaseService
	 */
	beanName:"BaseService",
	/*******************以下属性参考uploadpanel.js的参数说明*********************/
	uploadUrl:"./servlet/UploadServlet",
	
	uploadType:"image",
	
	waitMsg:"",
	
	validType:"jpg|png|bmp|gif",
	
	/**
	 * 是否隐藏"更改" "删除"的文本
	 * @type Boolean
	 */
	hideBtnTxt:false,
	/**
	 * 上传成功后的回调函数，由用户自己定义
	 * @type String
	 */
	successFn:'',
	/**
	 * 是否把图片重新命名
	 * @type Boolean
	 */
	isRName:false,
	
	initComponent: function () { 
		        var field = new Ext.form.TextField({
		        	hidden:true,
 					name:this.field,
// 					id:this.field,//同个页面调用2次时,设置id有问题
 					// 当用在form中时，有多个ImageToolbar控件时，
 					// 可用form.findField 获得该 TextField 再直接获得imageTbar控件
 					// 这样可省去为每个imageTbar设置ID
 					imageTbar:this 
		        });
				this.items = [field];
                Ext.ux.ImageToolBar.superclass.initComponent.apply(this, arguments);
                //this.addEvents('load');
     },
     onRender: function(){
     			var imgId = Ext.id();
     			var _self = this;
     			_self.imageId = imgId;
     			this.add([
     				{
						xtype : "image",
						id:imgId,
						//src:"common/images/zwtp.png",
						//height:this.scaleHeight,
						//width:this.scaleWidth,
						listeners:{
							"load":function(imgbox){
								if(Ext.isFunction(_self.imageScaleHanlder)){
									_self.imageScaleHanlder(imgbox,_self.scaleWidth,_self.scaleHeight);
								}
								else{
									DrawImage(imgbox.el.dom,_self.scaleWidth,_self.scaleHeight);
								}
							},
							"click":function(imgbox){
								if(Ext.isFunction(_self.imageShowHander))
									_self.imageScaleHanlder(imgbox,_self.scaleWidth,_self.scaleHeight);
								else
									showBigPicDiv(imgbox.target,_self.tbName);
							}
						}
     				}
     			]);
     			this.buttonAlign = "center",
     			this.fbar =[
					{
						width : _self.hideBtnTxt?30:65,
						text : _self.hideBtnTxt?"":"更改",
						//id : "upmod",
						tooltip:'更改',
						iconCls : "upload-icon",
						handler : function(){
							if(Ext.isFunction(_self.uploadHanlder))
								_self.uploadHanlder();
							else
								_self.uploadHandlerFn(_self.imageId);
								
						}
					}, {
						width : _self.hideBtnTxt?30:65,
						text : _self.hideBtnTxt?"":"删除",
						//id : "updel",
						tooltip:'删除',
						iconCls : "upload-icon-del",
						handler : function(){
							if(Ext.isFunction(_self.delHandler))
								_self.delHandler();
							else
								_self.delHandlerFn();
								
						}
					}
     			]
     			this.createFbar(this.fbar);
                Ext.ux.ImageToolBar.superclass.onRender.apply(this, arguments);
        },
        
        uploadHandlerFn:function(imgId){
        	var id = this.queryId;
			var opAction = "insert";
			if (id == 'null' || id == '')
				opAction = "insert";
			else
				opAction = "modify";
			var win = new UploadWin({
						params : {
							id : id,
							tbName:this.tbName,
							beanName:this.beanName,
							uploadPath:this.uploadPath,
							field:this.field,
							doDbOp:this.doDbOp,
							isRName:this.isRName
						},
						waitMsg : this.waitMsg,
						opAction : opAction,
						imgObj : Ext.getCmp(imgId),
						uploadType : this.uploadType,
						uploadUrl : this.uploadUrl,
						validType : this.validType,
						successFn:this.successFn
					})
			win.show();
        },
        // 删除图片
   		delHandlerFn: function() {
   			var _self = this;
			Ext.MessageBox.confirm('提示信息', '确定删除此图片吗?', function(btn) {
						if (btn == 'yes') {
							if (_self.queryId == null || _self.queryId == '' || _self.queryId == 'null') {
								_self.setImageSrc("common/images/zwtp.png");
							} else {
								baseSerivce.deleteObjImg(_self.tbName,_self.queryId, _self.field,function(res) {
											if (res) {
												_self.setImageSrc("common/images/zwtp.png");
											} else {
												Ext.MessageBox.alert('提示信息',
														"图片不存在，删除图片失败!");
											}
										})
							}
						}
					})
		},
        setImageSrc : function(url){
        	var imageObj = this.findByType("image");
        	imageObj[0].setSrc(url);
        	if(url=='common/images/zwtp.png')
        		url='';
        	this.items.items[0].setValue(url);
        }
})

Ext.reg('imagetoolbar', Ext.ux.ImageToolBar);