package com.sail.cot.service.system.icon;

import java.io.File;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sail.cot.common.dao.CotBaseDao;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.constants.Constants;
import com.sail.cot.entity.IconNode;
import com.sail.cot.query.QueryInfo;

@Service("IconManager")
@Transactional
public class IconManager{
	
	@Resource
	private CotBaseDao baseDao;
	
    public CotBaseDao getBaseDao() {
		return baseDao;
	}

	public void setBaseDao(CotBaseDao baseDao) {
		this.baseDao = baseDao;
	}

	// 模拟查询操作
    public static Map query(Integer start,Integer limit) {
    	String iconUrl=ContextUtil.getTomcatSubPath(Constants.ICON);
    	Map map = new HashMap();
    	File root = new File(iconUrl);
    	File[] icons = root.listFiles();
    	if(icons==null){
    		map.put("total",0);
    		map.put("list",null);
    		return map;
    	}
    	map.put("total",icons.length);
    	List list =new ArrayList();
    	Integer total=start+limit;
    	if(total>icons.length){
    		total=icons.length;
    	}
//    	String tomcatHome = ContextUtil.getTomcatHome();
    	for (int i = start; i < total; i++) {
    		File icon = icons[i];
    		IconNode iconNode = new IconNode();
    		System.out.println(icon.getName());
    		iconNode.setPicName(icon.getName());
    		String path =Constants.DEFAULT_UPLOAD_PROJ + File.separator
					+ Constants.ICON + File.separator + icon.getName();
			iconNode.setPicPath(path);
    		
    		iconNode.setUse(true);
    		list.add(iconNode);
		}
    	map.put("list", list);
    	return map;
    }
   
    /**
	 * 
	 * @Description：删除图标文件,并把菜单表的icon url清null
	 * @Flow：
	 * @Example：
	 * @Files：
	 * @author:azan
	 * @Create:2011-12-27 下午03:35:57
	 * @param names
	 * @throws Exception void【】
	 */
	public void deleteIcons(List<String> names) throws Exception {
		String tmp="";
		for (int i = 0; i < names.size(); i++) {
			// 修改所有引用该文件的地址为 "没有图片"
			String hql = "update CotModule obj set obj.moduleImgurl=null where obj.moduleImgurl=:moduleImgurl";
			Map map = new HashMap();
			map.put("moduleImgurl", names.get(i));
			QueryInfo queryInfo = new QueryInfo();
			queryInfo.setSelectString(hql);
			this.getBaseDao().executeUpdate(queryInfo, map, null);
			tmp+=names.get(i)+",";
		}
		
		// 删除文件服务器的图片
		String tomcatHome = ContextUtil.getTomcatHome();
    	String str = tomcatHome+"/servlet/deleteLocalFileServlet?fileName=" +Constants.ICON+"&names="+tmp;
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
		is.close();
	}
}