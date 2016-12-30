package com.kusion.zhajinhua.server;

import com.kusion.zhajinhua.protobuf.CdeerMsg.Message;
import com.kusion.zhajinhua.server.msg.handler.AppMsgHandler;
import com.kusion.zhajinhua.server.msg.handler.impl.ChatHandler;
import com.kusion.zhajinhua.server.msg.handler.impl.CreateRoomHandler;
import com.kusion.zhajinhua.server.msg.handler.impl.JoinRoomHandler;
import com.kusion.zhajinhua.server.msg.handler.impl.LoginHandler;
import com.kusion.zhajinhua.server.msg.handler.impl.PingHandler;
import com.kusion.zhajinhua.server.msg.handler.impl.PongHandler;
import com.kusion.zhajinhua.server.msg.handler.impl.PreparedGomeHandler;
import com.kusion.zhajinhua.server.msg.handler.impl.RegisterHandler;
import com.kusion.zhajinhua.server.msg.handler.impl.SendHandCardsHandler;
import com.kusion.zhajinhua.utils.MessageHeaderStatus;

/**
 * 获取消息处理器
 */
public class AppMsgHandlerFactory {

    public static AppMsgHandler getAppMsgHandler(Message msg) {

        int header = msg.getHeader();
        if (header == MessageHeaderStatus.M_H_S_LOGIN) {
            // 登录
            return new LoginHandler();
        } else if(header == MessageHeaderStatus.M_H_S_REG) {
            // 注册
            return new RegisterHandler();
        } else if (header == MessageHeaderStatus.M_H_S_SINGLE_CHAT) {
            // 单聊
            return new ChatHandler();
        } else if (header == MessageHeaderStatus.M_H_S_PING) {
            // ping
            return new PingHandler();
        } else if (header == MessageHeaderStatus.M_H_S_PONG) {
            // pong
            return new PongHandler();
        } else if (header == MessageHeaderStatus.M_H_S_CREATE_ROOM) {
            // 创建房间
            return new CreateRoomHandler();
        } else if (header == MessageHeaderStatus.M_H_S_JOIN_ROOM) {
            // 加入房间
            return new JoinRoomHandler();
        } else if (header == MessageHeaderStatus.M_H_S_PRE_GAME) {
            // 准备游戏
            return new PreparedGomeHandler();
        } else if (header == MessageHeaderStatus.M_H_S_SEND_HAND_CARDS) {
            // 发牌
            return new SendHandCardsHandler();
        } else {
            return null;
        }
    }

}
