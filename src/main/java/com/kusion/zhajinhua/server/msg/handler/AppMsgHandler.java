package com.kusion.zhajinhua.server.msg.handler;

import io.netty.channel.Channel;

import com.kusion.zhajinhua.protobuf.CdeerMsg.Message;

/**
 * 消息处理器
 */
public interface AppMsgHandler {

	/**
	 * 处理方法
	 * @param channel
	 * @param msg2
	 */
	public void process(Channel channel, Message msg);

}