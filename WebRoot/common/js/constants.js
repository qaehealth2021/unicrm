Ext.namespace('QH.grid');
Ext.namespace('QH.data');
Ext.namespace('QH.form');
Ext.namespace('QH.tree');
Ext.namespace('QH.controls');

Ext.namespace('QH.ux');
Ext.namespace('QH.ux.data');
Ext.namespace('QH.ux.grid');
Ext.namespace('QH.ux.tree');
Ext.namespace('QH.ux.form');
Ext.namespace('QH.ux.tab');
Ext.namespace('QH.ux.view');
Ext.namespace('QH.ux.win');

/********************常量***************************/
/**
 * @cfg {Ext.Viewport}
 * 页面中视图对象
 */
QH_VIEWPORT = '';
/**
 * @cfg {Number}
 * 分页起始
 */
QH_PAGE_START = 0;
/**
 * @cfg {Number}
 * 分页条数
 */
QH_PAGE_LIMIT = 20;
/**
 * @cfg {String}
 * 分页起始名字
 */
QH_PAGE_START_NAME = 'pageData.start';
/**
 * @cfg {String}
 * 分页条数名字
 */
QH_PAGE_LIMIT_NAME = 'pageData.limit';
/**
 * @cfg {String}
 * 分页排序字段名字
 */
QH_PAGE_SORT_NAME = 'pageData.sort';
/**
 * @cfg {String}
 * 分页排序顺序名字
 */
QH_PAGE_DIR_NAME = 'pageData.dir';

/**
 * @cfg {String}
 * 分页可选择条数
 */
QH_PAGE_DISPLAY_SIZE = '5|10|15|20|30|50|100';
/**
 * @cfg {Ext.LoadMask}
 * 遮罩层
 */
QH_LOADMASK = '';
/**
 * 日期渲染时的固定格式
 * @type String
 */
QH_DATE_FORMAT='Y-m-d';
/**
 * 时间渲染时的固定格式
 * @type String
 */
QH_TIME_FORMAT='H:i:s';
/**
 * 系统管理员名称
 * @type String
 */
QH_ADMIN = "admin";

/**
 * 系统上传文件的工程名，用于上传文件或图片后显示的工程名
 * @type String
 */
DEFAULT_UPLOAD_PROJ="cotsystemfiles";
/**
 * 图标文件名
 * @type String
 */
ICON="icon";

/**
 * 分页下拉框每页显示的数量
 * @type Number
 */
QH_COMBO_PAGE_SIZE = 10;
/**
 * 报价默认配置键
 * @type String
 */
CACHE_DEFAULT_PRICE = "CotPrice";
/**
 * 样品默认配置键
 * @type String
 */
CACHE_DEFAULT_ELEMENT = "CotElementsNew";

/**
 * 客户默认配置键
 * @type String
 */
CACHE_DEFAULT_CUSTOMER = "CotCustomer";
/**
 * 订单默认配置键
 * @type String
 */
CACHE_DEFAULT_ORDER = "CotOrder";

/**
 * 送样默认配置键
 * @type String
 */
CACHE_DEFAULT_GIVEN = "CotGiven";

/**
 * 征样默认配置键
 * @type String
 */
CACHE_DEFAULT_SIGN = "CotSign";

/**
 * 订单合同默认配置键
 * @type String
 */
CACHE_DEFAULT_ORDER_FAC = "CotOrderFac";

/**
 * 配件默认配置键
 * @type String
 */
CACHE_DEFAULT_FITTINGS = "CotFittings";

/**
 * 配件默认配置键
 * @type String
 */
CACHE_DEFAULT_ELE_FITTINGS = "CotEleFittings";

/**
 * 配件包材采购键
 * @type String
 */
CACHE_DEFAULT_PACKING_ORDER = "CotPackingOrder";

/**
 * 配件合同默认配置键
 * @type String
 */
CACHE_DEFAULT_FITTING_ORDER = "CotFittingOrder";
/**
 * 出货默认配置键
 * @type String
 */
