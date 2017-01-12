package com.kusion.zhajinhua.common.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {

    /** 年月日时分秒(无下划线) yyyyMMddHHmmss */
    public static final String DT_LONG = "yyyyMMddHHmmss";

    /** 完整时间 yyyy-MM-dd HH:mm:ss */
    public static final String DT_SIMPLE = "yyyy-MM-dd HH:mm:ss";

    /** 年月日(无下划线) yyyyMMdd */
    public static final String DT_SHORT = "yyyyMMdd";

    public static final String DT_SHORT_ = "yyyy-MM-dd";

    /**
     * @return yyyyMMddHHmmss
     */
    public static String getCurrentLongDate() {
        Date date = new Date();
        DateFormat df = new SimpleDateFormat(DT_LONG);
        return df.format(date);
    }

    /**
     * @return yyyyMMdd
     */
    public static String getCurrentShortDate() {
        Date date = new Date();
        DateFormat df = new SimpleDateFormat(DT_SHORT);
        return df.format(date);
    }

    /**
     * @return yyyy-MM-dd
     */
    public static String formatAsShortDate(Date date) {
        DateFormat df = new SimpleDateFormat(DT_SHORT_);
        return df.format(date);
    }

    /**
     * @return yyyy-MM-dd HH:mm:ss
     */
    public static String getCurrentSimpleDate() {
        Date date = new Date();
        DateFormat df = new SimpleDateFormat(DT_SIMPLE);
        return df.format(date);
    }

    /**
     * 获取日期的时间差，单位：分钟
     * 
     * @param end
     * @param start
     * @return
     */
    public static long subtract(Date end, Date start) {
        long diff = end.getTime() - start.getTime();
        long minutes = diff / (1000 * 60);
        return minutes;
    }

    public static void main(String[] args) throws ParseException {
        DateFormat dateFormat2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date myDate2 = dateFormat2.parse("2015-11-12 00:00:00");
        System.out.println(subtract(new Date(), myDate2));
    }
}
