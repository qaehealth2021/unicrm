<%@ page language="java" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>客户编辑页面</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<jsp:include page="/extcommon.jsp"></jsp:include>
    <!-- page specific -->
  </head>
	<body>
	    <script type="text/javascript" src="customer/editor/js/customerEditor.js"></script>
		<input type="hidden" id="modId" value="<%=request.getParameter("id") %>"/>
		<input type="hidden" id="gridId" value="<%=request.getParameter("gridId")%>">
		<input type="hidden" id="personName" value="<%=request.getParameter("personName")%>">
		<input type="hidden" id="personEmail" value="<%=request.getParameter("personEmail")%>">
		<input type="hidden" id="pIfameId" value="<%=request.getParameter("pIfameId") %>"/>
		<input type="hidden" id="myIfameId" value="<%=request.getParameter("myIfameId") %>"/>
		<input type="hidden" id="first" value="<%=request.getParameter("first") %>"/>
	</body>	
</html>