CACHE_DEFAULT_ORDER_OUT = "CotOrderOut";
CACHE_DEFAULT=[
	[CACHE_DEFAULT_ELEMENT,'样品主单'],
	[CACHE_DEFAULT_PRICE,"报价主单"],
	[CACHE_DEFAULT_ORDER,"订单主单"],
	[CACHE_DEFAULT_GIVEN,"送样主单"],
	[CACHE_DEFAULT_SIGN,"征样主单"],
	[CACHE_DEFAULT_FITTINGS,"配件主单"],
	[CACHE_DEFAULT_ELE_FITTINGS,"产品配件"],
	[CACHE_DEFAULT_ORDER_FAC,"生产合同"],
	[CACHE_DEFAULT_PACKING_ORDER,"包材合同"],
	[CACHE_DEFAULT_FITTING_ORDER,"配件合同"],
	[CACHE_DEFAULT_ORDER_OUT,"出货主单"]
]

/**
 * 审核状态，第一个保存ID,第二个显示值，第三个显示颜色
 * @type 
 */
CHECK_STATUS = [['0', '未审核', 'green'], ['1', '审核不通过', 'red'], ['2', '审核通过', 'blue'], ['3', '请审核', '#10418C'], ['9', '不审核', 'green']];

NO_KEY = "N";
YES_KEY = "Y";
/**
 * 是否状态
 * @type 
 */
YES_NO_STATUS = [[NO_KEY, '否'], [YES_KEY, '是']];
/**
 * 外箱数改变时,false:数量不变,箱数变;true:数量变,箱数不变
 */
CHANGE_BOXCOUNT_WITH_OBCOUNT=true;

/**
 * 外箱包装类型ID
 */
BOX_TYPE_OUTER_ID = "U402881ac2e9327b6012e932c5d97000";
/**
 * 内盒包装类型ID
 */
BOX_TYPE_INNER_ID = "e402881ac2e9327b6012e932c5d97000";
/**
 * 中盒包装类型ID
 */
BOX_TYPE_MIDDLE_ID = "S402881ac2e9327b6012e932c5d59000";

/**
 * 报表类型默认配置键
 * @type String
 */
CACHE_DEFAULT_RPT_TYPE = "CotRptType";
/**
 * 不能为空时,fieldLabel的颜色
 * @type String
 */
NOT_NULL_COLOR="red";

/**
 * 导入基础表格js
 * @type 
 */
IMPORT_GRID=['common/ext/ux/RowEditor.js','common/js/ux/grid/BaseGrid.js','common/js/ux/grid/BaseRowEditor.js','common/js/ux/grid/BaseToolbar.js'];
/**
 * 导入基础表格css
 * @type 
 */
IMPORT_GRID_CSS='common/ext/ux/css/RowEditor.css';
/**
 * 通用下拉框基础js
 * @type String
 */
IMPORT_BASE_COMBO='common/js/ux/form/BaseComboBox.js';
/**
 * 公司下拉框js
 * @type 
 */
IMPORT_COMPANY_COMBO=[IMPORT_BASE_COMBO,'common/controls/CompanyBaseCombo.js'];
/**
 * 部门下拉框js
 * @type 
 */
IMPORT_DEPT_COMBO=[IMPORT_BASE_COMBO,'common/controls/DeptBaseCombo.js'];
/**
 * 员工下拉框js
 * @type 
 */
IMPORT_EMP_COMBO=[IMPORT_BASE_COMBO,'common/controls/EmpBaseCombo.js'];
/**
 * 上传文件的window组件
 * @type 
 */
IMPORT_UPLOAD=['common/ext/ux/FileUploadField.js','common/js/uploadpanel.js'];
/**
 * 上传文件的css
 * @type 
 */
IMPORT_UPLOAD_CSS='common/ext/resources/css/file-upload.css';
/**
 * 图片面板样式
 * @type String
 */
IMPORT_PIC_CSS='common/css/chooser.css';
/**
 * 批量上传文件的css
 * @type 
 */
IMPORT_BATCH_UPLOAD_CSS='common/css/SwfUploadPanel.css';
/**
 * 图片(更新/删除)组件
 * @type 
 */
IMPORT_PIC=IMPORT_UPLOAD.concat(['common/js/ux/form/ImageField.js','common/js/ux/form/ImageToolBar.js']);
/**
 * 文本框不重复的组件
 * @type String
 */
