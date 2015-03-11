/**
 * 
 */
package com.sail.cot.service;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang.StringUtils;
import org.directwebremoting.WebContext;
import org.directwebremoting.WebContextFactory;
import org.springframework.stereotype.Service;

import com.sail.cot.common.commoninterface.DownloadBaseService;
import com.sail.cot.common.dao.CotBaseDao;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.common.util.StringUtil;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotEmps;
import com.sail.cot.domain.CotOrderNo;
import com.sail.cot.util.CacheUtil;
import com.zhao.mail.util.MailServiceConstants;

@Service("BaseData")
public class BaseData {

	@Resource
	private CotBaseDao baseDao;

	public CotBaseDao getBaseDao() {
		return baseDao;
	}

	public void setBaseDao(CotBaseDao baseDao) {
		this.baseDao = baseDao;
	}

	private DownloadBaseService downloadBaseService;

	@Resource(name = "BaseService")
	public void setDownloadBaseService(DownloadBaseService downloadBaseService) {
		this.downloadBaseService = downloadBaseService;
	}

	public DownloadBaseService getDownloadBaseService() {
		return downloadBaseService;
	}

	/**
	 * 描述： 获取所有基础数据
	 * 
	 * @param tbName
	 *            需要进行查询的表的对象，如CotDept，CotCompany等
	 * @return 返回值：List
	 */
	public List getBaseDicList(String tbName) {
		List res = this.getBaseDao().getRecords(tbName);
		return res;
	}

	/**
	 * 描述：获取所有基础数据
	 * 
	 * @param tbName
	 *            需要进行查询的表的对象，如CotDept，CotCompany等
	 * @param key
	 *            需要获取的key值，对应tbName对象中是属性
	 * @param value
	 *            需要获取的value值，对应tbName对象中是属性
	 * @param queryParams
	 *            需要查询的条件（json字符串）
	 * @return 返回值：Map 按ID，value 形式组合的Map 调用：以CotDept为例
	 *         getBaseDicDataMap("CotDept","id" ,"deptName")
	 * @throws ServletException
	 */
	public Map getBaseDicDataMap(String tbName, String key, String value,
			String queryParams) throws ServletException {
		JSONObject jsonObject = null;
		List res = null;
		if (StringUtils.isEmpty(queryParams))
			res = this.getBaseDao().getRecords(tbName);
		else {
			jsonObject = JSONObject.fromObject(queryParams);
			Iterator<String> iterator = jsonObject.keys();
			String hql = " from " + tbName + " obj where 1=1 ";
			while (iterator.hasNext()) {
				String queryKey = iterator.next();
				// String queryValue = jsonObject.getString(key);
				String queryValue = jsonObject.getString(queryKey);
				hql += " and obj." + queryKey + " = '" + queryValue + "' ";
			}
			res = this.getBaseDao().find(hql);
		}

		Map map = new HashMap();
		try {

			Class clzz = Class.forName("com.sail.cot.domain." + tbName);
			for (int i = 0; i < res.size(); i++) {
				Object obj = clzz.newInstance();
				obj = res.get(i);
				String keyAttr = BeanUtils.getProperty(obj, key);
				String valueAttr = BeanUtils.getProperty(obj, value);
				map.put(keyAttr, valueAttr);
			}

		} catch (Exception ex) {
			ex.printStackTrace();
			throw new ServletException();
		}
		return map;
	}

