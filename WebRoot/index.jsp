<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">

		<title>CRM邮件管理系统</title>

		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">

		<jsp:include page="/simplecommom.jsp"></jsp:include>
		<script type='text/javascript' src='<%=path %>/dwr/interface/cotLoginService.js'></script>
		<script type="text/javascript" src="<%=path %>/common/js/cookies.js"></script>
		<script type="text/javascript" src="login/js/login.js"></script>
	</head>
	<body scroll="auto" style="TEXT-ALIGN: center;">
	</body>
</html>
