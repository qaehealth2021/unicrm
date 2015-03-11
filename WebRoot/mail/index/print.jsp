<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>邮件打印</title>
<%
	String webapp=request.getContextPath();
%>
<link rel="stylesheet" type="text/css" href="<%=webapp %>/common/ext/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="<%=webapp %>/common/ext/resources/css/mail.css" />
<style type="text/css">
	.x-panel-body {
		border:0
	}
</style>
<style type="text/css" media="print">
	.noprint{display:none}
</style>
<script type="text/javascript">
function fPrint(){	
	window.print();	
}
window.onload = fPrint;
</script>
</head>
<body>
	<div id="t1" class="noprint" style="border-bottom:1px solid #CCC;">
		<button onclick="fPrint()">打印该邮件</button>
		<button onclick="window.close()">关闭该页面</button>
	</div>
	<%=request.getParameter("printcontent") %>
	<div id="t2" class="noprint" style="border-top:1px solid #CCC;">
		<button onclick="fPrint()">打印该邮件</button>
		<button onclick="window.close()">关闭该页面</button>
	</div>
</body>
</html>