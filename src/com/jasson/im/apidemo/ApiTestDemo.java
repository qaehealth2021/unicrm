package com.jasson.im.apidemo;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Random;
import java.util.StringTokenizer;
import java.util.Vector;

import com.jasson.im.api.APIClient;
import com.jasson.im.api.MOItem;
import com.jasson.im.api.RPTItem;

/**
 * ApiTestDemo
 */
public class ApiTestDemo
{
	private String cmd = "11";
	private String mobileStr = "13950003948,13950003948";
	private String content = "短信发送测试内容 via  IM JAVA API ";
	private long smId = 1;
	private int smType = 0;
	private String url = "wap.sohu.com";
	private String host = "172.17.192.66";
	private String dbName = "mas";
	private String apiId = "uni";
	private String name = "uni";
	private String pwd = "admin";
	private APIClient handler = new APIClient();
	BufferedReader in = null;

	public ApiTestDemo(String[] args)
	{
		super();
		parseCmd(args);
		init();
		in = new BufferedReader(new InputStreamReader(System.in),512); 
	}

	public void init()
	{
		int connectRe = handler.init(host, name, pwd, apiId,dbName);
        if(connectRe == APIClient.IMAPI_SUCC)
        	info("初始化成功");
        else if(connectRe == APIClient.IMAPI_CONN_ERR)
        	info("连接失败");
        else if(connectRe == APIClient.IMAPI_API_ERR)
        	info("apiID不存在");
        if(connectRe != APIClient.IMAPI_SUCC)
        {
        	usage();
        	System.exit(-1);
        }
	}
	public void release()
	{
		handler.release();
		Thread.currentThread().interrupt();
	}
	
	public void testSend()
	{
		SendTask task = new SendTask();
		task.start();
	}
	public void sendSM()
	{
		String tmpMobile = null;
		String tmpContent = null;
		String tmpTypeStr = null;
		String tmpSrcID = null ;
		int tmpType = 0;
		String tmpUrl = null;
		
		info("请输入srcID，按回车结束：");
		tmpSrcID = readLine();
		if( tmpSrcID == null || tmpSrcID.trim().length() == 0 || getInt(tmpSrcID.trim()) == Integer.MIN_VALUE )
		{
			tmpSrcID = "" + smId;
		}
		
		info("请输入手机号码，多个号码用英文逗号隔开，按回车结束：");
		tmpMobile = readLine();
		if( tmpMobile == null || tmpMobile.trim().length() == 0 )
		{
			tmpMobile = mobileStr;
		}
		
		info("请输入短信内容，按回车结束：");
		tmpContent = readLine();
		if( tmpContent == null || tmpContent.trim().length() == 0)
		{
			 tmpContent = content;
		}
		info("请输入短信类型是否为WAP PUSH消息，按回车结束：Y/N[N]");
		tmpTypeStr = readLine();
		if( tmpTypeStr != null && tmpTypeStr.trim().equalsIgnoreCase("Y"))
		{
			 tmpType = 1;
			 info("请输入短信类型是否为WAP PUSH消息，按回车结束：Y/N[N]");
			tmpUrl = readLine();
			if( tmpUrl == null || tmpUrl.trim().length() == 0)
			{
			 	tmpUrl = url;
			 
			}
		}
		else
		{
			tmpType = smType;;
		}
		Vector mobileList = new Vector();
        StringTokenizer st = new StringTokenizer(tmpMobile, ",");
        while(st.hasMoreElements())
        {
        	String tmp = (String)st.nextElement();
        	if( tmp.indexOf("-") != -1 )
        	{
        		long min = Long.parseLong(tmp.substring(0, tmp.indexOf("-")));
        		long max = Long.parseLong(tmp.substring(tmp.indexOf("-") + 1));
        		
        		long i  = min;
        		while(i <= max)
        		{
        			mobileList.addElement(Long.toString(i));
        			i ++;
        		}
        	}
        	else
        	{
        		mobileList.addElement(tmp);
        	}
        }
        int len = mobileList.size();
        String[] mobiles = new String[len];
        for(int i = 0 ; i < len ; i++)
        {
        	mobiles[i] = (String)mobileList. elementAt(i);
        }
        //System.arraycopy(mobileList, 0, mobiles, 0, mobileList.size());
        //mobiles = (String[]) mobileList.toArray(mobiles);



        int result = 0;
        if(tmpType == 1)
        {
        	if(url == null || url.length() == 0)
        	{
        		info("请输入Wap Push的链接地址！");
        		return;
        	}
        	result = handler.sendSM(mobiles, tmpContent, smId, Long.parseLong(tmpSrcID), url);
        }else
        {
        	result = handler.sendSM(mobiles, tmpContent, smId , Long.parseLong(tmpSrcID));
        }
        if(result == APIClient.IMAPI_SUCC)
        {            
            info("发送成功\n");
        }
        else if(result == APIClient.IMAPI_INIT_ERR)
            info("未初始化");
        else if(result == APIClient.IMAPI_CONN_ERR)
            info("数据库连接失败");
        else if(result == APIClient.IMAPI_DATA_ERR)
            info("参数错误");
        else if(result == APIClient.IMAPI_DATA_TOOLONG)
            info("消息内容太长");
        else if(result == APIClient.IMAPI_INS_ERR)
            info("数据库插入错误");
        else
            info("出现其他错误");
	}
	
