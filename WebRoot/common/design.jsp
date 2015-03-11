<%@ page
	language="java"
	import="java.util.*"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
	<head>
		<base
			href="<%=basePath%>">
		<title>同步</title>
		<jsp:include
			page="/extcommon.jsp"></jsp:include>
		<script
			type="text/javascript"
			src="<%=path%>/common/js/leftRightSelect.js"></script>
	</head>
	<%
		String flag = request.getParameter("flag");
	%>
	<body
		style="background-color: #dfe8f6;">
		<div
			style="float: left; width: 46%; margin-left: 4%; margin-top: 5px;">
			<label
				style="color: blue;">
				样品基本信息：
			</label>
			<form
				name="ele"
				onsubmit="return false">
				<table>
					<tr>
						<td>
							<select
								name=SrcSelect
								size=12
								style="height: 250px; width: 120px;"
								multiple="multiple"
								ondblclick="moveLeftOrRight(document.ele.SrcSelect,document.ele.ObjSelect)">
								<option
									value="ele_name">
									中文品名
								</option>
								<option
									value="ele_name_en">
									英文品名
								</option>
								<option
									value="ele_color">
									颜色
								</option>
								<option
									value="cot_factory_ID">
									厂家
								</option>
								<option
									value="FACTORY_NO">
									工厂货号
								</option>
								<option
									value="cot_type_lv1_ID">
									材质
								</option>
								<option
									value="ele_flag">
									组成方式
								</option>
								<option
									value="ele_unitnum">
									套数
								</option>
								<option
									value="ele_unit">
									单位
								</option>
								<option
									value="ele_weight">
									单重
								</option>
								<option
									value="ele_grade">
									等级
								</option>
								<option
									value="ele_barcode">
									电脑标
								</option>
								<option
									value="ele_desc">
									产品描述
								</option>
								<option
									value="ele_from">
									产品来源
								</option>
								<option
									value="ele_mod">
									最小订量
								</option>
								<option
									value="ele_remark">
									产品备注
								</option>
								<option
									value="PRICE_FAC">
									生产价
								</option>
								<option
									value="price_fac_unit">
									生产价币种
								</option>
								<option
									value="PRICE_OUT">
									外销价
								</option>
								<option
									value="price_out_unit">
									外销价币种
								</option>
							</select>
						</td>
						<td
							width="30px">
							<button
								style="width: 60px;"
								onclick="moveLeftOrRightAll(document.ele.SrcSelect,document.ele.ObjSelect)">
								>>
							</button>
							<button
								style="width: 60px; margin-top: 8px;"
								onclick="moveLeftOrRight(document.ele.SrcSelect,document.ele.ObjSelect)">
								>
							</button>
							<button
								style="width: 60px; margin-top: 8px;"
								onclick="moveLeftOrRight(document.ele.ObjSelect,document.ele.SrcSelect)">
								<
							</button>
							<button
								style="width: 60px; margin-top: 8px;"
								onclick="moveLeftOrRightAll(document.ele.ObjSelect,document.ele.SrcSelect)">
								<<
							</button>
						</td>
						<td>
							<select
								name=ObjSelect
								size=6
								id="eleSelect"
								style="height: 250px; width: 120px;"
								multiple="multiple"
								ondblclick="moveLeftOrRight(document.ele.ObjSelect,document.ele.SrcSelect)">
							</select>
						</td>

					</tr>
				</table>
			</form>
		</div>
		<div
			style="float: left; width: 46%; margin-left: 3%; margin-top: 5px;">
			<label
				style="color: blue;">
				规格信息：
			</label>
			<form
				name="box"
				onsubmit="return false">
				<table>
					<tr>
						<td>
							<select
								name=SrcSelect
								size=15
								style="height: 250px; width: 120px;"
								multiple="multiple"
								ondblclick="moveLeftOrRight(document.box.SrcSelect,document.box.ObjSelect)">
								<option
									value="box_L">
									口径(mm)
								</option>
								<option
									value="box_W">
									厚度(mm)
								</option>
								<option
									value="box_H">
									深度(mm)
								</option>
								<option
									value="box_ib_L">
									内盒包装长
								</option>
								<option
									value="box_ib_w">
									内盒包装宽
								</option>
								<option
									value="box_ib_h">
									内盒包装高
								</option>
								<option
									value="box_mb_L">
									中盒包装长
								</option>
								<option
									value="box_mb_w">
									中盒包装宽
								</option>
								<option
									value="box_mb_h">
									中盒包装高
								</option>
								<option
									value="box_ob_L">
									外箱包装长
								</option>
								<option
									value="box_ob_w">
									外箱包装宽
								</option>
								<option
									value="box_ob_h">
									外箱包装高
								</option>
								<option
									value="box_pb_L">
									产品包装长
								</option>
								<option
									value="box_pb_w">
									产品包装宽
								</option>
								<option
									value="box_pb_h">
									产品包装高
								</option>
								<option
									value="BOX_REMARK_CN">
									中文包装
								</option>
								<option
									value="BOX_REMARK">
									英文包装
								</option>
								<option
									value="ele_cube">
									容积
								</option>
								<option
									value="ele_working_type">
									加工方式
								</option>
								<option
									value="ele_bottom_technics">
									底部工艺
								</option>
							</select>
						</td>
						<td
							width="30px">
							<button
								style="width: 60px;"
								onclick="moveLeftOrRightAll(document.box.SrcSelect,document.box.ObjSelect)">
								>>
							</button>
							<button
								style="width: 60px; margin-top: 8px;"
								onclick="moveLeftOrRight(document.box.SrcSelect,document.box.ObjSelect)">
								>
							</button>
							<button
								style="width: 60px; margin-top: 8px;"
								onclick="moveLeftOrRight(document.box.ObjSelect,document.box.SrcSelect)">
								<
							</button>
							<button
								style="width: 60px; margin-top: 8px;"
								onclick="moveLeftOrRightAll(document.box.ObjSelect,document.box.SrcSelect)">
								<<
							</button>
						</td>
						<td>
							<select
								name=ObjSelect
								size=6
								id="boxSelect"
								style="height: 250px; width: 120px;"
								multiple="multiple"
								ondblclick="moveLeftOrRight(document.box.ObjSelect,document.box.SrcSelect)">
							</select>
						</td>

					</tr>
				</table>
			</form>
		</div>

		<!----------------------- 保存取消按钮 ---------------------------------->
		<div
			style="margin-top: 20px; width: 100%; float: right;"
			align="center">
			<div
				style="width: 100%; margin-top: 10px;">
				<a
					onclick="javascript:parent.Ext.getCmp('excelDesignWin').downLoad()"
					style="cursor: hand;"><img
						id="addBtn"
						src="<%=path%>/common/images/_save.gif"
						border="0"
						height="21px"
						width="61px">
				</a>&nbsp;
				<a
					onclick="javascript:parent.Ext.getCmp('excelDesignWin').close()"
					style="cursor: hand;"><img
						src="<%=path%>/common/images/_cancel.gif"
						border="0"
						height="21px"
						width="61px">
				</a>
			</div>
		</div>
		<input
			type="hidden"
			id="flag"
			name="flag"
			value="<%=flag%>" />
	</body>
</html>
