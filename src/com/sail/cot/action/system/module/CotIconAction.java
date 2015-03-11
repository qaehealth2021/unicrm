package com.sail.cot.action.system.module;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.entity.PageData;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.constants.Constants;
import com.sail.cot.entity.IconNode;
import com.sail.cot.service.system.icon.IconManager;
import com.sail.cot.util.GridServerHandler;

/**
 * 系统图标的action
 * <p>
 * Title: 旗航外贸管理软件V8.0
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Copyright: Copyright (c) 2011
 * </p>
 * <p>
 * Company: 厦门市旗航软件有限公司
 * </p>
 * <p>
 * Create Time: 2012-2-20 下午04:26:01
 * </p>
 * <p>
 * Class Name: CotIconAction.java
 * </p>
 * 
 * @author azan
 * 
 */
public class CotIconAction extends AbstractAction {

	public String goTo() {
		return "query";
	}

	// 模拟查询操作
	private static Map queryRemote(Integer start, Integer limit)
			throws IOException {
		// String iconUrl=ContextUtil.getTomcatSubPath(Constants.ICON);
		String tomcatHome = ContextUtil.getTomcatHome();
		String str = tomcatHome + "/servlet/ShowLocalFileServlet?fileName="
				+ Constants.ICON;

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
		System.out.println(str1);
		is.close();
		JSONObject json = JSONObject.fromObject(str1);
		boolean flag = (Boolean) json.get("success");
		Map map = new HashMap();
		if (!flag) {
			map.put("total", 0);
			map.put("list", null);
			return map;
		}
		String files = (String) json.get("files");
		String[] icons = files.split(",");
		map.put("total", icons.length);
		List list = new ArrayList();
		Integer total = start + limit;
		if (total > icons.length) {
			total = icons.length;
		}
		for (int i = start; i < total; i++) {
			String iconName = icons[i];
			IconNode iconNode = new IconNode();
			System.out.println(iconName);
			iconNode.setPicName(iconName);
			String path = tomcatHome + File.separator
					+ Constants.DEFAULT_UPLOAD_PROJ + File.separator
					+ Constants.ICON + File.separator + iconName;
			iconNode.setPicPath(path);
			iconNode.setUse(true);
			list.add(iconNode);
		}
		map.put("list", list);
		return map;

	}

	public String query() {
		// 分页参数
		PageData pageData = this.getPageData();
		System.out.println(pageData.getStart());
		System.out.println(pageData.getLimit());
		// Map
		// result=IconManager.query(pageData.getStart(),pageData.getLimit());
		try {
			boolean isLoadBalnace = ContextUtil.isLoadBalnace();
			Map result = null;
			if (isLoadBalnace) {
				result = this.queryRemote(pageData.getStart(),
						pageData.getLimit());
			} else {
				result = IconManager.query(pageData.getStart(),
						pageData.getLimit());
			}
			GridServerHandler gd = new GridServerHandler();
			gd.setData((List) result.get("list"));
			gd.setTotalCount(result.get("total") == null ? 0 : (Integer) result
					.get("total"));
			this.setJsonString(gd.getLoadResponseText());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}
}