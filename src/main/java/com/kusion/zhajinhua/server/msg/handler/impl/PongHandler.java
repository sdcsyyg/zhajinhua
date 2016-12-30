package com.kusion.zhajinhua.server.msg.handler.impl;

import io.netty.channel.Channel;

import com.kusion.zhajinhua.protobuf.CdeerMsg.Message;
import com.kusion.zhajinhua.server.msg.handler.AppMsgHandler;

/**
 * 心跳响应处理器
 */
public class PongHandler implements AppMsgHandler{

	@Override
	public void process(Channel channel, Message msg) {
		
	}

}
