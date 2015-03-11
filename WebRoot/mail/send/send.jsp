<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>发送邮件</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<jsp:include page="/extcommon.jsp"></jsp:include>

    
    <link rel="stylesheet" type="text/css" href="common/css/swfUpload.css" />
    <link rel="stylesheet" type="text/css" href="common/css/SwfUploadPanel.css" />
    <link rel="stylesheet" type="text/css" href="common/ext/resources/css/examples.css"/>
    <!-- 下列多选框 -->
    <link rel="stylesheet" type="text/css" href="common/css/chooser.css" />
	<link rel="stylesheet" type="text/css" href="common/ext/ux/css/MultiSelect.css"/> 
	<script type="text/javascript" src="common/ext/ux/MultiSelect.js"></script> 
    <!-- 图片鼠标拖拉选择框 -->
	<script type="text/javascript" src="common/ext/ux/DataView-more.js"></script>
    <!-- 引入图片选项栏 -->
    <script type="text/javascript" src="common/js/insertBackGrounpPic.js"></script>
    <script type="text/javascript" src="common/ext/ux/ProgressBarPager.js"></script>

    <script type="text/javascript" src="mail/send/js/sendmail.js"></script>
 
    
    
  </head>
  
  <body>
       
  	<input type="hidden" id="sessionId" name="sessionId" value='<%= request.getSession().getId()%>'>
  	<input type="hidden" id="accountId" value='<%= request.getParameter("accountId")%>'>
  	<input type="hidden" id="sendTypeStatus" value='<%= request.getParameter("sendTypeStatus")%>'>
  	<input type="hidden" id="mailId" value='<%= request.getParameter("mailId")%>'> 
  	<input type="hidden" id="gridId" value='<%= request.getParameter("gridId")%>'> 
  	<input type="hidden" id="custId" value='<%= request.getParameter("custId")%>'> 
  	<input type="hidden" id="consignCustId" value='<%= request.getParameter("consignCustId")%>'> 
  	<input type="hidden" id="orderNo" value='<%= request.getParameter("orderNo")%>'> 
  	<input type="hidden" id="orderRemark" value='<%= request.getParameter("orderRemark")%>'>
  	<input type="hidden" id="orderAirRemark" value='<%= request.getParameter("orderAirRemark")%>'>  
  	<input type="hidden" id="orderPol" value='<%= request.getParameter("orderPol")%>'>
  	<input type="hidden" id="orderPod" value='<%= request.getParameter("orderPod")%>'>
  	<input type="hidden" id="orderStatus" value='<%= request.getParameter("trackStatus")%>'> 
  	<input type="hidden" id="contactEmail" value='<%= request.getParameter("contactEmail")%>'> 
  	<input type="hidden" id=contactPerson value='<%= request.getParameter("contactPerson")%>'> 
  	<input type="hidden" id="myIfameId" value="<%=request.getParameter("myIfameId") %>"/>
  	<input type="hidden" id="attachPath" value='<%=request.getParameter("attachPath") %>'/>
  	<input type="hidden" id="sendEmail" value='<s:property value="sendEmail"/>'> 
  </body>
</html>