IMPORT_NO_REPEAT='common/js/ux/form/FindExistField.js';

/**
 * 国家下拉框js
 * @type 
 */
IMPORT_NATION_COMBO=[IMPORT_BASE_COMBO,'common/controls/NationBaseCombo.js'];
/**
 * 省份下拉框js
 * @type 
 */
IMPORT_CITY_COMBO=[IMPORT_BASE_COMBO,'common/controls/CityBaseCombo.js'];
/**
 * 省州下拉框js
 * @type 
 */
IMPORT_AERA_COMBO=[IMPORT_BASE_COMBO,'common/controls/AreaBaseCombo.js'];
/**
 * 省州下拉框js
 * @type 
 */
IMPORT_PROVICE_COMBO=[IMPORT_BASE_COMBO,'common/controls/ProviceBaseCombo.js'];
/**
 * 价格条款
 * @type 
 */
IMPORT_CLAUSE_COMBO=[IMPORT_BASE_COMBO,'common/controls/ClauseBaseCombo.js'];
/**
 * 数据字典下拉框
 * @type 
 */
IMPORT_DIC_COMBO=[IMPORT_BASE_COMBO,'common/controls/CommonTypeBaseCombo.js'];
/**
 * 起运港
 * @type 
 */
IMPORT_SHIPPORT_COMBO=[IMPORT_BASE_COMBO,'common/controls/ShipPortBaseCombo.js'];
/**
 * 目的港
 * @type 
 */
IMPORT_TARGETPORT_COMBO=[IMPORT_BASE_COMBO,'common/controls/TargetPortBaseCombo.js'];
/**
 * 银行信息
 * @type 
 */
IMPORT_BANK_COMBO=[IMPORT_BASE_COMBO,'common/controls/BankBaseCombo.js'];

IMPORT_ORDERNO_COMBO=[IMPORT_BASE_COMBO,'common/controls/OrderNoCombo.js'];

IMPORT_FAXMAP_COMBO=[IMPORT_BASE_COMBO,'common/controls/FaxMapBaseCombo.js'];
/**
 * 动态tabpanel,点击某个面板才加载里面的items
 * @type String
 */
IMPORT_DNCTAB='common/js/ux/tab/DynamicTabPanel.js';
/**
 * 批量上传
 * @type 
 */
IMPORT_BATCH_UPLOAD=['common/js/swfupload_2.2.js','common/js/SwfUploadPanel.js','common/js/ux/win/UploadWindow.js'];
/**
 * 鼠标拖拉选择框插件
 * @type String
 */
IMPORT_DRAG='common/ext/ux/DataView-more.js';

/**
 * 可见性按钮控件
 * @type String
 */
IMPORT_CANSEE_BTN='common/controls/CanSeeBtn.js';
/**
 * 客户下拉框
 * @type 
 */
IMPORT_CUSTOMER_COMBO=[IMPORT_BASE_COMBO,'common/controls/CustomerBaseCombo.js'];
/**
 * 厂家下拉框
 * @type 
 */
//IMPORT_FACTORY_COMBO=[IMPORT_BASE_COMBO,'common/controls/FactoryBaseCombo.js'];
/**
 * 海关编码
 * @type 
 */
IMPORT_ELEOTHER_COMBO=[IMPORT_BASE_COMBO,'common/controls/EleOtherBaseCombo.js'];
/**
 * 币种
 * @type 
 */
IMPORT_CURRENCY_COMBO=[IMPORT_BASE_COMBO,'common/controls/CurrencyBaseCombo.js'];

/**
 * 包装方案
 * @type 
 */
IMPORT_BOXTSOLUTION_COMBO=[IMPORT_BASE_COMBO,'common/controls/BoxtSolutionBaseCombo.js'];
/**
 * 包装材料
 * @type 
 */
IMPORT_BOXMATERIAL_COMBO=[IMPORT_BASE_COMBO,'common/controls/BoxMaterialBaseCombo.js'];
/**
 * 包装类型
 * @type 
 */
IMPORT_BOXTYPE_COMBO=[IMPORT_BASE_COMBO,'common/controls/BoxTypeBaseCombo.js'];
/**
 * 包装公式
 * @type 
 */
