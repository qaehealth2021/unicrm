<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String webapp = request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>权限配置</title>
<jsp:include page="/extcommon.jsp"></jsp:include>
<script type="text/javascript" src="<%=webapp %>/dwr/interface/cotPopedomService.js"></script>
<script type='text/javascript' src='<%=webapp%>/system/module/js/moduletree.js'></script>
</head>
<body>
	<input type="hidden" id="empId" value="<%=request.getParameter("id")%>">
	<input type="hidden" id="empsId" value="<%=request.getParameter("empsId")%>">
</body>
</html>