	/**
	 * 
	 * @Description：获得当前登录员工
	 * @Flow：
	 * @Example：
	 * @Files：
	 * @author:azan
	 * @Create:2012-1-12 上午09:51:52
	 * @return CotEmps【】
	 * @throws ServiceException
	 */
	public CotEmps getCurrentEmps() throws ServiceException {

		WebContext ctx = WebContextFactory.get();
		HttpSession session = ctx.getSession();
		HttpServletRequest request = ctx.getHttpServletRequest();
		CotEmps currEmp = (CotEmps) session.getAttribute(Constants.SESSION_EMP);
		if (currEmp == null) {
			// 如果session没有存在，就去cookies中的数据
			Cookie[] cookies = request.getCookies();
			Object empStr = null;
			for (Cookie cookie : cookies) {
				if (Constants.COOKIE_CURRENT_EMP.equalsIgnoreCase(cookie
						.getName())) {
					empStr = cookie.getValue();
					break;
				}
			}
			if (empStr != null) {
				try {
					empStr = URLDecoder.decode(empStr.toString(), "utf-8");
				} catch (UnsupportedEncodingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				JSONObject json = JSONObject.fromObject(empStr);
				currEmp = (CotEmps) JSONObject.toBean(json, CotEmps.class);
			}
		}
		if (currEmp == null)
			throw new ServiceException("登录超时,请重新登录");
		return currEmp;
	}

	/**
	 * 
	 * @see 功能描述（必填）：通过dwr获得session参数
	 *      <p>
	 *      返回值：Object[]
	 *      </p>
	 * @see <p>
	 *      Author:azan
	 *      </p>
	 * @see <p>
	 *      Create Time:2012-2-20 上午11:15:12
	 *      </p>
	 * @return 数组的第一个值为当前登陆的员工对象;第2个值为全局id
	 * @throws ServiceException
	 */
	public Object[] getSessionByDwr() throws ServiceException {
		WebContext ctx = WebContextFactory.get();
		HttpSession session = ctx.getSession();
		HttpServletRequest request = ctx.getHttpServletRequest();
		CotEmps currEmp = null;
		// 如果session没有存在，就去cookies中的数据
		Cookie[] cookies = request.getCookies();
		Object empStr = null;
		for (Cookie cookie : cookies) {
			if (Constants.COOKIE_CURRENT_EMP.equalsIgnoreCase(cookie.getName())) {
				empStr = cookie.getValue();
				break;
			}
		}
		if (empStr != null) {
			try {
				empStr = URLDecoder.decode(empStr.toString(), "utf-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			JSONObject json = JSONObject.fromObject(empStr);
			currEmp = (CotEmps) JSONObject.toBean(json, CotEmps.class);
		}
		if (currEmp == null) {
			currEmp = (CotEmps) session.getAttribute(Constants.SESSION_EMP);
		}
		if (currEmp == null)
			throw new ServiceException("登录超时,请重新登录");
		
		String rdm=(String)session.getAttribute(Constants.LOGIN_RAM);
		
		Object[] obj = new Object[3];
		obj[0] = currEmp;
		obj[1] = 1;
		obj[2] = rdm;
		return obj;
	}

	/**
	 * 
	 * @see 功能描述（必填）：获得某种数值需要保留的小数位
	 *      <p>
	 *      返回值：Integer
	 *      </p>
	 * @see <p>
	 *      Author:azan
	 *      </p>
	 * @see <p>
	 *      Create Time:2012-4-12 下午4:49:23
	 *      </p>
	 * @param cacheKey
	 * @return
	 * @throws ServiceException
	 */
	public Integer getPrecisionByKey(String cacheKey) throws ServiceException {
		Object[] obj = this.getSessionByDwr();
		return CacheUtil.getPrecisionByKey(cacheKey.toUpperCase() + "_"
				+ obj[1]);
	}

	private String replaceFileName(String filePath, String downJson) {
		String fileName = FilenameUtils.getName(filePath);
		if (downJson != null) {
			JSONObject json = JSONObject.fromObject(downJson);
			String expFileName = json.getString("expFileName");// 需要生成的文件名
			if (StringUtils.isNotEmpty(expFileName)) {
				String extend = FilenameUtils.getExtension(fileName);// 扩展名
				fileName = expFileName + "." + extend;
			}
		}
		return fileName;
	}

	// 保存并获取邮件对象Id
	public String getRpt(String downJson) {
		JSONObject json = JSONObject.fromObject(downJson);
		String filePath = downloadBaseService.downloadJasperReport(json.getString("filepath"),
				downJson);
		System.out.println(filePath);
		
		String fileName = StringUtil.takeOutFileName(filePath);
		String postfixName = fileName.lastIndexOf(".") == -1 ? ""
				: fileName.substring(fileName.lastIndexOf("."));
		String fileN=fileName.substring(0,fileName.lastIndexOf("."));
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		fileName = fileN+"_"+sdf.format(new Date()) + postfixName;
		String path = ContextUtil.getLocalTomcatHome()
				+ Constants.DEFAULT_UPLOAD_FILE + "faxsend";
		String ph=path+"/"+fileName;
		//把文件拷贝到传真待发送文件夹
		try{
			File inputFile=new File(filePath);//定义读取源文件
			File outputFile =new File(ph);//定义拷贝目标文件
			//定义输入文件流 
			FileInputStream in=new FileInputStream(inputFile);
			//将文件输入流构造到缓存
			BufferedInputStream bin=new BufferedInputStream(in);
						//定义输出文件流   
			FileOutputStream out=new FileOutputStream(outputFile);
			//将输出文件流构造到缓存
			BufferedOutputStream bout=new BufferedOutputStream(out);
			int c;
			//循环读取文件和写入文件   
			while((c=bin.read())!= -1)
			bout.write(c);
			 //关闭输入输出流，释放资源   
			bin.close();
			bout.close();
		}catch(IOException e){
			e.printStackTrace();
		} 

		return "faxsend/"+fileName;
	}

	// 保存并获取邮件对象Id
	public String saveMail(String downJson) {
		//WebContext ctx=WebContextFactory.get();
		//String path = req.getParameter("filepath");
		JSONObject json = JSONObject.fromObject(downJson);
		String path = (String)json.remove("rptFile");
		String filePath = downloadBaseService.downloadJasperReport(path,downJson);
		
		JSONObject attach = new JSONObject();
		File file = new File(filePath);
		String mailAttachPath = MailServiceConstants.MAIL_FILE_BASEPATH + MailServiceConstants.MAIL_ATTACH_TEMP_SEND_PATH;
		File destFile = new File(mailAttachPath+File.separator+file.getName());
		try {
			FileUtils.copyFile(file, destFile);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		attach.put("name", file.getName());
		attach.put("size", file.length());
		attach.put("url",  MailServiceConstants.MAIL_ATTACH_TEMP_SEND_PATH+file.getName());
		//String fileName = this.replaceFileName(filePath, downJson);
		//this.setDownloadResponseHeader(resp, fileName);
		//File file = new File(filePath);
		//this.downLoadByDataIps(resp, file, true);
		return attach.toString();
	}

	public void saveOrderNo(CotOrderNo orderNo){
		//往订单单号表中插入一条数据,用于关联订单时查找
		try {
			String hql = " from CotOrderNo where orderNo = :orderNo and custId=:custId";
			Map<String, Object> whereMap = new HashMap<String, Object>();
			whereMap.put("orderNo", orderNo.getOrderNo());
			whereMap.put("custId", orderNo.getCustId());
			List list = this.getBaseDao().findRecordsByHql(hql,whereMap);
			List orderList = new ArrayList();
			//如果不存在就添加
			if(CollectionUtils.isEmpty(list)){
				orderList.add(orderNo);
			}else{
				//存在做更新
				CotOrderNo orderNoNew = (CotOrderNo)list.get(0);
				orderNoNew.setPod(orderNo.getPod());
				orderNoNew.setPol(orderNo.getPol());
				orderNoNew.setAirRemark(orderNo.getAirRemark());
				orderNoNew.setRemark(orderNo.getRemark());
				orderList.add(orderNoNew);
			}
			this.getBaseDao().saveOrUpdateRecords(orderList);
		} catch (Exception e) {
			e.printStackTrace();
		}
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
	
	/**
	 * @see 功能描述（必填）：获取tomcat的上传路径，在负载均衡时候需要用到
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Nov 6, 2012 10:09:42 AM</p>
	 * @return
	 * 返回值：String
	 */
	public static String getUploadServer(){
		String uploadAddr = ContextUtil.getProperty("common.properties", "TOMCAT_UPLOAD_ADDR");
		if(ContextUtil.isLoadBalnace()){
			return uploadAddr;
		}else {
			return null;
		}
	}
}