	public void recvSM()
	{
		MOItem[] mos = handler.receiveSM();
        int len = 0, i = 0;
        StringBuffer sb = new StringBuffer("");
        if(mos == null)
        {
            info("未初始化或接收失败");
            return;
        }
        else if(mos.length == 0)
        {
            info("没有MO短信");
        }
        else
        {
            len = mos.length;
            while(i < len)
            {
                sb.append("手机号码: ");
                sb.append(mos[i].getMobile() + " ");
                sb.append("短信内容: ");
                sb.append(mos[i].getContent());
                sb.append("MO时间: ");
                sb.append(mos[i].getMoTime());
                sb.append("\n");
                i++;
            }
             
            info(sb.toString() );
        }
	}
	public void recvRPT()
	{
		RPTItem[] rpts = handler.receiveRPT();
        int len = 0, i = 0;
        StringBuffer sb = new StringBuffer("");
        if(rpts == null)
        {
            info("未初始化或接收失败");
            return;
        }
        else if(rpts.length == 0)
        {
            info("没有回执");
        }
        else
        {
            len = rpts.length;
            while(i < len)
            {
                sb.append("手机: ");
                sb.append(rpts[i].getMobile() + " ");
                sb.append("回执编码: ");
                sb.append(rpts[i].getCode() + " ");
                sb.append("回执描述: ");
                sb.append(rpts[i].getDesc() + " ");
                sb.append("回执时间: ");
                sb.append(rpts[i].getRptTime() + " ");
                sb.append("\n");
                i++;
            }
            info(sb.toString());
        }
	}
	public void error(Object obj , Throwable thr)
	{
		info(obj);
		thr.printStackTrace();
	}
	public void info(Object obj)
	{
		System.out.println(obj);
	}
	public String readLine()
	{
		String line = null;
		try
		{
			line = in.readLine();
		}
		catch(IOException e)
		{
			error("",e);
		}
		return line;
	}
	public int getInt(String str)
	{
		int ret = Integer.MIN_VALUE;
		try
		{
			ret = Integer.parseInt(str);
		}catch(NumberFormatException e)
		{
			ret = Integer.MIN_VALUE;
		}
		return ret;
	}
	public void usage()
	{
		info("Usage : java ApiTestDemo [-h host] [-n name] [-p password] [-i apiCode]");
		info("\t-h host        信息机地址");
		info("\t-n name        API登陆名");
		info("\t-p password    API登陆密码");
		info("\t-i apiCode     API编码");

	}
	public void menu()
	{
		info("\n------------------------------");
		info("1\t 发送短信");
		info("2\t 发送短信(srcID测试)");
		info("3\t 接收短信");
		info("4\t 接收回执");
		info("5\t 查看帮助");
		info("6\t 退出");
		info("------------------------------");
		info("请输入你要进行操作的数字:");
	}
	public void quit()
	{
		release();
		System.exit(0);
	}
	public void run()
	{
		while(true)
		{
			menu();
			int menu = 0;
			menu = parseMenu(readLine());
			//try{menu = in.read();}catch(Exception e){error("",e);}
			if(menu < 1 || menu > 6)
			{
				continue;
			}
			switch(menu)
			{
				case 1 : sendSM();break;
				case 2 : testSend();break;
				case 3 : recvSM();break;
				case 4 : recvRPT();break;
				case 5 : usage();break;
				case 6 : quit();break;
				default:;break;
			}
		}
	}
	public int parseMenu(String menu)
	{
		int cmd = 0;
		try
		{
			cmd = Integer.parseInt(menu);
		}
		catch(Exception e)
		{
			cmd = -1;
		}
		return cmd;
	}
	public void parseCmd(String[] args)
	{
		String tmp = "";
		int index = 0;
		int len = args.length;
		if(args.length > 0)
		{
			info("parse argements....");
			while(index < len)
			{
				tmp = args[index++].trim();
				if(tmp.equalsIgnoreCase("-h"))
				{
					host = args[index++];
					info(" host  = "+host);
				}
				else if(tmp.equalsIgnoreCase("-n"))
				{
					name = args[index++];
					info(" name  = "+name);
				}
				else if(tmp.equalsIgnoreCase("-p"))
				{
					pwd = args[index++];
					info(" pwd   = "+pwd);
				}
				else if(tmp.equalsIgnoreCase("-i"))
				{
					apiId = args[index++];
					info(" apiId = "+apiId);
				}
				else
				{
					index += 2;
					continue;
				}
			}
		}
	}
	
	class SendTask extends Thread
	{
		int loop = 10;
		long interval = 2000L;
		public SendTask()
		{
			
		}
		public void run()
		{
			Random random = new Random();
			long tmpSmId = 0;
			long tmpSrcId = 0;
			while(loop > 0)
			{
				try
				{
					Thread.sleep(interval);
				}catch(InterruptedException e)
				{
				}
				
				tmpSmId = random.nextInt(1000);
				tmpSrcId = random.nextInt(100);
				System.out.println("TestSend:"+loop + "[smId:"+tmpSmId+";srcId:"+tmpSrcId+"]");
				handler.sendSM(mobileStr.split(","), content,  tmpSmId, tmpSrcId);
				
				loop--;          
			}
			System.out.println("Test completed.");
		}
	}
	public static void main(String[] args)
	{
		ApiTestDemo demo = new ApiTestDemo(args);
		demo.run();
	}

}
