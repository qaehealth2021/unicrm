/**
 * 
 */
package com.sail.cot.common.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Hashtable;
import java.util.Properties;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;

import org.apache.commons.beanutils.BeanUtilsBean;
import org.apache.commons.beanutils.ConvertUtilsBean;
import org.apache.commons.beanutils.PropertyUtilsBean;
import org.apache.commons.beanutils.converters.DateConverter;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.jason.core.Application;
import com.sail.cot.constants.Constants;

/**
 * <p>Title: Ext+DWR+Spring</p>
 * <p>Description:获取Spring Bean对象的工具类</p>
 * <p>Copyright: Copyright (c) 2008</p>
 * <p>Company: </p>
 * <p>Create Time: Jul 9, 2008 4:19:03 PM </p>
 * @author achui
 *
 */

public class ContextUtil {

	/**
	 * @param name:bean对象名
	 * @return
	 * Object
	 */
	private static Hashtable<String, Properties> propList = new Hashtable<String, Properties>();
	private static Logger logger = Log4WebUtil.getLogger(ContextUtil.class);

	public static Object getBean(String name) {
		return Application.getInstance().getContainer().getComponent(name);
	}

	/**
	 * @param filename
	 * @param key
	 * @return
	 * String
	 * 用法:
	 * String strEjbAddress = ContextUtil.getProperty("sysconfig.properties",
				"ftpimgpath");

	 * 
	 */
	public static String getProperty(String filename, String key) {
		Properties p = null;
		if (propList.containsKey(filename))
			p = propList.get(filename);
		else {
			p = new Properties();
			try {
				p.load(ContextUtil.class.getResourceAsStream("/" + filename));
				propList.put(filename, p);
			} catch (IOException e) {
				e.printStackTrace();
			}

		}
		return p.getProperty(key);

	}

	/**
	 * 描述：获取系统tomcat的路径
	 * @return
	 * 返回值：String
	 */
	public static String getTomcatHome() {
		String tomcatHome = System.getProperty("catalina.base");
		//有配置负载均衡时
		if(isLoadBalnace()){
			tomcatHome = getProperty("common.properties","TOMCAT_UPLOAD_SERVER");
		}
		//没有取到系统的tomcat路径，就取环境变量的Tomcat路径，注意大小写
		if (StringUtils.isEmpty(tomcatHome)) {
			tomcatHome = System.getenv("TOMCAT_HOME");
		}
		if (StringUtils.isEmpty(tomcatHome)) {
			return null;
		}
		tomcatHome = tomcatHome.replace("\\", "/");
		return tomcatHome + "/";
	}

	public static boolean isLoadBalnace(){
		String isUseLoadBalnace = getProperty("common.properties","USE_LOAD_BALANCE");
		//有配置负载均衡时
		if(StringUtils.isNotEmpty(isUseLoadBalnace) && Boolean.valueOf(isUseLoadBalnace)){
			return true;
		}
		return false;
	}
	/**
	 * 描述：获取项目路径
	 * @return
	 * 返回值：String
	 */
	public static String getProjectHome() {
		String classPath = ContextUtil.class.getResource("/").toString();
		String systemPath = classPath.substring(6, classPath.length() - 16);
		return systemPath;
	}

