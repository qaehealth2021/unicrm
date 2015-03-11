/**
 * 
 */
package com.sail.cot.seq;

import java.lang.annotation.Annotation;
import java.lang.reflect.Constructor;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.persistence.Entity;

import net.sf.json.JSONObject;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.MethodUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.text.StrTokenizer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.service.BaseSerivce;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.common.util.StringUtil;
import com.sail.cot.custinterface.SequeceService;
import com.sail.cot.domain.CotSeq;
import com.sail.cot.domain.CotSeqCfg;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:系统单号生成处理类</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Dec 14, 2011 2:37:14 PM </p>
 * <p>Class Name: Sequence.java </p>
 * @author achui
 *
 */
@Service("CotSeqService")
public class Sequence implements SequeceService,NoService{
	
	private BaseSerivce baseService;
	public BaseSerivce getBaseService() {
		if(baseService == null){
			baseService = (BaseSerivce)ContextUtil.getBean("BaseService");
		}
		return baseService;
	}
	@Resource(name="BaseService")
	public void setBaseService(BaseSerivce baseService) {
		this.baseService = baseService;
	}
	//存放配置表的信息，其中key为配置表的key字段，value为这个配置表对象
	private Map<String,CotSeqCfg> cfgMap = new HashMap<String,CotSeqCfg>();
	//存放配置表中自定义对象的内容
	private Map<String, Object> objMap = new HashMap<String, Object>();

