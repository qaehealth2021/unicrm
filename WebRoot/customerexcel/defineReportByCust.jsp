<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
	<head>

		<title>自定义客户资料上传模板文件</title>
		<!-- 导入公共js和css -->
		<jsp:include page="/extcommon.jsp"></jsp:include>
		<!-- 导入左右移下拉框脚本 -->
		<script type="text/javascript"
			src="<%=path%>/common/js/leftRightSelect.js"></script>
		<script type="text/javascript">
			function downLoad(){
				//判断是否有选择字段
				if($('eleSelect').options.length==0 && $('boxSelect').options.length==0 && $('priceSelect').options.length==0){
					Ext.Msg.alert("提示信息",'您还没有选择要导入的Excel数据列！');
					return;
				}
				//选中的产品字段
				var eleStr = '';
				for(var i=0;i<$('eleSelect').options.length;i++){
					eleStr+=$('eleSelect').options[i].value+",";
				}
				//选中的包装信息字段
				var boxStr = '';
				for(var i=0;i<$('boxSelect').options.length;i++){
					boxStr+=$('boxSelect').options[i].value+",";
				}
				//选中的报价字段
				var priceStr = '';
				for(var i=0;i<$('priceSelect').options.length;i++){
					priceStr+=$('priceSelect').options[i].value+",";
				}
				document.location.replace("../../downloadCustom.action?eleStr="+eleStr+"&boxStr="+boxStr+"&priceStr="+priceStr+"&flag=cust");
			}
			//关闭
			function closeWin(){
				window.opener=null;
				window.close();
			}
		</script>
	</head>

	<body style="background-color: #dfe8f6;">
		<div align="center" style="margin-top: 5px;">
			<h3>
				请选择需要导入的数据列
			</h3>
		</div>
		<div
			style="float: left; width: 46%; margin-left: 4%; margin-top: 5px;">
			<label style="color:blue;">
				客户基本信息：
			</label>
			<form name="ele" onsubmit="return false">
				<table>
					<tr>
						<td>
							<select name=SrcSelect size=12
								style="height: 250px; width: 120px;" multiple="multiple"
								ondblclick="moveLeftOrRight(document.ele.SrcSelect,document.ele.ObjSelect)">
								<option value="CUSTOMER_SHORT_NAME" >
									客户简称(必选)
								</option>
								<option value="PRI_CONTACT" >
									联系人(必选)
								</option>
								<option value="EMP_ID">
									业务员
								</option>
								<option value="CONTACT_NBR">
									联系电话
								</option>
								<option value="CUSTOMER_FAX">
									客户传真
								</option>
								<option value="CUSTOMER_EMAIL">
									客户邮箱
								</option>
								<option value="CUSTOMER_POST">
									邮编
								</option>
								<option value="FULL_NAME_CN">
									中文全称
								</option>
								<option value="FULL_NAME_EN">
									英文全称
								</option>
								<option value="CUSTOMER_ADDRESS">
									中文地址
								</option>
								<option value="CUSTOMER_ADDR_EN">
									英文地址
								</option>
							</select>
						</td>
						<td width="30px">
							<button style="width: 60px;"
								onclick="moveLeftOrRightAll(document.ele.SrcSelect,document.ele.ObjSelect)">
								>>
							</button>
							<br>
							<button style="width: 60px;margin-top: 8px;"
								onclick="moveLeftOrRight(document.ele.SrcSelect,document.ele.ObjSelect)">
								>
							</button>
							<br>
							<button style="width: 60px;margin-top: 8px;"
								onclick="moveLeftOrRight(document.ele.ObjSelect,document.ele.SrcSelect)">
								<
							</button>
							<br>
							<button style="width: 60px;margin-top: 8px;"
								onclick="moveLeftOrRightAll(document.ele.ObjSelect,document.ele.SrcSelect)">
								<<
							</button>
						</td>
						<td>
							<select name=ObjSelect size=6 id="eleSelect"
								style="height: 250px; width: 120px;" multiple="multiple"
								ondblclick="moveLeftOrRight(document.ele.ObjSelect,document.ele.SrcSelect)">
							</select>
						</td>
						<td width="30px">
							<br>
							<br>
							<button style="height: 30px;" onclick="moveUp(document.ele.ObjSelect)">
								↑
							</button>
							<br>
							<br>
							<button style="height: 30px;margin-top: 8px;" onclick="moveDown(document.ele.ObjSelect)">
								↓
							</button>
							<br>
							<br>
						</td>
					</tr>
				</table>
			</form>
		</div>
		<div
			style="float: left; width: 46%; margin-left: 3%; margin-top: 5px;">
			<label style="color:blue;">
				业务信息：
			</label>
			<form name="box" onsubmit="return false">
				<table>
					<tr>
						<td>
							<select name=SrcSelect size=15
								style="height: 250px; width: 120px;" multiple="multiple"
								ondblclick="moveLeftOrRight(document.box.SrcSelect,document.box.ObjSelect)">
								<option value="NATION_ID">
									国别
								</option>
								<option value="PROVINCE_ID">
									省/州
								</option>
								<option value="TRGPORT_ID">
									目的港
								</option>
								<option value="CLAUSE_ID">
									价格条款
								</option>
								<option value="COMMISION_TYPE_ID">
									佣金类型
								</option>
								<option value="COMMISION_SCALE">
									比例
								</option>
								<option value="PAY_TYPE_ID">
									付款方式
								</option>
								<option value="CUST_TYPE_ID">
									客户类型
								</option>
								<option value="CUST_LV_ID">
									客户等级
								</option>
								<option value="COOPERATE_LV">
									配合程度
								</option>
								<option value="ship_info">
									船贷信息
								</option>
								<option value="cust_web">
									企业网站
								</option>
								<option value="cust_from">
									客户来源
								</option>
								<option value="culture_background">
									文化背景
								</option>
								<option value="CUSTOMER_REMARK">
									备注
								</option>
							</select>
						</td>
						<td width="30px">
							<button style="width: 60px;"
								onclick="moveLeftOrRightAll(document.box.SrcSelect,document.box.ObjSelect)">
								>>
							</button>
							<br>
							<button style="width: 60px;margin-top: 8px;"
								onclick="moveLeftOrRight(document.box.SrcSelect,document.box.ObjSelect)">
								>
							</button>
							<br>
							<button style="width: 60px;margin-top: 8px;"
								onclick="moveLeftOrRight(document.box.ObjSelect,document.box.SrcSelect)">
								<
							</button>
							<br>
							<button style="width: 60px;margin-top: 8px;"
								onclick="moveLeftOrRightAll(document.box.ObjSelect,document.box.SrcSelect)">
								<<
							</button>
						</td>
						<td>
							<select name=ObjSelect size=6 id="boxSelect"
								style="height: 250px; width: 120px;" multiple="multiple"
								ondblclick="moveLeftOrRight(document.box.ObjSelect,document.box.SrcSelect)">
							</select>
						</td>
						<td width="30px">
							<br>
							<br>
							<button style="height: 30px;" onclick="moveUp(document.box.ObjSelect)">
								↑
							</button>
							<br>
							<br>
							<button style="height: 30px;margin-top: 8px;" onclick="moveDown(document.box.ObjSelect)">
								↓
							</button>
							<br>
							<br>
						</td>
					</tr>
				</table>
			</form>
		</div>
		<!----------------------- 保存取消按钮 ---------------------------------->
		<div style="width: 100%; margin-top: 10;" align="center">
			<a onclick="downLoad()" style="cursor: hand;"><img id="addBtn"
					src="<%=path %>/common/images/_save.gif" border="0" height="21px"
					width="61px"> </a>&nbsp;
			<a onclick="closeWin()" style="cursor: hand;"><img
					src="<%=path %>/common/images/_cancel.gif" border="0" height="21px"
					width="61px"> </a>
		</div>
	</body>
</html>
