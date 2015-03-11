<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String webapp=request.getContextPath();
%>
<style type="text/css">    
    .x-selectable, .x-selectable * {    
        -moz-user-select: text!important;    
        -khtml-user-select: text!important;    
    }    
	.x-grid3-gridsummary-row-inner{overflow:hidden;width:100%;}/* IE6 requires width:100% for hori. scroll to work */
	.x-grid3-gridsummary-row-offset{width:10000px;}
	.x-grid-hide-gridsummary .x-grid3-gridsummary-row-inner{display:none;}
</style> 

<link rel="stylesheet" type="text/css"
	href="<%=webapp %>/common/css/common.css" />
<link rel="stylesheet" type="text/css"
	href="<%=webapp %>/common/ext/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css"
	href="<%=webapp %>/common/ext/resources/css/ext-extend.css" />
<link rel="stylesheet" type="text/css" href="<%=webapp %>/common/ext/resources/css/ext-patch.css" />

<link rel="stylesheet" href="common/ext/ux/css/RowEditor.css" type="text/css" />

<!-- LIBS -->
<script type="text/javascript" src="<%=webapp %>/common/ext/adapter/ext/ext-base-debug.js"></script>
<script type="text/javascript" src="<%=webapp %>/common/js/constants.js"></script>
<script type="text/javascript" src="<%=webapp %>/common/js/cookies.js"></script>

<!-- ENDLIBS -->
<script type="text/javascript" src="<%=webapp %>/common/ext/ext-all.js"></script>
<script type="text/javascript" src="<%=webapp %>/common/ext/ext-lang-zh_CN.js"></script>
<script type='text/javascript' src='<%=webapp %>/dwr/engine.js'></script>
<script type="text/javascript" src="<%=webapp %>/dwr/util.js"></script>
<script type="text/javascript" src="<%=webapp %>/dwr/interface/baseSerivce.js"></script>
<script type="text/javascript" src="<%=webapp %>/common/js/common.js"></script>
<script type="text/javascript" src="<%=webapp %>/common/js/commonControl.js"></script>
<script type="text/javascript" src="<%=webapp %>/common/js/adv-vtypes.js"></script>
<script type="text/javascript" src="<%=webapp %>/common/js/ext-override.js"></script>
<script type="text/javascript" src="<%=webapp %>/common/ext/ux/PagingStore.js"></script>


<!--<script type="text/javascript" src="<%=webapp %>/common/js/ux/grid/BaseCellToolTip.js"></script>  -->


<script type="text/javascript" src="<%=webapp %>/common/js/scriptMgr.js"></script>




<script type="text/javascript">
    Ext.BLANK_IMAGE_URL = '<%=webapp %>/common/ext/resources/images/default/s.gif'
    Ext.QuickTips.init();                       //为组件提供提示信息功能，form的主要提示信息就是客户端验证的错误信息。
	Ext.form.Field.prototype.msgTarget='qtip';         //提示的方式，枚举值为
	//Ext.state.Manager.setProvider(new Ext.state.CookieProvider());//设置cookie，保存布局
	if (!Ext.grid.GridView.prototype.templates) {    
    Ext.grid.GridView.prototype.templates = {};    
}    
//Grid可以选择单元格的补丁
    Ext.grid.GridView.prototype.templates.cell = new Ext.Template(    
	    '<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} x-selectable {css}" style="{style}" tabIndex="0" {cellAttr}>',    
	    '<div class="x-grid3-cell-inner x-grid3-col-{id}" {attr}>{value}</div>',    
	    '</td>'   
    ); 
</script>



