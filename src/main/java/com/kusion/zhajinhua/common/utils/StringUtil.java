package com.kusion.zhajinhua.common.utils;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringUtil {

    static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    public static Date String2Date(String str) throws ParseException {
        return sdf.parse(str);
    }


    public static BigDecimal String2BigDecimal(String str) {
        return BigDecimal.valueOf(Double.parseDouble(str));
    }

    /**
     * 通过年月获取上一个月的年月
     * 
     * @param thisMonth="2014-02"/"2014-01"
     * @return "2014-01"/"2013-12"
     */
    public static String getPreMonth(String thisMonth) {

        String yearMonth[] = thisMonth.split("-");

        int month = Integer.parseInt(yearMonth[1]);
        if (month > 1) {
            return yearMonth[0] + "-" + String.format("%02d", month - 1);
        }

        int year = Integer.parseInt(yearMonth[0]);
        return (year - 1) + "-12";
    }

    public static String cut75(String content) {
        return cut(content, 75);
    }

    public static String cut(String content, int length) {
        if(content == null || "".equals(content.trim()) || length <= 0) {
            return "";
        }

        // 去掉html代码
        String str = delHTML(content);
        if(str.length() <= length) {
            return str + "...";
        }
        return str.substring(0, length) + "...";
    }

    /**
     * 
     * @param htmlStr
     * @return
     */
    public static String delHTML(String htmlStr) {
        String regEx_script="<script[^>]*?>[\\s\\S]*?<\\/script>"; //定义script的正则表达式 
        String regEx_style="<style[^>]*?>[\\s\\S]*?<\\/style>"; //定义style的正则表达式 
        String regEx_html="<[^>]+>"; //定义HTML标签的正则表达式 

        Pattern p_script=Pattern.compile(regEx_script,Pattern.CASE_INSENSITIVE); 
        Matcher m_script=p_script.matcher(htmlStr); 
        htmlStr=m_script.replaceAll(""); //过滤script标签 

        Pattern p_style=Pattern.compile(regEx_style,Pattern.CASE_INSENSITIVE); 
        Matcher m_style=p_style.matcher(htmlStr); 
        htmlStr=m_style.replaceAll(""); //过滤style标签 

        Pattern p_html=Pattern.compile(regEx_html,Pattern.CASE_INSENSITIVE); 
        Matcher m_html=p_html.matcher(htmlStr); 
        htmlStr=m_html.replaceAll(""); //过滤html标签 

        return htmlStr.trim(); //返回文本字符串 
    }

    /**
     * 判断一个String是否是URL
     * @param url
     * @return
     */
    public static boolean isURL(String url) {
        if(url == null) {
            return false;
        }
        String _url = url.trim();

        //TODO : 简单判断的，可能有bug
        if(_url.length() < 8 || !_url.contains(".") || (!_url.startsWith("http://") && !_url.startsWith("https://"))) {
            return false;
        }
        return true;
    }
}
