package com.kusion.zhajinhua.controllers.forms;

import com.kusion.zhajinhua.application.models.User;
import com.kusion.zhajinhua.core.HandCards;


public class UserHandCards {

    private User user;

    private HandCards handCards;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public HandCards getHandCards() {
        return handCards;
    }

    public void setHandCards(HandCards handCards) {
        this.handCards = handCards;
    }

}