	public static String getLocalTomcatHome(){
		String tomcatHome = System.getProperty("catalina.base");
		//没有取到系统的tomcat路径，就取环境变量的Tomcat路径，注意大小写
		if (StringUtils.isEmpty(tomcatHome)) {
			tomcatHome = System.getenv("TOMCAT_HOME");
		}
		if (StringUtils.isEmpty(tomcatHome)) {
			return null;
		}
		return tomcatHome + File.separator;
	}
	public static String getLocalTomcatSubPath(String fileName) {
		String tomcatHome = getLocalTomcatHome();
		if (tomcatHome == null)
			return null;
		File file = new File(tomcatHome + Constants.DEFAULT_UPLOAD_FILE + fileName);
		if (!file.exists()) {
			file.mkdir();
		}
		return tomcatHome + Constants.DEFAULT_UPLOAD_FILE + fileName + File.separator;
	}
	/**
	 * 描述：生成并返回tomcat目录下的子目录
	 * @param fileName 需要生成的文件名
	 * @return 文件路径
	 * 返回值：String
	 */
	public static String getTomcatSubPath(String fileName) {
		String tomcatHome = getTomcatHome();
		if (tomcatHome == null)
			return null;
		File file = new File(tomcatHome + Constants.DEFAULT_UPLOAD_FILE + fileName);
		if (!file.exists()) {
			file.mkdir();
		}
		return tomcatHome + Constants.DEFAULT_UPLOAD_FILE + fileName + File.separator;
	}
	/**
	 * 复制文件，路径都为绝对地址
	 * @param path
	 * @param toPath
	 * @return
	 */
	public static boolean copyRealFile(String path,String toPath){
		try {
			// 获得tomcat路径
			File inputFile = new File(path);// 定义读取源文件
			File outputFile = new File(toPath);// 定义拷贝目标文件
			int lastIndex = toPath.lastIndexOf("/");
			if(lastIndex!=-1){
				String dirName = toPath.substring(0,lastIndex);
				String[] dirs = dirName.split("/");
				String dirPath ="";
				for(int i=0;i<dirs.length;i++){
					dirPath += dirs[i]+"/";
					File dir=new File(dirPath);  
					if(!dir.exists()){
						if(!dir.mkdir()){
							throw new Exception("文件目录无法创建！");
						}
					}
				}
			}
			// 定义输入文件流
			FileInputStream in = new FileInputStream(inputFile);
			// 将文件输入流构造到缓存
			BufferedInputStream bin = new BufferedInputStream(in);
			// 定义输出文件流
			FileOutputStream out = new FileOutputStream(outputFile);
			// 将输出文件流构造到缓存
			BufferedOutputStream bout = new BufferedOutputStream(out);
			int c;
			byte[] buf = new byte[1024];
			// 循环读取文件和写入文件
			while ((c = bin.read(buf)) != -1)
				bout.write(buf,0,c);
			// 关闭输入输出流，释放资源
			bin.close();
			bout.close();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	/**
	 * 删除文件，目录为绝对地址
	 * @param path
	 */
	public static void deleteRealFile(String path) {
		// 获得tomcat路径
		File file = new File(path);// 定义读取源文件
		if (file.exists()) {
			file.delete();
		}
	}
	/**
	 * 复制文件，以上传目录为基本目录
	 * @param path
	 * @param toPath
	 * @return
	 */
	public static boolean copyUploadFile(String path,String toPath){
		try {
			path = ContextUtil.getLocalTomcatHome() + Constants.DEFAULT_UPLOAD_FILE + path;
			toPath = ContextUtil.getLocalTomcatHome() + Constants.DEFAULT_UPLOAD_FILE + toPath;
			// 获得tomcat路径
			File inputFile = new File(path);// 定义读取源文件
			File outputFile = new File(toPath);// 定义拷贝目标文件
			int lastIndex = toPath.lastIndexOf("/");
			if(lastIndex!=-1){
				String dirName = toPath.substring(0,lastIndex);
				String[] dirs = dirName.split("/");
				String dirPath ="";
				for(int i=0;i<dirs.length;i++){
					dirPath += dirs[i]+"/";
					File dir=new File(dirPath);  
					if(!dir.exists()){
						if(!dir.mkdir()){
							throw new Exception("文件目录无法创建！");
						}
					}
				}
			}
			// 定义输入文件流
			FileInputStream in = new FileInputStream(inputFile);
			// 将文件输入流构造到缓存
			BufferedInputStream bin = new BufferedInputStream(in);
			// 定义输出文件流
			FileOutputStream out = new FileOutputStream(outputFile);
			// 将输出文件流构造到缓存
			BufferedOutputStream bout = new BufferedOutputStream(out);
			int c;
			// 循环读取文件和写入文件
			while ((c = bin.read()) != -1)
				bout.write(c);
			// 关闭输入输出流，释放资源
			bin.close();
			bout.close();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	/**
	 * 删除文件，以上传目录为基本目录
	 * @param path
	 */
	public static void deleteUploadFile(String path) {
		// 获得tomcat路径
		path = ContextUtil.getTomcatHome() + Constants.DEFAULT_UPLOAD_FILE + path;
		File file = new File(path);// 定义读取源文件
		if (file.exists()) {
			file.delete();
		}
	}
	/**
	 * 获得系统当前时间
	 * @param formate
	 * @return
	 */
	public static Date getCurrentDate() {
		Calendar rightNow = Calendar.getInstance();
		Date now = rightNow.getTime();
		return now;
	}
	/**
	 * 获得系统当前时间
	 * @param formate
	 * @return
	 */
	public static String getCurrentFormateDate(String formate) {
		SimpleDateFormat sdf = new SimpleDateFormat(formate);
		Calendar rightNow = Calendar.getInstance();
		Date now = rightNow.getTime();
		String today = sdf.format(now).toString();
		return today;
	}
	
	// 用序列化与反序列化实现深克隆 
	public static Object deepClone(Object src) {
		Object o = null;
		try {
			if (src != null) {
				ByteArrayOutputStream baos = new ByteArrayOutputStream();
				ObjectOutputStream oos = new ObjectOutputStream(baos);
				oos.writeObject(src);
				oos.close();

				ByteArrayInputStream bais = new ByteArrayInputStream(baos
						.toByteArray());
				ObjectInputStream ois = new ObjectInputStream(bais);

				o = ois.readObject();
				ois.close();
			}

		} catch (IOException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		return o;
	}
	
	/**
	 * @see 功能描述（必填）：根据name参数，获取ehcache.xml中配置的缓存框架
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 11, 2011 11:56:24 AM</p>
	 * @param name
	 * @return
	 * 返回值：CacheManager
	 */
	public static Cache getCacheManager(String name){
		URL url = ContextUtil.class.getResource("/ehcache.xml");
		CacheManager manager = CacheManager.create(url);
		return manager.getCache(name);
	}
	
	/**
	 * 
	 * @see 功能描述（必填）：新建一个clzz的实例,把element的值填充进去,并把id清空
	 * <p>返回值：Object</p>
	 * @see <p>Author:azan</p>
	 * @see <p>Create Time:2012-4-18 下午12:01:30</p>
	 * @param element
	 * @param clzz
	 * @return
	 * @throws Exception
	 */
	public static Object changeObj(Object element, String clzz) throws Exception {
		Class cl = Class.forName("com.sail.cot.domain." + clzz);
		Object object = cl.newInstance();
		// 因为要注册converter,所以不能再使用BeanUtils的静态方法了，必须创建BeanUtilsBean实例
		//		BeanUtils.copyProperties(object, element);
		ConvertUtilsBean convertUtils = new ConvertUtilsBean();

		//通过ConvertUtils自定义转换日期类型  
		convertUtils.register(new DateConverter(null), Date.class);

		BeanUtilsBean beanUtils = new BeanUtilsBean(convertUtils, new PropertyUtilsBean());

		beanUtils.copyProperties(object, element);
		
		beanUtils.setProperty(object,"id",null);
		return object;
	}
	
	/**
	 * @see 功能描述（必填）：当处于集群模式下，通过HTTP的方式获取需要下载文件的流，否则直接获取本地的数据流
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 6, 2012 2:31:41 PM</p>
	 * @param path:文件的相对路径（不能是目录）
	 * @param fullPath:本地文件的绝对路径（不能是目录）
	 * @return
	 * 返回值：文件流
	 */
	public static InputStream getDownloadInputStream(String path,String fullPath){
		InputStream is = null;
		try {
			String  uploadServer = getProperty("common.properties", "TOMCAT_UPLOAD_SERVER");
			//集群模式下，通过http获取文件流
			if(StringUtils.isNotEmpty(uploadServer) && ContextUtil.isLoadBalnace()){
				URL url = new URL(uploadServer+"/"+Constants.DEFAULT_UPLOAD_PROJ+"/"+path);
				URLConnection connection= url.openConnection();
				HttpURLConnection httpUrlConnection = (HttpURLConnection) connection;
				httpUrlConnection.setDoOutput(true);
				httpUrlConnection.setRequestMethod("GET");
				httpUrlConnection.connect();
				if(httpUrlConnection.getResponseCode() != 200){
					//文件不存在
					return null;
				}
				is = httpUrlConnection.getInputStream();
			}else {
				if(fullPath == null)
					fullPath = ContextUtil.getLocalTomcatHome()+Constants.DEFAULT_UPLOAD_FILE+path;
				File file = new File(fullPath) ;
				if(file.exists()){
					is = new FileInputStream(new File(fullPath));
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return is;
	}
	
	/**
	 * @see 功能描述（必填）：充远程服务器下载文件到本地，返回本地的文件的绝对路径
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 20, 2012 4:49:58 PM</p>
	 * @param filePath
	 * @param fullPath
	 * @return
	 * 返回值：String
	 */
	public static String getFileFromRemoteToLocal(String filePath,String fullPath){
		if(fullPath == null)
			fullPath = ContextUtil.getLocalTomcatHome() + Constants.DEFAULT_UPLOAD_FILE+filePath;
		if(!ContextUtil.isLoadBalnace())
			return fullPath;
		InputStream fs = ContextUtil.getDownloadInputStream(filePath,fullPath);
		FileOutputStream os = null;
		try {
			//将文件写入本地
			File desFile = new File(fullPath);
			os = new FileOutputStream(desFile);
			if(fs != null){
				byte[] buf = new byte[1024];
				int len = 0; // 已经成功读取的字节的个数
				while ((len = fs.read(buf)) != -1) {
					 //处理代码
					 os.write(buf,0,len); //注意需要使用len,因为可能到达文件末尾前，最后一次循环数据可能不足1024，实际只有len个字节。
				}
				fs.close();
				os.close();
				return fullPath;
			}
		} catch (Exception e) {
			logger.error("获取远程文件异常:"+e.getMessage());
			e.printStackTrace();
		}
		return "";
	}
}
