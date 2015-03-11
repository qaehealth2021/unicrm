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
		<jsp:include page="/extcommon.jsp"/>
	    <script type="text/javascript" src="desktop/js/MyApp.js"></script>
	    <script type="text/javascript" src="common/js/nong.js"></script>
	</head>
	<body>
	<iframe name="loginaction" style="display:none"></iframe>
		<div id="ux-logo">
		</div>
		<div id="ux-taskbar">
			<div id="ux-taskbar-start"></div>
			<div id="ux-taskbuttons-panel"></div>
			<div class="x-clear"></div>
			<div id="ux-taskbar-time"></div>
		</div>
		<div id="x-desktop">
		    <div id="shortcuts">
		    </div>
		</div>
	</body>
</html>
