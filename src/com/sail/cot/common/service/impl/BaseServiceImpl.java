/**
 * 
 */
package com.sail.cot.common.service.impl;

import java.io.File;
import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.commons.beanutils.BeanMap;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.RandomStringUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jason.core.exception.DAOException;
import com.sail.cot.common.commoninterface.DownloadBaseService;
import com.sail.cot.common.commoninterface.UploadBaseService;
import com.sail.cot.common.dao.CotBaseDao;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.report.CotExportRptService;
import com.sail.cot.common.service.BaseSerivce;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.common.util.ExceptionStackTracePaser;
import com.sail.cot.common.util.Log4WebUtil;
import com.sail.cot.common.util.StringUtil;
import com.sail.cot.constants.Constants;
import com.sail.cot.event.AbstractEventListener;
import com.sail.cot.query.QueryInfo;
import com.sail.cot.service.BaseData;
import com.sail.cot.util.AnnotationUtil;
import com.sail.cot.util.ConvertTypeUtil;
import com.sail.cot.util.GridServerHandler;

/**
 * <p>
 * Title: 旗航ERP管理系统（QHERP）
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Copyright: Copyright (c) 2010
 * </p>
 * <p>
 * Company:
 * </p>
 * <p>
 * Create Time: Jan 22, 2011 2:22:39 PM
 * </p>
 * <p>
 * Class Name: BaseServiceImpl.java
 * </p>
 * 
 * @author achui
 * 
 */
