<%@ page language="java" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>邮件管理</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<jsp:include page="/extcommon.jsp"/>
	
	<style type="text/css">
    	.x-grid3-cell-inner {   
 			/*内容长的时候不换行  */
 			white-space: nowrap !important;
 			word-wrap:normal !important;
 			text-overflow:ellipsis;
		}
		.x-grid-group-hd {
			padding-top:0px;
		}
		.x-grid3-cell-inner {
			padding:0px 3px 0px 5px;
		}
    </style>
    
    <!-- page specific -->
    <script type="text/javascript" src="mail/index/js/index.js"></script>
  </head>
  
	<body>
		<form  style="display:none" id="printForm">
	  		<input type="hidden" id="printcontent" name="printcontent" />
	  		<input type="hidden" id="myIfameId" value="<%=request.getParameter("myIfameId") %>"/>
	  	</form>
	</body>
</html>
