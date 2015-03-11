<%@ page language="java" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>编辑联系人</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<jsp:include page="/extcommon.jsp"/>
	
    <!-- page specific -->
    <script type="text/javascript" src="contact/editor/js/contactedit.js"></script>
  </head>
  
	<body>
		<input type="hidden" id="modId" value="<%=request.getParameter("id")%>">
		<input type="hidden" id="gridId" value="<%=request.getParameter("gridId")%>">
		<input type="hidden" id="fcId" value="<%=request.getParameter("fcId")%>">
		<input type="hidden" id="flag" value="<%=request.getParameter("flag")%>">
		<input type="hidden" id="personName" value="<%=request.getParameter("personName")%>">
		<input type="hidden" id="personEmail" value="<%=request.getParameter("personEmail")%>">
		<input type="hidden" id="pIfameId" value="<%=request.getParameter("pIfameId") %>"/>
		<input type="hidden" id="myIfameId" value="<%=request.getParameter("myIfameId") %>"/>
	</body>
</html>
