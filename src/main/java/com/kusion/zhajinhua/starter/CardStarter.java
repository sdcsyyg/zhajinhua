package com.kusion.zhajinhua.starter;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

import com.kusion.zhajinhua.console.ConsoleService;
import com.kusion.zhajinhua.manager.ConstantManager;
import com.kusion.zhajinhua.redis.RedisPoolManager;
import com.kusion.zhajinhua.server.AppServer;
import com.kusion.zhajinhua.utils.Configuration;

/**
 * 服务器启动类
 */
public class CardStarter {

	/**
	 * 日志输出类
	 */
	private static Logger Log = Logger.getLogger(CardStarter.class.getName());

	public static void main(String[] args) {
		// 配置日志
		PropertyConfigurator.configure("classpath:cdeer_log4j.properties");

		Configuration configuration = new Configuration("classpath:cdeer_config.properties");
		ConstantManager.HEART_BEAT = Integer.valueOf(configuration.getValue("heartBeat"));
		ConstantManager.CONSOLE_PASS = configuration.getValue("consolePass");

		// 配置Redis
		RedisPoolManager.REDIS_SERVER = configuration.getValue("redisServer");
		RedisPoolManager.REDIS_PORT = Integer.valueOf(configuration.getValue("redisPort"));
		RedisPoolManager.REDIS_AUTH = configuration.getValue("redisAuth");
		RedisPoolManager.returnJedis(RedisPoolManager.getJedis());
		Log.info("Redis 初始化成功");

		// 启动APP服务器
		String appServerPort = configuration.getValue("appServerPort");
		new AppServer(200).startServer(Integer.valueOf(appServerPort));

		// 启动控制台服务器
		String consolePort = configuration.getValue("consolePort");
		new ConsoleService(10).startServer(Integer.valueOf(consolePort));

	}

}
