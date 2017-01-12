package com.kusion.zhajinhua.controllers.forms;

import java.util.ArrayList;
import java.util.List;

public class GameRoomForm {

    private boolean start;

    private int capacity = 5;

    private String password;

    private List<UserHandCards> userHandCards = new ArrayList<UserHandCards>();

    public boolean isStart() {
        return start;
    }

    public void setStart(boolean start) {
        this.start = start;
    }

    public List<UserHandCards> getUserHandCards() {
        return userHandCards;
    }

    public void setUserHandCards(List<UserHandCards> userHandCards) {
        this.userHandCards = userHandCards;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