IMPORT_FORMULA_COMBO=[IMPORT_BASE_COMBO,'common/controls/FormulaBaseCombo.js'];

IMPORT_RPTTYPE_COMBO=[IMPORT_BASE_COMBO,'common/controls/RptTypeBaseCombo.js'];

IMPORT_RPTFILE_COMBO=[IMPORT_BASE_COMBO,'common/controls/RptFileBaseCombo.js'];

IMPORT_CONTACT_COMBO=[IMPORT_BASE_COMBO,'common/controls/ContactBaseCombo.js'];
/**
 * 货号下拉框
 * @type 
 */
IMPORT_ELE_COMBO=[IMPORT_BASE_COMBO,'common/controls/EleBaseCombo.js'];
/**
 * 组织架构选择器
 * @type 
 */
IMPORT_ORGSELECTOR=[IMPORT_BASE_COMBO,'common/controls/OrgSelector.js'];

/**
 * @cfg {CotEmps} GET_SESSION_EMPS
 * 登录用户
 */
GET_SESSION_EMPS = '';
/**
 * 登录用户名
 * @return {}
 */
GET_SESSION_EMPSID='';
/**
 * 登录用户的id
 * @return {}
 */
GET_SESSION_EMPS_ID='';
/**
 * tomcat上传服务器地址
 * @type String
 */
TOMCAT_UPLOAD_SERVER='';

/**
 * 全局标识
 * @type String
 */
COOKIE_IDENTITY='';
/**
 * 自动单号设置组件
 * @type 
 */
SEQUENCE_FIELD=['dwr/interface/cotSeqService.js','common/js/ux/form/SequenceField.js'];
/**
 * 产品查询window
 * @type 
 */
ELEMENT_QUERY_WIN=['common/js/ux/win/ElementWin.js'];
/**
 * 配件查询window
 * @type 
 */
FITTING_QUERY_WIN=['common/js/ux/win/FittingWin.js'];
/**
 * 用于调用公式计算的数字框
 * @type String
 */
SUMNUMBER_FIELD='common/js/ux/form/SumNumberField.js';

/**
 * 统计行插件
 * @type String
 */
GROUP_SUMMARY='common/ext/ux/GroupSummary.js';
/**
 * 统计行样式
 * @type String
 */
GROUP_SUMMARY_CSS='common/ext/ux/css/GroupSummary.css';
/**
 * excel导入面板
 * @type String
 */
EXCEL_IMPORT_PANEL='common/controls/ExcelImportPanel.js';
/**
 * 自定义excel导入模版
 * @type String
 */
EXCEL_DEFINE_WIN='common/js/ux/win/excelDesignWin.js';
/**
 * 集装箱下拉框
 * @type String
 */
IMPORT_CONTAINER_COMBO='common/controls/ContainerBaseCombo.js';
/**
 * 扩展文本编辑器
 * @type String
 */
STAR_HTML_EDITOR='common/js/ux/form/StarHtmlEditor.js';
/**
 * 表格中的复选框列插件
 * @type String
 */
BASE_CHECK_COLUMN=['common/ext/ux/CheckColumn.js','common/js/ux/grid/BaseCheckColumn.js'];
/**
 * 分组tabpnel
 * @type 
 */
GROUP_TAB_PANEL=['common/ext/ux/GroupTabPanel.js','common/ext/ux/GroupTab.js'];
GROUP_TAB_PANEL_CSS=['common/ext/ux/css/GroupTab.css'];
/**
 * 显示于表格的textarea
 * @type String
 */
TEXTAREA_FIELD='common/js/ux/form/TextAreaField.js';
AREAID = 101230201;//厦门天气的城市ID，配置在remoteaddr.properties文件中，可以从m.weather.com.cn网站查询
/**
 * 通过这个参数获取iframe自身的id
 * @type String
 */
QH_IFRAME_ID='myIfameId';
/**
 * 通过这个参数获取iframe父亲的id
 * @type String
 */
QH_P_IFRAME_ID='pIfameId';
/**
 * 通过点击透明的swf来复制粘帖
 * @type String
 */
COPY_JS='common/js/ZeroClipboard.js';
/**
 * 登录rdm
 * @return {}
 */
GET_RDM='';