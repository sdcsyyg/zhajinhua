package com.kusion.zhajinhua.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kusion.zhajinhua.application.models.User;
import com.kusion.zhajinhua.application.repos.UserRepo;
import com.kusion.zhajinhua.common.controllers.AccessController;
import com.kusion.zhajinhua.controllers.forms.CompareForm;
import com.kusion.zhajinhua.controllers.forms.GameRoomForm;
import com.kusion.zhajinhua.controllers.forms.UserHandCards;
import com.kusion.zhajinhua.core.Cards;
import com.kusion.zhajinhua.core.HandCards;

@Controller
@RequestMapping("/gaming/room")
public class GameRoomController extends AccessController {

    @Autowired
    UserRepo userRepo;

    @RequestMapping(value="/createRoom", method=RequestMethod.GET)
    public String createRoom() {
        return "";
    }

    @RequestMapping(value="/createRoom/{password}", method=RequestMethod.GET)
    public Object createRoom(@PathVariable String password) {
        return ok("成功创建房间");
    }

    @RequestMapping(value="/{roomId}/join/{userId}", method=RequestMethod.GET)
    public Object joinRoom(@PathVariable String roomId, @PathVariable long userId) {
        //TODO : 获取GameRoomForm
        GameRoomForm gameRoomForm = null;
        User user = userRepo.findOne(userId);
        if(gameRoomForm == null || user == null) {
            return failure("房间已经解散或者参数有误");
        }
        if(gameRoomForm.getUserHandCards().size() >= gameRoomForm.getCapacity()) {
            return failure("房间人数已满");
        }
        UserHandCards uhc = new UserHandCards();
        uhc.setUser(user);
        gameRoomForm.getUserHandCards().add(uhc);
        return ok("成功加入房间");
    }

    @RequestMapping(value="/{roomId}/sendHandCard", method=RequestMethod.POST)
    public Object sendHandCards(@PathVariable String roomId) {
        // TODO 获取gameRoomForm
        GameRoomForm gameRoomForm = null;
        if(gameRoomForm == null) {
            return failure("房间不存在或者已经解散");
        }
        List<UserHandCards> userHandCards = gameRoomForm.getUserHandCards();

        Cards cards = new Cards();
        cards.shuffle();

        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < userHandCards.size(); j++) {
                if(userHandCards.get(j).getHandCards() == null) {
                    userHandCards.get(j).setHandCards(new HandCards());
                }
                userHandCards.get(j).getHandCards().addCard(cards.getCard());
            }
        }
        request().setAttribute("gameRoom", gameRoomForm);
        return ok("");
    }

    @RequestMapping(value="/{roomId}/max", method=RequestMethod.POST)
    public Object max(CompareForm cForm) {
        UserHandCards userHandCards1 = cForm.getUserHandCards1();
        UserHandCards userHandCards2 = cForm.getUserHandCards2();
        // 至少两个人才能玩
        if(userHandCards1 == null || userHandCards2 == null) {
            return failure("参数错误");
        }
        boolean pingJu = false;
        if(userHandCards1.getHandCards().compareTo(userHandCards2.getHandCards()) > 0) {
            request().setAttribute("max", userHandCards1);
        } else if(userHandCards1.getHandCards().compareTo(userHandCards2.getHandCards()) < 0) {
            request().setAttribute("max", userHandCards2);
        } else {
            if(cForm.isSoha() 
                    && cForm.getZhuangjiaUserId() != userHandCards1.getUser().getId()
                    && cForm.getZhuangjiaUserId() != userHandCards2.getUser().getId()) {
                // TODO：这种情况无法决出胜负,该怎么办？
                pingJu = true;
            } else {
                if(cForm.isSoha()) {
                    if(cForm.getZhuangjiaUserId() != userHandCards1.getUser().getId()) {
                        request().setAttribute("max", userHandCards1);
                    } else {
                        request().setAttribute("max", userHandCards2);
                    }
                } else {
                    if(cForm.getKaiUserId() != userHandCards1.getUser().getId()) {
                        request().setAttribute("max", userHandCards2);
                    } else {
                        request().setAttribute("max", userHandCards1);
                    }
                }
            }
        }
        request().setAttribute("pingju", pingJu);
        return ok("");
    }
}
