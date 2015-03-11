/**
 * 
 */
package com.sail.cot.util;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;

import com.sail.cot.common.util.ContextUtil;

/**
 * 
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: 2012-3-26 上午11:44:07 </p>
 * <p>Class Name: CacheUtil.java </p>
 * @author azan
 *
 */
public class CacheUtil {

	/**
	 * Cache 缓存系统常用数据变量
	 */
	public static Cache systemCache;

	/**
	 * 
	 * @see 功能描述（必填）：获得系统缓存
	 * <p>返回值：Cache</p>
	 * @see <p>Author:azan</p>
	 * @see <p>Create Time:2012-4-12 上午11:35:01</p>
	 * @return
	 */
	public static Cache getSystemCache() {
		if(systemCache == null){
			String path = ContextUtil.class.getResource("/").getPath()+"ehcache.xml";
			CacheManager manager = CacheManager.create(path);
			systemCache = manager.getCache("systemCache");
		}
		return systemCache;
	}
	
	/**
	 * 
	 * @see 功能描述（必填）：储存保留的小数到缓存中
	 * <p>返回值：void</p>
	 * @see <p>Author:azan</p>
	 * @see <p>Create Time:2012-3-21 上午11:04:09</p>
	 * @param identity
	 */
	public static void initSystemCache(Integer identity) {
//		BaseSerivce baseSerivce = (BaseSerivce)ContextUtil.getBean("BaseService");
//		Cache cache = getSystemCache();
//		Element element = new Element("CBM_"+identity,4);
//		cache.put(element);
	}
	
	/**
	 * 
	 * @see 功能描述（必填）：获得某个数值需要保留的小数位
	 * <p>返回值：Integer</p>
	 * @see <p>Author:azan</p>
	 * @see <p>Create Time:2012-4-12 下午4:45:13</p>
	 * @param cacheKey
	 * @return
	 */
	public static Integer getPrecisionByKey(String cacheKey) {
//		Cache cache = getSystemCache();
//		Element element = cache.get(cacheKey);
//		if(element!=null)
//			return (Integer)element.getObjectValue();
//		else
//			return null;
		return null;
	}
}
