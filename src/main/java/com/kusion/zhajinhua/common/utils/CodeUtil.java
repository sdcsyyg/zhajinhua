package com.kusion.zhajinhua.common.utils;

import java.util.Random;
import java.util.UUID;

import org.apache.commons.codec.digest.DigestUtils;

public class CodeUtil {

    /**
     * 返回：时间戳 + 6位随机数字编码
     * @return 20150501121212123456
     */
    public static String timeCode() {
        return DateUtil.getCurrentLongDate() + NumberUtil.getRandcode(6);
    }

    /**
     * 随机uuid编码
     * @return
     */
    public static String uuid() {
        return UUID.randomUUID().toString().replace("-", "");
    }

    /**
     * 随机的15位编码
     * @return
     */
    public static String defaultRandomString() {
        return random(15);
    }

    public static String random(int length) {
        String base = "abcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < length; i++) {
            int number = random.nextInt(base.length());
            sb.append(base.charAt(number));
        }
        return sb.toString();
    }

    public static String sha1(String appId, String appKey, String now) {
        return DigestUtils.sha1Hex(appId + "UZ" + appKey + "UZ" + now) + "." + now;
    }
}