@Service("BaseService")
@Transactional
public class BaseServiceImpl implements BaseSerivce, UploadBaseService,
		DownloadBaseService {
	private CotBaseDao baseDao;
	private BaseData baseData;
	private Logger logger = Log4WebUtil.getLogger(BaseServiceImpl.class);

	public CotBaseDao getBaseDao() {
		return baseDao;
	}

	@Resource
	public void setBaseDao(CotBaseDao baseDao) {
		this.baseDao = baseDao;
	}

	public BaseData getBaseData() {
		return baseData;
	}
	@Resource
	public void setBaseData(BaseData baseData) {
		this.baseData = baseData;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gxn.oa.service.BaseSerivce#addList(java.util.List)
	 */
	public int addList(List objList) throws ServiceException {
		try {
			return this.getBaseDao().saveRecords(objList);
		} catch (DAOException e) {
			e.printStackTrace();
			logger.error(e);
			throw new ServiceException(e.getMessage());
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gxn.oa.service.BaseSerivce#addObj(java.lang.Object)
	 */
	public int addObj(Object obj) throws ServiceException {
		List res = new ArrayList();
		res.add(obj);
		return this.addList(res);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gxn.oa.service.BaseSerivce#callProc(java.lang.String,
	 *      java.lang.Object[])
	 */
	public Map callProc(String procedureName, SqlParameter[] sqlParameters,
			Map inParam) throws ServiceException {
		try {
			Map map = this.getBaseDao().callProc(procedureName,sqlParameters,inParam);
			return map;
		} catch (DAOException e) {
			e.printStackTrace();
			logger.error(e);
			throw new ServiceException(e.getMessage());
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gxn.oa.service.BaseSerivce#deleteList(java.util.List,
	 *      java.lang.String)
	 */
	public int deleteList(List ids, String objName) throws ServiceException {
		try {
			return this.getBaseDao().deleteRecordByIds(ids, objName);
		} catch (DAOException e) {
			e.printStackTrace();
			logger.error(e);
			throw new ServiceException(e.getMessage());
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gxn.oa.service.BaseSerivce#findRecords(com.gxn.oa.query.QueryInfo)
	 */
	public List findRecords(QueryInfo queryInfo) throws ServiceException {
		try {
			return this.getBaseDao().findRecordsEx(queryInfo);
		} catch (DAOException e) {
			e.printStackTrace();
			logger.error(e);
			throw new ServiceException(e.getMessage());
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gxn.oa.service.BaseSerivce#findRecords(com.gxn.oa.query.QueryInfo,
	 *      java.lang.Class)
	 */
	public List findRecords(QueryInfo queryInfo, Class clzz)
			throws ServiceException {
		try {
			return this.getBaseDao().findRecordsEx(queryInfo, clzz);
		} catch (DAOException e) {
			e.printStackTrace();
			logger.error(e);
			throw new ServiceException(e.getMessage());
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gxn.oa.service.BaseSerivce#findRecordsBySql(java.lang.String,
	 *      java.lang.Class)
	 */
	public List findRecordsBySql(String sql, Class clzz)
			throws ServiceException {
		return this.getBaseDao().findRecordsBySql(sql, clzz);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gxn.oa.service.BaseSerivce#getJsonData(com.gxn.oa.query.QueryInfo)
	 */
	public String getJsonData(QueryInfo queryInfo) throws ServiceException {
		try {
			return this.getBaseDao().getJsonDataEx(queryInfo);
		} catch (DAOException e) {
			e.printStackTrace();
			logger.error(e);
			throw new ServiceException(e.getMessage());
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gxn.oa.service.BaseSerivce#getJsonDataJDBC(com.gxn.oa.query.QueryInfo,
	 *      java.lang.Class)
	 */
	public String getJsonDataJDBC(QueryInfo queryInfo, Class clzz)
			throws ServiceException {
		try {
			return this.getBaseDao().getJsonDataJDBC(queryInfo, clzz);
		} catch (DAOException e) {
			e.printStackTrace();
			logger.error(e);
			throw new ServiceException(e.getMessage());
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gxn.oa.service.BaseSerivce#getList(java.lang.String)
	 */
	public List getList(String objName) throws ServiceException {
		try {
			return this.getBaseDao().getRecords(objName);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			throw new ServiceException(e.getMessage());
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gxn.oa.service.BaseSerivce#getObjById(java.lang.Long,
	 *      java.lang.Class)
	 */
	public Object getObjById(Serializable id, Class clzz) {
		return this.getBaseDao().getById(clzz, id);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.sail.cot.service.BaseSerivce#getObjById(java.io.Serializable,
	 *      java.lang.String)
	 */
	@SuppressWarnings("unchecked")
	public Object getObjByNameId(String id, String className)
			throws ServiceException {
		try {
			Class c = Class.forName("com.sail.cot.domain." + className);
			return this.getBaseDao().getById(c, Integer.valueOf(id));
		} catch (ClassNotFoundException e) {
			logger.error("类未找到", e);
			String msg = ExceptionStackTracePaser.paserStactTrace(e);
			throw new ServiceException("类未找到," + msg);
		}
	}

	public Object getObjByIntegerId(Integer id, String className)
			throws ServiceException {
		try {
			Class c = Class.forName("com.sail.cot.domain." + className);
			return this.getBaseDao().getById(c, id);
		} catch (ClassNotFoundException e) {
			logger.error("类未找到", e);
			String msg = ExceptionStackTracePaser.paserStactTrace(e);
			throw new ServiceException("类未找到," + msg);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gxn.oa.service.BaseSerivce#getRecordCount(com.gxn.oa.query.QueryInfo)
	 */
	public int getRecordCount(QueryInfo queryInfo) {
		return this.getBaseDao().getRecordsCountEx(queryInfo);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gxn.oa.service.BaseSerivce#modifyList(java.util.List)
	 */
	public int modifyList(List objList) throws ServiceException {
		try {
			return this.getBaseDao().updateRecords(objList);
		} catch (DAOException e) {
			e.printStackTrace();
			logger.error(e);
			throw new ServiceException(e.getMessage());
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gxn.oa.service.BaseSerivce#modifyObj(java.lang.Object)
	 */
	public int modifyObj(Object obj) throws ServiceException {
		List objList = new ArrayList();
		objList.add(obj);
		return this.modifyList(objList);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gxn.oa.service.BaseSerivce#saveOrUpdateList(java.util.List)
	 */
	public int saveOrUpdateList(List objList) throws ServiceException {
		try {
			return this.getBaseDao().saveOrUpdateRecords(objList);
		} catch (DAOException e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			String msg = ExceptionStackTracePaser.paserStactTrace(e);
			throw new ServiceException(msg);
		}
	}

	public Object saveOrUpdateObjRId(List objList) throws ServiceException {
		try {
			this.getBaseDao().saveOrUpdateRecords(objList);
			Object obj = objList.get(0);
			Method method = obj.getClass().getMethod("getId");
			return method.invoke(obj);
		} catch (Exception e) {
			logger.error(e);
			String msg = ExceptionStackTracePaser.paserStactTrace(e);
			throw new ServiceException(msg);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gxn.oa.service.BaseSerivce#saveOrUpdateObj(java.lang.Object)
	 */
	public int saveOrUpdateObj(Object obj) throws ServiceException {
		List objList = new ArrayList();
		objList.add(obj);
		return this.saveOrUpdateList(objList);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.sail.cot.service.BaseSerivce#deleteListReturnIds(java.util.List,
	 *      java.lang.String)
	 */
	public List<String> deleteListReturnIds(List<String> ids, String objName) {
		List<String> successIds = new ArrayList<String>();
		for (String id : ids) {
			try {
				this.getBaseDao().deleteRecordById(id, objName);
				successIds.add(id);
			} catch (DAOException e) {
				e.printStackTrace();
			}
		}
		return successIds;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.sail.cot.service.BaseSerivce#deleteIntListReturnIds(java.util.List,
	 *      java.lang.String)
	 */
	public List<Integer> deleteIntListReturnIds(List<Integer> ids,
			String objName) {
		List<Integer> successIds = new ArrayList<Integer>();
		for (Integer id : ids) {
			try {
				this.getBaseDao().deleteRecordById(id, objName);
				successIds.add(id);
			} catch (DAOException e) {
				e.printStackTrace();
			}
		}
		return successIds;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.sail.cot.service.BaseSerivce#updateSynObj(java.lang.Object,
	 *      java.lang.Object, java.util.Map)
	 */
	public boolean updateSynObj(Object src, Object des,
			Map<String, String> synParams) throws ServiceException {
		Iterator<String> iterator = synParams.keySet().iterator();
		while (iterator.hasNext()) {
			String srcProp = iterator.next();
			String desProp = synParams.get(srcProp);
			try {
				String srcVal = BeanUtils.getProperty(src, srcProp);
				BeanUtils.setProperty(des, desProp, srcVal);
			} catch (IllegalAccessException e) {
				e.printStackTrace();
				throw new ServiceException("源属性：" + srcProp + "或目标属性："
						+ desProp + " 没有访问权限");
			} catch (InvocationTargetException e) {
				e.printStackTrace();
				throw new ServiceException("源属性：" + srcProp + "或目标属性" + desProp
						+ " 没有调用权限");
			} catch (NoSuchMethodException e) {
				e.printStackTrace();
				throw new ServiceException("源属性：" + srcProp + "或目标属性" + desProp
						+ " 没有get或set方法");
			}
		}
		// 进行数据库同步
		this.modifyObj(des);
		return true;
	}

	@SuppressWarnings("unchecked")
	public Object findBeanFieldValue(String domain, String field,
			Map<String, String> map) throws ServiceException {
		try {
			StringBuffer select = new StringBuffer();
			select.append("select o.").append(field).append(" from ").append(
					domain).append(" o ");
			List<String> params = new ArrayList<String>();
			if (!map.isEmpty()) {
				select.append("where ");
				Object[] keys = map.keySet().toArray();
				for (int i = 0; i < keys.length; i++) {
					params.add(map.get(keys[i]));
					select.append("o.").append(keys[i]).append("=?");
					if (i < keys.length - 1)
						select.append(" and ");
				}
			}
			List res = this.getBaseDao().queryForLists(select.toString(),
					params.toArray());
			if (res.size() == 0) {
				return null;
			} else {
				return res.get(0);
			}
		} catch (Exception e) {
			logger.error(e);
			throw new ServiceException("查询对象属性值错误：" + e.getMessage());
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.sail.cot.service.BaseSerivce#findIsExistValue(java.util.Map)
	 */
	@SuppressWarnings("unchecked")
	public boolean findIsExistValue(Map<String, String> map)
			throws ServiceException {
		try {
			String id = map.remove("id");
			String domain = map.remove("domain");
			if (domain == null || domain.trim().equals(""))
				return false;
			StringBuffer select = new StringBuffer();
			ConvertTypeUtil convert = null;
			try {
				Class clzz = Class.forName("com.sail.cot.domain." + domain);
				Object obj = clzz.newInstance();
				convert = new ConvertTypeUtil(obj);
			} catch (Exception e1) {
				String msg = ExceptionStackTracePaser.paserStactTrace(e1);
				throw new ServiceException(msg);
			}
			select.append("select o.id from ").append(domain).append(" o ");
			List<Object> params = new ArrayList<Object>();
			if (!map.isEmpty()) {
				select.append("where ");
				Object[] keys = map.keySet().toArray();
				for (int i = 0; i < keys.length; i++) {
					Object convertVal = convert.convert(keys[i].toString(), map
							.get(keys[i]));
					if (convertVal == null)
						continue;
					params.add(convertVal);
					select.append("o.").append(keys[i]).append("=? ");
					if (i < keys.length - 1)
						select.append(" and ");
				}
			}
			List res = this.getBaseDao().queryForLists(select.toString(),
					params.toArray());
			if (res.size() == 0) {
				return false;
			} else {
				if (res.get(0).toString().equals(id)) {
					return false;
				} else {
					return true;
				}
			}
		} catch (Exception e) {
			logger.error(e);
			throw new ServiceException("查询是否存在值错误：" + e.getMessage());
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.sail.cot.custinterface.UploadBaseService#getUploadPath()
	 */
	public String getUploadPath(String category, boolean bGenDateDir) {
		if(category.lastIndexOf("/") != category.length() -1)
			category += "/";
		if (bGenDateDir) {
			Calendar calendar = Calendar.getInstance();
			int year = calendar.get(Calendar.YEAR);
			int month = calendar.get(Calendar.MONTH) + 1;
			int day = calendar.get(Calendar.DAY_OF_MONTH);
			return category + year + "/" + month
					+ "/" + day + "/";
		} else {
			return category;
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.sail.cot.custinterface.UploadBaseService#upload(org.apache.commons.fileupload.FileItem,
	 *      java.lang.String)
	 */
	@SuppressWarnings("unchecked")
	public Object upload(FileItem fileItem, String uploadPath, String tbName,
			String id, String field, String fkIdVal, String fkField,
			boolean doDbOp, String paramJson, boolean isRName,HttpSession session)
			throws ServiceException {
		// 上传获取文件名
		JSONObject json = new JSONObject();
		String fileName = StringUtil.takeOutFileName(fileItem.getName());
		if (isRName) {
			String postfixName = fileName.lastIndexOf(".") == -1 ? ""
					: fileName.substring(fileName.lastIndexOf("."));
//			String fileN=fileName.substring(0,fileName.lastIndexOf("."));
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
//			fileName = fileN+"_"+sdf.format(new Date())+"-"+RandomStringUtils.randomNumeric(12) + postfixName;
			fileName = RandomStringUtils.randomNumeric(12) + postfixName;
		}
		String path = ContextUtil.getLocalTomcatHome()
				+ Constants.DEFAULT_UPLOAD_FILE + uploadPath;
		File pf = new File(path);
		if (!pf.exists())
			pf.mkdirs();
		File file = new File(path + fileName);
		// 上传文件
		try {
			fileItem.write(file);
		} catch (Exception e) {
			String msg = ExceptionStackTracePaser.paserStactTrace(e);
			throw new ServiceException("文件上传异常：" + msg);
		}
		if (doDbOp) {
			// 数据库更新操作
			Object object = null;
			if (id != null)
				object = this.getObjByNameId(id, tbName);
			if (object == null) {
				try {
					Class clzz = Class.forName("com.sail.cot.domain." + tbName);
					object = clzz.newInstance();
				} catch (Exception e) {
					String msg = ExceptionStackTracePaser.paserStactTrace(e);
					throw new ServiceException("文件上传异常(对象实例化)：" + msg);
				}
			}
			try {
				String files = BeanUtils.getProperty(object, field);
				// 将以前上传的文件删除
				if (!StringUtils.isEmpty(files)) {
					File oldFile = new File(ContextUtil.getLocalTomcatHome()
							+ Constants.DEFAULT_UPLOAD_FILE + files);
					if (oldFile.exists())
						oldFile.delete();
				}
				BeanUtils.setProperty(object, field, uploadPath + fileName);
				// 需要外键关联的，做处理
				if (!StringUtils.isEmpty(fkField)) {
					BeanUtils.setProperty(object, fkField, fkIdVal);
				}
				// 其它值
				if (!StringUtils.isEmpty(paramJson)) {
					JSONObject jObject = JSONObject.fromObject(paramJson);
					Iterator<String> it = jObject.keys();
					String key;
					SimpleDateFormat sdf = new SimpleDateFormat(
							"yyyy-MM-dd HH:mm:ss");
					while (it.hasNext()) {
						key = it.next();
						int index = key.indexOf("_");//处理ManyToOne类型的转换，用下划线隔开，下划线后面是domain的类型
						if(index > -1){
							String domain = key.substring(index+1);
							String prop = key.substring(0,index);//属性
							Object domainObj;
							try {
								Class clzz = Class.forName("com.sail.cot.domain." + domain);
								domainObj = clzz.newInstance();
								BeanUtils.setProperty(domainObj, "id", jObject.get(key));
							} catch (Exception e) {
								String msg = ExceptionStackTracePaser.paserStactTrace(e);
								throw new ServiceException("文件上传异常(对象实例化)：" + msg);
							}
							BeanUtils.setProperty(object, prop, domainObj);
						}else{
							String mKey = "get" + key.substring(0, 1).toUpperCase()
									+ key.substring(1);
							String name = object.getClass().getMethod(mKey)
									.getReturnType().getName();
							if ("java.util.Date".equals(name)) {
								String dateStr = (String) jObject.get(key);
								BeanUtils.setProperty(object, key, sdf
										.parse(dateStr));
							} else {
								BeanUtils
								.setProperty(object, key, jObject.get(key));
							}
						}
					}
				}
			} catch (Exception e) {
				String msg = ExceptionStackTracePaser.paserStactTrace(e);
				throw new ServiceException("文件上传异常(反射)：" + msg);
			}
			this.saveOrUpdateObj(object);
		}
		json.put("filePath", uploadPath + fileName);
		json.put("fullPath", path + fileName);
		json.put("success", true);
		return json.toString();
	}

	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.common.service.BaseSerivce#deleteObjAndFile(java.lang.String, java.lang.String, java.util.List)
	 */
	public List<String> deleteObjAndFile(String tbName, String field, List<String> ids) {
		Object object;
		List<String> successIds = new ArrayList<String>();
		for (String id : ids) {
			boolean flag=true;
			String files =null;
			try {
				object = this.getObjByNameId(id, tbName);
				files = BeanUtils.getProperty(object, field);
				this.getBaseDao().deleteRecordById(Integer.parseInt(id), tbName);
			} catch (Exception e) {
				e.printStackTrace();
				flag=false;
			}
			if(flag){
				// 将以前上传的文件删除
				if (!StringUtils.isEmpty(files)) {
					File oldFile = new File(ContextUtil.getTomcatHome()
							+ Constants.DEFAULT_UPLOAD_FILE + files);
					if (oldFile.exists()) 
						oldFile.delete();
				}
				successIds.add(id);
			}
		}
		return successIds;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.sail.cot.service.BaseSerivce#deleteObjImg(java.lang.String,
	 *      java.lang.String, java.lang.String)
	 */
	public boolean deleteObjImg(String tbName, String id, String field)
			throws ServiceException {
		// String sql = "update "+tbName+" obj set obj."+field+" = null where
		// obj.id='"+id+"'";
		// 数据库更新操作
		// Object object = this.getObjByNameId(id, tbName);
		Object object = this.getObjByIntegerId(Integer.parseInt(id), tbName);
		try {
			String files = BeanUtils.getProperty(object, field);
			// 将以前上传的文件删除
			if (!StringUtils.isEmpty(files)) {
				File oldFile = new File(ContextUtil.getLocalTomcatHome()
						+ Constants.DEFAULT_UPLOAD_FILE + files);
				if (oldFile.exists()) {
					oldFile.delete();
				}
			}
			BeanUtils.setProperty(object, field, null);
			this.modifyObj(object);
			return true;
		} catch (Exception e) {
			String msg = ExceptionStackTracePaser.paserStactTrace(e);
			throw new ServiceException("删除图片失败：" + msg);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.sail.cot.service.BaseSerivce#getFieldValue(java.lang.String,
	 *      java.lang.String, java.lang.String)
	 */
	@SuppressWarnings("unchecked")
	public Object getFieldValue(String objName, String id, String field)
			throws ServiceException {
		try {
			if(StringUtils.isEmpty(id) || "null".equals(id)) return null;
			StringBuffer hqlBuffer = new StringBuffer();
			hqlBuffer.append("select id,").append(field).append(" from ")
					.append(objName).append(" where id = '").append(id).append(
							"'");
			List list = this.getBaseDao().findRecordsByHql(
					hqlBuffer.toString(), null);
			if (list == null || list.isEmpty())
				return null;
			else {
				Map map = new HashMap();
				Object[] objs = (Object[]) list.get(0);
				map.put("id", objs[0]);
				String[] fields = field.split(",");
				for (int i = 0; i < fields.length; i++) {
					map.put(fields[i], objs[i + 1]);
				}
				return map;
			}
		} catch (Exception e) {
			String msg = ExceptionStackTracePaser.paserStactTrace(e);
			throw new ServiceException("查询对象属性值失败：" + msg);
		}
	}

	public Object getFieldValueByCondition(String objName,
			String fecthFieldJson, String conditionJson)
			throws ServiceException {
		if (StringUtils.isEmpty(fecthFieldJson)
				|| StringUtils.isEmpty(conditionJson))
			return null;
		JSONObject fieldJson = JSONObject.fromObject(fecthFieldJson);
		JSONObject condition = JSONObject.fromObject(conditionJson);
		Set<Map.Entry<String, String>> fieldSet = fieldJson.entrySet();
		StringBuffer hqlBuffer = new StringBuffer();
		hqlBuffer.append("select ");
		for (Map.Entry<String, String> field : fieldSet) {
			hqlBuffer.append(field.getKey()).append(",");
		}
		hqlBuffer.append("id ").append(" from ").append(objName).append(
				" where 1=1 ");
		ConvertTypeUtil convert = null;
		try {
			Class clzz = Class.forName("com.sail.cot.domain." + objName);
			Object obj = clzz.newInstance();
			convert = new ConvertTypeUtil(obj);
		} catch (Exception e1) {
			String msg = ExceptionStackTracePaser.paserStactTrace(e1);
			throw new ServiceException(msg);
		}
		Set<Map.Entry<String, Object>> conditionSet = condition.entrySet();
		HashMap<String, Object> whereParam = new HashMap<String, Object>();
		for (Map.Entry<String, Object> conditonField : conditionSet) {
			String field = conditonField.getKey();
			String mapField = field;
			Object value = conditonField.getValue();
			if (field.indexOf(".") > -1) {
				mapField = field.replace(".", "_");
			}
			if (value instanceof List) {
				hqlBuffer.append(" and ").append(field).append("in(:").append(
						mapField).append(")");
				Class clzzClass = convert.getClassByAttr(field);
				List newList = new ArrayList();
				for (Object obj : (List) value) {
					newList.add(convert.convert(field, obj.toString()));
				}
				whereParam.put(mapField, newList);
			} else {
				Object convertVal = convert.convert(field, value.toString());
				if (convertVal == null)
					continue;
				whereParam.put(mapField, convertVal);
				hqlBuffer.append(" and ").append(field).append("=:").append(
						mapField);
			}
		}
		Object[] res = (Object[]) this.getBaseDao().findUniqueRecordsByHql(
				hqlBuffer.toString(), whereParam);
		if (res == null)
			return null;
		Map returnMap = new HashMap();
		int i = 0;
		for (Map.Entry<String, String> field : fieldSet) {
			returnMap.put(field.getKey(), res[i++]);
		}
		return returnMap;
	}

	public List getRecordsByIds(List<String> ids, String objName)
			throws ServiceException {
		try {
			String hql = " from " + objName + " where 1=1 and id in (:id)";
			Map<String, Object> whereMap = new HashMap<String, Object>();
			whereMap.put("id", ids);
			return this.getBaseDao().findRecordsByHql(hql, whereMap);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			throw new ServiceException(e.getMessage());
		}
	}

	/**
	 * 描述：将默认配置的值付给对象
	 * 
	 * @param obj
	 *            需要赋值的对象
	 * @param defaultCfgMap
	 *            存有默认配置的Map 返回值：void
	 */
	public void getDefaultObject(Object obj, Map defaultCfgMap)
			throws ServiceException {
		Iterator<String> iterator = defaultCfgMap.keySet().iterator();
		BeanMap beanMap = new BeanMap(obj);
		while (iterator.hasNext()) {
			String field = iterator.next();
			String value = (String) defaultCfgMap.get(field);
			try {
				if (beanMap.containsKey(field)) {
					BeanUtils.setProperty(obj, field, value);
				}
			} catch (IllegalAccessException e) {
				String msg = ExceptionStackTracePaser.paserStactTrace(e);
				throw new ServiceException(msg);
			} catch (InvocationTargetException e) {
				String msg = ExceptionStackTracePaser.paserStactTrace(e);
				throw new ServiceException(msg);
			}
		}
	}

	public void deleteObjAndPic(String objName, List<String> ids,
			List<String> paths) throws ServiceException {
		logger.debug("删除对象和所关联图片文件");
		this.deleteList(ids, objName);
		for (String opPath : paths) {
			File oldFile = new File(ContextUtil.getLocalTomcatHome()
					+ Constants.DEFAULT_UPLOAD_FILE + opPath);
			if (oldFile.exists())
				oldFile.delete();
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.sail.cot.common.service.BaseSerivce#updateTable(java.lang.String,
	 *      java.util.Map, java.util.Map)
	 */
	public int updateTable(String domain, Map<String, Object> valueParam,
			String whereJson) throws ServiceException {
		ConvertTypeUtil convert = null;
		try {
			Class clzz = Class.forName("com.sail.cot.domain." + domain);
			Object obj = clzz.newInstance();
			convert = new ConvertTypeUtil(obj);
		} catch (Exception e1) {
			String msg = ExceptionStackTracePaser.paserStactTrace(e1);
			throw new ServiceException(msg);
		}
		String hql = "update " + domain + " set ";
		Iterator<String> iterator = valueParam.keySet().iterator();
		int i = 0;
		while (iterator.hasNext()) {
			String field = iterator.next();
			String value = (String) valueParam.get(field);
			Object covertVal = convert.convert(field, value);
			if (covertVal == null) {
				iterator.remove();
				continue;
			}
			String mapField = field;
			if(field.indexOf(".") > -1){
				mapField = field.replace(".", "_");
			}
			iterator.remove();
			valueParam.put(mapField, covertVal);
			hql += " " + field + "=:" + mapField + ",";
			// if(i++ < valueParam.size() -1)
			// hql +=",";
		}
		hql = StringUtils.strip(hql, ",");
		// 处理where条件
		hql += " where 1=1 ";
		JSONObject jsonObject = JSONObject.fromObject(whereJson);
		Set<Map.Entry<String, Object>> keySet = jsonObject.entrySet();
		HashMap<String, Object> whereParam = new HashMap<String, Object>();
		for (Map.Entry<String, Object> entry : keySet) {
			String field = entry.getKey();
			String mapField = field;
			if (field.indexOf(".") > -1) {
				mapField = field.replace(".", "_");
			}
			Object value = entry.getValue();
			if (value instanceof List) {
				hql += " and " + field + " in (:" + mapField + ")";
				Class clzzClass = convert.getClassByAttr(field);
				List newList = new ArrayList();
				for (Object obj : (List) value) {
					newList.add(convert.convert(field, obj.toString()));
				}
				whereParam.put(mapField, newList);
			} else {
				Object convertVal = convert.convert(field, value.toString());
				if (convertVal == null)
					continue;

				// 字符串模糊查询
				if (convertVal instanceof String) {
					hql += " and " + field + " like :" + mapField;
					whereParam.put(mapField, "%" + convertVal + "%");
				} else {
					hql += " and " + field + "=:" + mapField;
					whereParam.put(mapField, convertVal);
				}
			}
		}
		// iterator = whereParam.keySet().iterator();
		// while(iterator.hasNext()){
		// String field = iterator.next();
		// Object value = whereParam.get(field);
		// if(value instanceof List){
		// hql +=" and "+field+" in (:"+field+")";
		// Class clzzClass = convert.getClassByAttr(field);
		// List newList = new ArrayList();
		// for(Object obj : (List)value){
		// newList.add(convert.convert(field, obj.toString()));
		// }
		// whereParam.put(field, newList);
		// }
		// else{
		// String strValue = (String)value;
		// whereParam.put(field,convert.convert(field, strValue));
		// hql +=" and "+field+"=:"+field;
		// }
		// }
		int res;
		try {
			//hql = "update CotOrderDetail set  factoryId.id=:factoryId where 1=1  and id=:id";
			//CotFactory factory = new CotFactory();
			//factory.setId(4);
			//valueParam.clear();
			//valueParam.put("factoryId", new Integer("2"));
			res = this.getBaseDao().executeUpdate(hql, valueParam, whereParam);
		} catch (DAOException e) {
			String msg = ExceptionStackTracePaser.paserStactTrace(e);
			throw new ServiceException(msg);
		}
		System.out.println(hql);
		return res;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.sail.cot.common.service.BaseSerivce#getRecordBySql(java.lang.String)
	 */
	public List findRecordByHql(String hql) throws ServiceException {
		return this.getBaseDao().findRecordsByHql(hql, null);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.sail.cot.common.service.BaseSerivce#findRecordByHql(java.lang.String,
	 *      java.util.Map)
	 */
	public List findRecordByHql(String hql, Map<String, Object> whereMap)
			throws ServiceException {
		return this.getBaseDao().findRecordsByHql(hql, whereMap);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.sail.cot.common.service.BaseSerivce#getJsonData(java.lang.String,
	 *      java.util.Map)
	 */
	public String getJsonData(String hql, Map<String, Object> whereMap)
			throws ServiceException {
		GridServerHandler gd = new GridServerHandler();
		List res = this.findRecordByHql(hql, whereMap);
		int count = res.size();
		gd.setData(res);
		gd.setTotalCount(count);
		return gd.getLoadResponseText();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.sail.cot.common.service.BaseSerivce#getJsonData(java.lang.String)
	 */
	public String getJsonData(String objName) throws ServiceException {
		GridServerHandler gd = new GridServerHandler();
		List res = this.getList(objName);
		int count = res.size();
		gd.setData(res);
		gd.setTotalCount(count);
		return gd.getLoadResponseText();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.sail.cot.common.service.BaseSerivce#updateOrDelTable(java.lang.String,
	 *      java.util.Map, java.util.Map)
	 */
	public int updateOrDelTable(String hql, Map<String, Object> whereMap)
			throws ServiceException {
		int result = -1;
		try {
			result = this.baseDao.executeUpdate(hql, null, whereMap);
		} catch (DAOException e) {
			throw new ServiceException(ExceptionStackTracePaser
					.paserStactTrace(e));
		}
		return result;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.sail.cot.common.service.BaseSerivce#findRecords(java.lang.String,
	 *      java.util.Map, int, int)
	 */
	public String findRecords(String hql, Map<String, Object> whereMap,
			int start, int limit) throws ServiceException {
		return this.baseDao.findRecordsByHql(hql, whereMap, start, limit);
	}

	public String findRecords(String hql, Map<String, Object> whereMap,
			int start, int limit, String[] excludes) throws ServiceException {
		return this.baseDao.findRecordsByHql(hql, whereMap, start, limit,
				excludes);
	}

	/**
	 * @see 功能描述（必填）：触发事件，可以是统计事件，可以是更新事件
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see
	 *      <p>
	 *      Author:achui
	 *      </p>
	 * @see
	 *      <p>
	 *      Create Time:Nov 28, 2011 6:03:00 PM
	 *      </p>
	 * @param listener
	 * @return 返回值：Object
	 */
	protected Object fireEvent(AbstractEventListener listener, Object source) {
		return listener.fireEvent(source);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.sail.cot.common.service.BaseSerivce#findUniqueRecordsByHql(java.lang.String)
	 */
	public Object findUniqueRecordsByHql(String hql) throws ServiceException {
		// TODO Auto-generated method stub
		return this.getBaseDao().findUniqueRecordsByHql(hql, null);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.sail.cot.common.service.BaseSerivce#findUniqueRecordsByHql(java.lang.String,
	 *      java.util.Map)
	 */
	public Object findUniqueRecordsByHql(String hql,
			Map<String, Object> whereMap) throws ServiceException {
		// TODO Auto-generated method stub
		return this.getBaseDao().findUniqueRecordsByHql(hql, whereMap);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.sail.cot.common.commoninterface.DownloadBaseService#downloadCommonFile(java.lang.String,
	 *      java.lang.String, boolean)
	 */
	public String downloadCommonFile(String filePath, String downJson,
			boolean useDefaultParentPath) {
		String path = null;
		if (useDefaultParentPath)
			path = ContextUtil.getLocalTomcatHome() + Constants.DEFAULT_UPLOAD_FILE
					+ filePath;
		return path;
	}

	public List<Object[]> findRecordsJDBC(String sql, List paramVals)
			throws Exception {
		List<Object[]> list = new ArrayList<Object[]>();
		PreparedStatement pstm = null;
		ResultSet rs = null;
		Connection conn = this.getBaseDao().getConnection();
		try {
			pstm = conn.prepareStatement(sql,
					ResultSet.TYPE_SCROLL_INSENSITIVE,
					ResultSet.CONCUR_READ_ONLY);
			for (int i = 0; i < paramVals.size(); i++) {
				Object obj = paramVals.get(i);
				if (obj instanceof String)
					pstm.setString(i + 1, (String) obj);
			}
			rs = pstm.executeQuery();
			while (rs.next()) {
				ResultSetMetaData meta = rs.getMetaData();
				Object[] tp = new Object[meta.getColumnCount()];
				for (int i = 0; i < meta.getColumnCount(); i++) {
					String colName = meta.getColumnName(i + 1);
					tp[i] = rs.getObject(colName);
				}
				list.add(tp);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw e;
		} finally {
			if (rs != null)
				rs.close();
			if (pstm != null)
				pstm.close();
			if (conn != null)
				conn.close();
		}
		return list;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.sail.cot.common.commoninterface.DownloadBaseService#downloadJasperReport(java.lang.String,
	 *      java.lang.String)
	 */
	public String downloadJasperReport(String filePath, String downJson) {
		// TODO Auto-generated method stub
		CotExportRptService rptService = (CotExportRptService) ContextUtil
				.getBean("CotRptService");
		HashMap paramMap = new HashMap();
		JSONObject json = null;
		if (downJson == null) {
			json = new JSONObject();
			json.put("barcode", "false");
			json.put("HEADER_PER_PAGE", "false");
			json.put("exlSheet", "false");
			json.put("file", "false");
			json.put("exportType", "EXCEL");

		} else {
			json = JSONObject.fromObject(downJson);
		}
		String exportType = json.getString("exportType");
		String extend = "EXCEL".equals(exportType) ? ".xls" : ".pdf";
		String exportPath = ContextUtil.getLocalTomcatSubPath("export_tmp")
				+ RandomStringUtils.randomNumeric(16) + extend;
		String tableName = json.getString("tableName");
		String queryPrefix = json.getString("queryPrefix");
		Object id = json.get("id");
		Object ids = json.get("ids");
		Class clzz = null;
		try {
			clzz = Class.forName("com.sail.cot.domain." + tableName);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String sql = " 1=1 ";
		Set<Map.Entry<String, Object>> entrySet = json.entrySet();
		for (Map.Entry<String, Object> entry : entrySet) {
			String attr = entry.getKey();
			if (StringUtils.isNotEmpty(queryPrefix))
				attr = attr.replace(queryPrefix + ".", "");
			boolean start = false;
			boolean end = false;
			// 是否需要带区间查询
			// start或end来头或结尾的，用区间查询
			if (StringUtils.startsWithIgnoreCase(attr, "Start")) {
				start = true;
				attr = attr.substring(5);
			} else if (StringUtils.endsWithIgnoreCase(attr, "Start")) {
				start = true;
				attr = attr.substring(0, attr.length() - 5);
			} else if (StringUtils.startsWithIgnoreCase(attr, "End")) {
				end = true;
				attr = attr.substring(3);
			} else if (StringUtils.endsWithIgnoreCase(attr, "End")) {
				end = true;
				attr = attr.substring(0, attr.length() - 5);
			}
			Object obj = entry.getValue();
			if (obj == null || "".equals(obj.toString()))
				continue;
			String dbCol = AnnotationUtil.getAnnotationValue(clzz, attr);
			if (dbCol == null) {
				paramMap.put(attr, obj);
				continue;
			}
			Class classType = AnnotationUtil.getAnnotationClass(clzz, attr);
			if (classType.equals(String.class)) {
				sql += " and obj." + dbCol + " like '%" + obj + "%' ";
			} else if (classType.equals(Date.class)) {
				if (start)
					sql += " and obj." + dbCol + " >= " + "'" + obj + "'";
				if (end)
					sql += " and obj." + dbCol + " <= " + "'" + obj + "'";
			} else if (start) {
				sql += " and obj." + dbCol + " >= " + obj;
			} else if (end) {
				sql += " and obj." + dbCol + " <= " + obj;
			} else {
				if (obj != null)
					sql += " and obj." + dbCol + "=" + obj + " ";
			}
		}
		if (id != null)
			sql += " and obj.id=" + id;
		if (ids != null)
			sql += " and obj.RECID in (" + ids+")";
		System.out.println("STR_SQL:" + sql);
		paramMap.put("STR_SQL", sql);
		/**
		 * pramMap需要的参数：STR_SQL:String HEADER_PER_PAGE:boolean:是否每页显示表头
		 * exlSheet:boolean：是否一个sheet一页 barcode：特殊字段过滤
		 */
		try {
			String rptfile = ContextUtil.getLocalTomcatHome()+ Constants.DEFAULT_UPLOAD_FILE + filePath;
			rptfile = ContextUtil.getFileFromRemoteToLocal(filePath, rptfile);
			if ("EXCEL".equals(exportType))
				rptService.exportRptToXLS(rptfile, exportPath, paramMap);
			else if ("PDF".equals(exportType))
				rptService.exportRptToPDF(rptfile, exportPath, paramMap);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return exportPath;
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.common.service.BaseSerivce#getListByCondition(java.lang.String, java.util.Map)
	 */
	@Override
	public List getListByCondition(String table, Map<String, Object> whereMap) {
		// TODO Auto-generated method stub
		Iterator<String> iterator = whereMap.keySet().iterator();
		String hql = "select obj from "+table+" obj where 1=1 ";
		while(iterator.hasNext()){
			String key = iterator.next();
			Integer value = (Integer)whereMap.get(key);
			hql += " and "+key +"="+value+",";
		}
		hql = hql.substring(0,hql.length() -1);
		
		return this.findRecordByHql(hql);
		//return this.getli
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.common.commoninterface.UploadBaseService#deleteUploadFile(java.lang.String)
	 */
	@Override
	public String deleteUploadFile(String path) {
		File file = new File(path);
		FileUtils.deleteQuietly(file);
		return path;
	}
	
	public Object[] getSessionByDwr() throws ServiceException {
		return this.getBaseData().getSessionByDwr();
	}
	
}
