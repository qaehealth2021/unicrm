<%@ page language="java" import="java.util.*,com.sail.cot.domain.CotEmps" pageEncoding="UTF-8"%>

<%
	String webapp = request.getContextPath();
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<html>
	<head>
		<title>旗航外贸管理软件V8.0</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<jsp:include page="/extcommon.jsp"></jsp:include>
		<style type="text/css">    
		       a {
				    color:#15428B;
				}
				a:link, a:visited {
				    text-decoration: none;
				}
				.x-panel-inline-icon{
					height:25px;
				}
				.x-panel-header {
					font-size: 14px;
				}
				.x-tree-node-el {
					cursor: pointer;
					line-height: 18px;
					margin-top: 4px;
				}
				.x-tree-node-zoom a span {
					zoom: 1.1;
					color:blue
				}
		</style>  
		<link rel="stylesheet" type="text/css"
			href="<%=webapp%>/common/ext/ux/css/Portal.css" />
		<!-- 核心css，必须-->
		<link rel="stylesheet" type="text/css"
			href="<%=webapp%>/common/css/layout.css" />
		<link rel="stylesheet" type="text/css"
			href="<%=webapp%>/common/css/calendarlite.css" />
		<!--[if IE]>
		<link rel="stylesheet" type="text/css" href="<%=webapp%>/common/css/ie6.css" />
		<![endif]-->
		<script type="text/javascript"
			src="<%=webapp%>/common/ext/ux/TabCloseMenu.js"></script>

		<link rel="stylesheet" type="text/css"
			href="<%=webapp%>/common/ext/ux/css/Portal.css" />
		<script type="text/javascript"
			src="<%=webapp%>/common/ext/ux/Portal.js"></script>
		<script type="text/javascript"
			src="<%=webapp%>/common/ext/ux/ToastWindow.js"></script>
		<script type="text/javascript"
			src="<%=webapp%>/common/ext/ux/PortalColumn.js"></script>
		<script type="text/javascript"
			src="<%=webapp%>/common/ext/ux/Portlet.js"></script>
		<script type='text/javascript' src='<%=webapp%>/framework.js'></script>

		<script type="text/javascript">
		   function getEmpInfo()
			{
				cotEmpsService.getLoginEmp(function(res){
				
					if(res == null)
					{
						document.getElementById("loginEmpId").innerHTML = "<span class='user'></span>您好:未知";
					}
					else
					{	empId =res.id;
						document.getElementById("loginEmpId").innerHTML += "<div style='float: right'><span class='user'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>您好:"+res.empsId+"&nbsp;<font color=green>("+res.empsName+")</font></div>";
					}
				})
			}
			function KeyDown(){
				if(event.keyCode==116){ 
					event.keyCode = 0;
					event.cancelBubble = true;
					return false;
				}
			}
			document.onkeydown=KeyDown;	
 		 </script>
	</head>
<%
	CotEmps emp = (CotEmps)request.getSession().getAttribute("emp");
%>
	<body>
		<div id="content"></div>
		<div id="calendar_container"></div>
		<iframe name="loginaction" style="display:none"></iframe>
		<form action="index.do?method=logoutAction" method="post" id="exitForm" name="extyForm" style="display:none">
		</form>
		<input type="hidden" id="empId" name="empId" value="<%=emp.getEmpsId()%>" />
	</body>
</html>