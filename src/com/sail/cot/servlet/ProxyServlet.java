package com.sail.cot.servlet;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

public class ProxyServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		String servletName = req.getParameter("servletName");
		String isSms = req.getParameter("isSms");
		resp.setContentType("text/html;charset=utf-8");
		resp.setCharacterEncoding("utf-8");
		String str = "http://" + servletName;
		if (isSms != null) {
			String mobile = req.getParameter("mobile");
			String msg = req.getParameter("msg");
			String user = "unilogistics";
			String pwd = "773030";
			str = "http://www.xmfree.net:10085/shttp.recmt?ua=" + user + "&pw="
					+ pwd + "&gwid=1&subcode=rtf&mobile=" + mobile + "&msg="
					+ msg;
		}
		URL url = new URL(str);
		URLConnection connection = url.openConnection();
		HttpURLConnection httpUrlConnection = (HttpURLConnection) connection;
		httpUrlConnection.setDoOutput(true);
		httpUrlConnection.setRequestMethod("GET");
		httpUrlConnection.connect();
		// 获得回馈相应，是个XML格式
		InputStream is = httpUrlConnection.getInputStream();
		byte[] b = new byte[is.available()];
		is.read(b);
		String str1 = new String(b, "UTF-8");
		String result = this.readStringXmlOut(str1);
		System.out.println(result);
		is.close();
		JSONObject json = new JSONObject();
		if("发送成功".equals(str1)){
			json.put("success", true);
		}else{
			json.put("success", false);
		}
		json.put("msg", result);
		resp.getWriter().write(json.toString());
	}

	/**
	 * @description result值 含义 1 发送成功 -1 帐号或密码为空 -2 下发号码为空 -3 下发内容为空 -5 下发号码错误
	 *              -9 没有指定通道 -10 下发账户已停用 -11 下发账户余额不足 -17 密码错误次数超限 -18 密码错误 -19
	 *              账户类型不符 -20 单次提交超过规定限额 -99 系统异常
	 * @param xml
	 * @return String
	 */
	public String readStringXmlOut(String xml) {
		Document doc = null;
		try {
			doc = DocumentHelper.parseText(xml);
			Element rootElt = doc.getRootElement(); // 获取根节点
			Integer result = Integer
					.parseInt(rootElt.elementTextTrim("Result"));
			System.out.println("Result：" + result);
			switch (result) {
			case -1:
				return "短信帐号或密码为空";
			case -2:
				return "短信号码为空";
			case -3:
				return "短信内容不能为空";
			case -5:
				return "短信号码错误";
			case -9:
				return "没有指定通道";
			case -10:
				return "短信账户已停用";
			case -11:
				return "短信账户余额不足,不能再发短信";
			case -17:
				return "短信帐号密码错误次数超限";
			case -18:
				return "短信帐号密码错误";
			case -19:
				return "短信账户类型不符";
			case -20:
				return "单次提交超过规定限额";
			case -99:
				return "系统异常";
			default:
				break;
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return "发送成功";
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		this.doGet(req, resp);
	}
}