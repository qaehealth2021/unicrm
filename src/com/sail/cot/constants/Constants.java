package com.sail.cot.constants;

/**
 * @Copyright :(C),2008-2011
 * @CompanyName :厦门市旗航软件有限公司(www.xmqh.net)
 * @Version 1.0
 * @Date Mar 3, 2011
 * @ClassName: Constants
 * @Description: 系统常量
 */
public class Constants {

	/**
	 * 一次性最大上传文件大小（20M）
	 */
	public static final long MAX_ONCE_UPLOAD_SIZE = 20 * 1024 * 1024;

	/**
	 * 上传时需要申请的内存空间，单位byte，512K
	 */
	public static final int UPLOAD_SIZE_THRESHOLD = 512 * 1024;

	/**
	 * 单个文件最大上传大小
	 */
	public static final long MAX_EACH_FILE_UPLOAD_SIZE = 20 * 1024 * 1024;

	/**
	 * 系统上传文件的工程名，用于上传文件或图片后显示的工程名
	 */
	public static final String DEFAULT_UPLOAD_PROJ = "cotsystemfiles";

	/**
	 * 系统默认上传的文件夹，默认在tomcat目录下webapp文件下
	 */
	public static final String DEFAULT_UPLOAD_FILE = "webapps/"
			+ DEFAULT_UPLOAD_PROJ + "/";

	/**
	 * 系统将文件转成HTML存放位置的工程名
	 */
	public static final String FILE_TO_HTML_PROJ = "file_to_html_temp";
	
	/**
	 * String 文件系统上传的文件夹
	 */
	public static final String FILE_SYSTEM = "filesystem";
	/**
	 * 系统将文件转成HTML存放位置的工程名，默认在tomcat目录下webapp文件下
	 */
	public static final String FILE_TO_HTML_TEMP_DIR = "webapps/"
			+ FILE_TO_HTML_PROJ + "/";
	/**
	 * 登录用户的SESSION别名
	 */
	public static final String SESSION_EMP = "emp";

	/**
	 * 全局识别码SESSION别名
	 */
	public static final String COOKIE_IDENTITY = "COT_IDENTITY_ID";
	
	public static final String COOKIE_CURRENT_EMP = "COOKIES_COT_CURRENT_EMP";
	/**
	 * 登录用户的权限映射
	 */
	public static final String SESSION_PROPEDOMMAP = "popedomMap";

	/**
	 * 登录用户名的cookie项
	 */
	public static final String COOKIE_USERNAME = "username";

	/*
	 * 登录验证(0代表工号不存在, 1代表密码不正确, 3代表已经达到最大登录人数, 4，代表还没注册. 5.登录异常 2代表成功,
	 * 6：员工状态为离职, 7:临时试用登录（走试用流程）, 8:该员工需要命令牌,但是没输入, 9:输入了错误的命令牌, 10:一个命令牌重复登录)
	 */
	/**
	 * 0代表工号不存在
	 */
	public static final int LOGIN_EMP_NOT_FOUND = 0;
	/**
	 * 1代表密码不正确
	 */
	public static final int LOGIN_PWD_ERR = 1;
	/**
	 * 2代表成功
	 */
	public static final int LOGIN_SUCCESS = 2;
	/**
	 * 3代表已经达到最大登录人数
	 */
	public static final int LOGIN_MAX_USER_LIMIT = 3;
	/**
	 * 4，代表还没注册.
	 */
	public static final int LOGIN_UNREGIST = 4;
	/**
	 * 5.登录异常
	 */
	public static final int LOGIN_EXCEPTION = 5;
	/**
	 * 6员工状态为离职,
	 */
	public static final int LOGIN_EMP_DISABLED = 6;
	/**
	 * 7:临时试用登录（走试用流程）
	 */
	public static final int LOGIN_TMP_LOGIN = 7;
	/**
	 * 8:该员工需要命令牌,但是没输入,
	 */
	public static final int LOGIN_TOKEN_NEEDED = 8;
	/**
	 * 9:输入了错误的命令牌,
	 */
	public static final int LOGIN_TOKEN_ERR = 9;
	/**
	 * 10:一个命令牌重复登录
	 */
	public static final int LOGIN_TOKEN_REPEAT_LOGIN = 10;

	/**
	 * String json数据返回值
	 */
	public static final String JSONDATA = "jsondata";

	/**
	 * String 样品档案模块
	 */
	public static final String MODULE_COTELEMENTS = "CotElements";

	/**
	 * String 报价模块
	 */
	public static final String MODULE_COTPRICE = "CotPrice";

	/**
	 * String 默认精度缓存键
	 */
	public static final String DEFAULT_PRECISION = "precision";

	/**
	 * String 图标文件名
	 */
	public static final String ICON = "icon";

	/**
	 * 报价默认配置键
	 * 
	 * @type String
	 */
	public static final String CACHE_DEFAULT_PRICE = "CotPrice";
	/**
	 * 样品默认配置键
	 * 
	 * @type String
	 */
	public static final String CACHE_DEFAULT_ELEMENT = "CotElementsNew";

	/**
	 * 订单默认配置键
	 * 
	 * @type String
	 */
	public static final String CACHE_DEFAULT_ORDER = "CotOrder";

	/**
	 * 送样默认配置键
	 * 
	 * @type String
	 */
	public static final String CACHE_DEFAULT_GIVEN = "CotGiven";

	/**
	 * 征样默认配置键
	 * 
	 * @type String
	 */
	public static final String CACHE_DEFAULT_SIGN = "CotSign";

	/**
	 * 订单合同默认配置键
	 * 
	 * @type String
	 */
	public static final String CACHE_DEFAULT_ORDER_FAC = "CotOrderFac";

	/**
	 * 配件默认配置键
	 * 
	 * @type String
	 */
	public static final String CACHE_DEFAULT_FITTINGS = "CotFittings";

	/**
	 * 配件包材采购键
	 * 
	 * @type String
	 */
	public static final String CACHE_DEFAULT_PACKING_ORDER = "CotPackingOrder";

	/**
	 * 配件合同默认配置键
	 * 
	 * @type String
	 */
	public static final String CACHE_DEFAULT_FITTING_ORDER = "CotFittingOrder";
	/**
	 * 出货默认配置键
	 * 
	 * @type String
	 */
	public static final String CACHE_DEFAULT_ORDER_OUT = "CotOrderOut";

	/**
	 * RMB币种id
	 * 
	 * @type Integer
	 */
	public static final Integer CURRENCY_RMB_ID = 1;

	/**
	 * 美元币种id
	 * 
	 * @type Integer
	 */
	public static final Integer CURRENCY_USD_ID = 2;
	/**
	 * comnet注册应用的channel名称
	 * 
	 * @type String
	 */
	public static final String UNICRM_APP_CHANNEL = "unicrm";
	
	/**
	 * 当前页面登录用户的随机数
	 */
	public static final String LOGIN_RAM = "loginRdm";
	
	
}