	public Sequence(){
	}
	/**
	 * @param reloadMap
	 */
	public Sequence(boolean reloadMap)
	{
		initSequece(reloadMap);
	}
	/**
	 * 描述：  初始化预置对象，通过获取配置表的信息将所需的配置项出入缓存
	 * @param reloadMap 是否需要重新加载
	 * 返回值：void
	 */
	public void initSequece(boolean reloadMap){
		try {
			List<CotSeqCfg> list = new ArrayList<CotSeqCfg>();
			if(cfgMap.isEmpty() || reloadMap){
				list = (List<CotSeqCfg>)this.getBaseService().getList("CotSeqCfg");
				for(CotSeqCfg cfg : list){
					cfgMap.put(cfg.getKey(), cfg);
					//生成用户自定义对象缓存
					if(cfg.getType().equals("CustObj")){
						objMap.put(cfg.getObj(), null);
					}
				}
				list.clear();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	//分解单号表达式
	/**
	 * 描述：对配置表的表达式进行分解，分为3部分分解
	 * 1、对之定义对象进行分解，通过objMap获取相应的值
	 * 2、分解时间相关的部分
	 * 3、分解序号部分
	 * 4、分解其他规制
	 * @param express 配置表达式
	 * @param obj 前台传递过来的表单对象
	 * @param type  用于判断是要分解那种类型的单号，取值目前有 price，order，spilit，orderfac等
	 * @param currdate 对应单据的下单时间
	 * @param extraJsonParams 其他额外的参数，可能是充其他表过来，或者通过某种规则生成的，用json表示
	 * 						  json的命名方式按如下规则进行
	 * 						  e.g {
	 * 								"property1":"XXXX" //其中propertyn必须在express中体现,若没体现，则默认不处理
	 * 								"property2":"XXXX" 
	 * 								...
	 * 								"propertyn":"XXXX"
	 * 							  }
	 * @return 返回分解后的单据
	 * 返回值：String
	 */
	private String decodeExpress(String express,Object obj,String type,String currdate,JSONObject extraJsonParams){
		//1、分解表达式
		String[] arr = StringUtil.stringsBetween(express, "[", "]");
		for(String key : arr){
			CotSeqCfg cfg = cfgMap.get("["+key+"]");
			if("CustObj".equals(cfg.getType())){
				express = this.doCustObj(key, cfg, obj, express);
			}
			if("Date".equals(cfg.getType())){
				express = this.doDate(key, cfg, obj, express);
			}
			//3、分解序列号部分
			else if("SEQ".equals(cfg.getType())){
				express = this.doSeq(key, cfg, type, express);
			}
			//4、处理额外参数
			if(extraJsonParams != null){
				JSONObject json = JSONObject.fromObject(extraJsonParams);
				Iterator<String> iterator = json.keys();
				while(iterator.hasNext()){
					String keys = iterator.next();
					String value = json.getString(keys);
					express.replace(keys, value);
				}
			}
		}
		return express;
	}
	
	/**
	 * @see 功能描述（必填）：对客户之定义类型的数据进行解析
	 * @see 处理流程（选填）：1、通过传入的配置对象，获取relayAttr属性对应的值
	 * 						如果relyAttr的值为XXX.XXX.XXX的格式，则遍历每个XXX属性，根据obj配置的对象，分别获取每个XXX属性的值
	 * 						否则，直接充obj中获取relyAttr的值
	 * 						如果Method属性为“key”的话，这说明该属性是一个主键，需要再通过查询，查出该属性所对应的对象
	 * 					2、根据1中获得的对象根据配置对象的attribute的值获取解析后的值
	 * 					3、如果CotSeqCfg中sourceObj属性的值与obj属性一致，这直接去relayAttr的值
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Dec 14, 2011 4:14:32 PM</p>
	 * @param key:需要解析的参数
	 * @param cfg：该参数对应的配置信息
	 * @param obj：前台传入的参数
	 * @param express：需要解析的表达是
	 * @return
	 * 返回值：String
	 */
	private String doCustObj(String key,CotSeqCfg cfg,Object obj,String express){
		String decodeValue = null;
		try{
			String className = obj.getClass().getSimpleName();
			//解析后的值
			//判断参数的来源，如果参数来源与配置对象的参数来源一致，这直接取参数的relyAttr属性
			//获取方法名
			
			//分解属性规则 cityId.id.nationId
			String[] objs = StringUtils.split(cfg.getObj(), '.');
			//判断格式是否为XXX.XXX
			StrTokenizer tokenizer = new StrTokenizer(cfg.getRelyAttr(),".");
			Object returnObj = obj;
			int index = 0;
			while(tokenizer.hasNext()){
				String prop = tokenizer.nextToken();
				String methodName = "get"+StringUtils.capitalize(prop);
				//获取每个XXX属性的值
				returnObj = MethodUtils.invokeMethod(returnObj, methodName, null);
				if(returnObj==null){
					break;
				}
				//是否是domain包里面的数据类型
				Annotation annotation = returnObj.getClass().getAnnotation(Entity.class);
				//如果XXX是普通类型数据类型，不是Domain包里面的对象，需要根据该属性的值，来进一步判断是否需要查询数据库
				if(annotation == null && returnObj != null){
					decodeValue = returnObj.toString();
					if("KEY".equals(cfg.getMethod()))
						//改属性是key，需要根据该主键，查询其对象，最后根据cfg对象的attribute属性获取相应的文本
						returnObj = this.getBaseService().getObjByNameId(decodeValue, objs[index]);
				}
				index++;
			}
			//如果传入的参数和sourceObj的类型一致，就不必在进行一次取值了
			if(returnObj!=null && cfg.getAttribute() != null && !cfg.getSourceObj().equals(cfg.getObj())){
				//Object clzz = baseService.getObjByNameId(decodeValue, cfg.getObj());
				decodeValue = BeanUtils.getProperty(returnObj, cfg.getAttribute());
			}
			if(StringUtils.isNotEmpty(decodeValue))
				decodeValue = express.replace("["+key+"]", decodeValue);
			else
				decodeValue = express;
		}catch (Exception e) {
			e.printStackTrace();
		}
		return decodeValue;
	}
	
	/**
	 * @see 功能描述（必填）：
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Dec 14, 2011 4:57:04 PM</p>
	 * @param key:需要解析的参数
	 * @param cfg：该参数对应的配置信息
	 * @param obj：前台传入的参数
	 * @param express：需要解析的表达是
	 * @return
	 * 返回值：String
	 */
	private String  doDate(String key,CotSeqCfg cfg,Object obj,String express){
		String decodeValue = null;
		Calendar calendar = new java.util.GregorianCalendar();
		int i = Calendar.YEAR;
		//获取参数类表
		String[] args = cfg.getArgs().split(",");
		//获取参数类型
		String[] argsType = null;
		if(cfg.getArgstype() != null)
			argsType = cfg.getArgstype().split(",");
		//判断是否需要对时间进行计算，通过Method属性是否为空进行判断
		if(cfg.getMethod() != null){
			try {
				Object[] objects = this.getObjArgs(cfg);
				if(objects != null)
					MethodUtils.invokeMethod(calendar, cfg.getMethod(), objects);
				String invokeVal = String.format(cfg.getExpress(), calendar);
				decodeValue = express.replace("["+key+"]", invokeVal);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} 
		}
		else {
			String invokeVal = String.format(cfg.getExpress(), calendar);
			decodeValue = express.replace("["+key+"]", invokeVal);
		}
		return decodeValue;
	}
	
	/**
	 * 描述： 根据配置表中的配置参数，获取数据库配置的参数列表
	 * @param cfg 配置表的配置信息对象
	 * @return
	 * 返回值：Object[]
	 */
	private Object[] getObjArgs(CotSeqCfg cfg)
	{
		Object[] objects = null;
		try {
			if(cfg == null) return null;
			if(cfg.getArgstype() == null) return null;
			//获取参数类表
			String[] args = cfg.getArgs().split(",");
			objects = new Object[args.length];
			//获取参数类型
			String[] argsType = null;
			if(cfg.getArgstype() != null)
				argsType = cfg.getArgstype().split(",");
			int i = 0;
			for(String classType : argsType)
			{
				Class argType = Class.forName(classType);
				//生成构造函数所需要的参数
				Class[] constructor = {java.lang.String.class};
				Constructor typeConstructor = argType.getConstructor(constructor);
				Object type = typeConstructor.newInstance(args[i]);
				objects[i] = type;//参数列表
				i++;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return objects;
	}
	
	/**
	 * @see 功能描述（必填）：解析当前序列号
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Dec 14, 2011 5:27:48 PM</p>
	 * @param key:需要解析的参数
	 * @param cfg：该参数对应的配置信息
	 * @param type：标识是需要获取哪个模块的序列号，取值有order，orderfac，given，等
	 * @param express：需要解析的表达是
	 * @return
	 * 返回值：String
	 */
	private String doSeq(String key,CotSeqCfg cfg,String type,String express){
		String decodeValue = null;
		List resList = this.getNewSeqObj(type);
		if(resList != null){					
			Integer currseq = (Integer)resList.get(0);	
			String val = String.format(cfg.getExpress(), currseq);
			decodeValue = express.replace("["+key+"]", val);
		}
		return decodeValue;
	}
	
	//获取全局序列号
	/**
	 * 描述：
	 * @param type 标识是需要获取那种类型的序列号，取值有order，orderfac，given，等
	 * @param currDate 当前时间
	 * @return 序列号
	 * 返回值：List，数据的第一个存放当前序列号，第2个对象存放CotSeq对象
	 */
	@Transactional(propagation=Propagation.NOT_SUPPORTED)
	private List getNewSeqObj(String type)
	{
		List returnList = new ArrayList();
		String sql = " from CotSeq obj where obj.type = '"+type+"'";
		List list = null;
		try {
			list = this.getBaseService().findRecordByHql(sql);
		} catch (ServiceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(list.size() == 0) return null;
		CotSeq seq = (CotSeq)list.get(0);	
		String orderno = seq.getSeqCfg();
		//当前序列号
		Integer currSeq = seq.getCurrentSeq();
		int zeroType = seq.getZeroType();
		//判断是否同一天，如果不是同一天，则归0
		Calendar currcal = Calendar.getInstance(); //获取历史比对时间
		Calendar today = Calendar.getInstance(); //获取当前时间
		DateFormat format = new SimpleDateFormat("yyyy-MM-dd");         
		//设置历史事件
//		currcal.setTime(seq.getHisDay());
		//azan修改
		currcal.setTime(seq.getHisDay()==null?new java.util.Date():seq.getHisDay());
		
		if(orderno.indexOf("2SEQ")>=0)
			currSeq = currSeq+1;
		else if(orderno.indexOf("3SEQ")>=0)
			currSeq = currSeq+1;
		else if(orderno.indexOf("4SEQ")>=0)
			currSeq = currSeq+1;
		else if(orderno.indexOf("7SEQ")>=0)
			currSeq = currSeq+1;
		if(orderno.indexOf("2SEQ")>=0 && currSeq > 99)
			currSeq = 0;
		else if(orderno.indexOf("3SEQ")>=0 && currSeq > 999)
			currSeq = 0;
		else if(orderno.indexOf("4SEQ")>=0 && currSeq > 9999)
			currSeq = 0;
		else if(orderno.indexOf("7SEQ")>=0 && currSeq > 9999999)
			currSeq = 0;

		switch(zeroType)
		{
			case 1: //按年归档
			{
				if(today.get(Calendar.YEAR) != currcal.get(Calendar.YEAR))
					currSeq = 1;
				break;
			}
			case 2: //按月归档
			{
				if (today.get(Calendar.YEAR) != currcal.get(Calendar.YEAR) || (today.get(Calendar.YEAR) == currcal.get(Calendar.YEAR) && today.get(Calendar.MONTH) != currcal
						.get(Calendar.MONTH)))
					currSeq = 1;
				break;
			}
			case 3: //按日归档
		}
		seq.setHisDay(today.getTime());
//		List arrayList = new ArrayList();
//		arrayList.add(seq);
//		try {
//			this.getBaseService().saveOrUpdateList(arrayList);
//		} catch (ServiceException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}//保存历史时间
		returnList.add(currSeq);
		returnList.add(seq);
		return returnList;
	}
	
	/**
	 * 描述：获取对应单据的单号
	 * @param idMap 存放对象对应的ID，key值为对象名，如CotCustomer,CotOrder等，value为ID值
	 * @param type  单据类型，如order，orderfac等
	 * @param currdate 对应单据的下单时间
	 * @return 对应单据的单号
	 * 返回值：String
	 */
	public String getAllNo(Object obj,String type,String currdate,JSONObject extraJsonParams)
	{
		initSequece(true);
		String strSql = " from CotSeq obj where obj.type='"+type+"'";
		List list = null;
		try {
			list = this.getBaseService().findRecordByHql(strSql);
		} catch (ServiceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String number = "";
		if(list.size() > 0){
			CotSeq seq = (CotSeq)list.get(0);
			//获取单号配置表达式
			String express = seq.getSeqCfg();
			//分解单号表达式
			number = this.decodeExpress(express, obj, seq.getType(),currdate,extraJsonParams);
		}
		return  number;
	}
	/**
	 * 描述： 当单据保存完后，更新当前序列号
	 * @param type 单据类型，如order,orderfac等
	 * 返回值：void
	 */
	@Transactional(propagation=Propagation.NOT_SUPPORTED)
	public Integer saveSeq(String type)
	{
		List resList = this.getNewSeqObj(type);
		Calendar calendar = Calendar.getInstance();
		if(resList == null) return null;
		Integer currSeq = (Integer)resList.get(0);
		CotSeq seq = (CotSeq)resList.get(1);
		seq.setHisDay(calendar.getTime());
		seq.setCurrentSeq(currSeq);
		try {
			this.getBaseService().modifyObj(seq);
		} catch (ServiceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return currSeq;
	}

	public String getCustomerNo(){
		return this.getAllNo(null, "cust",null,null);
	}
	
	/* (non-Javadoc)
	 * @see com.sail.cot.custinterface.SequeceService#getCurrSeq(java.lang.String)
	 */
	@Override
	public Integer getCurrSeq(String type) {
		// TODO Auto-generated method stub
		List list = this.getNewSeqObj(type);
		if(list == null) return 0;
		Integer currentSeq = (Integer)list.get(0);
		return currentSeq;
	}
	/* (non-Javadoc)
	 * @see com.sail.cot.custinterface.SequeceService#saveCurrentSeq(java.lang.String, java.lang.Integer)
	 */
	@Override
	public void saveCurrentSeq(String type, Integer currentSeq) {
		// TODO Auto-generated method stub
		//String hql = "update CotSeq set "
	}
	/* (non-Javadoc)
	 * @see com.sail.cot.seq.NoService#getOrderNo()
	 */
	@Override
	public String getOrderNo() {
		String orderNo = this.getAllNo(null,"orderNo",null,null);
		//保存当前序列号
		this.saveSeq("orderNo");
		return orderNo;
	}
	/* (non-Javadoc)
	 * @see com.sail.cot.seq.NoService#getCustNo()
	 */
	@Override
	public String getCustNo() {
		String custNo = this.getAllNo(null,"cust",null,null);
		//保存当前序列号
		this.saveSeq("cust");
		return custNo;
	}
}
