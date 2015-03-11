package com.sail.cot.common.util;
import java.io.File;
import java.rmi.server.UID;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang.RandomStringUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.text.StrTokenizer;



public class StringUtil {
	public static String getUID() {
		UID uid = new UID();
		return uid.toString().replaceAll(":", "");
	}

	public static boolean hasValue(Object obj) {
		boolean res = false;
		if (obj != null) {
			if (obj.getClass().equals(String.class)) {
				if (obj.toString().length() > 0) {
					res = true;
				}
			} else { 
				res = true;
			}
		}
		return res;
	}

	public static boolean hasValue(String str) {
		boolean res = false;
		if (str != null) {
			if (str.length() > 0) {
				res = true;
			}
		}
		return res;
	}

	/**
	 * 生成随机字符串,字母+数字的组合，随机数为num长度
	 * 
	 * @param num
	 * @return
	 */
	public static String randomString(int num) {
		return RandomStringUtils.randomAlphanumeric(num);
	}
	/**
	 * 描述：生成num长度的16进制随机数
	 * @param num
	 * @return
	 * 返回值：String
	 */
	public static String randomStringHex(int num)
	{
		return RandomStringUtils.random(num,"0123456789ABCDEF");
	}
	
	/**
	 * 描述：截取字符串中某个指定符号中的字符串
	 * @param source
	 * @param open
	 * @param close
	 * @return
	 * 返回值：String
	 * 用法：StringUtil.stringBetween("YY-[dd]-[cc]","[","]")
	 * 返回：dd , cc
	 */
	public static String stringBetween(String source,String open,String close)
	{
		return StringUtils.substringBetween(source, open, close);
	}
	/**
	 * 描述：截取字符串中某个指定符号中的字符串
	 * @param source
	 * @param open
	 * @param close
	 * @return
	 * 返回值：String[]
	 */
	public static String[] stringsBetween(String source,String open,String close)
	{
		return StringUtils.substringsBetween(source, open, close);
	}
	public static void main(String[] args)
	{
		String str = "YY-#{CH}-#{KH}-#{EMP}";
			//org.apache.commons.lang.time.DateFormatUtils.format(new Date(), );
		String[] arr = StringUtil.stringsBetween(str, "#{", "}");
		System.out.println(arr[0]);
		System.out.println(arr[1]);
		System.out.println(arr[2]);
		
	}
	/**
	 * 根据文件路径获得文件名
	 * @param filePath
	 * @return
	 */
	 public static String takeOutFileName(String filePath)
	    {
	        int pos = filePath.lastIndexOf(File.separator);
	        if(pos > 0)
	            return filePath.substring(pos + 1);
	        else
	            return filePath;
	    }
	 
	 /**
	 * 功能描述（必填）：将数据库的字段名转换为符合javabean的命名规范，如mail_rule_id ->mailRuleId;
	 * 处理流程（选填）：
	 * 调用例子（必填）：StringUtil.convert2JavaBeanName("mail_rule_id")
	 * 相关说明文件：
	 * @param colName:需要转换的数据库名
	 * @param upperFirst:第一个字母是否大写，true：大写，false 小写
	 * @return
	 * 返回值：String
	 * Author:achui
	 * Create Time:Oct 18, 2011 3:35:42 PM
	 */
	public static String convert2JavaBeanName(String colName,boolean upperFirst){
		StrTokenizer tokenizer = new StrTokenizer(colName,"_");
		//第一个单词不作处理
		String col = tokenizer.nextToken();
		if(!tokenizer.hasNext()) return colName;
		col = col.toLowerCase();
		while(tokenizer.hasNext()){
			String str = tokenizer.nextToken().toLowerCase();
			col += StringUtils.capitalize(str);
		}
		if(upperFirst)
			col = StringUtils.capitalize(col);
		 return col;
	 }
	
	/**
	 * @see 功能描述（必填）：将指定格式的String类型的数据转换为Date类型，用于数据查询
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：StringUtil.convert2Date("2011-10-10 12:30:20","yyyy-MM-dd H:m:s")
	 * 					   StringUtil.convert2Date("2011-10-10","yyyy-MM-dd")
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 25, 2011 3:25:30 PM</p>
	 * @param date 需要转换的时间
	 * @param dateFormat 需要转换的日期格式
	 * @return
	 * 返回值：Date
	 */
	public static Date convert2Date(String date,String dateFormat){
		if(StringUtils.isEmpty(date)) return null;
		//日期格式不满足要求，至少需要yyyy-MM-dd的格式
		if(date.length() < 10) return null;
		if(date.trim().length() == 10){
			dateFormat = dateFormat.substring(0,10);
		}
		SimpleDateFormat df = new SimpleDateFormat(dateFormat);
		Date newDate = null;
		try {
			newDate = df.parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
		return newDate;
	}
	/**
	 * @see 功能描述（必填）：返回简单格式的日期型（yyyy-MM-dd或者yyyy-MM-dd H:m:s）返回的类型，取决于date参数的格式
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 25, 2011 3:37:16 PM</p>
	 * @param date
	 * @return 
	 * 返回值：Date
	 */
	public static Date getSimpleDate(String date){
		return convert2Date(date, "yyyy-MM-dd H:m:s");
	}
	
	/**
	 * 
	 * @see 功能描述（必填）：格式化字符串,不足补一定字符,超过就截取
	 * @see 处理流程（选填）：
	 * @see 调用例子（选填）：
	 * @see 相关说明文件：
	 * <p>返回值：String</p>
	 * @see <p>Author:azan</p>
	 * @see <p>Create Time:2012-3-1 下午05:49:51</p>
	 * @param targetStr 源字符串
	 * @param addStr 不足长度时用来填充的字符
	 * @param strLength 格式化后的总长度
	 * @return
	 */
	public static String formatString(String targetStr, String addStr,
			int strLength) {
		if(targetStr == null || "".equals(targetStr)){
			return "";
		}
		if (targetStr.getBytes().length <= strLength) {
			String newString = "";
			int cutLength = strLength - targetStr.getBytes().length;
			for (int i = 0; i < cutLength; i++) {
				newString += addStr;
			}
			return targetStr + newString;
		} else {
			if(targetStr.length()<targetStr.getBytes().length){
				byte[] b = targetStr.getBytes();
				String temp="";
				for (int i = 0; i < strLength; i++) {
					temp+=b[i];
				}
				return temp;
			}else{
				return targetStr.substring(0, strLength);
			}
		}
	}
	
	/**
	 * 
	 * @see 功能描述（必填）：格式化数值,按参数保留几位小数,不足补0
	 * @see 处理流程（选填）：
	 * @see 调用例子（选填）：
	 * @see 相关说明文件：
	 * <p>返回值：String</p>
	 * @see <p>Author:azan</p>
	 * @see <p>Create Time:2012-3-2 上午11:06:19</p>
	 * @param obj
	 * @param num 保留几位小数
	 * @return
	 */
	public static String formatDouble(Object obj,int num) {
		String str="0";
		if(num>0){
			str="0.";
			for (int i = 0; i < num; i++)
				str+="0";
		}
		DecimalFormat nbf = new DecimalFormat(str);
		if(obj==null)
			return str;
		return nbf.format(obj);
	}
	
	/**
	 * 
	 * @see 功能描述（必填）：如果null则转化为str
	 * @see 相关说明文件：
	 * <p>返回值：Object</p>
	 * @see <p>Author:azan</p>
	 * @see <p>Create Time:2012-3-2 上午11:59:35</p>
	 * @param obj
	 * @param str
	 * @return
	 */
	public static Object formatNull(Object obj,String str) {
		return obj==null?str:obj;
	}
}
