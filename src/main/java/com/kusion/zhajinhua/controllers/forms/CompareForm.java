package com.kusion.zhajinhua.controllers.forms;

public class CompareForm {

    private int plays;

    private UserHandCards userHandCards1;

    private UserHandCards userHandCards2;

    private boolean soha;

    private long kaiUserId;

    private long zhuangjiaUserId;

    public long getKaiUserId() {
        return kaiUserId;
    }

    public void setKaiUserId(long kaiUserId) {
        this.kaiUserId = kaiUserId;
    }

    public long getZhuangjiaUserId() {
        return zhuangjiaUserId;
    }

    public void setZhuangjiaUserId(long zhuangjiaUserId) {
        this.zhuangjiaUserId = zhuangjiaUserId;
    }

    public UserHandCards getUserHandCards1() {
        return userHandCards1;
    }

    public void setUserHandCards1(UserHandCards userHandCards1) {
        this.userHandCards1 = userHandCards1;
    }

    public UserHandCards getUserHandCards2() {
        return userHandCards2;
    }

    public void setUserHandCards2(UserHandCards userHandCards2) {
        this.userHandCards2 = userHandCards2;
    }

    public int getPlays() {
        return plays;
    }

    public void setPlays(int plays) {
        this.plays = plays;
    }

    public boolean isSoha() {
        return soha;
    }

    public void setSoha(boolean soha) {
        this.soha = soha;
    }

}
